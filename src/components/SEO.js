import React from "react"
import { Helmet } from "react-helmet-async"

function SEO({ description, lang = "enGB", meta, title = "Play" }) {
  const site = {
    siteMetadata: {
      title: "Mind Clash",
      description:
        "WHERE STRATEGY MEETS SKILL",
    },
  }
  const metaDescription = description || site.siteMetadata.description
  let cardUrl = "/assests/mclogo.png"
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s · ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${title} · ${site.siteMetadata.title}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: cardUrl,
        },
      ]}
    />
  )
}

export default SEO
