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
import { ColumnType } from '@/types'
import { Trash2 } from 'lucide-react'

interface EditColumnDialogProps {
    column: ColumnType
    onUpdateColumn: (updatedColumn: ColumnType) => void
    onDeleteColumn: (columnId: string) => void
    open: boolean
    onOpenChange: (open: boolean) => void
    canDelete: boolean
}

export function EditColumnDialog({
    column,
    onUpdateColumn,
    onDeleteColumn,
    open,
    onOpenChange,
    canDelete
}: EditColumnDialogProps) {
    const [title, setTitle] = useState(column.title)

    useEffect(() => {
        setTitle(column.title)
    }, [column])

    const handleUpdateColumn = () => {
        if (title.trim() !== '') {
            const updatedColumn: ColumnType = {
                ...column,
                title: title.trim(),
            }
            onUpdateColumn(updatedColumn)
            onOpenChange(false)
        }
    }

    const handleDeleteColumn = () => {
        onDeleteColumn(column.id)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Column</DialogTitle>
                    <DialogDescription>
                        Update the column&apos;s name or delete the column. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <DialogFooter className="justify-between sm:justify-end">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDeleteColumn}
                        disabled={!canDelete}
                    >
                        <Trash2 />
                    </Button>
                    <Button type="submit" onClick={handleUpdateColumn}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

