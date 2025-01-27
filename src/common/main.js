const moment = require('moment');
const os = require('os');
const fs = require('fs');
const fsPromises = require('fs').promises;
const fs_extra = require('fs-extra');
const { LIVE_URL } = require('./variable');
const { pool } = require('../sql/connectToDatabase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const generateUUID = () => {
    const uniqueID = uuidv4().toLocaleUpperCase();
    return uniqueID
}

const getServerIpAddress = (req) => {
    const IPAddress = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || 'Not Found';
    return IPAddress;
};

const getServerName = () => {
    const hostname = os.hostname();
    return hostname;
};

const getEntryTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

const errorMessageHandler = (message) => {
    if(message?.match('REFERENCE constraint')) {
        message = "This Data Is Already Exists!"
    }
    if(message?.match('FOREIGN KEY constraint')) {
        message = "This Data Foreign Key Is Not Found!"
    }
    return message
}

const errorMessage = (message = "Something went wrong!",status = 400) => {
    message = errorMessageHandler(message);
    return {
        Success: false,
        status,
        message
    }
}

const successMessage = (message = "successfully!") => {
    return {
        Success: true,
        status: 200,
        message
    }
}

const getCommonKeys = () => {
    const IPAddress = getServerIpAddress();
    const ServerName = getServerName();
    const EntryTime = getEntryTime();
    return {
        IPAddress,
        ServerName,
        EntryTime
    }
}

const setSQLBooleanValue = (condition) => {
    if(condition === true || condition === 'true') {
        return 1
    }
    return 0
}

const setSQLNumberValue = (value) => {
    if(!value || isNaN(value)) {
        return 0
    }
    return Number(value)
}

const setSQLOrderId = (value) => {
    if(Number(value) < 0 || Number(value) > 10000 || !value) {
        return null
    }
    return value
}

const setSQLStringValue = (value) => {
    if (!value) {
        return null
    }
    return `'${value}'`
}

const setSQLDateTime = (date) => {
    const parsedDate = moment(date);
    if (parsedDate.isValid()) {
        return `'${parsedDate.format('YYYY-MM-DD')}'`;
    }
    return null;
};

const checkKeysAndRequireValues = (allKeys, matchKeys) => {
    const errorKeys = [];
    allKeys.map((item) => {
        if (!Object.keys(matchKeys).includes(item) || matchKeys[item] === undefined || matchKeys[item] === null || matchKeys[item] === '') {
            errorKeys.push(item);
        }
    });
    return errorKeys;
};

const generateReferralCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters[randomIndex];
    }

    return referralCode;
}

// Function to safely delete a file
const safeUnlink = (filePath) => {
    return new Promise((resolve, reject) => {
      // Proceed only if the file contains 'static'
      if(filePath.match('static')?.length > 0) {
        return null
    }
      
      fs.access(filePath, fs.constants.W_OK, (err) => {
        if (err) {
          return reject(`No write access to file: ${filePath}, error: ${err.message}`);
        }
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            return reject(`Error deleting file: ${filePath}, error: ${unlinkErr.message}`);
          }
          console.log(`Deleted file: ${filePath}`);
          resolve();
        });
      });
    });
  };
const updateUploadFiles = (updateFile, previousFile, folderName) => {
    if (updateFile && updateFile[0] && updateFile[0]?.filename) {
        if(previousFile){
            // fs.unlinkSync(previousFile.replace(LIVE_URL,`../TaxFilePosterMedia/${folderName}`));
            safeUnlink(previousFile.replace(LIVE_URL,`../TaxFilePosterMedia/${folderName}`));
        //   safeUnlink(previousFile.replace(LIVE_URL,`../TaxFilePosterMedia/${folderName}`));
        }
        return `${LIVE_URL}/${updateFile[0]?.filename}`;
    } else {
        return previousFile
    }
}

const getCommonAPIResponse = async (req, res, query) => {
    if(req.query.page && req.query.pageSize){
        return await getCommonAPIResponseWithPagination(req, res, query);
    }
    try {
        const result = await pool.request().query(query.getQuery);
        const countResult = await pool.request().query(query.countQuery);
        const totalCount = countResult.recordset[0].totalCount;
        return {
            data: result.recordset,
            totalLength: totalCount
        }
    } catch (error) {
        console.error('Error:', error);
        return errorMessage(error?.message);
    }
}

const getCommonAPIResponseWithPagination = async (req, res, query) => {
    try {
        const page = req.query.page || 1; // Default page number is 1
        const pageSize = req.query.pageSize || 10; // Default page size is 10
        // Calculate the offset based on the page number and page size
        const offset = (page - 1) * pageSize;
        const paginationQuery = `${query.getQuery} OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
        const result = await pool.request().query(paginationQuery);
        // Fetch total length of tbl_carousel table
        const countResult = await pool.request().query(query.countQuery);
        const totalCount = countResult.recordset[0].totalCount;
        // Return data along with total length
        return {
            data: result.recordset,
            totalLength: totalCount
        }
    } catch (error) {
        console.error('Error:', error);
        return errorMessage(error?.message);
    }
}

const getAPIALLDataResponse = async (req, res, TableName, Id, WHERE = ``) => {
    if(req.query.page && req.query.pageSize){
        return await getAPIALLDataResponseWithPagination(req, res, TableName, Id, WHERE);
    }
    try {
        const query = `SELECT * FROM ${TableName} ${WHERE} ORDER BY ${Id} DESC`;
        const result = await pool.request().query(query);
        const countQuery = `SELECT COUNT(*) AS totalCount FROM ${TableName} ${WHERE}`;
        const countResult = await pool.request().query(countQuery);
        const totalCount = countResult.recordset[0].totalCount;
        return {
            data: result.recordset,
            totalLength: totalCount
        }
    } catch (error) {
        console.error('Error:', error);
        return errorMessage(error?.message);
    }
}

const getAPIALLDataResponseWithPagination = async (req, res, TableName, Id, WHERE) => {
    try {
        const page = req.query.page || 1; // Default page number is 1
        const pageSize = req.query.pageSize || 10; // Default page size is 10
        // Calculate the offset based on the page number and page size
        const offset = (page - 1) * pageSize;
        const query = `SELECT * FROM ${TableName} ${WHERE} ORDER BY ${Id} DESC OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
        const result = await pool.request().query(query);
        // Fetch total length of tbl_carousel table
        const countQuery = `SELECT COUNT(*) AS totalCount FROM ${TableName} ${WHERE}`;
        const countResult = await pool.request().query(countQuery);
        const totalCount = countResult.recordset[0].totalCount;
        // Return data along with total length
        return {
            data: result.recordset,
            totalLength: totalCount
        }
    } catch (error) {
        console.error('Error:', error);
        return errorMessage(error?.message);
    }
}
const fetchDashbordData = async (query)=>{
    try{
        const result = await pool.request().query(query)
        return result.recordset[0]
    }catch(error){
        console.log(`fetch count data Error`,error);
    }
}

const deleteFileWithRetries = async (filePath) => {
    try {
        if(filePath.match('static')?.length > 0) {
            return null
        }
            await fs_extra.remove(filePath);
        return;
    } catch (error) {
        console.log('delete iamge error :', error);
        throw error;
    }
}

const removeUnusedFiles = async (match = [], directory) => {
    try {
      console.log("Matching image files:", match);
  
      const files = await fsPromises.readdir(directory);
      const notMatchingFiles = match.filter((e) => !files.some((file) => file.includes(e)));
      console.log("Files in directory:", files);
  
      for (const file of files) {
        const filePath = path.join(directory, file);
        // Check if the file is not in the match array
        if (!match.some((e) => file.includes(e))) {
          try {
            await safeUnlink(filePath); // safely delete the file
          } catch (err) {
            console.error(`Error deleting file: ${filePath}, error: ${err}`);
            // If there's an error deleting a specific file, continue with the next file
          }
        }
      }
  
      return {
        notMatchingFiles: {
          count: notMatchingFiles.length,
          files: notMatchingFiles
        }
      };
    } catch (err) {
      console.error('Error removing files:', err);
      // Return an empty result to avoid undefined errors
      return {
        notMatchingFiles: {
          count: 0,
          files: []
        }
      };
    }
  };

const base64Encode = (plainText) => {
    return Buffer.from(plainText).toString('base64');
};


const base64Decode = (encodedText) => {
    return Buffer.from(encodedText, 'base64').toString('utf-8');
};


const getNextMaxId = async (fieldName, tableName) => {
    try {
        const query = `SELECT ISNULL(MAX('${fieldName}'), 0) + 1 AS NextId FROM ${tableName}`;
        const result = await pool.request().query(query);
        return result.recordset?.[0]?.NextId || null;
    } catch (error) {
        console.error('Error fetching next max ID:', error);
        return null;
    }
};

module.exports = {
    getServerIpAddress,
    getServerName,
    getEntryTime,
    errorMessage,
    successMessage,
    getCommonKeys,
    setSQLBooleanValue,
    checkKeysAndRequireValues,
    updateUploadFiles,
    getAPIALLDataResponse,
    getAPIALLDataResponseWithPagination,
    getCommonAPIResponse,
    safeUnlink,
    setSQLOrderId,
    setSQLStringValue,
    fetchDashbordData,
    setSQLDateTime,
    generateReferralCode,
    setSQLNumberValue,
    deleteFileWithRetries,
    removeUnusedFiles,
    base64Encode,
    base64Decode,
    getNextMaxId,
    generateUUID,
}