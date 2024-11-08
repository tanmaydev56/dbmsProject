// index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Make sure 'db' is properly set up for connecting to your database

const app = express();
app.use(cors());
app.use(express.json()); // for parsing JSON data

// Sample route to fetch products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
//route to fetch transactions 
app.get('/api/inventory_transactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_transactions');
    res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
   
  }
});
app.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(`
      SELECT ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price
      FROM Cart_Items ci
      JOIN Products p ON ci.product_id = p.product_id
      JOIN Shopping_Cart sc ON ci.cart_id = sc.cart_id
      WHERE sc.user_id = $1
    `, [userId]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


//route to fetch orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Orders');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to fetch categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Categories');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



// Route to fetch shopping cart items
app.get('/api/cart_items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Cart_Items');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to fetch product images
app.get('/api/product_images', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Product_Images');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to fetch reviews
// app.get('/api/reviews', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM Reviews');
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });

// Route to fetch orders
app.get('/api/order_items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Order_Items');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Route to fetch payments
// app.get('/api/payments', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM Payments');
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });

// Route to fetch reward points
// app.get('/api/rewards', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM Rewards');
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
