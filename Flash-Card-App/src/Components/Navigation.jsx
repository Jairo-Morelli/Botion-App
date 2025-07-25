import React from "react";


function Navigation() {
    return (
        <>
            <div className=" border-b border-white w-full">
                <nav id="menu" className="navbar navbar-default navbar-fixed-top ">
                    <div className="flex justify-center items-center ">
                    <img className="inline-block"src="/assets/library_Icon.svg" />
                        <div className="navbar-header inline-block w-[300px]">
                            <h2 className="text-4xl text-white font-[Montserrat] uppercase p-[5px] mr-[600px]">botion</h2>
                        </div>
                        <button className="inline slide-under-anim font-[Montserrat] text-white p-[20px] text-2xl">Home</button>
                        <button className="inline slide-under-anim font-[Montserrat] text-white p-[20px] text-2xl">About</button>
                        <button className="inline slide-under-anim font-[Montserrat] text-white p-[20px] text-2xl">Contact</button>
                    </div>
                </nav>
            </div>
        </>
    )
}



export default Navigation