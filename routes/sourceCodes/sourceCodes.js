const express = require('express');
const router = express.Router();
const pool = require("../../database/Database");

router.get('/:projectName/:filename', (req, res) => {
  const name = req.params.projectName;
  const file = req.params.filename;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const sql = `SELECT FileContent FROM SourceCodeFiles WHERE FileName = ?`;

    connection.query(sql, [filename], (err, results, fields) => {
      connection.release(); 

      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const code = results[0].FileContent;
      return res.status(200).json({ code });
    });
  });
});

module.exports = router;
