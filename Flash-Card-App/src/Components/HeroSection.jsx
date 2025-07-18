import React from 'react';
import styles from "./../Modules/HeroSection.module.css"

function HeroSection() {
    return (
        <>
            <div className='flex items-center flex-col'>
                <div className={styles.landingPageTitle}>
                    <h1>Botion App</h1>
                </div>
                <div className={styles.landingPageText}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia.</p>
                </div>
            </div>
        </>
    )
}

export default HeroSection;