import { Prisma } from '@prisma/client'
import { ProductRepository } from '../repositories/products'

export class ProductService {
    private repository: ProductRepository
    constructor() {
        this.repository = new ProductRepository()
    }
    create = async (params: any) => {
        //console.log(JSON.stringify(params));
        const product: Prisma.ProductCreateInput =
            Prisma.validator<Prisma.ProductCreateInput>()(params)
        //console.log(JSON.stringify(product))

        return await this.repository.create(product)
    }
    list = async (params: {
        take?: string
        skip?: string
        orderBy?: string
        orderDirection?: string
    }) => {
        const take = parseInt(params.take ?? '2')
        const skip = parseInt(params.skip ?? '0')
        const orderBy = params.orderBy ?? 'name'
        const orderDirection = params.orderDirection ?? 'asc'
        const data = await this.repository.list({
            take,
            skip,
            orderBy,
            orderDirection,
        })
        const count = await this.repository.count()
        return { data, paging: { total: count } }
    }
    findUnique = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.findUnique({ id })
        return data
    }
}
