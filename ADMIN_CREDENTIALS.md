# Admin access

This project supports administrator users through the `ADMIN_EMAILS` list in
`src/data/firebaseService.js`.

## How to configure an admin user

1. Create or register the admin account in the app.
2. Add the admin email to `ADMIN_EMAILS`.
3. If needed, update the Firestore user document with `role: "admin"`.

## Security notes

- Do not commit real passwords or shared test passwords.
- Keep production credentials in environment variables or the Firebase console.
- Rotate any password that was previously shared in local documentation.
