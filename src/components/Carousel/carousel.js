import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

import styled from "styled-components"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./override.css"
import { Carousel } from "react-responsive-carousel"
import { useMediaQuery } from "react-responsive"

const CarouselImage = styled(Img)`
  max-height: 500px;
  margin: 0 0.2rem 0 0.2rem;
`

const ContentContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.4 all ease;
`

const InnerContent = styled.div`
  max-width: 50%;
  padding: 5rem;
  background-color: #ffffff;
`

const PostCarousel = ({ posts }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 42rem)" })

  return (
    <Carousel
      infiniteLoop
      centerMode={!isTabletOrMobile}
      centerSlidePercentage={80}
    >
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <Link to={post.fields.slug} itemProp="url">
            <CarouselImage
              fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
            />
            {!isTabletOrMobile && (
              <ContentContainer>
                <InnerContent>
                  <h2><span itemProp="headline">{title}</span></h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </InnerContent>
              </ContentContainer>
            )}
          </Link>
        )
      })}
    </Carousel>
  )
}

export default PostCarousel
