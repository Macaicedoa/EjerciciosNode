import "dotenv/config"
import express from "express"
import rutaProcesadores from "./routes/procesadores";


const {PORT} = process.env

const app = express();

app.use(express.json());

app.use('/',rutaProcesadores);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})