import React, { forwardRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// export default function DescEditor() {
//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createEmpty()
//   );

//   const onEditorStateChange = (editorState) => {
//     setEditorState(editorState);
//   };

//   const getDetail = () => {
//       return editorState.getCurrentContent();
//   }

//   return (
//     <>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={onEditorStateChange}
//         toolbarStyle={{
//             fontBold: 400
//         }}
//         editorStyle={{
//             border: '.1px solid #56546C',
//             minHeight: 200,
//             backgroundColor: '#F2F3F5',
//             paddingLeft: 10,
//             textAlign: '2em'
//         }}
//         placeholder="请输入..."
//       />
//     </>
//   );
// }

/* 父向子传递 ref 时， 子组件需要用 forwardRef 高阶函数包装一下，使得普通组件拥有 ref 特性 */
const DescEditor = forwardRef(() => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const getDetail = () => {
    return editorState.getCurrentContent();
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarStyle={{
          fontBold: 400,
        }}
        editorStyle={{
          border: ".1px solid #56546C",
          minHeight: 200,
          backgroundColor: "#F2F3F5",
          paddingLeft: 10,
          textAlign: "2em",
        }}
        placeholder="请输入..."
      />
    </>
  );
});

export default DescEditor;