"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const client_1 = require("@prisma/client");
const products_1 = require("../repositories/products");
class ProductService {
    constructor() {
        this.create = (params) => {
            console.log(JSON.stringify(params));
            const product = client_1.Prisma.validator()(params);
            console.log(JSON.stringify(product));
            this.repository.create(product);
        };
        this.repository = new products_1.ProductRepository();
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=products.js.map