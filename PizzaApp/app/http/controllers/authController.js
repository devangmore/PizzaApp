const User = require("../../models/User")
const bcrypt = require("bcrypt")
const passport = require('passport')

const authController = ()=>{
    return {

        login:(req,res)=>{
            res.render("auth/login")
        },
        register : (req,res)=>{
            res.render("auth/register")
        },
        postUser : async (req,res)=>{
            console.log("Data Of User",req.body)
            const {name,email,password} = req.body
            if(!name || !email || !password){
                req.flash("error", "oops, Every Fields are required...!!")
                 return res.redirect("/register")
            }

            const findUser = await User.findOne({email})
            if(findUser){
                req.flash("error", "Already Registred..!!")
                 return res.redirect("/register")
            }

            const hasedPassword = await bcrypt.hash(password,10)
            const user = new User({
                name,
                email,
                password : hasedPassword,
            })
            user.save().then(respo => {
                 return res.redirect("/")
            }).catch(err=>{
                req.flash("error", "oops, something Went Wrong, sorry. try again..")
                   return res.redirect("/register")  
            })

        },
        postLogin : (req,res,next) => {
            passport.authenticate('local', (err,user,info)=>{
                if(err){
                    req.flash("error", info.message)
                   return next(err) 
                }
                if(!user){
                    req.flash("error", info.message)
                   return res.redirect("/login")  
                }

                req.logIn(user, (err)=>{
                    if(err){
                        req.flash("error", info.message)
                        return next(err) 
                    }
                    return res.redirect("/")
                    
                })
            })(req,res,next)

        },

        logout : (req,res)=>{
            req.logout()
            res.redirect("/login")
        }
    }
}
module.exports= authController