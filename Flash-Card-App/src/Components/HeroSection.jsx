import React from 'react';
import styles from "./../Modules/HeroSection.module.css"

function HeroSection() {
    return (
        <>
            <div className={styles.background}>
            </div>
            <div className={styles.landingPageTitle}>
                    <h1>Botion App</h1>
                </div>
                <div className={styles.landingPageText}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia.</p>
                </div>
        </>
    )
}

export default HeroSection;