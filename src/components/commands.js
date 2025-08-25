let projectCache = null;

export const commands = {
  help: {
    description: 'Lists all available commands.',
    execute: async (updateOutput) => {
      const commandList = Object.entries(commands).map(([name, { description }]) => {
        const commandName = name.padEnd(10, ' ');
        return `  \x1b[32m${commandName}\x1b[0m - ${description}`;
      }).join('\r\n');
      updateOutput('\r\n\x1b[36mAvailable commands:\x1b[0m\r\n' + commandList);
    },
  },
  about: {
    description: 'Displays information about me.',
    execute: async () => `\r\n
\x1b[1;36m## About Me ##\x1b[0m\r\n
I’m a Bachelor's student in Management Information Systems
specializing in AI, cybersecurity, and secure-by-design
development. I build tools that merge offensive security insight
with defensive resilience.\r\n
Fluent in: \x1b[33mPython, FastAPI, Rust, React, Next.js, TypeScript,\x1b[0m and ML frameworks.\r\n`,
  },
  projects: {
    description: 'Fetches and lists my projects from GitHub.',
    execute: async (updateOutput) => {
      updateOutput('\r\n\x1b[36mContacting GitHub API...\x1b[0m');
      try {
        const res = await fetch('https://api.github.com/users/ForDaCulture/repos?sort=pushed&per_page=8');
        if (!res.ok) throw new Error('Failed to fetch from GitHub');
        const repos = (await res.json()).filter(repo => repo.name !== 'ForDaCulture'); // Filter out the profile repo
        projectCache = repos;

        let projectList = '\r\n\r\n\x1b[32mLatest Projects:\x1b[0m';
        repos.slice(0, 7).forEach((repo, index) => {
          projectList += `\r\n  \x1b[90m[${index + 1}]\x1b[0m \x1b[33m${repo.name}\x1b[0m - ${repo.description || 'No description'}`;
        });
        projectList += '\r\n\r\nUse `open <number>` to view a project repo.';
        updateOutput(projectList);
      } catch (error) {
        updateOutput(`\r\n\x1b[31mError: ${error.message}\x1b[0m`);
      }
    },
  },
  open: {
    description: "Opens a project's GitHub repo. Usage: open <number>",
    execute: async (updateOutput, args) => {
      if (!projectCache) return '\r\n\x1b[33mPlease run `projects` first to fetch project data.\x1b[0m';
      const n = parseInt(args[0], 10);
      if (isNaN(n) || n < 1 || n > projectCache.length) return '\r\n\x1b[31mError: Invalid project number.\x1b[0m';
      
      const url = projectCache[n - 1].html_url;
      window.open(url, '_blank');
      return `\r\n\x1b[32mOpening ${url} in a new tab...\x1b[0m`;
    },
  },
  scan: {
    description: 'Simulates scanning my profile for key skills.',
    execute: async (updateOutput) => {
      // UPDATED: Skills now align with your resume for consistency
      const skills = [
        { name: 'Penetration Testing & OSINT', details: 'Identified multiple simulated attack vectors.' },
        { name: 'Full-Stack Proficiency (Rust, Python, React)', details: 'Detected secure, end-to-end application architecture.' },
        { name: 'DevOps & Cloud Security (AWS, Docker, K8s)', details: 'Verified hardened CI/CD pipeline configurations.' },
      ];
      updateOutput('\r\n\x1b[36mScanning profile...\x1b[0m');
      for (const skill of skills) {
        await new Promise(resolve => setTimeout(resolve, 600));
        updateOutput(`\r\n[\x1b[32mFOUND\x1b[0m] ${skill.name}: \x1b[90m${skill.details}\x1b[0m`);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
      updateOutput('\r\n\r\n\x1b[32mScan Complete. System secure. Skills verified.\x1b[0m');
    },
  },
  clear: { description: 'Clears the terminal screen.', execute: () => 'clear' },
  exit: { description: 'Exits the terminal and returns to the GUI.', execute: () => 'exit' }
};