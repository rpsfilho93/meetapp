import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 15px;
  background: #18161f;
`;

export const Content = styled.div`
  height: 72px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      height: 36px;
      width: 58px;
      margin-left: 15px;
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
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #eee;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    height: 46px;
    width: 46px;
    border-radius: 50%;
  }
`;
