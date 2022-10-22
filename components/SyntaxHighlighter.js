import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css'

const SyntaxHighlighter = ({ language, code }) => {
  const trimmedCode = code.trim()
  const highlightCode = hljs.highlight(trimmedCode, { language }).value

  return (
    <div className='code-container'>
      <pre>
        <code
          className='hljs'
          dangerouslySetInnerHTML={{ __html: highlightCode }}
        ></code>
      </pre>

      <style jsx>{`
        .code-container pre {
          line-height: 1.4rem;
        }
      `}</style>
    </div>
  )
}

export default SyntaxHighlighter
