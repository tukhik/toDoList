import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';

export default function NavMenu(){

    return(
        <Navbar bg="dark" variant="dark" >
        <Nav>

        <NavLink 
        to='/' 
        activeClassName={styles.active}
        className = {styles.navbar}
        exact
        >
        Home
        </NavLink>
        <NavLink
       to='/about' 
         activeClassName={styles.active}
         className = {styles.navbar}
         exact
          >
          About us
          </NavLink>
        <NavLink
         to='/contact'
         activeClassName={styles.active}
         className = {styles.navbar}
         exact
         >
         Contact us
         </NavLink>

        </Nav>
      </Navbar>
    );
};
