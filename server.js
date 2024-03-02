const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bandit#082321',
  database: 'BetterHealth',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Create Workout
app.post('/api/createWorkout', (req, res) => {
  const { buttonName } = req.body;
  console.log('Received buttonName:', buttonName);

  const sql = 'INSERT INTO Workout (button_name) VALUES (?)';
  db.query(sql, [buttonName], (err, result) => {
    if (err) {
      console.error('Error creating workout: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});

// Create Instance
app.post('/api/createInstance', async (req, res) => {
  const { date, weight, workoutId } = req.body;
  console.log('Received data:', date, weight, workoutId);

  if (!workoutId) {
    console.error('workoutId is missing');
    return res.status(400).json({ error: 'workoutId is required' });
  }

  const sql = 'INSERT INTO INSTANCE (date, weight, workout_id) VALUES (?, ?, ?)';
  db.query(sql, [date, weight, workoutId], async (err, result) => {
    if (err) {
      console.error('Error creating instance: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Instance created successfully');
      const instances = await fetchInstances(workoutId);
      res.json({ success: true, instances });
    }
  });
});

// Get WorkoutId by Name
app.get('/api/getWorkoutIdByName', (req, res) => {
    const { name } = req.query;
  
    const sql = 'SELECT workout_id FROM Workout WHERE button_name = ?';
    db.query(sql, [name], (err, results) => {
      if (err) {
        console.error('Error fetching workoutId:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length > 0) {
        const workoutId = results[0].workout_id;
        res.json({ workoutId });
      } else {
        res.status(404).json({ error: 'Workout not found' });
      }
    });
  });

// Fetch Workouts
app.get('/api/fetchWorkouts', (req, res) => {
  const { workoutId } = req.query;

  const sql = 'SELECT button_name FROM Workout ORDER BY workout_Id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching workouts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const buttonNames = results.map(result => result.button_name);
      res.json(buttonNames);
    }
  });
});


// Fetch Instances
app.get('/api/fetchInstances', async (req, res) => {
  const { workoutId } = req.query;

  const sql = 'SELECT date, weight FROM INSTANCE WHERE workout_id = ? ORDER BY date DESC';
  db.query(sql, [workoutId], (err, results) => {
    if (err) {
      console.error('Error fetching instances:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

const fetchInstances = async (workoutId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/fetchInstances?workoutId=${workoutId}`);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Instances:', data);
      return data; 
    } else {
      console.error('Failed to fetch instances. Response status:', response.status);
      console.error('Response text:', await response.text());
      return null;  
    }
  } catch (error) {
    console.error('Error fetching instances:', error);
    return null;  
  }
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
