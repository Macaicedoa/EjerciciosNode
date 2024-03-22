import express from "express";
import "dotenv/config"
import "express-async-errors"
import morgan from "morgan";

const app = express()
const port = process.env.PORT;

app.use(morgan("dev"))
app.use(express.json())

type Planet = {
    id:number;
    name:string;
}

type Planets = Planet[];

let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

app.get('/api/planets',(req,res)=>{
    res.status(200).json({planets})
})

app.get('/api/planets/:id',(req,res)=>{
    const {id} = req.params;
    const planet = planets.find(p=>p.id===Number(id));

    res.status(200).json({planet})
})

app.post('/api/planets',(req,res)=>{
  console.log(req.body);
  const {id,name} = req.body
  const newPlanet = {id,name}
  planets = [...planets,newPlanet];

  console.log(planets)

  res.status(201).json({msg: "The planet was created"});
})

app.listen(port,()=>{
   console.log(`http://localhost:${port}`) 
})

