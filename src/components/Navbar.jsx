import { Link, NavLink } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Cocktail Cabinet</Link>
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/">Cocktails</NavLink>
                    <NavLink className="nav-link" to="/cabinet">My Cabinet</NavLink>
                    <NavLink className="nav-link" to="/suggestions">Suggestions</NavLink>
                </div>
            </div>
        </nav>
    )
}


export default Navbar