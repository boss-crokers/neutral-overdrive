export default function robots() {
  const baseUrl = "https://neutraloverdrive.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
