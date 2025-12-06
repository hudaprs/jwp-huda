export type Todo = {
  id: number
  title: string
  completed: boolean
}

export enum TodoFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}
