import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import AnimatedCard from '../../components/AnimatedCard';

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return { slug, ...matterResult.data };
  });
  return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default async function BlogIndex() {
  const allPostsData = await getPosts();

  return (
    <div className="agency-layout pt-32 pb-12">
      <h1 className="text-5xl font-bold font-mono text-center mb-12">// Intel Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPostsData.map(({ slug, title, date, excerpt }) => (
          <AnimatedCard key={slug}>
            <Link href={`/blog/${slug}`}>
              <div className="service-card h-full interactive-card">
                <p className="text-sm text-text-secondary font-mono">{new Date(date).toLocaleDateString()}</p>
                <h3 className="text-2xl text-accent-blue mt-2 mb-4">{title}</h3>
                <p className="text-text-secondary flex-grow">{excerpt}</p>
                <span className="launch-button mt-4">Read Article &rarr;</span>
              </div>
            </Link>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}