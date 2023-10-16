import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users").then((res) =>
      res.json().then((data) => setUsers(data))
    );
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        const newUsers = [...users, data];
        setUsers(newUsers); // Add the new user to the list of users
      })
      .catch((error) => console.error("Error:", error));
  };

  // Check if the users variable is an array. If it is not, convert it to an array.
  const usersArray = Array.isArray(users) ? users : Array.from(users);

  return (
    <>
      <h1>Users ManageMent System!</h1>
      <h3>Numbers of users: {usersArray.length}</h3>
      <form onSubmit={handleAddUser}>
        Name: <input type="text" name="name" id="" />
        <br />
        Email: <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {usersArray.map((user) => (
          <p key={user.id}>
            {user.id}: {user.name}: {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
