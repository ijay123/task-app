import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import Sidebar from '../sidebar/Sidebar'

const Layout = ({children}) => {
  return (
    <div>
      <div className='fixed min-h-screen'>
      <Navigation/>
        <Sidebar/>
      </div>
        
        <div className='flex-grow'>{children}</div>
        <Footer/>
    </div>
  )
}

export default Layout