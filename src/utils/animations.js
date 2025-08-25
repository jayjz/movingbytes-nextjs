// A simple sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// The animated typing function
export async function typeWrite(term, text, speed = 20) {
  for (const char of text) {
    term.write(char);
    await sleep(speed);
  }
}