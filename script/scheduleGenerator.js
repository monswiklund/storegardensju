class Match {
  constructor(players) {
    this.players = players;
  }

  getPlayers() {
    return this.players;
  }
}

class Player {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ScheduleGenerator {
  constructor(players) {
    this.players = players;
  }

  generateSchedule() {
    const schedule = [];
    let availablePlayers = [...this.players];

    // Kontrollera att det finns minst 4 spelare för att bilda ett lag
    if (availablePlayers.length < 4) {
      console.error(
        "Det finns inte tillräckligt med spelare för att generera spelschema."
      );
      return schedule;
    }

    while (availablePlayers.length >= 4) {
      availablePlayers = shuffleArray(availablePlayers);

      const player1 = availablePlayers.shift();
      const player2 = availablePlayers.shift();
      const player3 = availablePlayers.shift();
      const player4 = availablePlayers.shift();

      const match = new Match([player1, player2, player3, player4]);
      schedule.push(match);
    }

    return schedule;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function addPlayer() {
  var playerName = document.getElementById("playerName").value;
  if (playerName !== "") {
    players.push(new Player(playerName));
    document.getElementById("playerName").value = "";
    renderPlayerList();
  }
}

function renderPlayerList() {
  var playerList = document.getElementById("playerList");
  // Rensa listan
  playerList.innerHTML = "";
  // Lägg till varje spelare till listan
  players.forEach(function (player) {
    var li = document.createElement("li");
    li.textContent = player.name;
    playerList.appendChild(li);
  });
  playerNameInput.value = "";
}

function renderSchedule(schedule) {
  var scheduleDiv = document.getElementById("schedule");
  // Rensa schemat
  scheduleDiv.innerHTML = "";
  // Lägg till varje match till schemat
  schedule.forEach(function (match, index) {
    var matchDiv = document.createElement("div");
    matchDiv.textContent =
      "Match " +
      (index + 1) +
      ": " +
      match.team1.map((player) => player.name).join(" och ") +
      " mot " +
      match.team2.map((player) => player.name).join(" och ");
    scheduleDiv.appendChild(matchDiv);
  });
}
function createSchedule() {
  var schedule = new Schedule();
  schedule.generateSchedule(players);
  renderSchedule(schedule.matches);
}
