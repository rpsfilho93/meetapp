import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.3);
    height: 200px;
    width: 600px;
    margin: auto;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;

      strong {
        color: #555;
      }

      svg {
        color: #555;
        margin-bottom: 5px;
      }
    }

    img {
      height: 200px;
      width: 600px;
      border: 0;
      border-radius: 4px;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
