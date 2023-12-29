export interface User {
 id : number | null,
 firstName : string,
 lastName : string,
 password : string,
 email : string,
 tempKey : string,
 createdBy : string | null,
 dateCreated : Date,
 role: Role
}

export enum Role { Admin, User}