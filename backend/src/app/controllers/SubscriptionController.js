import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import Meetup from '../models/Meetup';
import Queue from '../../lib/Queue';
import File from '../models/File';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'promoter',
          attributes: ['name', 'email'],
        },
      ],
    });

    /**
     * Check if the meetup is in the past
     */
    const meetupDate = startOfHour(parseISO(meetup.date));

    if (isBefore(meetupDate, new Date())) {
      return res.status(400).json({ error: 'This meetup already happened' });
    }

    /**
     * Check if the user is already subscribed
     */
    const alreadySub = await user.getMeetups({
      where: { id: req.params.id },
    });

    if (alreadySub.length) {
      return res
        .status(401)
        .json({ error: 'You are already assigned to this meetup' });
    }

    /**
     * Check user schedule
     */
    const sameDate = await user.getMeetups({
      where: { date: meetup.date },
    });

    if (sameDate.length) {
      return res
        .status(401)
        .json({ error: 'You already have a meetup at this time' });
    }

    try {
      await user.addMeetup(meetup);
      await meetup.addUser(user);
    } catch (error) {
      return res.status(500).json(error);
    }

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json({
      message: `User ${user.name} registered to ${meetup.title}`,
    });
  }

  async index(req, res) {
    const user = await User.findByPk(req.userId);
    const subscriptions = await user.getMeetups({
      order: ['date'],
      attributes: ['id', 'title', 'date', 'location'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
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
      ],
    });

    return res.json({ subscriptions });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const subscription = await user.getMeetups({
      where: { id: req.params.id },
    });

    if (!subscription) {
      return res
        .status(400)
        .json({ error: 'User is not subscribed to this meetup.' });
    }

    await user.removeMeetup(subscription);
    return res.status(200).json('Subscription canceled.');
  }
}

export default new SubscriptionController();
