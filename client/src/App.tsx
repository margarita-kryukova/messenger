import React from "react";
import { observer } from "mobx-react-lite";
import chatStore from "./stores/ChatStore";
import Auth from "./components/Auth";
import Messenger from "./components/Messenger";
import { AppContainer, Card } from "./components/ui/Layout";

const App: React.FC = observer(() => {
  const handleAuthSuccess = (name: string) => {
    chatStore.setUsername(name);
    chatStore.connect();
  };

  return (
    <AppContainer>
      <Card>
        {!chatStore.username ? (
          <Auth onSet={handleAuthSuccess} />
        ) : (
          <Messenger />
        )}
      </Card>
    </AppContainer>
  );
});

export default App;
