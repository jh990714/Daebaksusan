import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Detail } from './Detail'
import { Home } from './Home'
import { Login } from './Login'
import { Mypage } from './Mypage'
import { MyCart } from './MyCart'
import { Order } from './Order'
import { CategoryProduct } from 'views/CategoryProduct'
import { OrderStatus } from './OrderStatus'

export const Router:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bestProducts" element={<CategoryProduct category='./bestProducts'/>} />
      <Route path="/newProducts" element={<CategoryProduct category='./newProducts'/>} />
      <Route path="/allProducts" element={<CategoryProduct category='./allProducts'/>} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/cart" element={<MyCart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/orderStatus" element={<OrderStatus />} />
    </Routes>
  )
}
