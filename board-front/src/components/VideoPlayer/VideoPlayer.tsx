import axios, { AxiosResponse } from 'axios';
import { RcmndProductComp } from 'components/product/RcmndProductComp';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Product } from 'types';

interface VideoPlayerProps {
    videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<Product[]> = await axios.get<Product[]>(`${process.env.REACT_APP_API_URL}/product/new`);
                console.log(response);
                setProducts(response.data.slice(6, 10));
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className=''>
            <div className="m-10 font-bold text-2xl">👀 대박수산 TV </div>
            <div className="rounded-lg grid grid-cols-10 gap-3 border-2 ">
                <div className='col-span-7'>
                    <ReactPlayer
                        style={{ borderRadius: '10px 0 0 10px', overflow: 'hidden' }}
                        loop={true}
                        url={videoUrl}    // 플레이어 url
                        width='100%'         // 플레이어 크기 (가로)
                        height='100%'        // 플레이어 크기 (세로)
                        playing={true}        // 자동 재생 on
                        muted={true}          // 자동 재생 on
                        controls={false}       // 플레이어 컨트롤 노출 여부
                        light={false}         // 플레이어 모드
                        pip={false}            // pip 모드 설정 여부
                    //onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                    />
                </div>
                <div className='col-span-3 grid grid-rows-3'>
                    {products.length > 0 && (
                        <div className='border-b-2 content-center'>
                            <RcmndProductComp product={products[0]} imgSize_w_per="45%" imgSize_h_px="120px" font_size='5px' border='50%' />
                        </div>
                    )}
                    {/* <div className='border' /> */}
                    {products.length > 1 && (
                        <div className='border-b-2 content-center'>
                            <RcmndProductComp product={products[1]} imgSize_w_per="45%"  imgSize_h_px="120px" font_size='5px' border='50%' />
                        </div>
                    )}
                    {products.length > 2 && (
                        <div className='content-center'>
                            <RcmndProductComp product={products[2]} imgSize_w_per="45%"  imgSize_h_px="120px" font_size='5px' border='50%' />
                        </div>
                    )}
                    
                </div>

            </div>
        </div>
    );
};
