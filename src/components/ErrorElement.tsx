import {Link} from "react-router-dom";

export default function ErrorElement() {
    return (
        <>
            <h1>❗ERROR❗<br/>PAGE NOT FOUND</h1>
            <Link to={'/download/'} style={{fontSize:"40px", textDecoration:"underline", color:"#05dcaa"}}>Go Home</Link>
        </>
    )
}
