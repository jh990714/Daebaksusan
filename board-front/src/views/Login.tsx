import React from 'react'
import { useState } from 'react';
import { FormEvent } from 'react';
import styles from './Login.module.css';

export const Login:React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [inputShake, setInputShake] = useState(false);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (id === '') {
        setInputShake(true);
        setTimeout(() => setInputShake(false), 500);
      } else if (id === 'lgd') {
        setShowPasswordInput(true);
      }
    };
  
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">환영합니다.</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className={`rounded-md shadow-sm -space-y-px ${inputShake ? 'shake' : ''}`}>
              <div className="relative">
                <label htmlFor="id-input" className="sr-only">ID</label>
                <input id="id-input" name="id" type="text" autoComplete="id" required className={`appearance-none rounded-lg relative block w-full px-3 py-2 border-2 ${inputShake ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`} placeholder="ID를 입력하세요." value={id} onChange={handleIdChange} />
                <div className="absolute -top-3 left-4 bg-white z-50">ID</div>
              </div>
              {showPasswordInput && (
                <div className="space-y-3 relative" id="password-field">
                  <label htmlFor="password-input" className="sr-only">비밀번호</label>
                  <input id="password-input" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute top-0 right-0 pr-3 flex items-center text-sm leading-5 z-50">
                    보기
                  </button>
                  <div className="absolute -top-5 left-4 bg-white z-50">비밀번호</div>
                </div>
              )}
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                계속
              </button>
            </div>
          </form>
          <div className="text-sm flex justify-end">
            <div className="font-medium hover:text-blue-500">계정이 없으신가요?&nbsp;&nbsp;</div>
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">가입하기</a>
        </div>
        <div className="grid grid-cols-3 text-sm">
            <div className="border-b-2 border-blue-700 h-3"></div>
            <div className="font-medium text-gray-600">또는</div>
            <div className="border-b-2 border-blue-700 h-3"></div>
        </div>
        
        <div>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Google 계정으로 계속</button>
            <button className="mt-3 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Naver 계정으로 계속</button>
            <button className="mt-3 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Kakao 계정으로 계속</button>
        </div>
        </div>
      </div>
    );
}
