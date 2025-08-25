import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { commands } from './commands.js';
import { playKeypress, playSuccess, playError } from '../utils/sounds';

const initialBanner = `
\x1b[31m
 /-------------------------------------\\\r\n
|   | |\\ | |   / \\   \\  / |   v1.0   |\r\n
|   | | \\| |  / _ \\   \\/  |          |\r\n
|   | |  | | / ___ \\  /\\  |          |\r\n
|   |_|  |_|/_/   \\_\\/  \\ |   \\[HAX] |\r\n
 \\-------------------------------------/\r\n
\x1b[0m
\r\n
Welcome to the \x1b[36mHAX Terminal\x1b[0m.
Type '\x1b[33mhelp\x1b[0m' for a list of available commands.
\r\n
`;

const promptText = '\r\n\x1b[1;32mjustins\x1b[1;33m@\x1b[1;36mmovingbytes\x1b[0m:\x1b[1;33m~$\x1b[0m ';

export default function Terminal() {
  const containerRef = useRef(null);
  const termRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (termRef.current || !containerRef.current) {
      return;
    }

    const term = new XTerm({
      cursorBlink: true, fontSize: 14, fontFamily: '"Fira Code", monospace',
      theme: { background: '#0d1117', foreground: '#c9d1d9', cursor: '#58a6ff' },
    });
    termRef.current = term;

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // All terminal setup is now inside this timeout to ensure the DOM is ready
    setTimeout(() => {
      console.log("DEBUG: Initializing terminal...");
      term.open(containerRef.current);
      
      let currentInput = '';
      let cmdHistory = [];
      let historyIndex = -1;

      const execute = async (cmd) => {
        cmd = cmd.trim();
        if (!cmd) { term.prompt(); return; }
        if (cmd !== cmdHistory[0]) cmdHistory.unshift(cmd);
        historyIndex = -1;
        if (cmd !== 'clear') navigate(`/${cmd.split(' ')[0]}`);
        
        const [commandName, ...args] = cmd.split(' ');
        if (Object.keys(commands).includes(commandName)) {
          playSuccess();
          await commands[commandName].execute(term, args);
        } else {
          playError();
          term.write(`\r\n\x1b[31mCommand not found: ${commandName}\x1b[0m`);
        }
        term.prompt();
      };

      term.onKey(({ key, domEvent }) => {
        playKeypress();
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
        if (domEvent.key === 'Enter') { execute(currentInput); currentInput = ''; }
        else if (domEvent.key === 'Backspace') {
          if (currentInput.length > 0) { currentInput = currentInput.slice(0, -1); term.write('\b \b'); }
        } else if (domEvent.key === 'ArrowUp' || domEvent.key === 'ArrowDown') {
            let newCmd = '';
            if (domEvent.key === 'ArrowUp' && historyIndex < cmdHistory.length - 1) historyIndex++;
            else if (domEvent.key === 'ArrowDown' && historyIndex > 0) { historyIndex--; } 
            else if (domEvent.key === 'ArrowDown') { historyIndex = -1; }
            
            newCmd = historyIndex >= 0 ? cmdHistory[historyIndex] : '';
            term.write(`\x1b[2K\r${promptText.trim()}${newCmd}`);
            currentInput = newCmd;
        } else if (printable) { currentInput += key; term.write(key); }
      });

      term.prompt = () => term.write(promptText);
      
      console.log("DEBUG: Writing initial banner.");
      term.write(initialBanner);
      
      const commandFromUrl = location.pathname.slice(1);
      if (commandFromUrl && Object.keys(commands).includes(commandFromUrl)) {
        console.log(`DEBUG: Executing command from URL: ${commandFromUrl}`);
        execute(commandFromUrl);
      } else {
        console.log("DEBUG: Displaying initial prompt.");
        term.prompt();
      }

      fitAddon.fit();
      console.log("DEBUG: Terminal setup complete.");
    }, 0);

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (termRef.current) {
        termRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}