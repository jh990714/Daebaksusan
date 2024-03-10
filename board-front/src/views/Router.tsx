import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Detail } from './Detail'
import { Home } from './Home'
import { Login } from './Login'
import { Mypage } from './Mypage'
import { MyCart } from './MyCart'

export const Router:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/cart" element={<MyCart />} />
    </Routes>
  )
}
