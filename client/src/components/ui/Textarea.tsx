import React, { forwardRef, type ForwardRefRenderFunction } from 'react';
import styled from 'styled-components';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../theme/constants';

// Используем ForwardRefRenderFunction для правильной типизации
const TextareaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props, ref) => (
  <StyledTextarea {...props} ref={ref} />
);

// Создаем компонент с пробросом рефа
const Textarea = forwardRef(TextareaComponent);

export default Textarea;

const StyledTextarea = styled.textarea`
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
  resize: none;
  overflow-y: hidden;
	flex: 1;

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
