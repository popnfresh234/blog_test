import React from "react"
import { Link, graphql } from "gatsby"
import Navbar from "../components/Navbar/Navbar"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/Carousel/carousel"
import Img from "gatsby-image"
import styled from "styled-components"
import Logo from "../components/Logo/logo"



const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <>
      <Logo/>
      <Navbar />
      <Carousel posts={posts}></Carousel>
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <Link to="/home">
          <span>Go to this testaroo</span>
        </Link>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    file(name: { eq: "logo" }, extension: { eq: "png" }) {
      childImageSharp {
        fluid(maxWidth: 800, pngQuality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
