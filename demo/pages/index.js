import React from 'react';
import Svg from '@moxy/react-svg';

import styles from './index.module.css';

const Home = () => {
    console.log(Svg);

    const svg = `
        <svg height="100" width="100"> 
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3"/>
        </svg>
    `;

    return (
        <div>
            <h1>react-svg</h1>
            <Svg svg={ svg } className={ styles.svg } />
        </div>
    );
};

export default Home;
