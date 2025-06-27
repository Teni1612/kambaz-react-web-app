import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

    const [module, setModule] = useState({
        id: "1",
        name: "Get started with NodeJS",
        description: "Learn the basics of NodeJS and create your own server to handle HTTP requests",
        course: "Web Development",
    })
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}`}>
                Get Assignment
            </a>
            <hr />

            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}/title`}>
                Get Title
            </a>
            <hr />

            <h4>Modifying Properties</h4>

            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end mb-2"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <FormControl className="w-75 mb-2" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />

            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end mb-2"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <FormControl className="w-75 mb-2" id="wd-assignment-score"
                type="number"
                value={assignment.score} onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })} />

            <div className="form-check">
                <input id="wd-assignment-completed" className="form-check-input" type="checkbox" checked={assignment.completed} 
                onChange={() => setAssignment({...assignment, completed: (!assignment.completed)})}/>
                <a id="wd-update-assignment-updated"
                className="btn btn-primary" 
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Completed
                </a>
            </div>
            <hr />

            <h4>Modules (On your own)</h4>
            <a id="wd-retrieve-module" className="btn btn-primary me-2 mb-2"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a>

            <a id="wd-retrieve-module-name" className="btn btn-primary mb-2"
                href={`${MODULE_API_URL}/name`}>
                Get Name
            </a>

            <div className="mb-2">
                <a id="wd-update-module-name"
                    className="btn btn-primary float-end"
                    href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Name
                </a>
                <FormControl className="w-75" id="wd-module-name"
                    defaultValue={module.name} onChange={(e) =>
                        setModule({ ...module, name: e.target.value })} />
            </div>

            <div>
                <a id="wd-update-module-description"
                    className="btn btn-primary float-end"
                    href={`${MODULE_API_URL}/description/${module.description}`}>
                    Update Description
                </a>
                <FormControl className="w-75" id="wd-module-description"
                    defaultValue={module.description} onChange={(e) =>
                        setModule({ ...module, description: e.target.value })} />
            </div>

            <hr />

        </div>
    );
}
