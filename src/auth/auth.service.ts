import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import {JwtService} from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
        ){}

    async signup(data: AuthDto) {
        //kira generate atau encryption si password
        const hash = await argon.hash(data.password)

        //simpan data ke database jika password sudah dienkripsi
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: data.email,
                    password: hash,
                },
            })

            //kita harus ngasih token, caranya? bikin method
            return await this.signToken(user.id,user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Credentials has already taken")
                }
            }
                throw error;
        }
    }

    
    async signin(data: AuthDto) {
        const isUserExist = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            },
        })
        //jika user tidak ada
        if (!isUserExist) throw new ForbiddenException('User does not exist!')
        
        //kita harus verifikasi password nya benar atau ngga?

        // ini formatnya string
        const passwordFromUser = data.password;

        //ini formatnya hash dalam bentuk argon
        const passwordFromDatabase = isUserExist.password;
        
        //komparasi dengan argon
        const isPasswordMatch = await argon.verify(
            passwordFromDatabase,
            passwordFromUser
        )

        if(!isPasswordMatch) throw new ForbiddenException('Wrong password')
        return await this.signToken(isUserExist.id, isUserExist.email)
    }

    async signToken(userId: number, email: string,){
        //bikin payload untuk jwt
        const payload = {
            sub: userId,
            email
        }
        
        //baca environment variable si secretnya atau signaturenya
        const secretJwt = this.configService.get('JWT_SECRET')

        const token = await this.jwtService.signAsync(payload, {
            algorithm: 'HS256',
            expiresIn: '1d',
            secret: secretJwt
        })

        return {
            access_token: token
        }
    }
    
    }