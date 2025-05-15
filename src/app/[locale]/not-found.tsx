import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex  items-center justify-center h-screen text-center gap-2">
      <h1 className="!font-bold">404</h1>
      {/* <div className="border-l-2 border-white h-8"/> */}
      {/* <p className="text-gray-600">{t("404")}</p> */}
    </div>
  );
}
