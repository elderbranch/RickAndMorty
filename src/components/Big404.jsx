import { Link } from "react-router-dom"
import "./Error404.scss";
import Logo from "../assets/404.webp"


const Big404 = () => {
  return (
    <div className="not__found">
      <h1 className="not__found_title">Oh No! Its waba laba dub dub!</h1>
      <div className="not__found_subtitle">Page not found</div>
      <div className="not__found_error">
        <span className="letter">4</span>
        <img src={Logo} alt="" />
        <span className="letter">4</span>
      </div>
      <Link to={'/characters'}>
        <button className="not__found_btn">Home Page</button>
      </Link>
    </div>
  )
}

export default Big404;