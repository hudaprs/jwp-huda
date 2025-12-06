'use server'

import { prisma } from '@/libs/prisma'
import {
  getTodosSchema,
  removeTodoSchema,
  storeTodoSchema,
  updateTodoSchema
} from '@/schemas/todo.schema'
import { TodoFilter } from '@/types/todo.type'
import { makeAction } from '@/utils/action.util'
import { revalidatePath } from 'next/cache'

export const fetchTodos = makeAction(getTodosSchema, async params => {
  return prisma.todo.findMany({
    where: {
      completed:
        params?.filter === TodoFilter.COMPLETED
          ? true
          : params?.filter === TodoFilter.ACTIVE
            ? false
            : undefined
    },
    orderBy: {
      id: 'desc'
    }
  })
})

export const storeTodo = makeAction(storeTodoSchema, async data => {
  await prisma.todo.create({
    data: { title: data.title, completed: false }
  })

  revalidatePath('/')
})

export const updateTodo = makeAction(updateTodoSchema, async data => {
  await prisma.todo.update({
    where: { id: data.id },
    data: { completed: data.checked }
  })

  revalidatePath('/')
})

export const removeTodo = makeAction(removeTodoSchema, async data => {
  await prisma.todo.delete({
    where: { id: data.id }
  })

  revalidatePath('/')
})

export const clearCompletedTodo = makeAction(null, async () => {
  await prisma.todo.deleteMany({
    where: { completed: true }
  })

  revalidatePath('/')
})
