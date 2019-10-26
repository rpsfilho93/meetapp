import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import Background from '~/components/Background';
import MeetupCard from '~/components/MeetupCard';
import Header from '~/components/Header';

import { Container, List } from './styles';

export default function Subscription() {
  const [meetups, setMeetups] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    const data = response.data.subscriptions.map(meetup => ({
      ...meetup,
      formattedDate: format(
        parseISO(meetup.date),
        "d 'de' MMMM', às' H':'mm'h' ",
        {
          locale: pt,
        }
      ),
    }));

    setMeetups(data);
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function handleCancelation(id) {
    try {
      const response = await api.delete(`subscriptions/${id}`);
      console.tron.log(response.data);
      Alert.alert('Inscrição cancelada com sucesso');
      loadSubscriptions();
    } catch (err) {
      Alert.alert('Erro ao tentar cancelar', 'Tente novamente.');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupCard
              onSub={() => handleCancelation(item.id)}
              data={item}
              label="Cancelar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
