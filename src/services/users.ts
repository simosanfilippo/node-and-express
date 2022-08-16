import { Prisma } from '@prisma/client'
import { UserRepository } from '../repositories/users'

export class UserService {
    private repository: UserRepository
    constructor() {
        this.repository = new UserRepository()
    }
    create = async (params: any) => {
        const user: Prisma.UserCreateInput =
            Prisma.validator<Prisma.UserCreateInput>()(params)
        return await this.repository.create(user)
    }
    findUnique = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.findUnique({ id })
        return data
    }
    delete = async (params: { id: string }) => {
        const id = params.id
        const data = await this.repository.delete({ id })
        return data
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
}
