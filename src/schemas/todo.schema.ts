import { TodoFilter } from '@/types/todo.type'
import { z } from 'zod'

export const getTodosSchema = z
  .object({
    filter: z.enum(TodoFilter)
  })
  .optional()
  .nullable()

export const storeTodoSchema = z.object({
  title: z.string().min(1, 'Title is required')
})

export const updateTodoSchema = z.object({
  id: z.number(),
  checked: z.boolean()
})

export const removeTodoSchema = z.object({
  id: z.number()
})

export type StoreTodoForm = z.infer<typeof storeTodoSchema>
export type UpdateTodoForm = z.infer<typeof updateTodoSchema>
export type RemoveTodoForm = z.infer<typeof removeTodoSchema>
