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
    host: ORM_HOST,
    port: parseInt(ORM_PORT),
    username: ORM_USERNAME,
    password: ORM_PASSWORD,
    database: ORM_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: ORM_SYNCHRONIZE === 'true',
  },
});
