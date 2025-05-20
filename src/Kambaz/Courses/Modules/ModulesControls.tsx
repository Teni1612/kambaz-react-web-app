import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";

export default function ModulesControls() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="m-0">Module</h2>
      <div className="d-flex gap-2">
        <Button variant="success" className="d-flex align-items-center">
          <FaPlus className="me-2" />
          <span>Module</span>
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-publish">
            Publish All <GreenCheckmark />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="wd-publish-all-modules-and-items">
              Publish All
              <div className="text-muted small">Publish all modules and items</div>
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              Publish modules only
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-all-modules-and-items">
              Unpublish All
              <div className="text-muted small">Unpublish all modules and items</div>
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-modules-only">
              Unpublish modules only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}