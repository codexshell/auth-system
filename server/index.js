const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// an array containing all the users
const users = [
  {
    email: "email@email",
    password: "password",
    tel: "0123456789",
    username: "email",
  },
];

// generates a radom string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", (req, res) => {
  // get the users credentials
  const { email, password, tel, username } = req.body;
  console.log({ email, password, tel, username });

  // checks if there is an existing user with the same email or phone number
  let result = users.filter((user) => user.email === email || user.tel === tel);

  // if none
  if (result.length === 0) {
    // creates the structure for the user
    const newUser = {
      id: generateID(),
      email,
      password,
      username,
      tel,
    };

    // adds the user to the array of users
    users.push(newUser);

    // returns a message
    return res.json({
      message: "Account created successfully!",
    });
  }

  // runs if a user already exists
  res.json({
    error_message: "User already exists",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  let emailAndPassword = users.filter(
    (user) => user.email === email && user.password === password
  );

  let onlyEmail = users.filter((user) => user.email === email);

  if (emailAndPassword.length === 1) {
    return res.json({
      message: "Login successfully",
      data: {
        username: emailAndPassword[0].username,
      },
    });
  } else if (onlyEmail.length === 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  } else {
    return res.json({
      error_message: "Invalid user",
    });
  }
});
