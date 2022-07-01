import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router'
// import { useState } from 'react'
import './nav.css'
import { QUERY_ME_BASIC } from '../../utils/queries'
import { useQuery } from '@apollo/client'
// import Auth from '../../utils/auth'



function Nav() {
 const { data } = useQuery(QUERY_ME_BASIC)
 const userId = data?.me._id || ''
 return (
  <>
    <nav>
        <Link to="/" className="navLink">
            Home
        </Link>
        <Link to={`/profile/${userId}`} className="navLink">
            My profile
        </Link>
        <Link to="/search-people" className="navLink">
            Search
        </Link>
    </nav>
  </>
 )
}

export default Nav
