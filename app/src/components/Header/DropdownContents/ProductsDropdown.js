import React from "react"
import styled from "styled-components"
import { Icon, DropdownSection, Heading } from "./Components"

const ProductsDropdownEl = styled.div`
  width: 30rem;
`

const Logo = styled.div`
  width: 38px;
  height: 38px;
  margin-right: 16px;
  border-radius: 100%;
  opacity: 0.6;
  background-color: ${({ color }) => `var(--${color})`};
`

const SubProductsList = styled.ul`
  li {
    display: flex;
    margin-bottom: 1rem;
  }
  h3 {
    margin-right: 1rem;
    width: 3.2rem;
    display: block;
  }
  a {
    color: var(--dark-grey);
  }
`

const ProductsSection = styled.ul`
  li {
    display: flex;
  }
`

const WorksWithStripe = styled.div`
 border-top: 2px solid #fff;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacer);
  padding-top: var(--spacer);
}
h3 {
  margin-bottom: 0;
}
`

const ProductsDropdown = () => {
  return (
    <ProductsDropdownEl>
      {/* <DropdownSection data-first-dropdown-section>
        <div>
          <Heading>Portal</Heading>
          <p>View, upload, and upvote GIFs</p>
        </div>
        <WorksWithStripe>
          <Heading noMarginBottom>
            <a href="/">
              <Icon /> Works with Stripe
            </a>
          </Heading>
        </WorksWithStripe>
      </DropdownSection> */}
    </ProductsDropdownEl>
  )
}

export default ProductsDropdown;