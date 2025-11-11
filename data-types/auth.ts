export interface IRegisterReq {
    first_name: string;
    last_name:string;
    email: string;
    password: string;
    phone_number: string;
}

export interface IRegisterRes  
{
  id: number;
  customer_number: string;
  user:IUser

}
export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    customer_number: string;
    staff_id: null;
    roles: null;
  }