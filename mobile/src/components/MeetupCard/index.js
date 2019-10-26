import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  Avatar,
  InfoContainer,
  Text,
  Title,
  Info,
  SubButton,
} from './styles';

export default function MeetupCard({ data, onSub, label }) {
  return (
    <Container>
      <Avatar source={{ uri: data.banner.url }} />

      <InfoContainer>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={20} color="rgba(0,0,0,0.5)" />
          <Text>{data.formattedDate}</Text>
        </Info>
        <Info>
          <Icon name="room" size={20} color="rgba(0,0,0,0.5)" />
          <Text>{data.location}</Text>
        </Info>
        <Info>
          <Icon name="person" size={20} color="rgba(0,0,0,0.5)" />
          <Text>{`Organizador: ${data.promoter.name}`}</Text>
        </Info>
        <SubButton onPress={onSub}>{label}</SubButton>
      </InfoContainer>
    </Container>
  );
}

MeetupCard.propTypes = {
  data: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    title: PropTypes.string,
    formattedDate: PropTypes.string,
    location: PropTypes.string,
    promoter: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onSub: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
