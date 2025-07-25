import React from 'react';
import styles from "./../Modules/HeroSection.module.css"

function HeroSection({props}) {
    return (
        <>
            <div className={styles.imageContainer}>
                <div>
                    <div className={styles.landingPageTitle}>
                        <h1>Botion App</h1>
                    </div>
                    <div className={styles.landingPageText}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia.</p>
                        <button onClick={props}> Try Botion </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection;