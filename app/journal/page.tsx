import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Journal | Luxury Travel Chronicles & Essays',
  description:
    'Editorial chronicles on unhurried travel, private temple access in Kyoto, and the future of conservation safaris.',
};

export default function JournalPage() {
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="eyebrow text-gold">The Six Wheels Journal</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-ivory leading-tight">
            Chronicles of Movement & Stillness
          </h1>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            Thoughtful essays, cultural explorations, and insider perspectives crafted by our
            editors, historians, and conservationists.
          </p>
        </div>

        {/* Featured Story Hero */}
        {featuredPost && (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-refined bg-charcoal/80 border border-gold/30 p-6 sm:p-10 shadow-luxury-md">
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-subtle overflow-hidden">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs text-stone">
                <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-light text-[10px] uppercase tracking-luxury font-semibold">
                  Featured Essay
                </span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-light leading-snug">
                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="hover:text-gold-light transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-ivory font-medium font-serif">
                  By {featuredPost.author.name}
                </span>

                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-subtle bg-gold text-navy text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105"
                >
                  <span>Read Chronicle</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Other Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-refined bg-charcoal/70 border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-subtle overflow-hidden">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone">
                  <span className="text-gold uppercase tracking-wider">{post.tags[0]}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl text-ivory font-light leading-snug hover:text-gold-light transition-colors">
                  <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-stone font-light leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-stone font-light">{post.author.name}</span>
                <Link
                  href={`/journal/${post.slug}`}
                  className="text-gold-light hover:text-gold font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1"
                >
                  <span>Read Story</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

