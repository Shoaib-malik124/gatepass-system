import pool from "../config/pool.js";
export const checkPass = async (enrollment) => {
  try {
    const result = await pool.query(
      `SELECT * FROM pass
       WHERE enrollment = $1
       AND processed = false`,
      [enrollment]
    );

    if (result.rows.length > 0) {
      return {
        hasPass:true
      };
    } else {
      return {
        hasPass:false
      };
    }
  } catch (error) {
    console.log(error.message);
    return { hasPass: false };
  }
};