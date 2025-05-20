import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaChartBar, FaUserGraduate, FaCalendarAlt, FaCog, FaRedoAlt, FaFileExport } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: 350 }}>
      <h2>Course Status</h2>

      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button
            id="wd-unpublish"
            variant="secondary"
            size="lg"
            className="w-100 text-nowrap"
          >
            <MdDoNotDisturbAlt className="me-2 fs-5" />
            Unpublish
          </Button>
        </div>
        <div className="w-50 ps-1">
          <Button
            id="wd-publish"
            variant="success"
            size="lg"
            className="w-100 text-nowrap"
          >
            <FaCheckCircle className="me-2 fs-5" />
            Publish
          </Button>
        </div>
      </div>

      <br />
      <Button
        id="wd-import-existing"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </Button>
      <Button
        id="wd-import-commons"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </Button>

      <Button
        id="wd-view-analytics"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <FaChartBar className="me-2 fs-5" />
        View Analytics
      </Button>
      <Button
        id="wd-student-view"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <FaUserGraduate className="me-2 fs-5" />
        Student View
      </Button>
      <Button
        id="wd-calendar"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <FaCalendarAlt className="me-2 fs-5" />
        Calendar
      </Button>
      <Button
        id="wd-course-settings"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <FaCog className="me-2 fs-5" />
        Course Settings
      </Button>
      <Button
        id="wd-reset-content"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <FaRedoAlt className="me-2 fs-5" />
        Reset Course Content
      </Button>
      <Button
        id="wd-export-content"
        variant="secondary"
        size="lg"
        className="w-100 mt-1 text-start"
      >
        <FaFileExport className="me-2 fs-5" />
        Export Course Content
      </Button>
    </div>
  );
}