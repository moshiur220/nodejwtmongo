import Joi from "joi"

export const userCreateValidation=(body)=>{
    const userValidation=Joi.object({
        name:Joi.string().required().min(4),
        email:Joi.string().email().required(),
        password:Joi.string().required().min(5),
        re_password: Joi.ref("password"),
    })
    return userValidation.validate(body)
}