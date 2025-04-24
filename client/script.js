const apiUrl = "http://localhost:8000/users";

// Hämta användare från Swagger API med mockdata

document.querySelector("#load").addEventListener("click", fetchData);

async function fetchData() {
  document.querySelector("#output").innerText = "Laddar...";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Fel: ${response.status}`);
    }

    const data = await response.json();
    console.log("Svar från API:", data);

    const users = Array.isArray(data) ? data : data.users || [];

    if (users.length === 0) {
      document.querySelector("#output").innerText = "Inga användare hittades.";
      return;
    }

    const listHtml = users
      .map(
        (user) =>
          `<li><strong>${user.name || "Namnlös"}</strong> (id: ${user.id})</li>`
      )
      .join("");

    document.querySelector("#output").innerHTML = `<ul>${listHtml}</ul>`;
  } catch (error) {
    console.error("Fel vid hämtningen:", error);
    document.querySelector("#output").innerText =
      "Något gick fel vid hämtning av data.";
  }
}

// Posta användare till mitt api med mockdata
document
  .querySelector("#user-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstname = document.querySelector("#firstname").value.trim();
    const lastname = document.querySelector("#lastname").value.trim();
    const fullName = `${firstname} ${lastname}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName }),
      });

      if (!response.ok) {
        throw new Error(`Fel vid POST: ${response.status}`);
      }

      const result = await response.json();
      console.log("Användare tillagd:", result);

      alert("Användaren har skickats! 🚀");

      document.querySelector("#user-form").reset();

      fetchData(); // Uppdatera listan direkt!
    } catch (err) {
      console.error("Något gick fel:", err);
      alert("Det gick inte att lägga till användaren.");
    }
  });
