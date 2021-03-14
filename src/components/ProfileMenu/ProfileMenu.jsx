import React, { useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  LogoutButton,
  ProfileImage,
  ProfileMenuContainer,
  ProfileMenuDropDown,
  UserDetails,
  NameEmail,
  Line,
} from './ProfileMenuStyles'
import { ReactComponent as LogoutIcon } from '../../assets/images/logout-icon.svg'
import { ReactComponent as ThemeIcon } from '../../assets/images/theme-icon.svg'
import { logoutAction } from '../../store/actions/userActions'
import { useMenu } from '../../hooks/useMenu'
import { ThemeContext } from '../../App'

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const menu = useRef(null)
  const menuIcon = useRef(null)

  useMenu(menuIcon, menu, setIsOpen)

  const { darkTheme, setDarkTheme } = useContext(ThemeContext)

  return (
    <ProfileMenuContainer>
      {userInfo && (
        <ProfileImage
          src={userInfo.photo}
          alt='Profile Image'
          ref={menuIcon}
          onClick={() => setIsOpen(prev => !prev)}
        />
      )}
      {isOpen && (
        <ProfileMenuDropDown ref={menu}>
          <UserDetails>
            <ProfileImage src={userInfo.photo} alt='Profile Image' className='profile' />
            <NameEmail>
              <p className='name'>
                <strong>{userInfo.name}</strong>
              </p>
              <p className='email'>{userInfo.email}</p>
            </NameEmail>
          </UserDetails>
          <Line />
          <LogoutButton
            onClick={() => {
              setIsOpen(false)
              setDarkTheme(prev => !prev)
              localStorage.setItem('darkTheme', JSON.stringify(darkTheme))
            }}
          >
            <ThemeIcon />
            <span>Switch to {darkTheme ? 'Light' : 'Dark'} Theme</span>
          </LogoutButton>
          <LogoutButton
            onClick={() => {
              setIsOpen(false)
              dispatch(logoutAction())
            }}
          >
            <LogoutIcon />
            <span>Logout</span>
          </LogoutButton>
        </ProfileMenuDropDown>
      )}
    </ProfileMenuContainer>
  )
}
