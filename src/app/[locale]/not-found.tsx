import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex  items-center justify-center h-screen text-center gap-2">
      <h1 className="!font-bold">404</h1>
    </div>
  );
}
