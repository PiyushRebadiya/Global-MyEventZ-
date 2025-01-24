const { pool, changeDatabase } = require("../sql/connectToDatabase");
const { createCarouselTable, createImageLanguageTable } = require("./query");

// Columns
const addColumnInTable = async (tableName, columnName, columnType, db_name) => {
    try {
        const newPool = await changeDatabase(db_name)
        await newPool.request()
            .query(`ALTER TABLE ${tableName} ADD ${columnName} ${columnType}`);
        console.log(`Table ${tableName} Into Column ${columnName} added successfully!`);
    } catch (error) {
        console.error('Error:', error);
        if (error?.message?.includes('Column names in each table must be unique')) {
            console.log(`Added ${columnName} in ${tableName} already exist`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

const dropColumnInTable = async (tableName, columnName, db_name) => {
    try {
        const newPool = await changeDatabase(db_name)
        await newPool.request()
            .query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`);
        console.log(`Table ${tableName} Into Column ${columnName} dropped successfully!`);
    } catch (error) {
        console.error('Error:', error);
        if (error?.message?.includes('does not exist')) {
            console.log(`${columnName} in ${tableName} does not exist`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

// Tables
const createTableInDatabase = async (tableName, addColumn, db_name) => {
    try {
        const newPool = await changeDatabase(db_name)
        console.log('newPool=>>>>>>>>>> :>> ', newPool);
        await newPool.request()
            .query(`CREATE TABLE ${tableName} ${addColumn}`);
        console.log(`Table ${tableName} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already an object named')) {
            console.log(`${tableName} Table is already created`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

const deleteTableInDatabase = async (tableName, db_name) => {
    try {
        const newPool = await changeDatabase(db_name)
        await newPool.request()
            .query(`DROP TABLE ${tableName}`);
        console.log(`Table ${tableName} deleted successfully!`);
    } catch (error) {
        if (error?.message?.includes('does not exist')) {
            console.log(`${tableName} Table does not exist`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

// Indexes
const createUniqueIndexInTable = async (tableName, columnName, db_name) => {
    try {
        const newPool = await changeDatabase(db_name)
        await newPool.request()
            .query(`CREATE UNIQUE INDEX idx_${tableName}_${columnName} ON ${tableName} (${columnName})`);
        console.log(`Index idx_${tableName}_${columnName} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already exists')) {
            console.log(`Index idx_${tableName}_${columnName} already created`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

const deleteIndexInTable = async (tableName, db_name, indexName) => {
    try {
        const newPool = await changeDatabase(db_name)
        await newPool.request()
            .query(`DROP INDEX ${indexName} ON ${tableName}`);
        console.log(`Index ${indexName}} deleted successfully!`);
    } catch (error) {
        if (error?.message?.includes('does not exist')) {
            console.log(`Index ${indexName}} does not exist`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

// Constraints
const createNotNullConstraintInTable = async (tableName, columnName, db_name) => {
    const constraintName = `NN_${tableName}_${columnName}`;
    try {
        const newPool = await changeDatabase(db_name);
        const query = `
            ALTER TABLE ${tableName}
            ADD CONSTRAINT ${constraintName} CHECK (${columnName} IS NOT NULL);
        `;
        await newPool.request().query(query);
        console.log(`Custom NotNull Constraint ${constraintName} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already exists')) {
            console.log(`Custom NotNull Constraint ${constraintName} already created`);
            return;
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
};

const createReferenceConstraintInTable = async (tableName, columnName, db_name, referenceTableName, referenceColumnName) => {
    const constraintName = `FK_${referenceTableName}_${referenceColumnName}`;
    try {
        const newPool = await changeDatabase(db_name);
        const query = `
            ALTER TABLE ${tableName}
            ADD CONSTRAINT ${constraintName} FOREIGN KEY (${columnName})
            REFERENCES ${referenceTableName} (${referenceColumnName});
        `;
        await newPool.request().query(query);
        console.log(`Reference Constraint ${constraintName} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already exists')) {
            console.log(`Reference Constraint ${constraintName} already created`);
            return;
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
};

const createCheckConstraintInTable = async (tableName, columnName, db_name, condition) => {
    const constraintName = `CHK_${tableName}_${columnName}`;
    try {
        const newPool = await changeDatabase(db_name);
        const query = `
            ALTER TABLE ${tableName}
            ADD CONSTRAINT ${constraintName} CHECK  (${condition});
        `;
        await newPool.request().query(query);
        console.log(`Check Constraint ${constraintName} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already exists')) {
            console.log(`Check Constraint ${constraintName} already created`);
            return;
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

const deleteConstraintInTable = async (tableName, db_name, constraintName) => {
    try {
        const newPool = await changeDatabase(db_name);
        const query = `
            ALTER TABLE ${tableName}
            DROP CONSTRAINT ${constraintName};
        `;
        await newPool.request().query(query);
        console.log(`DROP Constraint ${constraintName} deleted successfully!`);
    } catch (error) {
        if (error?.message?.includes('does not exist')) {
            console.log(`DROP Constraint ${constraintName} does not exist`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

const createDefaultConstraintInTable = async (tableName, columnName, db_name, defaultValue) => {
    const constraintName = `DF_${tableName}_${columnName}`;
    try {
        const newPool = await changeDatabase(db_name);
        const query = `
            ALTER TABLE ${tableName}
            ADD CONSTRAINT ${constraintName} DEFAULT ${defaultValue} FOR ${columnName};
        `;
        await newPool.request().query(query);
        console.log(`Default Constraint ${constraintName} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already exists')) {
            console.log(`Default Constraint ${constraintName} already created`);
            return;
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

// Database
const createDB = async (db_name) => {
    try {
        await pool.request()
            .query(`CREATE DATABASE ${db_name}`);
        console.log(`Database ${db_name} created successfully!`);
    } catch (error) {
        if (error?.message?.includes('already exists')) {
            console.log(`Database ${db_name} already created`);
            return
        }
        throw error; // Rethrow the error to handle it in the calling code
    }
}

const createAllTableInDB = async (db_name, version) => {
    console.log('111111 :>> ', version.toFixed(2));
    version = version.toFixed(2);
    if (version == '1.00') {
        await createDB(db_name);
        version = '1.01';
    }
    if (version == '1.01') {
        await createTableInDatabase('tbl_carousel', createCarouselTable, db_name);
        version = '1.02';
    }
    if (version == '1.02') {
        await createUniqueIndexInTable('tbl_carousel', 'LinkId', db_name);
        await createTableInDatabase('tbl_image_language', createImageLanguageTable, db_name);
        await createReferenceConstraintInTable('tbl_image_language', 'Title', db_name, 'tbl_carousel', 'CarouselId');
        version = '1.03';
    }
    if (version == '1.03') {
        await addColumnInTable('tbl_carousel', 'DummyKey', 'int', db_name);
        await createCheckConstraintInTable('tbl_carousel', 'DummyKey', db_name, 'DummyKey > 5');
        await createDefaultConstraintInTable('tbl_carousel', 'DummyKey', db_name, '6');
        version = '1.04';
    }
    if (version == '1.04') {
        await deleteIndexInTable('tbl_carousel', db_name, 'idx_tbl_carousel_LinkId');
        await deleteConstraintInTable('tbl_image_language', db_name, 'FK_tbl_carousel_CarouselId');
        version = '1.05';
    }
    if(version == '1.05') {
    //     // await deleteTableInDatabase('tbl_carousel', db_name);
        await deleteConstraintInTable('tbl_carousel', db_name, 'CHK_tbl_carousel_DummyKey');
        await deleteConstraintInTable('tbl_carousel', db_name, 'DF_tbl_carousel_DummyKey');
        version = '1.06';
    }
    console.log('Final version :>> ', version);
    return version
    // await createTableInDatabase('tbl_users', createUserTable);
}

// const createAllTableInDB = async (db_name) => {
//     await createDB(db_name);
//     await createTableInDatabase('tbl_carousel', createCarouselTable, db_name);
//     // await createTableInDatabase('tbl_users', createUserTable);
// }

module.exports = {
    createAllTableInDB
}