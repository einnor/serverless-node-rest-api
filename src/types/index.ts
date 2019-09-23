export interface CreateEvent {
  name: string;
  breed: String;
};

export interface Item extends CreateEvent {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export interface Key {
  id: string;
};

export interface UpdateEvent extends CreateEvent {
  checked: boolean;
};
