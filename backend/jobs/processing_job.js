import cron from 'node-cron'
import pool from '../config/pool.js';
import 'dotenv/config'

cron.schedule("59 23 * * *", async () => { // min,hour,day of month,month,day of week
  try {                                  
    await pool.query("BEGIN");
    
    await pool.query(`
      DELETE FROM pass
      WHERE processed=FALSE
      AND scanout=FALSE
    `);

    await pool.query("COMMIT");

  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
  }
});