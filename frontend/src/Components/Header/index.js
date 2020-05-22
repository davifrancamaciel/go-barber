import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notifications from '~/Components/Notifications'

import { AVATAR_DEFAULT } from '~/constants/User'
import logo from '~/assets/logo-purple.svg'
import { Container, Content, Profile } from './styles'

function Header () {
  const profile = useSelector(state => state.user.profile)
  
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt='Go Barber' />
          <Link to='/dashboard'>DASHBOARD</Link>
        </nav>
        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to='/profile'>Meu perfil</Link>
            </div>
            <img
              src={profile.avatar.url || AVATAR_DEFAULT}
              alt={profile.name}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}

export default Header
