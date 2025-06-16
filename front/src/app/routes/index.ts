export const routes = {
  //pueden ver todos (segun el rol puede cambiar)
  login: "/",
  loginclient: "/loginclient",
  register: "/register",
  categories: "/categories",
  subcategories: "/subcategories",
  products: "/products",
  //cart: '/cart', (NO es necesario si trabajamos con modal)
  profile: "/profile", //informacion personal basica
  reports: "/reports", //cambia con la autorizacion respectiva
  support: "/support", // cambia con la autorización respectiva
  // solo gerente
  createemployee: "createemployee",
  addProduct: "addproduct",
  addCategory: "addcategory",
  addSubCategory: "addsubcategory",
  addBrand: "addbrand",
  editLists: "editLists",
  // contador o caja
  cashCount: "cashcount", //historial de arqueos
  newCashCount: "cashcount", //registrar nuevo arqueo
  newCashRegister: "cashregister", //registrar nuevo corte
  orders: "orders", //lista de venta/ordenes
  //superAdmin
  createenterprise: "createenterprise",
};
