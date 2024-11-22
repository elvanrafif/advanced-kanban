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
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'

interface AddColumnDialogProps {
  onAddColumn: (title: string) => void
}

export function AddColumnDialog({ onAddColumn }: AddColumnDialogProps) {
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [open, setOpen] = useState(false)

  const handleAddColumn = () => {
    if (newColumnTitle.trim() !== '') {
      onAddColumn(newColumnTitle.trim())
      setNewColumnTitle('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Column
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Enter a title for the new column. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder='Column Title'
            id="name"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddColumn}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

