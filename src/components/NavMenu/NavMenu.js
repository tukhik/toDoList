import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';


function NavMenu({ isAuthenticated }){

    return(
        <Navbar bg="dark" variant="dark" >
        <Nav className="mr-auto container">
       {
        isAuthenticated &&
          <NavLink 
        to='/' 
        activeClassName={styles.active}
        exact
        >
        Home
        </NavLink>
        }
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
                 {
          isAuthenticated ? 
          <Button >Log out </Button> :
          <>
          <NavLink
          to='/login'
          activeClassName={styles.active}
           className = {styles.navbar}
          exact
          >
          Login
          </NavLink>
          </>
         }



        </Nav>
      </Navbar>
    );
};

const mapStateToProps = (state)=>{
return {
  isAuthenticated: state.isAuthenticated
}
};

export default connect(mapStateToProps)(NavMenu);


