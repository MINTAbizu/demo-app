const express = require('express');
// const bodyParser = require('body-parser');
// const setRoutes = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3000;
const  mysql =require('mysql');
//remove
//   setup  mysql data base connection 

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const cors = require('cors');
   //setup mysql data base connect
const db = mysql.createConnection({
    host: 'localhost',
    user: 'demoapp',
    password: 'demoapp',
    database: 'demoapp'
});
 const corsOptions = {
    origin: 'http://localhost:3000',
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     preflightContinue: false,
     optionsSuccessStatus: 204
};
 app.use(cors(corsOptions));
   app.use(cors());
 db.connect((err) => {
     if (err) {
        console.error('Error connecting to the database:', err);
      } else {
          console.log('Connected to the database');
     }
    })
;  
app.get('/', (req, res) => {
    res.send('Hello World!');
 
}
); 
//create a table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
`;
db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created or already exists');
    }
}
);

//post method to add data to the database
app.get('/getemploye', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.status(200).json(result);
        }
    });
}
);

// req.body value firstname, lastname, email, password update the database
// post method to add data to the database
app.post('/addemploye', (req, res) => {
    const { firstname,lastname, email,password } = req.body;
    const sql = 'INSERT INTO users (firstname,lastname,email,passsword) VALUES (?, ?,?,?)';
    db.query(sql, [firstname,lastname, email,password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
        } else {
            res.status(200).send('Data inserted successfully');
        }
    });
}
);
//login method to check if the user exists in the database
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else if (result.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
}
);


//update method to update the data in the database

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});