import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './footer.css';

function Footer() {
    const info_stats = [
        { stats: '6.3K', text: 'Online coourses' },
        { stats: '26K', text: 'Certified Instructor' },
        { stats: '99.9%', text: 'Sucess Rate' }
    ]

    const social_icons = [
        { icon: <Image src='/facebook.svg' width={18} height={18} alt='facebook svg logo' /> },
        { icon: <Image src='/Instragarm.svg' width={18} height={18} alt='Instragarm svg logo' /> },
        { icon: <Image src='/Linkedin.svg' width={18} height={18} alt='Linkedin svg logo' /> },
        { icon: <Image src='/Twitter.svg' width={18} height={18} alt='Twitter svg logo' /> },
        { icon: <Image src='/Youtube-Light.svg' width={18} height={18} alt='Youtube svg logo' /> }
    ]

    const top_category = [
        { text: 'Development', path: '#' },
        { text: 'Finance & Accounting', path: '#' },
        { text: 'Design', path: '#' },
        { text: 'Business', path: '#' }
    ]

    const quick_links = [
        { text: 'About', path: '#' },
        { text: 'Become Instructor', path: '#' },
        { text: 'Contact', path: '#' },
        { text: 'Career', path: '#' }
    ]

    const support = [
        { text: 'Help Center', path: '#' },
        { text: 'FAQs', path: '#' },
        { text: 'Terms & Condition', path: '#' },
        { text: 'Privacy Policy', path: '#' }
    ]

    const year = new Date().getFullYear();

    return (
        <div className="footer-container">
            <div className="footer-wrapper-top">
                <div className="footer-top-area">
                    <div className="footer-top-left-container max-w-[536px] flex flex-col gap-8">
                        <h2>Start learning with 67.1k students around the world.</h2>
                        <div className="footer-cta-btn flex gap-4">
                            <Link href='#' passHref>
                                <button className='join-cta hover-btn-effect' id='join-cta'>Join The Family</button>
                            </Link>
                            <Link href='#' passHref>
                                <button className='browse-cta hover-btn-effect'>Browse All Courses</button>
                            </Link>
                        </div>
                    </div>
                    <div className="footer-top-right-container flex items-center">
                        <div className="web-info-stats flex gap-6">
                            {info_stats.map((item, index) => (
                                <div className="stat-count flex flex-col gap-3 w-[200px] h-[82px]" key={index}>
                                    <h2>{item.stats}</h2>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-wrapper-bottom">
                <div className="footer-bottom-area">
                    <div className="bottom-left-container max-w-[424px] flex flex-col gap-5">
                        <Image src='/LOGO-Light.svg' width={175} height={46}
                            alt='Logo Light svg'
                            onError={(e) => e.target.src = '/LOGO-Light.png'}
                        />
                        <p>Aliquam rhoncus ligula est, non pulvinar elit
                            convallis nec. Donec mattis odio at.</p>
                        <div className="social-icons flex gap-3 pt-2">
                            {social_icons.map((item, index) => (
                                <div className="social-icon-wrapper flex items-center" key={index}>
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bottom-center-container flex gap-6">
                        <div className="top-category-list w-[200px] max-h-[170px] flex flex-col gap-5">
                            <h6>Top 4 Category</h6>
                            <ul>
                                {top_category.map((item, index) => (
                                    <Link href={item.path} key={index} passHref>
                                        <li className='footer-nav-list'>
                                            <span>{item.text}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className="quick-links-list w-[200px] max-h-[170px] flex flex-col gap-5">
                            <h6>Quick Links</h6>
                            <ul>
                                {quick_links.map((item, index) => (
                                    <Link href={item.path} key={index} passHref>
                                        <li className='footer-nav-list'>
                                            <span>{item.text}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className="support-links w-[200px] max-h-[170px] flex flex-col gap-5">
                            <h6>Support</h6>
                            <ul>
                                {support.map((item, index) => (
                                    <Link href={item.path} key={index} passHref>
                                        <li className='footer-nav-list'>
                                            <span>{item.text}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="bottom-right-container w-[200px] max-h-[170px] flex flex-col gap-5">
                        <h6>Download Our App</h6>
                        <div className="mob-app-container flex flex-col gap-3">
                            <Link href='#' passHref>
                                <Image src='/Appstore-app.svg' width={163} height={58} alt='Appstore App svg' />
                            </Link>
                            <Link href='#' passHref>
                                <Image src='/Playstore-app.svg' width={163} height={58} alt='Playstore App svg' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copywrite-container">
                <div className="copywrite-area">
                    <div className="copywrite-left">
                        <p>© {year} - Designed by <span>DankCoders</span>. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer