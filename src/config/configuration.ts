const {
  ORM_HOST,
  ORM_PORT,
  ORM_USERNAME,
  ORM_PASSWORD,
  ORM_DATABASE,
  ORM_SYNCHRONIZE,
} = process.env;

export default () => ({
  orm: {
    host: ORM_HOST || 'localhost',
    port: parseInt(ORM_PORT) || 3306,
    username: ORM_USERNAME || 'root',
    password: ORM_PASSWORD || '123456',
    database: ORM_DATABASE || 'weibo',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: ORM_SYNCHRONIZE === 'true',
  },
});
