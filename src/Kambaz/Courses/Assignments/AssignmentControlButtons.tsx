import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";

export default function ModuleControlButtons() {
    return (
        <div className="float-end justify-content-between">
            <span className="border border-3 black me-3" style={{ borderRadius: '40px', padding: '10px', fontSize: '16px' }}>
                40% of Total
            </span>
            <BsPlusLg className="me-2" />
            <IoEllipsisVertical className="fs-4 me-2" />
        </div>
    );
}