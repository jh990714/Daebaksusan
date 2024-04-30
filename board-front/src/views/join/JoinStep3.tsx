import axios from 'axios';
import { AddressFinderButton } from 'components/Button/AddressFinderButton';
import JoinTimeLineComp from 'components/JoinTimeLineComp';
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressData, AddressObj } from 'types';

export const JoinStep3: React.FC = () => {
    const navigate = useNavigate();
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
    const [addressObj, setAddressObj] = useState<AddressObj>({
        address: '',
        zip: '',
        details: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fullPhone = `${phone1}-${phone2}-${phone3}`;
        const fullEmail = `${email}@${emailDomain}`;

        // 회원 ID와 비밀번호 확인
        const idRegex = /^[a-zA-Z0-9]+$/;
        if (!memberId.match(idRegex)) {
            alert('아이디는 알파벳과 숫자만 포함해야 합니다.');
            return;
        }

        if (memberId.length < 4) {
            alert('아이디는 최소 4자 이상이어야 합니다.');
            return;
        }
        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
        if (!password.match(passwordRegex)) {
            alert('비밀번호는 영문, 숫자, 특수문자가 각각 하나 이상 포함되어야 합니다.');
            return;
        }

        if (password.length < 8 || password.length > 15) {
            alert('비밀번호는 특수문자 + 영문 + 숫자 8 ~ 15자리 이어야 합니다.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const nameRegex = /^[가-힣]+$/;
        if (!name.match(nameRegex)) {
            alert('이름은 한글만 입력 가능합니다.');
            return;
        }

        const phoneRegex = /^[0-9]+$/;
        if (!phone1.match(phoneRegex) || !phone2.match(phoneRegex) || !phone3.match(phoneRegex)) {
            alert('휴대폰 번호는 숫자만 입력 가능합니다.');
            return;
        }


        // 이메일 형식 확인
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!fullEmail.match(emailRegex)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/signUp`, {
                id: memberId,
                password: password,
                name: name,
                phone: fullPhone,
                email: fullEmail,
                postalCode: addressObj.zip,
                address: addressObj.address,
                detailAddress: addressObj.details
            });
            console.log(response.data);
            navigate('/login')
        } catch (error: any) {
            alert(error.response.data);
        }

    };
    const handlePhoneChange = (field: string, value: string) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(value)) {
            return;
        }
        
        if (field === 'phone1') {
            setPhone1(value);
        } else if (field === 'phone2') {
            setPhone2(value);
        } else if (field === 'phone3') {
            setPhone3(value);
        }
    }

    const onCompletePostcode = (data: AddressData) => {
        const { address, addressType, bname, buildingName, sido, sigungu, zonecode } = data;
        let extraAddress = '';
        let localAddress = `${sido} ${sigungu}`;

        if (addressType === 'R') {
            extraAddress += bname ? bname : '';
            extraAddress += buildingName ? (extraAddress ? `, ${buildingName}` : buildingName) : '';
            const fullAddress = address.replace(localAddress, '') + (extraAddress ? ` (${extraAddress})` : '');

            const newAddressObj = {
                address: localAddress + fullAddress,
                zip: zonecode,
                details: ''
            };

            setAddressObj(newAddressObj);
        }
    };

    // 상세 주소 업데이트 함수 추가
    const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAddressObj = {
            ...addressObj,
            details: e.target.value
        };
        setAddressObj(updatedAddressObj); // 필요한 경우 부모 컴포넌트에도 업데이트 반영
    };

    const buttonClassName = "text-white text-xs bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-2 m-2 text-center";
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
                                <JoinTimeLineComp currentStep={3} />
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
                                                    placeholder="010" value={phone1} onChange={(e) => handlePhoneChange('phone1', e.target.value)} />
                                                <div className="flex items-center text-xs">-</div>
                                                <input type="text" id="phone2" name="phone2" required maxLength={4}
                                                    className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="1234" value={phone2} onChange={(e) => handlePhoneChange('phone2', e.target.value)} />
                                                <div className="flex items-center text-xs">-</div>
                                                <input type="text" id="phone3" name="phone3" required maxLength={4}
                                                    className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="5678" value={phone3} onChange={(e) => handlePhoneChange('phone3', e.target.value)} />
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
                                                    <input type="text" id="postal_code" name="postal_code" required
                                                        className="m-2 w-32 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="우편 번호" value={addressObj.zip} readOnly />
                                                    <AddressFinderButton onCompletePostcode={onCompletePostcode} className={buttonClassName} />
                                                    {/* <button className="text-white text-xs bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-2 m-2 text-center">주소찾기</button> */}
                                                </div>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="address" name="address" required
                                                        className="m-2 w-64 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="주소" value={addressObj.address} readOnly />
                                                </div>
                                                <div className="col-span-5 flex">
                                                    <input type="text" id="detail_address" name="detail_address" required
                                                        className="m-2 w-64 text-xs border-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="상세 주소" value={addressObj.details} onChange={handleDetailAddressChange} />
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
