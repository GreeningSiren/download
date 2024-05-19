import {Link} from "react-router-dom";

export default function ErrorElement() {
    return (
        <>
            <div>ERROR 404! PAGE NOT FOUND</div>
            <Link to={'/download/'}>Go Home</Link>
        </>
    )
}
