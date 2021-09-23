import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ libraryStatus, setLibraryStatus, id }) => {
  return (
    <NavContainer>
      <H1 libraryStatus={libraryStatus}>Mood</H1>
      {/* <Button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </Button> */}

      <a
        style={{
          background: 'white',
          color: 'black',
          borderRadius: '8px',
          padding: '10px',
          border: '1px solid #222'
        }}
        target="_blank"
        href={
          'https://opensea.io/assets/0x60d08dbded0bf56d21977b597793e69d1c5456e0/' +
          id
        }
      >
        Buy on Open Sea
      </a>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
`

const H1 = styled.h1`
  transition: all 0.5s ease;

  @media screen and (max-width: 768px) {
    visibility: ${p => (p.libraryStatus ? 'visible' : 'visible')};
    opacity: ${p => (p.libraryStatus ? '0' : '100')};
    transition: all 0.5s ease;
  }
`

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  border: 2px solid rgb(65, 65, 65);
  padding: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background: rgb(65, 65, 65);
    color: white;
  }
`

export default Nav
