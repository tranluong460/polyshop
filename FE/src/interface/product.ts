export interface IProduct {
  _id?: string;
  sold: number;
  stars: number;
  price: number;
  category: ICategoryProduct;
  inventory: number;
  original_price: number;
  name: string;
  description: string;
  comments: ICommentsProduct[];
  images: IImageProduct[];
}

export interface ICategoryProduct {
  _id?: string;
  slug: string; // danh mục : điện thoại, máy tính ...
  brand: string; // thương hiệu : iphone, msi ...
}

export interface ICommentsProduct {
  _id?: string;
  user: IUserCommentProduct;
  stars: number;
  comment: string;
  product: any;
  prefer: number;
  feed_back: IFeedBackComment[];
}

export interface IUserCommentProduct {
  _id?: string;
  name: string;
  image: string;
}

export interface IFeedBackComment {
  _id?: string;
  prefer: number;
  comment: string;
  user: IUserCommentProduct;
}

export interface IImageProduct {
  _id?: string;
  uid: string;
  name: string;
  url: string;
  status: string;
}
