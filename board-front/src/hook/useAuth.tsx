import sendRequestWithToken from 'apis/sendRequestWithToken';
import { useEffect, useState } from 'react';
import { useAuthContext } from './AuthProvider';

const useAuth = () => {
  const [isTokenCheck, setIsTokenCheck] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const url = '/check';
        const post = 'GET';
        const data = null;
  
        const response = await sendRequestWithToken(url, post, data);
        console.log(response);
  
        // HTTP 상태 코드가 2xx인 경우에만 성공적인 응답으로 처리
        if (response.status >= 200 && response.status < 300) {
          setIsTokenCheck(true);
        } else {
          setIsTokenCheck(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsTokenCheck(false);
      }
    };
  
    checkLoginStatus();
  }, []);
  
  

  return isTokenCheck;
};

export default useAuth;
