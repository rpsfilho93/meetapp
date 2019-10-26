import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';
import api from '~/services/api';

import {
  newMeetupRequest,
  editMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetupList, setMeetupList] = useState([]);
  const dispatch = useDispatch();

  function handleNewMeetup() {
    dispatch(newMeetupRequest());
    history.push('/edit');
  }

  function handleMeetupDetails(meetup) {
    dispatch(editMeetupRequest(meetup));
    history.push('/details');
  }

  useEffect(() => {
    async function loadMeetUpList() {
      const response = await api.get('meetups');

      const data = response.data.meetups.map(meetup => ({
        ...meetup,
        formattedDate: format(
          parseISO(meetup.date),
          "d 'de' MMMM 'de' yyyy 'às' H':'mm'h' ",
          {
            locale: pt,
          }
        ),
      }));

      setMeetupList(data);
    }

    loadMeetUpList();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus Meetups</h1>
        <button type="button" onClick={handleNewMeetup}>
          <MdAddCircleOutline color="#fff" size={24} />
          <span>Novo meetup</span>
        </button>
      </header>
      <ul>
        {meetupList.map(meetup => (
          <Meetup key={meetup.id} onClick={() => handleMeetupDetails(meetup)}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formattedDate}</span>
              <MdChevronRight color="#fff" size={24} />
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
