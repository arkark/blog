const containers = [
  {
    /*
      ::: webcard http://example.com
      :::
    */
    name: "webcard",
    options: {
      validate: (params) => params.trim().match(/^webcard\s+(.*)$/),
      render: (tokens, idx) => {
        const token = tokens[idx];
        const isOpening = token.nesting === 1;
        if (isOpening) {
          const m = token.info.trim().match(/^webcard\s+(.*)$/);
          return `
            <iframe
              class="hatenablogcard"
              scrolling="no"
              frameborder="0"
              style="display: block; width: 100%; height: 155px; max-width: 500px;"
              src="https://hatenablog-parts.com/embed?url=${encodeURIComponent(m[1])}">
            </iframe>
            <!--
          `;
        } else {
          return "-->"
        }
      },
    },
  }
]

hexo.extend.filter.register("markdown-it:renderer", function(md) {
  containers.forEach(c => md.use(
    require("markdown-it-container"),
    c.name,
    c.options,
  ));
});
