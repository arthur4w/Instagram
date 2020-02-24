import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedInUser: sessionStorage.getItem('access-token') != null,
            menuList: false
        }
    }

    searchBoxChangeHandler = (e) => {
        this.props.searchBoxHandler(e.target.value);
    }

    profilePictureClickHandler = (e) => {
        this.setState({ menuList: !this.state.menuList, anchorEl: this.state.anchorEl != null ? null : e.currentTarget });
    }

    myAccountClickHandler = () => {
        this.props.history.push("/profile");
    }

    logOutClickHandler = () => {
        sessionStorage.removeItem('access-token');
        this.setState({isLoggedInUser: false});
    }
    
    render() {
        const {open} = this.state;
        return (
            <div className='app-header'>
                {!this.state.isLoggedInUser && <Redirect to='/' />}
                <Link to="/home" className="app-logo">Image Viewer</Link>
                {this.state.isLoggedInUser &&
                    <div className="header-right-area">
                        
                        {this.props.pageId === 'home' &&
                            <div className="searchBox-headerarea">
                            <SearchIcon />
                            <Input className="searchBox" placeholder="Search..." disableUnderline={true} onChange={this.searchBoxHandler} />
                            </div>
                        }
                        
                        <div>
                            <IconButton className="profileIcon" onClick={this.profilePictureClickHandler}>
                            <img src={this.props.profilePicture} alt="Profile Pic" className="profilePic" />
                            </IconButton>
                            <Menu className="profile-options" anchorEl={this.state.anchorEl} keepMounted open={this.state.menuList} onClose={this.profilePictureClickHandler}>
                                <MenuItem className="profileMenu-item" onClick={this.myAccountClickHandler}><span>My Account</span>
                                </MenuItem>
                                <hr style={{width: 80}}/>
                                <MenuItem className="profileMenu-item" onClick={this.logOutClickHandler}><span>Logout</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Header;