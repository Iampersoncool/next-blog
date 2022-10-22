import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function getAllFilesFrontMatter(postsDir) {
  const fileNames = fs.readdirSync(postsDir, 'utf-8')

  const data = fileNames.map((fileName) => {
    const mdxSource = fs.readFileSync(path.join(postsDir, fileName), 'utf-8')
    const slug = fileName.replace('.mdx', '')
    const { data: frontMatter } = matter(mdxSource)

    return {
      frontMatter,
      slug,
    }
  })

  return JSON.parse(JSON.stringify(data))
}
