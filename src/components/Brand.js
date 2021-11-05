import Link from "next/link";
import { useRouter } from "next/router";

import { useI18n } from "@i18n";

const Brand = () => {
  const router = useRouter();
  const i18n = useI18n(router);
  return (
    <Link href="/">
      <a className="text-white text-decoration-none">{i18n.t("titles.app")}</a>
    </Link>
  );
};

export default Brand;
