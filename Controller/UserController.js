import Joi from "joi";
import User from "../model/User";
import CustomErrorHandler from "../service/CustomErrorHandler";
import  bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD,} from "../config";
const UserController = {
    async register(req, res, next){

        //validation

        const userSchema = Joi.object({
            name:Joi.string().required().min(3).max(30),
            email:Joi.string().email().required(),
            password:Joi.string().required(),
            repeat_password:Joi.ref('password')
        })

        const {error} = userSchema.validate(req.body);
        if(error)
        {
            return next(error);
        }

        // check if user is present in the  database
        const {name , email, password} = req.body;
        try{
            const exist = await User.exists({email})
            if(exist)
            {
                return next(CustomErrorHandler.AlreadyExist("This mail is already used"));
            }

        }
        catch(err){
            return next(err);
        }

        // hash password 
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password:hashPassword,
        })

        try{
            const result = await user.save();
            // if  result is saved now send the mail to the registered email
            
            if(result)
            {
                const transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'vishalkachhap62@gmail.com',
                        pass: EMAIL_PASSWORD,
                    }
                });

                const mail = {
                    from:'vishalkachhap62@gmail.com',
                    to:email,
                    subject:"learning nodemailer library",
                    text:'Welcome user',
                }

                transporter.sendMail(mail,(err)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log("email sent successfully");
                    }
                })
            }
        }
        catch(err){
            return next(err);
        }



        res.json(user);

    }
}

export default UserController;