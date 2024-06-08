import React from 'react'
import { Input } from "../@/components/ui/input"
import { Button } from '../@/components/ui/button'

const Hero = () => {
    
    return (
        <div className='p-10 relative top-40 '>
            <div className='flex flex-col items-start justify-center gap-5'>
                <div>
                    <h1 className='text-5xl md:text-8xl font-bold md:max-w-3xl text-white '>
                        Find the best deals on used cars in the Gulf
                    </h1>
                </div>

                <div className='flex items-center justify-center gap-2'>
                    <Input type="text" placeholder="Search for your favourite cars" className='text-white placeholder:text-white/40 rounded-full text-xs md:text-sm p-4 md:p-6 w-60 md:w-96 ' />
                    <Button variant='outline' className=' text-xs rounded-full bg-white text-black hover:bg-transparent hover:text-white transition-colors duration-300 px-4 py-4 md:px-10 md:py-6'>Get Started</Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
