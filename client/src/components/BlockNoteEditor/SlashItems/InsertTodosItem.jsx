import React from 'react';
import { GoTasklist } from 'react-icons/go';

// Insert check box
const todos = (editor) => {
  const currentBlock = editor.getTextCursorPosition().block;

  // New block we want to insert.
  const todosBlock = {
    type: 'paragraph',
    content: [{ type: 'text', text: 'Todos', styles: { bold: true } }],
  };

  // Inserting the new block after the current one.
  editor.insertBlocks([todosBlock], currentBlock, 'after');
};

// Custom Slash Menu item which executes the above function.
const insertTodosItem = {
  name: 'Insert Todos',
  execute: todos,
  aliases: ['todos', 'tasklist'],
  group: 'Basic blocks',
  icon: <GoTasklist size={18} />,
  hint: 'Used to insert a task item.',
};

export default insertTodosItem;
