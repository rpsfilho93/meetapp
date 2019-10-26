import React, { useState, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import Background from '~/components/Background';
import MeetupCard from '~/components/MeetupCard';
import Header from '~/components/Header';

import { Container, List, HeaderContainer, Left, Right, Day } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);

  const day = useMemo(() => format(date, "d 'de' MMMM", { locale: pt }), [
    date,
  ]);

  async function loadMeetups(current_date, current_page) {
    const response = await api.get('meetups', {
      params: { date: current_date, page: current_page },
    });

    const data = response.data.meetups.map(meetup => ({
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
    setPage(1);
    loadMeetups(date, 1);
  }, [date]);

  async function loadMoreMeetups() {
    setPage(page + 1);

    const response = await api.get('meetups', {
      params: { date, page },
    });

    const data = response.data.meetups.map(meetup => ({
      ...meetup,
      formattedDate: format(
        parseISO(meetup.date),
        "d 'de' MMMM', às' H':'mm'h' ",
        {
          locale: pt,
        }
      ),
    }));

    if (data.lenght > 0) {
      setMeetups({ ...meetups, data });
    }
  }

  async function handleSubscription(id) {
    try {
      await api.post(`subscriptions/${id}`);
      Alert.alert(
        'Você está inscrito!',
        `Visualize suas inscrições na aba 'Inscrições'.`
      );
    } catch (err) {
      Alert.alert('Erro na inscrição', 'Verifique a data e horário do meetup.');
    }
  }

  function handleSubDay() {
    setDate(subDays(date, 1));
  }

  function handleAddDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Header />
      <Container>
        <HeaderContainer>
          <Left onPress={handleSubDay}>
            <Icon name="keyboard-arrow-left" size={32} color="#FFF" />
          </Left>
          <Day>{day}</Day>
          <Right onPress={handleAddDay}>
            <Icon name="keyboard-arrow-right" size={32} color="#FFF" />
          </Right>
        </HeaderContainer>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetupCard
              onSub={() => handleSubscription(item.id)}
              data={item}
              label="Realizar inscrição"
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={loadMoreMeetups}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
