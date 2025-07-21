import React from 'react';
import styled from 'styled-components';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../theme/constants';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  padding: ${SPACING.sm};
  margin: 0;
  font-size: ${FONT_SIZES.md};
  line-height: 1.2;
  border: 1px solid ${COLORS.background};
  border-radius: ${BORDER_RADIUS.sm};
  outline: none;
  transition: border-color 0.3s ease;
  background-color: ${COLORS.background};
  cursor: text;

  &:hover {
    background-color: ${COLORS.backgroundHover};
  }

  &:focus {
    border-color: ${COLORS.backgroundHover};
  }

  &::placeholder {
    color: ${COLORS.text};
    font-size: ${FONT_SIZES.md};
  }
`;