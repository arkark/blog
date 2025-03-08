// From `npm run swizzle @docusaurus/theme-classic MDXComponents/A`

import React, { type ReactNode, type PropsWithChildren } from "react";
import A from "@theme-original/MDXComponents/A";
import type AType from "@theme/MDXComponents/A";
import type { WrapperProps } from "@docusaurus/types";

type Props = PropsWithChildren<WrapperProps<typeof AType>>;

export default function AWrapper(props: Props): ReactNode {
  const isUrl =
    typeof props.children === "string" && /^https?:\/\//.test(props.children);

  return <A {...props} style={{ wordBreak: isUrl && "break-all" }} />;
}
