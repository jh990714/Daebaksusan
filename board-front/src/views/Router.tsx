import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Detail } from './Detail'
import { Home } from './Home'
import { Login } from './Login'
import { Mypage } from './Mypage'
import { MyCart } from './MyCart'
import { Order } from './Order'
import { CategoryProduct } from 'views/CategoryProduct'
import { JoinStep1 } from './join/JoinStep1'
import { JoinStep2 } from './join/JoinStep2'
import { JoinStep3 } from './join/JoinStep3'
import { PaymentDetails } from './PaymentDetails'

export const Router:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bestProducts" element={<CategoryProduct category='./bestProducts'/>} />
      <Route path="/newProducts" element={<CategoryProduct category='./newProducts'/>} />
      {/* <Route path="/allProducts" element={<CategoryProduct category='./allProducts'/>} /> */}
      <Route path="/detail" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/allProducts" element={<Mypage />} />
      <Route path="/joinstep1" element={<JoinStep1 />} />
      <Route path="/joinstep2" element={<JoinStep2 />} />
      <Route path="/joinstep3" element={<JoinStep3 />} />
      <Route path="/cart" element={<MyCart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/paymentDetails" element={<PaymentDetails />} />
      <Route path="/paymentDetails" element={<PaymentDetails />} />
    </Routes>
  )
}
