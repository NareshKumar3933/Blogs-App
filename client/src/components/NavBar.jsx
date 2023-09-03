import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="flex justify-center items-center gap-10 font-bold text-lg 
    shadow-md py-3">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>

    </nav>
  )
}

export default NavBar