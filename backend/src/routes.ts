import { Router } from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ msg: 'Server Up' });
});

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(({ id, title, image }) => {
    return {
      id,
      title,
      image_url: `http://localhost:3002/uploads/${image}`,
    };
  });

  return response.json(serializedItems);
});

routes.post('/points', PointsController.create);

export default routes;
