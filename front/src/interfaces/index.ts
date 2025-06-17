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
  role?: string[];
  first_name?: string;
  last_name?: string;
  image?: string;
  membershipId?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
}



type RecordSearchParams = { [key: string]: string | string[] | undefined }
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<RecordSearchParams>;