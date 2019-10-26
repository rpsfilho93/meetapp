import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    justify-content: space-between;
    width: 600px;
    margin-bottom: 20px;

    h1 {
      color: #fff;
      font-weight: bold;
    }

    button {
      display: flex;
      align-items: center;
      height: 38px;
      width: 158px;
      padding-left: 10px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#F94D6A')};
      }

      div {
        display: flex;
        align-items: center;
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  ul {
    display: grid;
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Meetup = styled.li`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.3);
  border: 0;
  border-radius: 4px;
  padding: 10px;

  &:hover {
    background: ${lighten(0.11, '#F94D6A')};
    opacity: 0.7;
  }

  strong {
    flex: 1;
    color: #fff;
  }

  div {
    display: flex;
    align-items: center;

    span {
      color: #fff;
      opacity: 0.8;
    }
  }
`;
