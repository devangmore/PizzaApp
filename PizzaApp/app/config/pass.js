const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const bcrypt = require("bcrypt")
const passportInit = (passport)=>{

    passport.use(new LocalStrategy({usernameField : "email"},async (email,password,done)=>{

        const user = await User.findOne({email})
        if(!user){
           return done(null,false,{message : "No user with this email..."})
        }

        try{
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
               return  done(null,user,{message: "Logged in Successfully"})
            }else{
                return done(null,false,{message : "Wrong Email or Password.."})
            }
        }catch(e){
            return done(null,false, {message : "Something went Wron..."})
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
            User.findById(id,(err,user)=>{
                done(err,user)
            })
    })

}

module.exports = passportInit