const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all products
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new product
router.post('/', (req, res) => {
  const { name, manufacturer, origin, quantity } = req.body;
  db.run(
    `INSERT INTO products (name, manufacturer, origin, quantity) VALUES (?, ?, ?, ?)`,
    [name, manufacturer, origin, quantity],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// PUT (update) a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, manufacturer, origin, quantity } = req.body;
  db.run(
    `UPDATE products SET name = ?, manufacturer = ?, origin = ?, quantity = ? WHERE id = ?`,
    [name, manufacturer, origin, quantity, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM products WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
