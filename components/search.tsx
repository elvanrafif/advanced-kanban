import React from 'react'
import { Input } from '@/components/ui/input'

interface SearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function Search({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <div className="mb-4 w-full sm:w-96">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

