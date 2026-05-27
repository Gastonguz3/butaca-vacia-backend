import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVariables {
  PORT: number;
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production';
}

const envSchema = Joi.object({
  PORT: Joi.number().port().required(),
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').required()
}).unknown();

const { error, value } = envSchema.validate({ ...process.env });

if (error) {
  throw new Error(`Environments error ${error.message}`);
}

const env: EnvVariables = value;

export const ENV = {
  port: env.PORT,
  dbUrl: env.DATABASE_URL,
  nodeEnv: env.NODE_ENV
};
