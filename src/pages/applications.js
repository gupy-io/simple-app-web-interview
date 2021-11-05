import { useRouter } from "next/router";

import App from "@containers/App";
import { useI18n } from "@i18n";

const Applications = ({ applications }) => {
  const router = useRouter();
  const i18n = useI18n(router);

  return (
    <App>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="border-bottom pb-2 d-flex align-items-center justify-content-between">
          <h6 className="mb-0">{i18n.t("titles.applicationsList")}</h6>
        </div>
        <table className="table table-striped mt-3 mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              <th>{i18n.t("labels.name")}</th>
              <th>{i18n.t("labels.email")}</th>
              <th>{i18n.t("labels.job")}</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.name}</td>
                <td>{application.email}</td>
                <td>{application.job.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </App>
  );
};

const getServerSideProps = async () => {
  const response = await fetch(`${process.env.RS_BFF_ADDRESS}/applications`);
  const info = await response.json();
  return {
    props: {
      applications: info.data,
    },
  };
};

export default Applications;
export { getServerSideProps };
