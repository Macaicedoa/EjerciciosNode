import { Request,Response } from "express";
import Joi = require("joi");

let procesadores = [
    {
        id: 1,
        modelo: "Ryzen 3 3100",
        hz_base: "3.6 GHz",
        hz_max: "3.9 GHz",
        hilos: 8,
        socket: "AM4",
        fabricación: "7nm",
        caché: "18 MB"
      },
      {
        id: 2,
        modelo: "Ryzen 5 3600",
        hz_base: "3.6 GHz",
        hz_max: "4.2 GHz",
        hilos: 12,
        socket: "AM4",
        fabricación: "7nm",
        caché: "35 MB"
      },
]

const procesadorEsquema = Joi.object({
    id: Joi.number().required(),
    modelo: Joi.string().required(),
    hz_base: Joi.string(),
    hz_max: Joi.string(),
    hilos: Joi.number(),
    socket: Joi.string(),
    fabricación: Joi.string(),
    caché: Joi.string()
});


const getProcesadores = (req:any,res:any)=>{
    res.json({procesadores})
}

const getProcesadoresById = (req:any,res:any)=>{
    const {id} = req.params;
    const procesador = procesadores.find(p=>p.id == Number(id))
    if(procesador){
        res.json({procesador})
    }else{
        res.status(404).json({msg: "No existe id"})
    }
    
}

const postProcesador = (req:any,res:any)=>{
    const procesador = req.body;
    const {error} = procesadorEsquema.validate(procesador)
    if(!error){
        procesadores.push(procesador)
        res.json({procesador})
    }else{
        res.status(400).json({msg: error })
    }
}

const deleteProcesador = (req:any,res:any)=>{
    const {id} = req.params;
    const procesadoresFiltrados = procesadores.filter(p => p.id!=Number(id))
    if(procesadoresFiltrados.length!=procesadores.length){
        res.json({procesadoresFiltrados})
        procesadores = procesadoresFiltrados
    }else{
        res.status(404).json({msg: "No se puede borrar procesador" })
    }

}

const updateProcesador = (req:any,res:any)=>{
    const {id} = req.params;
    const newInfo = req.body;
    procesadores = procesadores.map(p => Number(id)==p.id?{...p,...newInfo}:p)
    res.json({procesadores})
    
}

export {getProcesadores,getProcesadoresById,postProcesador,deleteProcesador,updateProcesador}