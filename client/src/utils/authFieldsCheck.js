function validateEmail(inputText) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function validateUrl(inputText) {
  if (!inputText) {
    return false; // inputText is empty
  }

  try {
    new URL(inputText);
    return true; // inputText is a valid URL
  } catch (_) {
    return false; // inputText is not a valid URL
  }
}

function validateYouTubeUrl(inputText) {
  if (!inputText) {
    return false; // inputText is empty
  }

  try {
    const url = new URL(inputText);
    const host = url.host;
    const youtubeRegex = /^(www\.)?youtube\.com|youtu\.be$/;

    if (host.match(youtubeRegex)) {
      return true; // inputText is a valid YouTube URL
    } else {
      return false; // inputText is not a valid YouTube URL
    }
  } catch (_) {
    return false; // inputText is not a valid URL
  }
}

export default {
  validateEmail,
  validateUrl,
  validateYouTubeUrl,
};
