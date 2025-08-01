import { useState, useEffect } from "react";
import style from "../Modules/Team.module.css";


function Team() {

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <h1 className="text-8xl text-white">Meet The Team</h1>
                    <p className="text-5xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
                </div>
                <div className="flex flex-row justify-center">
                    <img className="p-2.5 size-120" src="/assets/developerIcon.svg"/>
                    <img className="p-2.5 size-120" src="/assets/developerIcon.svg"/>
                    <img className="p-2.5 size-120" src="/assets/developerIcon.svg"/>
                    <img className="p-2.5 size-120" src="/assets/developerIcon.svg"/>
                </div>
            </div>
        </>
    )
}

export default Team