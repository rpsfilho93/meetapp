import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 35px auto;

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    background: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  textarea {
    background: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 4px;
    height: 150px;
    padding: 15px;
    color: #fff;
    margin: 0 0 10px;
    overflow: hidden;
    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  button {
    display: flex;
    align-items: center;
    align-self: flex-end;
    height: 38px;
    width: 172px;
    padding: 0 20px;
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
`;
