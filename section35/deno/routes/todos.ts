import { Router } from 'https://deno.land/x/oak/mod.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.31.2/mod.ts';

import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection('todos').find(); // { _id: ObjectId(), text: '...' }[]
  const transformedTodos = await todos.map(
    (todo: { _id: ObjectId; text: string }) => {
      return {
        id: todo._id,
        text: todo.text,
      };
    }
  );
  console.log(transformedTodos);
  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { text } = await value;
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: text,
  };

  const id = await getDb().collection('todos').insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;
  const { value } = ctx.request.body({ type: 'json' });
  const { text } = await value;

  await getDb()
    .collection('todos')
    .updateOne({ _id: new ObjectId(tid) }, { $set: { text: text } });

  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;

  await getDb()
    .collection('todos')
    .deleteOne({ _id: new ObjectId(tid) });

  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
