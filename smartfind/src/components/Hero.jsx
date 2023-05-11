import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import React from 'react';
const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">FREE</span> TO USE{" "}
            <span className="text-white">JUST</span> SIGN UP ;) 
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
  <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] text-gradient">
    SMART FIND <br className="sm:block hidden" />{" "}
    <span className="text-gradient">Generation</span>{" "}
  </h1>
  <div className="ss:flex hidden md:mr-4 mr-0">
    <GetStarted />
  </div>
</div>

<h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full text-gradient">
  Shareable and Location-Aware
</h1>

<p className={`${styles.paragraph} max-w-[470px] mt-5`} style={{color: 'white'}}>
  With my smart card location, I can easily share my location with others and find their locations through its real-time tracking features. It's a convenient and efficient way to stay connected with my friends and family and make plans more easily.
</p>

<p className={`${styles.paragraph} max-w-[470px] mt-5`} style={{color: 'white'}}>
  Our team of experts uses advanced technology to provide accurate and reliable location data. We work hard to ensure that our system is secure and respects your privacy at all times.
</p>

      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
     <img src={robot} alt="billing" className="w-96 h-96 relative z-[5]" />


        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;  