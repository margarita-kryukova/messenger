import { observable, action, runInAction } from "mobx";
import type { ChatMessage, HistoryPayload } from "../interface";
import { createWebSocketConnection, WebSocketConfig } from "../config/websocket";
import { isValidMessage } from "../utils/formatters";

type IncomingMessage = ChatMessage | HistoryPayload;

function createChatStore() {
  const store = observable({
    username: "",
    messages: [] as ChatMessage[],
    ws: null as WebSocket | null,
    connected: false,
    reconnectAttempts: 0,
    reconnectTimer: null as ReturnType<typeof setTimeout> | null,

    setUsername: action(function(name: string): void {
      store.username = name;
    }),

    connect: action(function(): void {
      if (store.ws || !store.username) return;

      try {
        store.ws = createWebSocketConnection();

        store.ws.onopen = () => {
          runInAction(() => {
            store.connected = true;
            store.reconnectAttempts = 0;
            if (store.reconnectTimer) {
              clearTimeout(store.reconnectTimer);
              store.reconnectTimer = null;
            }
          });
        };

        store.ws.onmessage = (event: MessageEvent<string>) => {
          handleMessage(event.data);
        };

        store.ws.onclose = () => {
          runInAction(() => {
            store.connected = false;
            store.ws = null;
            if (store.username) {
              store.tryReconnect();
            }
          });
        };

        store.ws.onerror = () => {
          if (store.ws) {
            store.ws.close();
          }
        };
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
      }
    }),

    tryReconnect: action(function(): void {
      if (store.reconnectTimer || store.connected || !store.username) return;
      if (store.reconnectAttempts >= WebSocketConfig.MAX_RECONNECT_ATTEMPTS) return;

      store.reconnectAttempts++;
      store.reconnectTimer = setTimeout(() => {
        runInAction(() => {
          store.reconnectTimer = null;
          store.connect();
        });
      }, WebSocketConfig.RECONNECT_DELAY);
    }),

    disconnect: action(function(): void {
      if (store.ws) {
        store.ws.close();
        store.ws = null;
      }
      if (store.reconnectTimer) {
        clearTimeout(store.reconnectTimer);
        store.reconnectTimer = null;
      }
      store.connected = false;
    }),

    sendMessage: action(function(text: string): void {
      if (!store.ws || !store.connected || !store.username || !isValidMessage(text)) {
        return;
      }

      const message = {
        user: store.username,
        text: text.trim(),
      };

      try {
        store.ws.send(JSON.stringify(message));
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }),

    clearMessages: action(function(): void {
      store.messages = [];
    })
  });

  // Вспомогательные функции, не являющиеся частью публичного API
  function isChatMessage(message: IncomingMessage): message is ChatMessage {
    return "user" in message && "text" in message && "time" in message;
  }

  function handleMessage(data: string): void {
    try {
      const message: IncomingMessage = JSON.parse(data);

      if ("type" in message && message.type === "history") {
        runInAction(() => {
          store.messages = message.messages;
        });
      } else if (isChatMessage(message)) {
        runInAction(() => {
          store.messages.push(message);
        });
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  }

  return store;
}

const chatStore = createChatStore();
export default chatStore;
