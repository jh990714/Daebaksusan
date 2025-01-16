import axios from 'axios';
import AdModal from 'components/AdModal';
import React, { useEffect, useState } from 'react';
import { AdData } from 'types';

const AdList: React.FC = () => {
    // 현재 표시 중인 광고 ID를 추적
    const [currentAdId, setCurrentAdId] = useState<number | null>(null);
    const [adsData, setAdsData] = useState<AdData[]>([]);
    // 예시 데이터 (실제 데이터를 서버나 다른 방식으로 받아올 수 있음)
    // const adsData: AdData[] = [
    //     {
    //         id: 1,
    //         rinkUrl: '1',
    //         imageUrl: 'https://cdn.011st.com/11dims/resize/1440x1800/quality/75/11src/browsing/exhibition/2025/01/09/2025010916080927953__img.png',
    //     },
    //     {
    //         id: 2,
    //         rinkUrl: '2',
    //         imageUrl: 'https://dpaql9q5kn5i.cloudfront.net/carousel/42996a44-cbd4-48e4-b7f9-eaa9ca1ec19b',
    //     },
    //     // 추가 광고 데이터
    // ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = `${process.env.REACT_APP_API_URL}/ad`;
                const response = await axios.get<AdData[]>(url);
                console.log(response.data);
                setAdsData(response.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, [])

    // '오늘 하루 닫기'와 광고 순서를 관리
    useEffect(() => {
        if (adsData.length === 0) return;

        for (const ad of adsData) {
            const storedDate = localStorage.getItem(`VisitCookie_${ad.id}`);
            if (storedDate) {
                const savedTime = new Date(storedDate).getTime();
                const now = new Date().getTime();

                // 저장된 시간이 현재보다 과거라면 표시 대상
                if (savedTime > now) {
                    continue; // 저장된 시간이 아직 유효하면 건너뜀
                }
            }
            setCurrentAdId(ad.id); // 첫 번째 표시 가능한 광고를 설정
            break; // 첫 번째 광고만 표시
        }
    }, [adsData]);

    const handleClose = (adId: number) => {
        // 다음 광고로 이동
        const currentIndex = adsData.findIndex((ad) => ad.id === adId);
        const nextAd = adsData[currentIndex + 1];
        if (nextAd) {
            setCurrentAdId(nextAd.id);
        } else {
            setCurrentAdId(null); // 광고가 더 이상 없으면 모두 닫기
        }
    };

    return (
        <div>
            <div className="ad-list">
                {adsData.map((ad) =>
                    ad.id === currentAdId ? ( // 현재 광고만 표시
                        <AdModal
                            key={ad.id}
                            visible={true} // 현재 광고만 표시
                            onClose={() => handleClose(ad.id)} // 현재 광고 닫기 핸들러
                            closable={true}
                            data={ad} // Modal에 데이터 전달
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default AdList;
