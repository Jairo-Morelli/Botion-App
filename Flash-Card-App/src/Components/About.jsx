import { useState, useEffect } from "react";
import styles from "../Modules/About.module.css"

function About() {
    return (
        <>
          <h2 className="text-white text-5xl flex place-self-center">About us</h2>
            <div className={styles.AboutContainer}>
                <img className="md:w-200 h-150 p-2" src="/assets/studyingstudents.jpeg" />
                <div className="flex flex-row">
                    <div className={styles.AboutParagraph}>
                        <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        <div className="">
                            <p className="text-2xl color-white"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        </div>
                    </div>
                    <div className={styles.AboutParagraph}>
                        <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        <div>
                            <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        </div>
                    </div>
                    <div className={styles.AboutParagraph}>
                        <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        <div>
                        <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        </div>
                    </div>
                    <div className={styles.AboutParagraph}>
                        <p className="text-2xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        <div className={styles.AboutParagraph}>
                            <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default About 