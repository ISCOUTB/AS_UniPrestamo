# Sistema de autenticacion

## Caracteristicas

- Registro de nuevos usuarios
- Login con email y contrasena
- Control de acceso por rol: admin o usuario
- Panel de administrador solo para admins
- Panel de usuario solo para usuarios
- Logout con confirmacion
- Sesion persistente

## Flujo de uso

1. El usuario abre la aplicacion.
2. Si no esta autenticado, ve la pantalla de login.
3. Puede registrarse desde el enlace de registro.
4. Despues de registrarse o iniciar sesion, la app verifica su rol.

## Roles

Los administradores tienen acceso a dashboard, recursos, reservas, prestamos,
usuarios y reportes.

Los usuarios tienen acceso a inicio, catalogo, mis reservas y mis prestamos.

## Configuracion de administradores

Para hacer que una cuenta sea administradora:

1. Registra o crea la cuenta en Firebase Auth.
2. Abre Firebase Firestore.
3. Busca el documento del usuario en la coleccion `users`.
4. Cambia el campo `role` a `"admin"`.
5. El usuario debe cerrar sesion e iniciar sesion nuevamente.

Tambien puedes agregar correos permitidos en `src/data/firebaseService.js`:

```javascript
const ADMIN_EMAILS = ["admin@gmail.com", "diego@admin.com", "tuadmin@email.com"];
```

## Seguridad

- No publiques contrasenas reales o compartidas en el repositorio.
- Firebase Auth almacena las contrasenas de forma segura.
- Solo usuarios autenticados pueden acceder a las paginas protegidas.
- El rol se verifica en el cliente; para produccion conviene reforzarlo tambien
  con reglas de Firestore o backend.

## Archivos importantes

- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/auth.css`
- `src/App.jsx`
- `src/data/firebaseService.js`
- `src/components/TopNav.jsx`
