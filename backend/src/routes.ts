import { Router } from 'express';
import knex from './database/connection';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ msg: 'Server Up' });
});

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(({ title, image }) => {
    return {
      title,
      image_url: `http://localhost:3002/uploads/${image}`,
    };
  });

  return response.json(serializedItems);
});

export default routes;
