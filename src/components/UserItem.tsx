import React, {FC} from 'react'
import { IUser } from '../types/types'

interface IUserItemProps {
user: IUser
}

export const UserItem:FC<IUserItemProps> = ({user}) => {
	return (
		<div>{user.id}. {user.name} проживает в {user.address.city} на улице {user.address.street}</div>
	)
}
