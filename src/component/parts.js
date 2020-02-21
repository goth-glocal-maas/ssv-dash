import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const initQueryVars = {
  limit: 10,
  offset: 0
}

export const SubmitBox = styled.div`
  margin-top: 1rem;
`

export const Center = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-align: ${props => props.textAlign || "center"};

  a {
    /* color: #ebf1fd; */
    /* text-decoration: underline; */
  }
  small.muted {
    margin: 2rem;
    font-size: 0.7rem;
    color: #888;
  }

  p {
    padding: 0 10px;
  }

  h1,
  h2,
  h3 {
    font-size: 1.6rem;
    padding: 10px 0;
    text-align: center;
  }
  h2 {
    font-size: 1.3rem;
  }
  h3 {
    font-size: 1.1rem;
  }
`

export const Box = styled.div`
  padding: ${props => props.padding || "0 1rem 2rem"};
  h1,
  h2,
  h3 {
    font-size: 2rem;
    padding: 10px 0;
    text-align: left;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.3rem;
  }
  small {
    font-size: 0.8rem;
  }
  .muted {
    color: #555555;
  }
  hr {
    margin: 0 0 1rem;
  }
`
export const GridBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

export const GridItem2 = styled(Link)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 48%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  padding: ${props => props.padding || "auto"};
  margin: 1%;
  background: #fff;
  color: #555;
  :hover,
  :active {
    color: #fff;
    background: #3298dc;
  }
  small {
    font-size: 0.8rem;
  }
`

export const ListItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 1rem;
  background: ${props => props.background || "#fff"};
  color: #555;
  min-height: ${props => props.minHeight || "auto"};
`

export const Breadcrum = styled.nav`
  font-size: 0.85rem;
  margin-bottom: 0 !important;
  a {
    color: #e3e3e3;
  }
  .is-active > a {
    color: #808a96 !important;
  }
  @media screen and (min-width: 450px) {
    a:hover {
      color: #ebf1fd;
    }
  }
`

/*

<Breadcrum
  className="breadcrumb has-bullet-separator is-centered"
  aria-label="breadcrumbs"
>
  <ul>
    <li>
      <Link to={`/list/${chain.code}`}>{chain.english}</Link>
    </li>
    <li className="is-active">&nbsp;&nbsp;&nbsp;{english}</li>
  </ul>
</Breadcrum>

*/

export const ErrField = ({ err, message = "" }) => (
  <>{err && <p className="help is-danger">{err.message || message}</p>}</>
)

export const Amount = styled.div`
  float: right;
  text-align: right;
  font-size: 1.4rem;
  color: ${props => props.color || "#888"};

  small {
    color: #888;
    font-size: 0.8rem;
  }
`

export function Loading() {
  return <Center>Loading</Center>
}
