import React, { useState } from 'react'
import { QnA } from 'types';
import styles from './QnAItemComp.module.css';
import talkIcon from '../../assets/talkIcon.png';

interface QnAItemCompProps {
    qnaList: QnA[];
}

export const QnAItemComp: React.FC<QnAItemCompProps> = ({ qnaList }) => {
    // 각 질문에 대해 답변 보기/숨기기 상태를 관리
    const [showAnswers, setShowAnswers] = useState<boolean[]>(new Array(qnaList.length).fill(false));

    // 답변 보기/숨기기 토글 함수
    const toggleAnswers = (index: number) => {
        const newShowAnswers = [...showAnswers];
        newShowAnswers[index] = !newShowAnswers[index];
        setShowAnswers(newShowAnswers);
    };

    return (
        <ul className={styles.qnaList}>
            {qnaList.map((qna, index) => (
                <li key={qna.question.questionId}>
                    {qna.question &&
                        <div className={styles.question}>
                            <div className={styles.userInfo}>
                                <span><span className={styles.questionLable}>질문</span> {qna.question.name}</span>
                                <span className={styles.date}>{new Date(qna.question.createdAt).toLocaleString('ko-KR')}</span>
                            </div>

                            <div className={styles.questionContent}>
                                {qna.question.question.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }

                    {/* 답변 보기/숨기기 버튼 (답변이 있을 경우에만 표시) */}
                    {/* {qna.answers.length > 0 && (
                        <div className="flex justify-center">
                            <button
                                onClick={() => toggleAnswers(index)}
                                className="w-full sm:w-auto px-4 py-2 mb-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                            >
                                {showAnswers[index] ? `답변 숨기기 (${qna.answers.length})` : `답변 보기 (${qna.answers.length})`}
                            </button>
                        </div>
                    )} */}

                    {qna.answers.length > 0 && (
                        <div className="flex justify-end"> {/* Flex 컨테이너로 우측 정렬 */}
                            <button
                                onClick={() => toggleAnswers(index)}
                                className="flex items-center justify-center"
                            >
                                <img
                                    src={talkIcon}
                                    alt="Talk Icon"
                                    className="w-10 h-10"
                                />
                            </button>
                        </div>
                    )}

                    {/* 답변 내용 */}
                    {showAnswers[index] && qna.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className={styles.answerContanier}>
                            <div className={styles.answerArrow}>⤷</div>
                            <div className={styles.answer}>
                                <div className={styles.userInfo}>
                                    <span><span className={styles.answerLable}>답변</span> 대박수산</span>
                                    <span className={styles.date}>{new Date(answer.createdAt).toLocaleString('ko-KR')}</span>
                                </div>
                                <div className={styles.answerContent}>
                                    {answer.content.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </li>
            ))}
        </ul>
    );
};
