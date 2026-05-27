import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client/extension';
import { ENV } from 'src/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('Prisma');

  constructor() {
    const adapter = new PrismaPg({ connectionString: ENV.dbUrl });

    super({
      adapter,
      log:
        ENV.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  async cleanDatabase() {
    if (ENV.nodeEnv === 'production') {
      this.logger.warn('Attempt to clean database in production');
      throw new Error('Cannot clean database in production');
    }
    const models = Reflect.ownKeys(this).filter(
      (key) => typeof key === 'string' && !key.startsWith('_'),
    );

    // me quedo con los nombres de las tablas (modelos).
    // Antes del filtro: ['user', 'post', '$connect', '_baseDmmf', 'cleanDatabase']
    // Despues del filtro: ['user', 'post']

    this.logger.warn('Cleaning database');

    return Promise.all(
      models.map((modelKey) => {
        if (typeof modelKey === 'string') {
          return this[modelKey].deleteMany();
        }
      }),
    );
  }
}
