import { useRouter } from "next/router";

import App from "@containers/App";
import { useI18n } from "@i18n";
import { useEffect, useState } from "react";

const Jobs = ({ jobs }) => {
  const [userLogged, updateUserLogged] = useState({});
  const router = useRouter();
  const i18n = useI18n(router);

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("@rs/user-logged") || "{}"
    );
    updateUserLogged(userData);
  }, []);

  const handleApplyJob = (jobId) => {
    fetch(`/api/v1/jobs/apply/${jobId}`, {
      method: "POST",
      body: JSON.stringify({ accountId: userLogged.id }),
    }).then(() => router.replace(router.asPath));
  };

  const handlePublishJob = (jobId) => {
    fetch(`/api/v1/jobs/publish-job/${jobId}`, { method: "PATCH" }).then(() =>
      router.replace(router.asPath)
    );
  };

  return (
    <App>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="border-bottom pb-2 d-flex align-items-center justify-content-between">
          <h6 className="mb-0">{i18n.t("titles.jobsList")}</h6>
          <button
            className="btn btn-md btn-primary"
            onClick={() => router.push("/jobs/create")}
          >
            {i18n.t("buttons.createJob")}
          </button>
        </div>
        <table className="table table-striped mt-3 mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>{i18n.t("labels.name")}</th>
              <th>{i18n.t("labels.status")}</th>
              <th style={{ width: "100px" }} />
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.name}</td>
                <td>
                  <span className="badge bg-secondary">{job.status}</span>
                </td>
                <td>
                  {job.status === "published" &&
                    !job.applications.includes(userLogged.id) && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApplyJob(job.id)}
                      >
                        {i18n.t("buttons.apply")}
                      </button>
                    )}
                  {job.status === "draft" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlePublishJob(job.id)}
                    >
                      {i18n.t("buttons.publish")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </App>
  );
};

const getServerSideProps = async () => {
  const response = await fetch(`${process.env.RS_BFF_ADDRESS}/jobs`);
  const info = await response.json();
  return {
    props: {
      jobs: info.data,
    },
  };
};

export default Jobs;
export { getServerSideProps };
