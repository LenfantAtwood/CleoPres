import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient' // Adjust the import path as necessary

function Page() {
  const [todos, setTodos] = useState<string[]>([])
  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select()

      if (todos && todos.length > 1) {
        const todoList = todos.map((todo) => todo.todo)
        if (todoList.length > 0) {
          setTodos(todoList)
        }
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}
export default Page

