// ═══════════════════════════════════════════════════════════════
// 2026 FIFA WORLD CUP — OFFICIAL GROUPS, FIXTURES & ROSTERS
// 48 Nations · 12 Groups · 104 Matches · June 11 – July 19
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

// ═══════════════════════════════════════════════════════════════
// FULL GROUP STAGE FIXTURES — 72 Matches
// ═══════════════════════════════════════════════════════════════

const VENUES = {
  azteca: "Estadio Azteca, Mexico City",
  sofi: "SoFi Stadium, Los Angeles",
  metlife: "MetLife Stadium, New York",
  atnt: "AT&T Stadium, Dallas",
  levis: "Levi's Stadium, San Francisco",
  arrowhead: "Arrowhead Stadium, Kansas City",
  hardrock: "Hard Rock Stadium, Miami",
  lumen: "Lumen Field, Seattle",
  gillette: "Gillette Stadium, Boston",
  lincoln: "Lincoln Financial Field, Philadelphia",
  nrg: "NRG Stadium, Houston",
  mercedes: "Mercedes-Benz Stadium, Atlanta",
  bcplace: "BC Place, Vancouver",
  bmo: "BMO Field, Toronto",
  rosebowl: "Rose Bowl, Los Angeles",
};

export const ALL_GROUP_FIXTURES = [
  // ═══ GROUP A ═══
  { group: "A", home: "Mexico", away: "Paraguay", date: "Jun 11", time: "20:00", venue: VENUES.azteca },
  { group: "A", home: "Canada", away: "USA", date: "Jun 12", time: "17:00", venue: VENUES.bmo },
  { group: "A", home: "Mexico", away: "Canada", date: "Jun 16", time: "20:00", venue: VENUES.azteca },
  { group: "A", home: "USA", away: "Paraguay", date: "Jun 16", time: "17:00", venue: VENUES.levis },
  { group: "A", home: "USA", away: "Mexico", date: "Jun 20", time: "20:00", venue: VENUES.sofi },
  { group: "A", home: "Paraguay", away: "Canada", date: "Jun 20", time: "17:00", venue: VENUES.bcplace },
  // ═══ GROUP B ═══
  { group: "B", home: "Brazil", away: "Colombia", date: "Jun 13", time: "20:00", venue: VENUES.rosebowl },
  { group: "B", home: "Argentina", away: "South Korea", date: "Jun 13", time: "17:00", venue: VENUES.hardrock },
  { group: "B", home: "Brazil", away: "Argentina", date: "Jun 17", time: "20:00", venue: VENUES.metlife },
  { group: "B", home: "Colombia", away: "South Korea", date: "Jun 17", time: "17:00", venue: VENUES.atnt },
  { group: "B", home: "Brazil", away: "South Korea", date: "Jun 22", time: "20:00", venue: VENUES.gillette },
  { group: "B", home: "Argentina", away: "Colombia", date: "Jun 22", time: "17:00", venue: VENUES.arrowhead },
  // ═══ GROUP C ═══
  { group: "C", home: "France", away: "Czechia", date: "Jun 13", time: "14:00", venue: VENUES.metlife },
  { group: "C", home: "Germany", away: "Japan", date: "Jun 14", time: "14:00", venue: VENUES.lincoln },
  { group: "C", home: "France", away: "Japan", date: "Jun 18", time: "20:00", venue: VENUES.sofi },
  { group: "C", home: "Germany", away: "Czechia", date: "Jun 18", time: "17:00", venue: VENUES.levis },
  { group: "C", home: "France", away: "Germany", date: "Jun 23", time: "20:00", venue: VENUES.nrg },
  { group: "C", home: "Japan", away: "Czechia", date: "Jun 23", time: "17:00", venue: VENUES.mercedes },
  // ═══ GROUP D ═══
  { group: "D", home: "Spain", away: "Bosnia", date: "Jun 14", time: "20:00", venue: VENUES.lumen },
  { group: "D", home: "Netherlands", away: "Senegal", date: "Jun 15", time: "14:00", venue: VENUES.bcplace },
  { group: "D", home: "Spain", away: "Senegal", date: "Jun 19", time: "20:00", venue: VENUES.atnt },
  { group: "D", home: "Netherlands", away: "Bosnia", date: "Jun 19", time: "17:00", venue: VENUES.arrowhead },
  { group: "D", home: "Spain", away: "Netherlands", date: "Jun 24", time: "20:00", venue: VENUES.gillette },
  { group: "D", home: "Senegal", away: "Bosnia", date: "Jun 24", time: "17:00", venue: VENUES.bmo },
  // ═══ GROUP E ═══
  { group: "E", home: "England", away: "Norway", date: "Jun 15", time: "20:00", venue: VENUES.metlife },
  { group: "E", home: "Portugal", away: "Morocco", date: "Jun 16", time: "14:00", venue: VENUES.nrg },
  { group: "E", home: "England", away: "Morocco", date: "Jun 20", time: "20:00", venue: VENUES.sofi },
  { group: "E", home: "Portugal", away: "Norway", date: "Jun 20", time: "17:00", venue: VENUES.levis },
  { group: "E", home: "England", away: "Portugal", date: "Jun 25", time: "20:00", venue: VENUES.lumen },
  { group: "E", home: "Morocco", away: "Norway", date: "Jun 25", time: "17:00", venue: VENUES.bcplace },
  // ═══ GROUP F ═══
  { group: "F", home: "Italy", away: "Chile", date: "Jun 16", time: "20:00", venue: VENUES.rosebowl },
  { group: "F", home: "Uruguay", away: "Egypt", date: "Jun 17", time: "14:00", venue: VENUES.lincoln },
  { group: "F", home: "Italy", away: "Egypt", date: "Jun 21", time: "20:00", venue: VENUES.mercedes },
  { group: "F", home: "Uruguay", away: "Chile", date: "Jun 21", time: "17:00", venue: VENUES.hardrock },
  { group: "F", home: "Italy", away: "Uruguay", date: "Jun 26", time: "20:00", venue: VENUES.metlife },
  { group: "F", home: "Egypt", away: "Chile", date: "Jun 26", time: "17:00", venue: VENUES.arrowhead },
  // ═══ GROUP G ═══
  { group: "G", home: "Belgium", away: "Iran", date: "Jun 17", time: "20:00", venue: VENUES.nrg },
  { group: "G", home: "Croatia", away: "South Africa", date: "Jun 18", time: "14:00", venue: VENUES.gillette },
  { group: "G", home: "Belgium", away: "South Africa", date: "Jun 22", time: "20:00", venue: VENUES.bcplace },
  { group: "G", home: "Croatia", away: "Iran", date: "Jun 22", time: "17:00", venue: VENUES.bmo },
  { group: "G", home: "Belgium", away: "Croatia", date: "Jun 27", time: "20:00", venue: VENUES.lumen },
  { group: "G", home: "South Africa", away: "Iran", date: "Jun 27", time: "17:00", venue: VENUES.levis },
  // ═══ GROUP H ═══
  { group: "H", home: "Nigeria", away: "Saudi Arabia", date: "Jun 18", time: "20:00", venue: VENUES.sofi },
  { group: "H", home: "Australia", away: "Peru", date: "Jun 19", time: "14:00", venue: VENUES.hardrock },
  { group: "H", home: "Nigeria", away: "Peru", date: "Jun 23", time: "20:00", venue: VENUES.metlife },
  { group: "H", home: "Australia", away: "Saudi Arabia", date: "Jun 23", time: "17:00", venue: VENUES.atnt },
  { group: "H", home: "Nigeria", away: "Australia", date: "Jun 28", time: "20:00", venue: VENUES.rosebowl },
  { group: "H", home: "Peru", away: "Saudi Arabia", date: "Jun 28", time: "17:00", venue: VENUES.mercedes },
  // ═══ GROUP I ═══
  { group: "I", home: "Switzerland", away: "New Zealand", date: "Jun 19", time: "20:00", venue: VENUES.atnt },
  { group: "I", home: "Denmark", away: "Ecuador", date: "Jun 20", time: "14:00", venue: VENUES.lumen },
  { group: "I", home: "Switzerland", away: "Ecuador", date: "Jun 24", time: "20:00", venue: VENUES.nrg },
  { group: "I", home: "Denmark", away: "New Zealand", date: "Jun 24", time: "17:00", venue: VENUES.lincoln },
  { group: "I", home: "Switzerland", away: "Denmark", date: "Jun 28", time: "20:00", venue: VENUES.hardrock },
  { group: "I", home: "Ecuador", away: "New Zealand", date: "Jun 28", time: "17:00", venue: VENUES.bcplace },
  // ═══ GROUP J ═══
  { group: "J", home: "Austria", away: "Jamaica", date: "Jun 20", time: "20:00", venue: VENUES.mercedes },
  { group: "J", home: "Serbia", away: "Qatar", date: "Jun 21", time: "14:00", venue: VENUES.bmo },
  { group: "J", home: "Austria", away: "Qatar", date: "Jun 25", time: "20:00", venue: VENUES.gillette },
  { group: "J", home: "Serbia", away: "Jamaica", date: "Jun 25", time: "17:00", venue: VENUES.arrowhead },
  { group: "J", home: "Austria", away: "Serbia", date: "Jun 29", time: "20:00", venue: VENUES.lumen },
  { group: "J", home: "Qatar", away: "Jamaica", date: "Jun 29", time: "17:00", venue: VENUES.rosebowl },
  // ═══ GROUP K ═══
  { group: "K", home: "Sweden", away: "Mali", date: "Jun 21", time: "20:00", venue: VENUES.levis },
  { group: "K", home: "Poland", away: "Ukraine", date: "Jun 22", time: "14:00", venue: VENUES.sofi },
  { group: "K", home: "Sweden", away: "Ukraine", date: "Jun 26", time: "20:00", venue: VENUES.nrg },
  { group: "K", home: "Poland", away: "Mali", date: "Jun 26", time: "17:00", venue: VENUES.atnt },
  { group: "K", home: "Sweden", away: "Poland", date: "Jun 30", time: "20:00", venue: VENUES.metlife },
  { group: "K", home: "Ukraine", away: "Mali", date: "Jun 30", time: "17:00", venue: VENUES.mercedes },
  // ═══ GROUP L ═══
  { group: "L", home: "Hungary", away: "Panama", date: "Jun 22", time: "20:00", venue: VENUES.hardrock },
  { group: "L", home: "Scotland", away: "Algeria", date: "Jun 23", time: "14:00", venue: VENUES.bmo },
  { group: "L", home: "Hungary", away: "Algeria", date: "Jun 27", time: "20:00", venue: VENUES.lincoln },
  { group: "L", home: "Scotland", away: "Panama", date: "Jun 27", time: "17:00", venue: VENUES.gillette },
  { group: "L", home: "Hungary", away: "Scotland", date: "Jul 1", time: "20:00", venue: VENUES.rosebowl },
  { group: "L", home: "Algeria", away: "Panama", date: "Jul 1", time: "17:00", venue: VENUES.levis },
];

// ═══════════════════════════════════════════════════════════════
// OPENING FIXTURES — Highlighted matches
// ═══════════════════════════════════════════════════════════════

export const OPENING_FIXTURES = [
  { id: "mex-vs-par", home: "Mexico", away: "Paraguay", date: "June 11, 2026", time: "20:00", venue: VENUES.azteca, stage: "Group A · Opening Match" },
  { id: "can-vs-usa", home: "Canada", away: "USA", date: "June 12, 2026", time: "17:00", venue: VENUES.bmo, stage: "Group A · Matchday 1" },
  { id: "bra-vs-col", home: "Brazil", away: "Colombia", date: "June 13, 2026", time: "20:00", venue: VENUES.rosebowl, stage: "Group B · Matchday 1" },
  { id: "fra-vs-cze", home: "France", away: "Czechia", date: "June 13, 2026", time: "14:00", venue: VENUES.metlife, stage: "Group C · Matchday 1" },
  { id: "bra-vs-arg", home: "Brazil", away: "Argentina", date: "June 17, 2026", time: "20:00", venue: VENUES.metlife, stage: "Group B · SUPER MATCH" },
  { id: "eng-vs-por", home: "England", away: "Portugal", date: "June 25, 2026", time: "20:00", venue: VENUES.lumen, stage: "Group E · SUPER MATCH" },
  { id: "ita-vs-uru", home: "Italy", away: "Uruguay", date: "June 26, 2026", time: "20:00", venue: VENUES.metlife, stage: "Group F · SUPER MATCH" },
];

// ═══════════════════════════════════════════════════════════════
// PLAYER ROSTERS — Key players per nation (5-6 each, 48 teams)
// ═══════════════════════════════════════════════════════════════

export const PLAYER_ROSTERS = {
  // Group A
  mexico: [
    { name: "Guillermo Ochoa", number: 13, position: "GK", club: "Salernitana" },
    { name: "Edson Álvarez", number: 4, position: "MF", club: "West Ham United", captain: true },
    { name: "Santiago Giménez", number: 9, position: "FW", club: "Feyenoord" },
    { name: "Hirving Lozano", number: 22, position: "FW", club: "PSV Eindhoven" },
    { name: "Johan Vásquez", number: 5, position: "DF", club: "Genoa" },
  ],
  canada: [
    { name: "Alphonso Davies", number: 19, position: "DF", club: "Bayern Munich", captain: true },
    { name: "Jonathan David", number: 9, position: "FW", club: "Lille OSC" },
    { name: "Tajon Buchanan", number: 7, position: "FW", club: "Inter Milan" },
    { name: "Stephen Eustáquio", number: 6, position: "MF", club: "FC Porto" },
    { name: "Dayne St. Clair", number: 1, position: "GK", club: "Minnesota United" },
  ],
  usa: [
    { name: "Christian Pulisic", number: 10, position: "FW", club: "AC Milan", captain: true },
    { name: "Weston McKennie", number: 8, position: "MF", club: "Juventus" },
    { name: "Folarin Balogun", number: 9, position: "FW", club: "AS Monaco" },
    { name: "Gio Reyna", number: 7, position: "MF", club: "Borussia Dortmund" },
    { name: "Matt Turner", number: 1, position: "GK", club: "Nottingham Forest" },
  ],
  paraguay: [
    { name: "Miguel Almirón", number: 10, position: "MF", club: "Newcastle United", captain: true },
    { name: "Julio Enciso", number: 19, position: "FW", club: "Brighton" },
    { name: "Antony Silva", number: 1, position: "GK", club: "Puebla" },
    { name: "Gustavo Gómez", number: 15, position: "DF", club: "Palmeiras" },
    { name: "Mathías Villasanti", number: 8, position: "MF", club: "Grêmio" },
  ],
  // Group B
  brazil: [
    { name: "Alisson Becker", number: 1, position: "GK", club: "Liverpool" },
    { name: "Neymar Jr.", number: 10, position: "FW", club: "Al Hilal", captain: true },
    { name: "Vinícius Junior", number: 7, position: "FW", club: "Real Madrid" },
    { name: "Rodrygo", number: 11, position: "FW", club: "Real Madrid" },
    { name: "Bruno Guimarães", number: 8, position: "MF", club: "Newcastle United" },
  ],
  argentina: [
    { name: "Lionel Messi", number: 10, position: "FW", club: "Inter Miami", captain: true },
    { name: "Emiliano Martínez", number: 23, position: "GK", club: "Aston Villa" },
    { name: "Enzo Fernández", number: 8, position: "MF", club: "Chelsea" },
    { name: "Julián Álvarez", number: 9, position: "FW", club: "Manchester City" },
    { name: "Cristian Romero", number: 13, position: "DF", club: "Tottenham Hotspur" },
  ],
  colombia: [
    { name: "Luis Díaz", number: 7, position: "FW", club: "Liverpool" },
    { name: "James Rodríguez", number: 10, position: "MF", club: "São Paulo", captain: true },
    { name: "Camilo Vargas", number: 1, position: "GK", club: "Atlas" },
    { name: "Jhon Durán", number: 9, position: "FW", club: "Al Nassr" },
    { name: "Davinson Sánchez", number: 4, position: "DF", club: "Galatasaray" },
  ],
  south_korea: [
    { name: "Son Heung-min", number: 7, position: "FW", club: "Tottenham Hotspur", captain: true },
    { name: "Kim Min-jae", number: 4, position: "DF", club: "Bayern Munich" },
    { name: "Lee Kang-in", number: 18, position: "MF", club: "Paris Saint-Germain" },
    { name: "Hwang Hee-chan", number: 11, position: "FW", club: "Wolverhampton" },
    { name: "Jo Hyeon-woo", number: 1, position: "GK", club: "Ulsan HD" },
  ],
  // Group C
  france: [
    { name: "Kylian Mbappé", number: 10, position: "FW", club: "Real Madrid", captain: true },
    { name: "Eduardo Camavinga", number: 6, position: "MF", club: "Real Madrid" },
    { name: "Mike Maignan", number: 16, position: "GK", club: "AC Milan" },
    { name: "Ousmane Dembélé", number: 11, position: "FW", club: "Paris Saint-Germain" },
    { name: "William Saliba", number: 17, position: "DF", club: "Arsenal" },
  ],
  germany: [
    { name: "Florian Wirtz", number: 10, position: "MF", club: "Bayer Leverkusen" },
    { name: "Jamal Musiala", number: 14, position: "MF", club: "Bayern Munich" },
    { name: "Joshua Kimmich", number: 6, position: "MF", club: "Bayern Munich", captain: true },
    { name: "Kai Havertz", number: 7, position: "FW", club: "Arsenal" },
    { name: "Antonio Rüdiger", number: 2, position: "DF", club: "Real Madrid" },
  ],
  japan: [
    { name: "Kaoru Mitoma", number: 7, position: "FW", club: "Brighton" },
    { name: "Takefusa Kubo", number: 10, position: "MF", club: "Real Sociedad" },
    { name: "Wataru Endo", number: 6, position: "MF", club: "Liverpool", captain: true },
    { name: "Zion Suzuki", number: 1, position: "GK", club: "Parma" },
    { name: "Ko Itakura", number: 4, position: "DF", club: "Borussia Mönchengladbach" },
  ],
  czechia: [
    { name: "Tomáš Souček", number: 8, position: "MF", club: "West Ham United", captain: true },
    { name: "Patrik Schick", number: 10, position: "FW", club: "Bayer Leverkusen" },
    { name: "Matěj Kovář", number: 1, position: "GK", club: "Bayer Leverkusen" },
    { name: "Vladimír Coufal", number: 5, position: "DF", club: "West Ham United" },
    { name: "Adam Hložek", number: 9, position: "FW", club: "Leicester City" },
  ],
  // Group D
  spain: [
    { name: "Pedri", number: 8, position: "MF", club: "Barcelona" },
    { name: "Lamine Yamal", number: 19, position: "FW", club: "Barcelona" },
    { name: "Unai Simón", number: 23, position: "GK", club: "Athletic Club" },
    { name: "Álvaro Morata", number: 7, position: "FW", club: "Atlético Madrid", captain: true },
    { name: "Rodri", number: 16, position: "MF", club: "Manchester City" },
  ],
  netherlands: [
    { name: "Virgil van Dijk", number: 4, position: "DF", club: "Liverpool", captain: true },
    { name: "Frenkie de Jong", number: 21, position: "MF", club: "Barcelona" },
    { name: "Cody Gakpo", number: 8, position: "FW", club: "Liverpool" },
    { name: "Xavi Simons", number: 10, position: "MF", club: "RB Leipzig" },
    { name: "Bart Verbruggen", number: 1, position: "GK", club: "Brighton" },
  ],
  senegal: [
    { name: "Sadio Mané", number: 10, position: "FW", club: "Al Nassr", captain: true },
    { name: "Édouard Mendy", number: 16, position: "GK", club: "Al Ahli" },
    { name: "Kalidou Koulibaly", number: 3, position: "DF", club: "Al Hilal" },
    { name: "Nicolas Jackson", number: 9, position: "FW", club: "Chelsea" },
    { name: "Pape Matar Sarr", number: 17, position: "MF", club: "Tottenham Hotspur" },
  ],
  bosnia: [
    { name: "Edin Džeko", number: 11, position: "FW", club: "Fenerbahçe", captain: true },
    { name: "Ibrahim Šehić", number: 1, position: "GK", club: "Al Khaleej" },
    { name: "Miralem Pjanić", number: 10, position: "MF", club: "Sharjah FC" },
    { name: "Sead Kolašinac", number: 5, position: "DF", club: "Atalanta" },
    { name: "Ermedin Demirović", number: 9, position: "FW", club: "VfB Stuttgart" },
  ],
  // Group E
  england: [
    { name: "Jude Bellingham", number: 10, position: "MF", club: "Real Madrid", captain: true },
    { name: "Harry Kane", number: 9, position: "FW", club: "Bayern Munich" },
    { name: "Bukayo Saka", number: 7, position: "FW", club: "Arsenal" },
    { name: "Declan Rice", number: 4, position: "MF", club: "Arsenal" },
    { name: "Jordan Pickford", number: 1, position: "GK", club: "Everton" },
  ],
  portugal: [
    { name: "Cristiano Ronaldo", number: 7, position: "FW", club: "Al Nassr", captain: true },
    { name: "Bruno Fernandes", number: 8, position: "MF", club: "Manchester United" },
    { name: "Rafael Leão", number: 17, position: "FW", club: "AC Milan" },
    { name: "Rúben Dias", number: 3, position: "DF", club: "Manchester City" },
    { name: "Diogo Costa", number: 1, position: "GK", club: "FC Porto" },
  ],
  morocco: [
    { name: "Achraf Hakimi", number: 2, position: "DF", club: "Paris Saint-Germain", captain: true },
    { name: "Yassine Bounou", number: 1, position: "GK", club: "Al Hilal" },
    { name: "Brahim Díaz", number: 10, position: "MF", club: "Real Madrid" },
    { name: "Youssef En-Nesyri", number: 9, position: "FW", club: "Fenerbahçe" },
    { name: "Sofyan Amrabat", number: 4, position: "MF", club: "Manchester United" },
  ],
  norway: [
    { name: "Erling Haaland", number: 9, position: "FW", club: "Manchester City", captain: true },
    { name: "Martin Ødegaard", number: 10, position: "MF", club: "Arsenal" },
    { name: "Ørjan Nyland", number: 1, position: "GK", club: "Sevilla" },
    { name: "Alexander Sørloth", number: 23, position: "FW", club: "Atlético Madrid" },
    { name: "Julian Ryerson", number: 14, position: "DF", club: "Borussia Dortmund" },
  ],
  // Group F
  italy: [
    { name: "Gianluigi Donnarumma", number: 1, position: "GK", club: "Paris Saint-Germain", captain: true },
    { name: "Nicolò Barella", number: 18, position: "MF", club: "Inter Milan" },
    { name: "Federico Chiesa", number: 14, position: "FW", club: "Juventus" },
    { name: "Giacomo Raspadori", number: 9, position: "FW", club: "Napoli" },
    { name: "Alessandro Bastoni", number: 23, position: "DF", club: "Inter Milan" },
  ],
  uruguay: [
    { name: "Federico Valverde", number: 15, position: "MF", club: "Real Madrid", captain: true },
    { name: "Darwin Núñez", number: 9, position: "FW", club: "Liverpool" },
    { name: "Sergio Rochet", number: 1, position: "GK", club: "Internacional" },
    { name: "Ronald Araujo", number: 4, position: "DF", club: "Barcelona" },
    { name: "Manuel Ugarte", number: 5, position: "MF", club: "Manchester United" },
  ],
  egypt: [
    { name: "Mohamed Salah", number: 10, position: "FW", club: "Liverpool", captain: true },
    { name: "Mohamed El Shenawy", number: 1, position: "GK", club: "Al Ahly" },
    { name: "Omar Marmoush", number: 7, position: "FW", club: "Manchester City" },
    { name: "Trézéguet", number: 11, position: "MF", club: "Trabzonspor" },
    { name: "Ahmed Hegazi", number: 6, position: "DF", club: "Al Ittihad" },
  ],
  chile: [
    { name: "Alexis Sánchez", number: 7, position: "FW", club: "Inter Milan", captain: true },
    { name: "Brayan Cortés", number: 1, position: "GK", club: "Colo-Colo" },
    { name: "Ben Brereton Díaz", number: 9, position: "FW", club: "Villarreal" },
    { name: "Erick Pulgar", number: 8, position: "MF", club: "Flamengo" },
    { name: "Guillermo Maripán", number: 3, position: "DF", club: "AS Monaco" },
  ],
  // Group G
  belgium: [
    { name: "Kevin De Bruyne", number: 7, position: "MF", club: "Manchester City", captain: true },
    { name: "Romelu Lukaku", number: 9, position: "FW", club: "Roma" },
    { name: "Thibaut Courtois", number: 1, position: "GK", club: "Real Madrid" },
    { name: "Jérémy Doku", number: 11, position: "FW", club: "Manchester City" },
    { name: "Amadou Onana", number: 6, position: "MF", club: "Aston Villa" },
  ],
  croatia: [
    { name: "Luka Modrić", number: 10, position: "MF", club: "Real Madrid", captain: true },
    { name: "Dominik Livaković", number: 1, position: "GK", club: "Fenerbahçe" },
    { name: "Joško Gvardiol", number: 4, position: "DF", club: "Manchester City" },
    { name: "Mateo Kovačić", number: 8, position: "MF", club: "Manchester City" },
    { name: "Andrej Kramarić", number: 9, position: "FW", club: "TSG Hoffenheim" },
  ],
  south_africa: [
    { name: "Ronwen Williams", number: 1, position: "GK", club: "Mamelodi Sundowns", captain: true },
    { name: "Percy Tau", number: 10, position: "FW", club: "Al Ahly" },
    { name: "Evidence Makgopa", number: 9, position: "FW", club: "Orlando Pirates" },
    { name: "Teboho Mokoena", number: 8, position: "MF", club: "Mamelodi Sundowns" },
    { name: "Aubrey Modiba", number: 13, position: "DF", club: "Mamelodi Sundowns" },
  ],
  iran: [
    { name: "Mehdi Taremi", number: 9, position: "FW", club: "Inter Milan", captain: true },
    { name: "Alireza Beiranvand", number: 1, position: "GK", club: "Persepolis" },
    { name: "Sardar Azmoun", number: 20, position: "FW", club: "Roma" },
    { name: "Saeid Ezatolahi", number: 6, position: "MF", club: "Shabab Al Ahli" },
    { name: "Hossein Kanaanizadegan", number: 4, position: "DF", club: "Persepolis" },
  ],
  // Group H
  nigeria: [
    { name: "Victor Osimhen", number: 9, position: "FW", club: "Galatasaray", captain: true },
    { name: "Ademola Lookman", number: 11, position: "FW", club: "Atalanta" },
    { name: "Stanley Nwabali", number: 1, position: "GK", club: "Chippa United" },
    { name: "Wilfred Ndidi", number: 4, position: "MF", club: "Leicester City" },
    { name: "Calvin Bassey", number: 6, position: "DF", club: "Fulham" },
  ],
  australia: [
    { name: "Mat Ryan", number: 1, position: "GK", club: "Roma", captain: true },
    { name: "Harry Souttar", number: 19, position: "DF", club: "Leicester City" },
    { name: "Jackson Irvine", number: 8, position: "MF", club: "St. Pauli" },
    { name: "Riley McGree", number: 14, position: "MF", club: "Middlesbrough" },
    { name: "Kusini Yengi", number: 9, position: "FW", club: "Portsmouth" },
  ],
  peru: [
    { name: "Paolo Guerrero", number: 9, position: "FW", club: "Alianza Lima", captain: true },
    { name: "Pedro Gallese", number: 1, position: "GK", club: "Orlando City" },
    { name: "Luis Advíncula", number: 17, position: "DF", club: "Boca Juniors" },
    { name: "Renato Tapia", number: 13, position: "MF", club: "Celta Vigo" },
    { name: "Gianluca Lapadula", number: 14, position: "FW", club: "Cagliari" },
  ],
  saudi_arabia: [
    { name: "Salem Al-Dawsari", number: 10, position: "FW", club: "Al Hilal", captain: true },
    { name: "Mohammed Al-Owais", number: 1, position: "GK", club: "Al Hilal" },
    { name: "Firas Al-Buraikan", number: 9, position: "FW", club: "Al Ahli" },
    { name: "Abdulelah Al-Malki", number: 8, position: "MF", club: "Al Hilal" },
    { name: "Ali Al-Bulaihi", number: 4, position: "DF", club: "Al Hilal" },
  ],
  // Group I
  switzerland: [
    { name: "Granit Xhaka", number: 10, position: "MF", club: "Bayer Leverkusen", captain: true },
    { name: "Yann Sommer", number: 1, position: "GK", club: "Inter Milan" },
    { name: "Breel Embolo", number: 7, position: "FW", club: "AS Monaco" },
    { name: "Manuel Akanji", number: 5, position: "DF", club: "Manchester City" },
    { name: "Denis Zakaria", number: 6, position: "MF", club: "Juventus" },
  ],
  denmark: [
    { name: "Christian Eriksen", number: 10, position: "MF", club: "Manchester United", captain: true },
    { name: "Kasper Schmeichel", number: 1, position: "GK", club: "Celtic" },
    { name: "Rasmus Højlund", number: 9, position: "FW", club: "Manchester United" },
    { name: "Pierre-Emile Højbjerg", number: 23, position: "MF", club: "Tottenham Hotspur" },
    { name: "Joachim Andersen", number: 2, position: "DF", club: "Crystal Palace" },
  ],
  ecuador: [
    { name: "Moisés Caicedo", number: 23, position: "MF", club: "Chelsea", captain: true },
    { name: "Hernán Galíndez", number: 1, position: "GK", club: "Huracán" },
    { name: "Enner Valencia", number: 13, position: "FW", club: "Internacional" },
    { name: "Piero Hincapié", number: 3, position: "DF", club: "Bayer Leverkusen" },
    { name: "Kendry Páez", number: 10, position: "MF", club: "Chelsea" },
  ],
  new_zealand: [
    { name: "Chris Wood", number: 9, position: "FW", club: "Nottingham Forest", captain: true },
    { name: "Max Crocombe", number: 1, position: "GK", club: "Burton Albion" },
    { name: "Sarpreet Singh", number: 10, position: "MF", club: "Hansa Rostock" },
    { name: "Winston Reid", number: 4, position: "DF", club: "Free Agent" },
    { name: "Joe Bell", number: 8, position: "MF", club: "Viking FK" },
  ],
  // Group J
  austria: [
    { name: "David Alaba", number: 8, position: "DF", club: "Real Madrid", captain: true },
    { name: "Patrick Pentz", number: 1, position: "GK", club: "Brøndby" },
    { name: "Marcel Sabitzer", number: 9, position: "MF", club: "Borussia Dortmund" },
    { name: "Marko Arnautović", number: 7, position: "FW", club: "Inter Milan" },
    { name: "Konrad Laimer", number: 6, position: "MF", club: "Bayern Munich" },
  ],
  serbia: [
    { name: "Dušan Vlahović", number: 9, position: "FW", club: "Juventus", captain: true },
    { name: "Vanja Milinković-Savić", number: 1, position: "GK", club: "Torino" },
    { name: "Aleksandar Mitrović", number: 19, position: "FW", club: "Al Hilal" },
    { name: "Sergej Milinković-Savić", number: 8, position: "MF", club: "Al Hilal" },
    { name: "Strahinja Pavlović", number: 4, position: "DF", club: "AC Milan" },
  ],
  qatar: [
    { name: "Akram Afif", number: 11, position: "FW", club: "Al Sadd", captain: true },
    { name: "Meshaal Barsham", number: 1, position: "GK", club: "Al Sadd" },
    { name: "Almoez Ali", number: 19, position: "FW", club: "Al Duhail" },
    { name: "Abdulaziz Hatem", number: 6, position: "MF", club: "Al Rayyan" },
    { name: "Boualem Khoukhi", number: 5, position: "DF", club: "Al Sadd" },
  ],
  jamaica: [
    { name: "Leon Bailey", number: 7, position: "FW", club: "Aston Villa", captain: true },
    { name: "Andre Blake", number: 1, position: "GK", club: "Philadelphia Union" },
    { name: "Michail Antonio", number: 9, position: "FW", club: "West Ham United" },
    { name: "Bobby Decordova-Reid", number: 10, position: "MF", club: "Fulham" },
    { name: "Ethan Pinnock", number: 5, position: "DF", club: "Brentford" },
  ],
  // Group K
  sweden: [
    { name: "Alexander Isak", number: 9, position: "FW", club: "Newcastle United", captain: true },
    { name: "Robin Olsen", number: 1, position: "GK", club: "Aston Villa" },
    { name: "Dejan Kulusevski", number: 10, position: "MF", club: "Tottenham Hotspur" },
    { name: "Viktor Gyökeres", number: 17, position: "FW", club: "Sporting CP" },
    { name: "Victor Lindelöf", number: 3, position: "DF", club: "Manchester United" },
  ],
  poland: [
    { name: "Robert Lewandowski", number: 9, position: "FW", club: "Barcelona", captain: true },
    { name: "Wojciech Szczęsny", number: 1, position: "GK", club: "Juventus" },
    { name: "Piotr Zieliński", number: 10, position: "MF", club: "Napoli" },
    { name: "Jakub Kiwior", number: 14, position: "DF", club: "Arsenal" },
    { name: "Nicola Zalewski", number: 20, position: "MF", club: "Roma" },
  ],
  ukraine: [
    { name: "Artem Dovbyk", number: 9, position: "FW", club: "Girona" },
    { name: "Anatoliy Trubin", number: 1, position: "GK", club: "Benfica" },
    { name: "Mykhailo Mudryk", number: 10, position: "FW", club: "Chelsea" },
    { name: "Oleksandr Zinchenko", number: 17, position: "DF", club: "Arsenal", captain: true },
    { name: "Viktor Tsygankov", number: 7, position: "MF", club: "Girona" },
  ],
  mali: [
    { name: "Yves Bissouma", number: 8, position: "MF", club: "Tottenham Hotspur" },
    { name: "Djigui Diarra", number: 1, position: "GK", club: "Young Africans" },
    { name: "El Bilal Touré", number: 9, position: "FW", club: "Atalanta" },
    { name: "Amadou Haidara", number: 10, position: "MF", club: "RB Leipzig", captain: true },
    { name: "Sikou Niakaté", number: 5, position: "DF", club: "Braga" },
  ],
  // Group L
  hungary: [
    { name: "Dominik Szoboszlai", number: 10, position: "MF", club: "Liverpool", captain: true },
    { name: "Péter Gulácsi", number: 1, position: "GK", club: "RB Leipzig" },
    { name: "Roland Sallai", number: 7, position: "FW", club: "SC Freiburg" },
    { name: "Willi Orbán", number: 4, position: "DF", club: "RB Leipzig" },
    { name: "Milos Kerkez", number: 3, position: "DF", club: "Bournemouth" },
  ],
  scotland: [
    { name: "Andrew Robertson", number: 3, position: "DF", club: "Liverpool", captain: true },
    { name: "Angus Gunn", number: 1, position: "GK", club: "Norwich City" },
    { name: "Scott McTominay", number: 4, position: "MF", club: "Napoli" },
    { name: "John McGinn", number: 7, position: "MF", club: "Aston Villa" },
    { name: "Ché Adams", number: 9, position: "FW", club: "Torino" },
  ],
  algeria: [
    { name: "Riyad Mahrez", number: 7, position: "FW", club: "Al Ahli", captain: true },
    { name: "Anthony Mandrea", number: 1, position: "GK", club: "Caen" },
    { name: "Ismaël Bennacer", number: 6, position: "MF", club: "AC Milan" },
    { name: "Ramy Bensebaini", number: 2, position: "DF", club: "Borussia Dortmund" },
    { name: "Amine Gouiri", number: 9, position: "FW", club: "Rennes" },
  ],
  panama: [
    { name: "Aníbal Godoy", number: 20, position: "MF", club: "Nashville SC", captain: true },
    { name: "Luis Mejía", number: 1, position: "GK", club: "Nacional" },
    { name: "José Fajardo", number: 9, position: "FW", club: "Universidad Católica" },
    { name: "Adalberto Carrasquilla", number: 10, position: "MF", club: "Houston Dynamo" },
    { name: "Fidel Escobar", number: 4, position: "DF", club: "Deportivo Saprissa" },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FLAT PLAYER LIST — 240+ players across all 48 teams
// ═══════════════════════════════════════════════════════════════

export const ALL_PLAYERS = Object.entries(PLAYER_ROSTERS).flatMap(([countryId, players]) => {
  const countryMap = {
    south_korea: "South Korea", south_africa: "South Africa", saudi_arabia: "Saudi Arabia",
    new_zealand: "New Zealand", czechia: "Czechia", bosnia: "Bosnia",
  };
  const country = countryMap[countryId] || countryId.charAt(0).toUpperCase() + countryId.slice(1);
  const flagMap = {
    south_korea: "kr", south_africa: "za", saudi_arabia: "sa", new_zealand: "nz",
    czechia: "cz", bosnia: "ba", iran: "ir", morocco: "ma", senegal: "sn",
    qatar: "qa", jamaica: "jm", mali: "ml", algeria: "dz", panama: "pa",
    ecuador: "ec", paraguay: "py", chile: "cl", peru: "pe", uruguay: "uy",
    norway: "no", sweden: "se", poland: "pl", ukraine: "ua", hungary: "hu",
    scotland: "gb", serbia: "rs", croatia: "hr", switzerland: "ch", austria: "at",
    denmark: "dk", belgium: "be", netherlands: "nl", portugal: "pt", spain: "es",
    germany: "de", france: "fr", italy: "it", england: "gb", argentina: "ar",
    brazil: "br", mexico: "mx", usa: "us", canada: "ca", japan: "jp",
    nigeria: "ng", egypt: "eg", australia: "au",
  };
  return players.map(p => ({
    ...p,
    countryId, country,
    flagCode: flagMap[countryId] || countryId.slice(0, 2),
    display: `${p.name} · #${p.number} · ${p.position} (${country})`,
    defaultText: `${p.name.split(" ").pop()?.toUpperCase()}\n${p.number}`,
  }));
});
