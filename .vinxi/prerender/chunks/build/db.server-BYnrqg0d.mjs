import s from 'file://C:/Users/Matteo/Desktop/Pulsix/node_modules/.pnpm/pg@8.14.1/node_modules/pg/lib/index.js';

const { Pool: e } = s, r = new e({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : void 0, database: process.env.DB_NAME });

export { r };
//# sourceMappingURL=db.server-BYnrqg0d.mjs.map
