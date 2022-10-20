import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import truncateStr from '../utils/truncateStr'
import formatDate from '../utils/formatDate'

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Next.js Blog</title>
        <meta property='og:title' content='My Blog Built with Next.js' />
        <meta property='og:url' content='/' />
        <meta name='description' property='og:description' content='Blog' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/favicon.ico' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <article className={styles.article}>
        <h1 className={styles.article__h1}>Blogs</h1>
        <section className={styles.blogs__container}>
          {data.map((d) => {
            return (
              <div key={d.slug}>
                <h1>{d.frontMatter.title}</h1>
                <p>{formatDate(d.frontMatter.date, 'LL')}</p>
                <p>{truncateStr(d.frontMatter.description, 40)}</p>
                <Link href={`posts/${d.slug}`}>
                  <a>read more</a>
                </Link>
              </div>
            )
          })}
        </section>
      </article>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}

export function getStaticProps() {
  const fileNames = fs.readdirSync('posts', 'utf-8')

  const data = fileNames.map((fileName) => {
    const mdxSource = fs.readFileSync(path.join('posts', fileName), 'utf-8')
    const slug = fileName.split('.')[0]
    const { data: frontMatter } = matter(mdxSource)

    return {
      frontMatter,
      slug,
    }
  })

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  }
}
