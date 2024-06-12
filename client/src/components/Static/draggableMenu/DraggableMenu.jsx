import { useRef, useState, useEffect } from 'react';
import './draggablemenu.css';
import Image from 'next/image';
import Link from 'next/link';

function DraggableMenu() {

    const fabElement = useRef(null);
    const burgerElement = useRef(null);
    const [position, setPosition] = useState({ x: '40px', y: '60%' });
    const [isDragging, setIsDragging] = useState(false);

    // Adjust the speed and snapping precision
    const snapToSide = (clientX, clientY) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let newX = clientX;
        let newY = clientY;

        newY = Math.max(50, Math.min(newY, windowHeight - 50));

        if (newX < windowWidth / 2) {
            newX = 40;
            fabElement.current.classList.remove('right');
            fabElement.current.classList.add('left');
        } else {
            newX = windowWidth - 60;
            fabElement.current.classList.remove('left');
            fabElement.current.classList.add('right');
        }

        setPosition({ x: `${newX}px`, y: `${newY}px` });
    };

    const startDrag = (e) => {
        setIsDragging(true);
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        setPosition({ x: `${clientX}px`, y: `${clientY}px` });
    };

    const endDrag = (e) => {
        setIsDragging(false);
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
        snapToSide(clientX, clientY);
    };

    const toggleBurger = () => {
        burgerElement.current.classList.toggle('open');
        fabElement.current.classList.toggle('fab-active');
    };

    useEffect(() => {
        if (fabElement.current) {
            fabElement.current.style.left = position.x;
            fabElement.current.style.top = position.y;
        }
    }, [position]);

    const NavLinks = [
        { text: 'HOME', icon: <Image src='/Home.svg' width={22} height={21} alt='Home icon svg' />, path: '/' },
        { text: 'COURSES', icon: <Image src='/Header-Course.svg' width={22} height={21} alt='Home icon svg' />, path: '/login' },
        { text: 'EDUCATORS', icon: <Image src='/Educator.svg' width={22} height={21} alt='Home icon svg' />, path: '/#' },
        { text: 'INSTITUTES', icon: <Image src='/Institutes.svg' width={22} height={21} alt='Home icon svg' />, path: '/#' },
        { text: 'EXPLORE', icon: <Image src='/Explore.svg' width={22} height={21} alt='Home icon svg' />, path: '/#' },
        { text: 'APPLY NOW', icon: <Image src='/Apply-Now.svg' width={22} height={21} alt='Home icon svg' />, path: '/#' },
    ];

    return (
        <div
            id="floating-snap-btn-wrapper"
            ref={fabElement}
            style={{ position: 'fixed', left: position.x, top: position.y, cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={startDrag}
            onMouseMove={isDragging ? onDrag : null}
            onMouseUp={endDrag}
            onMouseLeave={isDragging ? endDrag : null}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={endDrag}
            onClick={toggleBurger}
        >
            <div className="fab-btn">
                <div className="js-burger" ref={burgerElement}></div>
            </div>
            <div className="float-nav-list-wrap">
                <ul className='float-nav-list'>
                    {NavLinks.map((item, index) => (
                        <li key={index}>
                            <Link href={item.path}>
                                {item.icon}
                                <span className='tool-tip'>{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DraggableMenu;