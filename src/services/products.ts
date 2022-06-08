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
    list = async (params: { take?: string; skip?: string }) => {
        const take = parseInt(params.take ?? '2')
        const skip = parseInt(params.skip ?? '0')
        const data = await this.repository.list({
            take,
            skip,
        })
        const count = await this.repository.count()
        return { data, paging: { total: count } }
    }
}
