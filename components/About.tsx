import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <div className='h-screen w-full text-white bg-black/50 flex items-center justify-center'>
            <div className='p-20 flex items-center justify-center flex-col md:flex-row gap-10'>
                <p className='text-white font-playfairDisplay text-3xl md:text-7xl max-w-3xl italic'>
                    Sayaara seamlessly consolidates listings from major sites in the GCC, ensuring that your dream car is just a few clicks away.
                </p>
                <div className='rounded-t-full p-2 border border-white '>
                    <Image src='/about-img.jpg' alt='About' width={500} height={500} className='rounded-t-full ' />
                </div>

            </div>
        </div>
    )
}

export default About
