import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { User } from '@/types'
import { Plus } from 'lucide-react'

interface AddUserDialogProps {
  onAddUser: (user: User) => void
}

export function AddUserDialog({ onAddUser }: AddUserDialogProps) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const handleAddUser = () => {
    if (name.trim() !== '') {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        avatar: `/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`,
      }
      onAddUser(newUser)
      setName('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the name of the new user. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder='Name'
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddUser}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

