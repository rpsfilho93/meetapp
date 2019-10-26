import styled from 'styled-components/native';

export const Container = styled.View``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 30px;
  margin-bottom: 150px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 40px;
  height: 80px;
`;

export const Day = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Left = styled.TouchableOpacity``;

export const Right = styled.TouchableOpacity``;
