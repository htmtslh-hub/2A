import AgenticSite from '@/components/AgenticSite';
import { readLang } from '@/lib/server-lang';

export default async function Page() {
  // Hiển thị theo ưu tiên ngôn ngữ của trình duyệt.
  const lang = await readLang();
  return <AgenticSite initialLang={lang} />;
}
