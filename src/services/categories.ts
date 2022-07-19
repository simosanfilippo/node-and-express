import { Prisma } from '@prisma/client'
import { CategoryRepository } from '../repositories/categories'

export class CategoryService {
    private repository: CategoryRepository
    constructor() {
        this.repository = new CategoryRepository()
    }
    create = async (params: any) => {
        const category: Prisma.CategoryCreateInput =
            Prisma.validator<Prisma.CategoryCreateInput>()(params)
        return await this.repository.create(category)
    }
    list = async (params: {
        take?: string
        skip?: string
        orderBy?: string
        orderDirection?: string
    }) => {
        const take = parseInt(params.take ?? '10')
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
    relatedProducts = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.relatedProducts({ id })
        return data
    }
    delete = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.delete({ id })
        return data
    }
}
