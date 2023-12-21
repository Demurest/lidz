# Instrucciones

## requerimientos
- PostgreSQL
- Node 20.10.0
- Nodemon 3.0.2
- sequelize 6.35.2
- koa 2.14.2

## Configuración Base de Datos
Crea una base de datos con nombre **yts**, usuario **postgres** y clave **admin**. Si ya tienes los datos anteriores creados debes dirigirte a la siguiente ruta:

`SRC/db/db.js`

En este script podrás cambiar las credenciales.

Una vez que tengas listo los pasos anteriores deberas ejecutar el siguiente comando en la misma dirección anterior:

````bash
node sync-db.js
````
Una vez ejecutado el comando se habrán creado las tablas en la base de datos.

Si quieres puedes poblar la base de datos con los siguientes datos iniciales:
```sql
INSERT INTO clients (nombre, rut, salario, ahorros, "createdAt", "updatedAt")
VALUES ('Carlos', '94569870', 80000, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hugo', '200198678', 50000, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Rodrigo', '75438907', 10000, 100000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO deudas (institution,amount,duedate,"createdAt", "updatedAt","clientId") 
VALUES ('ubb',100,'10/10/2023',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('Udec',2000000,'10/10/2019',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
('Banco de Chile',0,'10/10/2021',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3);

INSERT INTO messages (text,"role",sentat,"createdAt", "updatedAt","clientId") 
VALUES ('Buenos Días','client','9/8/2012',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,1),
('¿en que lo puedo ayudar?','agent','29/12/2019',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,2),
('Buenos Días, quiero comprar una casa','client','10/1/2021',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,3);
```

## Probando la API
Puedes probar la API a través de Postman o Thunder Cient. 

Para tener a todos los clientes utiliza esta URL con el metodo GET:

`http://localhost:3001/clients`

Para obtener un cliente en especifico utiliza esta URL con el metodo GET:
`http://localhost:3001/clients/<id>`

Para hacerle un seguimiento a los clientes utiliza esta URL con el metodo GET:
`http://localhost:3001/clients/clients-to-do-follow-up`