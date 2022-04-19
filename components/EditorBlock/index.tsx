import React, { useEffect, useRef, useState } from "react";
import { EditorBlockPropsType } from "./index.type";
// import { createReactEditorJS } from "react-editor-js";
import dynamic, { DynamicOptions } from "next/dynamic";

// const ReactEditorJS = createReactEditorJS();
const ReactEditorJS = dynamic(
  (() => import("react-editor-js")) as DynamicOptions,
  { ssr: false }
) as any;
const REACT_EDITOR_HOLDER_ID = "ssrHolder";

const EditorBlock = ({ content }: EditorBlockPropsType) => {
  let editorInstance;
  // const [tools, setTools] = useState<any>();
  const [loadedEditor, setLoadedEditor] = useState(false);
  const tools = useRef<any>();
  const initialValue = content || {
    time: 1635603431943,
    blocks: [
      {
        id: "sheNwCUP5A",
        type: "header",
        data: {
          text: "Editor.js",
          level: 2,
        },
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const importedTools = await import("./editorTools");
      tools.current = importedTools.EDITOR_JS_TOOLS;
      setLoadedEditor(true);
    })();
    // console.log(EditorJS);
  }, []);

  if (!tools.current) {
    return <>Loading....</>;
  }

  console.log("render Editor");

  return (
    <ReactEditorJS
      // holder={REACT_EDITOR_HOLDER_ID}
      instanceRef={(instance: any) => (editorInstance = instance)}
      tools={tools}
      defaultValue={initialValue}
      placeholder="write something here..."
      // onInitialize={(currentEditor: ClientEditorCore) =>
      //   console.log('currentEditor: ',currentEditor)
      // }
    />
  );
};

export default EditorBlock;
