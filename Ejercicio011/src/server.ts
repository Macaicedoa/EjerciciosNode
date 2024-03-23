import express from "express";
import "dotenv/config"
import "express-async-errors"
import morgan from "morgan";
import { getAll, getOneByID,create,updateById,deleteByID,createImage } from "./controllers/planets.js"
import multer from "multer";

const storage = multer.diskStorage({
   destination: (req,file,cb)=>{
      cb(null,"./uploads")
   },
   filename:(req,file,cb)=>{
      cb(null,file.originalname)
   }
})
const upload = multer({storage})
const app = express()
const port = process.env.PORT;

app.use(morgan("dev"))
app.use(express.json())


app.get('/api/planets',getAll)

app.get('/api/planets/:id',getOneByID)

app.post('/api/planets',create)

app.put('/api/planets/:id',updateById)

app.delete('/api/planets/:id',deleteByID)

app.post('/api/planets/:id/image', upload.single("image") ,createImage)

app.listen(port,()=>{
   console.log(`http://localhost:${port}`) 
})

