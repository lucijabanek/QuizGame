const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Pričekaj da DOM bude učitan/spreman
document.addEventListener("DOMContentLoaded", event => {
  if (event.target.readyState === "interactive") {
    getHighScores();
  }
});

function displayHighScores(highScores) {
  for (let i = 0; i < highScores.length; i++) {
    const score = highScores[i];
    highScoresList.innerHTML = highScores
      .map(score => {
        return `<li class= "high-score">${score.Name}: ${score.HighScore}</li>`;
      })
      .join("");
  }
}

// Funkcija koja radi HTTP GET zahtjev dohvaćanje narudžbi s API-a
function getHighScores() {
  fetch("./api.php?action=getHighScores")
    .then(response => response.json()) // Response pretvori u JSON
    .then(data => displayHighScores(data.data)) // Pozovi funkciju za prikaz podataka ("data")
    .catch(err => console.error(err));
}
