import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('Prisma');

  constructor(private readonly configService: ConfigService) {
    const dbUrl = configService.getOrThrow<string>('DATABASE_URL')
    const adapter = new PrismaPg({
      connectionString: dbUrl
    });

    const nodeEnv = configService.getOrThrow<string>('NODE_ENV');

    super({
      adapter,
      log: nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
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
    const nodeEnv = this.configService.getOrThrow<string>('NODE_ENV');
    
    if (nodeEnv === 'production') {
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
