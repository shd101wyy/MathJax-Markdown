var marked = require('marked');
var fs = require("fs");
var NodePDF = require('nodepdf');
var mathjax_markdown = {};
var css_template = fs.readFileSync(__dirname + "/css_template/index.css", 'utf8');

var highlightjs = require("highlight.js");

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value;
  }
});

/**
 *
 * Load markdown content
 * compile it to html content
 * @param  {[string]} input_md_content input markdown content
 * @param  {[boolean]} use_mathjax      whether to use mathjax
 * @return {[string]}                  generated html content
 */
 mathjax_markdown.html = function(input_md_content, use_mathjax){
    if (use_mathjax === void 0)
        use_mathjax = true;
    var html_content = marked(input_md_content);
    if (use_mathjax){
        html_content += '\n<script type="text/x-mathjax-config"> MathJax.Hub.Config({tex2jax: {inlineMath: [[\'$\',\'$\'], [\'\\\\(\',\'\\\\)\']]}}); </script>';

        // cdn
        html_content += '<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"> </script>';

        // local
        //html += '<script type="text/javascript" src="./MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"> </script>';
    }

    // apply html head body
    // ATTENTION:
    // It doesn't compile to PDF if I add <!doctype html>
    html_content = //"<!doctype html>" +
           "<html>" +
           "<head>" +
           "<meta charset='utf-8'>" +
           "<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=yes'>"+

           // apply css for code block
           '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/styles/default.min.css">' +

           "<style>" +
            // apply css
                css_template +
           "</style>" +
           "</head>" +
           "<body>" + html_content + "</body>" +
           "</html>";

    return html_content;
};
/**
 * Load markdown content, generate pdf
 * @param  {string} input_md_content       [description]
 * @param  {boolean} use_mathjax           [description]
 * @param  {string} generate_pdf_filename  [description]
 * @return {[type]}                        [description]
 */
 mathjax_markdown.pdf = function(input_md_content, generate_pdf_filename, use_mathjax){
    if (generate_pdf_filename === void 0){
        generate_pdf_filename = "./preview.pdf";
    }
    var html = mathjax_markdown.html(input_md_content, use_mathjax);
};

/**
 * Given input md file, output html file
 */
mathjax_markdown.md_to_html = function(md_file_name, html_file_name, use_mathjax){
    if (use_mathjax === void 0)
        use_mathjax = true;

    var md_content = fs.readFileSync(md_file_name, 'utf8');
    var html_content = mathjax_markdown.html(md_content, use_mathjax);

    fs.writeFile(html_file_name, html_content, function(err){
        if (err){
            console.log(err);
        }
    });
};


/**
 * Given input md file, output pdf file
 * jsPDF doesn't have nodejs port
 */
mathjax_markdown.md_to_pdf = function(md_file_name, pdf_file_name, use_mathjax){
    console.log("Compiling to pdf");
    var md_content = fs.readFileSync(md_file_name, 'utf8');
    var html_content = mathjax_markdown.html(md_content, use_mathjax);

    // create pdf
    var pdf = new NodePDF(null, pdf_file_name, {
        "content": html_content,
        /*'viewportSize': {
            'width': 1440,
            'height': 900
        },*/
        'args': '--debug=true'
    });

    pdf.on('error', function(msg){
        console.log(msg);
    });

    pdf.on('done', function(pathToFile){
        console.log(pathToFile);
    });

    // listen for stdout from phantomjs
    pdf.on('stdout', function(stdout){
         // handle
    });

    // listen for stderr from phantomjs
    pdf.on('stderr', function(stderr){
        // handle
    });

};


if (typeof(module) !== "undefined")
    module.exports = mathjax_markdown;
