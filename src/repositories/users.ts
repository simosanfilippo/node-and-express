import { PrismaClient, Prisma } from '.prisma/client'

export class UserRepository {
    private client: PrismaClient
    constructor() {
        this.client = new PrismaClient()
    }
    create = async (data: Prisma.UserCreateInput) => {
        return await this.client.user.create({
            data,
        })
    }
    list = async (params: {
        take: number
        skip: number
        orderBy: string
        orderDirection: string
        property?: { [key: string]: string }
    }) => {
        const { take, skip, orderBy, orderDirection, property } = params
        let listParams = {
            take,
            skip,
            orderBy: { [orderBy]: orderDirection },
        }
        property
            ? (listParams = Object.assign(listParams, { where: property }))
            : ''

        return await this.client.user.findMany(listParams)
    }
    count = async (params: { property?: { [key: string]: string } }) => {
        const { property } = params
        return await this.client.user.count({ where: property })
    }
    findUnique = async (params: { id: string }) => {
        return await this.client.user.findUnique({
            where: {
                id: params.id,
            },
        })
    }
    delete = async (params: { id: string }) => {
        return await this.client.user.delete({
            where: {
                id: params.id,
            },
        })
    }
}
