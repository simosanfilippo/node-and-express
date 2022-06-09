import { PrismaClient, Prisma } from '.prisma/client'

export class ProductRepository {
    private client: PrismaClient
    constructor() {
        this.client = new PrismaClient()
    }
    create = async (data: Prisma.ProductCreateInput) => {
        return await this.client.product.create({
            data,
        })
    }
    list = async (params: { take: number; skip: number }) => {
        return await this.client.product.findMany(params)
    }
    count = async () => {
        return await this.client.product.count()
    }
    getOne = async (params: { id: string }) => {
        return await this.client.product.findUnique({
            where: {
                id: params.id,
            },
        })
    }
}
