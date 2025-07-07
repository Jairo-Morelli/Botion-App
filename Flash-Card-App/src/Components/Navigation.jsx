import React from "react";

function Navigation({props}) 
{
    return(
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div>
            <ul className="text-white flex justify-evenly list-none p-o m-0 w-full text-[1.5rem]">
                <li className="inline slide-under-anim font-[Montserrat]">Home</li>
                <li className="inline slide-under-anim font-[Montserrat]">About</li>
                <li className="inline slide-under-anim font-[Montserrat]">Contact</li>
            </ul>
            </div>
        </nav>
    )
}



export default Navigation