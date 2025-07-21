import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import chatStore from "../stores/ChatStore";
import type { ChatMessage } from "../interface";
import styled from "styled-components";
import { formatTime } from "../utils/formatters";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, CONFIG } from "../theme/constants";

const ChatWindow: React.FC = observer(() => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatStore.messages.length]);

  return (
    <ChatWindowContainer>
      {chatStore.messages.map(
        (msg: ChatMessage, idx: number, array: ChatMessage[]) => {
          const isCurrentUser = chatStore.username === msg.user;
          const isLastInSeries =
            idx === array.length - 1 || array[idx + 1].user !== msg.user;

          return (
            <MessageWrapper key={idx} $isCurrentUser={isCurrentUser}>
              <MessageItem
                $isCurrentUser={isCurrentUser}
                $isLastInSeries={isLastInSeries}
              >
                {chatStore.username !== msg.user ? (
                  <MessageName>{msg.user}</MessageName>
                ) : null}
                <MessageText $isCurrentUser={isCurrentUser}>
                  {msg.text}
                </MessageText>
              </MessageItem>
              <MessageTime>[{formatTime(msg.time)}]</MessageTime>
            </MessageWrapper>
          );
        }
      )}
      <div ref={bottomRef} />
    </ChatWindowContainer>
  );
});

export default ChatWindow;

const ChatWindowContainer = styled.div`
  min-height: ${CONFIG.minChatHeight};
  max-height: ${CONFIG.maxChatHeight};
  padding: ${SPACING.sm} 0;
	margin-bottom: ${SPACING.sm};
  overflow-y: auto;
  background: ${COLORS.white};
`;

const MessageWrapper = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isCurrentUser ? "row-reverse" : "row")};
  flex-wrap: nowrap;
  align-items: center;
  gap: ${SPACING.sm};
  width: fit-content;
  max-width: 80%;
  margin: ${(props) => (props.$isCurrentUser ? `0 0 ${SPACING.xs} auto` : `0 auto ${SPACING.xs} 0`)};
`;

const MessageItem = styled.div<{
  $isCurrentUser: boolean;
  $isLastInSeries: boolean;
}>`
  position: relative;
  padding: ${SPACING.sm} 12px;
  background-color: ${(props) =>
    props.$isCurrentUser ? COLORS.primary : COLORS.messageBackground};
  border-radius: ${(props) => {
    const { md, xs } = BORDER_RADIUS;
    return props.$isLastInSeries && props.$isCurrentUser
      ? `${md} ${md} ${xs} ${md}`
      : props.$isLastInSeries
      ? `${md} ${md} ${md} ${xs}`
      : md;
  }};
`;

const MessageName = styled.span`
  font-size: ${FONT_SIZES.sm};
  font-weight: bold;
  color: ${COLORS.text};
`;

const MessageText = styled.div<{ $isCurrentUser: boolean }>`
  font-size: ${FONT_SIZES.lg};
  color: ${(props) => (props.$isCurrentUser ? COLORS.white : COLORS.text)};
`;

const MessageTime = styled.span`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.textSecondary};
`;
