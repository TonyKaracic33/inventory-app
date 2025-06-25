const express = require("express");
const router = express.Router();
const db = require("../db/database");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   manufacturer:
 *                     type: string
 *                   origin:
 *                     type: string
 *                   quantity:
 *                     type: integer
 */
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - manufacturer
 *               - origin
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               origin:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post("/", (req, res) => {
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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - manufacturer
 *               - origin
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               origin:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: integer
 */
router.put("/:id", (req, res) => {
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

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: integer
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM products WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
