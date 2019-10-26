import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.promoter.name} <${meetup.promoter.email}>`,
      subject: `${user.name} confirmou presença em ${meetup.title}`,
      template: 'subscription',
      context: {
        promoter: meetup.promoter.name,
        userName: user.name,
        userEmail: user.email,
        meetupTitle: meetup.title,
        meetupDate: format(
          parseISO(meetup.date),
          "'Dia' dd 'de' MMMM', às ' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
