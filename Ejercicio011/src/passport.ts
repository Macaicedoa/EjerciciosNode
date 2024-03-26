import "dotenv/config"
import passport from "passport"
import passportJWT from "passport-jwt"
import { db } from './db.js';

const {SECRET} = process.env;
if(!SECRET){
    throw new Error("SECRET does not exist")
}
passport.use(
    new passportJWT.Strategy(
        {
            secretOrKey:SECRET,
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async(payload,done)=>{
            try{
                const user = await db.one(`SELECT * FROM user WHERE id=$1`,payload.id)
                console.log(user);
                return user ? done(null,user) : done(new Error("User not found"))
            }catch(error){
                done(error)
            }
        }
    )
)
