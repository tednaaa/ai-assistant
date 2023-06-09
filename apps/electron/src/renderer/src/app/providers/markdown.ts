import { markedHighlight } from 'marked-highlight';
import { marked } from 'marked';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark-reasonable.css';

export const parseMarkdown = () => {
  marked.use(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    })
  );
};
