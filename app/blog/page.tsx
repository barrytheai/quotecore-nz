import type { Metadata } from "next";
import { NzFooter, NzHeader } from "@/components/NzSite";
import { canonical } from "@/lib/nz";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "NZ Tradie Quoting Guides | QuoteCore+ NZ",
  description: "Guides for NZ tradies and contractors on quoting software, roofing estimating, contractor workflow, comparisons, templates, and the QuoteCore+ founder story.",
  alternates: { canonical: canonical("/blog") },
};

const groups = [
  {
    title: "NZ tradie quoting guides",
    posts: [{ href: "/blog/best-quoting-software-nz", title: "Best Quoting Software for NZ Tradies: Compared" }],
  },
  {
    title: "Roofing quoting software",
    posts: [{ href: "/roofing-quoting-software", title: "Roofing quoting software" }],
  },
  {
    title: "Contractor workflow",
    posts: [{ href: "/construction-quoting-software", title: "Construction quoting software" }],
  },
  {
    title: "Comparisons",
    posts: [{ href: "/blog/quotecore-plus-reviews-nz", title: "QuoteCore+ Reviews NZ: Is It Legit and Who Is It For?" }],
  },
  {
    title: "Quote templates and checklists",
    posts: [{ href: "/free-trial", title: "Try the QuoteCore+ workflow" }],
  },
  {
    title: "Founder story",
    posts: [{ href: "/blog/built-by-a-new-zealand-roofer", title: "Built From Kiwi Roofing Experience: Why QuoteCore+ Exists" }],
  },
];

const schema = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

export default function BlogIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main className="min-h-screen bg-white text-zinc-950">
        <NzHeader />
        <section className="bg-[linear-gradient(180deg,#fff_0%,#fff7f2_70%,#fff_100%)] px-6 py-20 text-center lg:px-8">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">NZ tradie quoting guides</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Practical guides for Kiwi tradies, roofing contractors, and small trade businesses that want cleaner quoting
          workflows.
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-2 lg:px-8">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold">{group.title}</h2>
            <div className="mt-5 space-y-3">
              {group.posts.map((post) => (
                <a key={post.href} href={post.href} className="block rounded-xl bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 hover:text-[#FF6B35]">
                  {post.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
        <NzFooter />
      </main>
    </>
  );
}
