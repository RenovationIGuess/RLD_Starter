function isLowerCase(string) {
  return /^[a-z]+$/.test(string);
}

function isUpperCase(string) {
  return /^[A-Z]+$/.test(string);
}

// Uppercase the first letter in a string if its a letter
const uppercaseStr = (str) => {
  // str.length === 1 && str.match(/[a-z]/i)
  if (str.charAt(0).toUpperCase() != str.charAt(0).toLowerCase()) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

// Tiptap specialties
// type could be JSON | HTML
const isContentEmpty = (content, type) => {
  if (content == null) return true;
  if (content === '') return true;
  if (type === 'json' && content === '{"type":"doc","content":[]}') return true;
  if (type === 'html' && content === '<p></p>') return true;
  return false;
};

function hideRandomChars(str) {
  const showCount = Math.ceil(str.length / 4);
  const indices = [];
  while (indices.length < showCount) {
    const randIndex = Math.floor(Math.random() * str.length);
    if (!indices.includes(randIndex)) {
      indices.push(randIndex);
    }
  }

  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (indices.includes(i)) {
      result += str[i];
    } else {
      result += '_';
    }
  }

  return result;
}

export default {
  isLowerCase,
  isUpperCase,
  uppercaseStr,
  isContentEmpty,
  hideRandomChars,
};
