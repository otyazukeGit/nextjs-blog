import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// getStaticPaths 関数は、ビルド時に静的にHTMLレンダリングしておくパスの一覧を決めておく関数です。
// reuturnされた各path結果をgetStaticProps(params) に渡すことで各ページのプリレンダリングしておける。
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

interface Props {
  postData: {
    id: string
    contentHtml: string
  }
}
interface Params extends ParsedUrlQuery {
  id: string
}
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const postData = await getPostData(params!.id)
  return {
    props: { postData }
  }
}
