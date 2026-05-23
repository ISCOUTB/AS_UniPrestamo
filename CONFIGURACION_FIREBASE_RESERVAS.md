# 📋 Configuración Firebase - Gestión de Reservas

## 🎯 Descripción General

Este documento detalla la configuración necesaria en Firebase Firestore para el sistema de gestión de reservas de recursos.

---

## 📁 Estructura de Colecciones en Firestore

### 1. **Colección: `reservations`**

Contiene todos los registros de reservas de recursos.

#### Campos del documento:

```javascript
{
  id: "doc_id_auto",
  resourceId: "recurso_id_ref",
  resourceName: "Nombre del Recurso",
  userId: "usuario_id_ref",
  userName: "Nombre del Usuario",
  date: "2024-05-15",
  startTime: "08:00",
  endTime: "10:00",
  purpose: "Clase de Python",
  status: "pending" | "confirmed" | "cancelled",

  // Timestamps automáticos
  createdAt: timestamp,
  updatedAt: timestamp,
  confirmedAt: timestamp (solo si status === 'confirmed'),
  cancelledAt: timestamp (solo si status === 'cancelled'),
  cancellationReason: "Razón de cancelación",
}
```

#### Índices recomendados:
- `userId + status + date`
- `resourceId + date + status`
- `status + date`

---

### 2. **Colección: `resources`**

Contiene los recursos disponibles para reservar.

#### Campos del documento:

```javascript
{
  id: "doc_id_auto",
  name: "Salón 101",
  type: "salon" | "lab" | "equipment",
  location: "Edificio A, Piso 2",
  capacity: "30",
  description: "Salón para clases con proyector",
  status: "available" | "reserved" | "maintenance",
  features: ["proyector", "aire_acondicionado", "wifi"],

  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

---

### 3. **Colección: `users`**

Contiene información de usuarios.

#### Campos del documento:

```javascript
{
  id: "doc_id_auto",
  uid: "auth_uid",
  email: "usuario@example.com",
  name: "Nombre del Usuario",
  role: "user" | "admin",
  department: "Ingeniería",
  phone: "+57 300 123 4567",

  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

---

## 🔐 Reglas de Seguridad (Firestore Rules)

```firestore_rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ═══ RESERVATIONS ═══════════════════════════════════════
    match /reservations/{document=**} {
      // Admins pueden leer y escribir todo
      allow read, write: if request.auth != null &&
                           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';

      // Los usuarios pueden leer sus propias reservas
      allow read: if request.auth != null &&
                     (request.resource.data.userId == request.auth.uid);

      // Los usuarios pueden crear nuevas reservas (status = 'pending')
      allow create: if request.auth != null &&
                       request.resource.data.status == 'pending' &&
                       request.resource.data.userId == request.auth.uid;

      // Los usuarios pueden cancelar sus propias reservas
      allow update: if request.auth != null &&
                       request.resource.data.userId == request.auth.uid &&
                       request.resource.data.status == 'cancelled' &&
                       resource.data.status != 'cancelled';
    }

    // ═══ RESOURCES ══════════════════════════════════════════
    match /resources/{document=**} {
      // Todos pueden leer recursos
      allow read: if request.auth != null;

      // Solo admins pueden escribir
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // ═══ USERS ══════════════════════════════════════════════
    match /users/{document=**} {
      // Los usuarios solo pueden leer su propio documento
      allow read: if request.auth != null &&
                     request.auth.uid == document;

      // Admins pueden leer todos los usuarios
      allow read: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';

      // Solo admins pueden escribir
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Denegar acceso por defecto
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🔑 Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=Tu_API_Key_Aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu-proyecto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=Tu_ID_Aqui
REACT_APP_FIREBASE_APP_ID=Tu_App_ID_Aqui
```

Para obtener estos valores:
1. Ve a Firebase Console → Tu proyecto
2. Haz clic en ⚙️ Configuración
3. Ve a la pestaña "Tus aplicaciones"
4. Copia la configuración de tu app

---

## 📱 Funciones Disponibles en `firebaseService.js`

### Reservations

```javascript
// Obtener todas las reservas
await getReservations()

// Obtener reservas de un usuario específico
await getReservationsByUser(userId)

// Crear nueva reserva
await createReservation({
  resourceId: "id_recurso",
  resourceName: "Nombre",
  userId: "id_usuario",
  userName: "Nombre Usuario",
  date: "2024-05-15",
  startTime: "08:00",
  endTime: "10:00",
  purpose: "Propósito"
})

// Confirmar una reserva
await confirmReservation(reservationId)

// Cancelar una reserva
await cancelReservation(reservationId, reason)

// Actualizar una reserva
await updateReservation(reservationId, { status: 'confirmed' })

// Eliminar una reserva
await deleteReservation(reservationId)
```

---

## 🎨 Estados de Reserva

| Estado | Descripción | Quién puede cambiar |
|--------|-------------|-------------------|
| **pending** | Esperando aprobación del admin | Usuario (al crear) |
| **confirmed** | Aprobada y confirmada | Admin |
| **cancelled** | Cancelada | Usuario o Admin |

---

## 🔄 Flujo de Creación de Reservas

### Para Usuarios:

1. **Usuario selecciona recurso** en el catálogo
2. **Llena formulario** con fecha, hora y propósito
3. **Sistema crea reserva** con status = `pending`
4. **Admin recibe notificación** (pendiente implementar)
5. **Admin confirma o rechaza** en Gestión de Reservas
6. **Usuario ve estado actualizado** en Mis Reservas

### Para Administradores:

1. **Admin va a Gestión de Reservas**
2. **Ve lista de reservas pendientes** con filtros
3. **Confirma reserva** → status = `confirmed`
4. **O cancela** → status = `cancelled` + razón
5. **O crea manualmente** nueva reserva confirmada

---

## 📊 Dashboard y Estadísticas

### En Admin → Gestión de Reservas:

```
├── Total de reservas activas
├── Reservas pendientes por aprobar
├── Reservas confirmadas
├── Búsqueda por recurso/solicitante
├── Filtros por estado
└── Acciones: Confirmar, Cancelar, Ver detalles
```

### En Usuario → Mis Reservas:

```
├── Total de mis reservas
├── Mis reservas confirmadas
├── Mis reservas pendientes
├── Filtros por estado
└── Acciones: Cancelar reserva
```

---

## 🐛 Troubleshooting

### Error: "Permiso denegado"
- Verifica que el usuario esté autenticado
- Comprueba las Firestore Security Rules
- Asegúrate de que el usuario tenga el role correcto

### Las reservas no se cargan
- Verifica conexión a Firebase
- Comprueba que la colección `reservations` existe
- Revisa la consola del navegador para errores

### No puedo confirmar una reserva (admin)
- Verifica que estés autenticado como admin
- Comprueba que tu usuario tenga `role: "admin"`
- Revisa las Security Rules

---

## 🚀 Próximas Mejoras

- [ ] Notificaciones por email al confirmar/cancelar
- [ ] Sistema de disponibilidad en tiempo real
- [ ] Reportes y estadísticas avanzadas
- [ ] API para sincronización con calendarios
- [ ] Recordatorios automáticos antes de la reserva

---

## 📞 Documentación Adicional

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Rules](https://firebase.google.com/docs/firestore/security/start)
- [Authentication](https://firebase.google.com/docs/auth)

---

**Última actualización:** Mayo 2024
**Versión:** 1.0
