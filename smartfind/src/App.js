import React, { useState } from 'react';
import styles from './style';

import {
  Business, Button,
  CardDeal, CTA, FeedbackCard, Form, Hero, Nav, People, Login, Signup, SmartCard, Stats, Testimonials, Billing, Footer,

} from './components';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className="bg-gray-900 w-full overflow-hidden">
      <div className={`px-4 flex justify-center ${showLogin ? 'hidden' : ''}`}>
        <div className="max-w-md">
          <Nav handleShowLogin={handleShowLogin} className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10" />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart} ${showLogin ? 'hidden' : ''}`}>
        <div className={styles.boxWidth}>
          <Hero/>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart} ${showLogin ? 'hidden' : ''}`}>
        <div className={styles.boxWidth}>
          <Stats/>     
          <Business/>
          <Billing/>
          <CardDeal/>
          <Testimonials/>
          <People/>
          <FeedbackCard/>
          <CTA/> 
          <Footer/>
         
        </div>
      </div>
      <div className='container-with-scrollbar'>
  {showLogin && <Login />}
</div>

    </div>
  );
};

export default App;