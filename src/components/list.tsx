'use client'

import { memo } from 'react'
import { ListItem } from './list-item'
import { Todo } from '@/types/todo.type'

type ListProps = {
  todos: Todo[]
}

export const List = memo(({ todos }: ListProps) => {
  if (todos.length === 0) {
    return (
      <div className='py-2 px-4 bg-red-400 rounded text-black text-center'>
        No Todos Found! Start Creating Todo!
      </div>
    )
  }

  return (
    <ul className='p-0 flex flex-col gap-3'>
      {todos.map((todo, index) => (
        <ListItem todo={todo} key={`${todo.id}-${index}`} />
      ))}
    </ul>
  )
})

List.displayName = 'List'
