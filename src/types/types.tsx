export interface IUserAdress {
	street: string,
	city: string,
	zipCode: string,
}

export interface IUser {
id: number,
name: string,
email: string,
address: IUserAdress
}