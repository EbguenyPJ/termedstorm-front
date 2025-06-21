export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface ICard {
  name: string;
  image: string;
}

interface ICardProduct extends ICard {
  sale_price: number;
  stock?: number;
  id?: number;
}

export type { ICard, ICardProduct };


export interface IRole {
  id: string;
  name: "SUPERADMIN" | "ADMIN" | "SELLER";
}

export interface IUser {
  id: string;
  email: string;
  type: "employee" | "client";
  first_name?: string;
  last_name?: string;
  image?: string;

  employee?: {
    roles: string[]; // Ej: [{ name: "SUPERADMIN" }]
  };
  client?: {
    is_premium: boolean;
    membership_id: string | null;
  };
}


export interface IAuthMeUser {
  userId: string;
  email: string;
  name: string;
  roles: string[]; 
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string[];
}



type RecordSearchParams = { [key: string]: string | string[] | undefined };
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<RecordSearchParams>;
