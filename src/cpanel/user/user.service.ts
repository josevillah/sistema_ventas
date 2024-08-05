import { Injectable, UnauthorizedException, ConflictException   } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

// Importo las tablas de la base de datos
import { Users } from "@prisma/client";
import { TypeUsers } from "@prisma/client";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    // Funcion para obtener todos los usuarios
    async getAllUsers(): Promise<Users[]> {
        const result = await this.prisma.users.findMany({
            orderBy:{
                username: 'asc'
            }            
        });
        return result;
    }
    
    // Funcion para obtener todos los tipos de usuarios
    async getAllTypeUsers(): Promise<TypeUsers[]> {
        const result = await this.prisma.typeUsers.findMany({
            where:{
                id: {not: 1}
            },
            orderBy:{
                name: 'asc'
            }
        });
        return result;
    }
    
    // Funcion para obtener el tipo de usuarios por id
    async getTypeForId( data: {id: number} ): Promise<TypeUsers> {
        const result = await this.prisma.typeUsers.findUnique({
            where:{
                id: data.id
            }
        });
        return result;
    }

    // Funcion para crear un nuevo usuario
    async createUser(
        data: { username: string, type_id: number, password: string, full_name: string}): Promise<Users> {
        
        const user = await this.prisma.users.findUnique({
            where: {
                username: data.username,
            }
        });

        // Si el usuario ya existe, lanzar una excepción
        if (user) {
            throw new ConflictException('El nombre de usuario ya está en uso');
        }

        // Encriptar la contraseña
        const hashedPassword: string = await bcrypt.hash(data.password, 10);

        // Crear el nuevo usuario
        const newUser = await this.prisma.users.create({
            data: {
                username: data.username,
                password: hashedPassword,
                full_name: data.full_name,
                type_id: data.type_id,
            },
        });

        return newUser;
    }

    // Funcion para iniciar sesión
    async login(data: { username: string, password: string }): Promise<Users> {
        
        const user = await this.prisma.users.findUnique({
            where: {
                username: data.username,
                status: true,
            }
        });

        if(!user) {
            throw new ConflictException('El usuario no existe');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('La contraseña es incorrecta');
        }

        return user;
    }

    // Funcion para cambiar la contraseña del usuario
    async changePassword(data: {user: string, pass: string, newPasword: string}) {

        const user = await this.prisma.users.findUnique({
            where: {
                username: data.user,
            }
        });

        if(!user) {
            throw new ConflictException('El usuario no existe');
        }

        const isPasswordValid = await bcrypt.compare(data.pass, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('La contraseña es incorrecta');
        }

        // Encriptar la nueva contraseña
        const hashedPassword: string = await bcrypt.hash(data.newPasword, 10);

        // Actualizar la contraseña del usuario
        const updatedUser = await this.prisma.users.update({
            where: {
                username: data.user,
            },
            data: {
                password: hashedPassword,
            },
        });

        return true;
    }

    // Funcion para actualizar los datos del usuario
    async updateUser(data: {firstUsername: string, username: string, password: string, full_name: string}) {

        if(data.firstUsername !== data.username) {
            const user = await this.prisma.users.findUnique({
                where: {
                    username: data.username,
                }
            });
    
            if(user) {
                throw new ConflictException('El usuario ya existe');
            }

            const dataFirstUser = await this.prisma.users.findUnique({
                where: {
                    username: data.firstUsername,
                }
            });

            const isPasswordValid = await bcrypt.compare(data.password, dataFirstUser.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('La contraseña es incorrecta');
            }

            const updatedUser = await this.prisma.users.update({
                where: {
                    username: data.firstUsername,
                },
                data: {
                    username: data.username,
                    full_name: data.full_name,
                },
            });

            return updatedUser;

        }else{
            const user = await this.prisma.users.findUnique({
                where: {
                    username: data.username,
                }
            });

            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            
            if (!isPasswordValid) {
                throw new UnauthorizedException('La contraseña es incorrecta');
            }

            const updatedUser = await this.prisma.users.update({
                where: {
                    username: data.username,
                },
                data: {
                    full_name: data.full_name,
                },
            });
            
            return updatedUser;
        }
    }
}