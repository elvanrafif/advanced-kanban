import React, { useState, useCallback } from 'react'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { Column } from './column'
import { Search } from './search'
import { AssigneeFilter } from './assignee-filter'
import { AddColumnDialog } from './add-column-dialog'
import { Task, User, ColumnType, KanbanAction } from '@/types'

interface KanbanManagementProps {
    tasks: Task[]
    columns: ColumnType[]
    users: User[]
    dispatch: React.Dispatch<KanbanAction>
    assigneeFilter: string
    setAssigneeFilter: (filter: string) => void
}

export function KanbanManagement({
    tasks,
    columns,
    users,
    dispatch,
    assigneeFilter,
    setAssigneeFilter
}: KanbanManagementProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId, type } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        if (type === 'column') {
            const newColumns = Array.from(columns)
            const [reorderedColumn] = newColumns.splice(source.index, 1)
            newColumns.splice(destination.index, 0, reorderedColumn)
            dispatch({ type: 'REORDER_COLUMNS', columns: newColumns })
            return
        }

        const startColumn = columns.find(col => col.id === source.droppableId)
        const finishColumn = columns.find(col => col.id === destination.droppableId)

        if (startColumn && finishColumn) {
            if (startColumn === finishColumn) {
                // Reordering within the same column
                const newTasks = Array.from(tasks)
                const [reorderedTask] = newTasks.splice(
                    newTasks.findIndex(t => t.id === draggableId),
                    1
                )
                newTasks.splice(
                    newTasks.findIndex(t => t.status === startColumn.id) + destination.index,
                    0,
                    reorderedTask
                )
                dispatch({ type: 'REORDER_TASKS', tasks: newTasks })
            } else {
                // Moving from one column to another
                const task = tasks.find(t => t.id === draggableId)
                if (task) {
                    const updatedTask = { ...task, status: finishColumn.id }
                    dispatch({ type: 'UPDATE_TASK', task: updatedTask })
                }

            }
        }
    }

    const filteredTasks = tasks.filter(task =>
        task.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (assigneeFilter === 'all' || task.assignee === assigneeFilter)
    )

    const addNewColumn = (title: string) => {
        const newColumn: ColumnType = {
            id: title.toLowerCase().replace(/\s+/g, '-'),
            title: title,
        }
        dispatch({ type: 'REORDER_COLUMNS', columns: [...columns, newColumn] })
    }

    const updateColumn = useCallback((updatedColumn: ColumnType) => {
        dispatch({ type: 'UPDATE_COLUMN', column: updatedColumn })
    }, [dispatch])

    const deleteColumn = useCallback((columnId: string) => {
        dispatch({ type: 'DELETE_COLUMN', columnId })
    }, [dispatch])

    const handleAddTask = useCallback((columnId: string) => {
        const newTask: Task = {
            id: `task-${Date.now()}`,
            content: 'New Task',
            status: columnId,
            assignee: 'unassigned',
        }
        dispatch({ type: 'ADD_TASK', task: newTask })
    }, [dispatch])

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div className="flex flex-wrap gap-2">
                    <AddColumnDialog onAddColumn={addNewColumn} />
                </div>
            </div>
            <div className="flex flex-row mt-20 space-x-4 mb-4">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <AssigneeFilter
                    users={users}
                    assigneeFilter={assigneeFilter}
                    setAssigneeFilter={setAssigneeFilter}
                />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="column" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex flex-col sm:flex-row gap-4 mt-4 overflow-x-auto pb-4"
                        >
                            {columns.map((column, index) => (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={filteredTasks.filter((task) => task.status === column.id)}
                                    users={users}
                                    index={index}
                                    onUpdateColumn={updateColumn}
                                    onDeleteColumn={deleteColumn}
                                    showDeleteIcon={columns.length > 3}
                                    onAddTask={handleAddTask}
                                    onTaskClick={(taskId) => dispatch({ type: 'OPEN_TASK_DETAILS', taskId })}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

