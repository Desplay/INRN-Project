import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.sqlite");

const getTableExists = async (tableName: string): Promise<any> => {
  let tableExists: any;
  await db.transactionAsync(async (tx) => {
    tableExists = await tx.executeSqlAsync(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
    );
  });
  if ("error" in tableExists) {
    return tableExists;
  }
  return tableExists.rows.length > 0;
};

const getLength = async (tableName: string): Promise<number | any> => {
  let length: any;
  await db.transactionAsync(async (tx) => {
    length = await tx.executeSqlAsync(`SELECT COUNT(*) FROM ${tableName}`);
  });
  if ("error" in length) {
    return length;
  }
  return length.rows[0]["COUNT(*)"];
};

const createTable = async (
  tableName: string,
  columns: string[]
): Promise<boolean | any> => {
  let tableCreated: any;
  await db.transactionAsync(async (tx) => {
    tableCreated = await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(", ")})`
    );
  });
  if ("error" in tableCreated) {
    return tableCreated;
  }
  return true;
};

const insertData = async (
  tableName: string,
  columns: string[],
  values: string[]
): Promise<boolean | any> => {
  let dataInserted: any;
  await db.transactionAsync(async (tx) => {
    dataInserted = await tx.executeSqlAsync(
      `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values
        .map(() => "?")
        .join(", ")})`,
      values
    );
  });
  if ("error" in dataInserted) {
    return dataInserted;
  }
  return true;
};

const getAllData = async (tableName: string): Promise<any> => {
  let data: any;
  await db.transactionAsync(async (tx) => {
    data = await tx.executeSqlAsync(`SELECT * FROM ${tableName}`);
  });
  if ("error" in data) {
    return data;
  }
  return data.rows;
};

const getData = async (
  tableName: string,
  columns: string[],
  condition?: string
): Promise<any> => {
  let data: any;
  await db.transactionAsync(async (tx) => {
    data = await tx.executeSqlAsync(
      `SELECT ${columns.join(", ")} FROM ${tableName} ${
        condition ? `WHERE ${condition}` : ""
      }`
    );
    console.log(data);
  });
  if ("error" in data || data.rows.length === 0) {
    return false;
  }
  return data.rows;
};

const updateData = async (
  tableName: string,
  columns: string[],
  values: string[],
  condition: string
): Promise<boolean | any> => {
  let dataUpdated: any;
  await db.transactionAsync(async (tx) => {
    dataUpdated = await tx.executeSqlAsync(
      `UPDATE ${tableName} SET ${columns.join("=?, ")}=? WHERE ${condition}`,
      values
    );
  });
  if ("error" in dataUpdated) {
    return dataUpdated;
  }
  return true;
};

const deleteData = async (
  tableName: string,
  condition: string
): Promise<boolean | any> => {
  let dataDeleted: any;
  await db.transactionAsync(async (tx) => {
    dataDeleted = await tx.executeSqlAsync(
      `DELETE FROM ${tableName} WHERE ${condition}`
    );
  });
  if ("error" in dataDeleted) {
    return dataDeleted;
  }
  return true;
};

const dropTable = async (tableName: string): Promise<boolean | any> => {
  let tableDropped: any;
  await db.transactionAsync(async (tx) => {
    tableDropped = await tx.executeSqlAsync(`DROP TABLE ${tableName}`);
  });
  if ("error" in tableDropped) {
    return tableDropped;
  }
  return true;
};

const dbServices = {
  getTableExists,
  getLength,
  createTable,
  insertData,
  getData,
  getAllData,
  updateData,
  deleteData,
  dropTable,
};

export default dbServices;
