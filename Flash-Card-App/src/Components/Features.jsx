import React, { useState } from "react"
import styles from "./../Modules/HeroSection.module.css"

function Features({props}) {
    return (
        <>
            <div className={styles.sectiontitle}>
                <div className="@container">
                    { /* Building my webpages with boxes, using flex/grid.*/}
                    <div className="col-md-10 col-md-offset-1 section-title">
                        <h1 className={styles.featuretitle}>Features</h1>
                        <div className="row">
                            {
                                 props.map((currentBook) => {
                                     return <li>{currentBook.title}</li>
                                 })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features