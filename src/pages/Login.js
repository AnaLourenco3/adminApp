import styled from "styled-components";
import { Button, Input, Title } from "../styled";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/homepage");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(name, password));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <Title>Login</Title>
        <form onSubmit={submitForm}>
          <Input
            placeholder="insert name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="insert password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button type="submit">Login</Button>
        </form>
        <SubText>
          <p>
            This is a demo app. You can login with the following credentials:
          </p>
          <p>name = user </p>
          <p> password = 1234 </p>
        </SubText>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin: 15%;
`;

const SubText = styled.div`
  text-align: center;
  color: #1e3163;
  padding: 20px 0px 5px 0px;
`;
