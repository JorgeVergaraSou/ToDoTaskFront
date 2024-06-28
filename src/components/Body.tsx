import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LFRoutes from '../routes/LFRoutes'


interface RoutesType {
  element: React.ReactNode
  path: string
  key: string
}

export const Body: React.FC = () => {
  return (
    <div className='flex-grow'>
      <Routes>
        {LFRoutes.map((item: RoutesType) => (
          <Route key={item.key} path={item.path} element={item.element} />
        ))}

        {/* <Route path='*' element={<NotFoundRedirect />} /> */}
      </Routes>
    </div>
  )
}
