import {Link} from "react-router-dom";

export default function ErrorElement() {
    return (
        <>
            <h1>❗ ERROR 404 ❗ PAGE NOT FOUND ❗</h1>
            <Link to={'/download/'} style={{fontSize:"40px", textDecoration:"none", color:"#05dcaa"}}>Go Home</Link>
        </>
    )
}
