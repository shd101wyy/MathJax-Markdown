### Preview Markdown with MathJax support
** Inline Math Support using MathJax **
- Put your math expression within $\$...\$$
- eg $\$$x_1 + 2$\$$ will be render as $x_1 + 2$

### Demo
** [index_mathjax.html](https://rawgit.com/shd101wyy/MathJax-Markdown/master/index.html) **  
** [index_katex.html](https://rawgit.com/shd101wyy/MathJax-Markdown/master/index_katex.html) **

### Implementation.
- I used ** [marked](https://github.com/chjj/marked) ** to convert markdown code to html code.
- I used **MathJax** or **Katex** for math expression rendering in * LaTex * style.
    - ** [MathJax](https://www.mathjax.org/)**
    - ** [Katex](https://github.com/Khan/KaTeX)**
- I used ** [NodePDF(depends on PhantomJS)](https://github.com/TJkrusinski/NodePDF) ** to compile rendered html to pdf file.

### Usage
```shell
mathjax_markdown a.md a.html  # compile a.md to a.html
mathjax_markdown a.md a.pdf    # compile a.md to a.pdf
```

### API
Please check **mathjax_markdown.js**

### Style
css style is written in ** css_template/index.css **, feel free to modify it.

### TODO
- Add CSS support.
- pdf hyperlink fix

### ATTENTION
- The pdf conversion doesn't work properly sometimes.
- You can convert your markdown file to html file first, then use browser to print it as pdf.
