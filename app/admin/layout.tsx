import React, {FC} from 'react'
import SideNavbar from './components/sideNavbar'

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout:FC<AdminLayoutProps> =({children}) => {
  return (
    <div className='min-h-screen w-full flex'>
        <SideNavbar/>
        <div className='pt-8 w-full'>
            {children}
        </div>
    </div>
  )
}

export default AdminLayout;