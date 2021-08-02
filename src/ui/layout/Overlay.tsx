import React from 'react';
import img from '../../assets/fonts/images/white_Logo.webp';

const Overlay:React.FC =()=> {
    // simple overlay hide the loading of json
    return (
        <div className='overlay'>
            <img src={img} alt="" />
            <span className='item1'>I</span>
            <span className='item2'>N</span>
            <span className='item3'>Q</span>
            <span className='item4'>U</span>
            <span className='item5'>I</span>
            <span className='item6'>R</span>
            <span className='item7'>E</span>
            <span className='item8'>D</span>
        </div>
    );
};

export default Overlay;