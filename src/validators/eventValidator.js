const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.string().required(),
            name: Joi.string().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            description: Joi.string(),
            location: Joi.string(),
            userEmails: Joi.array().items(Joi.string().email()),
        })

    }),

    accept: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),
            event_id: Joi.string().required(),
        })
    }),

    getByUserId: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required()
        })
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),
            event_id: Joi.string().required(),
        })
    }),
}