import React, { useState } from 'react'
import { User } from '@/types'
import { AddUserDialog } from './add-user-dialog'
import { EditUserDialog } from './edit-user-dialog'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Trash2 } from 'lucide-react'

interface UserListProps {
    users: User[]
    onAddUser: (user: User) => void
    onUpdateUser: (updatedUser: User) => void
    onDeleteUser: (userId: string) => void
}

export function UserList({ users, onAddUser, onUpdateUser, onDeleteUser }: UserListProps) {
    const [editingUser, setEditingUser] = useState<User | null>(null)

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle className='pb-2'>User Management</CardTitle>
                        <CardDescription>Add, edit, or remove users from your Kanban board.</CardDescription>
                    </div>
                    <div className="mb-4">
                        <AddUserDialog onAddUser={onAddUser} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setEditingUser(user)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => onDeleteUser(user.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {editingUser && (
                    <EditUserDialog
                        user={editingUser}
                        onUpdateUser={onUpdateUser}
                        open={!!editingUser}
                        onOpenChange={(open) => !open && setEditingUser(null)}
                    />
                )}
            </CardContent>
        </Card>
    )
}

