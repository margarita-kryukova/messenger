export interface ChatMessage {
  user: string;
  text: string;
  time: number;
}

export interface HistoryPayload {
  type: "history";
  messages: ChatMessage[];
}