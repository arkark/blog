hexo.extend.filter.register("markdown-it:renderer", function (md) {
  md.use(require("markdown-it-texmath"), {
    engine: require("katex"),
    delimiters: "dollars",
  });
});

hexo.extend.filter.register("after_render:html", function (html) {
  const linkTag =
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">';

  return html.replace(/(<\/head>)/i, linkTag + "$1");
});
