export interface CreateEvent {
  name: string;
  breed: String;
};

export interface Item extends CreateEvent {
  id: string;
  createdAt: number;
  updatedAt: number;
};
