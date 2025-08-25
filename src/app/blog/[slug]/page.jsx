import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({ slug: fileName.replace(/\.mdx$/, '') }));
}

async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { metadata: data, content };
}

export default async function BlogPost({ params }) {
  const { metadata, content } = await getPostData(params.slug);

  return (
    <>
      <Header />
      <article className="agency-layout pt-32 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold font-mono text-center text-accent-green !mb-4">{metadata.title}</h1>
          <p className="text-center text-text-secondary mb-12">
            Posted on {new Date(metadata.date).toLocaleDateString()}
          </p>
          <div className="prose prose-invert prose-lg max-w-none">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}