export type Ticket = {
  id: number;
  subject: string;
  status: "unresolved" | "resolved";
  createdAt: Date;
};

export type Message = {
  id: number;
  senderType: "operator" | "customer";
  senderId: string;
  text: string;
  createdAt: Date;
};
