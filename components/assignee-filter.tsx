import React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandDiv,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from '@/types'

interface AssigneeFilterProps {
  users: User[]
  assigneeFilter: string
  setAssigneeFilter: (filter: string) => void
}

interface FilterListProps {
  key: string,
  title: string
  value: string,
  assigneeFilter: string,
  setOpen: (open: boolean) => void
  setAssigneeFilter: (filter: string) => void,
}

export function AssigneeFilter({ users, assigneeFilter, setAssigneeFilter }: AssigneeFilterProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {assigneeFilter === 'all'
            ? "All Assignees"
            : assigneeFilter === 'unassigned'
              ? "Unassigned"
              : users.find((user) => user.id === assigneeFilter)?.name || "Select assignee..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search assignee..." />
          <CommandEmpty>No assignee found.</CommandEmpty> */}
          <CommandGroup>
            <FilterList
              key="all"
              value='all'
              title="All Assignees"
              assigneeFilter={assigneeFilter}
              setAssigneeFilter={setAssigneeFilter}
              setOpen={setOpen}
            />
            <FilterList
              key="unassigned"
              value='unassigned'
              title="Unassigned"
              assigneeFilter={assigneeFilter}
              setAssigneeFilter={setAssigneeFilter}
              setOpen={setOpen}
            />
            {users.map((user) => (
              <FilterList
                key={user.id}
                value={user.id}
                title={user.name}
                assigneeFilter={assigneeFilter}
                setAssigneeFilter={setAssigneeFilter}
                setOpen={setOpen}
              />
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const FilterList = ({ title, key, value, setOpen, setAssigneeFilter, assigneeFilter }: FilterListProps) => {
  return (
    <CommandDiv
      key={key}
      onClick={() => {
        setAssigneeFilter(value)
        setOpen(false)
      }}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          assigneeFilter === value ? "opacity-100" : "opacity-0"
        )}
      />
      {title}
    </CommandDiv>
  )
}