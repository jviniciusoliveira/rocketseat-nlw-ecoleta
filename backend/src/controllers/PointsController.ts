import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image,
      items,
    } = request.body;

    try {
      const trx = await knex.transaction();

      const [point_id] = await trx('points').insert({
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        image,
      });

      const pointItems = items.map((item_id: Number) => {
        return {
          item_id,
          point_id,
        };
      });

      await trx('point_items').insert(pointItems);

      await trx.commit();

      return response.json(point_id);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new PointsController();
