import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data';
import { WheelEmblem } from '@/components/brand/WheelEmblem';
import { ArrowLeft, ArrowRight, Clock, User, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | SIX WHEELS HOLIDAYS`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: [{ url: post.coverImage }],
    },
  };
}

export default function JournalArticlePage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id);

  return (
    <article className="pt-28 sm:pt-36 pb-28 bg-navy min-h-screen text-ivory">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-stone border-b border-white/10 pb-4">
          <Link
            href="/journal"
            className="hover:text-gold transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Return to The Journal</span>
          </Link>
          <span className="text-gold-light uppercase tracking-wider">{post.tags[0]}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-xs text-stone">
            <span>{post.publishDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-gold" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
            {post.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-gold-light/90 italic font-light max-w-2xl mx-auto">
            &ldquo;{post.subtitle}&rdquo;
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div className="text-left text-xs">
              <span className="font-serif text-ivory font-medium block">{post.author.name}</span>
              <span className="text-stone">{post.author.role}</span>
            </div>
          </div>
        </div>

        {/* Lead Hero Image */}
        <div className="relative aspect-[16/9] rounded-refined overflow-hidden border border-gold/30 shadow-luxury-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Sections */}
        <div className="prose prose-invert max-w-2xl mx-auto space-y-8 text-stone leading-relaxed font-light text-sm sm:text-base">
          <p className="font-serif text-xl sm:text-2xl text-ivory font-normal leading-relaxed italic border-l-2 border-gold pl-5 py-1">
            {post.excerpt}
          </p>

          {post.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light pt-4 border-t border-white/5">
                  {sec.heading}
                </h2>
              )}
              <p className="text-ivory/85 leading-relaxed">{sec.body}</p>

              {sec.image && (
                <div className="my-6 space-y-2">
                  <div className="relative aspect-[16/10] rounded-subtle overflow-hidden border border-white/10">
                    <Image
                      src={sec.image}
                      alt={sec.imageCaption || 'Journal illustration'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {sec.imageCaption && (
                    <p className="text-center text-[11px] text-stone italic">
                      {sec.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section Divider with Six-Spoke Wheel Motif */}
        <div className="flex items-center justify-center gap-4 py-8 max-w-md mx-auto">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <WheelEmblem size={24} color="#B57C51" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Related Stories */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-white/10 space-y-6">
            <h3 className="font-serif text-2xl text-ivory font-light text-center">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/journal/${rel.slug}`}
                  className="p-5 rounded-refined bg-charcoal/80 border border-white/10 hover:border-gold/40 transition-colors flex items-center gap-4 group"
                >
                  <div className="relative w-24 h-20 rounded-subtle overflow-hidden shrink-0">
                    <Image src={rel.coverImage} alt={rel.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1 truncate">
                    <span className="text-[10px] text-gold uppercase tracking-wider block">
                      {rel.tags[0]}
                    </span>
                    <h4 className="font-serif text-base text-ivory group-hover:text-gold-light transition-colors truncate">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-stone block">{rel.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

