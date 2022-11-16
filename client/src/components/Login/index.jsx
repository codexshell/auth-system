import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isRedirect, setIsRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    postLoginDetails();
    setPassword("");
    setEmail("");
  };

  const gotoSinupPage = () => navigate("/register");

  const toRegistration = async () => {
    setIsRedirect(true);
    // pretend its hitting network
    await hittingNetwork();
    gotoSinupPage();
  };

  const postLoginDetails = () => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message === "Invalid user") {
          // take user to registration page
          toRegistration();
        } else if (data.error_message === "Incorrect credentials") {
          alert(data.error_message);
        } else {
          //👇🏻 Logs the username to the console
          console.log(data.data);
          //👇🏻 save the username to the local storage
          localStorage.setItem("username", data.data.username);
          //👇🏻 Navigates to the 2FA route
          navigate("/phone/verify");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login__container">
      <h2>Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginBtn">SIGN IN</button>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={gotoSinupPage}>
            Sign up
          </span>
        </p>
        {isRedirect && (
          <p className="error">
            No user with email exists. Redirecting to sign up page . . .
          </p>
        )}
      </form>
    </div>
  );
};

const hittingNetwork = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

export default Login;
