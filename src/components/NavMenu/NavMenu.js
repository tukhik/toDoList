import React, {useEffect} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';
import {signout, getUserInfo} from './../../store/actions';
import {removeToken} from '../../helpers/auth';
import { history } from '../../helpers/history';



function NavMenu({ isAuthenticated, signout, userInfo }){
  useEffect(() => {
    getUserInfo();
   
  });
 const removeJWT = ()=>{
    removeToken();
    history.push('/login');
  }


    return(
        <Navbar className = {styles.nav}>
        <Nav className="mr-auto container">
        {isAuthenticated &&
        <NavLink 
        to='/' 
        activeClassName={styles.active}
        exact
        className = {styles.navbar}
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
          <ul>
          <li>Login: {userInfo}</li>
          <li><Button className="navMenu-link-logout" onClick={removeJWT}>Log out</Button>
          </li>
          </ul>:
          <>
          <NavLink
          to='/login'
          activeClassName={styles.active}
          className = {styles.navbar}
          exact
          >
          Login
          </NavLink>
          <NavLink
          to='/register'
          activeClassName={styles.active}
          className = {styles.navbar}
          exact
          >
          Register
          </NavLink>
          </>
         }

        </Nav>
      </Navbar>
    );
};

const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.isAuthenticated,
    userInfo: state.userInfo
  }
};


const mapDispatchToProps = {
    signout,
    getUserInfo
}


export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);