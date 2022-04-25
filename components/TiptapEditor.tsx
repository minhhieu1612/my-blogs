import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement, useEffect } from "react";
import { FaBold, FaCode, FaItalic, FaStrikethrough } from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import { GoListOrdered, GoListUnordered, GoQuote } from "react-icons/go";
import { BsCodeSquare } from "react-icons/bs";

type ActiveButtonType = {
  onClick: () => void;
  label: string | ReactElement;
  activeCondition?: boolean;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttons: ActiveButtonType[] = [
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      label: <FaBold />,
      activeCondition: editor.isActive("bold"),
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      label: <FaItalic />,
      activeCondition: editor.isActive("italic"),
    },
    {
      onClick: () => editor.chain().focus().toggleStrike().run(),
      label: <FaStrikethrough />,
      activeCondition: editor.isActive("strike"),
    },
    // {
    //   onClick: () => editor.chain().focus().unsetAllMarks().run(),
    //   label: <MdOutlineFormatClear />,
    // },
    {
      onClick: () => editor.chain().focus().setParagraph().run(),
      label: "P",
      activeCondition: editor.isActive("paragraph"),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      label: "h1",
      activeCondition: editor.isActive("heading", { level: 1 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      label: "h2",
      activeCondition: editor.isActive("heading", { level: 2 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      label: "h3",
      activeCondition: editor.isActive("heading", { level: 3 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      label: "h4",
      activeCondition: editor.isActive("heading", { level: 4 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      label: "h5",
      activeCondition: editor.isActive("heading", { level: 5 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      label: "h6",
      activeCondition: editor.isActive("heading", { level: 6 }),
    },
    {
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      label: <GoListUnordered />,
      activeCondition: editor.isActive("bulletList"),
    },
    {
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      label: <GoListOrdered />,
      activeCondition: editor.isActive("orderedList"),
    },
    {
      onClick: () => editor.chain().focus().toggleCode().run(),
      label: <FaCode />,
      activeCondition: editor.isActive("code"),
    },
    {
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      label: <BsCodeSquare />,
      activeCondition: editor.isActive("codeBlock"),
    },
    {
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      label: <GoQuote />,
      activeCondition: editor.isActive("blockquote"),
    },
    {
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      label: <MdHorizontalRule />,
    },
    // {
    //   onClick: () => editor.chain().focus().clearNodes().run(),
    //   label: <MdOutlineCleaningServices />,
    // },
    // {
    //   onClick: () => editor.chain().focus().setHardBreak().run(),
    //   label: <AiOutlineEnter />,
    // },
    // {
    //   onClick: () => editor.chain().focus().undo().run(),
    //   label: <ImUndo2 />,
    // },
    // {
    //   onClick: () => editor.chain().focus().redo().run(),
    //   label: <ImRedo2 />,
    // },
  ];

  return (
    <div className="border p-4 mt-4">
      {buttons.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`${
            item.activeCondition ? "text-primary-400 border-primary-400" : ""
          } p-2 border mr-2 mb-2 hover:text-primary-400 hover:border-primary-400`}
          style={
            (typeof item.label === "string" && {
              lineHeight: "16px",
              transform: "translateY(-2px)",
            }) ||
            {}
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export type TiptapEditorPropsType = {
  editable?: boolean;
  hasMenu?: boolean;
  content: string | JSON;
  getHTMLContent?: (data: string | JSONContent) => void;
  autofocus?: boolean;
  shorterContent?: boolean;
  className?: string;
};

const TiptapEditor: React.FC<TiptapEditorPropsType> = ({
  editable = false,
  getHTMLContent,
  content,
  autofocus = false,
  hasMenu = false,
  shorterContent = false,
  className = ''
}) => {
  const DEFAULT_OPTIONS = {
    autofocus,
    editable,
    injectCSS: false,
  };
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    ...DEFAULT_OPTIONS,
    onUpdate: ({ editor }) => {
      getHTMLContent && getHTMLContent(editor.getHTML());
    },
  });

  useEffect(() => {
    editor &&
      editor.setOptions &&
      editor.setOptions({ ...DEFAULT_OPTIONS, editable, autofocus });
  }, [editable, autofocus]);

  return (
    <div>
      {hasMenu && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className={`prose dark:prose-invert max-w-none ${shorterContent && 'max-h-16 overflow-hidden'} tiptap-editor ${className}`}
        placeholder='Type anything here...'
      />
    </div>
  );
};

export default TiptapEditor;
