export const routes = {
  // Accesos públicos
  public: {
    login: "/",
    loginClient: "/loginclient",
    registerClient: "/registerclient",
  },
  
  client: {
    subscription: "/user/client-subscription",
    profileClient: "/profileclient",
  },

  // Users
  user: {
    profile: "/user/profile",
    sales: "/user/sales",
    support: "/user/support",
    companySubscription: "/user/companysubscription",
  },

  // Shop
  shop: {
    categories: "/shop/categories",
    products: "/shop/products",
    subcategories: "/shop/subcategories",
  },

  // 🛠️ Manager (configuraciones y control total)
  manager: {
    // Add
    add: {
      brand: "/manager/add/addbrand",
      category: "/manager/add/addcategory",
      product: "/manager/add/addproduct",
      size: "/manager/add/addsize",
      subcategory: "/manager/add/addsubcategory",
    },

  // Settings manager
  settings: {
      createEmployee: "/manager/settings/createemployee",
      prices: "/manager/settings/prices",
      pricesUpload: "/manager/settings/pricesupload",
      shipping: "/manager/settings/shipping",
      shippingUpload: "/manager/settings/shippingupload",
    },

  // Cashier
   cashier: {
      newCash: "/manager/cashier/newcash",
      newShift: "/manager/cashier/newshift",
      overview: "/manager/cashier/overview",
    },
  },
};
