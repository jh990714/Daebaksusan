
import styles from './Footer.module.css'
import logo from '../assets/logo.jpg';

export const Footer = () => {
  return (
    <footer className="bg-[#393B3E]">
      <div className="text-white border-b border-black">
        <div className="grid grid-cols-3 w-4/5 m-auto py-3 ">
          <div className="text-xl font-bold">고객센터 1234-5678</div>
          <div className="pl-2 content-center">평일 10:00 - 17:00 (점심 12:00 - 13:00 / 주말 및 공휴일 휴무)</div>
          <div className='flex justify-center'>
            <a className="pr-2 text-white no-underline" href="#">이용약관</a>
            <span>|</span>
            <a className="px-2 text-white no-underline" href="#">개인정보처리방침</a>
            <span>|</span>
            <a className="px-2 text-white no-underline" href="#">회사소개</a>
          </div>
        </div>
      </div>

      <div className="py-4 w-4/5 m-auto text-[#888] text-start text-sm leading-8">
        <div className="flex justify-center gap-5 text-lg text-white font-bold">
          <div className="pr-2">법인 : 어업회사법인 유한회사 대박수산 </div>
          <div className="px-2">사업자 등록 번호 : 592-81-02388</div>
          <div className="pl-2">대표 : 강우복</div>
        </div>

        <div className="flex justify-center gap-10 py-4">
          <img src={logo} width='180' alt='대박수산 로고' />

          <div>
            <div>대표번호 : 1234-5678</div>
            <div className="flex">
              <div className='pr-2'>통신판매업 신고 : 제 2022-전북군산-0069 호</div>
              <span>|</span>
              <a className="pl-2 text-white no-underline" target="_blank" href="https://www.ftc.go.kr/www/biz/bizCommList.do?key=5375">통신판매업신고확인</a>
            </div>
            <div>주소 : 54166 전라북도 군산시 칠성2길 97(산북동) </div>
            <div>개인정보관리책임자 : 강우복(a01083774151@gmail.com)</div>
            <div>Copyright © 2024 대박수산. All rights reserved.</div>
          </div>

          <div>
            <div>배송안내</div>
            <div>평일(월~금) 오후 5시 이전 주문 시, 당일 발송</div>
            <div>* 무통장 입금 및 카드결제 완료 기준 </div>
            <div>토/일요일 주문 건 차주 영업일 발송</div>
            <div>* 공휴일 및 명절연휴 별도 공지</div>
          </div>
        </div>
      </div>
      <div className="py-2"></div>
    </footer>
  );
};

export default Footer;

