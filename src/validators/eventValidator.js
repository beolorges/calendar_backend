const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.string().required(),
            name: Joi.string().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            description: Joi.string().allow('').optional(),
            location: Joi.string().allow('').optional(),
            userEmails: Joi.array().items(Joi.string().allow('')).optional(),
        })

    }),

    edit: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user_id: Joi.string().required(),
            name: Joi.string().optional(),
            startTime: Joi.string().optional(),
            endTime: Joi.string().optional(),
            description: Joi.string().allow('').optional(),
            location: Joi.string().allow('').optional(),
            userEmails: Joi.array().items(Joi.string().allow('')).optional(),
        }),
        [Segments.PARAMS]: Joi.object().keys({
            event_id: Joi.string().required(),
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
    getByEventId: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            event_id: Joi.string().required()
        })
    }),
    delete: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.string().required(),
            event_id: Joi.string().required(),
        })
    }),
}