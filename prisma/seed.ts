import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const normalizeTagName = (name: string) => name.trim().toLowerCase();

async function seedTags() {
  const tagPayloads = [
    { name: "Logistics", color: "#1B4D3E" },
    { name: "Technology", color: "#1976D2" },
    { name: "Sustainability", color: "#388E3C" }
  ];

  return Promise.all(
    tagPayloads.map((tag) =>
      prisma.tag.upsert({
        where: { normalizedName: normalizeTagName(tag.name) },
        update: {
          color: tag.color
        },
        create: {
          name: tag.name,
          normalizedName: normalizeTagName(tag.name),
          color: tag.color
        }
      })
    )
  );
}

async function seedNewsletter() {
  return prisma.newsletter.upsert({
    where: { id: "seed-newsletter" },
    update: {},
    create: {
      id: "seed-newsletter",
      title: "WesternStar Weekly Roundup",
      date: new Date(),
      tags: ["Logistics", "Technology"],
      summary: "Your curated insights into WesternStar operations and innovation.",
      insights: ["Electric fleet expansion", "AI-powered dispatch"],
      content: "Highlights from the week across all business divisions.",
      author: {
        name: "Sam Fleetwood",
        role: "Editor in Chief"
      },
      resources: [
        {
          title: "Battery Maintenance Checklist",
          description: "Operational best practices for EV trucks",
          url: "https://example.com/resources/battery-checklist",
          type: "download"
        }
      ]
    }
  });
}

async function seedArticle() {
  return prisma.article.upsert({
    where: { id: "seed-article" },
    update: {},
    create: {
      id: "seed-article",
      title: "Autonomous Convoys Reach Production",
      date: new Date(),
      tags: ["Technology"],
      summary: "WesternStar deploys first autonomous line-haul corridor.",
      isVisible: true,
      showcaseSection: "featured",
      position: 1,
      resources: [
        {
          title: "Convoy Safety Brief",
          description: "Operational guidance for autonomous platoons",
          url: "https://example.com/resources/convoy-safety",
          type: "guide"
        }
      ]
    }
  });
}

async function seedTestimonials() {
  return Promise.all([
    prisma.testimonial.upsert({
      where: { id: 1 },
      update: {
        quote: "WesternStar transformed our long-haul uptime with predictive diagnostics.",
        author: "Jamie Buck",
        role: "Fleet Director",
        company: "Buck Logistics",
        isActive: true
      },
      create: {
        quote: "WesternStar transformed our long-haul uptime with predictive diagnostics.",
        author: "Jamie Buck",
        role: "Fleet Director",
        company: "Buck Logistics",
        isActive: true
      }
    })
  ]);
}

async function seedTrendingTopics() {
  return Promise.all([
    prisma.trendingTopic.upsert({
      where: { id: 1 },
      update: {
        title: "Charging Infrastructure Expansion",
        position: 1
      },
      create: {
        title: "Charging Infrastructure Expansion",
        position: 1,
        linkUrl: "https://example.com/topics/charging"
      }
    })
  ]);
}

async function main() {
  console.log("Seeding database...");

  await seedTags();
  await Promise.all([
    seedNewsletter(),
    seedArticle(),
    seedTestimonials(),
    seedTrendingTopics()
  ]);

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
