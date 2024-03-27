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
  constructor(players, numMatches) {
    this.players = players;
    this.numMatches = numMatches;
    this.playerMatches = new Map(players.map((player) => [player, 0]));
  }

  getPlayerMatches() {
    return this.playerMatches;
  }
  generateSchedule() {
    const schedule = [];
    const numMatches = this.numMatches; // Det önskade antalet matcher

    // Kontrollera att det finns minst 4 spelare för att bilda ett lag
    if (this.players.length < 4) {
      console.error(
        "Det finns inte tillräckligt med spelare för att generera spelschema."
      );
      return schedule;
    }

    for (let i = 0; i < numMatches; i++) {
      let availablePlayers = shuffleArray([...this.players]);

      // Skapa en kopia av spelarlistan vid varje matchgenerering
      let remainingPlayers = [...this.players];

      const team = [];

      // Välj fyra spelare som inte redan har deltagit i någon match
      while (team.length < 4) {
        const player = availablePlayers.shift();
        if (remainingPlayers.includes(player)) {
          team.push(player);
          remainingPlayers = remainingPlayers.filter((p) => p !== player);
        }
      }

      const match = new Match(team);
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
    var players = match.getPlayers();
    matchDiv.textContent =
      "Match " +
      (index + 1) +
      ": " +
      players
        .slice(0, 2)
        .map((player) => player.getName())
        .join(" och ") +
      " mot " +
      players
        .slice(2)
        .map((player) => player.getName())
        .join(" och ");
    scheduleDiv.appendChild(matchDiv);
  });
}

function renderPlayerMatches(playerMatches) {
  var playerMatchesDiv = document.getElementById("playerMatches");
  // Rensa listan
  playerMatchesDiv.innerHTML = "";
  // Lägg till antalet matcher för varje spelare
  for (const [player, numMatches] of playerMatches.entries()) {
    var p = document.createElement("p");
    p.textContent = `${player.getName()}: ${numMatches} matcher`;
    playerMatchesDiv.appendChild(p);
  }
}

function createSchedule() {
  const numMatchesInput = document.getElementById("numMatches");
  const numMatches = Number(numMatchesInput.value);

  const scheduleGenerator = new ScheduleGenerator(players, numMatches);
  const schedule = scheduleGenerator.generateSchedule();
  renderSchedule(schedule);

  // Skriv ut hur många matcher varje spelare spelar
  const playerMatches = scheduleGenerator.getPlayerMatches();
  renderPlayerMatches(playerMatches);
}
