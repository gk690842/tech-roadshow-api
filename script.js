
function registerUser() {
  const name = document.getElementById("name").value.trim();
  const userid = document.getElementById("userid").value.trim();
  const error = document.getElementById("error");

  if (!name || !userid) {
    error.textContent = "❌ Both fields are mandatory.";
    return;
  }

  fetch("https://tech-roadshow-api.gk690842.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      userId: userid
    })
  })
    .then(async res => {
      if (!res.ok) {
        throw new Error("Server error");
      }
      return res.json();
    })
    .then(data => {
      console.log("API Response:", data);

      // ✅ Save data for next page
      localStorage.setItem("name", name);
      localStorage.setItem("userid", userid);
      localStorage.setItem("registrationNumber", data.registrationNumber);

      // ✅ Redirect to success page
      window.location.href = "success.html";
    })
    .catch(err => {
      console.error(err);
      error.textContent = "❌ Registration failed. Try again.";
    });
}
