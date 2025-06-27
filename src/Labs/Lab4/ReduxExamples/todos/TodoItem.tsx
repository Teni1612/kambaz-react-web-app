import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
}) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item d-flex align-items-center justify-content-between">
            {todo.title}

            <div>
                <button onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click" className="btn btn-primary me-2">
                    Edit
                </button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click" className="btn btn-danger">
                    Delete
                </button>
            </div>

        </li>
    );
}