import { useRouter } from "next/router";

import App from "@containers/App";
import { useI18n } from "@i18n";
import { useState } from "react";

const JobsCreate = () => {
  const [formState, updateFormState] = useState({
    name: {
      value: "",
    },
  });
  const [errors, updateErrors] = useState([]);
  const router = useRouter();
  const i18n = useI18n(router);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("/api/v1/jobs/create", {
      method: "POST",
      body: JSON.stringify({
        name: formState.name.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 400) {
          if (Array.isArray(response.message)) {
            updateErrors(response.message);
          } else {
            updateErrors([response.message]);
          }
        }

        if (response.data) {
          router.push("/jobs");
        }
      });
  };

  const handleInputChange = (name, value) => {
    updateFormState((oldState) => ({
      ...oldState,
      [name]: {
        value,
      },
    }));
  };

  return (
    <App>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <div className="border-bottom pb-2 d-flex align-items-center justify-content-between">
          <h6 className="mb-0">{i18n.t("titles.jobsCreate")}</h6>
          <button
            className="btn btn-md btn-danger"
            onClick={() => router.push("/jobs")}
          >
            {i18n.t("buttons.cancel")}
          </button>
        </div>
        <form className="form-sign-in mt-3 w-100" onSubmit={handleFormSubmit}>
          <div className="form-floating">
            <input
              className="form-control"
              id="name"
              placeholder={i18n.t("labels.name")}
              value={formState.name.value}
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
            />
            <label htmlFor="name">{i18n.t("labels.name")}</label>
          </div>
          {errors.length > 0 && (
            <ul className="list-of-errors mt-3 mb-0">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <button className="btn btn-lg btn-primary w-100 mt-3">
            {i18n.t("buttons.createJob")}
          </button>
        </form>
      </div>
    </App>
  );
};

export default JobsCreate;
