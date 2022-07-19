import { PrismaClient, Prisma } from '.prisma/client'

export class CategoryRepository {
    private client: PrismaClient
    constructor() {
        this.client = new PrismaClient()
    }
    create = async (data: Prisma.CategoryCreateInput) => {
        return await this.client.category.create({
            data,
        })
    }
    list = async (params: {
        take: number
        skip: number
        orderBy: string
        orderDirection: string
    }) => {
        const { take, skip, orderBy, orderDirection } = params
        return await this.client.category.findMany({
            take,
            skip,
            orderBy: { [orderBy]: orderDirection },
        })
    }
    count = async () => {
        return await this.client.category.count()
    }
    findUnique = async (params: { id: string }) => {
        return await this.client.category.findUnique({
            where: {
                id: params.id,
            },
        })
    }
    delete = async (params: { id: string }) => {
        return await this.client.category.delete({
            where: {
                id: params.id,
            },
        })
    }
}
