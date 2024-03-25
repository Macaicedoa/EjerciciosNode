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

const signUp = async(req:Request,res:Response)=>{
    const {username,password} = req.body
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`,username)

    if(user){
        res.status(409).json({msg: "User already exists"})
    }else{
        const {id} = await db.one(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id`,[username,password]);
        res.status(201).json({id, msg: "User created"})
    }

}

const logOut = async(req:Request,res:Response)=>{
    const user:any = req.user;
    await db.none(`UPDATE users SET token=$2 WHERE id =$1`,[user?.id,null])
    res.json({msg: "Logout succesful"})
}

export {logIn,signUp, logOut}