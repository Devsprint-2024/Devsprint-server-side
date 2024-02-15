const express = require('express');
const router = express.Router();
const pool = require("../../database/Database");

router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const sql = `SELECT * FROM Users WHERE Email = ?`;

    connection.query(sql, [email], (err, results, fields) => {
      connection.release(); 

      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      if (user.Password === password) {
        return res.status(200).json({ userMatched: 1, userData: user.Email });
      } else {
        return res.status(500).json({ userMatched: -1 });
      }
    });
  });
});

module.exports = router;
