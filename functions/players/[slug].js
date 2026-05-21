/**
 * Cloudflare Pages Function — /players/:slug
 * Injects pSEO meta tags into the SPA HTML for Google crawlers.
 */

const PLAYER_META = {
  "guillermo-ochoa": {
    name: "Guillermo Ochoa",
    position: "Goalkeeper",
    club: "Salernitana",
    country: "Mexico",
    img: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=300&q=80",
    desc: "Guillermo Ochoa is Mexico's legendary World Cup goalkeeper. 148 caps, 5 World Cups. AI tactical breakdown, live match broadcast, and Supporter Kit gear.",
  },
  "edson-alvarez": {
    name: "Edson Álvarez",
    position: "Midfielder",
    club: "West Ham United",
    country: "Mexico",
    img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=300&q=80",
    desc: "Edson Álvarez is West Ham's midfield anchor and Mexico's defensive engine. 78 caps, Premier League ball-winner. AI tactical analysis and match info.",
  },
  "santiago-gimenez": {
    name: "Santiago Giménez",
    position: "Forward",
    club: "Feyenoord",
    country: "Mexico",
    img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&q=80",
    desc: "Santiago Giménez is Mexico's most prolific striker. 18 goals in 32 caps for El Tri. AI predicted Golden Boot contender.",
  },
  "ronwen-williams": {
    name: "Ronwen Williams",
    position: "Goalkeeper",
    club: "Mamelodi Sundowns",
    country: "South Africa",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    desc: "Ronwen Williams is South Africa's captain and #1 goalkeeper. Commanding Sundowns keeper. AI tactical profile and live match broadcast.",
  },
  "percy-tau": {
    name: "Percy Tau",
    position: "Forward",
    club: "Al Ahly",
    country: "South Africa",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    desc: "Percy Tau is South Africa's creative talisman. Al Ahly star and Bafana Bafana legend. AI tactical analysis and Supporter Kit gear.",
  },
};

export async function onRequest(context) {
  const { request, next, params } = context;
  const slug = params.slug;
  const meta = PLAYER_META[slug];

  // If slug not found, pass through to SPA
  if (!meta) {
    return next();
  }

  const response = await next();
  const html = await response.text();

  const title = `${meta.name} — 2026 World Cup Profile, Stats & AI Analysis | WorldCupHacks`;
  const canonical = `https://worldcuphacks.com/players/${slug}`;

  const injected = html
    .replace(
      "<title>2026 FIFA World Cup AI Predictor</title>",
      `<title>${title}</title>
<meta name="description" content="${meta.desc}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${meta.desc}" />
<meta property="og:image" content="${meta.img}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:type" content="profile" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${meta.desc}" />
<meta name="twitter:image" content="${meta.img}" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "${meta.name}",
  "jobTitle": "Professional Football Player",
  "affiliation": { "@type": "SportsTeam", "name": "${meta.country} National Team" },
  "description": "${meta.desc}"
}
</script>`
    );

  return new Response(injected, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}
