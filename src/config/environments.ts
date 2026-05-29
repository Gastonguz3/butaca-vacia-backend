import * as Joi from 'joi';

//Joi convierte las variables de entorno en un contrato estricto que la aplicacion debe cumplir antes de iniciar

export const envSchema = Joi.object({
  PORT: Joi.number().port().required(),
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN : Joi.string().required(),
})

