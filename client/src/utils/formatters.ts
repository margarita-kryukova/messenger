/**
 * Форматирует timestamp в читаемое время
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/**
 * Проверяет валидность имени пользователя
 */
export const isValidUsername = (username: string): boolean => {
  return username.trim().length > 0 && username.trim().length <= 50;
};

/**
 * Проверяет валидность сообщения
 */
export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.trim().length <= 1000;
};