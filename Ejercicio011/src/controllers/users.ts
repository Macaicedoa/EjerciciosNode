import { Request,Response } from "express";
import {db} from './../db.js'
import jwt from "jsonwebtoken"
import "dotenv/config"

const logIn = async(req:Request,res:Response)=>{
    const {username,password} = req.body

    const user = await db.one(`SELECT * FROM users WHERE username = $1`,username)
    if(user && user.password == password){
        const payload = {
            id: user.id,
            username,
        }
        const {SECRET} = process.env;
        if(!SECRET){
            throw new Error("SECRET does not exist")
        }
        const token = jwt.sign(payload, SECRET)

        await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id,token]);
        res.json({id:user.id, username, token})
    }else{
        res.status(400).json({msg: "Username or password incorrect"})
    }
}

export default logIn