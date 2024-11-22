import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from '@/types'

interface EditUserDialogProps {
    user: User
    onUpdateUser: (updatedUser: User) => void
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditUserDialog({ user, onUpdateUser, open, onOpenChange }: EditUserDialogProps) {
    const [name, setName] = useState(user.name)

    useEffect(() => {
        setName(user.name)
    }, [user])

    const handleUpdateUser = () => {
        if (name.trim() !== '') {
            const updatedUser: User = {
                ...user,
                name: name.trim(),
                avatar: `/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`,
            }
            onUpdateUser(updatedUser)
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Update the user's name. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        id="name"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpdateUser}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

