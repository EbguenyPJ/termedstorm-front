<!-- EL LOGIN DE EMPLOYEES: ENTRA SUPERADMIN, GERENTE, EMPLEADOS -->

NO LLAMAR A CALLBACKS

Para manejar y editar roles: SUPERADMIN Y GERENTE
/employee/id/roles => id del empleado que se va a modificar.
json {
rolIds: [uuids] => strings, id a asignar => deberia haber un metodo
}

GET /roles =>
json {
[{
id: string,
name: vendedor,
descripcion: funciones, 
},
{}]

}



SUPERADMIN

(TODOS LOS EMPLOYEES POR EL MISMO LOGIN)
TIPO DE USUARIO EMPLOYEES: ADMIN, MANAGER,  VENDEDORES, CAJERO 

(TODOS INGRESAN POR EL MISMO LOGIN)
TIPO DE USUARIO CLIENTE: CLIENTE
