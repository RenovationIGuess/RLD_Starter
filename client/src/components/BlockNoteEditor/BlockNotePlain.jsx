import React, { useEffect } from 'react';
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import '@blocknote/core/style.css';
import insertTodosItem from './SlashItems/InsertTodosItem';
import insertEmojiItem from './SlashItems/InsertEmojiItem';
import uploadFile from '~/firebase/uploadFile';

// List containing all default Slash Menu Items, as well as our custom one.
const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems(),
  insertTodosItem,
  insertEmojiItem,
];

// This will be use to create something instead like editing note
const BlockNotePlain = ({
  data,
  field,
  setData,
  editable = true,
  theme = 'light',
}) => {
  const editor = useBlockNote({
    editable,
    // initialContent: html,
    onEditorContentChange: async (editor) => {
      const contentJSON = JSON.stringify(editor.topLevelBlocks, null, 2);
      // const contentHTML = await editor.blocksToHTML(editor.topLevelBlocks);

      setData(contentJSON);
    },
    // onEditorReady: async (editor) => {
    //   const blocks = await editor.HTMLToBlocks(data[field]);
    //   editor.replaceBlocks(editor.topLevelBlocks, blocks);
    // },
    // onTextCursorPositionChange: (editor) => {
    //   const selection = editor.getSelection();
    // },
    uploadFile: (file) => uploadFile(file),
    slashMenuItems: customSlashMenuItemList,
  });

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const blocks = await editor.HTMLToBlocks(data[field]);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
  }, [editor, data.id]);

  return (
    <>
      <BlockNoteView editor={editor} theme={theme} />
    </>
  );
};

export default BlockNotePlain;
