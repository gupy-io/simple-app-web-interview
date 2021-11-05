import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import App from "@containers/App";
import { useI18n } from "@i18n";

const Home = () => {
  const router = useRouter();
  const i18n = useI18n(router);
  return (
    <App>
      <Head>
        <title>R&S | Início</title>
      </Head>
      <div className="p-5 mb-4 bg-dark rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-white">
            {i18n.t("titles.home")}
          </h1>
          <p className="col-md-8 fs-4 text-white">
            {i18n.t("texts.applicationDescribe")}
          </p>
          <p className="col-md-8 fs-4 text-white">
            {i18n.t("texts.applicationFlows")}
          </p>
          <ul>
            <li className="text-white">
              <Link href="/sign-up">
                <a className="text-white">
                  {i18n.t("links.createANewAccount")}
                </a>
              </Link>
            </li>
            <li className="text-white">
              <Link href="/jobs">
                <a className="text-white">
                  {i18n.t("links.viewCreatePublishApplyJobs")}
                </a>
              </Link>
            </li>
            <li className="text-white">
              <Link href="/applications">
                <a className="text-white">{i18n.t("links.viewApplications")}</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </App>
  );
};

export default Home;
