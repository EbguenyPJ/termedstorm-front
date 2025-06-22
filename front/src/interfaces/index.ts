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
  id?: string;
}

interface ApiProduct {
  id: string;
  name: string;
  sale_price: number; 
  image?: string | null;
  variants?: { 
    image: string; 
    color: string;
    descripcion: string;
    variants2: {
      talle: string;
      stock: number | string;
    }[];
  }[];
}

interface IBrand {
  id: string;
  name: string;
  image: string;
  brandKey?: string;
  subcategories?: string[];
}

export type { ICard, ICardProduct, ApiProduct, IBrand };


export interface IRole {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  email: string;
  type: "employee" | "client";
  first_name?: string;
  last_name?: string;
  membershipId?: string;
  image?: string;
  employee?: {
    roles: { name: string }[]; // Ej: [{ name: "SUPERADMIN" }]
  };
  client?: {
    is_premium: boolean;
    membership_id: string | null;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string[];
}



type RecordSearchParams = { [key: string]: string | string[] | undefined };
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<RecordSearchParams>;
