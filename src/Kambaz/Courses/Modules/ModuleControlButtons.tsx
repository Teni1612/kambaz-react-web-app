import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons(
    { moduleId, deleteModule, editModule }: {
        moduleId: string;
        deleteModule: (moduleId: string) => void;
        editModule: (moduleId: string) => void;
    } 
) {
    return (
        <div className="float-end">
            <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
            <FaTrash onClick={() => deleteModule(moduleId)} className="text-danger me-3 mb-1" />
            <GreenCheckmark />
            <BsPlus className="fs-1"/>
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}