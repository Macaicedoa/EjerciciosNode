import "dotenv/config"
import passport from "passport"
import passportJWT from "passport-jwt"
import { db } from './db';

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
            const user = db.one(`SELECT * FROM user WHERE id=$1`,payload.id)
            console.log(user);

            try{
                return user ? done(null,user) : done(new Error("User not found"))
            }catch(error){
                done(error)
            }
        }
    )
)