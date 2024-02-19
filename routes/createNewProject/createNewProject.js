const express = require('express');
const router = express.Router();
const pool = require("../../database/Database");

router.post('/:id', (req, res) => {
    const {name, type, description} = req.body;
    const UID = req.params.id;
    console.log(req.body);
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const sql = `SELECT ID From Disciplines WHERE Name = ?`;
     
      const values = [type];
      
      connection.query(sql, values, (userErr, Dresults) => {
        if (userErr) 
        {
          return res.status(500).json({ message: 'Error inserting data into user' });
        } 
        else 
        {
            const insert_project = `INSERT INTO Projects(User_ID, Discipline_ID, Name, Description) VALUES (?, ?, ?, ?)`;

            const insert_values = [UID, Dresults[0].ID, name, description];

            connection.query(insert_project, insert_values, (err, results) => {
              //  return res.status(200).json({message: "created"});
            })
            connection.release();
          
          return res.status(200).json({ message: 'User registered successfully' });
        }
      });
    });
});

module.exports = router;
