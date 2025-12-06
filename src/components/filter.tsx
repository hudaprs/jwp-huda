'use client'

import { useClearCompletedTodo } from '@/mutations/useClearCompletedTodo'
import { Todo, TodoFilter } from '@/types/todo.type'
import { useRouter } from 'next/navigation'
import { memo } from 'react'

type FilterProps = {
  todos: Todo[]
  filter: TodoFilter
}

const buttons = [
  { label: 'All', value: TodoFilter.ALL },
  { label: 'Active', value: TodoFilter.ACTIVE },
  { label: 'Completed', value: TodoFilter.COMPLETED }
]

export const Filter = memo(({ todos, filter }: FilterProps) => {
  const router = useRouter()
  const {
    error: errorClearCompleted,
    isLoading: isLoadingClearCompleted,
    clearCompleted
  } = useClearCompletedTodo()

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between my-2.5'>
        <p>{todos.length} Items Left</p>
        <div className='flex flex-row items-center gap-2'>
          {buttons.map(button => (
            <button
              key={button.value}
              className={`${filter === button.value ? 'border! border-white!' : ''}`}
              onClick={() => router.replace(`/?filter=${button.value}`)}
            >
              {button.label}
            </button>
          ))}
        </div>
        <p className='cursor-pointer' onClick={() => clearCompleted()}>
          {!isLoadingClearCompleted ? 'Clear Completed' : 'Clearing...'}
        </p>
      </div>
      {errorClearCompleted && (
        <em className='text-red-400'>{errorClearCompleted}</em>
      )}
    </div>
  )
})

Filter.displayName = 'Filter'
