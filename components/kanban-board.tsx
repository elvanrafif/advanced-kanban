"use client"

import React, { useState, useReducer } from 'react'
import { TaskDetails } from './task-details'
import { UserManagement } from './user-management'
import { KanbanManagement } from './kanban-management'
import { Task, User, ColumnType, KanbanAction } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const initialData: { tasks: Task[], users: User[], columns: ColumnType[] } = {
  tasks: [
    { id: 'task-1', content: 'Take out the garbage', status: 'todo', assignee: 'user-1' },
    { id: 'task-2', content: 'Watch my favorite show', status: 'in-progress', assignee: 'user-2' },
    { id: 'task-3', content: 'Charge my phone', status: 'done', assignee: 'user-1' },
  ],
  users: [
    { id: 'user-1', name: 'John Doe', avatar: '/placeholder.svg?height=32&width=32&text=JD' },
    { id: 'user-2', name: 'Jane Smith', avatar: '/placeholder.svg?height=32&width=32&text=JS' },
  ],
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ],
}

type KanbanState = {
  tasks: Task[]
  selectedTaskId: string | null
  columns: ColumnType[]
}

function kanbanReducer(state: KanbanState, action: KanbanAction): KanbanState {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] }
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.task.id ? action.task : t) }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.taskId), selectedTaskId: null }
    case 'OPEN_TASK_DETAILS':
      return { ...state, selectedTaskId: action.taskId }
    case 'REORDER_COLUMNS':
      return { ...state, columns: action.columns }
    case 'REORDER_TASKS':
      return { ...state, tasks: action.tasks }
    case 'UPDATE_COLUMN':
      return { ...state, columns: state.columns.map(c => c.id === action.column.id ? action.column : c) }
    case 'DELETE_COLUMN':
      return {
        ...state,
        columns: state.columns.filter(c => c.id !== action.columnId),
        tasks: state.tasks.filter(t => t.status !== action.columnId)
      }
    default:
      return state
  }
}

export function KanbanBoard() {
  const [{ tasks, selectedTaskId, columns }, dispatch] = useReducer(kanbanReducer, {
    tasks: initialData.tasks,
    selectedTaskId: null,
    columns: initialData.columns
  })
  const [users, setUsers] = useState<User[]>(initialData.users)
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all')

  const handleUserUpdate = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
  }

  const selectedTask = tasks.find(t => t.id === selectedTaskId)

  return (
    <div className="p-4">
      <Tabs defaultValue="board" className="w-full">
        <div className='flex justify-between'>
          <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
          <TabsList>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="board">
          <KanbanManagement
            tasks={tasks}
            columns={columns}
            users={users}
            dispatch={dispatch}
            assigneeFilter={assigneeFilter}
            setAssigneeFilter={setAssigneeFilter}
          />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement initialUsers={users} onUsersUpdate={handleUserUpdate} />
        </TabsContent>
      </Tabs>
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => dispatch({ type: 'OPEN_TASK_DETAILS', taskId: '' })}
          onUpdate={(updatedTask) => dispatch({ type: 'UPDATE_TASK', task: updatedTask })}
          onDelete={(taskId) => dispatch({ type: 'DELETE_TASK', taskId })}
          users={users}
        />
      )}
    </div>
  )
}
