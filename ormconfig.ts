module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [
       'src/entity/*.ts',
    ],
    migrations: [
       'src/migration/**/*.ts',
    ],
    cli: {
       entitiesDir: 'src/entity',
       migrationsDir: 'src/migration',
    },
};