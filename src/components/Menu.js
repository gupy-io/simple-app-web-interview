import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useI18n } from "@i18n";

const Menu = () => {
  const router = useRouter();
  const [userLogged, updateUserLogged] = useState(false);
  const i18n = useI18n(router);

  const handleSignOut = () => {
    localStorage.removeItem("@rs/user-logged");
    router.push("/sign-up");
  };

  useEffect(() => {
    updateUserLogged(!!localStorage.getItem("@rs/user-logged"));
  }, []);

  return (
    <>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link text-white">{i18n.t("links.home")}</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/jobs">
            <a className="nav-link text-white">{i18n.t("links.jobs")}</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/applications">
            <a className="nav-link text-white">
              {i18n.t("links.applications")}
            </a>
          </Link>
        </li>
        {!userLogged && (
          <li className="nav-item">
            <Link href="/sign-up">
              <a className="nav-link text-white">
                {i18n.t("links.createAccount")}
              </a>
            </Link>
          </li>
        )}
      </ul>
      <div className="text-end">
        <button className="btn btn-success" onClick={handleSignOut}>
          {i18n.t("buttons.signOut")}
        </button>
      </div>
    </>
  );
};

export default Menu;
