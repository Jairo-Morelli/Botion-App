import { useState, useEffect } from "react";
import styles from "../Modules/Get_In_Touch.module.css";

function Get_In_Touch() {
    return (
        <>
            <div className="flex flex-col h-300">
                <div className={styles.background}>
                    <div className="flex flex-row justify-center">
                        {/* Submission box */}
                        <form name="sentMessage">
                            <div className="flex flex-col m p-4">
                                <h2 className="text-8xl text-[#5b3125] self-start"> Get In Touch</h2>
                                <p className="text-[#5b3125] self-start mb-4">Please fill out the form below to send us an email and we will get back to you as soon as possible</p>
                                <div className="flex flex-row mb-4 ">
                                    <input type="text" placeholder="Name" className="w-200 max-w-md px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                         text-2xl bg-white "/>
                                    <input type="text" placeholder="Email" className="w-200 max-w-md px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                         text-2xl  bg-white"/>
                                </div>
                                <div className="flex flex-row">
                                    <input type="text" placeholder="Message" className=" w-full h-70 px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                         text-2xl  bg-white self-stretch"/>
                                </div>
                                <button>button</button>
                            </div>
                        </form>
                        {/* Contact information text */}
                        <div className="flex flex-col p-4 ">
                            <h1 className="text-8xl text-[#5b3125]">Contact Information</h1>
                            <h3 className="self-start text-[#5b3125]"> Address</h3>
                            <p className="self-start text-[#5b3125]"> 100 Queens Park, Toronto, ON M5S 2C6 </p>
                            <h3 className="self-start text-[#5b3125]"> Phone Number</h3>
                            <p className="self-start text-[#5b3125]"> 416-000-0000 </p>
                            <h3 className="self-start text-[#5b3125]"> Email </h3>
                            <p className="self-start text-[#5b3125]"> botion@company.com</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Get_In_Touch