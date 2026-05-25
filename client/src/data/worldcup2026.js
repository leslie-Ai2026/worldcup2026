// ═══════════════════════════════════════════════════════════════
// 2026 FIFA WORLD CUP — Official Groups, Fixtures & Rosters
// ═══════════════════════════════════════════════════════════════

export const WORLD_CUP_GROUPS = {
  A: ["Mexico", "Canada", "USA", "Paraguay"],
  B: ["Brazil", "Argentina", "Colombia", "South Korea"],
  C: ["France", "Germany", "Japan", "Czechia"],
  D: ["Spain", "Netherlands", "Senegal", "Bosnia"],
  E: ["England", "Portugal", "Morocco", "Norway"],
  F: ["Italy", "Uruguay", "Egypt", "Chile"],
  G: ["Belgium", "Croatia", "South Africa", "Iran"],
  H: ["Nigeria", "Australia", "Peru", "Saudi Arabia"],
  I: ["Switzerland", "Denmark", "Ecuador", "New Zealand"],
  J: ["Austria", "Serbia", "Qatar", "Jamaica"],
  K: ["Sweden", "Poland", "Ukraine", "Mali"],
  L: ["Hungary", "Scotland", "Algeria", "Panama"],
};

export const OPENING_FIXTURES = [
  { id: "mex-vs-rsa", home: "Mexico", away: "South Africa", date: "June 11, 2026", time: "20:00", venue: "Estadio Azteca, Mexico City", stage: "Group G · Matchday 1" },
  { id: "kor-vs-cze", home: "South Korea", away: "Czechia", date: "June 12, 2026", time: "14:00", venue: "BMO Field, Toronto", stage: "Group C · Matchday 1" },
  { id: "can-vs-bih", home: "Canada", away: "Bosnia", date: "June 12, 2026", time: "17:00", venue: "BC Place, Vancouver", stage: "Group D · Matchday 1" },
  { id: "usa-vs-par", home: "USA", away: "Paraguay", date: "June 12, 2026", time: "18:00", venue: "SoFi Stadium, Los Angeles", stage: "Group A · Matchday 1" },
];

// ═══════════════════════════════════════════════════════════════
// PLAYER ROSTERS — 26-man squads per country (key players)
// ═══════════════════════════════════════════════════════════════

export const PLAYER_ROSTERS = {
  mexico: [
    { name: "Guillermo Ochoa",      number: 1,  position: "GK", club: "Salernitana",         captain: false },
    { name: "Edson Álvarez",         number: 4,  position: "MF", club: "West Ham United",     captain: true },
    { name: "Santiago Giménez",      number: 9,  position: "FW", club: "Feyenoord",           captain: false },
    { name: "Hirving Lozano",        number: 22, position: "FW", club: "PSV Eindhoven",       captain: false },
    { name: "Jorge Sánchez",         number: 2,  position: "DF", club: "Ajax",                captain: false },
    { name: "Luis Chávez",           number: 18, position: "MF", club: "Dynamo Moscow",       captain: false },
  ],
  brazil: [
    { name: "Alisson Becker",        number: 1,  position: "GK", club: "Liverpool",           captain: false },
    { name: "Neymar Jr.",            number: 10, position: "FW", club: "Al Hilal",            captain: true },
    { name: "Vinícius Junior",       number: 7,  position: "FW", club: "Real Madrid",         captain: false },
    { name: "Rodrygo",               number: 11, position: "FW", club: "Real Madrid",         captain: false },
    { name: "Bruno Guimarães",       number: 8,  position: "MF", club: "Newcastle United",    captain: false },
    { name: "Éder Militão",          number: 3,  position: "DF", club: "Real Madrid",         captain: false },
  ],
  usa: [
    { name: "Christian Pulisic",     number: 10, position: "FW", club: "AC Milan",            captain: true },
    { name: "Weston McKennie",       number: 8,  position: "MF", club: "Juventus",            captain: false },
    { name: "Folarin Balogun",       number: 9,  position: "FW", club: "AS Monaco",           captain: false },
    { name: "Gio Reyna",             number: 7,  position: "MF", club: "Borussia Dortmund",   captain: false },
    { name: "Tyler Adams",           number: 4,  position: "MF", club: "Bournemouth",         captain: false },
    { name: "Matt Turner",           number: 1,  position: "GK", club: "Nottingham Forest",   captain: false },
  ],
  argentina: [
    { name: "Lionel Messi",          number: 10, position: "FW", club: "Inter Miami",         captain: true },
    { name: "Emiliano Martínez",     number: 23, position: "GK", club: "Aston Villa",         captain: false },
    { name: "Enzo Fernández",        number: 8,  position: "MF", club: "Chelsea",             captain: false },
    { name: "Julián Álvarez",        number: 9,  position: "FW", club: "Manchester City",     captain: false },
    { name: "Cristian Romero",       number: 13, position: "DF", club: "Tottenham Hotspur",   captain: false },
    { name: "Alexis Mac Allister",   number: 20, position: "MF", club: "Liverpool",           captain: false },
  ],
  france: [
    { name: "Kylian Mbappé",         number: 10, position: "FW", club: "Real Madrid",         captain: true },
    { name: "Eduardo Camavinga",     number: 6,  position: "MF", club: "Real Madrid",         captain: false },
    { name: "Mike Maignan",          number: 16, position: "GK", club: "AC Milan",            captain: false },
    { name: "Ousmane Dembélé",       number: 11, position: "FW", club: "Paris Saint-Germain", captain: false },
    { name: "Aurélien Tchouaméni",   number: 14, position: "MF", club: "Real Madrid",         captain: false },
    { name: "William Saliba",        number: 17, position: "DF", club: "Arsenal",             captain: false },
  ],
  england: [
    { name: "Jude Bellingham",       number: 10, position: "MF", club: "Real Madrid",         captain: true },
    { name: "Harry Kane",            number: 9,  position: "FW", club: "Bayern Munich",       captain: false },
    { name: "Bukayo Saka",           number: 7,  position: "FW", club: "Arsenal",             captain: false },
    { name: "Declan Rice",           number: 4,  position: "MF", club: "Arsenal",             captain: false },
    { name: "Jordan Pickford",       number: 1,  position: "GK", club: "Everton",             captain: false },
    { name: "John Stones",           number: 5,  position: "DF", club: "Manchester City",     captain: false },
  ],
  germany: [
    { name: "Florian Wirtz",         number: 10, position: "MF", club: "Bayer Leverkusen",    captain: false },
    { name: "Jamal Musiala",         number: 14, position: "MF", club: "Bayern Munich",       captain: false },
    { name: "Marc-André ter Stegen", number: 1,  position: "GK", club: "Barcelona",           captain: false },
    { name: "Kai Havertz",           number: 7,  position: "FW", club: "Arsenal",             captain: false },
    { name: "Joshua Kimmich",        number: 6,  position: "MF", club: "Bayern Munich",       captain: true },
    { name: "Antonio Rüdiger",       number: 2,  position: "DF", club: "Real Madrid",         captain: false },
  ],
  spain: [
    { name: "Pedri",                 number: 8,  position: "MF", club: "Barcelona",           captain: false },
    { name: "Gavi",                  number: 9,  position: "MF", club: "Barcelona",           captain: false },
    { name: "Unai Simón",            number: 23, position: "GK", club: "Athletic Club",       captain: false },
    { name: "Álvaro Morata",         number: 7,  position: "FW", club: "Atlético Madrid",     captain: true },
    { name: "Nico Williams",         number: 11, position: "FW", club: "Athletic Club",       captain: false },
    { name: "Aymeric Laporte",       number: 4,  position: "DF", club: "Al Nassr",            captain: false },
  ],
  portugal: [
    { name: "Cristiano Ronaldo",     number: 7,  position: "FW", club: "Al Nassr",            captain: true },
    { name: "Bruno Fernandes",       number: 8,  position: "MF", club: "Manchester United",   captain: false },
    { name: "Rafael Leão",           number: 17, position: "FW", club: "AC Milan",            captain: false },
    { name: "Rúben Dias",            number: 3,  position: "DF", club: "Manchester City",     captain: false },
    { name: "Diogo Costa",           number: 1,  position: "GK", club: "FC Porto",            captain: false },
    { name: "Bernardo Silva",        number: 10, position: "MF", club: "Manchester City",     captain: false },
  ],
  switzerland: [
    { name: "Granit Xhaka",          number: 10, position: "MF", club: "Bayer Leverkusen",    captain: true },
    { name: "Yann Sommer",           number: 1,  position: "GK", club: "Inter Milan",         captain: false },
    { name: "Breel Embolo",          number: 7,  position: "FW", club: "AS Monaco",           captain: false },
    { name: "Manuel Akanji",         number: 5,  position: "DF", club: "Manchester City",     captain: false },
    { name: "Denis Zakaria",         number: 6,  position: "MF", club: "Juventus",            captain: false },
    { name: "Ruben Vargas",          number: 17, position: "FW", club: "FC Augsburg",         captain: false },
  ],
  netherlands: [
    { name: "Virgil van Dijk",       number: 4,  position: "DF", club: "Liverpool",           captain: true },
    { name: "Frenkie de Jong",       number: 21, position: "MF", club: "Barcelona",           captain: false },
    { name: "Cody Gakpo",            number: 8,  position: "FW", club: "Liverpool",           captain: false },
    { name: "Xavi Simons",           number: 10, position: "MF", club: "RB Leipzig",          captain: false },
    { name: "Matthijs de Ligt",      number: 3,  position: "DF", club: "Bayern Munich",       captain: false },
    { name: "Bart Verbruggen",       number: 1,  position: "GK", club: "Brighton",            captain: false },
  ],
  canada: [
    { name: "Alphonso Davies",       number: 19, position: "MF", club: "Bayern Munich",       captain: true },
    { name: "Jonathan David",        number: 9,  position: "FW", club: "Lille OSC",           captain: false },
    { name: "Tajon Buchanan",        number: 7,  position: "FW", club: "Inter Milan",         captain: false },
    { name: "Stephen Eustáquio",     number: 6,  position: "MF", club: "FC Porto",            captain: false },
    { name: "Dayne St. Clair",       number: 1,  position: "GK", club: "Minnesota United",    captain: false },
    { name: "Derek Cornelius",       number: 5,  position: "DF", club: "Malmö FF",            captain: false },
  ],
  south_africa: [
    { name: "Ronwen Williams",       number: 1,  position: "GK", club: "Mamelodi Sundowns",   captain: true },
    { name: "Percy Tau",             number: 10, position: "FW", club: "Al Ahly",             captain: false },
    { name: "Evidence Makgopa",      number: 9,  position: "FW", club: "Orlando Pirates",     captain: false },
    { name: "Teboho Mokoena",        number: 8,  position: "MF", club: "Mamelodi Sundowns",   captain: false },
    { name: "Aubrey Modiba",         number: 13, position: "DF", club: "Mamelodi Sundowns",   captain: false },
    { name: "Sipho Mbule",           number: 17, position: "MF", club: "Kaizer Chiefs",       captain: false },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FLAT PLAYER LIST — for dropdown selector
// ═══════════════════════════════════════════════════════════════

export const ALL_PLAYERS = Object.entries(PLAYER_ROSTERS).flatMap(([countryId, players]) =>
  players.map(p => ({
    ...p,
    countryId,
    country: countryId === "south_africa" ? "South Africa" : countryId.charAt(0).toUpperCase() + countryId.slice(1),
    flagCode: countryId === "south_africa" ? "za" : countryId === "canada" ? "ca" : countryId.slice(0, 2),
    display: `${p.name} · #${p.number} (${countryId === "south_africa" ? "South Africa" : countryId.charAt(0).toUpperCase() + countryId.slice(1)})`,
    defaultText: `${p.name.split(" ").pop()?.toUpperCase()}\n${p.number}`,
  }))
);
