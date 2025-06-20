// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// POST endpoint to receive and insert voter data
app.post('/api/voters', async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      // Single entry (manual form entry)
      await insertVoter(data);
    } else {
      // Multiple entries (Excel import)
      for (const row of data) {
        await insertVoter(row);
      }
    }

    res.status(200).send({ message: 'Voter(s) added successfully' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send({ error: 'Database insertion error' });
  }
});

// Helper function to insert a voter row
async function insertVoter(voter) {
  const {
    ward, lbody, name, gname, gage,
    station, idno, hno, hname
  } = voter;

  const query = `
    INSERT INTO voters (
      ward, lbody, name, gname, gage,
      station, idno, hno, hname
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  `;

  const values = [ward, lbody, name, gname, gage, station, idno, hno, hname];

  await pool.query(query, values);
}

// GET all voter data
app.get('/api/voters', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM voters');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.post('/api/registers', async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      // Single entry (manual form entry)
      await register(data);
    } else {
      // Multiple entries (Excel import)
      for (const row of data) {
        await register(row);
      }
    }

    res.status(200).send({ message: 'Register successfully' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send({ error: 'Database insertion error' });
  }
});

async function register(register) {
  const {
    username,password,confirmPassword
  } = register;

  const query = `
    INSERT INTO register (
     username,password,confirmpass
    ) VALUES ($1,$2,$3)
  `;

  const values = [username,password,confirmPassword];

  await pool.query(query, values);
}


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM register WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/logins', async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      // Single entry (manual form entry)
      await login(data);
    } else {
      // Multiple entries (Excel import)
      for (const row of data) {
        await login(row);
      }
    }

    res.status(200).send({ message: 'Register successfully' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send({ error: 'Database insertion error' });
  }
});

async function login(currentlogins) {
  const {
    username,password
  } = currentlogins;

  const query = `
    INSERT INTO currentlogins (
     username,password
    ) VALUES ($1,$2)
  `;

  const values = [username,password];

  await pool.query(query, values);
}

// routes/auth.js or similar
app.post('/api/logout', async (req, res) => {
  const { userId } = req.body;
  const logoutTime = new Date();

  try {
    // 1. Delete user from CurrentLogins
    await pool.query('DELETE FROM currentLogins WHERE username = ?', [userId]);

    // 2. Update Register table
    await pool.query('UPDATE register SET last_loggedon = ? WHERE username = ?', [logoutTime, userId]);

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
