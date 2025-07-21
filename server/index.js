const WebSocket = require("ws");

// Конфигурация
const CONFIG = {
  PORT: 8081,
  MAX_HISTORY: 100,
  MAX_MESSAGE_LENGTH: 1000,
  MAX_USERNAME_LENGTH: 50,
};

// Состояние чата
class ChatServer {
  constructor() {
    this.history = [];
    this.wss = new WebSocket.Server({ port: CONFIG.PORT });
    this.init();
  }

  init() {
    this.wss.on("connection", (ws) => {
      console.log("Новое подключение");
      this.handleConnection(ws);
    });

    console.log(`WebSocket-сервер запущен на ws://localhost:${CONFIG.PORT}`);
  }

  handleConnection(ws) {
    // Отправляем историю при подключении
    this.sendHistory(ws);

    ws.on("message", (data) => {
      this.handleMessage(ws, data);
    });

    ws.on("close", () => {
      console.log("Клиент отключился");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }

  handleMessage(ws, data) {
    let message;
    try {
      message = JSON.parse(data);
    } catch (error) {
      console.error("Invalid JSON:", error);
      return;
    }

    // Валидация сообщения
    if (!this.validateMessage(message)) {
      return;
    }

    // Добавляем временную метку
    message.time = Date.now();

    // Добавляем в историю
    this.addToHistory(message);

    // Рассылаем всем клиентам
    this.broadcastMessage(message);
  }

  validateMessage(message) {
    if (!message || typeof message !== 'object') {
      return false;
    }

    const { user, text } = message;

    if (!user || !text) {
      return false;
    }

    if (typeof user !== 'string' || typeof text !== 'string') {
      return false;
    }

    if (user.length > CONFIG.MAX_USERNAME_LENGTH || text.length > CONFIG.MAX_MESSAGE_LENGTH) {
      return false;
    }

    if (user.trim().length === 0 || text.trim().length === 0) {
      return false;
    }

    return true;
  }

  addToHistory(message) {
    this.history.push(message);
    if (this.history.length > CONFIG.MAX_HISTORY) {
      this.history.shift();
    }
  }

  sendHistory(ws) {
    const historyMessage = {
      type: 'history',
      messages: this.history
    };

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(historyMessage));
    }
  }

  broadcastMessage(message) {
    const messageString = JSON.stringify(message);
    
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  }
}

// Запуск сервера
new ChatServer();
