import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);
    const totalVdos = 4;
    const nextVdoReff = useRef(null);
    const handleLoadedVdo = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    useGSAP(() =>{
        if(hasClicked){
           gsap.set('#next-video',{visibility:'visible'})
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 0.8,
                ease:'power1.inOut',
                onStart:() => nextVdoReff.current.play(),
            })

            gsap.from("#current-videp", {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1,
                ease: 'power1.inOut',

            })
        }


    }, {dependencies:[currentIndex], revertOnUpdate: true});

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%'
        })
        gsap.from('#video-frame',{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius:'0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger:{
                trigger:'#video-frame',
                start:'center center',
                end:'bottom center',
                scrub: true,
            }
        })
    })

    const nextIndex = (currentIndex % totalVdos) + 1;

    const getvdoSrc = (index) => `videos/hero-${index}.mp4`;
    const handleMinivdo = () => {
        setHasClicked(true);
        setCurrentIndex(nextIndex);

    }
    useEffect(() =>{
        if(loadedVideos === totalVdos - 1){
            setIsLoading(false);
        }
    })
    return (
        <div className='relative w-screen overflow-x-hidden h-dvh'>
           {isLoading && (
            <div className='absolute flex-center z-[100] h-dvh w-screen overflow-hidden bg-violet-50 '>
                <div className='three-body'>
                    <div className='three-body__dot'></div>
                    <div className='three-body__dot'></div>
                    <div className='three-body__dot'></div>

                </div>
            </div>
           )}
            <div id='video-frame' className='h-dvh w-screen overflow-hidden relative z-10 rounded-lg bg-blue-75' >
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMinivdo} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video src={getvdoSrc(nextIndex)} ref={nextVdoReff} loop id='current-video' className='size-64 origin-center scale-150 object-cover object-center' muted onLoadedData={handleLoadedVdo}></video>
                        </div>

                    </div>
                    <video src={getvdoSrc(currentIndex)} loop muted id='next-video' autoPlay className='absolute-center invisible absolute z-20 size-64 object-cover object-center' onLoadedData={handleLoadedVdo} ref={nextVdoReff}></video>
                    <video src={getvdoSrc(currentIndex === totalVdos - 1 ? 1 : currentIndex)}  loop muted className='left-0 top-0 object-cover object-center ' onLoadedData={handleLoadedVdo}></video>
                    <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                        g<b>a</b>ming
                        </h1>
                        <div className='absolute left-0 top-0 z-40 size-full'>
                            <div className='mt-24 px-5 sm:px-10'></div>
                            <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame Layer <br/> Unleash the Play Economy</p>

                            <Button id='watch trailer' title ='Watch Trailer' leftIcon={<TiLocationArrow/>} containerClass= "!bg-yellow-300 flex-center "/>

                        </div>
                </div>

            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>
                        g<b>a</b>ming
                        </h1>
        </div>
    )
}

export default Hero
