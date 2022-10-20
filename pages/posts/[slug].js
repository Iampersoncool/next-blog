import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Link from 'next/link'
import formatDate from '../../utils/formatDate'
import SyntaxHighlighter from '../../components/SyntaxHighlighter'

export default function DisplayPage({ code, frontmatter: frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  const router = useRouter()

  const formattedDate = formatDate(frontMatter.date, 'LL')

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta property='og:title' content={frontMatter.title} />
        <meta property='og:url' content={`/${router.query.slug}`} />
        <meta
          name='description'
          property='og:description'
          content={frontMatter.description}
        />
      </Head>

      <header className='post__container__header'>
        <h1 className='post__title'>{frontMatter.title}</h1>
        <p className='post__date'>{formattedDate}</p>
        <p className='post__description'>{frontMatter.description}</p>
        <hr />
      </header>
      <style jsx>
        {`
          main {
            margin-top: 1rem;
          }

          hr {
            max-width: calc(100vw - 2rem);
          }

          .post__container__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
          }

          .post__title {
            font-size: 3.2rem;
          }

          .post__date {
            font-size: 1.3rem;
          }

          .post__description {
            font-size: 1.4rem;
          }

          .post__container__header hr {
            border: 1px solid black;
            width: 100vw;
          }

          .go__home {
            position: fixed;
            bottom: 0;
            left: 0;
            margin: 1rem;
            color: white;
            background-color: red;
            padding: 0.5rem;
            border-radius: 0.4rem;
          }

          .go__home:hover {
            filter: brightness(80%);
          }

          .centered {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>

      <style jsx global>{`
        pre code.hljs {
          font-size: 1.1rem;
          text-align: left !important;
          max-width: 40rem;
          margin-top: 0.6rem;
        }
      `}</style>

      <main>
        <article className='centered'>
          <Component components={{ SyntaxHighlighter }} />
          <Link href='/'>
            <a className='go__home'>Go Home</a>
          </Link>
        </article>
      </main>
    </>
  )
}

export function getStaticPaths() {
  const fileNames = fs.readdirSync('posts', 'utf-8')

  return {
    paths: fileNames.map((fileName) => {
      return {
        params: {
          slug: fileName.split('.')[0],
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const fullPath = path.join('posts', `${params.slug}.mdx`)
  const mdxSource = fs.readFileSync(fullPath, 'utf8')
  const { code, frontmatter } = await bundleMDX({
    source: mdxSource,
  })

  return {
    props: {
      frontmatter: JSON.parse(JSON.stringify(frontmatter)),
      code,
    },
  }
}
