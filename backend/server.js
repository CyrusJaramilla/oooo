const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",       
    database: "signup",
    port: "3308"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error during signup:", err);
            return res.status(500).json("Error");
        }
        return res.json(data);
    });
});


app.post('/login', [], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Error during login:", err);
            return res.status(500).json("Error");
        }

        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});


/*cit*/
app.post('/api/cit', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description, date } = req.body;
    const file = req.file.filename;

    const sql = "INSERT INTO cit_extension (title, description, date, file) VALUES (?, ?, ?, ?)";
    const values = [title, description, date, file];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting document into database:", err);
            return res.status(500).json({ error: "Error inserting document" });
        }

        const newId = result.insertId;
        return res.status(201).json({ id: newId, title, description, date, file });
    });
});


app.get('/api/cit', (req, res) => {
    const sql = "SELECT * FROM cit_extension";
    db.query(sql, (err, documents) => {
        if (err) {
            console.error("Error fetching documents:", err);
            return res.status(500).json("Error fetching documents");
        }
        res.json(documents);
    });
});


app.put('/api/cit/:id', upload.single('file'), (req, res) => {
    const { id } = req.params;

    const { title, description, date } = req.body;
    const file = req.file ? req.file.filename : null; 

    const sql = "UPDATE cit_extension SET title = ?, description = ?, date = ?, file = ? WHERE id = ?";
    const values = [title, description, date, file, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating document:", err);
            return res.status(500).json({ error: "Error updating document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.json({ id, title, description, date, file });
    });
});


app.delete('/api/cit/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM cit_extension WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting document:", err);
            return res.status(500).json({ error: "Error deleting document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.status(204).send(); 
    });
});

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.head('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.status(200).send('File exists');
  });
});

//coed

app.post('/api/coed', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description, date } = req.body;
    const file = req.file.filename;

    const sql = "INSERT INTO coed_extension (title, description, date, file) VALUES (?, ?, ?, ?)";
    const values = [title, description, date, file];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting document into database:", err);
            return res.status(500).json({ error: "Error inserting document" });
        }

        const newId = result.insertId;
        return res.status(201).json({ id: newId, title, description, date, file });
    });
});


app.get('/api/coed', (req, res) => {
    const sql = "SELECT * FROM coed_extension";
    db.query(sql, (err, documents) => {
        if (err) {
            console.error("Error fetching documents:", err);
            return res.status(500).json("Error fetching documents");
        }
        res.json(documents);
    });
});


app.put('/api/coed/:id', upload.single('file'), (req, res) => {
    const { id } = req.params;

    const { title, description, date } = req.body;
    const file = req.file ? req.file.filename : null; 

    const sql = "UPDATE coed_extension SET title = ?, description = ?, date = ?, file = ? WHERE id = ?";
    const values = [title, description, date, file, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating document:", err);
            return res.status(500).json({ error: "Error updating document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.json({ id, title, description, date, file });
    });
});


app.delete('/api/coed/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM coed_extension WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting document:", err);
            return res.status(500).json({ error: "Error deleting document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.status(204).send(); 
    });
});

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.head('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.status(200).send('File exists');
  });
});




//cas
app.post('/api/cas', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description, date } = req.body;
    const file = req.file.filename;

    const sql = "INSERT INTO cas_extension (title, description, date, file) VALUES (?, ?, ?, ?)";
    const values = [title, description, date, file];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting document into database:", err);
            return res.status(500).json({ error: "Error inserting document" });
        }

        const newId = result.insertId;
        return res.status(201).json({ id: newId, title, description, date, file });
    });
});


app.get('/api/cas', (req, res) => {
    const sql = "SELECT * FROM cas_extension";
    db.query(sql, (err, documents) => {
        if (err) {
            console.error("Error fetching documents:", err);
            return res.status(500).json("Error fetching documents");
        }
        res.json(documents);
    });
});


app.put('/api/cas/:id', upload.single('file'), (req, res) => {
    const { id } = req.params;

    const { title, description, date } = req.body;
    const file = req.file ? req.file.filename : null; 

    const sql = "UPDATE cas_extension SET title = ?, description = ?, date = ?, file = ? WHERE id = ?";
    const values = [title, description, date, file, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating document:", err);
            return res.status(500).json({ error: "Error updating document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.json({ id, title, description, date, file });
    });
});


app.delete('/api/cas/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM cas_extension WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting document:", err);
            return res.status(500).json({ error: "Error deleting document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.status(204).send(); 
    });
});

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.head('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.status(200).send('File exists');
  });
});



//coe
app.post('/api/coe', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description, date } = req.body;
    const file = req.file.filename;

    const sql = "INSERT INTO coe_extension (title, description, date, file) VALUES (?, ?, ?, ?)";
    const values = [title, description, date, file];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting document into database:", err);
            return res.status(500).json({ error: "Error inserting document" });
        }

        const newId = result.insertId;
        return res.status(201).json({ id: newId, title, description, date, file });
    });
});


app.get('/api/coe', (req, res) => {
    const sql = "SELECT * FROM coe_extension";
    db.query(sql, (err, documents) => {
        if (err) {
            console.error("Error fetching documents:", err);
            return res.status(500).json("Error fetching documents");
        }
        res.json(documents);
    });
});


app.put('/api/coe/:id', upload.single('file'), (req, res) => {
    const { id } = req.params;

    const { title, description, date } = req.body;
    const file = req.file ? req.file.filename : null; 

    const sql = "UPDATE coe_extension SET title = ?, description = ?, date = ?, file = ? WHERE id = ?";
    const values = [title, description, date, file, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating document:", err);
            return res.status(500).json({ error: "Error updating document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.json({ id, title, description, date, file });
    });
});


app.delete('/api/coe/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM coe_extension WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting document:", err);
            return res.status(500).json({ error: "Error deleting document" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Document not found.');
        }

        res.status(204).send(); 
    });
});

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.head('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.status(200).send('File exists');
  });
});



app.listen(3001, () => {
    console.log("Server listening on port 3001");
});
