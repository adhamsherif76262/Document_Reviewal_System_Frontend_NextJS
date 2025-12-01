// src/lib/getMessages.ts
export async function getMessages(lang: string, page: string) {
  try {
    const messages = await import(`../locales/${lang}/${page}.json`);
    return messages.default;
  } catch (err) {
    console.error(`Could not load messages for ${lang}/${page}`, err);
    return {};
  }
}
