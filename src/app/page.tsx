import { fetchTodos } from '@/actions/todo.action'
import { Filter } from '@/components/filter'
import { Form } from '@/components/form'
import { List } from '@/components/list'
import { TodoFilter } from '@/types/todo.type'

type HomeProps = {
  searchParams: Promise<{ filter?: TodoFilter }>
}

export default async function Home({ searchParams }: HomeProps) {
  const filter = (await searchParams)?.filter
  const todos = await fetchTodos({ filter: filter ?? TodoFilter.ALL })

  return (
    <div id='app' className='flex flex-col gap-2'>
      <h2 className='text-9xl text-center font-thin'>Todos</h2>
      <Form />
      <Filter todos={todos} filter={filter ?? TodoFilter.ALL} />
      <List todos={todos} />
    </div>
  )
}
