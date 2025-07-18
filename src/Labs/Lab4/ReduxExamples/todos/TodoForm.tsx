import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo, updateTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">

            <input value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                className="form-control w-50" />

            <div>
                <button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click" className="btn btn-warning me-2">
                    Update
                </button>

                <button onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click" className="btn btn-success">
                    Add
                </button>
            </div>
        </li>
    );
}
