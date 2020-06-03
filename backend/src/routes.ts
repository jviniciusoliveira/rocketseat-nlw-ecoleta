import { Router } from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = Router();

routes.get('/', (request, response) => {
  const serverInfo = {
    status: 'Up',
    routes: [
      { type: 'GET', route: '/items' },
      { type: 'POST', route: '/points' },
    ],
  };

  return response.json(serverInfo);
});

routes.get('/items', ItemsController.index);
routes.get('/points/:id', PointsController.show);
routes.post('/points', PointsController.create);

export default routes;
