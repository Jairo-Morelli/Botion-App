import React, { useState } from "react"
import styles from "./../Modules/HeroSection.module.css"

function Features({ props }) {
    return (
        <>
            <div className={styles.sectiontitle}>
                <div className="@container">
                    { /* Building my webpages with boxes, using flex/grid.*/}
                    <div className="">
                        <h1 className={styles.featuretitle}>Books</h1>
                        <input type="text" placeholder="Search for book" className="w-full max-w-md px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                         text-2xl"/>
                        <div className="flex flex-row justify-between">
                            {
                                props && Array.isArray(props) && props.map((currentBook, index) => {
                                    return (
                                        <li style={{listStyleType: "none"}} key={index} className="md:p-1 md:m-0.5 ">{
                                            currentBook.icon &&
                                            (
                                                <>
                                                    <div className="flex flex-col justify-center md:max-w-m max-h-sm">
                                                        <img className="size-49" src={`/assets/${currentBook.icon}.svg`} />
                                                        <p className="text-base">{currentBook.title}</p>
                                                    </div>
                                                </>
                                            )
                                        }
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