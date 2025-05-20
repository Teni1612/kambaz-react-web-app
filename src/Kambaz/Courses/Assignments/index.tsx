export default function Assignments() {
  return (
    <div className="assignments-container">
      {/* Search and action buttons */}
      <div className="controls-row">
        <input
          type="text"
          placeholder="Search for Assignments"
          className="search-input"
        />
        <button className="control-button">+ Group</button>
        <button className="control-button">+ Assignment</button>
      </div>

      {/* Heading with add button */}
      <div className="heading-row">
        <h1 className="main-heading">ASSIGNMENTS 40% of Total</h1>
        <button className="add-button">+</button>
      </div>

      {/* Assignment list */}
      <ul className="assignment-list">
        <li className="assignment-item">
          <a href="#" className="assignment-title">
            A1 - ENV + HTML
          </a>
          <div className="assignment-details">
            Multiple Modules | Not available until May 6 at 12:00am | Due May 13
            at 11:59pm | 100 pts
          </div>
        </li>

        <li className="assignment-item">
          <a href="#" className="assignment-title">
            A2 - CSS + BOOTSTRAP
          </a>
          <div className="assignment-details">
            Multiple Modules | Not available until May 13 at 12:00am | Due May
            20 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="assignment-item">
          <a href="#" className="assignment-title">
            A3 - JAVASCRIPT + REACT
          </a>
          <div className="assignment-details">
            Multiple Modules | Not available until May 20 at 12:00am | Due May
            27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
