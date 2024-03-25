import { Router } from "express";
import { procesadores } from "../utils/procesadores";
import { Request,Response } from "express";

const router = Router();

router.get('/procesadores',(req:any,res:any)=>{
    res.json({procesadores})
})

router.get('/procesadores/:id',(req:any,res:any)=>{
    const {id} = req.params;
    const procesador = procesadores.find(p=>p.id == Number(id))
    if(procesador){
        res.json({procesador})
    }else{
        res.status(404).json({msg: "No existe id"})
    }
    
})

export default router