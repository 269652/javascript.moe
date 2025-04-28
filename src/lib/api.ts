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
  categoryName: categoryName,
  labelNames,
}: {
  locale: string;
  categoryName?: string;
  labelNames?: string[]; // Accepts an array of label names
}) {
  try {
    let filterQuery = "";

    // Filter by category if provided
    if (categoryName) {
      filterQuery += `filters[category][slug][$eq]=${categoryName}`;
    }

    // Filter by label if provided
    if (labelNames && labelNames.length > 0) {
      const labelFilter = labelNames
        .map((label, i) => `filters[$or][${i}][tags][slug][$eq]=${label}`)
        .join("&");
      filterQuery += (filterQuery ? "&" : "") + labelFilter;
    }

    console.log(
      "FETCH",
      `${STRAPI_URL}/blog-posts?populate=*&locale=${locale}&${filterQuery}`
    );
    const res = await fetch(
      `${STRAPI_URL}/blog-posts?populate=*&locale=${locale}&${filterQuery}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        next: { revalidate: 30 },
      }
    );

    return res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return { data: [] }; // fallback to empty array
  }
}
