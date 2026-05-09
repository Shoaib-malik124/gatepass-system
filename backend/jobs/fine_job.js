import cron from 'node-cron'
import pool from '../config/pool.js';
import 'dotenv/config'

cron.schedule("59 * * * *", async () => { // Check gatepasses every hour's last minute to impose fines.
  try {                                   // Change to a single check at 12 am,as late students may arrive till this time.
    await pool.query("BEGIN");
    const fine_amount=Number(process.env.FINE_AMOUNT)
    await pool.query(`
      UPDATE student s
      SET fine = s.fine + $1
      FROM pass p
      WHERE s.enrollment = p.enrollment
      AND p.processed = FALSE
      AND (
          (p.entry_time IS NOT NULL AND p.entry_time > p.expiry_time)
          OR
          (p.entry_time IS NULL AND CURRENT_TIMESTAMP > p.expiry_time)
      )
    `,[fine_amount]);

    await pool.query(`
      UPDATE pass 
      SET processed = TRUE
      WHERE processed = FALSE
        AND (
            entry_time IS NOT NULL
            OR CURRENT_TIMESTAMP > expiry_time
        )
    `);

    await pool.query("COMMIT");

  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
  }
});