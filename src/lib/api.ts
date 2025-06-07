// STRAPI API URL and Token
const STRAPI_URL = "https://strapi.javascript.moe/api";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Function to fetch blog posts from Strapi
export async function getLabels({ locale }: any) {
  try {
    const res = await fetch(STRAPI_URL + "/tags/?locale=" + locale, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return { data: [] }; // fallback to empty array
  }
}

// Function to fetch blog posts from Strapi
export async function getCategories({ locale }: any) {
  try {
    const res = await fetch(STRAPI_URL + "/categories/?locale=" + locale, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return { data: [] }; // fallback to empty array
  }
}

export async function getBlogPosts({
  locale,
  categorySlug,
  labelNames,
  join,
  page,
  pageSize = 10,
}: {
  locale?: string;
  categorySlug?: string;
  labelNames?: string[]; // Accepts an array of label names
  join?: "AND" | "OR";
  page: number;
  pageSize?: number;
}) {
  try {
    let filterQuery = "";

    // Filter by category if provided
    if (categorySlug) {
      filterQuery += `filters[category][slug][$eq]=${categorySlug}`;
    }

    // Filter by label if provided
    if (join !== "AND" && labelNames && labelNames.length > 0) {
      const labelFilter = labelNames
        .map((label, i) => `filters[$or][${i}][tags][slug][$eq]=${label}`)
        .join("&");
      filterQuery += (filterQuery ? "&" : "") + labelFilter;
    } else if (join === "AND" && labelNames && labelNames.length > 0) {
      const labelFilter = labelNames
        .map((label, i) => `filters[$and][${i}][tags][slug][$eq]=${label}`)
        .join("&");
      filterQuery += (filterQuery ? "&" : "") + labelFilter;
    }

    let url = `${STRAPI_URL}/blog-posts?populate=*`;
    url += `&pagination[pageSize]=${pageSize}`;

    if (locale) url += `&locale=${locale}`;
    if (filterQuery) {
      url += `&${filterQuery}`;
    }
    if (page) {
      url += `&pagination[page]=${page}`;
    }

    console.log("FETCH", url);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 30 },
    });

    return res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return { data: [] }; // fallback to empty array
  }
}

export async function getBlogPost(id: string, { locale }: { locale?: string }) {
  try {
    let url = `${STRAPI_URL}/blog-posts/${id}?populate=*`;
    if (locale) url += `&locale=${locale}`;
    8;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Cache-Control": "max-age=600, stale-while-revalidate=0", // Cache for 10 minutes and revalidate immediately after
      },
      cache: "force-cache",
      next: { revalidate: 120 }, // Revalidate every 2 minutes
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()).data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] }; // Fallback to empty array if fetching fails
  }
}

export async function getCategory(
  slug: string,
  { locale }: { locale?: string }
) {
  try {
    let url = `${STRAPI_URL}/categories?populate=*`;
    if (locale) url += `&locale=${locale}`;

    url += `&filters[slug][$eq]=${slug}`;
    console.log("getCategory ", url);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Cache-Control": "max-age=600, stale-while-revalidate=0", // Cache for 10 minutes and revalidate immediately after
      },
      cache: "force-cache",
      next: { revalidate: 120 }, // Revalidate every 2 minutes
    });

    if (!res.ok) {
      return null;
    }

    const [data] = (await res.json()).data;
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] }; // Fallback to empty array if fetching fails
  }
}

export async function getBlogConfig({ locale }: { locale?: string }) {
  try {
    let url = `${STRAPI_URL}/blog-config?populate=*`;
    if (locale) url += `&locale=${locale}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Cache-Control": "max-age=600, stale-while-revalidate=0", // Cache for 10 minutes and revalidate immediately after
      },
      cache: "force-cache",
      next: { revalidate: 120 }, // Revalidate every 2 minutes
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()).data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] }; // Fallback to empty array if fetching fails
  }
}
