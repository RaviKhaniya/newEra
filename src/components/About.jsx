import { useGSAP } from '@gsap/react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    });
  });

  return (
    <div className='min-h-screen w-screen'>
      <div className='relative mb-8 mt-36 flex-col flex items-center gap-5'>
        <h1 className='font-general text-sm uppercase md:text-[10px]'>
          Welcome to The Game universe
        </h1>
        <AnimatedTitle title="Disc<b>o</b>ver the  world`s  l<b>a</b>rgest shared adventure" containerClass="mt-5 !text-black text-center"/>
        
        <div className='about-subtext'>
          <p>The game of games begins- Your life is now an Epic</p>
          <p>RK Arena unites Every player from countless games and platforms</p>
        </div>
      </div>
      <div id='clip' className='h-dvh w-screen'>
        <div className='mask-clip-path about-image'>
          <img
            src='img/about.webp'
            alt='About'
            className='absolute left-0 top-0 w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default About;
