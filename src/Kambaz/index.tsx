import Account from "./Account";
import "./styles.css"; 
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { Routes, Route, Navigate } from "react-router";
import PeopleTable from "./Courses/People/Table";
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <h1>Kambaz</h1>

      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="People" element={<PeopleTable />} /> 
        </Routes>
      </div>
    </div>
  );
}
