"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const HelloWorld_1 = require("../controllers/HelloWorld");
const router = new Router();
router.get('/', HelloWorld_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map