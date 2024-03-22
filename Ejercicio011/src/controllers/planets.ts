import { Request,Response } from "express";
import Joi from "joi";

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

const getAll = (req:Request,res:Response)=>{
    res.status(200).json({planets});
}

const getOneByID = (req:Request,res:Response)=>{
    const {id} = req.params;
    const planet = planets.find(p=>p.id===Number(id));

    res.status(200).json({planet})
}

const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
})

const create = (req:Request,res:Response)=>{
    console.log(req.body);
    const {id,name} = req.body
    const newPlanet: Planet = {id,name}
    const validatedNewPlanet = planetSchema.validate(newPlanet)

    if(validatedNewPlanet.error){
        return res.status(400).json({msg: validatedNewPlanet.error.details[0].message})
    }else{
        planets = [...planets,newPlanet];
        res.status(201).json({msg: "The planet was created"});
    }
    console.log(planets)
  }


const updateById = (req:Request,res:Response)=>{
    const {id} = req.params;
    const {name} = req.body;
    const validatedUpdatePlanet = planetSchema.validate({id,name})

    if(validatedUpdatePlanet.error){
        return res.status(400).json({msg: validatedUpdatePlanet.error.details[0].message})
    }else{
        planets = planets.map(p=> p.id === parseInt(id)?({...p,name}):p)
        res.status(200).json({msg: "The planet was updated"})
    }
    console.log(planets);
  }

const deleteByID = (req:Request,res:Response)=>{
    const {id} = req.params;
    planets = planets.filter(p=>p.id!=parseInt(id))
  
    console.log(planets)
    res.status(200).json({msg: "The planet was deleted"})
  }

export { getAll, getOneByID,create,updateById,deleteByID }