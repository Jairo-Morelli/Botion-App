import { useState, useEffect } from "react";
import styles from "../Modules/Clients.module.css"



function Clients() {
    return (
        <>
            <div className="flex-col justify-between">
                <h1 className="text-7xl text-white"> What our users say </h1>
                <div className="flex-col">
                    <div className="flex flex-row justify-center flex-wrap">
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-200">
                            <img className="self-start"src="/assets/profile_circle.svg" />
                            <div className="flex flex-col">
                                <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim porttitor purus auctor tempor. Etiam interdum aliquam lacus, sit amet imperdiet libero cursus ut. Vivamus congue dolor tortor, nec gravida.</p>
                                <p className="text-5xl text-white">Jon Doe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Clients