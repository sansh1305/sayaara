import React from 'react'
import { Input } from "./ui/input"
import { Button } from './ui/button'

const Hero = () => {

    return (
        <div className='p-10 h-[600px] md:h-[600px] text-slate-200'>
            <div className='flex flex-col items-start md:items-start justify-end h-full'>
                <div className='flex items-start md:items-start justify-center flex-col gap-2'>
                    {/* <p className='italic capitalize text-sm md:text-2xl text-gray-300 text-left md:text-center font-light'>
                        Tired of endlessly scouring multiple sites for the perfect car?
                    </p> */}
                    <h1 className='capitalize font-bold text-lightGray  text-6xl md:text-8xl md:text-left md:max-w-5xl'>
                        Find the
                        {" "}
                        <span className='text-gold '>
                            Best Deals
                        </span>
                        {" "}

                        on used cars in the 
                        {" "}
                        <span className=' '>
                            Gulf
                        </span>
                    </h1>
                </div>

                {/* <section className="example example--2 relative top-28 md:top-20 flex items-center justify-center w-full">
                    <span className="scroll-icon">
                        <span className="scroll-icon__dot"></span>
                    </span>
                </section> */}
            </div>
        </div>
    )
}

export default Hero
