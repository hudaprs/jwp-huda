'use client'

import { useRemoveTodo } from '@/mutations/useRemoveTodo'
import { useUpdateTodo } from '@/mutations/useUpdateTodo'
import { Todo } from '@/types/todo.type'
import { memo } from 'react'

type ListItemProps = {
  todo: Todo
}

export const ListItem = memo(({ todo }: ListItemProps) => {
  const {
    error: errorRemove,
    isLoading: isLoadingRemove,
    remove
  } = useRemoveTodo()
  const {
    error: errorUpdate,
    isLoading: isLoadingUpdate,
    update
  } = useUpdateTodo()

  return (
    <li className='w-full bg-[#3b3b3b] py-3 px-[18px] rounded'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-4'>
          <input
            type='checkbox'
            className='w-[25px] h-[25px]'
            defaultChecked={todo.completed}
            disabled={isLoadingRemove}
            onChange={event =>
              update({ id: todo.id, checked: event.target.checked })
            }
          />
          <p className={`break-all ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </p>
        </div>

        <button
          onClick={() => remove({ id: todo.id })}
          disabled={isLoadingRemove}
        >
          {isLoadingRemove ? 'Removing' : 'Remove'}
        </button>
      </div>

      {isLoadingUpdate && <em>Updating...</em>}
      {errorRemove && <em className='text-red-400'>{errorRemove}</em>}
      {errorUpdate && <em className='text-red-400'>{errorUpdate}</em>}
    </li>
  )
})

ListItem.displayName = 'ListItem'
