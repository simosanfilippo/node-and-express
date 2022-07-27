import { Prisma } from '@prisma/client'
import { ProductRepository } from '../repositories/products'

export class ProductService {
    private repository: ProductRepository
    constructor() {
        this.repository = new ProductRepository()
    }
    create = async (params: any) => {
        const product: Prisma.ProductCreateInput =
            Prisma.validator<Prisma.ProductCreateInput>()(params)
        return await this.repository.create(product)
    }
    list = async (params: {
        take?: string
        skip?: string
        orderBy?: string
        orderDirection?: string
        property?: { [key: string]: string }
    }) => {
        const take = parseInt(params.take ?? '10')
        const skip = parseInt(params.skip ?? '0')
        const orderBy = params.orderBy ?? 'name'
        const orderDirection = params.orderDirection ?? 'asc'
        const property = params.property

        const data = await this.repository.list({
            take,
            skip,
            orderBy,
            orderDirection,
            property,
        })

        const count = await this.repository.count({ property })
        return { data, paging: { total: count } }
    }
    findUnique = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.findUnique({ id })
        return data
    }
    update = async (params: { id: string; data: any }) => {
        const id = params.id
        const product: Prisma.ProductUpdateInput =
            Prisma.validator<Prisma.ProductUpdateInput>()(params.data)
        const data = await this.repository.update({ id, product })
        return data
    }
    delete = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.delete({ id })
        return data
    }
}
