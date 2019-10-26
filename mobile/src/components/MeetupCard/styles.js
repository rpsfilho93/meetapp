import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  height: 345px;
  margin-bottom: 15px;
  border: 0;
  border-radius: 4px;
  background: #fff;

  flex-direction: column;
  align-items: stretch;
`;

export const Avatar = styled.Image`
  flex: 1;
  max-height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const InfoContainer = styled.View`
  padding: 10px 20px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 22px;
  font-weight: bold;
`;

export const Info = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const SubButton = styled(Button)`
  margin: 15px 0;
`;

export const Text = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  margin-left: 5px;
`;
