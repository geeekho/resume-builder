import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";
import { useEffect, useLayoutEffect } from "react";

interface EditorProps {
  content: {
    isGenerated: boolean;
    text: string;
  };
  placeholder?: string;
  onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: content.text,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    },
    [content],
  );

  useLayoutEffect(() => {
    if (content.isGenerated) editor.commands.setContent(content.text);
  }, [content]);

  if (!editor) return <></>;

  return (
    <div className="prose dark:prose-invert w-full max-w-none border border-input bg-background">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Editor;
