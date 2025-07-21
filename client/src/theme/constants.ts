// Цветовая палитра
export const COLORS = {
  primary: '#6e00ff',
  primaryDark: '#5e01d8',
  background: '#f2f7fc',
  backgroundHover: '#d8e6f3',
  text: '#303030',
  textSecondary: '#707070',
  white: '#fff',
  messageBackground: '#E7E7E7',
  border: 'rgba(180, 171, 171, 0.66)',
} as const;

// Размеры и отступы
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '32px',
} as const;

// Радиусы скругления
export const BORDER_RADIUS = {
	xs: '4px',
  sm: '8px',
  md: '16px',
} as const;

// Размеры шрифтов
export const FONT_SIZES = {
  xs: '8px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '18px',
  xxl: '32px',
} as const;

// Конфигурация приложения
export const CONFIG = {
  websocketUrl: 'ws://localhost:8081',
  maxHistoryMessages: 100,
  maxChatHeight: '350px',
  minChatHeight: '250px',
} as const;