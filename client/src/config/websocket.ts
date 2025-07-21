import { CONFIG } from '../theme/constants';

export class WebSocketConfig {
  static readonly URL = CONFIG.websocketUrl;
  static readonly RECONNECT_DELAY = 2000;
  static readonly MAX_RECONNECT_ATTEMPTS = 5;
}

export const createWebSocketConnection = (url: string = WebSocketConfig.URL): WebSocket => {
  return new WebSocket(url);
};