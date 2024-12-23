document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("http://localhost:3000/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").innerText = data.message;
    })
    .catch((error) => console.error("Error:", error));
});
