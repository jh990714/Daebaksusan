import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode'; // 가정한 import 문입니다.
import './DaumPost.css';

interface AddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  sido: string;
  sigungu: string;
  zonecode: string; // 우편번호
}

interface AddressObj {
    areaAddress: string;
    townAddress: string;
    zip: string; // zip 속성 추가
  }
  

interface DaumPostProps {
  setAddressObj: (obj: AddressObj) => void;
  postcodeScriptUrl: string;
}

export const DaumPost: React.FC<DaumPostProps> = ({ setAddressObj, postcodeScriptUrl }) => {
  const openPostcodePopup = useDaumPostcodePopup(postcodeScriptUrl);

  const onCompletePostcode = (data: AddressData) => {
    const { address, addressType, bname, buildingName, sido, sigungu, zonecode } = data;
    let extraAddress = ''; // 추가 주소
    let localAddress = `${sido} ${sigungu}`; // 지역 주소 (시, 도 + 시, 군, 구)

    if (addressType === 'R') { // 도로명 주소일 경우
      extraAddress += bname ? bname : '';
      extraAddress += buildingName ? (extraAddress ? `, ${buildingName}` : buildingName) : '';
      const fullAddress = address.replace(localAddress, '') + (extraAddress ? ` (${extraAddress})` : '');

      setAddressObj({
        areaAddress: localAddress,
        townAddress: fullAddress,
        zip: zonecode // 우편번호 추가
      });
    }
    // 추가적인 처리가 필요한 경우 여기에 로직 추가
  };

  const handleOpenPostcodePopup = () => {
    openPostcodePopup({ onComplete: onCompletePostcode });
  };

  return <div className='findAdress' onClick={handleOpenPostcodePopup}>주소 찾기</div>;
};

export default DaumPost;
