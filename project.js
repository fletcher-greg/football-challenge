// Insert team into data structure
const c = (name, country) => ({
  name,
  country,
});
// Group stage data structure
const groups = {
  0: [
    c("Juventus", "ITA"),
    c("Bayern", "DEU"),
    c("Club Brugge", "BEL"),
    c("Rapid", "OEST"),
  ],
  1: [
    c("Barcelona", "SPA"),
    c("Bremen", "DEU"),
    c("Udinese", "ITA"),
    c("Panathinkaikos", "GRI"),
  ],
  2: [
    c("Milan", "ITA"),
    c("PSV", "HOL"),
    c("Schalke", "DEU"),
    c("FenerBahce", "TUER"),
  ],
  3: [
    c("Liverpool", "ENG"),
    c("Chelsea", "ENG"),
    c("Betis", "SPA"),
    c("Anderlecht", "BEL"),
  ],
  4: [
    c("Arsenal", "ENG"),
    c("Ajax", "HOL"),
    c("Thun", "SCH"),
    c("Sparta", "TSC"),
  ],
  5: [
    c("Villarreal", "SPA"),
    c("Benfica", "POR"),
    c("Lille", "FRA"),
    c("Man. United", "ENG"),
  ],
  6: [
    c("Lyon", "FRA"),
    c("Real Madrid", "SPA"),
    c("Rosenborg", "NOR"),
    c("Olympiacos", "GRI"),
  ],
  7: [
    c("Internazionale", "ITA"),
    c("Rangers", "SCO"),
    c("Artmedia", "SLO"),
    c("Porto", "POR"),
  ],
};

// return random goals between 0-3
const randomGoals = () => randomInt(0, 4);
const sort = (array) => array.sort((a, b) => a.score - b.score);
const sortReverse = (array) => array.slice(0).sort((a, b) => b.score - a.score);

// =================================
//     Print results to console
// =================================
title("Group Stage Results");
const groupWinners = findGroupWinners(groups);
let last16s = divideIntoWinnersAndRunnerUps(groupWinners);
let last16Data = { count: 0, group: false };
title("Last 16s Results");
last16s.map((tt) => sort(main(tt, last16Data)));

// =================================
//         Helper Functions
// =================================

// return a random number with a min and max range
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Print title to console
function title(text) {
  console.log("=======================");
  console.log(text);
  console.log("======================= \n");
}
// return points for wins, draws, and defeats
function getPoints(result) {
  switch (result) {
    case "win":
      return 3;
    case "draw":
      return 1;
    case "defeat":
      return 0;
    default:
      throw new Error(`Invalid result ${result}`);
  }
}

// find team and update score
function updateScore(resultsForTeams, i, j) {
  return resultsForTeams.map((team, index) => {
    if (i.index === index) {
      let points = getPoints(i.result);
      let opposingTeam = resultsForTeams[j.index];

      return {
        ...team,
        score: (team.score += points),
        games: {
          ...team.games,
          [opposingTeam.name]: isProperty(team.games, j.index)
            ? (team.games[opposingTeam] += points)
            : points,
        },
      };
    }
    if (j.index === index) {
      let points = getPoints(j.result);
      let opposingTeam = resultsForTeams[i.index];
      return {
        ...team,
        score: (team.score += points),
        games: {
          ...team.games,
          [opposingTeam.name]: isProperty(team.games, i.index)
            ? (team.games[opposingTeam] += points)
            : points,
        },
      };
    }

    return team;
  });
}
// check to see if property exists on object
function isProperty(obj, property) {
  return obj.hasOwnProperty(property) ? true : false;
}
// return back who won, drew, or lost
function compareTeams(team1, team2) {
  if (team1 > team2) return { team1: "win", team2: "defeat" };
  else if (team1 < team2) return { team1: "defeat", team2: "win" };
  return { team1: "draw", team2: "draw" };
}

// return teams by amount. Example getTeams(teams, 2) --> returns top 2 teams
function getTeams(array, amount) {
  return popArrayByAmount(array, amount);
}

function popArrayByAmount(array, amount) {
  return array.slice(array.length - amount);
}
// find group winners
function findGroupWinners(teamsObject) {
  let data = { group: true, count: 1 };
  let groupWinners = {};
  let length = Object.entries(teamsObject).length;
  for (let i = 0; i < length; i += 1) {
    let group = teamsObject[i];
    groupWinners[i] = getTeams(sort(main(group, data)), 2);
  }

  return groupWinners;
}

function main(teams, data) {
  let winners = teams.map((team) => ({
    name: team.name,
    score: 0,
    country: team.country,
    games: {},
  }));
  // play each team twice
  for (let twice = 0; twice < 2; twice += 1) {
    for (let i = 0; i < teams.length; i += 1) {
      for (let j = 0; j < teams.length; j += 1) {
        if (j !== i) {
          let team1Score = randomGoals();
          let team2core = randomGoals();
          const result = compareTeams(team1Score, team2core);

          winners = updateScore(
            winners,
            { index: i, result: result.team1 },
            { index: j, result: result.team2 }
          );
        }
      }
    }
  }

  printResultsToConsole(winners, data);
  return winners;
}

function printResultsToConsole(winners, data) {
  if (data.group) {
    console.log(`Group ${data.count}\n`);
  }
  data.count += 1;
  for (let t of sortReverse(winners)) {
    console.log(`${t.name} ${t.score}`);
  }

  console.log();
}

function divideIntoWinnersAndRunnerUps(array) {
  let testArray = Object.entries(array)
    .map((t) => t.filter((testing, index) => index === 1))
    .flat();

  let winners = testArray
    .map((d, i) =>
      d
        .filter((team, index) => index === 1 && team)
        .map((te) => ({ ...te, groupId: i }))
    )
    .flat(Infinity);
  let runnersUp = testArray
    .map((d, i) =>
      d
        .filter((team, index) => index === 0)
        .map((te) => ({ ...te, groupId: i }))
    )
    .flat(Infinity);

  return pickRandomPlayers(winners, runnersUp);
}

function pickRandomPlayers(winners, runnersUp) {
  //   let indexes = Array(winners.length).fill(-1);
  let newRound = [];
  let length = winners.length;
  let indexes = [];
  let names = [];
  while (indexes.length < length) {
    let randomNumber = randomInt(0, length);
    let randUp = randomInt(0, length);
    let win = winners[randomNumber];
    let run = runnersUp[randUp];
    if (!names.includes(win.name) && !names.includes(run.name)) {
      if (win.groupId !== run.groupId && win.country !== run.country) {
        indexes.push(randomNumber);
        newRound.push([win, run]);
        names.push(win.name);
        names.push(run.name);
      }
    }
  }
  return newRound;
}
