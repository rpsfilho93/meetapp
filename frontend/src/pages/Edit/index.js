import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import BannerInput from './BannerInput';

import {
  addMeetupRequest,
  updateMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('*Insira um título'),
  description: Yup.string().required('*Insira a descrição do evento'),
  location: Yup.string().required('*Insira a localização'),
  date: Yup.date().required('*Insira a data'),
  image_id: Yup.number().required('Insira um banner para o seu meetup'),
});

export default function Edit() {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.info);

  function handleSubmit(data) {
    if (meetup) {
      dispatch(updateMeetupRequest({ ...data, id: meetup.id }));
    } else {
      dispatch(addMeetupRequest(data));
    }
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="image_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <div>
            <MdAddCircleOutline color="#fff" size={24} />
          </div>
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}
