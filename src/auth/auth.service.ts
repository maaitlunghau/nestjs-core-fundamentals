import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: registerDto.email }
        })
        if (existingUser) {
            throw new ConflictException(`Email already in use! Please try with a diff email`);
        }

        const hashedPassword = await this.hashedPassword(registerDto.password);

        const newlyCreatedUser = await this.usersRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            role: UserRole.USER
        });

        const savedUser = await this.usersRepository.save(newlyCreatedUser);
        const { password, ...result } = savedUser;

        return {
            user: result,
            message: `Registration successfully! Please login to continue`
        }
    }

    async login(loginDto: LoginDto) {
        const exitingUser = await this.usersRepository.findOne({
            where: { email: loginDto.email }
        });
        if (!exitingUser || !(await this.verifyPassword(loginDto.password, exitingUser.password))) {
            throw new UnauthorizedException(`Invalid credentials or account not exists`);
        }

        // generate the tokens
        const tokens = this.generateTokens(exitingUser);
        const { password, ...result } = exitingUser;

        return {
            user: result,
            ...tokens
        }
    }

    private async hashedPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    private async verifyPassword(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

    private generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshBook(user),
        }
    }

    private generateAccessToken(user: User): string {
        const payload = {
            email: user.email,
            role: user.role,
            sub: user.id
        }

        return this.jwtService.sign(payload, {
            secret: 'jwt_secret',
            expiresIn: '15m'
        });
    }

    private generateRefreshBook(user: User): string {
        const payload = {
            sub: user.id
        }

        return this.jwtService.sign(payload, {
            secret: 'refresh_token',
            expiresIn: '7d'
        });
    }
}
