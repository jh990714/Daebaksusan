import './HomeBanner2.css'
import { RcmndProductComp } from 'components/product/RcmndProductComp'

export const HomeBanner2 = () => {
  return (
    <div className='HomeBanner2Container'>
      <p className='text-4xl font-bold'> 이달의 추천 상품</p>
      <div className='flex'>
        <div className='section center'>
        <div className='item'>
            <RcmndProductComp />
          </div>
          <div className='item'>
            <RcmndProductComp />
          </div>
        </div>
        <div className='section right'>
          <div className='item'>
            <RcmndProductComp />
          </div>
          <div className='item'>
            <RcmndProductComp />
          </div>
        </div>
      </div>
    </div>
  )
}
