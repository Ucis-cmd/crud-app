const pool = require("./db");

async function create(data) {
  try {
    const connection = await pool.getConnection();
    const query = "INSERT INTO your_table_name (name) VALUES (?)";
    const result = await connection.query(query, [data]);
    connection.release();
    return result;
  } catch (error) {
    throw new Error("Error creating record: " + error.message);
  }
}

async function read(id) {
  try {
    const connection = await pool.getConnection();
    const query = "SELECT * FROM your_table_name WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.release();
    if (rows.length === 0) {
      throw new Error("Record not found");
    }
    return rows[0];
  } catch (error) {
    throw new Error("Error reading record: " + error.message);
  }
}

async function readAll() {
  try {
    const connection = await pool.getConnection();
    const query = "SELECT * FROM your_table_name";
    const [rows] = await connection.query(query);
    connection.release();
    if (rows.length === 0) {
      throw new Error("No records found");
    }
    return rows;
  } catch (error) {
    throw new Error("Error reading records: " + error.message);
  }
}

async function update(id, data) {
  try {
    const connection = await pool.getConnection();
    const query = "UPDATE your_table_name SET name = ? WHERE id = ?";
    const result = await connection.query(query, [data, id]);
    connection.release();
    if (result.affectedRows === 0) {
      throw new Error("Record not found");
    }
    return result;
  } catch (error) {
    throw new Error("Error updating record: " + error.message);
  }
}

async function remove(id) {
  try {
    const connection = await pool.getConnection();
    const query = "DELETE FROM your_table_name WHERE id = ?";
    const result = await connection.query(query, [id]);
    connection.release();
    if (result.affectedRows === 0) {
      throw new Error("Record not found");
    }
    return result;
  } catch (error) {
    throw new Error("Error deleting record: " + error.message);
  }
}

module.exports = {
  create,
  read,
  readAll,
  update,
  remove,
};
