import React, { useState } from "react";
import styled from "styled-components";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { isValidUsername } from "../utils/formatters";
import { FONT_SIZES, SPACING } from "../theme/constants";

interface AuthProps {
  onSet: (name: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onSet }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (isValidUsername(trimmedValue)) {
      onSet(trimmedValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <UsernameInput
        value={value}
        onChange={handleChange}
        placeholder="Введите ник"
        autoFocus
        maxLength={50}
      />
      <Button type="submit" disabled={!isValidUsername(value)}>
        Войти
      </Button>
    </LoginForm>
  );
};

export default Auth;

const LoginForm = styled.form`
  display: flex;
  gap: ${SPACING.sm};
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const UsernameInput = styled(Input)`
  width: 200px;
  font-size: ${FONT_SIZES.xl};
`;
