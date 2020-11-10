import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi"; // importando o feather icons caso precise usar os icones do react
import { TextField, InputAdornment, Button } from "@material-ui/core";
import { FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

import { LoginContext } from "../../Contexts/LoginContext";

import api from "../../services/api";

import "./styles.css";
import "../../global.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [error, setError] = useState();
  const history = useHistory();

  const userInfo = useContext(LoginContext);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    console.log(`esse eh o userinfo: ${userInfo}`)
    if (changed) {
      if(props.location.search) {
        const params = props.location.search.substring(1);
        if(params === 'return-to-addresses') {
          history.push('/addresses');
        }
      }
      history.push("/admin");
      setChanged(false);
    }
  }, [changed]);

  async function handleLogin(e) {
    e.preventDefault();

    console.log(`esse eh o userinfo: ${userInfo}`)

    
    try {
      const response = await api.post("login", { email, password: passwd });

      localStorage.setItem("accessToken", response.data.accessToken);

      const user = response.data.user;
      if (user.type == "wholesaler" && user.user_status != "approved") {
        let timerInterval;
        Swal.fire({
          title: "Notificação de aprovação",
          html: `Olá ${user.name}, lamentamos informar que seu usuário ainda não foi aprovado como atacadista. Você está acessando como varejista.`,
          timer: 5000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        user.type = "retailer";
      }

      await Promise.all([
        userInfo.setLoggedIn(true),
        userInfo.setName(user.name),
        userInfo.setId(user.id),
        userInfo.setType(user.type),
        userInfo.setAccessToken(response.data.accessToken),
      ]);
      setChanged(true);
    } catch (err) {
      setError(err.response.data.message);
      console.err(err);
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <Link className="back-link" to="/">
          <FiArrowLeft size={20} color="#a17402" />
          Loja
        </Link>
        <form>
          <section className="form">
            <h1>LOGIN</h1>
            <div className="line" />
            <div className="mt-4">
              <TextField
                className="input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail size={20} />
                    </InputAdornment>
                  ),
                }}
                placeholder="E-mail"
                variant="outlined"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock size={20} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                placeholder="Senha"
                value={passwd}
                type="password"
                onChange={(e) => setPasswd(e.target.value)}
              />

              {error && <p className="errortext">{error}</p>}
              
                  <Button
                    className="button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleLogin(e)}
                  >
                    {" "}
                    Entrar{" "}
                  </Button>
               
            </div>

            <Link className="link" to="/register">
              <Button
                className="button"
                type="submit"
                color="primary"
                variant="outlined"
              >
                {" "}
                Cadastrar{" "}
              </Button>
            </Link>
            <Link className="link" to="/ForgottenPassword">
              <Button
                className="button"
                type="submit"
                color="primary"
                variant="outlined"
              >
                {" "}
                Esqueci Minha Senha{" "}
              </Button>
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Login;
