import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Yup from 'yup';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  QuitButton,
} from './styles';

export default function Profile() {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string(),
    password: Yup.string().when('oldPassword', (oldPassword, field) =>
      oldPassword
        ? field
            .required('*Digite sua nova senha')
            .min(6, '*Digite uma nova senha com ao menos 6 caracteres')
        : field
    ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required('*Repita a nova senha')
            .oneOf([Yup.ref('password')], 'As senhas inseridas não são iguais.')
        : field
    ),
  });

  const [name, setName] = useState(
    useSelector(state => state.user.profile.name)
  );

  const [email, setEmail] = useState(
    useSelector(state => state.user.profile.email)
  );

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();

  async function handleSubmit() {
    const profile = { name, email, oldPassword, password, confirmPassword };

    if (await schema.isValid(profile)) {
      dispatch(updateProfileRequest(profile));
    } else {
      await schema.validate(profile).catch(err => {
        console.tron.log(err);
      });
    }
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
            value={name}
            onChangeText={setName}
          />

          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            secureTextEntry
            placeholder="Senha atual"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Nova senha"
            ref={newPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Salvar Perfil</SubmitButton>
          <QuitButton onPress={handleSignOut}>Sair do Meetup</QuitButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
