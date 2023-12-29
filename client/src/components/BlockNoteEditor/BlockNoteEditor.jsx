import React, { useCallback, useEffect, useState } from 'react';
import {
  BlockNoteView,
  useBlockNote,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import '@blocknote/core/style.css';
import { cn } from '~/utils';
import axiosClient from '~/axios';
import { debounce } from 'lodash';
import useNoteStore from '~/store/useNoteStore';
import insertTodosItem from './SlashItems/InsertTodosItem';
import insertEmojiItem from './SlashItems/InsertEmojiItem';

// List containing all default Slash Menu Items, as well as our custom one.
const customSlashMenuItemList = [
  ...getDefaultReactSlashMenuItems(),
  insertTodosItem,
  insertEmojiItem,
];

const BlockNoteEditor = ({ data, setData, editable }) => {
  const [setSaveContentLoading] = useNoteStore((state) => [
    state.setSaveContentLoading,
  ]);

  const editor = useBlockNote({
    editable,
    // initialContent: html,
    onEditorContentChange: async (editor) => {
      const contentJSON = JSON.stringify(editor.topLevelBlocks, null, 2);
      const contentHTML = await editor.blocksToHTML(editor.topLevelBlocks);

      // setData({
      //   ...data,
      //   content_json: contentJSON,
      //   content_html: contentHTML,
      // });

      // debouncedSave(contentJSON, contentHTML);
    },
    onEditorReady: async (editor) => {
      const blocks = await editor.HTMLToBlocks(data.content_html);
      // console.log(blocks);
      editor.replaceBlocks(editor.topLevelBlocks, blocks);
    },
    slashMenuItems: customSlashMenuItemList,
  });

  useEffect(() => {
    if (editor) {
      const getBlocks = async () => {
        const blocks = await editor.HTMLToBlocks(data.content_html);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
  }, [editor, data.id]);

  // console.log(html);

  const debouncedSave = useCallback(
    debounce((contentJSON, contentHTML) => {
      setSaveContentLoading(true);
      axiosClient
        .patch(`/notes/${data.id}/content`, {
          content_html: contentHTML,
          content_json: contentJSON,
        })
        .catch((error) => console.error('Error saving note content:', error))
        .finally(() => setSaveContentLoading(false));
    }, 1000),
    [data.id]
  );

  return (
    <div className="editor-container">
      <div className="blocknote-frame">
        <div className="blocknote-scroller">
          <div
            className={cn(
              'tiptap-editor-layout'
              // 'tiptap-editor-layout--wide'
            )}
          >
            <div className="tiptap-editor-layout__content pt-6">
              <BlockNoteView editor={editor} theme={'light'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockNoteEditor;
