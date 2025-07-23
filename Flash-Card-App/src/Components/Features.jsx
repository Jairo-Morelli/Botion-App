import React, { useState } from "react"
import styles from "./../Modules/HeroSection.module.css"

function Features({ props }) {
    return (
        <>
            <div className={styles.sectiontitle}>
                <div className="@container">
                    { /* Building my webpages with boxes, using flex/grid.*/}
                    <div className="">
                        <h1 className={styles.featuretitle}>Features</h1>
                        <div className="flex flex-row justify-between">
                            {

                                props && Array.isArray(props) && props.map((currentBook, index) => {
                                    return(
                                    <li key={index} className="md:p-4 md:m-0.5">{currentBook.title}
                                    {currentBook.icon && (
                                        <>
                                        <img src="../../public/Book.svg"></img>
                                        </>
                                    )}
                                    </li>
                                    )
                                })
                            }
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features