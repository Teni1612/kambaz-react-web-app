import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(7);
    console.log(count);
    return (
        <div id="wd-counter-use-state">
            <h2>Counter: {count}</h2>
            <button
                onClick={() => setCount(count + 1)}
                id="wd-counter-up-click" className="btn btn-success">Up
            </button>
            &nbsp;
            <button
                onClick={() => setCount(count - 1)}
                id="wd-counter-down-click" className="btn btn-danger">Down
            </button>
            <hr />
        </div>
    );
}