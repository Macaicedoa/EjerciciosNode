import { Router } from "express";
import { procesadores } from "../utils/procesadores";
import { Request,Response } from "express";
import { getProcesadores,getProcesadoresById,postProcesador,deleteProcesador,updateProcesador } from "../controllers/procesadores";

const router = Router();

router.get('/procesadores',getProcesadores)

router.get('/procesadores/:id',getProcesadoresById)

router.post('/procesadores',postProcesador)

router.delete('/procesadores/:id',deleteProcesador)

router.put('/procesadores/:id',updateProcesador)

export default router