const express = require('express');
const router = express.Router();
const pool = require("../../database/Database");

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  //console.log(userId);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const sql = `SELECT * FROM Users WHERE ID = ?`;

    connection.query(sql, [userId], (err, results, fields) => {
      connection.release(); 

      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      return res.status(200).json({ user });
    });
  });
});

module.exports = router;
