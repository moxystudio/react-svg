import React from 'react';
import Svg from '@moxy/react-svg';

import styles from './index.module.css';

const twitterLogo = import(/* webpackChunkName: "svg-sprite" */ '../media/twitter.inline.svg');

const Home = () => (
    <div className={ styles.home }>
        <h1>react-svg</h1>
        <br />
        <p>This is a svg of the Twitter logo.</p>
        <Svg svg={ twitterLogo } className={ styles.svg } />
    </div>
);

export default Home;
