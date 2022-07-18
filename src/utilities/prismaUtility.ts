import { Prisma } from '@prisma/client'

export class prismaUtility {
    resolveError = (error: typeof Prisma.PrismaClientKnownRequestError) => {
        console.log(error)
    }
}
