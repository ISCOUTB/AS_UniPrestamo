export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  STAFF = 'STAFF',
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}
