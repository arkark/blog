import { $, fs, path } from "zx";

const blogTitle = process.argv[2];
if (!blogTitle) {
  console.log("Usage: npm run new <blog title>");
  process.exit(1);
}

const dir = path.join(
  "./blog",
  `${(await $`date +"%Y-%m-%d"`).stdout.trim()}-${blogTitle}`
);
await fs.mkdir(dir);

const index = path.join(dir, "index.md");
const markdown = `
---
title: ${blogTitle}
description: TODO
tags:
  - ctf
image: ./TODO
---

import {Tweet} from "@site/src/components/tweet";

TODO

<!-- truncate -->

TODO
`.trimStart();
await fs.writeFile(index, markdown);

const img = path.join(dir, "img");
await fs.mkdir(img);

console.log(`=> ${index}`);
