/**
 * ============================================================================
 *  PORTFOLIO CONFIGURATION — Kabindra Maharjan (real details)
 *  Replace the old config.js in the portfolio-2d folder with this file.
 * ============================================================================
 */

window.PORTFOLIO_CONFIG = {
  // 1. THEME & DESIGN PRESET
  theme: {
    preset: "midnight", // "midnight" | "daylight" | "emerald" | "sunset"
    defaultMode: "dark", // "dark" or "light"
    accentColor: "#F97316", // Primary accent (orange)
    secondaryColor: "#22D3EE", // Secondary accent
    tertiaryColor: "#FB7185", // Highlight accent
  },

  // 2. PERSONAL INFO & HERO
  profile: {
    brandMark: "KM",
    name: "Kabindra Maharjan",
    role: "Graphic Designer & Video Editor",
    tagline:
      "I design posters, brand creatives and daily video content that people actually stop scrolling for.",
    availability: "Available for freelance projects",
    location: "Kathmandu, Nepal",
    email: "mahkabindra@gmail.com",
    resumeUrl: "#",
    avatarInitials: "KM",
    avatarImage: "", // Optional image path/URL; leave empty for 2D vector illustration
    socials: [
      { label: "YouTube", url: "https://www.youtube.com/@kabindramaharjan2622", icon: "youtube" },
      { label: "TikTok", url: "https://www.tiktok.com/@kabindra43", icon: "tiktok" },
      { label: "Gaming Channel", url: "https://www.youtube.com/@RagedbajeNP", icon: "youtube" },
    ],
  },

  // 3. ABOUT & QUICK STATS
  about: {
    heading: "Posters, brands and videos — designed to be noticed.",
    paragraphs: [
      "I'm a graphic designer and video editor based in Kathmandu, Nepal. I create festival posters, real-estate marketing designs and remittance brand creatives for clients in Nepal and Australia.",
      "On the video side, I run a daily Nepali news series and produce emotional story videos and short-form content across TikTok, YouTube and Facebook — from concept and design to edit and publish.",
    ],
    stats: [
      { value: "4K+", label: "Facebook Followers" },
      { value: "2", label: "YouTube Channels" },
      { value: "50+", label: "Designs & Videos Made" },
      { value: "Daily", label: "News Video Series" },
    ],
  },

  // 4. SKILLS (Categories: "Design", "Video", "Tools")
  skills: [
    { name: "Poster & Social Media Design", level: 92, category: "Design" },
    { name: "Adobe Photoshop", level: 90, category: "Design" },
    { name: "Canva", level: 90, category: "Design" },
    { name: "Adobe Illustrator", level: 84, category: "Design" },
    { name: "Figma", level: 80, category: "Design" },
    { name: "Video Editing (CapCut)", level: 90, category: "Video" },
    { name: "YouTube Shorts & Reels", level: 88, category: "Video" },
    { name: "Thumbnail Design", level: 86, category: "Video" },
    { name: "AI Design & Video Tools", level: 85, category: "Tools" },
    { name: "Social Media Content", level: 82, category: "Tools" },
  ],

  // 5. EXPERIENCE & EDUCATION TIMELINE
  experience: [
    {
      period: "Ongoing",
      role: "Graphic Designer",
      company: "Freelance & Remote Clients",
      type: "Freelance",
      description:
        "Festival posters, interior-design educational posters (MarkQ Homes, Australia), remittance brand creatives and event posters for clients in Nepal and abroad.",
    },
    {
      period: "Ongoing",
      role: "Video Editor & Content Creator",
      company: "Own Channels — YouTube, TikTok, Facebook",
      type: "Content",
      description:
        "Daily Nepali news video series 'Aajaka 5 Thula Khabar', emotional story videos, motivational content and the 'Kabi Gaming' Mobile Legends channel.",
    },
  ],

  // 6. PROJECTS SHOWCASE
  projects: [
    {
      id: "proj-1",
      title: "MarkQ Homes Poster Series",
      category: "Design",
      year: "2026",
      color: "#E87722",
      image: "",
      summary:
        "Interior-design educational posters for an Australian home builder — lighting rules, luxury details and more.",
      description:
        "A consistent poster series designed in Figma for MarkQ Homes (Queensland, Australia): clean layouts, strong headline hierarchy and one brand system across every poster — including the '3-Layer Lighting Rule' and 'Luxury is in the details' editions.",
      tags: ["Figma", "Poster Design", "Branding"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: "proj-2",
      title: "Email Template Pack",
      category: "Design",
      year: "2026",
      color: "#0EA5E9",
      image: "",
      summary:
        "Five ready-to-use email templates for small brands — honey, coffee, skincare, fitness and fashion.",
      description:
        "A starter pack of five marketing email designs, each with its own brand look: Himali Madhu (honey), Himal Brew (coffee), Kumari Glow (skincare), Himal Power (fitness) and Kathmandu Threads (fashion) — hero sections, product blocks, offers and footers.",
      tags: ["Email Design", "Marketing", "Layout"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: "proj-3",
      title: "Nepal Festival Sydney Poster",
      category: "Design",
      year: "2026",
      color: "#10B981",
      image: "",
      summary:
        "Event poster with full sponsor branding for a Nepali festival in Sydney, Australia.",
      description:
        "Festival event poster designed with real sponsor logos and title-sponsor placement (MarkQ Homes / Nepal Festival), keeping the client's original wording and a clean black-and-brand-colour system.",
      tags: ["Event Poster", "Print Design", "Branding"],
      liveUrl: "#",
      repoUrl: "#",
    },
    {
      id: "proj-4",
      title: "Aajaka 5 Thula Khabar — Daily News Videos",
      category: "Video",
      year: "2026",
      color: "#EC4899",
      image: "",
      summary:
        "A daily Nepali news video series for TikTok, YouTube Shorts and Facebook Reels.",
      description:
        "Every morning: a newspaper-style motion-card roundup of the day's 5 biggest Nepal stories, plus a photo-top single-story video — original graphics, soft cinematic music and copyright-safe rewritten facts.",
      tags: ["Video Editing", "CapCut", "Motion Graphics"],
      liveUrl: "https://www.youtube.com/@kabindramaharjan2622",
      repoUrl: "#",
    },
  ],

  // 7. SERVICES / WHAT I DO
  services: [
    {
      title: "Poster & Social Media Design",
      icon: "layers",
      description:
        "Festival posters, business creatives and social media designs with a clean, professional finish.",
    },
    {
      title: "Video Editing & Short-Form Content",
      icon: "sparkles",
      description:
        "Shorts, Reels and TikTok videos — news, stories and promos — edited for watch time and shares.",
    },
    {
      title: "Email & Marketing Design",
      icon: "sparkles",
      description:
        "Email templates, banners and campaign creatives that match your brand and drive clicks.",
    },
  ],

  // 8. FOOTER
  footer: {
    note: "Designed & edited with pride in Kathmandu.",
  },
};
