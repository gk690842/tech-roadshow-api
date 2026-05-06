
// =====================================
// ✅ REGISTER USER FUNCTION
// =====================================
function registerUser() {
  const name = document.getElementById("name").value.trim();
  const userid = document.getElementById("userid").value.trim();
  const error = document.getElementById("error");

  // ✅ Input validation
  if (!name || !userid) {
    error.textContent = "❌ Both fields are mandatory.";
    return;
  }

  error.textContent = "";

  // ✅ API call to Cloudflare Worker
  fetch("https://tech-roadshow-api.gk690842.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      userId: userid
    })
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Server error");
      }
      return res.json();
    })
    .then((data) => {
      console.log("✅ Registration success:", data);

      // ✅ Save user data locally
      localStorage.setItem("name", name);
      localStorage.setItem("userid", userid);
      localStorage.setItem("registrationNumber", data.registrationNumber);
      localStorage.setItem("isRegistered", "true");  // ✅ used for sidebar unlock

      // ✅ redirect to success page
      window.location.href = "success.html";
    })
    .catch((err) => {
      console.error("❌ Error:", err);
      error.textContent = "❌ Registration failed. Try again.";
    });
}

------------------------------------------------

// =====================================
// ✅ CHECK IF USER REGISTERED (SIDEBAR CONTROL)
// =====================================
function isUserRegistered() {
  return localStorage.getItem("isRegistered") === "true";
}

------------------------------------------------

// =====================================
// ✅ ENABLE / DISABLE SIDEBAR OPTIONS
// =====================================
function controlSidebar() {

  const isRegistered = isUserRegistered();

  const leaderboard = document.getElementById("nav-leaderboard");
  const admin = document.getElementById("nav-admin");

  if (leaderboard && admin) {

    if (isRegistered) {
      // ✅ Enable sidebar
      leaderboard.classList.remove("disabled");
      admin.classList.remove("disabled");

      leaderboard.style.pointerEvents = "auto";
      admin.style.pointerEvents = "auto";

    } else {
      // ❌ Disable sidebar (before registration)
      leaderboard.classList.add("disabled");
      admin.classList.add("disabled");

      leaderboard.style.pointerEvents = "none";
      admin.style.pointerEvents = "none";
    }
  }
}

------------------------------------------------

// =====================================
// ✅ LOAD LEADERBOARD DATA
// =====================================
function loadLeaderboard() {

  fetch("https://tech-roadshow-api.gk690842.workers.dev/leaderboard")
    .then(res => res.json())
    .then(data => {

      console.log("🏆 Leaderboard data:", data);

      const table = document.getElementById("tableBody");

      if (!table) return;

      table.innerHTML = "";

      data.forEach((user, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.user_id}</td>
            <td>${user.total_score || 0}</td>
            <td>${user.gift || "—"}</td>
          </tr>
        `;
        table.innerHTML += row;
      });

    })
    .catch(err => {
      console.error("❌ Leaderboard error:", err);
    });
}

------------------------------------------------

// =====================================
// ✅ RUN ON PAGE LOAD
// =====================================
document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ Page loaded");

  // ✅ Control sidebar state
  controlSidebar();

  // ✅ Load leaderboard if available
  loadLeaderboard();
});
