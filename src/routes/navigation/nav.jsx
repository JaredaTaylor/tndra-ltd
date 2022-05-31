import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './nav.scss';

const Nav = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <div className='logo-container'>
                    <Link to='/'>
                        <CrwnLogo className='logo' />
                    </Link>
                </div>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    <Link className='sign-in' to='/sign-in'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Nav;