import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Login ID</th>
          <th>Section</th>
          <th>Role</th>
          <th>Last Activity</th>
          <th>Total Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <FaUserCircle className="me-2 text-secondary" size={24} />
              Tony{" "}Stark
            </div>
          </td>
          <td className="align-middle">00123456</td>
          <td className="align-middle">S101</td>
          <td className="align-middle">STUDENT</td>
          <td className="align-middle">2020-10-01 10:21:32</td>
          <td className="align-middle">1h 30m</td>
        </tr>
        <tr>
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <FaUserCircle className="me-2 text-secondary" size={24} />
              Bruce{" "}Wayne
            </div>
          </td>
          <td className="align-middle">00123457</td>
          <td className="align-middle">S101</td>
          <td className="align-middle">STUDENT</td>
          <td className="align-middle">2020-10-02 14:35:22</td>
          <td className="align-middle">2h 45m</td>
        </tr>
        <tr>
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <FaUserCircle className="me-2 text-secondary" size={24} />
              Steve{" "}Rogers
            </div>
          </td>
          <td className="align-middle">00123458</td>
          <td className="align-middle">S102</td>
          <td className="align-middle">STUDENT</td>
          <td className="align-middle">2020-10-03 09:15:47</td>
          <td className="align-middle">3h 20m</td>
        </tr>
        <tr>
          <td className="align-middle">
            <div className="d-flex align-items-center">
              <FaUserCircle className="me-2 text-secondary" size={24} />
              Natasha{" "}Romanoff
            </div>
          </td>
          <td className="align-middle">00123459</td>
          <td className="align-middle">S102</td>
          <td className="align-middle">STUDENT</td>
          <td className="align-middle">2020-10-01 16:42:18</td>
          <td className="align-middle">2h 10m</td>
        </tr>
      </tbody>
    </Table>
  );
}