class Match {
  constructor(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
  }
}

class Player {
  constructor(name) {
    this.name = name;
  }
}

class Schedule {
  constructor() {
    this.matches = [];
  }

  addMatch(match) {
    this.matches.push(match);
  }

  generateSchedule(players) {
    if (players.length % 4 !== 0) {
      throw new Error("Antalet spelare måste vara en multipel av 4");
    }

    // Blanda spelarna
    players.sort(() => Math.random() - 0.5);

    for (let i = 0; i < players.length; i += 4) {
      const match = new Match(
        [players[i], players[i + 1]],
        [players[i + 2], players[i + 3]]
      );
      this.addMatch(match);
    }
  }
}
