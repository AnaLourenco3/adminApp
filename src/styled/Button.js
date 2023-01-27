import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => (props.primary ? "#f7797d" : "white")};
  color: ${(props) => (props.primary ? "white" : "#f7797d")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #f7797d;
  border-radius: 3px;

  &:hover {
    transform: scale(1.1);
  }
`;
