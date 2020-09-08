const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = (document.getElementById(
  "finalScore"
).innerText = mostRecentScore);

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  console.log("save");
  e.preventDefault();
  http(username.value, parseInt(mostRecentScore));
};

function http(name, score) {
  const params = {
    Name: name,
    HighScore: score
  };

  const options = {
    method: "POST",
    body: JSON.stringify(params)
  };

  fetch("./api.php", options)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Uspješni unos!");
      } else {
        alert("Dogodila se greška!");
        throw new Error(data.message);
      }
    })
    .catch(err => console.error(err));
}
