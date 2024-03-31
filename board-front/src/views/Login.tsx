import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

declare global {
  interface Window {
    Kakao: any;
  }
}


export const Login:React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [inputShake, setInputShake] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (id === '') {
        setInputShake(true);
        setTimeout(() => setInputShake(false), 500);
      } else {
        try {
          const response = await axios.post('http://localhost:8080/members/login', {
            userName: id,
            password: password,
          });
          const { accessToken, refreshToken } = response.data; // 수정된 부분

          localStorage.setItem('accessToken', accessToken); // 수정된 부분
          localStorage.setItem('refreshToken', refreshToken); // 수정된 부분

          
          navigate(-2);
        } catch (error) {
          console.error('로그인 실패:', error);
          alert('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
          // 로그인 실패 처리
        }
      }
    }
  
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const loginWithKakao = () => {
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/login',
      });
    };
  
    // 데모를 위한 UI 코드
    useEffect(() => {
      displayToken();
    }, []);
  
    const displayToken = () => {
      const token = getCookie('authorize-access-token');
      const tokenResultElement = document.getElementById('token-result');
    
      if (token && tokenResultElement) { // tokenResultElement이 null이 아닌지 확인
        window.Kakao.Auth.setAccessToken(token);
        window.Kakao.Auth.getStatusInfo()
          .then((res: { status: string; }) => {
            if (res.status === 'connected') {
              tokenResultElement.innerText = 'login success, token: ' + window.Kakao.Auth.getAccessToken();
            }
          })
          .catch((err: any) => {
            window.Kakao.Auth.setAccessToken(null);
          });
      }
    };
  
    const getCookie = (name: string) => {
      const parts = document.cookie.split(name + '=');
      if (parts.length === 2) { return parts[1].split(';')[0]; }
    };
    
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-lg font-extrabold text-blue-700 md:text-2xl">대박 수산에 오신 것을 환영합니다 </h2>
            <h2 className="mt-10 text-center text-base font-extrabold text-gray-700 md:text-lg">탁월한 맛 신선함이 만나는 곳</h2>
            <h2 className="mb-10 text-center text-base font-extrabold text-gray-700 md:text-lg">맛과 품질에 대한 끊임없는 향수를 추구합니다</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className={`rounded-md shadow-sm -space-y-px ${inputShake ? 'shake' : ''}`}>
              <div className="relative">
                <label htmlFor="id-input" className="sr-only">ID</label>
                <input id="id-input" name="id" type="text" autoComplete="id" required className={`appearance-none rounded-lg relative block w-full px-3 py-2 border-2 ${inputShake ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`} placeholder="" value={id} onChange={handleIdChange} />
                <div className="absolute -top-2 left-4 bg-white z-50 text-sm">ID</div>
              </div>
              {/* {showPasswordInput && ( */}
                <div className="space-y-3 relative" id="password-field">
                  <label htmlFor="password-input" className="sr-only">비밀번호</label>
                  <input id="password-input" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="" value={password} onChange={handlePasswordChange} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute top-0 right-0 pr-3 flex items-center text-sm leading-5 z-50">
                    보기
                  </button>
                  <div className="absolute -top-5 left-4 bg-white z-50 text-sm">비밀번호</div>
                </div>
              {/* )} */}
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                계속
              </button>
            </div>
          </form>
          <div className="text-sm flex justify-end">
            <div className="font-medium">계정이 없으신가요?&nbsp;&nbsp;</div>
            <Link to='/joinStep1' className="font-medium text-blue-600 hover:text-blue-500">가입하기</Link>
        </div>
        <div className="grid grid-cols-3 text-sm">
            <div className="border-b-2 border-blue-700 h-3"></div>
            <div className="font-medium text-gray-600">또는</div>
            <div className="border-b-2 border-blue-700 h-3"></div>
        </div>
        
        <div>
            <button className="w-full flex justify-center mt-3 py-3 px-4 border-2 border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Google 계정으로 계속</button>
            <button className="w-full flex justify-center mt-3 py-3 px-4 rounded-md bg-green-600 text-sm font-medium text-white hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">Naver 계정으로 계속</button>
            <a id="kakao-login-btn" href="#" onClick={loginWithKakao}>
              <img src={process.env.PUBLIC_URL + `/login/kakao_login_medium_narrow.png`} width="222"
                alt="카카오 로그인 버튼" />
            </a>
            <p id="token-result"></p>
            {/* <button className="w-full flex justify-center mt-3 py-3 px-4 rounded-md bg-yellow-300 text-sm font-medium text-yellow-950 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">Kakao 계정으로 계속</button> */}
        </div>
        </div>
      </div>
    );
}
