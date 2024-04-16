import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const ReviewAverageComp = () => {
    const renderStars = (score: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < score) {
                // 꽉 찬 별
                stars.push(<AiFillStar key={i} className="text-yellow-500" />);
            } else {
                // 빈 별
                stars.push(<AiOutlineStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    // 임시 데이터: 각 점수별 리뷰 수
    const reviewCounts: { [key: string]: number } = {
        '5': 100,
        '4': 20,
        '3': 5,
        '2': 3,
        '1': 0
    };

    const totalReviews = Object.values(reviewCounts).reduce((acc, count) => acc + count, 0);
    const averageScore = Object.entries(reviewCounts).reduce((acc, [score, count]) => acc + parseInt(score) * count, 0) / totalReviews;

    return (
        <div className='flex w-3/4 m-auto py-12 justify-around'>
            <div className="flex flex-col justify-between text-center items-center mr-16">
                <h4 className="font-semibold text-xl">전체 평점</h4>

                <div className="text-6xl font-bold">{averageScore.toFixed(1)}</div>
                <div className="flex justify-center items-center">
                    {renderStars(Math.floor(averageScore))}
                </div>

            </div>
            <div className="border-r border-gray-300 pr-4">

            </div>

            <div>
                <ul className="p-0 m-0">
                    {[5, 4, 3, 2, 1].map(score => (
                        <li key={score} className="flex items-center">
                            <span className="flex items-center text-l font-semibold">{score}점 &nbsp; {renderStars(score)}</span>
                            <div className="bg-gray-200 h-2 w-64 ml-3 rounded-full overflow-hidden">
                                <div className={`bg-blue-700 h-full`} style={{ width: `${(reviewCounts[score] / totalReviews) * 100}%` }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{reviewCounts[score]}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
