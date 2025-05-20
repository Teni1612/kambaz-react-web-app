import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCalendarAlt, FaFlask, FaInbox } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaBookSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0  position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        Northeastern
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>
      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        className="text-center border-0 bg-black text-white"
      >
        {" "}
        <FaRegCircleUser className="fs-1 text text-white" />
        <br />
        Account
      </ListGroup.Item>
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className="text-center border-0 
                  bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroup.Item>
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className="text-white 
                  bg-black text-center border-0"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroup.Item>
      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        id="wd-calendar-link"
        className="text-white 
                  bg-black text-center border-0"
      >
        <FaCalendarAlt className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroup.Item>
      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        id="wd-inbox-link"
        className="text-white 
                  bg-black text-center border-0"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroup.Item>
      <ListGroup.Item
        to="/Labs"
        as={Link}
        id="wd-labs-link"
        className="text-white 
                  bg-black text-center border-0"
      >
        <FaFlask className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
