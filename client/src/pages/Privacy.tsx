import { Shield } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect minimal information necessary to operate this website. This includes anonymous usage data (page views, click events) collected via our analytics provider, and vote data stored as anonymous device identifiers (no personal information is attached).",
  },
  {
    title: "2. Cookies",
    content: "We use essential cookies to maintain your session and remember your votes. We do not use third-party advertising cookies. You may disable cookies in your browser settings, though some features (such as voting) may not function correctly.",
  },
  {
    title: "3. Affiliate Links",
    content: "Some links on this website are affiliate links. If you click on an affiliate link and make a purchase, we may earn a small commission at no additional cost to you. We only recommend services and products we believe provide genuine value.",
  },
  {
    title: "4. Third-Party Services",
    content: "We use third-party services including Booking.com and WayAway for affiliate links. These services have their own privacy policies. We are not responsible for the privacy practices of these third parties.",
  },
  {
    title: "5. Data Retention",
    content: "Anonymous vote data is retained for the duration of the 2026 FIFA World Cup tournament (June 11 – July 19, 2026) and may be deleted thereafter. We do not sell or share any data with third parties.",
  },
  {
    title: "6. Contact",
    content: "If you have questions about this privacy policy, please contact us at privacy@hostcityhacks.com.",
  },
  {
    title: "7. Disclaimer",
    content: "This website is an independent fan-made guide and is not affiliated with, endorsed by, or sponsored by FIFA or any official World Cup organization. All trademarks and registered trademarks are the property of their respective owners.",
  },
];

export default function Privacy() {
  return (
    <div className="container py-10 md:py-16 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <Shield className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-semibold tracking-widest uppercase text-green-400">Privacy Policy</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: May 2026</p>
      </div>

      <div className="space-y-4">
        {sections.map(({ title, content }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5 card-glow">
            <h2 className="text-sm font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
