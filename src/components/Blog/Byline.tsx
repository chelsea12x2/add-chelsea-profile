import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image'

import { TEAM_MEMBER_ROUTE, HOME_ROUTE } from '../../constants/routes'
import { IGhostAuthor, IMember } from '../../types'
import { M1, M2, maxWidth } from '../../constants/measurements'

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  margin-right: ${M1};
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 0;
`

const ThumbnailGatsbyImg = (props: { fluid: FluidObject }) => (
  <Thumbnail as={Img} {...props} />
)

const AuthorLink = styled(Link)`
  margin-right: ${M2};
  display: flex;
  align-items: center;
`

const BylineContainer = styled.div`
  padding-bottom: ${M2};
  width: 100%;
  display: flex;
  align-items: center;

  ${maxWidth('400px')} {
    display: block;
    padding-bottom: 0;

    > a {
      margin-bottom: ${M2};
    }
  }
`

interface IBylineProps {
  authors?: IGhostAuthor[]
  authorsAsMembers?: IMember[]
}

const Byline = ({ authors, authorsAsMembers }: IBylineProps) => {
  const {
    allMember: { edges: members },
    pennLabsLogoImg: {
      childImageSharp: { fluid: pennLabsLogoFluid },
    },
  } = useStaticQuery(graphql`
    query {
      allMember {
        edges {
          node {
            url
            student {
              name
            }
          }
        }
      }
      pennLabsLogoImg: file(relativePath: { eq: "labs-logo-gray.png" }) {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  console.log('members', members)

  // This is really pretty ugly. But for some reason, GraphQL isn't picking up on the ghost <> labs
  // foreign key when the authors are in a list like they are under posts -- in that case,
  // the type seems to be GhostPostAuthor instead of GhostAuthor, which doesn't trigger
  // an event in gatsby-node.js.
  const slugToMember = {}
  members.forEach(({ node: m }) => {
    slugToMember[m.url] = m
  })

  if (!authorsAsMembers) {
    authorsAsMembers = authors
      .map(({ slug }) => slugToMember[slug])
      .filter(mem => Boolean(mem))
  }

  console.log('authorsAsMembers', authorsAsMembers)

  // If there are no authors
  if (authorsAsMembers.length === 0) {
    return (
      <BylineContainer>
        <AuthorLink to={HOME_ROUTE}>
          <ThumbnailGatsbyImg fluid={pennLabsLogoFluid as FluidObject} /> Penn
          Labs
        </AuthorLink>
      </BylineContainer>
    )
  }

  const getMemberImage = (localImage: {
    childImageSharp: GatsbyImageProps
  }) => {
    console.log('local image', localImage)
    return (
      (localImage &&
        localImage.childImageSharp &&
        localImage.childImageSharp.fluid) ||
      pennLabsLogoFluid
    )
  }

  return (
    <BylineContainer>
      {authorsAsMembers.map(({ url, localImage, student: { name } }) => (
        <AuthorLink key={url} to={TEAM_MEMBER_ROUTE(url)}>
          <ThumbnailGatsbyImg fluid={getMemberImage(localImage)} />
          <span>{name}</span>
        </AuthorLink>
      ))}
    </BylineContainer>
  )
}

export default Byline
