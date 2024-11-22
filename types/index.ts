export interface Task {
  id: string
  content: string
  status: string
  assignee: string
}

export interface User {
  id: string
  name: string
  avatar: string
}

export interface ColumnType {
  id: string
  title: string
}

export type KanbanAction =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; task: Task }
  | { type: 'DELETE_TASK'; taskId: string }
  | { type: 'OPEN_TASK_DETAILS'; taskId: string }
  | { type: 'REORDER_TASKS'; tasks: Task[] }
  | { type: 'REORDER_COLUMNS'; columns: ColumnType[] }
  | { type: 'UPDATE_COLUMN'; column: ColumnType }
  | { type: 'DELETE_COLUMN'; columnId: string }
