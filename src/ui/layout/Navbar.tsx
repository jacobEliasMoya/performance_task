import React from 'react';
import NavbarLink from '../components/NavbarLink';

const Navbar: React.FC = () => {


    // function that triggers the mobile navigation
    const triggerNav = ():void =>{
        if(document.querySelector('.mobilenav .fas')?.classList.contains('fa-bars')){
            document.querySelectorAll('.shrink').forEach(elm=>{
                elm.classList.remove('squished');
            });
            document.querySelector('.mobilenav .fas')?.classList.replace('fa-bars','fa-arrow-up');
        } else {
            document.querySelectorAll('.shrink').forEach(elm=>{
                elm.classList.add('squished');
            });
            document.querySelector('.mobilenav .fas')?.classList.replace('fa-arrow-up','fa-bars');
        }
    };

    return (
        <nav className="navbar navbar-dark nav-main">
            <div className="container">
                <a className="navbar-brand"><span>inquir</span><span className='ed'>ed</span></a>
                <ul className="navbar-nav">
                    <NavbarLink text="Curriculum Library" />
                    <NavbarLink text="Unit Dashboard" />
                    <NavbarLink text="PD & Learning" />
                    <NavbarLink text="Administation" />
                    <NavbarLink text="Assistance" />
                    <li className="nav-item dropdown no show"></li>
                    <li className="nav-item dropdown show">
                        <a className="nav-link dropdown-toggle text-lowercase text-capitalize" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div onClick={triggerNav} id='mobilenavID' className='mobilenav'>
                                <i className='fas fa-bars'></i>
                            </div>
                            <div className="avatar avatar-sm">
                                <i className='far fa-user-circle'></i>
                                <span>Admin</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
