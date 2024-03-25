import express from "express";
import "dotenv/config"
import "express-async-errors"
import morgan from "morgan";
import { getAll, getOneByID,create,updateById,deleteByID,createImage } from "./controllers/planets.js"
import {logIn,signUp,logOut} from "./controllers/users.js"
import authorize from "./authorize.js";
import "./passport.js"
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

app.post("/api/users/login", logIn)
app.post("/api/users/signup", signUp)
app.post("/api/users/logout", authorize, logOut)

app.listen(port,()=>{
   console.log(`http://localhost:${port}`) 
})
