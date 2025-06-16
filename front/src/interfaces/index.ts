interface ICard{
    name: string;
    image: string;
}

interface ICardProduct extends ICard{
    price: number;
    stock?: number;
}

export type {ICard, ICardProduct};


export interface IUser {
  id: string;
  email: string;
  roles: string[];
  first_name?: string;
  last_name?: string;
  image?: string;
}

export interface IGetUser {
  name: string;
  email: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}


type RecordSearchParams = { [key: string]: string | string[] | undefined }
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<RecordSearchParams>;