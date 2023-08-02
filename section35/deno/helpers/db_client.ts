import {
  MongoClient,
  Database,
} from 'https://deno.land/x/mongo@v0.31.2/mod.ts';

let db: Database;

export async function connect() {
  const client = new MongoClient();

  await client.connect({
    db: 'todos',
    tls: true,
    servers: [
      {
        host: 'ac-lzxww0a-shard-00-01.i2ikruj.mongodb.net',
        port: 27017,
      },
    ],
    credential: {
      username: 'oanceadancristian',
      password: '5GsCvQeliGW66xNY',
      db: 'todos',
      mechanism: 'SCRAM-SHA-1',
    },
  });

  db = client.database('todos');
}

export function getDb() {
  return db;
}
