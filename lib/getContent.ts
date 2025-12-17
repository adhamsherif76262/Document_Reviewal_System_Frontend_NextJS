// src/lib/getContent.ts
export async function getContent(lang: string, page: string) {
  try {
    const content = await import(`../locales/${lang}/${page}.json`);
    return content.default;
  } catch (err) {
    console.error(`Could not load content for ${lang}/${page}`, err);
    return {};
  }
}
