"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const client_1 = require(".prisma/client");
class ProductRepository {
    constructor() {
        this.create = (data) => {
            return this.client.product.create({
                data
            });
        };
        this.client = new client_1.PrismaClient();
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=products.js.map