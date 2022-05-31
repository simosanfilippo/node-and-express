import { PrismaClient } from '@prisma/client'

export class DatabaseInstance {

    private static instance:DatabaseInstance
    private prisma : PrismaClient

    private constructor() {
        this.prisma = new PrismaClient()
    }

    static getInstance = () : DatabaseInstance=> {
        if(!this.instance){
            this.instance = new DatabaseInstance()
        }
        return this.instance
    }

    connect = async () => {
        return await this.prisma.$connect()
    }
}