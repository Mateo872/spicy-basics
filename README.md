# Spicy Basics E-commerce - Frontend

Bienvenido a Spicy Basics, una aplicación de comercio electrónico full-stack construida con React, Node.js, Express y MongoDB. Este proyecto utiliza Redux y Redux Toolkit para la gestión del estado global e incluye características como autenticación de usuarios, inicio de sesión con Google, marcado de productos como favoritos, carrito de compras y una pasarela de pago con Mercado Pago.

## Características

- **Autenticación de Usuario:** Los usuarios pueden registrarse e iniciar sesión de manera segura.
- **Inicio de Sesión con Google:** Autenticación sin problemas con cuentas de Google.
- **Gestión de Productos:** Los administradores pueden agregar, editar o eliminar productos.
- **Gestión de Usuarios:** Los administradores pueden eliminar o suspender cuentas de usuario.
- **Carrito de Compras:** Los usuarios pueden agregar productos al carrito y proceder al pago.
- **Confirmación de Pedido:** Se envían notificaciones por correo electrónico a los usuarios con los detalles de la compra.
- **Rutas Protegidas:** Ciertas rutas están protegidas para restringir el acceso según los roles de usuario.
- **Esqueletos de Carga:** Se implementan esqueletos de carga para mejorar la experiencia del usuario durante la carga de datos.

## Tecnologías Utilizadas

- **Frontend:** React ![React](https://i.postimg.cc/m27J5sj5/1174949-js-react-js-logo-react-react-native-icon.png){width=50 height=50}
- **Backend:** Node.js ![Node.js](https://i.postimg.cc/Hx2j2KKc/4375017-js-logo-node-icon.png){width=50 height=50}, Express.js ![Express.js](https://i.postimg.cc/rm1jV8Hd/icons8-express-js-500.png){width=50 height=50}
- **Base de Datos:** MongoDB ![MongoDB](https://i.postimg.cc/MprfQhB9/mongodb-original-logo-icon-146424.png){width=50 height=50}
- **Gestión de Estado:** Redux ![Redux](https://i.postimg.cc/WbYfd15C/react-redux-removebg-preview.png){width=50 height=50}, Redux Toolkit ![Redux Toolkit](https://i.postimg.cc/Bvwm6S4N/1-AJp-FZrofvx-Mn3-MHh9p3i-Q-removebg-preview.png){width=50 height=50}
- **Autenticación:** Tokens de JSON Web (JWT) ![JWT](https://i.postimg.cc/44Mn1rNM/1657421703592.png){width=50 height=50}
- **Pasarela de Pago:** Mercado Pago ![Mercado Pago](https://i.postimg.cc/zf2ZwYSP/download-removebg-preview.png){width=50 height=50}

## Cómo Empezar

1. Cloná el repositorio:

```bash
git clone https://github.com/Mateo872/spicy-basics.git
cd spicy-basics

npm install

# Ejecutarlo
npm run dev
```

## Requisitos Previos

Asegurate de tener estos requisitos antes de continuar:

- [Node.js](https://nodejs.org/)
- [Mercado Pago](https://www.mercadopago.com.ar/developers/es)

## Configuración de variables de entorno

Crea un archivo `.env` y agrega las siguientes variables de entorno:

```bash
VITE_API_PRODUCT=tu_api_de_productos
VITE_API_USERS=tu_api_de_usuarios
VITE_API_USERCREATE=tu_api_de_creacion_de_usuarios
VITE_API_USER=tu_api_de_usuario
VITE_API_PAYMENT=tu_api_de_pago
VITE_CLIENT_ID=tu_client_id_de_mercado_pago
```

## Cómo Contribuir

¡Tu contribución es bienvenida! Sigue estos pasos para contribuir al proyecto:

1. Hacé un fork del proyecto.
2. Creá tu propia rama: `git checkout -b <branch_name>`.
3. Hacé tus cambios y confirmalos: `git commit -m '<commit_message>'`
4. Hacé push a la rama: `git push origin <project_name>/<location>`
5. Creá un pull request.

## Más Información

Para obtener detalles sobre la implementación del backend y explorar el código fuente, te invito a visitar el repositorio correspondiente:

[Spicy Basics Backend Repository](https://github.com/Mateo872/backend-spicy)

Si tienes preguntas específicas sobre el backend o deseas contribuir, ¡no dudes en revisar y participar en el desarrollo!

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
