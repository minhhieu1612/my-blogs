import React, { useEffect, useRef, useState } from "react";
import { EditorBlockPropsType } from "./index.type";
import { createReactEditorJS } from "react-editor-js";
import { ClientEditorCore } from "@react-editor-js/client/dist/client/src/client-editor-core";

const ReactEditorJS = createReactEditorJS();
const REACT_EDITOR_HOLDER_ID = "ssrHolder";

const EditorBlock = ({ content }: EditorBlockPropsType) => {
  let editorInstance;
  const [tools, setTools] = useState<any>();
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
      setTools(importedTools.EDITOR_JS_TOOLS);
    })();
    // console.log(EditorJS);
  }, []);

  if (!tools) {
    return <>Loading....</>;
  }

  return (
    <ReactEditorJS
      holder={REACT_EDITOR_HOLDER_ID}
      instanceRef={(instance: any) => (editorInstance = instance)}
      tools={tools}
      defaultValue={initialValue}
      placeholder="write something here..."
      onInitialize={(currentEditor: ClientEditorCore) =>
        console.log(currentEditor)
      }
    />
  );
};

export default EditorBlock;
