import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const withEventValidation = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Email can not be empty',
      }),
      email: Joi.string().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email can not be empty',
      }),
      event_type: Joi.number().required().messages({
        'any.required': 'EventType is required',
        'string.empty': 'EventType can not be empty',
      }),
     
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message,
        data: error,
      });
    return handler(req, res);
  };
};

export default withEventValidation;
