import styled from 'styled-components';
import { SPACING, BORDER_RADIUS, COLORS } from '../../theme/constants';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const FlexRow = styled.div<{ $justifyContent?: string; $alignItems?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.$justifyContent || 'flex-start'};
  align-items: ${props => props.$alignItems || 'flex-start'};
  gap: ${SPACING.sm};
`;

export const FlexColumn = styled.div<{ $alignItems?: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$alignItems || 'stretch'};
  gap: ${SPACING.sm};
`;

export const Card = styled.div`
  width: 100%;
  padding: ${SPACING.lg};
  background-color: ${COLORS.white};
  border-radius: ${BORDER_RADIUS.md};
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.37);
`;

export const AppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: ${SPACING.md};
`;