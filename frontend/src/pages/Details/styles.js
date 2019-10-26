import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 40px;

    h1 {
      color: #fff;
    }
  }

  img {
    width: 800px;
    height: 250px;
    border: 0;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  p {
    color: #fff;
    margin-bottom: 20px;
  }

  footer {
    display: flex;
    color: rgba(255, 255, 255, 0.7);

    div {
      margin: 10px;
    }

    svg {
      margin-right: 5px;
    }
  }
`;
export const CancelButton = styled.button`
  width: 120px;
  height: 38px;
  border: 0;
  border-radius: 4px;
  background: #f94d6a;
  padding-left: 15px;
  margin-right: 10px;

  &:hover {
    background: ${darken(0.07, '#F94D6A')};
  }

  div {
    display: flex;
    align-self: center;
    align-items: center;

    span {
      flex: 1;
      text-align: center;
      color: #fff;
      font-weight: bold;
    }
  }
`;

export const EditButton = styled.button`
  width: 100px;
  height: 38px;
  border: 0;
  border-radius: 4px;
  background: #4dbaf9;
  padding-left: 15px;
  margin-right: 10px;

  &:hover {
    background: ${darken(0.07, '#4dbaf9')};
  }

  div {
    display: flex;
    align-self: center;
    align-items: center;

    span {
      flex: 1;
      text-align: center;
      color: #fff;
      font-weight: bold;
    }
  }
`;
