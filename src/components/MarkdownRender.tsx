import { FC, useRef, useEffect, useState } from "react";

import "prismjs/themes/prism.css";
// @ts-ignore - prismjs has no type declarations
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
//@ts-ignore

import { isDarkMode } from "../utils";
import ImagePreview from "./ImagePreview";

// 检测内容是否包含数学公式
const hasMath = (content: string) => /\$[^\$]+\$/.test(content) || /\$\$/.test(content);

interface IProps {
  cleanMode?: boolean;
  content: string;
}
const MarkdownRender: FC<IProps> = ({ content, cleanMode = false }) => {
  const mdContainer = useRef<HTMLDivElement | null>(null);
  const [katexPlugin, setKatexPlugin] = useState<any>(null);

  useEffect(() => {
    // 只在内容包含数学公式时才加载 katex
    if (hasMath(content)) {
      import("./MarkdownRender/katexPlugin").then((mod) => {
        setKatexPlugin(mod.default);
      });
    }
  }, [content]);

  useEffect(() => {
    if (mdContainer.current) {
      const links = mdContainer.current.querySelectorAll("a");
      [...links].forEach((link) => {
        link.setAttribute("target", "_blank");
      });
    }
  }, [mdContainer]);

  const plugins = [[codeSyntaxHighlight, { highlighter: Prism }], ...(katexPlugin ? [katexPlugin] : [])];

  if (cleanMode)
    return <Viewer initialValue={content} plugins={plugins} theme={isDarkMode() ? "dark" : "light"}></Viewer>;
  return (
    <>
      <ImagePreview container={mdContainer.current} context="markdown" />
      <div ref={mdContainer} id="MARKDOWN_CONTAINER">
        <Viewer
          initialValue={content}
          plugins={plugins}
          theme={isDarkMode() ? "dark" : "light"}
        ></Viewer>
      </div>
    </>
  );
};

export default MarkdownRender;