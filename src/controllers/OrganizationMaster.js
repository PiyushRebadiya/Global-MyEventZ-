const { errorMessage, checkKeysAndRequireValues, successMessage, getNextMaxId, setSQLStringValue, setSQLBooleanValue, getCommonKeys, generateUUID, setSQLNumberValue, getCommonAPIResponse, generateJWTT } = require("../common/main");
const { createAllTableInDB } = require("../common/version");
const { pool } = require("../sql/connectToDatabase");

const organizationLogin = async (req, res)=>{
    try{
        const {Mobile1, Password} = req.body;

        const missingKeys = checkKeysAndRequireValues(['Mobile1', 'Password'], req.body)

        if(missingKeys.length > 0){
            return res.status(404).json(errorMessage(`${missingKeys.join(', ')} is required`))
        }

        const result = await pool.request().query(`
            select * from OrganizationMaster where Mobile1 = ${setSQLStringValue(Mobile1)} and Password = ${setSQLStringValue(Password)}
        `);

        if(result.recordset.length === 0){
            return res.status(404).json(errorMessage('Invelid Email Or Password, Please Enter valid Email and Password'));
        }

        const token = generateJWTT({
            OrganizationId : result?.recordset?.[0]?.OrganizationId,
            OrganizationUkeyId : result?.recordset?.[0]?.OrganizationUkeyId,
            OrganizationName : result?.recordset?.[0]?.OrganizationName,
            Mobile1 : result?.recordset?.[0]?.Mobile1,
            Email : result?.recordset?.[0]?.Email,
            Role : result?.recordset?.[0]?.Role,
            IsActive : result?.recordset?.[0]?.IsActive,
        })

        return res.status(200).json({...successMessage(), token, ...result?.recordset?.[0] });
    }catch(error){
        console.log("Organization Login Error : ", error);
        return res.status(500).json(errorMessage(error.message))
    }
}

const fetchOrginizations = async (req, res)=> {
    try{
        const { OrganizationUkeyId, IsActive, Role } = req.query;
        let whereConditions = [];

        // Build the WHERE clause based on the Status
        if (OrganizationUkeyId) {
            whereConditions.push(`OrganizationUkeyId = ${setSQLStringValue(OrganizationUkeyId)}`);
        }
        if (Role) {
            whereConditions.push(`Role = ${setSQLStringValue(Role)}`);
        }
        if(IsActive){
            whereConditions.push(`IsActive = ${setSQLBooleanValue(IsActive)}`);
        }
        // Combine the WHERE conditions into a single string
        const whereString = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
        const getUserList = {
            getQuery: `SELECT * FROM OrganizationMaster ${whereString} ORDER BY OrganizationId DESC`,
            countQuery: `SELECT COUNT(*) AS totalCount FROM OrganizationMaster ${whereString}`,
        };
        const result = await getCommonAPIResponse(req, res, getUserList);
        return res.json(result);
    }catch(error){
        console.log("fetch organization error : ", error);
        return res.status(500).json(errorMessage(error.message))
    }
}

const CreateOrganozation = async (req, res)=>{
    try{
        const {OrganizationUkeyId , OrganizationName, Mobile1, Mobile2, Email, AliasName, Description, Add1, Add2, City, StateCode, StateName, UPI, Role, IsActive, Password, RazorpayKeyId, RazorpaySecretKey, RazorpayBusinessName, flag, DBversion} = req.body;

        const {IPAddress, ServerName, EntryTime} = getCommonKeys();

        // const autoIncrementId = await getNextMaxId('OrganizationId', 'OrganizationMaster')

        const ukeyid = generateUUID()

        const insertQuery = `
            insert into OrganizationMaster (
                OrganizationUkeyId, OrganizationName, Mobile1, Mobile2, Email, AliasName, Description, Add1, Add2, City, StateCode, StateName, UPI, Role, IsActive, Password, DBversion, RazorpayKeyId, RazorpaySecretKey, RazorpayBusinessName, flag, IpAddress, HostName, EntryDate
            ) values (
                ${setSQLStringValue(ukeyid)}, ${setSQLStringValue(OrganizationName)}, ${setSQLStringValue(Mobile1)}, ${setSQLStringValue(Mobile2)}, ${setSQLStringValue(Email)}, ${setSQLStringValue(AliasName)}, ${setSQLStringValue(Description)}, ${setSQLStringValue(Add1)}, ${setSQLStringValue(Add2)}, ${setSQLStringValue(City)}, ${setSQLStringValue(StateCode)}, ${setSQLStringValue(StateName)}, ${setSQLStringValue(UPI)}, ${setSQLStringValue(Role)}, ${setSQLBooleanValue(IsActive)}, ${setSQLStringValue(Password)}, ${setSQLNumberValue(DBversion)}, ${setSQLStringValue(RazorpayKeyId)}, ${setSQLStringValue(RazorpaySecretKey)}, ${setSQLStringValue(RazorpayBusinessName)}, ${setSQLStringValue(flag)}, ${setSQLStringValue(IPAddress)}, ${setSQLStringValue(ServerName)}, ${setSQLStringValue(EntryTime)}
            );
        `
        const updateQuery = `
            update OrganizationMaster set
            OrganizationName = ${setSQLStringValue(OrganizationName)}, 
            Mobile1 = ${setSQLStringValue(Mobile1)}, 
            Mobile2 = ${setSQLStringValue(Mobile2)}, 
            Email = ${setSQLStringValue(Email)}, 
            AliasName = ${setSQLStringValue(AliasName)}, 
            Description = ${setSQLStringValue(Description)}, 
            Add1 = ${setSQLStringValue(Add1)}, 
            Add2 = ${setSQLStringValue(Add2)}, 
            City = ${setSQLStringValue(City)}, 
            StateCode = ${setSQLStringValue(StateCode)}, 
            StateName = ${setSQLStringValue(StateName)}, 
            UPI = ${setSQLStringValue(UPI)}, 
            Role = ${setSQLStringValue(Role)}, 
            IsActive = ${setSQLBooleanValue(IsActive)}, 
            Password = ${setSQLStringValue(Password)},
            DBversion = ${setSQLBooleanValue(DBversion)},
            RazorpayKeyId = ${setSQLStringValue(RazorpayKeyId)}, 
            RazorpaySecretKey = ${setSQLStringValue(RazorpaySecretKey)}, 
            RazorpayBusinessName = ${setSQLStringValue(RazorpayBusinessName)}, 
            flag = ${setSQLStringValue(flag)},
            IpAddress = ${setSQLStringValue(IPAddress)}, 
            HostName = ${setSQLStringValue(ServerName)}, 
            EntryDate = ${setSQLStringValue(EntryTime)}
            where OrganizationUkeyId = ${setSQLStringValue(OrganizationUkeyId)}
        `

        if(flag == 'A'){

            if(req.body.OrganizationUkeyId){
                return res.status(400).json(errorMessage("Do not send OrganizationUkeyId While creating new Organization"))
            }

            const missingKeys = checkKeysAndRequireValues(['OrganizationName','Mobile1','Email','Role','IsActive','Password','flag'], req.body);
        
            if(missingKeys.length > 0){
                return res.status(404).json(errorMessage(`${missingKeys.join(', ')} is required`))
            }

            const result = await pool.request().query(insertQuery);
    
            if(result.rowsAffected?.[0] === 0) return res.status(400).json(errorMessage("No Organisation Created."))
            
            return res.status(200).json({...successMessage('New Organisation Creted Successfully.'), ...req.body, OrganizationUkeyId : ukeyid});
        }else if (flag == 'U') {
            
            const missingKeys = checkKeysAndRequireValues(['OrganizationName','Mobile1','Email','Role','IsActive','Password','flag', 'OrganizationUkeyId'], req.body);
        
            if(missingKeys.length > 0){
                return res.status(404).json(errorMessage(`${missingKeys.join(', ')} is required`))
            }

            const result = await pool.request().query(updateQuery);

            if(result.rowsAffected[0] === 0 ){
                return res.status(400).json({...errorMessage('No Organisation Updated.')})
            }
    
            return res.status(200).json({...successMessage('New Organisation Updated Successfully.'), ...req.body, OrganizationUkeyId});
        }else {
            return res.status(400).json({...errorMessage("Use 'A' flag to Add and 'U' flag to update, it is compulsary to send flag.")});
        }
    }catch(error){
        console.log('create organisation error :', error);
        return res.status(500).json(errorMessage(error.message));
    }
}

const removeOrganisation = async (req, res) => {
    try{
        const {OrganizationUkeyId} = req.query;

        const missingKeys = checkKeysAndRequireValues(['OrganizationUkeyId'], req.query)

        if(missingKeys.length > 0){
            return res.status(404).json(errorMessage(`${missingKeys.join(', ')} is required`))
        }

        const result = await pool.request().query(`
            delete from OrganizationMaster where OrganizationUkeyId = ${setSQLStringValue(OrganizationUkeyId)}
        `)

        if(result.rowsAffected?.[0] === 0){
            return res.status(400).json(errorMessage("No organization deleted"))
        }

        return res.status(200).json(successMessage("organization deleted successfully"));
    }catch(error){
        console.log("remove Organization error :", error);
        return res.status(500).json(errorMessage(error.message))
    }
}

module.exports = {
    fetchOrginizations,
    CreateOrganozation,
    removeOrganisation,
    organizationLogin,
}