const { errorMessage, checkKeysAndRequireValues, successMessage, getNextMaxId } = require("../common/main");
const { createAllTableInDB } = require("../common/version");
const { pool } = require("../sql/connectToDatabase");

const getUsersList = async (req, res) => {
    try {
        // Fetch users
        const usersQuery = `SELECT * FROM Users`;
        const usersResult = await pool.request().query(usersQuery);

        // Get the next max ID
        const maxID = await getNextMaxId('id', 'temp');
        if (maxID === null) {
            return res.status(500).send(errorMessage('Failed to get max ID!'));
        }

        await pool.query(`INSERT INTO temp (id) VALUES (${maxID})`);

        console.log('maxID :>> ', maxID);

        // Respond with user data
        return res.status(200).send({
            data: usersResult.recordset,
        });
    } catch (error) {
        return res.status(500).send(errorMessage(error?.message));
    }
};

const addUserList = async (req, res) => {
    try {
        const { Name } = req.body;

        // Check for required keys
        const missingKeys = checkKeysAndRequireValues(['Name'], req.body);
        if (missingKeys.length !== 0) {
            return res.status(400).send(errorMessage(`Missing keys: ${missingKeys.join(', ')}`));
        }

        // Insert query
        const insertQuery = `
            INSERT INTO Users (Name, CV)
            VALUES ('${Name}', 1.00)
        `;
        const response = await pool.query(insertQuery);

        // await createAllTableInDB(Name);

        // Check if rows were inserted
        if (response.rowsAffected[0] > 0) {
            return res.status(200).send(successMessage("User data inserted successfully!"));
        } else {
            return res.status(400).send(errorMessage('No rows inserted for Users!'));
        }
    } catch (error) {
        console.log('error :', error);
        return res.status(500).send(errorMessage(error?.message));
    }
};

const versionUpdate = async (req, res) => {
    try {
        const { Name } = req.body;
        const findUser = await pool.request().query(`SELECT * FROM Users WHERE Name = '${Name}'`);
        if (findUser.recordset.length === 0) {
            return res.status(400).send(errorMessage('User not found!'));
        }
        const { CV } = findUser.recordset[0];
        console.log('CV :>> ', CV);
        const version = await createAllTableInDB(Name, CV);
        console.log('version :>> ', version);

        // Update query
        const response = await pool.query(`UPDATE Users SET CV = '${version}' WHERE Name = '${Name}'`);

        console.log('response :>> ', response);

        return res.status(200).send(successMessage("Version updated successfully!"));
    } catch (error) {
        console.log('error :', error);
        return res.status(500).send(errorMessage(error?.message));
    }
};

module.exports = {
    getUsersList,
    addUserList,
    versionUpdate
}