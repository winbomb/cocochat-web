import { FC, useEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useTranslation } from "react-i18next";

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
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import useUploadFile from "@/hooks/useUploadFile";
import { isDarkMode } from "@/utils";
import Button from "../styled/Button";

type Props = {
  updateDraft?: (draft: string) => void;
  initialValue: string;
  height: string;
  placeholder: string;
  sendMarkdown: (md: string) => void;
  setEditorInstance: () => void;
};
const MarkdownEditor: FC<Props> = ({
  updateDraft = null,
  initialValue = "",
  height = "50vh",
  placeholder,
  sendMarkdown,
  setEditorInstance
}) => {
  const { t } = useTranslation();
  const editorRef = useRef<Editor>();
  const { uploadFile } = useUploadFile();
  // const [pHolder, setPHolder] = useState(placeholder);
  useEffect(() => {
    const editor = editorRef?.current;
    if (editor) {
      const editorInstance = editor.getInstance();
      editorInstance.removeHook("addImageBlobHook");
      editorInstance.addHook("addImageBlobHook", async (blob, callback) => {
        const { thumbnail = "" } = (await uploadFile(blob)) || {};
        callback(thumbnail);
      });
      setEditorInstance(editorInstance);
    }
    return () => {
      if (editor) {
        const editorInstance = editor.getInstance();
        const md = editorInstance.getMarkdown();
        if (updateDraft) {
          updateDraft(md);
        }
        // console.log("mmmm", md);
        editorInstance.destroy();
      }
    };
  }, []);

  const send = () => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getInstance();
    const md = editor.getMarkdown().trim();
    if (md) {
      sendMarkdown(editor.getMarkdown());
      editor.reset();
    }
  };
  return (
    <div className="input md-editor">
      <Editor
        initialValue={initialValue}
        plugins={[ [codeSyntaxHighlight, { highlighter: Prism }] ]}
        placeholder={placeholder}
        ref={editorRef}
        toolbarItems={[]}
        hideModeSwitch={true}
        previewStyle="vertical"
        height={height}
        initialEditType="markdown"
        useCommandShortcut={true}
        theme={isDarkMode() ? "dark" : "light"}
      />
      <Button className="send small" onClick={send}>
        {t("action.send")}
      </Button>
    </div>
  );
};
export default MarkdownEditor;
// prosemirror-mode version error https://github.com/ueberdosis/tiptap/issues/577
