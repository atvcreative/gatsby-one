import * as React from "react"
import {graphql, Link} from "gatsby"
import styled from "styled-components";

import Layout from "../components/layout"
import Seo from "../components/seo"
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 30px;
  color: blue;
`;

const Index =  ({ data }) => {
  return (
    <Layout>
      <Seo title="Home"/>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <div>
        {data.allMarkdownRemark.totalCount}
        {data.allMarkdownRemark.edges.map(({node}) => {
            const image = getImage(node.frontmatter.image);
            return (
                <div key={node.id}>
                    <BlogLink to={node.fields.slug}>
                        <BlogTitle>
                            {node.frontmatter.title}
                        </BlogTitle>
                    </BlogLink>
                    <div> {node.excerpt}</div>
                    <GatsbyImage
                        image={image}
                        alt={node.frontmatter.title}
                    />
                </div>
            )})
        })}
      </div>
    </Layout>
  )
}

export default Index;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            title
            description
            image {
                childImageSharp {
                  gatsbyImageData
                }
              }  
          }
          fields {
            slug
          }
        }
      }
    }
  }`;
