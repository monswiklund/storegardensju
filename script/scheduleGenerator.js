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

    // Skapa en kopia av spelarlistan vid varje matchgenerering
    let remainingPlayers = shuffleArray([...this.players]);

    for (let i = 0; i < numMatches; i++) {
      const team = [];

      // Välj fyra spelare som inte redan har deltagit i någon match
      while (team.length < 4) {
        const player = remainingPlayers.shift();
        if (this.playerMatches.get(player) < numMatches) {
          team.push(player);
          this.playerMatches.set(player, this.playerMatches.get(player) + 1);
        }

        // Om alla spelare har deltagit i det maximala antalet matcher, börja om med en ny kopia av spelarlistan
        if (remainingPlayers.length === 0) {
          remainingPlayers = shuffleArray([...this.players]);
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
  playerMatches.forEach((numMatches, player) => {
    var p = document.createElement("p");
    p.textContent = `${player.getName()}: ${numMatches} matcher`;
    playerMatchesDiv.appendChild(p);
  });
}

function createSchedule() {
  const scheduleGenerator = new ScheduleGenerator(
    players,
    Number(numMatchesInput.value)
  );
  const schedule = scheduleGenerator.generateSchedule();

  // Uppdatera antalet matcher för varje spelare
  players.forEach((player) => {
    const numPlayerMatches = schedule.reduce(
      (count, match) => count + (match.getPlayers().includes(player) ? 1 : 0),
      0
    );
    scheduleGenerator.playerMatches.set(player, numPlayerMatches);
  });

  const scheduleDiv = document.getElementById("schedule");

  // Rensa schemat
  scheduleDiv.innerHTML = "";

  // Lägg till en rubrik
  const heading = document.createElement("h2");
  heading.textContent = "Spelschema";
  scheduleDiv.appendChild(heading);

  // Lägg till varje match till schemat
  schedule.forEach((match, index) => {
    const matchDiv = document.createElement("p");
    matchDiv.textContent = `Match ${index + 1}: ${match
      .getPlayers()
      .map((player) => player.getName())
      .join(" vs ")}`;
    scheduleDiv.appendChild(matchDiv);
  });

  // Uppdatera antalet matcher för varje spelare
  const playerMatches = scheduleGenerator.getPlayerMatches();
  renderPlayerMatches(playerMatches);
}

function generateSchedule(players, minMatches, maxMatches) {
  const schedule = [];
  const playerMatches = new Map(players.map((player) => [player, 0]));

  while (true) {
    const availablePlayers = shuffleArray(
      players.filter((player) => playerMatches.get(player) < maxMatches)
    );

    if (availablePlayers.length < 4) {
      break;
    }

    const match = new Match(availablePlayers.slice(0, 4));
    schedule.push(match);

    match.getPlayers().forEach((player) => {
      playerMatches.set(player, playerMatches.get(player) + 1);
    });
  }

  const underplayedPlayers = players.filter(
    (player) => playerMatches.get(player) < minMatches
  );

  if (underplayedPlayers.length > 0) {
    console.warn(
      `Följande spelare spelade färre än ${minMatches} matcher: ${underplayedPlayers
        .map((player) => player.getName())
        .join(", ")}`
    );
  }

  return schedule;
}
