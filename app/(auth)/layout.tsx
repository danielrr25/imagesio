import React from 'react'


// Layout component for authentication pages, providing a consistent layout.

// Layout has always export some children within them
const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className="auth">{children} </main>
  )
}

export default Layout
