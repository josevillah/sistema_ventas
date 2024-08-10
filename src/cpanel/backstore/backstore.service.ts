import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { Backstore } from "@prisma/client";

@Injectable()
export class BackstoreService {

    constructor(private prisma: PrismaService) {}

    // Este método se usa para crear una nueva bodega
    async new(data:{ backstore: string, direction: string, phone: string }): Promise<Backstore> {
        return await this.prisma.backstore.create({
            data:{
                name: data.backstore,
                address: data.direction,
                phone: data.phone
            }
        });
    }

    // Este método se usa para obtener todas las bodegas
    async getAll(): Promise<Backstore[]> {
        return await this.prisma.backstore.findMany({
            orderBy: {
                name: 'asc'
            }
        });
    }

    // Este método se usa para obtener los datos del registro a actualizar
    async getDataForUpdate(data: { id: string }): Promise<Backstore> {
        return await this.prisma.backstore.findUnique({
            where: {
                id: data.id
            },
        });
    }

    // Este método se usa para actualizar la bodega
    async updateBackstoreForId(data: { idBackstore: string, backstore: string, direction: string, phone: string }): Promise<Backstore> {
        // console.log(data);
        return await this.prisma.backstore.update({
            where: {
                id: data.idBackstore
            },
            data: {
                name: data.backstore,
                address: data.direction,
                phone: data.phone
            }
        });
    }

    // Este método se usa para eliminar la bodega
    async deleteBackstoreForId(data: { id: string }): Promise<Backstore> {
        return await this.prisma.backstore.delete({
            where: {
                id: data.id
            }
        });
    }
}