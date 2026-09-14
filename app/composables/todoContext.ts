interface TodoState {
   todos: TodoItem[];
   done: TodoItem[];
   deleted: TodoItem[];
}

export function provideTodoContext() {
   const state = reactive<TodoState>({
      todos: [newTodo()],
      done: [],
      deleted: [],
   });

   function createNewTodo(fromIndex: number) {
      state.todos.splice(fromIndex + 1, 0, newTodo());
   }

   function markDone(item: TodoItem) {
      const i = state.todos.indexOf(item);
      if (i === -1) return;
      state.todos.splice(i, 1);
      item.done = true;
      state.done.push(item);
   }

   function markUndone(item: TodoItem) {
      const i = state.done.indexOf(item);
      if (i === -1) return;
      state.done.splice(i, 1);
      item.done = false;
      state.todos.push(item);
   }

   function softDelete(item: TodoItem, from: TodoItem[]) {
      const i = from.indexOf(item);
      if (i === -1) return;
      from.splice(i, 1);
      item.deletedAt = new Date();
      state.deleted.push(item);
   }

   function restore(item: TodoItem) {
      const i = state.deleted.indexOf(item);
      if (i === -1) return;
      state.deleted.splice(i, 1);
      if (item.done) {
         state.done.push(item);
      } else {
         state.todos.push(item);
      }
   }

   function deleteTodo(index: number) {
      state.todos.splice(index, 1);
   }

   const context = {
      state,
      createNewTodo,
      markDone,
      markUndone,
      softDelete,
      restore,
      deleteTodo,
   };
   provide(TodoContextKey, context);
   return context;
}

const TodoContextKey: InjectionKey<ReturnType<typeof provideTodoContext>> =
   Symbol("todo-context");

export function useTodoContext() {
   const context = inject(TodoContextKey);
   if (!context)
      throw new Error(
         "useTodoContext() called without provideTodoContext() in an ancestor",
      );
   return context;
}
