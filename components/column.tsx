import React, { useState } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { Task } from './task'
import { Task as TaskType, User, ColumnType } from '@/types'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { EditColumnDialog } from './edit-column-dialog'

interface ColumnProps {
  column: ColumnType
  tasks: TaskType[]
  users: User[]
  index: number
  onUpdateColumn: (updatedColumn: ColumnType) => void
  onDeleteColumn: (columnId: string) => void
  showDeleteIcon: boolean
  onAddTask: (columnId: string) => void
  onTaskClick: (taskId: string) => void
}

const columnColors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-indigo-100',
  'bg-red-100',
  'bg-orange-100',
]

export function Column({
  column,
  tasks,
  users,
  index,
  onUpdateColumn,
  onDeleteColumn,
  showDeleteIcon,
  onAddTask,
  onTaskClick
}: ColumnProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const headerColor = columnColors[index % columnColors.length]

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-gray-100 rounded-lg w-full sm:w-72 flex-shrink-0 flex flex-col"
        >
          <div
            {...provided.dragHandleProps}
            className={`p-4 rounded-t-lg ${headerColor} cursor-pointer`}
            onClick={() => setIsEditDialogOpen(true)}
          >
            <h2 className="text-lg font-semibold mb-2 capitalize">
              {column.title}
            </h2>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 flex-grow transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-gray-200' : ''
                  }`}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    onClick={() => onTaskClick(task.id)}
                    assignee={users.find(user => user.id === task.assignee)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="p-2 border-t border-gray-200 text-gray-300">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onAddTask(column.id)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
          <EditColumnDialog
            column={column}
            onUpdateColumn={onUpdateColumn}
            onDeleteColumn={onDeleteColumn}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            canDelete={showDeleteIcon}
          />
        </div>
      )}
    </Draggable>
  )
}

