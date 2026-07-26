import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import { sendSecurityOffMail, sendSecurityOnMail } from '../utils/emailSender.js'

const adminRouter=express.Router()

adminRouter.get('/delete',authMiddleware,async(req,res)=>{
    try {
        const id=req.user
        await pool.query(
            "DELETE FROM admin WHERE id=$1",
            [id]
        )
        return res.json({success:true,message:'Account deleted successfully'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/addSecurity', authMiddleware, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Incomplete credentials' });
        }
        const result = await pool.query(
            "SELECT * FROM security WHERE email = $1",
            [email]
        );

        if (result.rows.length > 0) {
            return res.json({ success: false, message: 'This email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO security (email, password) VALUES ($1, $2)",
            [email, hashedPassword]
        );

        const response = await sendSecurityOnMail(email, password);
        return res.json(response);

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});

adminRouter.post('/removeSecurity', authMiddleware, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: 'No email provided' });
        }
        const result = await pool.query(
            "DELETE FROM security WHERE email = $1",
            [email]
        );

        if (result.rowCount === 0) {
            return res.json({ success: false, message: 'This account does not exist' });
        }

        const response = await sendSecurityOffMail(email);
        return res.json(response);

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});

adminRouter.post('/setRules',authMiddleware,async(req,res)=>{
    try {
      let {movement,start,end,fine,max_fine}=req.body
      
      const response=await pool.query(
        "SELECT permission,min_time,max_time,fine_rate FROM gatepass_rules WHERE id= $1",
        [1]
      );

      if(!movement)movement=response.rows[0].permission
      if(!start)start=response.rows[0].min_time
      if(!end)end=response.rows[0].max_time
      if(!fine)fine=response.rows[0].fine_rate
      if(!max_fine)max_fine=response.rows[0].max_fine

      await pool.query(
        "UPDATE gatepass_rules SET permission=$1,min_time=$2,max_time=$3,fine_rate=$4,max_fine=$5 WHERE id=$6",
        [movement,start,end,fine,max_fine,1]
      )

      return res.json({success:true,message:'Gatepass rules updated successfully'})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

export default adminRouter