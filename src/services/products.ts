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

        return this.repository.create(product)
    }
}
