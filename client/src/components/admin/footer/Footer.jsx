import React from 'react';
import Link from 'next/link';
import './footer.css';

function Footer() {
    const support = [
        { text: 'FAQs', path: '#' },
        { text: 'Privacy Policy', path: '#' },
        { text: 'Terms & Condition', path: '#' },
    ]
    const year = new Date().getFullYear();
    return (
        <div className='admin-footer-container'>
            <div className="admin-footer-wrapper flex justify-between">
                <div className="admin-copywrite-left">
                    <p>© {year} - Designed by <span>DankCoders</span>. All rights reserved</p>
                </div>
                <div className="admin-page-links">
                    <ul className='flex gap-6'>
                        {support.map((item, index) => (
                            <Link href={item.path} key={index} passHref >
                                <li className='footer-nav-list'>
                                    {item.text}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer