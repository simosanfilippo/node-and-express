import { Prisma } from '@prisma/client'

export class PrismaUtility {
    statusCode: Number
    errorBody: Record<string, unknown>

    resolveError = (e: any) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.meta) {
                this.errorBody = e.meta
            }
            if (e.code === 'P2025') {
                this.statusCode = 404
            }
            return {
                statusCode: this.statusCode,
                errorBody: JSON.stringify(this.errorBody),
            }
        }
        throw e
    }
}
