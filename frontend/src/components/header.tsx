import { Link } from "react-router-dom"

export const Header = () => {
  return(
    <div>
      <nav className="flex justify-between px-6">
        <Link to={"/"}>
          <h1>Get a Pet</h1>
        </Link>
        <div className="flex gap-5">
          <Link to={"/register"}>
            Register
          </Link>
          <Link to={"/login"}>
            Login
          </Link>
        </div>
      </nav>
    </div>
  )
}