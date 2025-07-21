import React from 'react';
import styled from 'styled-components';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../theme/constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md';
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $variant: 'primary' | 'outline';
  $size: 'sm' | 'md';
}>`
  padding: ${props => props.$size === 'sm' ? `${SPACING.xs} ${SPACING.sm}` : `${SPACING.sm} ${SPACING.md}`};
  font-size: ${FONT_SIZES.lg};
  border: none;
  border-radius: ${BORDER_RADIUS.sm};
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$variant === 'primary' && `
    background: ${COLORS.primary};
    color: ${COLORS.white};

    &:hover {
      background: ${COLORS.primaryDark};
    }
  `}

  ${props => props.$variant === 'outline' && `
    background-color: transparent;
    border: 1px solid ${COLORS.primary};
    color: ${COLORS.primary};

    &:hover {
      border-color: ${COLORS.primaryDark};
      color: ${COLORS.primaryDark};
    }
  `}

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;