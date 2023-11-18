export function encrypt(text, shift) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);

    if (char.match(/[a-zA-Z]/)) {
      let code = text.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }

    result += char;
  }

  return result;
}

export function decrypt(encryptedText, shift) {
  let result = "";

  for (let i = 0; i < encryptedText.length; i++) {
    let char = encryptedText.charAt(i);

    if (char.match(/[a-zA-Z]/)) {
      let code = encryptedText.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
    }

    result += char;
  }

  return result;
}
