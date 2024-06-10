import React from 'react'
import { Input } from "../@/components/ui/input"
import { Button } from '../@/components/ui/button'

const Hero = () => {

    return (
        <div className='p-10 relative top-40 h-screen'>
            <div className='flex flex-col items-start md:items-center justify-center gap-10'>
                <div className='flex items-start md:items-center  justify-center flex-col gap-2'>
                    <p className='italic font-playfairDisplay text-sm md:text-2xl text-white text-left md:text-center'>
                        Tired of endlessly scouring multiple sites for the perfect car?
                    </p>
                    <h1 className=' text-4xl md:text-8xl md:text-center font-bold md:max-w-5xl text-white '>
                        Find the best deals on used cars in the Gulf
                    </h1>
                </div>

                <div className='flex items-center justify-center gap-2 md:max-w-3xl'>
                    <Input type="text" placeholder="Search for your favourite cars" className='text-white placeholder:text-white/40 rounded-full text-xs md:text-sm p-4 md:p-6 w-60 md:w-screen ' />
                    <Button variant='outline' className=' text-xs rounded-full bg-white text-black hover:bg-transparent hover:text-white transition-colors duration-300 px-4 py-4 md:px-10 md:py-6'>Get Started</Button>
                </div>

                <section className="example example--2 relative top-28 md:top-20 flex items-center justify-center w-full">
                    <span className="scroll-icon">
                        <span className="scroll-icon__dot"></span>
                    </span>
                </section>
            </div>
        </div>
    )
}

export default Hero
