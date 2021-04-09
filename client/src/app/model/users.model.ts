export class User
{
  id: string;
  username: string;
  password: string;
  email: string;
  contactNumber: string;

  constructor(
    public name?: string,
    public pwd?: string){
        this.username = name;
        this.password = pwd;
    }
}