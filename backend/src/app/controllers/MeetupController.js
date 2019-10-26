import * as Yup from 'yup';
import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      image_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { title, description, location, date } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      image_id: req.body.image_id,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      image_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'This meetup does not belong to the user' });
    }

    const currentDate = startOfHour(parseISO(meetup.date));

    if (isBefore(currentDate, new Date())) {
      return res.status(400).json({ error: 'This meetup already happened' });
    }

    if (req.body.date) {
      const nextDate = startOfHour(parseISO(req.body.date));

      if (isBefore(nextDate, new Date())) {
        return res.status(400).json({ error: 'Only future dates are allowed' });
      }
    }

    const {
      title,
      date,
      description,
      location,
      image_id,
    } = await meetup.update(req.body);

    return res.json({ title, date, description, location, image_id });
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Permission denied' });
    }

    const currentDate = startOfHour(parseISO(meetup.date));

    if (isBefore(currentDate, new Date())) {
      return res.status(400).json({ error: 'This meetup already happened' });
    }

    meetup.destroy();
    return res.json({ message: 'Meetup successfully canceled' });
  }

  async index(req, res) {
    const { page = 1, date } = req.query;

    if (date) {
      const parseDate = parseISO(date);

      const meetups = await Meetup.findAll({
        where: {
          date: {
            [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
          },
        },
        order: ['date'],
        attributes: ['id', 'title', 'date', 'location'],
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: User,
            as: 'promoter',
            attributes: ['id', 'name'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.json({ meetups });
    }

    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      order: ['date'],
      attributes: ['id', 'title', 'date', 'description', 'location'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ meetups });
  }
}

export default new MeetupController();
