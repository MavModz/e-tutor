import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import "./header.css";

function NavHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set state based on scroll position
      setIsScrolled(window.scrollY > 0);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add 'header-scrolled' class to the header container if the page is scrolled
  const headerClass = isScrolled ? 'nav-header-area-container header-scrolled' : 'nav-header-area-container';

  return (
    <div className={headerClass}>
      <div className="nav-header-wrapper">
        <div className="nav-header-area flex justify-between items-center">
          <div className="nav-logo-container w-1/5 flex items-center">
            <Link href='/' passHref>
              <Image src="/LOGO.svg" width={120} height={54}
                className='nav-img-static-header-logo'
                alt="logo svg"
                onError={(e) => e.target.src = '/LOGO.png'}
              />
            </Link>
          </div>
          <div className="nav-header-button-container w-4/5 flex justify-end">
            <Link href='/login' passHref>
              <button className='nav-header-button-area hover-btn-effect flex gap-1.5'><Image src="/login-icon.svg" width={12} height={12} alt="login logo svg" className='static-header-logo' />Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavHeader