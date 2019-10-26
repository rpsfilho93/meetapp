import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('*Insira seu nome'),
  email: Yup.string()
    .email('*Insira um e-mail válido')
    .required('*Insira um e-mail'),
  password: Yup.string()
    .min(6, '*Insira uma senha de no mínimo 6 caracteres')
    .required('*Insira uma senha'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
