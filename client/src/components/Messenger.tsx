import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import chatStore from "../stores/ChatStore";
import ChatWindow from "./ChatWindow";
import NewMessage from "./NewMessage";
import Button from "./ui/Button";
import { COLORS, SPACING, FONT_SIZES } from "../theme/constants";
import { Container, FlexRow } from "./ui/Layout";

const Messenger: React.FC = observer(() => {
  const handleLogout = () => {
    chatStore.disconnect();
    chatStore.setUsername("");
    chatStore.clearMessages();
  };

  return (
    <Container>
      <UserInfo $justifyContent="space-between" $alignItems="center">
        <Username>{chatStore.username}</Username>
        <Button variant="outline" onClick={handleLogout}>
          Выйти
        </Button>
      </UserInfo>
      <ChatWindow />
      <NewMessage onSend={chatStore.sendMessage} />
    </Container>
  );
});

export default Messenger;

const UserInfo = styled(FlexRow)`
  padding-bottom: ${SPACING.md};
  border-bottom: 1px solid ${COLORS.border};
`;

const Username = styled.span`
  color: ${COLORS.text};
  font-size: ${FONT_SIZES.xxl};
`;
