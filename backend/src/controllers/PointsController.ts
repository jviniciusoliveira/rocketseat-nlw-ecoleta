import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { uf, city, items } = request.query;

    // Os itens serão enviados separados por vírgula.
    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ error: 'Point not found.' });
    }

    const pointItems = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title', 'items.image');

    return response.json({ ...point, items: pointItems });
  }

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
      return response.status(400).json(error);
    }
  }
}

export default new PointsController();
