import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./LoginPage.scss";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t("login_error_required_fields"));
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(t("login_error_invalid_credentials"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/images/login-avatar.png" alt="login" />
        </div>
        <div className="login-right">
          <h2>{t("login_title")}</h2>
          <p>{t("login_subtitle")}</p>
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleLogin}>
            <label>{t("label_email")}</label>
            <input
              type="email"
              placeholder={t("placeholder_email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>{t("label_password")}</label>
            <input
              type="password"
              placeholder={t("placeholder_password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">{t("btn_login")}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
