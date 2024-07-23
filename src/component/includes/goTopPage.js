import React, { useState, useEffect } from 'react';

const GoTopPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [posIcon, setoPosIcon] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100); // Show button after 100px scroll

            
            var element = document.getElementsByClassName("footer-container")[0];
            var elementTop;

            if (element) {
                elementTop = element.getBoundingClientRect().top;
            } else {
                console.log("Element with class 'footer-container' not found.");
            }
            
            const isAtBottom = elementTop <= window.innerHeight;

            if (isAtBottom) {
                setoPosIcon(true);
            } else {
                setoPosIcon(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="gotoTop" onClick={scrollToTop} style={{ display: isVisible ? 'block' : 'none', transition: 'display 0.4s ease', position:posIcon?'absolute':'fixed'}}>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
    );
};

export default GoTopPage;
