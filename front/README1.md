1. Implementar autenticacion en UI (Formik y Yup)
- Formulario: Creacion de login, register de clientes y creacion de empleados. Vendedor Contador
2. Gestion de autorizacion (mostrar u ocultar componentes según el rol del usuario)
3. Preparar todo para integrar Stripe
4. Usar Zustand para manejar estado global
5. Middleware

#Cookies
1. Login:
- envía una solicitud POST al endpoint del backend
- backend valida las credenciales, genera un JWT (o similar) y lo almacena en una cookie HTTPOnly.
- La cookie se envía en la respuesta y se guarda automáticamente en el navegador.
2. Persistencia de la sesión:
- En cada solicitud al backend, el navegador envía la cookie HTTPOnly automáticamente.
y back valida el JWT en la cookie y devuelve datos del usuario (ej.: { id, email, role }).
