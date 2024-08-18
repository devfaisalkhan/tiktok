import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: parseInt(
                    configService.getOrThrow<string>('ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC'),
                ),
            },
        }),
        inject: [ConfigService],
        }),
        PassportModule
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
    exports: [AuthService, JwtModule, PassportModule],
    controllers: [AuthController]
  })
export class AuthModule {}
