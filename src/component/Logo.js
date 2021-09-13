import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import frog from './frog.png';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
           <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingtop: '2px'}} src={frog} alt='Logo'/> 
                </div>
            </Tilt>
        </div>
    );

}

export default Logo
