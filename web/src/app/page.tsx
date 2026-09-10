import AgenticSite from '@/components/AgenticSite';
import { readLang } from '@/lib/server-lang';

export default async function Page() {
  // Ngôn ngữ nằm trong cookie nên server dựng được ngay bản đúng.
  const lang = await readLang();
  return <AgenticSite initialLang={lang} />;
}
