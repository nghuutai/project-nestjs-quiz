import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtModule } from 'src/modules/auth-jwt/auth-jwt.module';
import { UsersModule } from 'src/modules/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm/dist/typeorm.module';
import { RolesGuard } from './guards/roles.guard';
import {SubjectModule} from './modules/subject/subject.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [UsersModule, AuthJwtModule, SubjectModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrationsTableName: "custom_migration_table",
        migrations: ['dist/migration/*.js'],
        cli: {
          'migrationsDir': 'src/migration'
        },
        autoLoadEntities: true,
        logging: true,
        // migrationsRun: true
      })
    }),
    QuizModule,
  ],
  controllers: [],
  providers: [
    RolesGuard,
  ],
})
export class AppModule {}
