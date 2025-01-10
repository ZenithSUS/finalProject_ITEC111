const encryptColumnarCipher = (text, numColumns = 2) => {
    // Create an array to hold the columns
    let columns = new Array(numColumns).fill(''); 
  
    // Fill the columns with the characters from the text
    for (let i = 0; i < text.length; i++) {
      const columnIndex = i % numColumns; 
      columns[columnIndex] += text[i];
    }
  
    // Join the columns to form the ciphertext
    let ciphertext = columns.join('');
    return ciphertext;
  }

const decryptColumnarCipher = (ciphertext, numColumns = 2) => {
    // Calculate the number of rows
    const numRows = Math.ceil(ciphertext.length / numColumns);
  
    // Create an array to hold the rows
    let rows = new Array(numRows).fill('');
  
    // Fill the rows with the characters from the ciphertext
    let charIndex = 0;
    for (let col = 0; col < numColumns; col++) {
      for (let row = 0; row < numRows; row++) {
        if (charIndex < ciphertext.length) {
          rows[row] += ciphertext[charIndex];
          charIndex++;
        }
      }
    }
  
    // Join the rows to form the plaintext
    let plaintext = rows.join('');
    return plaintext;
  }
  