import { PrismaClient, Prisma } from '.prisma/client'

export class UserRepository {
    private client: PrismaClient
    constructor() {
        this.client = new PrismaClient()
    }
    create = async (data: Prisma.UserCreateInput) => {
        return await this.client.user.create({
            data,
        })
    }

    findUnique = async (params: { id: string }) => {
        return await this.client.user.findUnique({
            where: {
                id: params.id,
            },
        })
    }
    delete = async (params: { id: string }) => {
        return await this.client.user.delete({
            where: {
                id: params.id,
            },
        })
    }
}
