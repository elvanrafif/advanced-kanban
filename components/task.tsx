import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Task as TaskType, User } from '@/types'

interface TaskProps {
  task: TaskType
  index: number
  onClick: () => void
  assignee?: User
}

export function Task({ task, index, onClick, assignee }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white p-4 mb-2 rounded shadow cursor-pointer
            transition-all duration-200 ease-in-out
            ${snapshot.isDragging ? 'shadow-lg scale-105 z-10' : 'hover:bg-gray-50'}
          `}
          onClick={onClick}
        >
          <div className={`relative flex justify-between items-start ${assignee && 'pb-5'}`}>
            <p className="flex-grow mr-2">{task.content}</p>
            {assignee && (
              <div className="absolute -bottom-3 -right-2 flex items-center">
                <span className="text-sm text-gray-400 inline underline">{assignee.name}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
