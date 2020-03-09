import React from "react"
import { Link } from "react-router-dom"
import FontAwesome from "react-fontawesome"
import styled from "styled-components"
import {
  PRIMARY_COLOR,
  PRIMARY_LIGHT_COLOR,
  PRIMARY_TEXT_COLOR
} from "../lib/theme"
import Basic from "../lib/basic"

const Nav = styled.nav`
  height: 2.8rem;
  background-color: ${PRIMARY_COLOR} !important;
  color: #333333 !important;

  a {
    color: ${PRIMARY_TEXT_COLOR} !important;
  }

  @media screen and (min-width: 450px) {
    a:hover {
      color: #000000 !important;
      transform: rotate(-1.1deg);
      transform: scale(1.2);
      border-radius: 0.2rem;
    }
    a:focus,
    a:focus-within {
      background-color: ${PRIMARY_COLOR};
      color: ${PRIMARY_TEXT_COLOR};
    }
  }
`

const Box = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  align-content: center;
  height: 100%;
`

const BoxItem = styled.div`
  flex: 1;

  a {
    height: 100%;
    justify-content: center;
    line-height: 2rem;
    text-overflow: hidden;
  }

  @media screen and (min-width: 450px) {
    :hover,
    a:hover {
      background-color: ${PRIMARY_LIGHT_COLOR} !important;
      color: ${PRIMARY_TEXT_COLOR} !important;
    }
  }
`

const roundRobinUrls = (currentUrl, choices) => {
  const ind = choices.indexOf(currentUrl)
  if (ind === -1 || ind === choices.length - 1) return choices[0]
  return choices[ind + 1]
}

const BottomBar = () => {
  const { isLoggedIn } = Basic.useContainer()

  return (
    <Nav
      className="navbar is-primary is-fixed-bottom"
      role="navigation"
      aria-label="main navigation"
    >
      <Box>
        <BoxItem>
          <Link to={"/"} className="navbar-item">
            <FontAwesome name={"home"} />
          </Link>
        </BoxItem>

        {!isLoggedIn && (
          <BoxItem>
            <Link to={"/login"} className="navbar-item">
              Login
            </Link>
          </BoxItem>
        )}

        <BoxItem>
          <Link to="/search" className="navbar-item">
            <FontAwesome name="search" />
          </Link>
        </BoxItem>

        {isLoggedIn && (
          <BoxItem>
            <Link to="/me" className="navbar-item">
              Me
            </Link>
          </BoxItem>
        )}
      </Box>
    </Nav>
  )
}

export default BottomBar
