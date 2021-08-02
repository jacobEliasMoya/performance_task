import React from 'react';

export const NavbarLink = ({text}: {text: string}): JSX.Element => {

    return (
        // slight edit to class for movile navigation toggle
        <li className='nav-item shrink squished'>
            <a href="#" className="nav-link">{text}</a>
        </li>
    );
};


export default NavbarLink;