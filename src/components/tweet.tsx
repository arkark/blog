import { useState, useMemo } from "react";

export const Tweet = ({ html }) => {
  const [height, setHeight] = useState(120);

  const iframeRef = useMemo(() => {
    return (iframe: HTMLIFrameElement) => {
      const id = setInterval(() => {
        const innerHeight =
          iframe.contentDocument.documentElement?.scrollHeight;
        if (innerHeight && innerHeight !== height) {
          setHeight(innerHeight);
        }
      }, 30);
      return () => {
        clearInterval(id);
      };
    };
  }, [height]);

  return (
    <p style={{ textAlign: "center" }}>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        height={height}
        width="95%"
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </p>
  );
};
