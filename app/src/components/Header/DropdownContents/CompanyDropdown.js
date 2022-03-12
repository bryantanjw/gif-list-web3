import React from "react"
import styled from "styled-components"
import {
  Heading,
  HeadingLink,
  LinkList,
  DropdownSection,
  Icon
} from "./Components"

const CompanyDropdownEl = styled.div`
  width: 18.5rem;
`

const CompanyDropdown = () => {
  return (
    <CompanyDropdownEl>
      <DropdownSection data-first-dropdown-section>
        <div>
          <Heading>Mint NFTs</Heading>
          <p>A collection of 10 generative NFTs from album covers up for grabs</p>
          {/* <Flex>
            <div>
              <h4>Get Started</h4>
              <LinkList>
                <li>
                  <a href="/">Elements</a>
                </li>
                <li>
                  <a href="/">Checkout</a>
                </li>
                <li>
                  <a href="/">Mobile apps</a>
                </li>
              </LinkList>
            </div>
            <div>
              <h4>Popular Topics</h4>
              <LinkList>
                <li>
                  <a href="/">Apple Pay</a>
                </li>
                <li>
                  <a href="/">Testing</a>
                </li>
                <li>
                  <a href="/">Launch Checklist</a>
                </li>
              </LinkList>
            </div>
          </Flex> */}
        </div>
      </DropdownSection>
    </CompanyDropdownEl>
  )
}

export default CompanyDropdown;