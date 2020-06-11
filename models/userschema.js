const Joi = require('@hapi/joi')
const schema = Joi.object({

    userName: Joi.string().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }),
    confirmPassword: Joi.ref('password'),
})
module.exports = schema