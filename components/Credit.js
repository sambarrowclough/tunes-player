import React from 'react'
import styled from 'styled-components'
const Credit = () => {
  return (
    <CreditContainer>
      <Link
        href="https://github.com/WilsonLe/react-music-player"
        target="_blank"
      >
        Original by Wilsom
      </Link>

      <Link href="https://twitter.com/sambarrowclough" target="_blank">
        Remixed by Sam
      </Link>
    </CreditContainer>
  )
}

const CreditContainer = styled.div`
  user-select: none;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 12;
  bottom: 5px;
  right: 5px;
  color: rgb(155, 155, 155);
  font-size: 0.75rem;
  margin-right: 5px;
  margin-bottom: 5px;
`

const Link = styled.a`
  margin-bottom: 5px;
  color: rgb(155, 155, 155);
`
export default Credit
