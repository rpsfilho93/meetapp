import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import { updateMeetupSuccess } from './actions';

export function* addMeetup({ payload }) {
  try {
    const { title, description, location, date, image_id } = payload.data;
    yield call(api.post, 'meetups', {
      title,
      description,
      location,
      date,
      image_id,
    });
    yield put(updateMeetupSuccess(payload.data));
    toast.success('Meetup criado com sucesso');
    history.push('/');
  } catch (err) {
    toast.error('Erro ao criar o meetup, verifique os dados inseridos.');
    console.tron.log(err);
  }
}

export function* cancelMeetup({ payload }) {
  try {
    yield call(api.delete, `meetups/${payload.data.id}`);
    toast.success('Meetup cancelado com sucesso.');
    history.push('/');
  } catch (err) {
    toast.error('Erro ao tentar cancelar o meetup, tente novamente.');
    console.tron.log(err);
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { title, description, location, date, image_id } = payload.data;
    yield call(api.put, `meetups/${payload.data.id}`, {
      title,
      description,
      location,
      date,
      image_id,
    });
    toast.success('Meetup atualizado com sucesso.');
    yield put(updateMeetupSuccess(payload.data));
    history.push('/');
  } catch (err) {
    toast.error('Erro ao tentar atualizar o meetup, tente novamente.');
    console.tron.log(err);
  }
}

export default all([
  takeLatest('@meetup/ADD_MEETUP_REQUEST', addMeetup),
  takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
