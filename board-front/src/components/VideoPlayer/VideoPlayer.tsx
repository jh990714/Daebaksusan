import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { RcmndProductComp } from 'components/product/RcmndProductComp';
import { Product, VideoItem } from 'types';
import { Link } from 'react-router-dom';

export const VideoPlayer = () => {
    const [videoItem, setVideoItem] = useState<VideoItem>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/getVideoPlayer`);
                console.log(response.data)
                setVideoItem(response.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    const currentUrl = window.location.origin;

    return (
        <div className="">
            <div className="m-5 font-bold text-2xl">👀 대박수산 TV</div>
            <div className="text-sm">(추후 밀키트 영상으로 대체 가능)</div>
            <div className="rounded-lg grid grid-cols-10 gap-3 border-2">
                <div className="col-span-10 xl:col-span-7">
                    {videoItem && (
                        videoItem.link && videoItem.link.startsWith(currentUrl) ? (
                            <Link to={videoItem.link.replace(currentUrl, '')}>
                                <ReactPlayer
                                    style={{ borderRadius: '10px 0 0 10px', overflow: 'hidden' }}
                                    loop={true}
                                    url={videoItem.videoUrl}
                                    width="100%"
                                    height="100%"
                                    playing={true}
                                    muted={true}
                                    controls={false}
                                    light={false}
                                    pip={false}
                                />
                            </Link>
                        ) : (
                            <a href={videoItem.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <ReactPlayer
                                    style={{ borderRadius: '10px 0 0 10px', overflow: 'hidden' }}
                                    loop={true}
                                    url={videoItem.videoUrl}
                                    width="100%"
                                    height="100%"
                                    playing={true}
                                    muted={true}
                                    controls={false}
                                    light={false}
                                    pip={false}
                                />
                            </a>
                        )
                    )}
                </div>

                <div className="hidden xl:grid col-span-3 grid grid-rows-3">
                    {videoItem &&
                        videoItem.products.map((product, index, array) => (
                            <div
                                key={index}
                                className={`${index === array.length - 1 ? 'content-center' : 'border-b-2 content-center'}`}
                            >
                                <RcmndProductComp
                                    product={product}
                                    imgSize_w_per={33}
                                    fontSize={'16'}
                                    radius={50}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
