import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './router/auth.js'
// import pool from './config/db.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT;
// pool();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`)
})

