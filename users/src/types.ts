export type UserInfo = {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};

export type UsersResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type Transactions = {
  user_id: string;
  amount: number;
  type: string;
};
