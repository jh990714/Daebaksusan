import JoinTimeLine from 'components/JoinTimeLineComp';
import React, { useState, FormEvent } from 'react';

export const JoinStep3: React.FC = () => {

    // 상태 관리
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
    alert('Form submitted successfully!');
    // 예: 서버로 데이터 전송
    };
    

    return (
        <div className="container mx-auto mt-10 p-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl text-blue-600 font-semibold">회원가입</h1>
            </div>
            <div className="py-2">
                <div className="flex">
                    <div className="w-1/5 border-r text-l font-semibold relative">
                        <div className="space-y-6 mt-10">
                            <div className="">
                                <JoinTimeLine currentStep={3} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <div className="container mx-auto p-8">
                            <div className="max-w-2xl mx-auto bg-white p-6">
                                <form id="registrationForm" onSubmit={handleSubmit} className="">
                                    <div className="grid grid-rows-4 h-48 mb-5">
                                        <div className="text-start text-blue-700 text-2xl font-semibold border-b-2 border-blue-700">01. 로그인 정보</div>

                                        <div className="grid grid-cols-6 border-b-2 border-gray-300">
                                            <label htmlFor="memberId" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">회원 ID</label>
                                            <div className="col-span-5 flex">
                                                <input type="text" id="memberId" name="memberId" required minLength={4}
                                                    className=" m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="ID 입력" value={memberId} onChange={(e) => setMemberId(e.target.value)} />
                                                <div className="flex items-center text-xs">4자리 이상 입력</div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-6 border-b-2 border-gray-300">
                                            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">비밀번호</label>
                                            <div className="col-span-5 flex">
                                                <input type="password" id="password" name="password" required minLength={8}
                                                    className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <div className="flex items-center text-xs">영문 + 숫자 8자리 이상</div>
                                            </div>
                                        </div>
                                        {/* 나머지 필드에 대해서도 동일한 방법으로 상태를 관리하고 입력 필드를 생성합니다. */}
                                        <div className="grid grid-cols-6 border-b-2 border-gray-300">
                                            <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">비밀번호 확인</label>
                                            <div className="col-span-5 flex">
                                                <input type="password" id="passwordConfirm" name="passwordConfirm" required minLength={8}
                                                    className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="비밀번호를 재입력" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                                <div className="flex items-center text-xs">일치하도록</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-rows-4 h-48 mb-5">
                                        <div className="text-start text-blue-700 text-2xl font-semibold border-b-2 border-blue-700"> 02. 개인 정보 </div>

                                            <div className="grid grid-cols-6 border-b-2 border-gray-300">
                                                <label htmlFor="name" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">이름</label>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="name" name="name" required
                                                        className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
                                                        <div className="flex items-center text-xs"></div>
                                                </div>
                                            </div>

                                            {/* 휴대폰 번호 입력 필드는 세 개로 나누어 관리합니다. */}
                                            <div className="grid grid-cols-6 border-b-2 border-gray-300">
                                                <label htmlFor="name" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">휴대폰 번호</label>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="phone1" name="phone1" required maxLength={3}
                                                        className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="010" value={phone1} onChange={(e) => setPhone1(e.target.value)} />
                                                    <div className="flex items-center text-xs">-</div>
                                                    <input type="text" id="phone2" name="phone2" required maxLength={4}
                                                        className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="1234" value={phone2} onChange={(e) => setPhone2(e.target.value)} />
                                                    <div className="flex items-center text-xs">-</div>
                                                    <input type="text" id="phone3" name="phone3" required maxLength={4}
                                                        className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="5678" value={phone3} onChange={(e) => setPhone3(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-6 border-b-2 border-gray-300">
                                                <label htmlFor="email" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">이메일</label>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="email" name="email" required
                                                    className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="이메일을 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <span className="flex items-center text-xs">@</span>
                                                    <input type="text" id="emailDomain" name="emailDomain" required
                                                    className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="도메인" value={emailDomain} onChange={(e) => setEmailDomain(e.target.value)} />
                                                </div>
                                            </div>
                                    </div>
                                    {/* 배송 주소 */}
                                    <div className="grid grid-rows-4 h-48 mb-5">
                                        <div className="text-start text-blue-700 text-2xl font-semibold border-b-2 border-blue-700"> 03. 기본 배송지 등록</div>

                                        <div className="row-span-3 grid grid-cols-6 border-b-2 border-gray-300">
                                            <label htmlFor="address" className="text-sm font-medium text-gray-700 flex justify-center items-center bg-blue-100">배송 주소</label>
                                            <div className="grid grid-rows-3">
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="address" name="address" required
                                                        className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="우편 번호" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                    <button className="text-white text-xs bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-2 m-2 text-center">주소찾기</button>
                                                </div>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="address" name="address" required
                                                        className="m-2 w-64 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="주소" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="address" name="address" required
                                                        className="m-2 w-64 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="상세 주소" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit"
                                        className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">계속</button>
                                    </div>
                                </form>
                            </div>
                            </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
