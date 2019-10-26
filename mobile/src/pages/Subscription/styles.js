import styled from 'styled-components/native';

export const Container = styled.View``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 30px;
  margin-bottom: 64px;
`;
