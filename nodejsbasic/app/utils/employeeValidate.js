const joi = require('joi');


const employeeValidation=joi.object({
    name:joi.string()
    .required()
    .min(3),

    email:joi.string()
    .required()
    .email(),

    phone:joi.string()
    .required()
    .min(10)
    .message({
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number is required',
        'string.min': 'Phone number must be at least 10 characters long',
    }),
  

   age:joi.number()
   .required()
   .min(18)
})



module.exports= employeeValidation