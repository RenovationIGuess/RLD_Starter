function isScrolledToBottom(element) {
  return element.scrollHeight - element.scrollTop === element.clientHeight;
}

export default {
  isScrolledToBottom,
};
