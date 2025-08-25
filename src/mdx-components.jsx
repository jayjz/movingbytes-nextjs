// mdx-components.jsx
export function useMDXComponents(components) {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-bold font-mono text-accent-green mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold font-mono text-accent-blue mt-8 mb-4">{children}</h2>,
    p: ({ children }) => <p className="text-lg text-text-secondary mb-4 text-left leading-relaxed">{children}</p>,
    a: ({ children, ...props }) => <a {...props} className="text-accent-green hover:underline">{children}</a>,
    ul: ({ children }) => <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">{children}</ul>,
    pre: ({ children }) => <pre className="bg-bg-secondary p-4 rounded-lg border border-border overflow-x-auto my-4">{children}</pre>,
    code: ({ children }) => <code className="font-mono text-sm bg-bg-secondary p-1 rounded-md text-accent-green">{children}</code>,
    ...components,
  }
}