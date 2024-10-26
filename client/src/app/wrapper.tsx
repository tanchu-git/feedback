"use client";

import React from 'react'
import StoreProvider from './redux';

const Layout = ({children} : {children: React.ReactNode}) => {

  return (
    <div>
        <main>            
            {children}
        </main>
    </div>
  )
}

// Make it compatible with redux toolki by wrapping the layout and export it 
const LayoutWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <Layout>{children}</Layout>
    </StoreProvider>
  )
}

export default LayoutWrapper