export interface TodoItem {
   id: string;
   description: string;
   done: boolean;

   createdAt: Date;
   updatedAt: Date | null;
   deletedAt: Date | null;
}

export type TodoGroup = "todo" | "done" | "trash";

export function genUUUID() {
   return crypto.randomUUID();
}

export function newTodo(): TodoItem {
   return {
      id: genUUUID(),
      description: "",
      done: false,

      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
   };
}
