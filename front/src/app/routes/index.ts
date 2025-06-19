export const routes = {
  //pueden ver todos (segun el rol puede cambiar)
  login: "/",
  loginclient: "/loginclient",
  registerclient: "/registerclient",
  categories: "/categories",
  subcategories: "/subcategories",
  brands:"/brands",
  sizes:"/sizes",
  products: "/products",
  
  //cart: '/cart', (NO es necesario si trabajamos con modal)
  profile: "/profile", //informacion personal basica
  sales: "/sales", //cambia con la autorizacion respectiva
  support: "/support", // cambia con la autorización respectiva

  // solo gerente
  createemployee: "/createemployee",
  addProduct: "/addproduct",
  addVariant:"addvariant",
  addCategory: "/addcategory",
  addSubCategory: "/addsubcategory",
  addBrand: "/addbrand",
  addSize: "addsize",
  editLists: "/editLists",
  
  // contador o caja
  cashCount: "/cashcount", //historial de arqueos
  newCashCount: "/cashcount", //registrar nuevo arqueo
  newCashRegister: "/cashregister", //registrar nuevo corte
  orders: "/orders", //lista de venta/ordenes
};
