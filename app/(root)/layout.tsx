import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

// This is where all the pages within the applications will be 
// Layout has always export some children within them
const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    // The main with the root
    <main className="root">
      <Sidebar />
      <MobileNav />


        <div className="root-container">
            <div className="wrapper">
                {children}
            </div>
        </div>
        {children} </main>
        
  )
}

export default Layout
