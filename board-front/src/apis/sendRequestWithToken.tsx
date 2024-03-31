import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

async function refreshAccessToken(refreshToken: string): Promise<string> {
    try {
        const response = await instance.post(
            '/refreshToken',
            { refreshToken },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        localStorage.setItem('accessToken', response.data.accessToken);
        // 새로운 액세스 토큰이 response.data에 있는지 확인하고 반환
        return response.data.accessToken;
    } catch (error) {
        throw new Error('새로운 액세스 토큰 요청 실패');
    }
}

async function sendRequestWithToken(url: string, method: string, data: any, setIsLoggedIn: any) {
    try {
        const token = localStorage.getItem('accessToken');

        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const response = await instance(config);
        setIsLoggedIn(true)
        return response.data;


    } catch (error: unknown) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const newAccessToken = await refreshAccessToken(refreshToken);

                // 새로운 액세스 토큰을 localStorage에 저장한 후에 요청을 다시 보냄
                const newTokenConfig: AxiosRequestConfig = {
                    method,
                    url,
                    data,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${newAccessToken}`
                    }
                };


                const newTokenResponse = await instance(newTokenConfig);

                console.log("새로운 액세스 토큰 생성");
                setIsLoggedIn(true)
                return newTokenResponse.data;
            } catch (refreshError) {
                setIsLoggedIn(false)
                console.error('새로운 액세스 토큰 요청 실패:', refreshError);
            }
        } else {
            setIsLoggedIn(false)
            console.error('Refresh Token이 없습니다.');
            throw new Error('에러!');
        }

    }
}

export default sendRequestWithToken;
