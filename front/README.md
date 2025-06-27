1. client: Unicamente puede ingresar al registro de cliente, login (normal y con google), su dashboard donde habra una opcion para que adquiera una membersia del POS y no podra navegar en todo el resto de la aplicacion

2. employees
   a. sellers: NO se podran registrar por su cuenta, sino que el admin les debe crear la cuenta tipo empleado vendedor.
   Pueden navegar en la aplicacion para vender, ver sus ordenes/ventas.
   No podran configurar ni editar nada, por ende el modulo de add, cashier y settingsmanager no lo podran visualizar.
   si podran visualizar el modulo de shop y dentro de user podran ver profile (generico con sus datos), sales/reports/dashboard(sus ordenes) y support (generico para todos)

b. Admin/manager: podra vender y ademas configurar todo en la aplicacion.

- Seria como una cuenta empresarial donde nosotros fuera de esta aplicacion los crearemos, por ende tampoco se podran registrar por su cuenta.
- Podran navegar en todos los modulos.
- Logicamente como cualquier otro usuario si esta logueado no puede ir a ningun login ni register.

la ruta "/reguster" NO existe. Me olvide de preguntarte si en base a como viste como estan ordenadas mis carpetas de front seria optimo hacer un reordenamiento. Y si ademas queres que te pase el guardian de rutas del back, entiendo que podria facilitar.
const publicRoutes = ["/loginclient", "/registerclient", "/login", "/register"];
const clientRoutes = ["/views/user/client-subscription"];
const sellerRoutes = ["/views/shop", "/views/user/profile", "/views/user/sales", "/views/user/support"];
const adminRoutes = ["/views/add", "/views/settingsmanager", "/views/cashier", "views/shop"];



NACHO checklist:

- API ROL ✔
- FORMULARIO CREAR EMPLEADO ✔
- MIDDLEWARE ✔
- CREAR MICROFUNCIONES:
  ===> SEARCHBAR: ✔
  ===> FILTERBAR (PAGINA CATEGORIAS, SUBCATEGORIAS, PRODUCTOS)
  ===> PROFILE: ADMIN, VENDEDOR, CLIENT 
  ===> REPORT: ADMIN, VENDEDOR, SUPERADMIN
 ===> MIDDLEWARE
  

- QUE LA MARCA NO ESTE RELACIONADA A UNA SUB-CATEGORIA
QUE EL PRODUCTO NO ESTE RELACIONADO A UNA CATEGORIA Y SUBCATEGORIA

Precio de compra. Para que? Dejar uno solo. En todo caso dejar disponible un icono signo de pregunta y un toolkit para que haya informacion de que debe poner en cada lugar.

En el momento de crear la variante del producto hay un alert que no debe existir.
- Endpoint de fecha: 7 dias, 30 dias, 3 meses, 12 meses

FLOR
- Para recibir una notificacion de mensajeria tengo que estar dentro de la sala. O desde la aplicacion nivo ya puedo recibir notificaciones?



ChatRoom:
- Hacer prueba con datos reales.
- El nombre del usuario tiene que aparecer arriba en el globo del mensaje
- Las conversaciones deben ser unicas para cada chat. Como esta ahora se puede ver el mismo mensaje en todos los chats
- Consumir el dato de get employees, para listado de empleados
-



Slug: que figuren los nombres y no el id