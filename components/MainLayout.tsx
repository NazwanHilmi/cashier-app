
import React from 'react'
import MainHeader from './MainHeader'

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
    <div className=''>
        <main> {children} </main>
    </div>
    )
}
