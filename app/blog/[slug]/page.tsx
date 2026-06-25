import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NzFooter, NzHeader } from "@/components/NzSite";
import { canonical, nzMarket } from "@/lib/nz";
import { absoluteUrl, breadcrumbSchema, jsonLd, site } from "@/lib/seo";

type Post = {
  title: string;
  description: string;
  date: string;
  sections: { heading: string; body: string[] }[];
  table?: string[][];
};

const posts: Record<string, Post> = {
  "best-quoting-software-nz": {
    title: "Best Quoting Software for NZ Tradies: Compared",
    description: "A practical comparison of quoting software for New Zealand tradies, including QuoteCore+, Tradify, Fergus, ServiceM8, Xero Projects, Buildxact, and Jobber.",
    date: "2026-06-22",
    table: [
      ["Tool", "Best for", "Watch-outs"],
      ["QuoteCore+", "Plan-based quoting, digital takeoff, approvals, materials ordering", "Best fit where quoting starts from plans or repeatable components"],
      ["Tradify", "Job management for NZ trade teams", "May be broader than needed if the main pain is takeoff and quote building"],
      ["Fergus", "Job costing, team workflow, trade admin", "Strong operations tool, but check fit for plan-based takeoff"],
      ["ServiceM8", "High-volume service and field jobs", "Less suited to complex plan-based estimating"],
      ["Xero Projects", "Xero-led project cost tracking", "Not a dedicated quoting workflow for trade takeoff"],
      ["Buildxact", "Builders and project estimating", "Can be more setup-heavy for small teams"],
      ["Jobber", "Service businesses and scheduling", "Check NZ trade fit and plan-based quoting needs"],
    ],
    sections: [
      { heading: "Quick answer", body: ["QuoteCore+ is best suited to NZ tradies who quote from plans, measurements, materials, labour, and repeatable job components. It is especially useful where takeoff, quote approval, materials ordering, and job information need to stay connected."] },
      { heading: "How to choose", body: ["Do not choose quoting software from a feature list alone. Start with how you quote today: plans, site notes, spreadsheets, quote templates, materials lists, customer approvals, and invoice-ready job information.", "Choose QuoteCore+ if you want the quote workflow itself to get cleaner. Choose a job management platform first if scheduling, dispatch, and timesheets are the bigger problem."] },
      { heading: "QuoteCore+", body: ["Best for: Kiwi tradies quoting from plans or repeatable components.", "Why it made the list: QuoteCore+ connects measurement, pricing, quote approval, materials ordering, and job information.", "Where it falls short: It may not be the best fit for purely reactive service teams that mainly need mobile dispatch.", "Pricing/trial: 14-day free trial, no card required. NZD checkout support should be confirmed before purchase.", "Choose it if: Your quotes involve plans, materials, labour, waste, and repeatable pricing logic.", "Do not choose it if: You only need a simple invoice template or dispatch board."] },
      { heading: "Other tools", body: ["Tradify and Fergus are strong NZ trade platforms for job admin and team workflows. ServiceM8 and Jobber can suit service businesses with repeat site visits. Xero Projects is useful when Xero-led cost tracking is the centre of the workflow. Buildxact is worth reviewing for builders who need more formal estimating and project tools.", "Always confirm current features, pricing, and trial terms on each vendor website before buying."] },
    ],
  },
  "best-roofing-quoting-software-nz": {
    title: "Best Roofing Quoting Software NZ: Compared for Contractors",
    description: "A practical comparison of roofing quoting software for New Zealand contractors, with guidance on plan-based takeoff, approvals, materials ordering, and job workflow.",
    date: "2026-06-22",
    table: [
      ["Tool", "Best for", "Not best for"],
      ["QuoteCore+", "Roofers quoting from plans with digital takeoff and materials workflow", "Small reactive repair work from photos only"],
      ["Tradify", "Trade teams needing job management and scheduling", "Specialist plan-based roofing takeoff"],
      ["Fergus", "Trade businesses focused on job costing and operations", "Teams wanting a dedicated roofing quote workflow first"],
      ["ServiceM8", "Mobile service work and dispatch", "Complex roof plan estimating"],
      ["Buildxact", "Builders and larger estimating workflows", "Small teams wanting a lightweight quote-first system"],
    ],
    sections: [
      { heading: "Quick answer", body: ["The best roofing quoting software depends on how the roofer quotes. QuoteCore+ is best suited to roofers who quote from plans and want digital takeoff, pricing, quote approval, materials ordering, and job workflow connected. Other tools may suit teams that mainly need scheduling, mobile dispatch, or accounting-led job admin."] },
      { heading: "What roofers should look for", body: ["Roofing quotes often need roof plans, digital takeoff, roof sections, pitch, flashings, waste allowances, labour rules, materials lists, approvals, and quote-to-job workflow. If those pieces live in separate tools, the admin multiplies."] },
      { heading: "QuoteCore+ fit", body: ["Choose QuoteCore+ if the problem is the roofing quote workflow itself: measuring from plans, applying pricing rules, presenting a professional quote, tracking accepted and declined quotes, and turning the result into materials ordering.", "Do not choose it if your roofing business mainly does small reactive repair jobs where mobile dispatch matters more than quoting from plans."] },
      { heading: "Last updated", body: ["Last updated: 22 June 2026. Vendor features and pricing can change, so check current vendor pages before purchasing."] },
    ],
  },
  "quotecore-plus-reviews-nz": {
    title: "QuoteCore+ Reviews NZ: Is It Legit and Who Is It For?",
    description: "A transparent NZ review-style guide explaining who leads QuoteCore+, who it suits, the free trial, trust signals, and who it is not for.",
    date: "2026-06-22",
    sections: [
      { heading: "Is QuoteCore+ legit?", body: ["QuoteCore+ is a real quoting software product operated by a New Zealand company. It has public product pages, contact details, privacy policy, terms, cookie policy, and a 14-day no-card trial."] },
      { heading: "Who leads it", body: ["QuoteCore+ is led by Shaun, a New Zealander with real roofing and construction experience. The QuoteCore+ team built the platform around the time wasted between measuring a job, pricing it, turning it into a professional quote, chasing approval, and organising materials."] },
      { heading: "Who it is for", body: ["QuoteCore+ is for tradies and contractors who quote from plans, measurements, materials, labour, waste, notes, and repeatable job components. It is especially useful for roofers and construction trades that want quote approval and materials ordering connected."] },
      { heading: "Who it is not for", body: ["It may not be the best fit if you only need simple invoices, mobile dispatch, or reactive service job scheduling. It is also early-stage, so teams needing deep enterprise controls should confirm requirements first."] },
      { heading: "Reviews and customer stories", body: ["No fake NZ reviews are used here. NZ customer stories should be added only when real, approved testimonials are available."] },
    ],
  },
  "built-by-a-new-zealand-roofer": {
    title: "Built From Kiwi Trade Experience: Why QuoteCore+ Exists",
    description: "The QuoteCore+ founder story: led by New Zealand roofing and construction experience, and built by the QuoteCore+ team to reduce quoting admin after the measure-up.",
    date: "2026-06-22",
    sections: [
      { heading: "Why QuoteCore+ exists", body: ["QuoteCore+ exists because quoting admin after the measure-up can become the slowest part of the job. Plans, notes, labour, materials, waste, pricing, customer approvals, and materials orders often get rebuilt across disconnected tools."] },
      { heading: "Led by trade experience", body: ["The product was shaped by Shaun's roofing and construction experience, then built by the QuoteCore+ team. Roofing was the starting point because it made the workflow pain obvious: takeoff, flashings, waste, quote presentation, approval, and materials all need to connect."] },
      { heading: "Why spreadsheets slow teams down", body: ["Spreadsheets can work when the business is small, but they become fragile when pricing rules, reusable components, customer approvals, and materials lists need to stay aligned."] },
      { heading: "The goal", body: ["QuoteCore+ connects measurement, quote building, customer approval, materials ordering, and job information so each quote does not start from scratch."] },
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | QuoteCore+ NZ`,
    description: post.description,
    alternates: { canonical: canonical(`/blog/${slug}`) },
  };
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl("/MainQCP.png"),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: nzMarket.locale,
    author: { "@type": "Organization", name: "QuoteCore+" },
    publisher: {
      "@type": "Organization",
      name: "QuoteCore+",
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: site.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${slug}`),
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  return (
    <>
      <Script id={`blog-schema-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogPostSchema)} />
      <Script id={`blog-breadcrumb-schema-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <main className="min-h-screen bg-white text-zinc-950">
        <NzHeader />
        <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <p className="text-sm text-zinc-400">{new Date(post.date).toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{post.description}</p>

          {post.table && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  {post.table.map((row, index) => (
                    <tr key={row.join("-")} className={index === 0 ? "bg-zinc-950 text-white" : "border-t border-zinc-200"}>
                      {row.map((cell) => <td key={cell} className="p-4 align-top">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="prose prose-zinc mt-12 max-w-none">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-[#FF6B35]/20 bg-[#FF6B35]/5 p-7">
            <p className="font-semibold">Ready to see it with your own workflow?</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="/free-trial" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6B35] px-6 text-sm font-semibold text-white hover:bg-[#e85d2b]">Start free trial</a>
              <a href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900">Contact us</a>
            </div>
          </div>
        </article>
        <NzFooter />
      </main>
    </>
  );
}
