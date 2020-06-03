import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(({ id, title, image }) => {
      return {
        id,
        title,
        image_url: `http://localhost:3002/uploads/${image}`,
      };
    });

    return response.json(serializedItems);
  }
}

export default new ItemsController();
