import React, { useEffect, useState } from "react";
import axios from "axios";
import AdModal from "components/AdModal";
import { AdData } from "types";

const AdList: React.FC = () => {
    const [adsData, setAdsData] = useState<AdData[]>([]);
    const [filteredAds, setFilteredAds] = useState<AdData[]>([]); // 필터링된 광고 상태
    const [currentAdId, setCurrentAdId] = useState<number | null>(null);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<AdData[]>(`${process.env.REACT_APP_API_URL}/ad`);
                setAdsData(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchData();
    }, []);

    // "오늘 하루 안보기"가 활성화되지 않은 광고 필터링
    useEffect(() => {
        const now = Date.now();
        const filtered = adsData.filter((ad) => {
            const storedDate = localStorage.getItem(`VisitCookie_${ad.id}`);
            return !storedDate || new Date(storedDate).getTime() <= now; // 유효한 쿠키가 없는 경우 포함
        });

        setFilteredAds(filtered); // 필터링된 광고 업데이트
        setCurrentAdId(filtered.length > 0 ? filtered[0].id : null); // 첫 번째 광고 설정
    }, [adsData]);

    // 광고 닫기 핸들러
    const handleClose = (adId: number | null) => {
        if (adId === null) {
            setCurrentAdId(null); // 모든 광고 닫기
        } else {
            const currentIndex = filteredAds.findIndex((ad) => ad.id === adId);
            const nextAd = filteredAds[currentIndex + 1];
            setCurrentAdId(nextAd ? nextAd.id : null); // 다음 광고 또는 닫기
        }
    };

    return (
        <div>
            <div className="ad-list">
                {filteredAds.map((ad) =>
                    ad.id === currentAdId ? (
                        <AdModal
                            key={ad.id}
                            visible={true}
                            onClose={() => handleClose(ad.id)}
                            closable={true}
                            data={ad}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default AdList;
