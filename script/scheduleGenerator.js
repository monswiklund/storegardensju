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

    while (availablePlayers.length >= 4) {
      availablePlayers = shuffleArray(availablePlayers);

      const player1 = availablePlayers.shift();
      const player2 = availablePlayers.shift();
      const player3 = availablePlayers.shift();
      const player4 = availablePlayers.shift();

      const match = new Match([player1, player2, player3, player4]);
      schedule.push(match);

      availablePlayers.push(player1);
      availablePlayers.push(player2);
      availablePlayers.push(player3);
      availablePlayers.push(player4);
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
}
