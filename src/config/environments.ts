import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().port().required(),
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  FRONTEND_URL: Joi.string().required(),

  TMDB_API_KEY: Joi.string().required(),
  TMDB_BASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),

  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN : Joi.string().required(),
})

