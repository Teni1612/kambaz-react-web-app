import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModulesControls";
import CourseStatus from "../Home/Status";  

export default function Modules() {
  return (
    <div className="d-flex">
      <div className="flex-fill">
        <ModulesControls />
        <div style={{ height: "2rem" }} />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> Week 1
              <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                Learn what is Web Development
                <LessonControlButtons />
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>

          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> Week 2
              <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                Setting Up Your Development Environment
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                CSS Basics & Selectors
                <LessonControlButtons />
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="wd-title wd-module-title p-3 ps-2">

      <div className="d-none d-xl-block ms-4" style={{ width: 350 }}>
        <CourseStatus />
      </div>
      </div>
    </div>
  );
}