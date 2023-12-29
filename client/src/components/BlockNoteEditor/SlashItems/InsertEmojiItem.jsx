import React from 'react';
import { MdEmojiEmotions } from 'react-icons/md';

// Insert check box
const emoji = (editor) => {
  const currentBlock = editor.getTextCursorPosition().block;

  // New block we want to insert.
  const emojiBlock = {
    type: 'paragraph',
    content: [{ type: 'text', text: 'Emoji', styles: { bold: true } }],
  };

  // Inserting the new block after the current one.
  editor.insertBlocks([emojiBlock], currentBlock, 'after');
};

// Custom Slash Menu item which executes the above function.
const insertEmojiItem = {
  name: 'Insert Emoji',
  execute: emoji,
  aliases: ['emoji', 'icon'],
  group: 'Inline blocks',
  icon: <MdEmojiEmotions size={18} />,
  hint: 'Used to insert an emoji.',
};

export default insertEmojiItem;
