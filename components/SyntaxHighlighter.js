import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/atom-one-dark.css'

const languages = [
  {
    string: 'javascript',
    object: javascript,
  },
  {
    string: 'css',
    object: css,
  },
]

languages.forEach(({ string, object }) => {
  hljs.registerLanguage(string, object)
})

const SyntaxHighlighter = ({ language, code }) => {
  const highlightCode = hljs.highlight(code.trim(), { language }).value

  return (
    <pre>
      <code
        className='hljs'
        dangerouslySetInnerHTML={{ __html: highlightCode }}
      ></code>
    </pre>
  )
}

export default SyntaxHighlighter
