
// =====================================
// ✅ REGISTER USER FUNCTION
// =====================================
function registerUser() {
  const name = document.getElementById("name").value.trim();
  const userid = document.getElementById("userid").value.trim();

  if (!name || !userid) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://tech-roadshow-api.gk690842.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, userId: userid })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("username", name);
      localStorage.setItem("userid", userid);
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("score", 0);

      window.location.href = "success.html";
    })
    .catch(() => alert("Registration failed"));
}

// =====================================
// ✅ CHECK USER (TOP RIGHT DISPLAY)
// =====================================
function checkUser() {
  let user = localStorage.getItem("username");
  let score = localStorage.getItem("score") || 0;

  let topbar = document.getElementById("topbar");
  if (topbar && user) {
    topbar.innerHTML = user + " | Score: " + score;
  }
}

// =====================================
// ✅ TOGGLE GAME MENU
// =====================================
function toggleGames() {
  let menu = document.getElementById("gameMenu");
  if (!menu) return;

  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}

// =====================================
// ✅ SIDEBAR CONTROL + LINKING
// =====================================
function setupSidebar() {
  const isRegistered = localStorage.getItem("isRegistered") === "true";

  // All nav items
  const navRegister = document.getElementById("nav-register");
  const navGame = document.getElementById("nav-game");
  const navLeaderboard = document.getElementById("nav-leaderboard");
  const navDashboard = document.getElementById("nav-dashboard");
  const navAdmin = document.getElementById("nav-admin");

  // Game submenu links
  const game1 = document.getElementById("nav-game1");
  const game2 = document.getElementById("nav-game2");
  const game3 = document.getElementById("nav-game3");
  const game4 = document.getElementById("nav-game4");

  // ✅ Always available
  if (navRegister) navRegister.href = "register.html";

  // ✅ BEFORE REGISTRATION (LOCK)
  if (!isRegistered) {
    [navGame, navLeaderboard, navDashboard, navAdmin, game1, game2, game3, game4]
      .forEach(el => {
        if (!el) return;
        el.classList.add("disabled");
        el.removeAttribute("href");
      });
    return;
  }

  // ✅ AFTER REGISTRATION (UNLOCK ALL)
  if (navGame) navGame.onclick = toggleGames;

  if (navLeaderboard) navLeaderboard.href = "leaderboard.html";
  if (navDashboard) navDashboard.href = "live-dashboard.html";
  if (navAdmin) navAdmin.href = "admin.html";

  // ✅ Game links
  if (game1) game1.href = "game.html";
  if (game2) game2.href = "game.html";
  if (game3) game3.href = "game.html";
  if (game4) game4.href = "game.html";

  // Remove disabled class
  [navGame, navLeaderboard, navDashboard, navAdmin, game1, game2, game3, game4]
    .forEach(el => {
      if (!el) return;
      el.classList.remove("disabled");
    });
}

// =====================================
// ✅ LOAD LEADERBOARD
// =====================================
function loadLeaderboard() {
  fetch("https://tech-roadshow-api.gk690842.workers.dev/leaderboard")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("tableBody");
      if (!table) return;

      table.innerHTML = "";

      data.forEach((user, index) => {
        table.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.user_id}</td>
            <td>${user.total_score || 0}</td>
            <td>${user.gift || "-"}</td>
          </tr>
        `;
      });
    })
    .catch(() => console.log("Leaderboard load failed"));
}

// =====================================
// ✅ RUN ON PAGE LOAD
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  checkUser();
  setupSidebar();
  loadLeaderboard();
});
