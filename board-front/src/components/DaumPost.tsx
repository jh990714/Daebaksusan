import React, { useState } from 'react'; // useState 추가
import { useDaumPostcodePopup } from 'react-daum-postcode'; // 가정한 import 문입니다.
import './DaumPost.css';
import { AddressData, AddressObj, InputErrors } from 'types';

interface DaumPostProps {
  setAddressObj: (obj: AddressObj) => void;
  postcodeScriptUrl: string;

  inputErrors: InputErrors;
  setInputErrors: (obj: InputErrors) => void;
}

export const DaumPost: React.FC<DaumPostProps> = ({ setAddressObj, postcodeScriptUrl, inputErrors, setInputErrors}) => {
  const [addressObj, setAddressObjState] = useState<AddressObj>({areaAddress: '', townAddress: '', zip: '', details: ''}); // 상태 추가
  const openPostcodePopup = useDaumPostcodePopup(postcodeScriptUrl);

  const onCompletePostcode = (data: AddressData) => {
    const { address, addressType, bname, buildingName, sido, sigungu, zonecode } = data;
    let extraAddress = '';
    let localAddress = `${sido} ${sigungu}`;

    if (addressType === 'R') {
      extraAddress += bname ? bname : '';
      extraAddress += buildingName ? (extraAddress ? `, ${buildingName}` : buildingName) : '';
      const fullAddress = address.replace(localAddress, '') + (extraAddress ? ` (${extraAddress})` : '');

      const newAddressObj = {
        areaAddress: localAddress,
        townAddress: fullAddress,
        zip: zonecode,
        details: addressObj.details
      };
      setInputErrors({
        ...inputErrors,
        ['areaAddress']: false,
        ['townAddress']: false,
        ['zip']: false,
      });

      setAddressObj(newAddressObj); // 부모 컴포넌트에 주소 객체 전달
      setAddressObjState(newAddressObj); // 내부 상태 업데이트
    }
  };

  // 상세 주소 업데이트 함수 추가
  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAddressObj = {
      ...addressObj,
      details: e.target.value
    };
    setAddressObjState(updatedAddressObj); // 내부 상태 업데이트
    setAddressObj(updatedAddressObj); // 필요한 경우 부모 컴포넌트에도 업데이트 반영
  };

  const handleOpenPostcodePopup = () => {
    openPostcodePopup({ onComplete: onCompletePostcode });
  };

  return (
    <>
      <div className='findAddress' onClick={handleOpenPostcodePopup}>
        주소 찾기
      </div>

      <input
        type='text'
        className={`address ${inputErrors.zip ? 'error' : ''}`}
        placeholder='우편 번호'
        title='우편 번호'
        id='zipCode'
        value={addressObj.zip}
        readOnly
      />
      <input
        type='text'
        className={`address ${inputErrors.areaAddress ? 'error' : ''}`}
        placeholder='주소'
        title='주소'
        id='fullAddress'
        value={`${addressObj.areaAddress}${addressObj.townAddress}`}
        readOnly
      />
      <input
        type='text'
        className='address'
        placeholder='상세 주소'
        title='상세 주소'
        id='detailAddress'
        value={addressObj.details}
        onChange={handleDetailAddressChange} // onChange 이벤트 핸들러 추가
      />
    </>
  );
};

export default DaumPost;
