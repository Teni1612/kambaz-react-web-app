import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const pathname = useLocation().pathname;
    const active = (path: string) => (pathname.includes(path) ? "active" : "text-danger");

    return (
        <ListGroup id="wd-account-navigation" className="wd fs-5 rounded-0">

            {links.map((link) => (
                <ListGroup.Item key={link} to={`/Kambaz/Account/${link}`} as={Link} id={`wd-account-${link.toLowerCase()}-link`} className={`border border-0 ${active(link)}`}>
                    {link}
                </ListGroup.Item>
            ))}

            {currentUser && currentUser.role === "ADMIN" && (
                <ListGroup.Item key={"Users"} to={`/Kambaz/Account/Users`} as={Link} className={`border border-0 ${active("Users")}`}>
                    Users
                </ListGroup.Item>
            )}

        </ListGroup>
    );
}
