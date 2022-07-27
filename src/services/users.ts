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
}
