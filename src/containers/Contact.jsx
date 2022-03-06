import React from 'react'
import MaindHOC from '../components/MainHOC';

const Contact = () => {
    return (
        <div>
             <iframe
                id="js-campsite-iframe"
                src="https://campsite.bio/myhealthconnect?iframe=1"
                frameborder="0"
                scrolling="no"
                width="100%"
                height="500" 
                title='contact-info'          
            ></iframe>
        </div>
    )
}

export default MaindHOC(Contact)
