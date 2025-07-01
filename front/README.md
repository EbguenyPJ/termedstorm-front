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



NACHO checklist:
- FORMULARIO CREAR EMPLEADO ✔
- MIDDLEWARE ✔
- CREAR MICROFUNCIONES:
  ===> SEARCHBAR. ACOMODAR  DE DONDE TRAIGO LOS DATOS DEL SEARCHBAR
  ===> FILTERBAR (PAGINA CATEGORIAS, SUBCATEGORIAS, PRODUCTOS)
  ===> PROFILE: ADMIN, VENDEDOR, CLIENT ✔
  ===> REPORT: ADMIN, VENDEDOR


middleware: preparar middleware entre employee admin y employee seller

NO SE DEBERIA RENDERIZAR LOS BOTONES DE NOTIFICACIONES Y CARRITO EN CLIENT ✔ Si pero falta corroborar cuando funcione las cookies.