import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/**
 * @docs https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html
 */
const RichTextEditor = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{ height: "600px" }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};
export default RichTextEditor;
