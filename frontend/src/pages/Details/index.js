import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { IoMdCalendar } from 'react-icons/io';
import { MdLocationOn, MdModeEdit, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';

import { Container, EditButton, CancelButton } from './styles';
import { cancelMeetupRequest } from '~/store/modules/meetup/actions';

export default function Details() {
  const meetup = useSelector(state => state.meetup.info);
  const dispatch = useDispatch();

  function handleEdit() {
    history.push('/edit');
  }

  function handleCancelation() {
    dispatch(cancelMeetupRequest(meetup));
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <EditButton type="button" onClick={handleEdit}>
            <div>
              <MdModeEdit color="#fff" size={20} />
              <span>Editar</span>
            </div>
          </EditButton>
          <CancelButton type="button" onClick={handleCancelation}>
            <div>
              <MdDeleteForever color="#fff" size={20} />
              <span>Cancelar</span>
            </div>
          </CancelButton>
        </div>
      </header>
      <img src={meetup.banner.url} alt="Banner do Meetup" />
      <p>{meetup.description}</p>

      <footer>
        <div>
          <IoMdCalendar color="#ccc" size={14} />
          <span>
            {format(
              parseISO(meetup.date),
              "d 'de' MMMM 'de' yyyy 'às' H':'mm'h' ",
              {
                locale: pt,
              }
            )}
          </span>
        </div>

        <div>
          <MdLocationOn color="#fff" size={14} />
          <span>{meetup.location}</span>
        </div>
      </footer>
    </Container>
  );
}
