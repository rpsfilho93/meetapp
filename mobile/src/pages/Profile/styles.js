import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  margin-top: 5px;
  align-self: stretch;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)',
})`
  height: 46px;
  font-size: 15px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-top: 10px;
  padding: 0 15px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 30px 0 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  background: #e5556e;
  height: 50px;
`;

export const QuitButton = styled(Button)`
  margin-top: 10px;
  background: #d44059;
  height: 42px;
`;
