import { NextSeo } from 'next-seo'
import * as React from 'react'

import { ListDetailView, SiteLayout } from '~/components/Layouts'
import { withProviders } from '~/components/Providers/withProviders'
import { PostsList } from '~/components/Writing/PostsList'
import routes from '~/config/routes'
import { getContext } from '~/graphql/context'
import { GET_POSTS } from '~/graphql/queries/posts'
import { addApolloState, initApolloClient } from '~/lib/apollo'

function WritingPage() {
  return (
    <NextSeo
      title={routes.writing.seo.title}
      description={routes.writing.seo.description}
      openGraph={routes.writing.seo.openGraph}
    />
  )
}

export async function getServerSideProps({ req, res }) {
  const context = await getContext(req, res)
  const apolloClient = initApolloClient({ context })

  await apolloClient.query({ query: GET_POSTS })

  return addApolloState(apolloClient, {
    props: {},
  })
}

WritingPage.getLayout = withProviders(function getLayout(page) {
  return (
    <SiteLayout>
      <ListDetailView list={<PostsList />} hasDetail={false} detail={page} />
    </SiteLayout>
  )
})

export default WritingPage
