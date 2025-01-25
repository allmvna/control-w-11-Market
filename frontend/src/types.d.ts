export interface UserFields {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phoneNumber: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Product {
  category: string;
  title: string;
  image: File | null;
  description: string;
  price: number;
}

export interface ProductMutation {
  title: string;
  description: string;
  image: File | null;
  category: string;
  price: number;
}
