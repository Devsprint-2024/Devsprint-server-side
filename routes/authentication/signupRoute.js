const express = require('express');
const router = express.Router();
const pool = require("../../database/Database");

router.post('/', (req, res) => {
    const {firstname, lastname, phone, country, city, email, password, imageurl, disclipline, designation} = req.body;
   // console.log(req.body);

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const userSql = `INSERT INTO Users (FirstName, LastName, Phone, Email, Password, Country, City, Profile_Pic, Disclipline, Designation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
     
      const userValues = [firstname, lastname, phone, email, password, country, city, imageurl, disclipline, designation];
      
      connection.query(userSql, userValues, (userErr, userResults) => {
        connection.release(); 

        if (userErr) 
        {
         // console.error('Error inserting data into user:', userErr);
          return res.status(500).json({ message: 'Error inserting data into user' });
        } 
        else 
        {
         // console.log('Data inserted into user successfully');
          return res.status(200).json({ message: 'User registered successfully' });
        }
      });
    });
});

module.exports = router;
