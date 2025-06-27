import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

export default function QuizControlButtons({quiz, setShowDeleteModal, handleEdit, handlePublish} : {
    quiz: any;
    setShowDeleteModal: (show: boolean) => void;
    handleEdit: (quizId: string) => void;
    handlePublish: (quiz: any, publish: boolean) => void;
}) {

    return (
        <div id="wd-quiz-control-btns" className="d-flex justify-content-end align-items-center mt-2 gap-1">
            {quiz.published? (
                <FaCheckCircle className="text-success fs-4 me-3 mt-1" />
            ) : (
                <FaBan className="fs-4 me-3 mt-1" style={{ color: '#a3d9a5' }}/>
            )}
            

            <Dropdown align="end">
                <Dropdown.Toggle as="span" className="fs-4 p-1" bsPrefix="custom-toggle">
                    <IoEllipsisVertical />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(quiz)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowDeleteModal(true)}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePublish(quiz, !quiz.published)}>
                        {quiz.published? "Unpublish": "Publish"}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}