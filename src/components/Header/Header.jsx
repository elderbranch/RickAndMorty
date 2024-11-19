import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  return (
    <div className='header'>
      <div className='header__container'>
        <div><img src="https://rick-morty-lime.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-black%201.f4a3a246.png&w=48&q=75" alt="" /></div>
        <ul className='nav__container'>
          <Link to={`/characters`}>Characters</Link>
          <Link to={`/location`}>Locations</Link>
          <Link to={`/episodes`}>Episodes</Link>
        </ul>
      </div>
    </div>
  )
}

export default Header