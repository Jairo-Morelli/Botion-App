import { useState, useEffect } from "react";
import style from "../Modules/Features.module.css"

function About() {


    return (
        <>
            <div className="border-solid border border-white border-4 flex-col align-middle">
                <h2 className="text-white text-6xl" >Features</h2>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col align-middle items-center w-100">
                            <img className="w-50 h-50" src="/assets/books_sun_icon.svg" />
                            <p className="text-white text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at.</p>
                        </div>
                        <div className="flex flex-col align-middle items-center w-100">
                            <img className="w-50 h-50" src="/assets/eye_icon.svg" />
                            <p className="text-white text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at.</p>
                        </div>
                        <div className="flex flex-col align-middle items-center w-100">
                            <img className="w-50 h-50" src="/assets/shield_checkmark.svg" />
                            <p className="text-white text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default About