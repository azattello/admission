const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const https = require('https');
const config = require("config");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");
const uploadRouter = require("./routes/upload.routes");
const facultyRouter = require("./routes/faculty.routes");
const specialtyRouter = require("./routes/specialty.routes");

const corsMiddleware = require('./middleware/cors.middleware');
const createSuperAdmin = require('./routes/initSuperAdmin.routes')

const app = express();
const PORT = process.env.PORT || config.get('serverPort');

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/specialty', specialtyRouter);

// Вызов создания супер-администратора
// createSuperAdmin();

// HTTPS options
// const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/nurapost.kz/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/nurapost.kz/fullchain.pem')
// };

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));

        // Create HTTPS server
        // https.createServer(httpsOptions, app).listen(PORT, () => {
        //     console.log("Server started on the port ", PORT);
        // });

        app.listen(PORT, () => {
            console.log("Server started on the port ", PORT)
        })
        
    } catch (error) {
        console.log(error);
    }
}

start();
