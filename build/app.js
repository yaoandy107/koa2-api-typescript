"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const Koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
const compress = require("koa-compress");
const helmet = require("koa-helmet");
const koa_logger_1 = require("koa-logger");
const protect = require("koa-protect");
const ratelimit = require("koa-ratelimit");
const responseTime = require("koa-response-time");
const index_1 = require("./routers/index");
const app = new Koa();
// X-Response-Time middleware
app.use(responseTime());
// Development style logger middleware
app.use(koa_logger_1.logger.logger());
// SQL injection  protection middleware
app.use(protect.koa.sqlInjection({
    body: true,
    loggerFunction: console.error,
}));
// XSS protection middleware
app.use(protect.koa.xss({
    body: true,
    loggerFunction: console.error,
}));
// Header security middleware
app.use(helmet());
// Rate limiter middleware
app.use(ratelimit({
    db: new Redis(),
    duration: 60000,
    errorMessage: 'Sometimes You Just Have to Slow Down.',
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total',
    },
    id: (ctx) => ctx.ip,
    max: 100,
}));
// Compress packet middleware
app.use(compress());
// Formdata parser middleware
app.use(koaBodyparser());
// Add all the api routers
app.use(index_1.default.routes());
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
//# sourceMappingURL=app.js.map