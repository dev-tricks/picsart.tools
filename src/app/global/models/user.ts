export class User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: string[];

  constructor (user) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.fullName = user.fullName;
    this.roles = user.roles;
  }
}
