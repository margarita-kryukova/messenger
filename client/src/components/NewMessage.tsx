import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./ui/Button";
import { isValidMessage } from "../utils/formatters";
import { SPACING } from "../theme/constants";
import Textarea from "./ui/Textarea";

interface INewMessageProps {
  onSend: (text: string) => void;
}

const NewMessage: React.FC<INewMessageProps> = ({ onSend }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Функция для автоматического изменения высоты textarea в зависимости от его содержимого
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Сброс высоты для правильного расчета
    textarea.style.height = "auto";

    const computedStyle = getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight) || 20;
    const padding =
      parseInt(computedStyle.paddingTop) +
      parseInt(computedStyle.paddingBottom);

    // Высота для 1 строки (по умолчанию) и максимум 3 строки
    const minHeight = lineHeight + padding;
    const maxHeight = lineHeight * 3 + padding;

    // Ограничиваем высоту между минимумом и максимумом
    const newHeight = Math.max(
      minHeight,
      Math.min(textarea.scrollHeight, maxHeight)
    );
    textarea.style.height = `${newHeight}px`;

    // Показываем/скрываем скролл
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const handleSend = () => {
    const trimmedText = text.trim();
    if (isValidMessage(trimmedText)) {
      onSend(trimmedText);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <MessageForm
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Сообщение..."
        rows={1}
        onKeyDown={handleKeyDown}
				maxLength={1000}
      />
      <Button type="submit" disabled={!isValidMessage(text)}>
        Отправить
      </Button>
    </MessageForm>
  );
};

export default NewMessage;

const MessageForm = styled.form`
  display: flex;
  gap: ${SPACING.sm};
  align-items: flex-end;
`;
