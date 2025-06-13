interface ICard{
    name: string;
    image: string;
}

interface ICardProduct extends ICard{
    price: number;
    stock?: number;
}

export type {ICard, ICardProduct};


enum eRole {
  ADMIN = "admin",
  USER = "user",
}


export interface IUser {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  role?: eRole;
}

export interface IGetUser {
  name: string;
  email: string;
  phone: string;
}

export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}


type RecordSearchParams = { [key: string]: string | string[] | undefined }
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<RecordSearchParams>;