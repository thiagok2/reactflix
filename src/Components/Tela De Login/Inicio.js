import { useState, createElement as h } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Inicio.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password });
  };

  return h(
    "div",
    { className: "container" },
    h(
      "form",
      { onSubmit: handleSubmit },
      h("h1", null, "Entrar"),

      h(
        "div",
        { className: "input-field" },
        h("input", {
          type: "text",
          placeholder: "E-mail",
          required: true,
          value: username,
          onChange: (e) => setUsername(e.target.value),
        }),
        h(FaUser, { className: "icon" })
      ),

      h(
        "div",
        { className: "input-field" },
        h("input", {
          type: "password",
          placeholder: "Senha",
          required: true,
          value: password,
          onChange: (e) => setPassword(e.target.value),
        }),
        h(FaLock, { className: "icon" })
      ),

      h(
        "div",
        { className: "recall-forget" },
        h(
          "label",
          null,
          h("input", { type: "checkbox" }),
          "Lembre de mim"
        )
      ),

      h("button", { type: "submit" }, "Entrar"),

      h(
        "div",
        { className: "signup-link" },
        h(
          "p",
          null,
          "Não tem uma conta? ",
          h(Link, { to: "/Registro" }, "Registrar")
        )
      )
    )
  );
};

export default Login;
