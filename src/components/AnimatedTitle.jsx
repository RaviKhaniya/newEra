import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


const AnimatedTitle = ({ title, containerClass }) => {
    const containerReff = useRef(null)
    useEffect(()=>{
        const ctx = gsap.context(() => {
             const titleAnimation = gsap.timeline({
                scrollTrigger:{
                    trigger:containerReff.current,
                    start: '100 bottom',
                    end:'center bottom',
                    toggleActions:'play none none reverse',

                }
             });
             titleAnimation.to('.animated-word', {
                 opacity:1,
                 transform:'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
                 ease:'power2.inOut',
                 stagger:0.02,
             })
             
        }, containerReff)
        return () => ctx.revert()
    },[])
  return (
    <div  ref={containerReff} className={`animated-class ${containerClass}`}>
      <div className='mt-5 text-center text-4xl uppercase leading-[1] md:text-[6rem]'>
        {title.split('<br/>').map((line, index) => (
          <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
            {line.split(' ').map((word, i) => (
              <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }}/>
  
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;
