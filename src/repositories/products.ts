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
    list = async (params: { take: number; skip: number; orderBy: string }) => {
        const { take, skip, orderBy } = params

        return await this.client.product.findMany({
            take,
            skip,
            orderBy: { [orderBy]: 'asc' },
        })
    }
    count = async () => {
        return await this.client.product.count()
    }
    findUnique = async (params: { id: string }) => {
        return await this.client.product.findUnique({
            where: {
                id: params.id,
            },
        })
    }
}
