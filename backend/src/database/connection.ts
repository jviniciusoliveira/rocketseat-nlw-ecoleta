import Knex from 'knex';
import { resolve } from 'path';

const connection = Knex({
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default connection;
