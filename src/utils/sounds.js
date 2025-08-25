import { Howl } from 'howler';

// Ensure you have these sound files in your `public/sounds/` folder
const keypressSound = new Howl({ src: ['/sounds/keypress.wav'], volume: 0.3 });
const successSound = new Howl({ src: ['/sounds/success.wav'], volume: 0.5 });
const errorSound = new Howl({ src: ['/sounds/error.wav'], volume: 0.4 });

// Export functions to be called from anywhere in the app
export const playKeypress = () => keypressSound.play();
export const playSuccess = () => successSound.play();
export const playError = () => errorSound.play();