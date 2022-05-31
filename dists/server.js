"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const products_1 = require("./services/products");
const port = 8080;
app.use(express_1.default.json());
// const productRoutes = require('./router.js');
// app.use('/api/products/', productRoutes);
app.post("/api/v1/products", (req, res) => {
    try {
        const service = new products_1.ProductService();
        const result = service.create(req.body);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
app.listen(port, () => console.log(`listening on ${port}`));
//# sourceMappingURL=server.js.map