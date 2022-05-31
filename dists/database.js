"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInstance = void 0;
const client_1 = require("@prisma/client");
class DatabaseInstance {
    constructor() {
        this.connect = async () => {
            return await this.prisma.$connect();
        };
        this.prisma = new client_1.PrismaClient();
    }
}
exports.DatabaseInstance = DatabaseInstance;
_a = DatabaseInstance;
DatabaseInstance.getInstance = () => {
    if (!_a.instance) {
        _a.instance = new DatabaseInstance();
    }
    return _a.instance;
};
//# sourceMappingURL=database.js.map