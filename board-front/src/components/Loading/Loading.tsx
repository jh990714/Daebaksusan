import React from 'react'
import styles from './Loding.module.css'

export const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingCircle}></div>
        </div>
    )
}
