import React, { useState } from 'react'
import { User } from '@/types'
import { UserList } from './user-list'

interface UserManagementProps {
  initialUsers: User[]
  onUsersUpdate: (users: User[]) => void
}

export function UserManagement({ initialUsers, onUsersUpdate }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const addUser = (newUser: User) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    onUsersUpdate(updatedUsers);
  }

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    setUsers(updatedUsers);
    onUsersUpdate(updatedUsers);
  }

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    onUsersUpdate(updatedUsers);
  }

  return (
    <UserList
      users={users}
      onAddUser={addUser}
      onUpdateUser={updateUser}
      onDeleteUser={deleteUser}
    />
  )
}

