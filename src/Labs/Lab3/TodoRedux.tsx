import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TodoRedux() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    
    return (
        <ListGroup>
            {todos.map((todo: any) => (
                <ListGroup.Item key={todo.id}>
                    {todo.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}