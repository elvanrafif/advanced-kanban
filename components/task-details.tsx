import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Task, User } from '@/types'
import { Trash2 } from 'lucide-react'

interface TaskDetailsProps {
  task: Task
  onClose: () => void
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
  users: User[]
}

export function TaskDetails({ task, onClose, onUpdate, onDelete, users }: TaskDetailsProps) {
  const [editedTask, setEditedTask] = useState({
    ...task,
    assignee: task.assignee || "unassigned"
  })

  const handleUpdate = () => {
    onUpdate({
      ...editedTask,
      assignee: editedTask.assignee === "unassigned" ? "" : editedTask.assignee
    })
    onClose()
  }

  const handleDelete = () => {
    onDelete(task.id)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={editedTask.content}
            onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
            placeholder="Task content"
          />
          <Select
            value={editedTask.status}
            onValueChange={(value) => setEditedTask({ ...editedTask, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={editedTask.assignee || "unassigned"}
            onValueChange={(value) => setEditedTask({ ...editedTask, assignee: value === "unassigned" ? "" : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Assign to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-between pt-4">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 />
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

