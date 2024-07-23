const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const port = process.env.REACT_APP_API_PORT;
const userRouter = require('./routes/userRoute');
const deathRouter = require('./routes/deathRoute');
const bornRouter = require('./routes/bornRoute');
const infoRouter = require("./routes/infoRoute");
const makeWillRouter = require('./routes/makeWillRoute');
const fileUploadRouter = require('./routes/fileUploadRouter');
const adminRouter = require('./routes/adminRoute');
const paymentRoute = require('./routes/paymentRoute');
const connectDB = require('./util/dbconnection');
// const backupDatabase = require('./util/backup');

// Connect to the database
connectDB();

// CORS options
const corsOptions = {
    origin: process.env.REACT_APP_CLIENT_URL, // Fallback to localhost if env variable is not set
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};


// Use CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static('../public'));

// backupDatabase();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(userRouter);
app.use(deathRouter);
app.use(bornRouter);
app.use(infoRouter);
app.use(makeWillRouter);
app.use(fileUploadRouter);
app.use(adminRouter);
app.use(paymentRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
