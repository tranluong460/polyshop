export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  image: IImageUser;
  cart: any;
  cards: ICardUser[];
  order: IOrderUser[];
  favorites: string[];
  comments: ICommentUser[];
  role: string;
}

export interface IImageUser {
  _id?: string;
  uid: string;
  name: string;
  url: string;
  status: string;
}

export interface ICardUser {
  _id?: string;
  card_holder_name: string;
  card_number: number;
  start_date: string;
  end_date: string;
  cvv: number;
  main: boolean;
}

export interface IOrderUser {
  _id?: string;
  userId: string;
  products: IProductsOrderUser[];
  totalPrice: number;
  paymentMethod: string;
  payment?: string;
  status: string;
}

export interface IProductsOrderUser {
  _id?: string;
  product: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICommentUser {
  _id?: string;
}
