import React from 'react';
import ScrollingContent from './ScrollingContent';
import SliderContainer from './SliderContainer';
import ImgSlider from './ImgSlider';
import Navbar from './Navbar';
import Footer from './Footer';
import Feedback from './Feedback';
import About from './About';
import Welcomepage from './Welcomepage';

import Service from './Service';
import Nammaspotad from './Nammaspotad';
import Translateicon from './Translateicon';
import CarMoving from './CarMoving';




const HomePage1 = () => {
  return (

    <div className='home-pages-main'>
     
<Navbar/>
<Welcomepage/>

 <ImgSlider/>
<Service/>
 <ScrollingContent/>
 <CarMoving/>
 <About/>
 <SliderContainer/>
 <Feedback/>
<Nammaspotad/>
<Translateicon/>
<Footer/>

      
    </div>
 
  );
};



export default HomePage1;
