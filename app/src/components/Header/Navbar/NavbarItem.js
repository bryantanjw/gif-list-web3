import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from 'react-router-dom'

const NavbarItemTitle = styled.button`
  background: transparent;
  border: 0;
  font-weight: bold;
  font-family: inherit;
  font-size: 18px;
  padding: 2rem 1.5rem 1.2rem 1.5rem;
  color: white;
  display: flex;
  justify-content: center;
  transition: opacity 250ms;
  cursor: pointer;
  /* position above the dropdown, otherwise the dropdown will cover up the bottom sliver of the buttons */
  position: relative;
  z-index: 2;
  &:hover, &:focus {
    opacity: 0.7;
    outline:none;
  }
`

const NavbarItemEl = styled.li`
  position: relative;
`

/* Edit z-index for navbar dropdown*/
const DropdownSlot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1500px;
  z-index: 99;
`

export default class NavbarItem extends Component {
  static propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node,
  }
  onMouseEnter = () => {
    this.props.onMouseEnter(this.props.index)
  }
  render() {
    const { title, link, children } = this.props
    return (
      <NavbarItemEl onMouseEnter={this.onMouseEnter} onFocus={this.onMouseEnter}>
        <Link to={link}>
          <NavbarItemTitle>{title}</NavbarItemTitle>
        </Link>
          <DropdownSlot>{children}</DropdownSlot>
      </NavbarItemEl>
    )
  }
}