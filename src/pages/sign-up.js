import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

import { useI18n } from "@i18n";

const SignUp = () => {
  const [formState, updateFormState] = useState({
    name: {
      value: "",
    },
    email: {
      value: "",
    },
    password: {
      value: "",
    },
  });
  const [errors, updateErrors] = useState([]);
  const router = useRouter();
  const i18n = useI18n(router);

  useEffect(() => {
    const isLogged = !!localStorage.getItem("@rs/user-logged");
    if (isLogged) {
      router.push("/");
    }
  }, [router]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("/api/v1/sign-up", {
      method: "POST",
      body: JSON.stringify({
        name: formState.name.value,
        email: formState.email.value,
        password: formState.password.value,
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
          localStorage.setItem(
            "@rs/user-logged",
            JSON.stringify(response.data)
          );
          router.push("/");
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
    <div className="text-center sign-in">
      <Head>
        <title>R&S | Criação de conta</title>
      </Head>
      <main>
        <form className="form-sign-in" onSubmit={handleFormSubmit}>
          <h1 className="h3 mb-3 fw-normal">{i18n.t("titles.signUp")}</h1>
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
          <div className="form-floating">
            <input
              className="form-control"
              id="email"
              type="email"
              placeholder={i18n.t("labels.emailAddress")}
              value={formState.email.value}
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
            />
            <label htmlFor="email">{i18n.t("labels.emailAddress")}</label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              id="password"
              type="password"
              placeholder={i18n.t("labels.password")}
              value={formState.password.value}
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
            />
            <label htmlFor="password">{i18n.t("labels.password")}</label>
          </div>
          {errors.length > 0 && (
            <ul className="list-of-errors mt-3 mb-0">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <button className="btn btn-lg btn-primary w-100 mt-3">
            {i18n.t("buttons.createAccount")}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
