import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Trash2Icon, Edit2Icon, PlusCircleIcon, SaveIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoListDemo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo: TodoItem) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo,
      ),
    );
    setEditingTodoId(null);
    setEditingText("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        待辦事項/任務管理器 Demo
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>新增待辦事項</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="新增一個任務..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") addTodo();
              }}
            />
            <Button onClick={addTodo}>
              <PlusCircleIcon className="h-4 w-4 mr-2" /> 新增
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>我的任務</CardTitle>
          <Select
            value={filter}
            onValueChange={(value: "all" | "active" | "completed") =>
              setFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="篩選" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有</SelectItem>
              <SelectItem value="active">進行中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {filteredTodos.length > 0 ? (
              <ul className="space-y-4">
                {filteredTodos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between bg-background p-3 rounded-md shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onCheckedChange={() => toggleComplete(todo.id)}
                      />
                      {editingTodoId === todo.id ? (
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") saveEdit(todo.id);
                          }}
                          className="flex-grow"
                        />
                      ) : (
                        <Label
                          htmlFor={`todo-${todo.id}`}
                          className={`flex-grow text-lg ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {todo.text}
                        </Label>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {editingTodoId === todo.id ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => saveEdit(todo.id)}
                        >
                          <SaveIcon className="h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEditing(todo)}
                          >
                            <Edit2Icon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTodo(todo.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                目前沒有任務。
              </p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
