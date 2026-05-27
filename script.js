const ROWS = 7;
const COLS = 9;
const MAX_ITEMS = 5;
const MAX_POWER_SHARDS = 3;
const DEFAULT_MAX_STAT = 200;
const HEAL_AMOUNT = 20;
const ENEMY_TILE_END_DAMAGE = 5;
const FLAG_POINTS = 15;
const BOARD_SIZE = 48;
const BOARD_GAP = 8;
const BACKGROUND_IMAGE_PATH = "assets/backgrounds/";
const GUIDE_IMAGE_PATH = "assets/guides/";
const ITEM_IMAGE_PATH = "assets/items/";
const TANKER2_ITEM_TYPES = ["abilityRestore", "abilityExpand", "potion"];
const OBSTACLE_BASE_HP = 20;
const SIMPLE_ARENA_MAX_ROUNDS = 30;
const FLAG_CARRIER_MAX_ROUNDS = 15;
const CAPTURE_TERRITORY_MAX_ROUNDS = 15;
const ROYAL_MARCH_MAX_ROUNDS = 15;
const CENTRAL_DOMINION_MAX_ROUNDS = 15;
const BIG_BRIDGE_MAX_ROUNDS = 30;
const ROYAL_MARCH_MIN_PLAYERS = 4;
const ROYAL_MARCH_MAX_PLAYERS = 8;
const ROYAL_MARCH_PLAYER_COUNT = 8;
const ROYAL_MARCH_ROLE_ORDER = ["king", "queen", "rook", "bishop", "knight"];
const ROYAL_MARCH_ROLE_DEFINITIONS = {
  king: { id: "king", label: "King", icon: "♔", maxPerTeam: 1, requiredPerTeam: 1 },
  queen: { id: "queen", label: "Queen", icon: "♕", maxPerTeam: 1 },
  rook: { id: "rook", label: "Rook", icon: "♖", maxPerTeam: 2 },
  bishop: { id: "bishop", label: "Bishop", icon: "♗", maxPerTeam: 2 },
  knight: { id: "knight", label: "Knight", icon: "♘", maxPerTeam: 2 }
};
const ROYAL_MARCH_DEFAULT_ROLES = ["king", "queen", "rook", "bishop", "king", "queen", "rook", "bishop"];
const ROYAL_MARCH_STARTS = [
  { row: 1, col: 1, label: "File B Rank 2" },
  { row: 5, col: 1, label: "File B Rank 6" },
  { row: 0, col: 3, label: "File D Rank 1" },
  { row: 2, col: 3, label: "File D Rank 3" },
  { row: 4, col: 3, label: "File D Rank 5" },
  { row: 6, col: 3, label: "File D Rank 7" },
  { row: 1, col: 5, label: "File F Rank 2" },
  { row: 5, col: 5, label: "File F Rank 6" }
].map((entry, index) => ({
  ...entry,
  key: `royal-start-${index}`,
  teamKey: entry.row <= 2 ? "red" : "blue"
}));
const FLAG_CARRIER_LAYOUT = [
  [1,1,1,0,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0,0,0],
  [0,1,1,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,0,0]
];

const CAPTURE_TERRITORY_LAYOUT = [
  [0,0,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,1,0,0,1,1,1,0,0,0,0,0],
  [0,0,1,0,1,1,1,1,1,0,0,0,0],
  [0,0,1,0,1,1,1,1,1,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,1,1,0,0,1,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0]
];

const CAPTURE_TERRITORY_ZONES = [
  { id: "northTerritory", label: "North Territory", rowStart: 0, rowEnd: 1, colStart: 2, colEnd: 4 },
  { id: "centerTerritory", label: "Center Territory", rowStart: 3, rowEnd: 5, colStart: 5, colEnd: 7 },
  { id: "southTerritory", label: "South Territory", rowStart: 8, rowEnd: 9, colStart: 6, colEnd: 8 }
];
const CENTRAL_DOMINION_CONTROL_AREA = {
  id: "centralDominionCore",
  label: "Central Core",
  rowStart: 2,
  rowEnd: 4,
  colStart: 4,
  colEnd: 7
};
const BIG_BRIDGE_LAYOUT = [
  [1,1,1,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,1,1,1],
  [1,1,1,0,0,0,0,0,0,0,1,1,1]
];
const FOOD_COURT_MAX_ROUNDS = 30;
const FOOD_COURT_FOOD_ORDER = ["sushi", "burger", "dumpling"];
const FOOD_COURT_FOOD_TYPES = {
  sushi: { id: "sushi", label: "Japanese Food", icon: "🍣", shopType: "food-sushi" },
  burger: { id: "burger", label: "Western Food", icon: "🍔", shopType: "food-burger" },
  dumpling: { id: "dumpling", label: "Chinese Food", icon: "🥟", shopType: "food-dumpling" }
};
const FOOD_COURT_LAYOUT = [
  "....###....",
  "...#####...",
  "...#####...",
  "..#######..",
  ".#########.",
  "###########",
  "###########",
  "###########",
  ".#########.",
  "..#######.."
].map((row) => row.split("").map((entry) => entry === "#"));
const FOOD_COURT_TABLES = [
  {
    id: "topLeft",
    label: "Top-left table",
    row: 5,
    col: 4,
    starts: [
      { row: 4, col: 4, label: "Top-left table north seat" },
      { row: 5, col: 3, label: "Top-left table west seat" }
    ]
  },
  {
    id: "topRight",
    label: "Top-right table",
    row: 5,
    col: 6,
    starts: [
      { row: 4, col: 6, label: "Top-right table north seat" },
      { row: 5, col: 7, label: "Top-right table east seat" }
    ]
  },
  {
    id: "bottomLeft",
    label: "Bottom-left table",
    row: 7,
    col: 4,
    starts: [
      { row: 7, col: 3, label: "Bottom-left table west seat" },
      { row: 8, col: 4, label: "Bottom-left table south seat" }
    ]
  },
  {
    id: "bottomRight",
    label: "Bottom-right table",
    row: 7,
    col: 6,
    starts: [
      { row: 7, col: 7, label: "Bottom-right table east seat" },
      { row: 8, col: 6, label: "Bottom-right table south seat" }
    ]
  }
];
const FOOD_COURT_SHOPS = {
  sushi: { id: "sushi", row: 6, col: 0, foodType: "sushi", specialType: "food-sushi" },
  burger: { id: "burger", row: 0, col: 5, foodType: "burger", specialType: "food-burger" },
  dumpling: { id: "dumpling", row: 6, col: 10, foodType: "dumpling", specialType: "food-dumpling" },
  generalLeft: { id: "generalLeft", row: 9, col: 2, specialType: "general-store" },
  generalRight: { id: "generalRight", row: 9, col: 8, specialType: "general-store" }
};
const FOOD_COURT_HUNGRY_TILE = { row: 6, col: 5, specialType: "hungry" };
const FOOD_COURT_TABLE_ASSIGNMENT_ORDER = FOOD_COURT_TABLES.map((table) => table.id);
const OBSTACLE_DEFINITIONS = {
  forceRock: {
    id: "forceRock",
    name: "Power Rock",
    icon: "⚔️",
    allowedStat: "attack",
    hp: OBSTACLE_BASE_HP,
    dropItemId: "forceShard"
  },
  intelligenceRock: {
    id: "intelligenceRock",
    name: "Technique Rock",
    icon: "🧠",
    allowedStat: "technique",
    hp: OBSTACLE_BASE_HP,
    dropItemId: "forceShard"
  },
  vitalityRock: {
    id: "vitalityRock",
    name: "HP Rock",
    icon: "💗",
    allowedStat: "hp",
    hp: OBSTACLE_BASE_HP,
    dropItemId: "forceShard"
  }
};

const MAP_LIBRARY = {
  simpleArena: {
    id: "simpleArena",
    name: "Simple Arena",
    rows: ROWS,
    cols: COLS,
    flagBonus: FLAG_POINTS,
    enemyTileEndDamage: ENEMY_TILE_END_DAMAGE,
    maxRounds: SIMPLE_ARENA_MAX_ROUNDS,
    endWhenBoardFull: true,
    specialTiles: [
      { row: 3, col: 4, type: "flag", label: "Flag" },
      { row: 3, col: 4, type: "heal-hp", label: "HP Restore" },
      { row: 3, col: 1, type: "heal-atk", label: "Attack Restore" },
      { row: 3, col: 7, type: "heal-tech", label: "Technique Restore" }
    ],
    startCorners: [
      { row: 0, col: 0, label: "Top Left A" },
      { row: 0, col: 1, label: "Top Left B" },
      { row: 0, col: COLS - 2, label: "Top Right A" },
      { row: 0, col: COLS - 1, label: "Top Right B" },
      { row: ROWS - 1, col: 0, label: "Bottom Left A" },
      { row: ROWS - 1, col: 1, label: "Bottom Left B" },
      { row: ROWS - 1, col: COLS - 2, label: "Bottom Right A" },
      { row: ROWS - 1, col: COLS - 1, label: "Bottom Right B" }
    ],
    getObstacleEntries() {
      return getObstacleLayoutEntries();
    },
    getDetailLines() {
      return [
        { label: "🚩 Flag Bonus", value: "+15" },
        { label: "Special Tiles", value: "Flag, HP restore, attack restore, technique restore" },
        { label: "Obstacles", value: "8 rocks in the center zone" },
        { label: "End Conditions", value: `All tiles claimed by round end / round ${SIMPLE_ARENA_MAX_ROUNDS} ends` }
      ];
    }
  },
  flagCarrier: {
    id: "flagCarrier",
    name: "Flag Carrier",
    rows: 13,
    cols: 10,
    flagBonus: 0,
    enemyTileEndDamage: 100,
    maxRounds: FLAG_CARRIER_MAX_ROUNDS,
    endWhenBoardFull: false,
    flagDeliveryEndsGame: true,
    specialTiles: [
      { row: 6, col: 9, type: "flag", label: "Flag" }
    ],
    startCorners: [
      { row: 0, col: 0, label: "Left Column Rank 1" },
      { row: 1, col: 0, label: "Left Column Rank 2" },
      { row: 11, col: 0, label: "Left Column Rank 12" },
      { row: 12, col: 0, label: "Left Column Rank 13" },
      { row: 0, col: 2, label: "Third Column Rank 1" },
      { row: 1, col: 2, label: "Third Column Rank 2" },
      { row: 11, col: 2, label: "Third Column Rank 12" },
      { row: 12, col: 2, label: "Third Column Rank 13" }
    ],
    hasCell(row, col) {
      return !!FLAG_CARRIER_LAYOUT[row]?.[col];
    },
    getObstacleEntries() {
      return [{ row: 6, col: 7, obstacleId: "vitalityRock" }];
    },
    getDetailLines() {
      return [
        { label: "🚩 Flag Bonus", value: "+0" },
        { label: "Special Tiles", value: "Flag only" },
        { label: "Obstacles", value: "1 HP Rock blocks the final approach" },
        { label: "Hazards", value: "Ending your turn on an opponent-owned tile deals 100 HP damage" },
        { label: "End Conditions", value: `Carry the flag to any allied base / round ${FLAG_CARRIER_MAX_ROUNDS} ends` }
      ];
    }
  },
  captureTerritory: {
    id: "captureTerritory",
    name: "Capture Territory",
    rows: 10,
    cols: 13,
    flagBonus: 0,
    enemyTileEndDamage: ENEMY_TILE_END_DAMAGE,
    maxRounds: CAPTURE_TERRITORY_MAX_ROUNDS,
    endWhenBoardFull: false,
    territories: CAPTURE_TERRITORY_ZONES,
    specialTiles: [],
    startCorners: [
      { row: 5, col: 0, label: "Left Spawn A1" },
      { row: 6, col: 0, label: "Left Spawn A2" },
      { row: 5, col: 1, label: "Left Spawn B1" },
      { row: 6, col: 1, label: "Left Spawn B2" },
      { row: 5, col: 11, label: "Right Spawn A1" },
      { row: 6, col: 11, label: "Right Spawn A2" },
      { row: 5, col: 12, label: "Right Spawn B1" },
      { row: 6, col: 12, label: "Right Spawn B2" }
    ],
    hasCell(row, col) {
      return !!CAPTURE_TERRITORY_LAYOUT[row]?.[col];
    },
    getObstacleEntries() {
      return [];
    },
    getDetailLines() {
      return [
        { label: "🟫 Field Points", value: "Own painted field tiles to score, including territory tiles" },
        { label: "🟩 Territory Income", value: "A territory gives 3+ points at round end when one player or team owns all painted tiles there and no enemy is inside" },
        { label: "⚔️ Territory Rule", value: "Mixed paint or enemy presence inside the same territory blocks all control points for that zone" },
        { label: "End Conditions", value: `Highest score after round ${CAPTURE_TERRITORY_MAX_ROUNDS} wins` }
      ];
    }
  },
  royalMarch: {
    id: "royalMarch",
    name: "Royal March",
    rows: 7,
    cols: 7,
    flagBonus: 0,
    enemyTileEndDamage: ENEMY_TILE_END_DAMAGE,
    maxRounds: ROYAL_MARCH_MAX_ROUNDS,
    endWhenBoardFull: false,
    royalMarch: true,
    specialTiles: [],
    startCorners: ROYAL_MARCH_STARTS,
    getObstacleEntries() {
      return [];
    },
    getDetailLines() {
      return [
        { label: "Board", value: "7x7 chessboard field" },
        { label: "Teams", value: "4-8 players, Red and Blue teams only" },
        { label: "Royal Pieces", value: "Each player moves as King, Queen, Rook, Bishop, or Knight; Kings need own-team tiles; they may enter only unowned enemy back-rank tiles to claim the goal" },
        { label: "End Conditions", value: `King holds the enemy back rank at round end / highest team score after round ${ROYAL_MARCH_MAX_ROUNDS}; defeating a King gives +3, not instant victory` }
      ];
    }
  },
  centralDominion: {
    id: "centralDominion",
    name: "Central Dominion",
    rows: 7,
    cols: 12,
    flagBonus: 0,
    enemyTileEndDamage: ENEMY_TILE_END_DAMAGE,
    maxRounds: CENTRAL_DOMINION_MAX_ROUNDS,
    endWhenBoardFull: false,
    controlArea: CENTRAL_DOMINION_CONTROL_AREA,
    specialTiles: [],
    startCorners: [
      { row: 1, col: 0, label: "Left Edge Rank 2" },
      { row: 5, col: 0, label: "Left Edge Rank 6" },
      { row: 0, col: 1, label: "Left Inner Rank 1" },
      { row: 6, col: 1, label: "Left Inner Rank 7" },
      { row: 0, col: 10, label: "Right Inner Rank 1" },
      { row: 6, col: 10, label: "Right Inner Rank 7" },
      { row: 1, col: 11, label: "Right Edge Rank 2" },
      { row: 5, col: 11, label: "Right Edge Rank 6" }
    ],
    hasCell(row, col) {
      if (col === 0 || col === 11) return row > 0 && row < 6;
      return true;
    },
    getObstacleEntries() {
      return [];
    },
    getDetailLines() {
      return [
        { label: "Board", value: "7x12 field with clipped outer corners" },
        { label: "Central Core", value: "12 tiles from columns 5-8 and rows 3-5" },
        { label: "End Conditions", value: `Own every Central Core tile for an instant win / highest score after round ${CENTRAL_DOMINION_MAX_ROUNDS}` }
      ];
    }
  },
  bigBridge: {
    id: "bigBridge",
    name: "Big Bridge",
    rows: 6,
    cols: 13,
    flagBonus: FLAG_POINTS,
    enemyTileEndDamage: ENEMY_TILE_END_DAMAGE,
    maxRounds: BIG_BRIDGE_MAX_ROUNDS,
    endWhenBoardFull: true,
    specialTiles: [
      { row: 2, col: 6, type: "flag", label: "Flag" },
      { row: 3, col: 6, type: "heal-hp", label: "HP Restore" },
      { row: 2, col: 0, type: "heal-atk", label: "Attack Restore" },
      { row: 3, col: 12, type: "heal-atk", label: "Attack Restore" },
      { row: 3, col: 0, type: "heal-tech", label: "Technique Restore" },
      { row: 2, col: 12, type: "heal-tech", label: "Technique Restore" }
    ],
    startCorners: [
      { row: 0, col: 0, label: "Left Edge Top" },
      { row: 5, col: 0, label: "Left Edge Bottom" },
      { row: 0, col: 2, label: "Left Inner Top" },
      { row: 5, col: 2, label: "Left Inner Bottom" },
      { row: 0, col: 10, label: "Right Inner Top" },
      { row: 5, col: 10, label: "Right Inner Bottom" },
      { row: 0, col: 12, label: "Right Edge Top" },
      { row: 5, col: 12, label: "Right Edge Bottom" }
    ],
    hasCell(row, col) {
      return !!BIG_BRIDGE_LAYOUT[row]?.[col];
    },
    getObstacleEntries() {
      return [
        { row: 2, col: 3, obstacleId: "forceRock" },
        { row: 3, col: 3, obstacleId: "vitalityRock" },
        { row: 2, col: 9, obstacleId: "intelligenceRock" },
        { row: 3, col: 9, obstacleId: "vitalityRock" }
      ];
    },
    getDetailLines() {
      return [
        { label: "🚩 Flag Bonus", value: "+15" },
        { label: "Special Tiles", value: "Flag, HP restore, 2 attack restore, 2 technique restore" },
        { label: "Obstacles", value: "1 Power Rock, 1 Technique Rock, and 2 HP Rocks guard the bridge" },
        { label: "End Conditions", value: `All playable tiles claimed by round end / round ${BIG_BRIDGE_MAX_ROUNDS} ends` }
      ];
    }
  },
  foodCourt: {
    id: "foodCourt",
    name: "Food Court",
    rows: FOOD_COURT_LAYOUT.length,
    cols: FOOD_COURT_LAYOUT[0].length,
    flagBonus: FLAG_POINTS,
    enemyTileEndDamage: ENEMY_TILE_END_DAMAGE,
    maxRounds: FOOD_COURT_MAX_ROUNDS,
    endWhenBoardFull: false,
    teamOnly: true,
    minTeams: 2,
    maxTeams: 4,
    foodCourt: true,
    specialTiles: [
      { row: FOOD_COURT_SHOPS.sushi.row, col: FOOD_COURT_SHOPS.sushi.col, type: "food-sushi", label: "Japanese Food Shop" },
      { row: FOOD_COURT_SHOPS.burger.row, col: FOOD_COURT_SHOPS.burger.col, type: "food-burger", label: "Western Food Shop" },
      { row: FOOD_COURT_SHOPS.dumpling.row, col: FOOD_COURT_SHOPS.dumpling.col, type: "food-dumpling", label: "Chinese Food Shop" },
      { row: FOOD_COURT_SHOPS.generalLeft.row, col: FOOD_COURT_SHOPS.generalLeft.col, type: "general-store", label: "General Store" },
      { row: FOOD_COURT_SHOPS.generalRight.row, col: FOOD_COURT_SHOPS.generalRight.col, type: "general-store", label: "General Store" },
      { row: FOOD_COURT_HUNGRY_TILE.row, col: FOOD_COURT_HUNGRY_TILE.col, type: "hungry", label: "Hungry Guest" }
    ],
    tables: FOOD_COURT_TABLES,
    startCorners: FOOD_COURT_TABLES.flatMap((table) => table.starts.map((start, seatIndex) => ({
      ...start,
      key: `${table.id}-seat-${seatIndex}`,
      tableId: table.id
    }))),
    hasCell(row, col) {
      return !!FOOD_COURT_LAYOUT[row]?.[col];
    },
    getObstacleEntries() {
      return [];
    },
    getDetailLines() {
      return [
        { label: "Map Type", value: "Team-only, 2-4 teams" },
        { label: "Food Goal", value: "Deliver 🍣, 🍔, and 🥟 to your team's table" },
        { label: "Food Points", value: "Each served food gives +5; a full set gives an extra +15, for 30 total food points" },
        { label: "Tables", value: "Tables are assigned automatically by team order; 1 table per 2 team members" },
        { label: "General Store", value: "Gives Power Shards, with a one-time 10% special item chance" },
        { label: "End Conditions", value: `Completing all 3 foods ends the game, then the highest-scoring team wins / round ${FOOD_COURT_MAX_ROUNDS} ends` }
      ];
    }
  }
};

const characterLibrary = {

  painter1: {
    id: "painter1",
    name: "Painter 1",
    displayName: "Scrabbit",
    icon: "🎨",
    type: "Painter",
    roleText: "Excels at moving across the field and painting tiles.",
    flavorText: "A rabbit-like machine once assigned to maintain the arena. Its long ears work as both antennas and stabilizers, and its back carries tools for maintenance work. It is arrogant about its performance, but that confidence comes from knowing the site inside and out.",
    stats: { attack: 90, hp: 100, technique: 110 },
    summary: "Its Space die rolls 1 to 6, with 5 and 6 at lower odds. Breaking an obstacle restores 5 to any one stat.",
    skillText: "Passive: Its Space die gains 5 and 6, with lower odds than the other faces. If it breaks an obstacle by spending at least 1 stat point, it may restore 5 to any one stat."
  },
  painter2: {
    id: "painter2",
    name: "Painter 2",
    displayName: "Mira",
    icon: "🫥",
    type: "Painter",
    roleText: "Excels at moving across the field and painting tiles.",
    flavorText: "One of the mist folk, able to freely change the shape of its body. Shy and eager to make friends, it approaches others but fails to speak up, blurs their senses instead, and slips away again and again.",
    stats: { attack: 80, hp: 110, technique: 110 },
    summary: "Restores Technique equal to the number of tiles stolen. Can hide for 2 rounds for 10 Technique. While hidden, battles Mira initiates gain +5 to Mira's chosen stat. Reuse after 3 rounds.",
    skillText: "Active: Hide from other players for the next 2 rounds. Battles still occur while hidden. While hidden, battles Mira initiates gain +5 to Mira's chosen stat."
  },
  painter3: {
    id: "painter3",
    name: "Painter 3",
    displayName: "Brakk",
    icon: "💣",
    type: "Painter",
    roleText: "Excels at moving across the field and painting tiles.",
    flavorText: "A ferocious boar-born breakthrough fighter.\nWith a massive custom rig of high-pressure paint canisters strapped to his back, he forces the front line forward through sheer power.\nOnce he plants his feet and braces himself, his zone control becomes overwhelming, leaving enemies with only two choices: fall back, or take the blast.\nHis reckless fighting style puts a heavy strain on his own body, but his rugged frame turns even that pain into a rush of exhilaration.",
    stats: { attack: 105, hp: 100, technique: 85 },
    summary: "Spend 15 HP to enter Paint Bomb state. Brakk cannot move until his next turn ends, stores up to 6 Space from this turn and the next turn, then paints within a 5x5 blast area. If Brakk moved fewer than 2 tiles on his own previous turn, Primed Payload gives this turn's Space count +1.",
    skillText: "Active: Enter Paint Bomb state and stay in place until the end of your next turn. Store this turn's and next turn's Space counts, up to 6 total. On your next turn after rolling, detonate and paint that many tiles within a 5x5 area. If Brakk is defeated or sent back to start before detonation, the bomb fails. Passive: Primed Payload increases this turn's Space count by +1 if Brakk moved fewer than 2 tiles on his own previous turn. Forced movement and returning to start do not count."
  },
  painter4: {
    id: "painter4",
    name: "Painter 4",
    displayName: "Torga",
    icon: "🐐",
    type: "Painter",
    roleText: "Excels at moving across the field and painting tiles.",
    flavorText: "A goatfolk wanderer who has crossed steep slopes and crumbling rocky ground.\nWith a small paint pick hanging from his neck to test his footing, he chooses his path while leaving marks on rock faces and the earth.\nThe rougher the terrain, the more deftly he moves, slipping into a new route from angles no one else would dare to take.\nHis journey, no doubt, would have been a little easier if his maps had not kept ending up eaten.",
    stats: { attack: 90, hp: 95, technique: 115 },
    summary: "When Torga rolls exactly 1 on the Move die, he can also move diagonally. When he rolls exactly 4 on the Move die, his Space count increases by 1. Backtrack spends 15 Technique to return instantly to his starting tile, dropping special items such as the flag on the tile he left, and restores 15 Attack and 15 HP.",
    skillText: "Passive: Cragstep lets Torga move diagonally when his Move die rolls exactly 1. Passive: Broad Stride increases this turn's Space count by 1 when his Move die rolls exactly 4. Active: Spend 15 Technique to return instantly to his starting tile. Special items such as the flag are dropped on the tile he left, then Torga restores 15 Attack and 15 HP."
  },
  battler1: {
    id: "battler1",
    name: "Battler 1",
    displayName: "Gran",
    icon: "⚔️",
    type: "Battler",
    roleText: "Specializes in battle-focused skills.",
    flavorText: "A heavy beastman with rocky horns, reminiscent of a bull or goat. A fragment of an old castle gate is strapped to one arm like a shield, giving it an imposing presence. Territorial to the core, it hates having its ground or domain disturbed.",
    stats: { attack: 100, hp: 100, technique: 100 },
    summary: "When it has advantage on its own tiles, the bonus becomes +40. Winning on its own tiles restores 30 to the stat it used. Enemy players cannot repaint the tile Gran currently occupies.",
    skillText: "Passive: If it gains matchup advantage in a battle on its own tiles, the stat bonus rises from +25 to +40. Passive: Stonehold Presence prevents opponents and enemy team members from repainting the tile Gran currently occupies. The effect only applies to Gran's current tile, not tiles Gran has left."
  },
  battler2: {
    id: "battler2",
    name: "Battler 2",
    displayName: "Vork",
    icon: "🪓",
    type: "Battler",
    roleText: "Specializes in battle-focused skills.",
    flavorText: "A wolf-like humanoid fighter with sharp fangs and a body covered in scars. One arm wears a bladed gauntlet, the other is wrapped in hooked chains, giving off the air of someone long used to brutal fights. The more intense the clash, the fiercer it becomes, though it is awkward in calm moments.",
    stats: { attack: 120, hp: 90, technique: 90 },
    summary: "When choosing Attack, it gains +12 if the opponent did not pick HP. On victory, steals 15 Attack; on defeat, the opponent steals 5 Attack. Loses 2 Attack on turns without battle.",
    skillText: "Passive: When Vork chooses Attack in battle, if the opponent did not choose HP, its Attack gains +12 for that battle. Passive: On victory, Vork steals 15 Attack from the opponent; on defeat, the opponent steals 5 Attack from Vork. Passive: On turns with no battle, Vork loses 2 Attack."
  },
  battler3: {
    id: "battler3",
    name: "Battler 3",
    displayName: "Naja",
    icon: "🌀",
    type: "Battler",
    roleText: "Specializes in battle-focused skills.",
    flavorText: "A cobrafolk manipulator who never misses an opponent’s gaze, habits, or hesitation, subtly steering their decisions before they even realize it. Always cloaked in a deep hood, with hypnotic tools hidden beneath an eerie robe. They stand in silence, and by the moment the opponent takes a single step forward, their mind is already under control. Still, for all the pressure they put on others, they tend to back off a bit when someone pushes back — seems that’s just in their nature.",
    stats: { attack: 105, hp: 95, technique: 90 },
    summary: "Draws in battles involving Naja count as Naja’s wins. Mesmer Sync makes the opponent’s three current stats match Naja’s for the first battle involving Naja after activation, only during the activation round.",
    skillText: "Passive: If a battle involving Naja ends in a draw, it counts as Naja’s win. Active: After activation, only the first battle involving Naja during the current round is affected. In that battle, the opponent’s current Attack, HP, and Technique each become equal to Naja’s corresponding current stats before Force Shards or matchup bonuses are added."
  },
  battler4: {
    id: "battler4",
    name: "Battler 4",
    displayName: "Corven",
    icon: "🐦‍⬛",
    type: "Battler",
    roleText: "Specializes in battle-focused skills.",
    flavorText: "A crowfolk who stockpiles resentment, turning every wound into fuel for revenge.\nEach time it takes flight, black feathers drift down and cling to its foe as omens of misfortune, drawing them into inescapable ill luck.\nWilling to sacrifice even its own strength to deepen the curse, it comes across as less merely vengeful and more like a calamity in living form.",
    stats: { attack: 85, hp: 110, technique: 105 },
    summary: "Damage and stat loss build Omen at the end of the turn. Losing a battle can curse the winner, and at full Omen it can force the winner back to the starting tile. Bleak Offering raises Omen by 25%, cuts all current stats by up to 15, and grants a stacking 5-turn auto-heal.",
    skillText: "Passive: At the end of any turn in which Corven lost stats, gain Omen equal to half of that total loss, rounded up. Omen resets when Corven is sent back to the starting tile. Passive: If Corven loses a battle with at least 25% Omen, Black Feather curses the opponent based on the current Omen level. Cursed targets have Move and Space fixed to 1 and lose 5 from each current stat at the end of their turn. Active: Bleak Offering raises Omen by 25%, reduces Attack, HP, and Technique by up to 15 each, never below 1, and grants 5 turns of Auto Heal that restore 3 to each current stat at the end of Corven's turn."
  },
  battler5: {
    id: "battler5",
    name: "Battler 5",
    displayName: "Moppet",
    icon: "🧹",
    type: "Battler",
    roleText: "Specializes in battle-focused skills.",
    flavorText: "An otterfolk who has worked as a cleaner for many years.\nHis love of cleanliness has long since gone beyond ordinary tidiness, and what he enjoys most is the moment when he polishes a dirty place until it shines. In fact, he feels uneasy in his own overly orderly surroundings, and seems to feel more at home in messy places.\nWhen business clients approach him while he is cleaning, he treats them not as customers, but as “obstacles to the job,” so his impressive workmanship is often ruined by his terrible attitude.",
    stats: { attack: 100, hp: 95, technique: 90 },
    summary: "Can rest on an opponent's starting tile for 25 to each stat. Mess Magnet shifts battle power near starting tiles. Clutter Fury changes battle power based on nearby enemies and allies around the opponent. Emergency Callout turns one turn into a dangerous rush that can repaint only the tile Moppet ends the turn on.",
    skillText: "Passive: Can rest on an opponent's starting tile, but only restores 25 to each stat. Passive: Gains battle power near the opponent's starting tile, but loses battle power near his own starting tile. Passive: Gains +5 to the chosen battle stat for each nearby enemy around the opponent, up to +15. Loses -5 for each nearby ally around the opponent, up to -15. Active: Before rolling, convert this turn into an Emergency Callout. Move up to the total of your Move die and Space die, skip the normal paint phase, and take double HP damage until the turn ends. When the turn ends after moving, repaint only the tile you are standing on if that tile is repaintable. Cannot be used while carrying special items such as the flag."
  },
  trapper1: {
    id: "trapper1",
    name: "Trapper 1",
    displayName: "Toto",
    icon: "☠️",
    type: "Trapper",
    roleText: "Uses trap and gimmick skills to hinder opponents.",
    flavorText: "A small swamp frogfolk with a deceptively cute appearance. Its round eyes and tiny body seem harmless at first glance, but it carries canisters and sprayers packed with chemicals on its back. Playful and childish, yet once angered it turns the ground into a toxic fog and makes the whole area a nightmare.",
    stats: { attack: 120, hp: 75, technique: 110 },
    summary: "Spend 30 Attack to place a 3×3 poison zone. Opponents take rising damage while they keep ending turns inside it. Also deals 15 damage to obstacles. Lasts 3 rounds.",
    skillText: "Active: Create a poison fog in a 3×3 square centered on yourself. Opponents who end their turn inside take 15 damage at first, then +5 more damage for each consecutive turn they keep ending inside the same fog. Each time the owner ends a turn, obstacles inside also take 15 damage. The zone disappears naturally after 3 rounds."
  },
  trapper2: {
    id: "trapper2",
    name: "Trapper 2",
    displayName: "Kazan",
    icon: "🕳️",
    type: "Trapper",
    roleText: "Uses trap and gimmick skills to hinder opponents.",
    flavorText: "An underground dweller resembling a mole mixed with an insect. Its forearms end in hard claws suited for digging, and it carries a simple pile driver on its back. It loves digging for its own sake and does not really mean to make others fall in, but people sometimes do and then complain, so it just digs another hole and leaves.",
    stats: { attack: 125, hp: 70, technique: 105 },
    summary: "Spend 15 Attack to place a pitfall beneath yourself. When triggered, the tile is painted your color. Up to 3 at once.",
    skillText: "Active: Create a pitfall on your current tile. The next player to stop there takes 30 damage, and the tile is painted your color. It disappears naturally after 3 rounds."
  },
  trapper3: {
    id: "trapper3",
    name: "Trapper 3",
    displayName: "Veska",
    icon: "🕸️",
    type: "Trapper",
    roleText: "Uses trap and gimmick skills to hinder opponents.",
    flavorText: "A spider trapper who hunts by quietly spreading snares at their feet.\nUpon the ground they control, they layer a film of venom so thin it is nearly invisible, slowly draining the strength of anyone who steps into it. Their prey should have had both a way forward and a way out — yet before they realize it, they have been driven into a place with no escape.",
    stats: { attack: 95, hp: 95, technique: 95 },
    summary: "Spend 8 Attack, 8 HP, and 8 Technique to varnish allied tiles with venom for 2 rounds. Opponents lose current stats when crossing or ending turns on allied tiles. Pay 15 extra Technique to heal 2 from each trigger.",
    skillText: "Active: Spend 8 Attack, 8 HP, and 8 Technique. For 2 rounds, opponents who cross tiles painted by Veska or Veska's team lose 2 from each current stat. If they end their turn on one of those tiles, they lose 3 more from each current stat. Pay 15 extra Technique to make each trigger restore 2 to Veska's current Attack, HP, and Technique. Reuse after 4 rounds."
  },
  tanker1: {
    id: "tanker1",
    name: "Tanker 1",
    displayName: "Brum",
    icon: "🛡️",
    type: "Tanker",
    roleText: "Built for survival and typically has high HP.",
    flavorText: "A massive turtle with a metallic shell. Thick armor covers its shoulders and back, and simply standing in front of others makes it feel like a wall of safety. Usually a steady, dependable protector, it can endure danger for a long time, but when faced with a threat too great to handle alone, it retreats into its shell until an ally knocks it back out.",
    stats: { attack: 50, hp: 130, technique: 105 },
    summary: "Half of field damage is absorbed with Technique instead of HP. On swap, it may choose not to return to its starting tile. Its Move dice can never show 4.",
    skillText: "Passive: When taking damage, half of that damage is deducted from Technique instead of HP. Passive: Its Move dice can never show 4."
  },
  tanker2: {
    id: "tanker2",
    name: "Tanker 2",
    displayName: "Mog",
    icon: "🎒",
    type: "Tanker",
    roleText: "Built for survival and typically has high HP.",
    flavorText: "A small beastman scavenger reminiscent of a badger or raccoon dog. Bottles, sacks, and little barrels jingle from its waist and back. It hoards anything that might be useful and often pulls out just the right item from somewhere. Even it does not fully know where everything is, and sometimes a hit makes its belongings spill out.",
    stats: { attack: 85, hp: 120, technique: 95 },
    summary: "Generates a random item for every cumulative 20 HP lost. Can also use Quickdig for 10 Technique.",
    skillText: "Passive: Every time its HP drops by a cumulative 20, generate one random item from the available pool. Active: For 10 Technique, immediately add one random available item to the bag."
  },
  tanker3: {
    id: "tanker3",
    name: "Tanker 3",
    displayName: "Hobbs",
    icon: "🐕",
    type: "Tanker",
    roleText: "Built for survival and typically has high HP.",
    flavorText: "A mastifffolk who works as an arena guard.\nHe watches minor scuffles with a calm expression, but when real danger is aimed at someone, he immediately steps in with his heavy frame, taking both attacks and shouted complaints in stride.\nDependable as he is, he seems hopeless with machines, and Scrabbit often gets the better of him.",
    stats: { attack: 80, hp: 125, technique: 80 },
    summary: "Protective Detail grants 50 guard HP and redirects damage from one ally, or halves damage for Hobbs if self-targeted, for up to 3 of Hobbs's turn ends. Break It Up cancels one battle against a chosen ally and makes Hobbs take 15 damage instead.",
    skillText: "Active: Protective Detail chooses yourself or one nearby ally. Hobbs gains 50 guard HP for up to 3 of Hobbs's turn ends, redirecting HP damage from that ally, or halving damage to Hobbs if self-targeted. Active: Break It Up gives one chosen ally battle protection until it blocks one battle or until the end of Hobbs's next turn, making Hobbs take 15 damage instead."
  },
  supporter1: {
    id: "supporter1",
    name: "Supporter 1",
    displayName: "Gallus",
    icon: "📣",
    type: "Supporter",
    roleText: "Boosts nearby allies with supportive skills.",
    flavorText: "The cheer captain of the roosterfolk, rallying allies with a piercing voice and grand, sweeping gestures.\nWrapped in a billowing coat reminiscent of a school uniform jacket, they fire up everyone around them with flags and a megaphone.\nThat well-worn coat seems to be a prized favorite, but once they get too fired up, they tend to fling it off almost immediately — probably because of all the feathers — so it is always dusted with sand.",
    stats: { attack: 90, hp: 120, technique: 90 },
    summary: "Push Ahead boosts Move and Space by +1 for Gallus and nearby allies for 2 rounds. Nearby allies gain +5 to their chosen battle stat.",
    skillText: "Active: For 2 rounds, Gallus and allied players on Gallus's tile or adjacent tiles gain +1 Move and +1 Space. Costs 10 Attack and 10 Technique. Reuse after 4 rounds. Passive: When a nearby ally enters battle, that ally gains +5 to the chosen stat."
  },
  supporter2: {
    id: "supporter2",
    name: "Supporter 2",
    displayName: "Pip",
    icon: "🍿",
    type: "Supporter",
    roleText: "Boosts nearby allies with supportive skills.",
    flavorText: "A chipmunkfolk who sells popular popcorn at the arena concession stand.\nHer freshly popped popcorn has a mysterious effect: it can wash away fatigue and soothe a dry throat.\nStrangely, no one has ever seen her carry bags or boxes of kernels in her hands.",
    stats: { attack: 90, hp: 75, technique: 120 },
    summary: "Fresh Batch restores 25 to one chosen stat for Pip or a nearby ally. Free Samples restores 5 to one random missing stat on a random eligible ally or Pip at the end of each of Pip's turns.",
    skillText: "Active: Choose Pip or one allied player within a 5x5 area centered on Pip, then restore 25 to one chosen stat. Costs 15 Technique. Passive: At the end of Pip's turn, one random eligible ally or Pip restores 5 to one random stat that is below its current maximum."
  },
  trickster1: {
    id: "trickster1",
    name: "Trickster 1",
    displayName: "Mimi",
    icon: "⭐",
    type: "Trickster",
    roleText: "Uses coins and risky roulette skills to bend the flow of a turn.",
    flavorText: "A beloved tanuki star who captivates crowds with a microphone adorned with a star charm, graceful movements, and a bright, dazzling smile.\nYet in private, away from prying eyes, they pour piles of hard-earned coins onto the gaming table, shouting over every win and loss. Sometimes they even dip into money they absolutely should not be touching, which may be why their home is so remarkably shabby.\nStill, to the public—who know nothing of that side of them—they seem to be a modest, well-behaved idol living an admirably humble life.",
    stats: { attack: 70, hp: 90, technique: 120 },
    summary: "Star Mode collects up to 99 Coins by painting tiles and finishing battles. Off the Record switches to Gambler Mode for at least 5 Coins, then Double or Nothing spends Coins on roulette effects until the Coins run out.",
    skillText: "Passive: In Star Mode, collect Coins from painted tiles and battle results, up to 99. Active: Off the Record switches to Gambler Mode if Mimi has at least 5 Coins. Reuse after 3 rounds. In Gambler Mode, Double or Nothing can be used once per turn to spend Coins on one of three roulette spins. Mimi returns to Star Mode when Coins reach 0."
  },
  trickster2: {
    id: "trickster2",
    name: "Trickster 2",
    displayName: "Rasca",
    icon: "🦎",
    type: "Trickster",
    roleText: "Uses detached mechanical tails to extend control and create dangerous decoys.",
    flavorText: "A lizardfolk with a tail reinforced by metal, blended with mechanical craftsmanship.\nHis tail can do more than simply detach; even after being separated, it continues to pick up vibrations and nearby presences around it.\nHe skillfully weaves those sensations together to analyze the situation, then deftly controls each individual tail to dominate the fight.\nIts senses seem to be especially sensitive, and whenever one gets stepped on, he makes a deeply displeased face.",
    stats: { attack: 90, hp: 120, technique: 90 },
    summary: "Shed Relay places up to 3 detached tails. Tails extend painting range, can battle enemies who stop on them, and can be recalled with Snapback.",
    skillText: "Active: Shed Relay places a detached tail on Rasca's tile. Up to 3 tails can exist at once. Pay 10 extra Technique to make that tail deal 10 HP damage around itself when Rasca ends a turn. Active: Snapback recalls one tail and may move Rasca to its tile."
  },
  trickster3: {
    id: "trickster3",
    name: "Trickster 3",
    displayName: "Skava",
    icon: "🪶",
    type: "Trickster",
    roleText: "Plants custom recovery tiles and decaying bait rocks to distort routes and resources.",
    flavorText: "A magpiefolk hunter who makes use of stolen goods.\nHe originally worked at the arena, but after repeatedly helping himself to supplies without permission, it eventually became enough of a problem to get him fired.\nStrangely enough, the moment he was gone, the theft rate shot up, and the arena’s expenses apparently became even worse than when he had still been employed there.",
    stats: { attack: 100, hp: 100, technique: 100 },
    summary: "Field Cache creates one custom recovery tile. Opponents only receive half recovery from Skava's cache. Baited Boulder creates a decaying 20 HP rock that drops a Power Shard when broken, and can be reinforced for one owner cycle.",
    skillText: "Active: Field Cache turns one normal tile into a recovery tile for the chosen stat. Opponents only receive half recovery from Skava's generated recovery tile. Reuse after 2 rounds. Active: Baited Boulder creates a 20 HP rock on one normal empty tile. It drops a Power Shard when broken, loses 5 HP at the end of each round, and can be reinforced for 15 extra Technique so it cannot be broken until the end of Skava's next turn. Reuse after 2 rounds."
  }
};

applyCharacterIconAssets(characterLibrary);

const characterDetailSections = {
  painter1: {
    active: [],
    passive: [
      {
        name: "Recoat Rig",
        text: "Your Space die gains 5 and 6, and those faces appear less often than the others."
      },
      {
        name: "Groundskeeper’s Habit",
        text: "When you break an obstacle by spending at least 1 stat point, you may restore 5 to any one stat."
      }
    ]
  },
  painter2: {
    active: [
      {
        name: "Mistveil",
        text: "Hide from other players for the next 2 rounds. Battles still occur while hidden. While hidden, battles you initiate gain +5 to your chosen stat.",
        meta: {
          costStat: "technique",
          costAmount: 10,
          limit: "1",
          interval: "3 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Border Blur",
        text: "Each turn, restore Technique equal to the number of tiles you stole from other players."
      }
    ]
  },
  painter3: {
    active: [
      {
        name: "Backblast Charge",
        text: "Enter Paint Bomb state and stay in place until your next turn ends. Store the Space counts from this turn and your next turn, up to 6 total. On your next turn after rolling, paint that many tiles within a 5x5 area. If you are defeated before then, the skill fails.",
        meta: {
          costStat: "hp",
          costAmount: 15,
          limit: "1",
          interval: "5 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Primed Payload",
        text: "If Brakk moved fewer than 2 tiles on his own previous turn, this turn's Space count increases by +1. Forced movement and returning to the starting tile do not count for this check. This bonus can only apply once per turn."
      }
    ]
  },
  painter4: {
    active: [
      {
        name: "Backtrack",
        text: "Return instantly to your starting tile. If you are carrying special items such as the flag, drop them on the tile you left. Then restore 15 Attack and 15 HP.",
        meta: {
          costStat: "technique",
          costAmount: 15,
          limit: "1",
          interval: "4 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Cragstep",
        text: "Only when your Move die rolls exactly 1, you can move diagonally as well as up, down, left, and right."
      },
      {
        name: "Broad Stride",
        text: "When your Move die rolls exactly 4, your Space count for that turn increases by 1."
      }
    ]
  },
  battler1: {
    active: [],
    passive: [
      {
        name: "Homeground Edge",
        text: "If you gain matchup advantage in battle on your own tiles, the stat bonus increases from +25 to +40."
      },
      {
        name: "Victor’s Return",
        text: "If you win a battle on your own tiles, restore 30 to the stat you used in that battle."
      },
      {
        name: "Stonehold Presence",
        text: "Opponents and enemy team members cannot repaint the tile Gran currently occupies. This only protects Gran's current tile, not tiles Gran has left."
      }
    ]
  },
  battler2: {
    active: [],
    passive: [
      {
        name: "Pressure Break",
        text: "When you choose Attack in battle, if the opponent did not choose HP, your Attack gains +12 for that battle."
      },
      {
        name: "Rend and Take",
        text: "On victory, steal 15 from the opponent’s current Attack. On defeat, the opponent steals 5 from your current Attack."
      },
      {
        name: "Battle Fever",
        text: "On turns with no battle, Attack decreases by 2."
      }
    ]
  },
  battler3: {
    active: [
      {
        name: "Mesmer Sync",
        text: "After activation, only the first battle involving Naja during the current round is affected. In that battle, the opponent’s current Attack, HP, and Technique each become equal to Naja’s corresponding current stats before Force Shards or matchup bonuses are added.",
        meta: {
          costStat: "attack",
          costAmount: 15,
          limit: "1",
          interval: "4 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Dominion of Balance",
        text: "If a battle involving Naja ends in a draw, it counts as Naja’s win."
      }
    ]
  },
  battler4: {
    active: [
      {
        name: "Bleak Offering",
        text: "Gain 25% Omen. Lose up to 15 from each current stat, never below 1. Then gain 5 turns of 🧪 Auto Heal: restore 3 to each current stat at the end of your turn. Reapplying adds turns.",
        meta: {
          extraCosts: [
            { stat: "attack", amount: 15 },
            { stat: "hp", amount: 15 },
            { stat: "technique", amount: 15 }
          ],
          limit: "1",
          interval: "3 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Omen Hoard",
        text: "At the end of any turn in which Corven lost stats, gain Omen equal to half of that total loss, rounded up. Omen resets when Corven is sent back to the starting tile."
      },
      {
        name: "Black Feather",
        text: "If Corven loses a battle with enough Omen stored, the winner is cursed. At 25%, 50%, and 75% Omen, the winner is cursed for 1, 2, and 3 turns. At 100% Omen, the winner is sent back to the starting tile, drops special items such as the flag on the current tile, and is cursed for 1 turn."
      },
      {
        name: "🐦‍⬛ Cursed",
        text: "Move and Space dice are fixed to 1. At the end of the turn, lose 5 from each current stat."
      }
    ]
  },
  battler5: {
    active: [
      {
        name: "Emergency Callout",
        text: "Before rolling, convert this turn into an Emergency Callout. Move up to the total of your Move die and Space die, skip the normal paint phase, and take double HP damage until the turn ends. When the turn ends after moving, repaint only the tile you are standing on if that tile is repaintable. Cannot be used while carrying special items such as the flag.",
        meta: {
          costStat: "technique",
          costAmount: 15,
          limit: "1",
          interval: "4 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Borrowed Breakroom",
        text: "Can rest on an opponent’s starting tile, but only restores 25 to each stat."
      },
      {
        name: "Mess Magnet",
        text: "Gains battle power near the opponent’s starting tile, but loses battle power near his own starting tile."
      },
      {
        name: "Clutter Fury",
        text: "Gains +5 to the chosen battle stat for each nearby enemy around the opponent, up to +15. Loses -5 for each nearby ally around the opponent, up to -15."
      }
    ]
  },
  trapper1: {
    active: [
      {
        name: "Bog Tantrum",
        text: "Create a poison fog in a 3×3 square centered on yourself. Opponents who end their turn inside take 15 damage at first, then +5 more damage for each consecutive turn they keep ending inside the same fog. Each time the owner ends a turn, obstacles inside also take 15 damage. It disappears naturally after 3 rounds.",
        meta: {
          costStat: "attack",
          costAmount: 30,
          limit: "1",
          interval: "3 rounds",
          enhancement: "Enhancement: Spend an extra 15 Technique to limit opponents inside the poison fog to one step for one turn."
        }
      }
    ],
    passive: []
  },
  trapper2: {
    active: [
      {
        name: "Loose Ground",
        text: "Create a pitfall on your current tile. The next player to stop there takes 30 damage, and the tile is painted your color. It disappears naturally after 3 rounds.",
        meta: {
          costStat: "attack",
          costAmount: 15,
          limit: "3",
          interval: "None",
          enhancement: "Enhancement: Spend an extra 15 Technique to make the pitfall trigger on players who pass through it, not only players who stop there."
        }
      }
    ],
    passive: []
  },
  trapper3: {
    active: [
      {
        name: "Venom Varnish",
        text: "For 2 rounds, opponents who cross tiles painted by you or your team lose 2 from each current stat. If they end their turn on one of those tiles, they lose 3 more from each current stat. This is stat loss, not damage.",
        meta: {
          costStat: "attack",
          costAmount: 8,
          extraCosts: [
            { stat: "hp", amount: 8 },
            { stat: "technique", amount: 8 }
          ],
          limit: "1",
          interval: "4 rounds",
          enhancement: "Enhancement: Spend an extra 15 Technique to restore 2 to each current stat every time Venom Varnish reduces an opponent's stats."
        }
      }
    ],
    passive: []
  },
  tanker1: {
    active: [],
    passive: [
      {
        name: "Shellflow",
        text: "When taking damage, deduct half of that damage from Technique instead of HP."
      },
      {
        name: "Hold the Line",
        text: "When swapping with your reserve, you may choose whether to return to your starting tile."
      },
      {
        name: "Heavy Steps",
        text: "Your Move dice can never show 4."
      }
    ]
  },
  tanker2: {
    active: [
      {
        name: "Quickdig",
        text: "Usable only once per turn. If your bag has space, gain one random item from the available pool and add it to your bag. Cannot be used when the bag is full.",
        meta: {
          costStat: "technique",
          costAmount: 10,
          limit: "1/turn",
          interval: "2 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Junkshake",
        text: "Every time HP drops by 20, generate one random item from the following list.",
        extraTable: {
          headers: ["Generated Item", "Effect"],
          rows: [
            ["✨ Ability Restore", "Restore 10 to any one stat"],
            ["⬆️ Ability Expand", "Increase the max value of any one stat by 10"],
            ["🧪 Potion", "Restore 20 HP"]
          ]
        }
      }
    ]
  },
  tanker3: {
    active: [
      {
        name: "Protective Detail",
        text: "Choose yourself or one allied player within a 3x3 area centered on Hobbs. Hobbs gains 50 Guard HP for up to 3 of Hobbs's turn ends. If Hobbs protects an ally, Hobbs takes incoming HP damage for that ally until the Guard HP runs out. If Hobbs protects himself, HP damage Hobbs takes is halved instead.",
        meta: {
          costStat: "technique",
          costAmount: 10,
          limit: "1",
          interval: "4 rounds"
        }
      },
      {
        name: "Break It Up",
        text: "Choose yourself, one allied player within a 3x3 area centered on Hobbs, or Hobbs's current Protective Detail target. The chosen player ignores the next battle they start or receive. Instead, Hobbs takes 15 HP damage, and the effect then ends. It also ends at the end of Hobbs's next turn.",
        meta: {
          costLabel: "None",
          limit: "1",
          interval: "3 rounds"
        }
      }
    ],
    passive: []
  },
  supporter1: {
    active: [
      {
        name: "Push Ahead!",
        text: "For the next 2 rounds, Gallus and allied players on Gallus's tile or adjacent tiles gain +1 Move and +1 Space.",
        meta: {
          costStat: "attack",
          costAmount: 10,
          extraCostStat: "technique",
          extraCostAmount: 10,
          limit: "1",
          interval: "4 rounds"
        }
      }
    ],
    passive: [
      {
        name: "You've Got This!",
        text: "When an allied player on Gallus's tile or adjacent tiles enters battle, that ally gains +5 to the chosen stat."
      }
    ]
  },
  supporter2: {
    active: [
      {
        name: "Fresh Batch",
        text: "Choose yourself or one allied player within a 5x5 area centered on Pip. Restore 25 to one chosen stat.",
        meta: {
          costStat: "technique",
          costAmount: 15,
          limit: "1",
          interval: "3 rounds",
          enhancement: "Enhancement: Spend an extra 15 Attack to deal 15 HP damage to all enemy players on orthogonally adjacent tiles around the healed target."
        }
      }
    ],
    passive: [
      {
        name: "Free Samples",
        text: "At the end of Pip's turn, choose one random eligible ally or Pip. Then restore 5 to one random stat that is below its current maximum."
      }
    ]
  },
  trickster1: {
    modes: [
      {
        name: "⭐ Star Mode",
        text: "At the end of Mimi's own turn, Mimi restores 1 to each current stat. In this mode, Crowd Pleaser can collect Coins."
      },
      {
        name: "🪙 Gambler Mode",
        text: "At the end of Mimi's own turn, Mimi loses 3 from each current stat. In this mode, Double or Nothing can be used once each turn while Mimi has Coins."
      }
    ],
    active: [
      {
        name: "Off the Record",
        text: "Only usable in Star Mode with at least 5 Coins. Switch to Gambler Mode. While Mimi has Coins, Mimi can spin roulette once each turn.",
        meta: {
          costLabel: "5+ Coins",
          limit: "1",
          interval: "3 rounds"
        }
      },
      {
        name: "Double or Nothing",
        text: "Only usable in Gambler Mode. Spend Coins to choose and spin one of three roulettes, then gain the winning effect.",
        meta: {
          costLabel: "Variable Coins",
          limit: "1",
          interval: "None"
        }
      }
    ],
    passive: [
      {
        name: "Crowd Pleaser",
        text: "In Star Mode, collect Coins up to 99.",
        extraTable: {
          headers: ["Source", "Coins"],
          rows: [
            ["Paint a tile", "+1 per tile"],
            ["Win a battle", "+10"],
            ["Lose a battle", "+5"]
          ]
        }
      }
    ]
  },
  trickster2: {
    active: [
      {
        name: "Shed Relay",
        text: "Place one immobile detached tail on your current tile. You can have up to 3 tails at once. Tail max HP is recalculated from your max HP divided by your tail count. When created, tail HP is based on your current HP divided by the new tail count.",
        meta: {
          costLabel: "None",
          limit: "3",
          interval: "1 round",
          enhancement: "Enhancement: Spend an extra 10 Technique when placing the tail. At the end of your turns, each enhanced tail deals 10 HP damage to enemies on its tile or adjacent orthogonal tiles."
        }
      },
      {
        name: "Snapback",
        text: "Recall one of your detached tails. You may also instantly move to that tail's tile. If you move while carrying special items such as the flag, they are left behind.",
        meta: {
          costLabel: "None",
          limit: "1",
          interval: "2 rounds"
        }
      }
    ],
    passive: [
      {
        name: "Relay Body",
        text: "During your paint phase, each detached tail lets you paint its tile and the four orthogonally adjacent tiles. Enemies who stop on your tail battle it. Damage dealt to a tail is also dealt to Rasca."
      }
    ]
  },
  trickster3: {
    active: [
      {
        name: "Field Cache",
        text: "Choose one normal tile and turn it into a recovery tile for the chosen stat. On your own paint, ending a turn there restores 20 to that stat. Opponents only receive 10 from this generated recovery tile. Reusing this skill removes the previous cache.",
        meta: {
          costLabel: "Chosen stat 15",
          limit: "1",
          interval: "2 rounds"
        }
      },
      {
        name: "Baited Boulder",
        text: "Choose one normal empty tile and create a 20 HP rock there. Breaking it drops 1 Power Shard. At the end of each round it loses 5 HP, and if that decay destroys it, it drops nothing.",
        meta: {
          costLabel: "Chosen stat 15",
          limit: "1",
          interval: "2 rounds",
          enhancement: "Enhancement: Spend an extra 15 Technique to keep the rock unbreakable until the end of Skava's next turn."
        }
      }
    ],
    passive: []
  }
};

function getCharacterDetailSections(characterId) {
  return characterDetailSections[characterId] || { active: [], passive: [] };
}

function getSkillEntryText(entry) {
  if (!entry) return "";
  return typeof entry === "string" ? entry : (entry.text || "");
}

function getSkillEntryMeta(entry) {
  if (!entry || typeof entry === "string") return null;
  return entry.meta || null;
}

function getSkillEntryName(entry) {
  if (!entry || typeof entry === "string") return "";
  return entry.name || "";
}

function getSkillEntryExtraTable(entry) {
  if (!entry || typeof entry === "string") return null;
  return entry.extraTable || null;
}

function getStatIcon(statKey) {
  return statKey === "attack" ? "⚔️" : statKey === "hp" ? "❤️" : "🧠";
}

function getResourceIcon(statKey) {
  return statKey === "attack" ? "⚔️" : statKey === "hp" ? "❤️" : "🧠";
}

function renderSkillMetaTable(meta) {
  if (!meta) return "";
  const costParts = [];
  if (meta.costStat) {
    costParts.push(`<span class="skillMetaCost"><span class="skillMetaCostIcon">${getResourceIcon(meta.costStat)}</span><strong>${sanitize(String(meta.costAmount ?? 0))}</strong></span>`);
  }
  if (meta.extraCostStat) {
    costParts.push(`<span class="skillMetaCost"><span class="skillMetaCostIcon">${getResourceIcon(meta.extraCostStat)}</span><strong>${sanitize(String(meta.extraCostAmount ?? 0))}</strong></span>`);
  }
  if (Array.isArray(meta.extraCosts)) {
    meta.extraCosts.forEach((cost) => {
      costParts.push(`<span class="skillMetaCost"><span class="skillMetaCostIcon">${getResourceIcon(cost.stat)}</span><strong>${sanitize(String(cost.amount ?? 0))}</strong></span>`);
    });
  }
  if (meta.optionalCostStat) {
    costParts.push(`<span class="skillMetaCost optional"><span class="skillMetaCostIcon">${getResourceIcon(meta.optionalCostStat)}</span><strong>+${sanitize(String(meta.optionalCostAmount ?? 0))}</strong></span>`);
  }
  const costLabel = costParts.length ? `<span class="skillMetaCostList">${costParts.join("")}</span>` : (meta.costLabel ? sanitize(meta.costLabel) : "-");
  const enhancementHtml = meta.enhancement
    ? `<div class="skillMetaEnhancement">${sanitize(meta.enhancement)}</div>`
    : "";
  return `
    <div class="skillMetaTable" role="table" aria-label="Skill Stats">
      <div class="skillMetaRow skillMetaHead" role="row">
        <span role="columnheader">Cost</span>
        <span role="columnheader">Max Active</span>
        <span role="columnheader">Interval</span>
      </div>
      <div class="skillMetaRow" role="row">
        <span role="cell">${costLabel}</span>
        <span role="cell">${sanitize(meta.limit ?? "-")}</span>
        <span role="cell">${sanitize(meta.interval ?? "-")}</span>
      </div>
    </div>
    ${enhancementHtml}
  `;
}

function renderSkillExtraTable(extraTable) {
  if (!extraTable || !Array.isArray(extraTable.rows) || !extraTable.rows.length) return "";
  const headers = Array.isArray(extraTable.headers) ? extraTable.headers : [];
  const headerHtml = headers.length
    ? `<div class="skillExtraRow skillExtraHead">${headers.map((label) => `<span>${sanitize(label)}</span>`).join("")}</div>`
    : "";
  const bodyHtml = extraTable.rows
    .map((row) => `<div class="skillExtraRow">${row.map((cell) => `<span>${sanitize(cell)}</span>`).join("")}</div>`)
    .join("");
  return `<div class="skillExtraTable">${headerHtml}${bodyHtml}</div>`;
}

function renderSkillEntryHtml(entry, variant = "detail", actionHtml = "") {
  const title = getSkillEntryName(entry);
  const text = getSkillEntryText(entry);
  const meta = getSkillEntryMeta(entry);
  const extraTable = getSkillEntryExtraTable(entry);
  if (!text) return "";
  const content = `
    <div class="detailSkillCard ${meta ? "has-meta" : ""} ${variant === "panel" ? "detailSkillCardPanel" : ""}">
      ${title ? `<h5 class="detailSkillName">${sanitize(title)}</h5>` : ""}
      <p class="detailSkillText">${sanitize(text)}</p>
      ${renderSkillMetaTable(meta)}
      ${renderSkillExtraTable(extraTable)}
      ${actionHtml}
    </div>
  `;
  return content;
}

function renderSectionList(title, entries) {
  const body = entries.length
    ? `<div class="detailList">${entries.map((entry) => renderSkillEntryHtml(entry)).join("")}</div>`
    : `<p class="detailEmpty">None</p>`;
  return `
    <div class="characterDetailBlock">
      <h4>${sanitize(title)}</h4>
      ${body}
    </div>
  `;
}

function renderCharacterLoreBlock(targetCharacter) {
  const roleText = targetCharacter.roleText ? `<p class="characterFlavorRole">${sanitize(targetCharacter.roleText)}</p>` : "";
  const flavorText = targetCharacter.flavorText ? `<p class="characterFlavorText">${sanitize(targetCharacter.flavorText)}</p>` : "";
  if (!roleText && !flavorText) return "";
  return `
    <div class="characterDetailBlock characterFlavorBlock">
      <h4>Character Overview</h4>
      ${roleText}
      ${flavorText}
    </div>
  `;
}
const itemDefinitions = {
  coin: {
    id: "coin",
    name: "Coin",
    shortName: "Coin",
    icon: "🪙",
    description: "Mimi's collected Coins. Used by Double or Nothing in Gambler Mode.",
    stackable: true,
    battleOnly: true
  },
  abilityRestore: {
    id: "abilityRestore",
    name: "Ability Restore",
    shortName: "Ability Restore",
    icon: "✨",
    description: "Restore 10 to any one stat.",
    use(player) {
      return chooseStatFromModal(player, "Ability Restore", "Choose a stat to restore by 10.", (statKey) => {
        const amount = restoreStat(player, statKey, 10);
        log(`${player.name} restored ${amount} to ${statLabel(statKey)}.`);
      });
    }
  },
  abilityExpand: {
    id: "abilityExpand",
    name: "Ability Expand",
    shortName: "Ability Expand",
    icon: "⬆️",
    description: "Increase only the max value of any one stat by 10. Resets when HP reaches 0.",
    use(player) {
      return chooseStatFromModal(player, "Ability Expand", "Choose a stat whose max value will increase by 10.", (statKey) => {
        const amount = increaseStatMax(player, statKey, 10);
        log(`${player.name} increased the max value of ${statLabel(statKey)} by ${amount}.`);
      });
    }
  },
  potion: {
    id: "potion",
    name: "Potion",
    shortName: "Potion",
    icon: "🧪",
    description: "Restore 20 HP.",
    use(player) {
      const amount = restoreStat(player, "hp", 20);
      log(`${player.name} restored ${amount} HP with a Potion.`);
      return Promise.resolve();
    }
  },
  forceShard: {
    id: "forceShard",
    name: "Power Shard",
    shortName: "Power Shard",
    icon: `<img class="itemIconImage itemIconImage--powerShard" src="${ITEM_IMAGE_PATH}power_shard_2.png" alt="">`,
    description: "Automatically consumed in the next battle, adding held count × 8 to the chosen stat.",
    stackable: true,
    battleOnly: true
  },
  flag: {
    id: "flag",
    name: "Flag",
    shortName: "Flag",
    icon: "🚩",
    description: "Worth +15 final points on the rectangular map."
  }
};

const MIMI_MAX_COINS = 99;
const MIMI_ROULETTES = [
  {
    id: "pocket",
    name: "Pocket Spin",
    cost: 5,
    detail: "Costs 5 Coins. If Mimi has fewer than 5 Coins, spends all remaining Coins instead.",
    outcomes: [
      { weight: 35, icon: "🧪", label: "Restore all current stats by 5", type: "restore", amount: 5 },
      { weight: 25, icon: itemDefinitions.forceShard.icon, label: "Gain 1 Power Shard and next Move and Space gain +1", type: "shardDiceBoost", shardAmount: 1, diceAmount: 1 },
      { weight: 40, icon: "💥", label: "Lose 5 from all current stats", type: "statLoss", amount: 5 }
    ]
  },
  {
    id: "high",
    name: "High Roller Spin",
    cost: 10,
    detail: "Costs 10 Coins.",
    outcomes: [
      { weight: 30, icon: "🧪", label: "Restore all current stats by 10", type: "restore", amount: 10 },
      { weight: 30, icon: itemDefinitions.forceShard.icon, label: "Gain 2 Power Shards and next Move and Space gain +2", type: "shardDiceBoost", shardAmount: 2, diceAmount: 2 },
      { weight: 40, icon: "💥", label: "Lose 10 from all current stats", type: "statLoss", amount: 10 }
    ]
  },
  {
    id: "jackpot",
    name: "Jackpot Frenzy",
    cost: 15,
    detail: "Costs 15 Coins.",
    outcomes: [
      { weight: 50, icon: "🌟", label: "Gain 3 Power Shards, next Move and Space gain +2, increase all stat maximums by 15, and restore 15", type: "jackpotWin", shardAmount: 3, diceAmount: 2, amount: 15 },
      { weight: 50, icon: "☠️", label: "Lose 30 from all current stats; next Move and Space are 1", type: "statLossDiceOne", amount: 30 }
    ]
  }
];

const ui = {
  setupScreen: document.getElementById("setupScreen"),
  gameScreen: document.getElementById("gameScreen"),
  startGameButton: document.getElementById("startGameButton"),
  boardWrap: document.getElementById("boardWrap"),
  board3d: document.getElementById("board3d"),
  cameraFrame: document.getElementById("cameraFrame"),
  battleIntroOverlay: document.getElementById("battleIntroOverlay"),
  battleIntroLeftBars: document.getElementById("battleIntroLeftBars"),
  battleIntroLeftIcon: document.getElementById("battleIntroLeftIcon"),
  battleIntroLeftName: document.getElementById("battleIntroLeftName"),
  battleIntroRightBars: document.getElementById("battleIntroRightBars"),
  battleIntroRightIcon: document.getElementById("battleIntroRightIcon"),
  battleIntroRightName: document.getElementById("battleIntroRightName"),
  roundInfo: document.getElementById("roundInfo"),
  turnInfo: document.getElementById("turnInfo"),
  playerDrawerWrap: document.getElementById("playerDrawerWrap"),
  playerDrawerToggle: document.getElementById("playerDrawerToggle"),
  teamScoreDock: document.getElementById("teamScoreDock"),
  playerSummaryDock: document.getElementById("playerSummaryDock"),
  playerSummaryHeader: document.getElementById("playerSummaryHeader"),
  playerSummaryTabs: document.getElementById("playerSummaryTabs"),
  expandedPlayerPanel: document.getElementById("expandedPlayerPanel"),
  phaseLabel: document.getElementById("phaseLabel"),
  moveDieValue: document.getElementById("moveDieValue"),
  paintDieValue: document.getElementById("paintDieValue"),
  remainingMoveValue: document.getElementById("remainingMoveValue"),
  remainingPaintValue: document.getElementById("remainingPaintValue"),
  actionOverlay: document.getElementById("actionOverlay"),
  moveModeCard: document.getElementById("moveModeCard"),
  paintModeCard: document.getElementById("paintModeCard"),
  moveModeChip: document.getElementById("moveModeChip"),
  paintModeChip: document.getElementById("paintModeChip"),
  moveOddsPanel: document.getElementById("moveOddsPanel"),
  paintOddsPanel: document.getElementById("paintOddsPanel"),
  cameraActionButton: document.getElementById("cameraActionButton"),
  actionButtons: document.getElementById("actionButtons"),
  modalRoot: document.getElementById("modalRoot"),
  modalBackdrop: document.getElementById("modalBackdrop"),
  messageModalTemplate: document.getElementById("messageModalTemplate"),
  zoomToggleButton: document.getElementById("zoomToggleButton"),
  zoomSlider: document.getElementById("zoomSlider"),
  zoomResetButton: document.getElementById("zoomResetButton"),
  zoomValue: document.getElementById("zoomValue"),
  boardTools: document.getElementById("boardTools"),
  cameraPad: document.getElementById("cameraPad"),
  cameraPadKnob: document.getElementById("cameraPadKnob"),
  fullscreenButton: document.getElementById("fullscreenButton"),
  interruptMatchButton: document.getElementById("interruptMatchButton"),
  itemToggleButton: document.getElementById("itemToggleButton"),
  swapToggleButton: document.getElementById("swapToggleButton"),
  logToggleButton: document.getElementById("logToggleButton"),
  skillToggleButton: document.getElementById("skillToggleButton"),
  rollDiceButton: document.getElementById("rollDiceButton"),
  restButton: document.getElementById("restButton"),
  itemTray: document.getElementById("itemTray"),
  swapBubble: document.getElementById("swapBubble"),
  skillPanel: document.getElementById("skillPanel"),
  diceBubble: document.getElementById("diceBubble"),
  restBubble: document.getElementById("restBubble"),
  rightOverlayPanel: document.getElementById("rightOverlayPanel"),
  bottomRightDock: document.getElementById("bottomRightDock"),
  skillDock: document.getElementById("skillDock"),
  obstacleActionPanel: document.getElementById("obstacleActionPanel"),
  flagCaptureBanner: document.getElementById("flagCaptureBanner"),
  skillActivationBanner: document.getElementById("skillActivationBanner"),
  inlinePromptPanel: document.getElementById("inlinePromptPanel"),
  lastRoundBanner: document.getElementById("lastRoundBanner"),
  roundStartBanner: document.getElementById("roundStartBanner")
};

const setupElements = Array.from(document.querySelectorAll(".playerSetup")).map((section) => ({
  section,
  nameInput: section.querySelector(".playerNameInput"),
  mainSelect: section.querySelector(".mainCharacterSelect"),
  subSelect: section.querySelector(".subCharacterSelect"),
  preview: section.querySelector(".characterPreview")
}));

const state = {
  phase: "setup",
  selectedMapId: "simpleArena",
  matchMode: "ffa",
  setupFlow: null,
  round: 1,
  board: [],
  players: [],
  order: [],
  currentTurnOrderIndex: 0,
  currentPlayerIndex: 0,
  currentAction: null,
  roundTransitionActive: false,
  moveDie: null,
  paintDie: null,
  remainingMove: 0,
  remainingPaint: 0,
  turnMoveCountBonus: 0,
  turnPaintCountBonus: 0,
  turnNormalMoveDistance: 0,
  selectedPath: [],
  selectedPaintTargets: [],
  turnHadBattle: false,
  turnCapturedEnemyCount: 0,
  turnUsedItem: false,
  rotationLocked: false,
  allowFreeCameraDuringInput: false,
  movementAnimating: false,
  camera: {
    yaw: -38,
    tilt: 72,
    zoom: 1,
    panX: 0,
    panY: 0,
    padDragging: false,
    padPointerId: null,
    padKnobX: 0,
    padKnobY: 0,
    padVelocityX: 0,
    padVelocityY: 0,
    padAnimationFrame: null,
    activePointers: new Map(),
    pinchActive: false,
    pinchStartDistance: 0,
    pinchStartZoom: 1,
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0,
    moved: false,
    suppressTileClickUntil: 0
  },
  tileElements: new Map(),
  avatarElements: new Map(),
  flagElements: new Set(),
  obstacleElements: new Set(),
  groundItemElements: new Set(),
  foodCourtServedFoodElements: new Set(),
  zoneElements: new Set(),
  damageTextElements: new Set(),
  popcornEffectElements: new Set(),
  territoryPointTextElements: new Set(),
  territoryElements: new Set(),
  territoryStatusById: {},
  territoryPointsByKey: {},
  foodCourt: null,
  pendingBattle: null,
  returningPlayerIds: [],
  battleIntroRunning: false,
  activeModals: [],
  completedTurnsInRound: 0,
  turnNumber: 0,
  gameOver: false,
  globalIdCounter: 1,
  logEntries: [],
  ui: {
    zoomPanelOpen: false,
    itemTrayOpen: false,
    swapBubbleOpen: false,
    skillPanelOpen: false,
    diceBubbleOpen: false,
    restBubbleOpen: false,
    rightPanelMode: null,
    selectedItemIndex: null,
    summaryPanelOpen: true,
    summaryDrawerOpen: false,
    selectedCharacterInspect: null,
    selectedTileInspect: null,
    logRoundFilter: null,
    logTabsNeedCenter: false,
    obstaclePrompt: null,
    inlinePrompt: null,
    zoneEnhancePrompt: null,
    zoneEntryPrompt: null,
    pitEnhancePrompt: null,
    pitEntryPrompt: null,
    pipEnhancePrompt: null,
    rascaSnapbackPrompt: null,
    skavaTargetPrompt: null,
    hobbsTargetPrompt: null,
    playerTargetPrompt: null,
    matchAbortPromptOpen: false
  },
  selectedPlayerSummaryIndex: 0,
  setupSelection: {
    active: false,
    availableCorners: [],
    currentPlayerIndex: null,
    computerChoiceMode: null,
    autoPlaceAllComputers: false,
    resolve: null
  },
  turnActionOrigin: null,
  turnActionOriginalOwners: {},
  diceAnimation: {
    raf: null
  },
  orderAnimation: {
    interval: null,
    lastSyncAt: 0
  },
  flagCaptureAnimationTimeout: null,
  skillActivationBannerTimeout: null,
  lastRoundBannerTimeout: null,
  lastRoundActive: false,
  lastRoundHudActive: false,
  lastRoundReason: "",
  gameEndContext: null,
  matchRuntimeVersion: 0,
  computerTurnTimer: null,
  venomVarnishes: [],
  veskaThreadEffects: [],
  statLossPopups: [],
  mimiGamblerRipples: [],
  brakkExplosionEffects: [],
  brakkMissileEffects: [],
  rascaTailImpactEffects: [],
  pipPopcornEffects: [],
  rascaClones: [],
  damageTextPopups: [],
  territoryPointPopups: [],
  paintPhaseStartRemaining: 0,
  tutorial: {
    active: false,
    step: 0,
    pendingBattleLaunch: false,
    baseChoiceLocked: null,
    moveTargetPath: [],
    moveTargetPaint: []
  }
};

const HUB_GAME_ID = "tileboard";
const HUB_ROOM_EVENTS = Object.freeze({
  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",
  PLAYER_READY: "player_ready",
  START_GAME: "start_game",
  GAME_ACTION: "game_action",
  SYNC_REQUEST: "sync_request",
  HEARTBEAT: "heartbeat"
});
const HUB_SERVER_EVENTS = Object.freeze({
  ROOM_JOINED: "room_joined",
  ROOM_STATE: "room_state",
  PLAYER_JOINED: "player_joined",
  GAME_STARTED: "game_started",
  GAME_ACTION: "game_action",
  SYNC_STATE: "sync_state",
  ERROR: "error",
  ROOM_CLOSED: "room_closed"
});
const HUB_ACTION_TYPES = Object.freeze({
  SNAPSHOT: "territory_snapshot",
  REQUEST_SNAPSHOT: "territory_request_snapshot",
  SELECT_TILE: "territory_select_tile",
  CONTROL_ACTION: "territory_control_action",
  ROLL_DICE: "territory_roll_dice",
  REST: "territory_rest",
  MODAL_SYNC: "territory_modal_sync",
  MODAL_CLOSE: "territory_modal_close",
  MODAL_CLICK: "territory_modal_click",
  SETUP_SNAPSHOT: "territory_setup_snapshot",
  SETUP_ACTION: "territory_setup_action"
});
const multiplayer = {
  session: resolveHubSession(),
  socket: null,
  connected: false,
  room: null,
  playerSlots: new Map(),
  applyingSnapshot: false,
  snapshotTimer: null,
  setupSnapshotTimer: null,
  actionCounter: 1,
  heartbeatTimer: null,
  statusEl: null,
  lastError: ""
};

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

function sanitizeHubRoomCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

function sanitizeHubPlayerName(value) {
  return String(value || "").replace(/\s+/g, " ").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 24);
}

function createStableHubPlayerId(mode, roomCode) {
  const storageKey = `${HUB_GAME_ID}:player-id:${mode || "local"}:${roomCode || "local"}`;
  const existing = safeStorageGet(storageKey);
  if (existing) return existing;
  const generated = `${HUB_GAME_ID}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
  safeStorageSet(storageKey, generated);
  return generated;
}

function resolveHubSession() {
  const params = new URLSearchParams(window.location.search || "");
  const requestedMode = String(params.get("mode") || "local").toLowerCase();
  const mode = ["local", "host", "join"].includes(requestedMode) ? requestedMode : "local";
  const roomCode = sanitizeHubRoomCode(params.get("room"));
  const playerName = sanitizeHubPlayerName(params.get("name")) || (mode === "join" ? "Player 2" : "Player 1");
  const wsUrl = String(params.get("ws") || "").trim();
  const isRoomPlay = mode === "host" || mode === "join";
  return {
    fromHub: params.get("hub") === "1" || params.has("mode") || params.has("room") || params.has("ws"),
    mode,
    isRoomPlay,
    isHost: mode === "host",
    isGuest: mode === "join",
    roomCode: isRoomPlay ? roomCode : null,
    playerName,
    playerId: createStableHubPlayerId(mode, roomCode),
    wsUrl,
    valid: !isRoomPlay || (!!roomCode && !!wsUrl && typeof WebSocket === "function")
  };
}

function ensureMultiplayerStatusEl() {
  if (multiplayer.statusEl || !document.body) return multiplayer.statusEl;
  const el = document.createElement("div");
  el.id = "hubMultiplayerStatus";
  el.style.cssText = [
    "position:fixed",
    "left:calc(10px + env(safe-area-inset-left, 0px))",
    "bottom:calc(10px + env(safe-area-inset-bottom, 0px))",
    "z-index:9999",
    "max-width:min(360px, calc(100vw - 20px))",
    "padding:8px 10px",
    "border-radius:8px",
    "background:rgba(9, 14, 24, 0.82)",
    "color:#f8fbff",
    "font:600 12px/1.3 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "box-shadow:0 8px 22px rgba(0,0,0,0.28)",
    "pointer-events:none"
  ].join(";");
  document.body.appendChild(el);
  multiplayer.statusEl = el;
  return el;
}

function updateMultiplayerStatus(message = null) {
  if (!multiplayer.session.fromHub) return;
  const el = ensureMultiplayerStatusEl();
  if (!el) return;
  if (!multiplayer.session.isRoomPlay) {
    el.textContent = "Hub local play";
    return;
  }
  const room = multiplayer.session.roomCode || "----";
  const role = multiplayer.session.isHost ? "Host" : "Guest";
  const connected = multiplayer.connected ? "connected" : "connecting";
  el.textContent = message || `${role} room ${room}: ${connected}`;
}

function hubSend(type, payload = {}) {
  if (!multiplayer.socket || multiplayer.socket.readyState !== WebSocket.OPEN) return false;
  multiplayer.socket.send(JSON.stringify({ type, payload }));
  return true;
}

function createHubAction(type, payload = {}) {
  return {
    id: `${HUB_GAME_ID}-${Date.now().toString(36)}-${multiplayer.actionCounter++}`,
    type,
    createdAt: Date.now(),
    actorId: multiplayer.session.playerId,
    payload
  };
}

function sendHubAction(type, payload = {}) {
  if (!multiplayer.session.isRoomPlay || !multiplayer.connected) return false;
  return hubSend(HUB_ROOM_EVENTS.GAME_ACTION, {
    roomCode: multiplayer.session.roomCode,
    action: createHubAction(type, payload)
  });
}

function cssEscapeValue(value) {
  if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(String(value));
  return String(value).replace(/["\\]/g, "\\$&");
}

function getHubElementSelector(element) {
  if (!element || element.nodeType !== 1) return "";
  if (element.id) return `#${cssEscapeValue(element.id)}`;
  const dataAttribute = Array.from(element.attributes || []).find((attribute) => attribute.name.startsWith("data-"));
  if (dataAttribute) {
    return `[${dataAttribute.name}="${cssEscapeValue(dataAttribute.value)}"]`;
  }
  return "";
}

function syncOpenModalToRoom() {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isHost || !multiplayer.connected || multiplayer.applyingSnapshot) return;
  sendHubAction(HUB_ACTION_TYPES.MODAL_SYNC, {
    html: ui.modalRoot.innerHTML,
    backdropClassName: ui.modalBackdrop.className
  });
}

function syncOpenModalToRoomThrottled(minInterval = 140) {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isHost || !multiplayer.connected || multiplayer.applyingSnapshot) return;
  const now = performance.now();
  if (now - (state.orderAnimation.lastSyncAt || 0) < minInterval) return;
  state.orderAnimation.lastSyncAt = now;
  syncOpenModalToRoom();
}

function syncClosedModalToRoom() {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isHost || !multiplayer.connected || multiplayer.applyingSnapshot) return;
  sendHubAction(HUB_ACTION_TYPES.MODAL_CLOSE);
}

function applyRemoteModalSync(payload) {
  if (multiplayer.session.isHost) return;
  ui.modalBackdrop.className = payload?.backdropClassName || "modalBackdrop";
  ui.modalBackdrop.classList.remove("hidden");
  ui.modalRoot.innerHTML = payload?.html || "";
  state.activeModals = Array.from(ui.modalRoot.children);
}

function applyRemoteModalClose() {
  if (multiplayer.session.isHost) return;
  ui.modalRoot.innerHTML = "";
  state.activeModals = [];
  ui.modalBackdrop.classList.add("hidden");
}

function clickHostModalSelector(selector) {
  if (!multiplayer.session.isHost || !selector) return;
  const target = ui.modalRoot.querySelector(selector);
  if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return;
  target.click();
  window.setTimeout(() => {
    if (ui.modalRoot.children.length) syncOpenModalToRoom();
  }, 60);
}

function updateRoomPlayerSlots(room = multiplayer.room) {
  multiplayer.playerSlots.clear();
  const players = Array.isArray(room?.players) ? room.players : [];
  const hostId = room?.hostId || players[0]?.id || null;
  const hostPlayer = players.find((player) => player.id === hostId) || players[0] || null;
  const guestPlayer = players.find((player) => player.id !== hostPlayer?.id) || null;
  if (hostPlayer?.id) multiplayer.playerSlots.set(hostPlayer.id, 0);
  if (guestPlayer?.id) multiplayer.playerSlots.set(guestPlayer.id, 1);
}

function getLocalPlayerSlot() {
  if (!multiplayer.session.isRoomPlay) return null;
  if (multiplayer.playerSlots.has(multiplayer.session.playerId)) {
    return multiplayer.playerSlots.get(multiplayer.session.playerId);
  }
  return multiplayer.session.isHost ? 0 : 1;
}

function getRemoteActionPlayerIndex(fromPlayerId) {
  if (multiplayer.playerSlots.has(fromPlayerId)) return multiplayer.playerSlots.get(fromPlayerId);
  return fromPlayerId === multiplayer.session.playerId ? getLocalPlayerSlot() : 1;
}

function isLocalRoomPlayerTurn() {
  if (!multiplayer.session.isRoomPlay) return true;
  return state.currentPlayerIndex === getLocalPlayerSlot();
}

function canLocalInteractWithRoomTurn() {
  if (!multiplayer.session.isRoomPlay) return true;
  return isLocalRoomPlayerTurn();
}

function configureHubSetupPlayersFromRoom(room = multiplayer.room) {
  if (!multiplayer.session.isRoomPlay || !state.setupFlow?.players?.length) return;
  updateRoomPlayerSlots(room);
  const players = Array.isArray(room?.players) ? room.players : [];
  players.forEach((roomPlayer) => {
    const existingSlot = state.setupFlow.players.findIndex((setupPlayer) => setupPlayer?.hubPlayerId === roomPlayer.id);
    const slot = existingSlot >= 0
      ? existingSlot
      : (roomPlayer.id === room?.hostId ? 0 : null);
    const setupPlayer = Number.isInteger(slot) ? state.setupFlow.players[slot] : null;
    if (!setupPlayer) return;
    setupPlayer.name = sanitizeHubPlayerName(roomPlayer.name) || `Player ${slot + 1}`;
    setupPlayer.controller = "human";
    setupPlayer.hubPlayerId = roomPlayer.id;
  });
  const localSlot = getLocalPlayerSlot();
  const shouldClaimLocalSlot = multiplayer.session.isHost
    || state.setupFlow.players.some((setupPlayer) => setupPlayer?.hubPlayerId === multiplayer.session.playerId);
  if (shouldClaimLocalSlot && Number.isInteger(localSlot) && state.setupFlow.players[localSlot]) {
    state.setupFlow.players[localSlot].name = multiplayer.session.playerName || `Player ${localSlot + 1}`;
    state.setupFlow.players[localSlot].controller = "human";
    state.setupFlow.players[localSlot].hubPlayerId = multiplayer.session.playerId;
  }
  renderSetupFlow();
}

function isHostSetupAuthority() {
  return !multiplayer.session.isRoomPlay || multiplayer.session.isHost;
}

function getSetupOwnerIdForSlot(playerIndex) {
  const room = multiplayer.room;
  const setupPlayer = state.setupFlow?.players?.[playerIndex];
  if (setupPlayer?.hubPlayerId) return setupPlayer.hubPlayerId;
  if (playerIndex === 0) return room?.hostId || null;
  const roomPlayers = Array.isArray(room?.players) ? room.players : [];
  const guest = roomPlayers.find((player) => player.id !== room?.hostId);
  return playerIndex === 1 ? guest?.id || null : null;
}

function isLocalSetupPlayerSlot(playerIndex) {
  if (!multiplayer.session.isRoomPlay) return true;
  return getSetupOwnerIdForSlot(playerIndex) === multiplayer.session.playerId;
}

function canEditSetupPlayer(playerIndex) {
  if (!multiplayer.session.isRoomPlay) return true;
  const setupPlayer = state.setupFlow?.players?.[playerIndex];
  if (!setupPlayer) return false;
  if (isLocalSetupPlayerSlot(playerIndex)) return true;
  return multiplayer.session.isHost && isSetupComputer(setupPlayer);
}

function isGuestJoinedCurrentSetup() {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isGuest) return false;
  return (state.setupFlow?.players || []).some((setupPlayer) => setupPlayer?.hubPlayerId === multiplayer.session.playerId);
}

function createSetupSnapshot() {
  return JSON.parse(JSON.stringify({
    selectedMapId: state.selectedMapId,
    matchMode: state.matchMode,
    setupFlow: state.setupFlow
  }));
}

function applySetupSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object" || multiplayer.session.isHost) return;
  multiplayer.applyingSnapshot = true;
  state.selectedMapId = snapshot.selectedMapId || state.selectedMapId || "simpleArena";
  state.matchMode = snapshot.matchMode || state.matchMode || "ffa";
  state.setupFlow = snapshot.setupFlow || state.setupFlow;
  if (state.phase !== "game") {
    renderSetupFlow();
  }
  updateMultiplayerStatus();
  multiplayer.applyingSnapshot = false;
}

function scheduleSetupSnapshot(delay = 80) {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isHost || !multiplayer.connected || multiplayer.applyingSnapshot || state.phase === "game") return;
  if (multiplayer.setupSnapshotTimer) window.clearTimeout(multiplayer.setupSnapshotTimer);
  multiplayer.setupSnapshotTimer = window.setTimeout(() => {
    multiplayer.setupSnapshotTimer = null;
    sendHubAction(HUB_ACTION_TYPES.SETUP_SNAPSHOT, { snapshot: createSetupSnapshot() });
  }, delay);
}

function claimSetupSlotForPlayer(playerId, playerName) {
  if (!state.setupFlow?.players?.length || !playerId) return false;
  const players = state.setupFlow.players;
  let index = players.findIndex((setupPlayer) => setupPlayer?.hubPlayerId === playerId);
  if (index < 0) index = Math.min(1, players.length - 1);
  if (index < 0) {
    players.push(createDefaultSetupPlayers(1)[0]);
    index = 0;
  }
  const setupPlayer = players[index];
  setupPlayer.hubPlayerId = playerId;
  setupPlayer.controller = "human";
  setupPlayer.name = sanitizeHubPlayerName(playerName) || `Player ${index + 1}`;
  setupPlayer.ready = false;
  if (setupPlayer.mainCharacterId === setupPlayer.subCharacterId) {
    setupPlayer.subCharacterId = Object.keys(characterLibrary).find((id) => id !== setupPlayer.mainCharacterId) || setupPlayer.subCharacterId;
  }
  applyRoyalMarchSetupDefaults();
  return true;
}

function releaseSetupSlotForPlayer(playerId) {
  const index = (state.setupFlow?.players || []).findIndex((setupPlayer) => setupPlayer?.hubPlayerId === playerId);
  if (index < 0) return false;
  const setupPlayer = state.setupFlow.players[index];
  setupPlayer.hubPlayerId = null;
  setupPlayer.controller = "computer";
  maybeApplyComputerDefaultName(setupPlayer, index);
  syncSetupReadyForController(setupPlayer);
  if (state.setupFlow.picker?.playerIndex === index) state.setupFlow.picker.open = false;
  if (state.setupFlow.teamPicker?.playerIndex === index) state.setupFlow.teamPicker.open = false;
  return true;
}

function applySetupMutationFromRoom(action, actorId) {
  if (!multiplayer.session.isHost || !state.setupFlow || !action?.op) return;
  const op = String(action.op);
  const playerIndex = Number(action.playerIndex);
  const setupPlayer = Number.isInteger(playerIndex) ? state.setupFlow.players[playerIndex] : null;
  const ownsPlayer = setupPlayer && getSetupOwnerIdForSlot(playerIndex) === actorId;
  if (op === "join") {
    claimSetupSlotForPlayer(actorId, action.playerName);
  } else if (op === "leave") {
    releaseSetupSlotForPlayer(actorId);
  } else if (setupPlayer && ownsPlayer) {
    if (op === "name") {
      setupPlayer.name = sanitizeHubPlayerName(action.value).slice(0, 12) || getSetupPlayerDisplayName(setupPlayer, playerIndex);
      syncSetupReadyForController(setupPlayer);
    } else if (op === "ready") {
      setupPlayer.ready = isSetupComputer(setupPlayer) ? isSetupPlayerValid(setupPlayer) : !setupPlayer.ready;
    } else if (op === "randomize") {
      const ids = Object.keys(characterLibrary);
      const firstIndex = randomInt(0, Math.max(0, ids.length - 1));
      let secondIndex = firstIndex;
      if (ids.length > 1) while (secondIndex === firstIndex) secondIndex = randomInt(0, ids.length - 1);
      setupPlayer.mainCharacterId = ids[firstIndex] || ids[0];
      setupPlayer.subCharacterId = ids[secondIndex] || ids[1] || ids[0];
      setupPlayer.ready = false;
    } else if (op === "team") {
      const teamKey = action.teamKey;
      if (getAvailableSetupTeamKeys().includes(teamKey)) {
        setupPlayer.teamKey = normalizeTeamKey(teamKey, playerIndex);
        setupPlayer.ready = false;
      }
      state.setupFlow.teamPicker = { open: false, playerIndex: 0 };
    } else if (op === "openTeam") {
      state.setupFlow.teamPicker = { open: true, playerIndex };
    } else if (op === "openPicker") {
      const slotKey = action.slotKey === "subCharacterId" ? "subCharacterId" : "mainCharacterId";
      state.setupFlow.picker = {
        open: true,
        playerIndex,
        slotKey,
        inspectCharacterId: setupPlayer?.[slotKey] || setupPlayer?.mainCharacterId || null
      };
    } else if (op === "inspect") {
      state.setupFlow.picker.inspectCharacterId = action.characterId;
    } else if (op === "selectCharacter") {
      const picker = state.setupFlow.picker;
      if (picker?.playerIndex === playerIndex) {
        const slotKey = picker.slotKey === "subCharacterId" ? "subCharacterId" : "mainCharacterId";
        const selectedCharacterId = action.characterId;
        const oppositeKey = slotKey === "mainCharacterId" ? "subCharacterId" : "mainCharacterId";
        if (characterLibrary[selectedCharacterId] && setupPlayer[oppositeKey] !== selectedCharacterId) {
          setupPlayer[slotKey] = selectedCharacterId;
          setupPlayer.ready = false;
          state.setupFlow.picker.open = false;
        }
      }
    } else if (op === "closePicker") {
      state.setupFlow.picker.open = false;
    } else if (op === "royalRole") {
      setRoyalMarchSetupRole(playerIndex, action.role);
    } else if (op === "cycleRoyalRole") {
      cycleRoyalMarchSetupRole(playerIndex);
    }
    syncSetupReadyForController(setupPlayer);
  }
  renderSetupFlow();
  scheduleSetupSnapshot(20);
}

function sendGuestSetupAction(action) {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isGuest) return false;
  sendHubAction(HUB_ACTION_TYPES.SETUP_ACTION, {
    ...action,
    playerName: multiplayer.session.playerName
  });
  return true;
}

function handleGuestSetupScreenClick(event) {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isGuest || state.phase === "game") return false;
  const joinButton = event.target.closest("#setupAddPlayerButton");
  if (joinButton) {
    event.preventDefault();
    event.stopPropagation();
    sendGuestSetupAction({ op: isGuestJoinedCurrentSetup() ? "leave" : "join" });
    return true;
  }
  if (
    event.target.closest("#startTutorialButton")
    || event.target.closest("#setupRandomMapButton")
    || event.target.closest("[data-map-select]")
    || event.target.closest("#setupBackToMapsButton")
    || event.target.closest("#setupMapChooseButton")
    || event.target.closest("#setupRoyalMarchTutorialButton")
    || event.target.closest("#setupBackToMapDetailButton")
    || event.target.closest("#setupModeToggleButton")
    || event.target.closest("#setupFillBotsButton")
    || event.target.closest("[data-player-remove]")
    || event.target.closest("[data-player-controller]")
    || event.target.closest("#setupPlayButton")
  ) {
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const readyButton = event.target.closest("[data-player-ready-button]");
  if (readyButton) {
    const playerIndex = Number(readyButton.dataset.playerReadyButton);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "ready", playerIndex });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const randomButton = event.target.closest("[data-player-randomize]");
  if (randomButton) {
    const playerIndex = Number(randomButton.dataset.playerRandomize);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "randomize", playerIndex });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const teamButton = event.target.closest("[data-player-team]");
  if (teamButton) {
    const playerIndex = Number(teamButton.dataset.playerTeam);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "openTeam", playerIndex });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const teamChoiceButton = event.target.closest("[data-setup-team-choice]");
  if (teamChoiceButton) {
    const playerIndex = Number(teamChoiceButton.dataset.playerIndex);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "team", playerIndex, teamKey: teamChoiceButton.dataset.setupTeamChoice });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  if (event.target.closest("[data-setup-team-picker-close]") || (event.target.classList && event.target.classList.contains("setupTeamPickerPopup"))) {
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const slotButton = event.target.closest("[data-character-slot]");
  if (slotButton) {
    const playerIndex = Number(slotButton.dataset.playerIndex);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "openPicker", playerIndex, slotKey: slotButton.dataset.slotKey });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  if (event.target.closest("#setupCharacterOverlayBack") || event.target.closest(".setupCharacterOverlay") === ui.setupCharacterOverlay && event.target === ui.setupCharacterOverlay) {
    sendGuestSetupAction({ op: "closePicker", playerIndex: getLocalPlayerSlot() });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const inspectButton = event.target.closest("[data-character-inspect]");
  if (inspectButton) {
    sendGuestSetupAction({ op: "inspect", playerIndex: getLocalPlayerSlot(), characterId: inspectButton.dataset.characterInspect });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const selectButton = event.target.closest("[data-character-select]");
  if (selectButton) {
    const pickerIndex = Number(state.setupFlow?.picker?.playerIndex);
    if (isLocalSetupPlayerSlot(pickerIndex)) sendGuestSetupAction({ op: "selectCharacter", playerIndex: pickerIndex, characterId: selectButton.dataset.characterSelect });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const royalRoleChoice = event.target.closest("[data-royal-role-choice]");
  if (royalRoleChoice) {
    const playerIndex = Number(royalRoleChoice.dataset.royalRoleChoice);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "royalRole", playerIndex, role: royalRoleChoice.dataset.royalRoleId });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const royalRoleButton = event.target.closest("[data-royal-role]");
  if (royalRoleButton) {
    const playerIndex = Number(royalRoleButton.dataset.royalRole);
    if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "cycleRoyalRole", playerIndex });
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  const card = event.target.closest("[data-setup-player-card]");
  if (card && !isLocalSetupPlayerSlot(Number(card.dataset.setupPlayerCard))) {
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
  return false;
}

function sanitizeSnapshotValue(key, value) {
  if (typeof value === "function") return undefined;
  if (key === "tileElements" || key === "avatarElements" || key === "flagElements" || key === "obstacleElements" || key === "groundItemElements" || key === "foodCourtServedFoodElements" || key === "zoneElements" || key === "damageTextElements" || key === "popcornEffectElements" || key === "territoryPointTextElements" || key === "territoryElements" || key === "activeModals") {
    return undefined;
  }
  if (key === "diceAnimation" || key === "orderAnimation") return undefined;
  if (value instanceof Map || value instanceof Set) return undefined;
  if (key === "activePointers") return undefined;
  if (typeof Node !== "undefined" && value instanceof Node) return undefined;
  return value;
}

function createMultiplayerSnapshot() {
  const camera = { ...state.camera, activePointers: undefined, dragging: false, pointerId: null, padDragging: false, padPointerId: null, padAnimationFrame: null };
  const snapshotSource = {
    phase: state.phase,
    selectedMapId: state.selectedMapId,
    matchMode: state.matchMode,
    setupFlow: state.setupFlow,
    round: state.round,
    board: state.board,
    players: state.players,
    order: state.order,
    currentTurnOrderIndex: state.currentTurnOrderIndex,
    currentPlayerIndex: state.currentPlayerIndex,
    currentAction: state.currentAction,
    roundTransitionActive: state.roundTransitionActive,
    moveDie: state.moveDie,
    paintDie: state.paintDie,
    remainingMove: state.remainingMove,
    remainingPaint: state.remainingPaint,
    turnMoveCountBonus: state.turnMoveCountBonus,
    turnPaintCountBonus: state.turnPaintCountBonus,
    turnNormalMoveDistance: state.turnNormalMoveDistance,
    selectedPath: state.selectedPath,
    selectedPaintTargets: state.selectedPaintTargets,
    turnHadBattle: state.turnHadBattle,
    turnCapturedEnemyCount: state.turnCapturedEnemyCount,
    turnUsedItem: state.turnUsedItem,
    rotationLocked: state.rotationLocked,
    allowFreeCameraDuringInput: state.allowFreeCameraDuringInput,
    movementAnimating: state.movementAnimating,
    camera,
    territoryStatusById: state.territoryStatusById,
    territoryPointsByKey: state.territoryPointsByKey,
    foodCourt: state.foodCourt,
    pendingBattle: state.pendingBattle,
    returningPlayerIds: state.returningPlayerIds,
    battleIntroRunning: state.battleIntroRunning,
    completedTurnsInRound: state.completedTurnsInRound,
    turnNumber: state.turnNumber,
    gameOver: state.gameOver,
    globalIdCounter: state.globalIdCounter,
    logEntries: state.logEntries,
    ui: {
      ...state.ui,
      matchAbortPromptOpen: false
    },
    selectedPlayerSummaryIndex: state.selectedPlayerSummaryIndex,
    setupSelection: {
      active: state.setupSelection.active,
      availableCorners: state.setupSelection.availableCorners,
      currentPlayerIndex: state.setupSelection.currentPlayerIndex,
      computerChoiceMode: state.setupSelection.computerChoiceMode,
      autoPlaceAllComputers: state.setupSelection.autoPlaceAllComputers
    },
    turnActionOrigin: state.turnActionOrigin,
    turnActionOriginalOwners: state.turnActionOriginalOwners,
    lastRoundActive: state.lastRoundActive,
    lastRoundHudActive: state.lastRoundHudActive,
    lastRoundReason: state.lastRoundReason,
    gameEndContext: state.gameEndContext,
    matchRuntimeVersion: state.matchRuntimeVersion,
    venomVarnishes: state.venomVarnishes,
    veskaThreadEffects: state.veskaThreadEffects,
    statLossPopups: state.statLossPopups,
    mimiGamblerRipples: state.mimiGamblerRipples,
    brakkExplosionEffects: state.brakkExplosionEffects,
    brakkMissileEffects: state.brakkMissileEffects,
    rascaTailImpactEffects: state.rascaTailImpactEffects,
    pipPopcornEffects: state.pipPopcornEffects,
    rascaClones: state.rascaClones,
    damageTextPopups: state.damageTextPopups,
    territoryPointPopups: state.territoryPointPopups,
    paintPhaseStartRemaining: state.paintPhaseStartRemaining,
    tutorial: state.tutorial
  };
  return JSON.parse(JSON.stringify(snapshotSource, sanitizeSnapshotValue));
}

function applyMultiplayerSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object" || multiplayer.session.isHost) return;
  multiplayer.applyingSnapshot = true;
  const preserved = {
    tileElements: state.tileElements,
    avatarElements: state.avatarElements,
    flagElements: state.flagElements,
    obstacleElements: state.obstacleElements,
    groundItemElements: state.groundItemElements,
    foodCourtServedFoodElements: state.foodCourtServedFoodElements,
    zoneElements: state.zoneElements,
    damageTextElements: state.damageTextElements,
    popcornEffectElements: state.popcornEffectElements,
    territoryPointTextElements: state.territoryPointTextElements,
    territoryElements: state.territoryElements,
    activeModals: state.activeModals,
    diceAnimation: state.diceAnimation,
    orderAnimation: state.orderAnimation,
    cameraActivePointers: state.camera.activePointers,
    cameraPadAnimationFrame: state.camera.padAnimationFrame
  };
  Object.assign(state, snapshot);
  state.tileElements = preserved.tileElements;
  state.avatarElements = preserved.avatarElements;
  state.flagElements = preserved.flagElements;
  state.obstacleElements = preserved.obstacleElements;
  state.groundItemElements = preserved.groundItemElements;
  state.foodCourtServedFoodElements = preserved.foodCourtServedFoodElements;
  state.zoneElements = preserved.zoneElements;
  state.damageTextElements = preserved.damageTextElements;
  state.popcornEffectElements = preserved.popcornEffectElements;
  state.territoryPointTextElements = preserved.territoryPointTextElements;
  state.territoryElements = preserved.territoryElements;
  state.activeModals = preserved.activeModals;
  state.diceAnimation = preserved.diceAnimation;
  state.orderAnimation = preserved.orderAnimation;
  state.camera = {
    ...state.camera,
    activePointers: preserved.cameraActivePointers,
    padAnimationFrame: preserved.cameraPadAnimationFrame,
    dragging: false,
    pointerId: null,
    padDragging: false,
    padPointerId: null
  };
  state.setupSelection = {
    active: !!snapshot.setupSelection?.active,
    availableCorners: Array.isArray(snapshot.setupSelection?.availableCorners) ? snapshot.setupSelection.availableCorners : [],
    currentPlayerIndex: snapshot.setupSelection?.currentPlayerIndex ?? null,
    computerChoiceMode: snapshot.setupSelection?.computerChoiceMode ?? null,
    autoPlaceAllComputers: !!snapshot.setupSelection?.autoPlaceAllComputers,
    resolve: null
  };
  ui.setupScreen.classList.toggle("active", state.phase !== "game");
  ui.gameScreen.classList.toggle("active", state.phase === "game");
  if (state.phase === "setup") {
    renderSetupFlow();
  } else {
    renderAll({ fullBoard: true });
  }
  updateMultiplayerStatus();
  multiplayer.applyingSnapshot = false;
}

function multiplayerScheduleSnapshot(delay = 220) {
  if (!multiplayer.session.isRoomPlay || !multiplayer.session.isHost || !multiplayer.connected || multiplayer.applyingSnapshot) return;
  if (multiplayer.snapshotTimer) window.clearTimeout(multiplayer.snapshotTimer);
  multiplayer.snapshotTimer = window.setTimeout(() => {
    multiplayer.snapshotTimer = null;
    sendHubAction(HUB_ACTION_TYPES.SNAPSHOT, { snapshot: createMultiplayerSnapshot() });
  }, delay);
}

async function handleRemoteHubAction(action, fromPlayerId) {
  if (!action || typeof action.type !== "string") return;
  if (action.type === HUB_ACTION_TYPES.SNAPSHOT) {
    applyMultiplayerSnapshot(action.payload?.snapshot);
    return;
  }
  if (action.type === HUB_ACTION_TYPES.SETUP_SNAPSHOT) {
    applySetupSnapshot(action.payload?.snapshot);
    return;
  }
  if (action.type === HUB_ACTION_TYPES.SETUP_ACTION) {
    applySetupMutationFromRoom(action.payload, fromPlayerId);
    return;
  }
  if (action.type === HUB_ACTION_TYPES.REQUEST_SNAPSHOT) {
    if (multiplayer.session.isHost) multiplayerScheduleSnapshot(20);
    if (multiplayer.session.isHost) scheduleSetupSnapshot(20);
    return;
  }
  if (action.type === HUB_ACTION_TYPES.MODAL_SYNC) {
    applyRemoteModalSync(action.payload);
    return;
  }
  if (action.type === HUB_ACTION_TYPES.MODAL_CLOSE) {
    applyRemoteModalClose();
    return;
  }
  if (action.type === HUB_ACTION_TYPES.MODAL_CLICK) {
    if (fromPlayerId !== multiplayer.session.playerId) clickHostModalSelector(action.payload?.selector);
    return;
  }
  if (!multiplayer.session.isHost || fromPlayerId === multiplayer.session.playerId) return;
  const actorIndex = getRemoteActionPlayerIndex(fromPlayerId);
  if (!Number.isInteger(actorIndex)) return;
  if (state.setupSelection.active && action.type !== HUB_ACTION_TYPES.SELECT_TILE) return;
  if (!state.setupSelection.active && state.currentPlayerIndex !== actorIndex) return;

  if (action.type === HUB_ACTION_TYPES.SELECT_TILE) {
    const row = Number(action.payload?.row);
    const col = Number(action.payload?.col);
    if (!Number.isInteger(row) || !Number.isInteger(col)) return;
    if (state.setupSelection.active) {
      if (state.setupSelection.currentPlayerIndex !== actorIndex) return;
      const selectedCorner = state.setupSelection.availableCorners.find((corner) => corner.row === row && corner.col === col);
      if (selectedCorner && typeof state.setupSelection.resolve === "function") state.setupSelection.resolve(selectedCorner);
    } else if (state.currentAction === "move") {
      updateMovePathSelection(row, col);
    } else if (state.currentAction === "paint") {
      updatePaintSelection(row, col);
    }
  } else if (action.type === HUB_ACTION_TYPES.CONTROL_ACTION) {
    const control = String(action.payload?.control || "");
    if (control === "confirmMove") await confirmMovePhase();
    else if (control === "resetMove") resetTurnSelection();
    else if (control === "confirmPaint") await confirmPaintPhase();
    else if (control === "cancelPaint") cancelPaintSelection();
  } else if (action.type === HUB_ACTION_TYPES.ROLL_DICE) {
    if (!state.moveDie && !state.gameOver) await rollTurnDiceAnimated();
  } else if (action.type === HUB_ACTION_TYPES.REST) {
    if (!state.moveDie && !state.gameOver && maybeShowRestButton()) restFlow();
  }
  multiplayerScheduleSnapshot(80);
}

function getRoomControlActionName(index) {
  if (state.currentAction === "move") return index === 0 ? "confirmMove" : "resetMove";
  if (state.currentAction === "paint") return index === 0 ? "confirmPaint" : "cancelPaint";
  return "";
}

function interceptGuestRoomClick(event) {
  if (!multiplayer.session.isRoomPlay || multiplayer.session.isHost || multiplayer.applyingSnapshot) return;
  const target = event.target;
  if (!target) return;
  const modalButton = target.closest?.("#modalRoot button");
  if (modalButton) {
    const selector = getHubElementSelector(modalButton);
    if (
      modalButton.matches("#stopDiceRollButton")
      && performance.now() - (state.diceAnimation.lastRemoteStopSentAt || 0) < 500
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (modalButton.matches("[data-order-stop]") && Number(modalButton.dataset.orderStop) !== getLocalPlayerSlot()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (
      modalButton.matches("[data-order-stop]")
      && performance.now() - (state.orderAnimation.lastRemoteStopSentAt || 0) < 500
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (selector) {
      event.preventDefault();
      event.stopPropagation();
      sendHubAction(HUB_ACTION_TYPES.MODAL_CLICK, { selector });
    }
    return;
  }
  if (!isLocalRoomPlayerTurn()) return;
  const actionButton = target.closest?.("[data-action-index]");
  if (actionButton) {
    const control = getRoomControlActionName(Number(actionButton.dataset.actionIndex));
    if (control) {
      event.preventDefault();
      event.stopPropagation();
      sendHubAction(HUB_ACTION_TYPES.CONTROL_ACTION, { control });
    }
    return;
  }
  if (target.closest?.("#confirmRollDiceButton")) {
    event.preventDefault();
    event.stopPropagation();
    sendHubAction(HUB_ACTION_TYPES.ROLL_DICE);
    return;
  }
  if (target.closest?.("#confirmRestButton")) {
    event.preventDefault();
    event.stopPropagation();
    sendHubAction(HUB_ACTION_TYPES.REST);
  }
}

function interceptGuestRoomPointerDown(event) {
  if (!multiplayer.session.isRoomPlay || multiplayer.session.isHost || multiplayer.applyingSnapshot) return;
  const modalButton = event.target?.closest?.("#modalRoot button[data-order-stop], #modalRoot #stopDiceRollButton");
  if (!modalButton) return;
  event.preventDefault();
  event.stopPropagation();
  if (modalButton.matches("#stopDiceRollButton")) {
    const selector = getHubElementSelector(modalButton);
    if (!selector) return;
    state.diceAnimation.lastRemoteStopSentAt = performance.now();
    sendHubAction(HUB_ACTION_TYPES.MODAL_CLICK, { selector });
    return;
  }
  if (Number(modalButton.dataset.orderStop) !== getLocalPlayerSlot()) return;
  const selector = getHubElementSelector(modalButton);
  if (!selector) return;
  state.orderAnimation.lastRemoteStopSentAt = performance.now();
  sendHubAction(HUB_ACTION_TYPES.MODAL_CLICK, { selector });
}

function connectHubRoom() {
  if (!multiplayer.session.isRoomPlay) {
    if (multiplayer.session.fromHub) updateMultiplayerStatus("Hub local play");
    return;
  }
  updateMultiplayerStatus();
  if (!multiplayer.session.valid) {
    updateMultiplayerStatus("Room play unavailable: missing room or WebSocket URL");
    return;
  }
  const socket = new WebSocket(multiplayer.session.wsUrl);
  multiplayer.socket = socket;

  socket.addEventListener("open", () => {
    multiplayer.connected = true;
    hubSend(HUB_ROOM_EVENTS.JOIN_ROOM, {
      roomCode: multiplayer.session.roomCode,
      mode: multiplayer.session.mode,
      gameId: HUB_GAME_ID,
      player: {
        id: multiplayer.session.playerId,
        name: multiplayer.session.playerName
      }
    });
    hubSend(HUB_ROOM_EVENTS.PLAYER_READY, {
      roomCode: multiplayer.session.roomCode,
      playerId: multiplayer.session.playerId,
      ready: true
    });
    multiplayer.heartbeatTimer = window.setInterval(() => {
      hubSend(HUB_ROOM_EVENTS.HEARTBEAT, {
        roomCode: multiplayer.session.roomCode,
        playerId: multiplayer.session.playerId,
        at: Date.now()
      });
    }, 15000);
    updateMultiplayerStatus();
  });

  socket.addEventListener("message", (event) => {
    let message = null;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    const { type, payload } = message || {};
    if (type === HUB_SERVER_EVENTS.ROOM_JOINED || type === HUB_SERVER_EVENTS.ROOM_STATE || type === HUB_SERVER_EVENTS.SYNC_STATE) {
      multiplayer.room = payload?.room || multiplayer.room;
      updateRoomPlayerSlots(multiplayer.room);
      if (state.phase === "setup") configureHubSetupPlayersFromRoom(multiplayer.room);
      if (type === HUB_SERVER_EVENTS.SYNC_STATE && payload?.lastAction) {
        void handleRemoteHubAction(payload.lastAction, payload.lastAction.actorId);
      }
      if (multiplayer.session.isGuest) sendHubAction(HUB_ACTION_TYPES.REQUEST_SNAPSHOT);
      updateMultiplayerStatus();
    } else if (type === HUB_SERVER_EVENTS.PLAYER_JOINED) {
      if (payload?.player && multiplayer.room?.players && !multiplayer.room.players.some((player) => player.id === payload.player.id)) {
        multiplayer.room.players.push(payload.player);
      }
      configureHubSetupPlayersFromRoom(multiplayer.room);
      if (multiplayer.session.isHost) multiplayerScheduleSnapshot(50);
    } else if (type === HUB_SERVER_EVENTS.GAME_ACTION) {
      void handleRemoteHubAction(payload?.action, payload?.fromPlayerId);
    } else if (type === HUB_SERVER_EVENTS.ERROR) {
      multiplayer.lastError = payload?.message || "Room server error.";
      updateMultiplayerStatus(multiplayer.lastError);
    } else if (type === HUB_SERVER_EVENTS.ROOM_CLOSED) {
      updateMultiplayerStatus(payload?.message || "Room closed");
    }
  });

  socket.addEventListener("close", () => {
    multiplayer.connected = false;
    if (multiplayer.heartbeatTimer) {
      window.clearInterval(multiplayer.heartbeatTimer);
      multiplayer.heartbeatTimer = null;
    }
    updateMultiplayerStatus("Room connection closed");
  });

  socket.addEventListener("error", () => {
    updateMultiplayerStatus("WebSocket connection failed");
  });
}

function getMapDefinition(mapId) {
  return MAP_LIBRARY[mapId] || MAP_LIBRARY.simpleArena;
}

function getSelectedMapDefinition() {
  return getMapDefinition(state.selectedMapId);
}

function isRoyalMarchMap(mapDefinition = getSelectedMapDefinition()) {
  return !!mapDefinition?.royalMarch;
}

function isRoyalMarchMapActive() {
  return isRoyalMarchMap(getSelectedMapDefinition());
}

function isCaptureTerritoryMapActive() {
  return getSelectedMapDefinition()?.id === "captureTerritory";
}

function isCentralDominionMapActive() {
  return getSelectedMapDefinition()?.id === "centralDominion";
}

function isFoodCourtMap(mapDefinition = getSelectedMapDefinition()) {
  return !!mapDefinition?.foodCourt;
}

function isFoodCourtMapActive() {
  return isFoodCourtMap(getSelectedMapDefinition());
}

function getFoodCourtFoodDefinition(foodType) {
  return FOOD_COURT_FOOD_TYPES[foodType] || null;
}

function createFoodCourtFood(foodType) {
  const definition = getFoodCourtFoodDefinition(foodType);
  return definition ? { id: definition.id, label: definition.label, icon: definition.icon } : null;
}

function getFoodCourtFoodIcon(foodType, fallback = "—") {
  return getFoodCourtFoodDefinition(foodType)?.icon || fallback;
}

function getFoodCourtTableDefinition(tableId) {
  return FOOD_COURT_TABLES.find((table) => table.id === tableId) || null;
}

function getFoodCourtTableAt(row, col) {
  if (!isFoodCourtMapActive()) return null;
  return FOOD_COURT_TABLES.find((table) => table.row === row && table.col === col) || null;
}

function getFoodCourtShopAt(row, col) {
  if (!isFoodCourtMapActive()) return null;
  return Object.values(FOOD_COURT_SHOPS).find((shop) => shop.row === row && shop.col === col) || null;
}

function isFoodCourtGeneralStoreShop(shop) {
  return !!shop && shop.specialType === "general-store" && !shop.foodType;
}

function isFoodCourtHungryTile(row, col) {
  if (!isFoodCourtMapActive()) return false;
  return row === FOOD_COURT_HUNGRY_TILE.row && col === FOOD_COURT_HUNGRY_TILE.col;
}

function isFoodCourtTableBlockedCell(cellOrRow, maybeCol = null) {
  if (!isFoodCourtMapActive()) return false;
  const row = typeof cellOrRow === "object" && cellOrRow ? cellOrRow.row : cellOrRow;
  const col = typeof cellOrRow === "object" && cellOrRow ? cellOrRow.col : maybeCol;
  return !!getFoodCourtTableAt(row, col);
}

function canPlayerEnterMapCell(player, cell) {
  if (!cell) return false;
  if (isFoodCourtTableBlockedCell(cell)) return false;
  return canMoppetEnterCell(player, cell);
}

function getFoodCourtTeamState(teamKey) {
  if (!state.foodCourt?.teams) return null;
  return state.foodCourt.teams[normalizeTeamKey(teamKey)] || null;
}

function getFoodCourtDeliveredCount(teamKey) {
  const teamState = getFoodCourtTeamState(teamKey);
  if (!teamState) return 0;
  return FOOD_COURT_FOOD_ORDER.reduce((sum, foodType) => sum + (teamState.deliveredFoods?.[foodType] ? 1 : 0), 0);
}

function getFoodCourtFoodBonus(teamKey) {
  if (!isFoodCourtMapActive()) return 0;
  const deliveredCount = getFoodCourtDeliveredCount(teamKey);
  return deliveredCount * 5 + (deliveredCount >= FOOD_COURT_FOOD_ORDER.length ? 15 : 0);
}

function hasFoodCourtTeamCompleted(teamKey) {
  return getFoodCourtDeliveredCount(teamKey) >= FOOD_COURT_FOOD_ORDER.length;
}

function buildFoodCourtProgressHtml(teamKey, { compact = false } = {}) {
  const teamState = getFoodCourtTeamState(teamKey);
  return `<span class="foodCourtProgress ${compact ? "is-compact" : ""}">${FOOD_COURT_FOOD_ORDER.map((foodType) => {
    const delivered = !!teamState?.deliveredFoods?.[foodType];
    return `<span class="foodCourtProgressFood ${delivered ? "is-delivered" : "is-missing"}" aria-label="${sanitize(getFoodCourtFoodDefinition(foodType)?.label || foodType)}">${delivered ? sanitize(getFoodCourtFoodIcon(foodType)) : "—"}</span>`;
  }).join("")}</span>`;
}

function getFoodCourtDeliveredFoodsForTable(table) {
  if (!table) return [];
  const teamKey = getFoodCourtTableTeamKey(table.id);
  const teamState = teamKey ? getFoodCourtTeamState(teamKey) : null;
  if (!teamState) return [];
  return FOOD_COURT_FOOD_ORDER
    .filter((foodType) => !!teamState.deliveredFoods?.[foodType])
    .map((foodType) => getFoodCourtFoodDefinition(foodType))
    .filter(Boolean);
}

function getFoodCourtShopStatus(shopId) {
  const cooldown = Math.max(0, Number(state.foodCourt?.shops?.[shopId]?.cooldown) || 0);
  return cooldown > 0 ? { preparing: true, label: "Preparing" } : { preparing: false, label: "Available" };
}

function prepareFoodCourtGeneralStoreItem(shopId) {
  const shopState = state.foodCourt?.shops?.[shopId];
  if (!shopState) return "forceShard";
  if (!state.foodCourt?.flagAppeared && Math.random() < 0.1) {
    state.foodCourt.flagAppeared = true;
    state.foodCourt.flagShopId = shopId;
    shopState.itemId = "flag";
  } else {
    shopState.itemId = "forceShard";
  }
  return shopState.itemId;
}

function ensureFoodCourtGeneralStoreItem(shopId) {
  const shopState = state.foodCourt?.shops?.[shopId];
  if (!shopState) return "forceShard";
  if (Math.max(0, Number(shopState.cooldown) || 0) > 0) return null;
  if (shopState.itemId !== "flag" && shopState.itemId !== "forceShard") {
    return prepareFoodCourtGeneralStoreItem(shopId);
  }
  if (shopState.itemId === "flag" && state.foodCourt?.flagShopId !== shopId) {
    shopState.itemId = "forceShard";
  }
  return shopState.itemId;
}

function getFoodCourtReadyShopGroundItem(shop) {
  if (!isFoodCourtMapActive() || !state.foodCourt || !shop || getFoodCourtShopStatus(shop.id).preparing) return null;
  if (shop.foodType) {
    const food = getFoodCourtFoodDefinition(shop.foodType);
    return food ? { id: `foodCourtFood-${food.id}`, name: food.label, icon: food.icon } : null;
  }
  if (!isFoodCourtGeneralStoreShop(shop)) return null;
  return ensureFoodCourtGeneralStoreItem(shop.id) === "flag"
    ? { id: "flag", name: itemDefinitions.flag.shortName, icon: itemDefinitions.flag.icon }
    : cloneItemForInventory("forceShard");
}


function getFoodCourtSpecialTypeForCell(cell) {
  if (!isFoodCourtMapActive() || !cell) return null;
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (shop) return shop.specialType;
  if (isFoodCourtHungryTile(cell.row, cell.col)) return "hungry";
  if (getFoodCourtTableAt(cell.row, cell.col)) return "table";
  return null;
}

function getFoodCourtSetupSpecialIcon(type) {
  if (type === "food-sushi") return "🍣";
  if (type === "food-burger") return "🍔";
  if (type === "food-dumpling") return "🥟";
  if (type === "general-store") return "🪨";
  if (type === "hungry") return "😋";
  if (type === "table") return "▣";
  return "";
}

function buildFoodCourtTableBadgeHtml(table) {
  if (!table) return "";
  const teamKey = getFoodCourtTableTeamKey(table.id);
  const isAssigned = !!teamKey;
  const label = isAssigned ? getTeamDisplayLabel(teamKey) : "Unused";
  return `
    <span class="foodCourtTableBadge ${isAssigned ? "is-assigned" : "is-unused"}">
      <span class="foodCourtTableTopIcon">🍽️</span>
      <span class="foodCourtTableTeam">${sanitize(label)}</span>
      ${isAssigned ? buildFoodCourtProgressHtml(teamKey, { compact: true }) : `<span class="foodCourtProgress is-compact"><span class="foodCourtProgressFood is-missing">—</span><span class="foodCourtProgressFood is-missing">—</span><span class="foodCourtProgressFood is-missing">—</span></span>`}
    </span>
  `;
}

function buildFoodCourtShopBadgeHtml(shop) {
  if (!shop) return "";
  const status = getFoodCourtShopStatus(shop.id);
  if (shop.foodType) {
    const food = getFoodCourtFoodDefinition(shop.foodType);
    return `
      <span class="foodCourtShopBadge ${status.preparing ? "is-preparing" : "is-available"}">
        <span class="foodCourtShopIcon">${sanitize(food?.icon || "🍽️")}</span>
        <span class="foodCourtShopStatus">${sanitize(status.label)}</span>
      </span>
    `;
  }
  return `
    <span class="foodCourtShopBadge foodCourtGeneralStoreBadge ${status.preparing ? "is-preparing" : "is-available"}">
      <span class="foodCourtShopIcon">🪨</span>
      <span class="foodCourtShopStatus">${sanitize(status.label)}</span>
    </span>
  `;
}

function buildFoodCourtTileContentHtml(cell) {
  if (!isFoodCourtMapActive() || !cell) return "";
  const table = getFoodCourtTableAt(cell.row, cell.col);
  if (table) return buildFoodCourtTableBadgeHtml(table);
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (shop) return buildFoodCourtShopBadgeHtml(shop);
  if (isFoodCourtHungryTile(cell.row, cell.col)) {
    return `<span class="foodCourtHungryBadge"><span class="foodCourtHungryIcon">😋</span><span class="foodCourtHungryText">Discard</span></span>`;
  }
  return "";
}

function createFoodCourtServedFoodElement(table) {
  const deliveredFoods = getFoodCourtDeliveredFoodsForTable(table);
  if (!deliveredFoods.length) return null;
  const element = document.createElement("span");
  element.className = `foodCourtServedFoodBillboard food-count-${deliveredFoods.length}`;
  element.setAttribute("aria-label", `Served food: ${deliveredFoods.map((food) => food.label).join(", ")}`);
  element.innerHTML = deliveredFoods.map((food, index) => `
    <span class="foodCourtServedFoodIcon food-index-${index}" style="--served-food-index:${index}; --served-food-count:${deliveredFoods.length};">
      ${sanitize(food.icon)}
    </span>
  `).join("");
  return element;
}

function applyFoodCourtTileClasses(tile, cell) {
  if (!tile || !cell) return;
  tile.classList.remove(
    "food-court-tile",
    "foodCourtTableTile",
    "foodCourtShopTile",
    "foodCourtHungryTile",
    "foodCourtPreparingTile",
    "foodCourtAssignedTable",
    "foodCourtUnusedTable"
  );
  tile.style.removeProperty("--food-court-team-accent");
  if (!isFoodCourtMapActive()) return;
  tile.classList.add("food-court-tile");
  const table = getFoodCourtTableAt(cell.row, cell.col);
  if (table) {
    tile.classList.add("foodCourtTableTile");
    const teamKey = getFoodCourtTableTeamKey(table.id);
    if (teamKey) {
      tile.classList.add("foodCourtAssignedTable");
      tile.style.setProperty("--food-court-team-accent", getTeamColorInfo(teamKey).accent);
    } else {
      tile.classList.add("foodCourtUnusedTable");
    }
  }
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (shop) {
    tile.classList.add("foodCourtShopTile");
    if (getFoodCourtShopStatus(shop.id).preparing) tile.classList.add("foodCourtPreparingTile");
  }
  if (isFoodCourtHungryTile(cell.row, cell.col)) tile.classList.add("foodCourtHungryTile");
}

function buildFoodCourtAvatarFoodBadgeHtml(player) {
  if (!isFoodCourtMapActive() || !player) return "";
  const food = player.foodSlot;
  if (!food) return "";
  const label = food ? `${food.label}` : "No food";
  return `<div class="avatarFoodBadge ${food ? "has-food" : "is-empty"}" aria-label="${sanitize(label)}">${sanitize(food?.icon || "💬")}</div>`;
}

function isCellOwnedByPlayerTeam(cell, playerIndex) {
  if (!cell || playerIndex === null || playerIndex === undefined) return false;
  return cell.owner !== null && isFriendlyOwner(cell.owner, playerIndex);
}

function getCurrentMapTerritories() {
  return Array.isArray(getSelectedMapDefinition()?.territories) ? getSelectedMapDefinition().territories : [];
}

function getCaptureTerritoryScoreKeyForPlayerIndex(playerIndex) {
  return isTeamModeEnabled() ? getPlayerTeamKey(playerIndex) : `player:${playerIndex}`;
}

function getCaptureTerritoryPointsForKey(scoreKey) {
  return Math.max(0, Number(state.territoryPointsByKey?.[scoreKey]) || 0);
}

function getCaptureTerritoryPointsForPlayer(playerIndex) {
  return getCaptureTerritoryPointsForKey(`player:${playerIndex}`);
}

function getCaptureTerritoryPointsForTeam(teamKey) {
  const normalized = normalizeTeamKey(teamKey);
  const memberPoints = state.players.reduce((sum, player, index) => {
    return normalizeTeamKey(player?.teamKey, index) === normalized
      ? sum + getCaptureTerritoryPointsForPlayer(index)
      : sum;
  }, 0);
  return memberPoints + getCaptureTerritoryPointsForKey(normalized);
}

function getCaptureTerritoryDisplayLabel(scoreKey) {
  if (!scoreKey) return "Unknown";
  if (TEAM_COLOR_INFO[scoreKey]) return getTeamDisplayLabel(scoreKey);
  if (String(scoreKey).startsWith("player:")) {
    const playerIndex = Number(String(scoreKey).split(":")[1]);
    return state.players?.[playerIndex]?.name || `Player ${playerIndex + 1}`;
  }
  return String(scoreKey);
}

function extractSolidColorFromGradient(gradientValue, fallback = '#7edc75') {
  if (typeof gradientValue !== 'string' || !gradientValue.trim()) return fallback;
  const match = gradientValue.match(/rgba?\([^\)]+\)|#[0-9a-fA-F]{3,8}/);
  return match ? match[0] : fallback;
}

function getCaptureTerritoryAccent(scoreKey) {
  if (!scoreKey) return '#7edc75';
  if (TEAM_COLOR_INFO[scoreKey]) {
    const solidGradient = (TEAM_TILE_GRADIENTS[scoreKey] || TEAM_TILE_GRADIENTS.red)?.solid;
    return extractSolidColorFromGradient(solidGradient, getTeamColorInfo(scoreKey).accent);
  }
  if (String(scoreKey).startsWith('player:')) {
    const playerIndex = Number(String(scoreKey).split(':')[1]);
    return extractSolidColorFromGradient(getTileGradientForPlayer(playerIndex, 'solid'), getPlayerAccentColor(playerIndex));
  }
  return '#7edc75';
}

function getNeutralTerritoryAccent() {
  return 'rgba(255, 255, 255, 0.96)';
}

function getContestedTerritoryAccent() {
  return 'rgba(164, 172, 186, 0.96)';
}

function getTerritoryVisualAccent(summary) {
  if (summary?.contested) return getContestedTerritoryAccent();
  if (summary?.soleOccupantKey) return getCaptureTerritoryAccent(summary.soleOccupantKey);
  return getNeutralTerritoryAccent();
}

function awardCaptureTerritoryPoints(scoreKey, amount) {
  if (!scoreKey || !Number.isFinite(amount) || amount <= 0) return 0;
  state.territoryPointsByKey[scoreKey] = getCaptureTerritoryPointsForKey(scoreKey) + amount;
  return amount;
}

function getCaptureTerritoryAwardKey(scoreKey) {
  if (!scoreKey) return null;
  if (String(scoreKey).startsWith("player:")) return scoreKey;
  const playerIndex = state.players.findIndex((player, index) => normalizeTeamKey(player?.teamKey, index) === scoreKey);
  return playerIndex >= 0 ? `player:${playerIndex}` : scoreKey;
}

function initializeCaptureTerritoryState() {
  state.territoryPointsByKey = {};
  const territories = {};
  getCurrentMapTerritories().forEach((territory) => {
    territories[territory.id] = {
      id: territory.id,
      everControlled: false
    };
  });
  state.territoryStatusById = territories;
}

function getTerritoryStatusById(territoryId) {
  return state.territoryStatusById?.[territoryId] || null;
}

function getTerritoryCells(territory) {
  if (!territory) return [];
  const cells = [];
  for (let row = territory.rowStart; row <= territory.rowEnd; row += 1) {
    for (let col = territory.colStart; col <= territory.colEnd; col += 1) {
      const cell = getCell(row, col);
      if (cell?.playable) cells.push(cell);
    }
  }
  return cells;
}

function getTerritoryBounds(territory) {
  if (!territory) return null;
  return {
    rowStart: territory.rowStart,
    rowEnd: territory.rowEnd,
    colStart: territory.colStart,
    colEnd: territory.colEnd,
    rows: territory.rowEnd - territory.rowStart + 1,
    cols: territory.colEnd - territory.colStart + 1,
    centerRow: Math.floor((territory.rowStart + territory.rowEnd) / 2),
    centerCol: Math.floor((territory.colStart + territory.colEnd) / 2)
  };
}

function getPlayersInsideTerritory(territory) {
  const cells = new Set(getTerritoryCells(territory).map((cell) => `${cell.row},${cell.col}`));
  return state.players.filter((player) => player?.position && cells.has(`${player.position.row},${player.position.col}`));
}

function getTerritoryOccupantKeys(territory) {
  return Array.from(new Set(getPlayersInsideTerritory(territory).map((player) => getCaptureTerritoryScoreKeyForPlayerIndex(state.players.indexOf(player)))));
}

function getTerritoryPaintedOwnerCounts(territory) {
  const counts = new Map();
  getTerritoryCells(territory).forEach((cell) => {
    if (cell.owner === null || cell.owner === undefined) return;
    const ownerKey = getCaptureTerritoryScoreKeyForPlayerIndex(cell.owner);
    counts.set(ownerKey, (counts.get(ownerKey) || 0) + 1);
  });
  return counts;
}

function getTerritoryStateSummary(territory) {
  const status = getTerritoryStatusById(territory?.id);
  const paintedOwnerCounts = getTerritoryPaintedOwnerCounts(territory);
  const paintedOwnerKeys = Array.from(paintedOwnerCounts.keys());
  const occupantKeys = getTerritoryOccupantKeys(territory);
  const presentKeys = Array.from(new Set([...paintedOwnerKeys, ...occupantKeys]));
  const soleOccupantKey = paintedOwnerKeys.length === 1 && presentKeys.length === 1 ? paintedOwnerKeys[0] : null;
  const controlledPaintCount = soleOccupantKey ? (paintedOwnerCounts.get(soleOccupantKey) || 0) : 0;
  const territoryBonusPoints = controlledPaintCount > 0 ? 3 + Math.max(0, controlledPaintCount - 1) : 0;
  const contested = presentKeys.length > 1 || paintedOwnerKeys.length > 1;
  if (soleOccupantKey && status) status.everControlled = true;
  const everControlled = !!status?.everControlled || !!soleOccupantKey;
  return {
    status,
    everControlled,
    isNeverControlled: !everControlled && !soleOccupantKey,
    paintedOwnerKeys,
    paintedOwnerCounts,
    occupantKeys,
    presentKeys,
    controlledPaintCount,
    territoryBonusPoints,
    contested,
    soleOccupantKey,
    scoringKey: contested ? null : soleOccupantKey,
    hasScoringOccupant: !!soleOccupantKey && !contested
  };
}

function getPrimaryTerritoryForCell(cell) {
  if (!cell || !Array.isArray(cell.territoryIds) || !cell.territoryIds.length) return null;
  const territoryId = cell.territoryIds[0];
  return getCurrentMapTerritories().find((territory) => territory.id === territoryId) || null;
}

function renderTerritoryStatusBadgeHtml(territory) {
  if (!territory) return '';
  const summary = getTerritoryStateSummary(territory);
  const { contested, soleOccupantKey, territoryBonusPoints } = summary;
  const accent = getTerritoryVisualAccent(summary);
  const label = territory.label || 'Territory';
  const shortLabel = label.startsWith('North') ? 'N' : label.startsWith('South') ? 'S' : label.startsWith('Center') ? 'C' : 'T';
  const stateShort = contested ? '⚔' : soleOccupantKey ? `+${territoryBonusPoints}` : '⚑';
  const ownerLabel = contested
    ? `${label} is blocked by mixed painted colors or enemy presence`
    : soleOccupantKey
      ? `${getCaptureTerritoryDisplayLabel(soleOccupantKey)} scores ${territoryBonusPoints} points in ${label} this round`
      : `${label} is uncontrolled`;
  return `<span class="territoryStatusBadge ${contested ? 'is-contested' : soleOccupantKey ? 'is-owned' : 'is-neutral'}" style="--territory-accent:${sanitize(accent)};" aria-label="${sanitize(ownerLabel)}" title="${sanitize(ownerLabel)}"><span class="territoryStatusBadgeLabel">${sanitize(shortLabel)}</span><span class="territoryStatusBadgeValue">${sanitize(stateShort)}</span></span>`;
}

function isTerritoryCenterCell(cell, territory) {
  if (!cell || !territory) return false;
  const bounds = getTerritoryBounds(territory);
  return cell.row === bounds.centerRow && cell.col === bounds.centerCol;
}

function isScoringFieldCell(cell) {
  if (!cell?.playable) return false;
  if (isFoodCourtMapActive() && getFoodCourtTableAt(cell.row, cell.col)) return false;
  if (!isCaptureTerritoryMapActive()) return true;
  if (cell.startOwner !== null) return false;
  return true;
}

function getTerritoryPointBreakdownLabel() {
  return isCaptureTerritoryMapActive() ? 'Control' : 'Flag';
}

function isPlayableMapCell(mapDefinition, row, col) {
  if (!mapDefinition) return false;
  if (row < 0 || col < 0 || row >= (mapDefinition.rows || 0) || col >= (mapDefinition.cols || 0)) return false;
  if (typeof mapDefinition.hasCell === "function") return !!mapDefinition.hasCell(row, col);
  return true;
}

function getBoardRows() {
  return Array.isArray(state.board) ? state.board.length : 0;
}

function getBoardCols() {
  return getBoardRows() > 0 && Array.isArray(state.board[0]) ? state.board[0].length : 0;
}

function getCurrentMapMaxRounds() {
  return Math.max(1, Number(getSelectedMapDefinition()?.maxRounds) || SIMPLE_ARENA_MAX_ROUNDS);
}

function getCurrentMapFlagBonus() {
  return Math.max(0, Number(getSelectedMapDefinition()?.flagBonus) || 0);
}

function getCurrentEnemyTileEndDamage() {
  return Math.max(0, Number(getSelectedMapDefinition()?.enemyTileEndDamage) || ENEMY_TILE_END_DAMAGE);
}

function doesCurrentMapEndWhenBoardOwned() {
  return !!getSelectedMapDefinition()?.endWhenBoardFull;
}

function doesCurrentMapUseFlagDeliveryWin() {
  return !!getSelectedMapDefinition()?.flagDeliveryEndsGame;
}

function getCurrentMapControlArea() {
  return getSelectedMapDefinition()?.controlArea || null;
}

function doesCurrentMapUseControlAreaWin() {
  return !!getCurrentMapControlArea();
}

function getPlayableBoardCells() {
  return (state.board || []).flat().filter((cell) => !!cell && cell.playable !== false);
}

const TEAM_COLOR_CYCLE = ["red", "blue", "yellow", "green", "pink", "purple", "brown", "cyan"];
const TEAM_COLOR_INFO = {
  red: { label: "Red Team", accent: "#ef6b6b" },
  blue: { label: "Blue Team", accent: "#6bb8ff" },
  yellow: { label: "Yellow Team", accent: "#ffd85e" },
  green: { label: "Green Team", accent: "#63d498" },
  pink: { label: "Pink Team", accent: "#ff8fcb" },
  purple: { label: "Purple Team", accent: "#b686ff" },
  brown: { label: "Brown Team", accent: "#8b5a2b" },
  cyan: { label: "Cyan Team", accent: "#00e5ff" }
};

function isTeamModeEnabled() {
  return (state.setupFlow?.matchMode || state.matchMode || "ffa") === "team";
}

function getTeamColorInfo(teamKey) {
  return TEAM_COLOR_INFO[teamKey] || TEAM_COLOR_INFO.red;
}

function normalizeTeamKey(teamKey, fallbackIndex = 0) {
  if (TEAM_COLOR_INFO[teamKey]) return teamKey;
  return TEAM_COLOR_CYCLE[((fallbackIndex % TEAM_COLOR_CYCLE.length) + TEAM_COLOR_CYCLE.length) % TEAM_COLOR_CYCLE.length];
}

function cycleTeamKey(teamKey) {
  const currentIndex = TEAM_COLOR_CYCLE.indexOf(normalizeTeamKey(teamKey));
  return TEAM_COLOR_CYCLE[(currentIndex + 1) % TEAM_COLOR_CYCLE.length];
}

function getAvailableSetupTeamKeys() {
  if (isRoyalMarchMap()) return ["red", "blue"];
  if (isFoodCourtMap()) return TEAM_COLOR_CYCLE.slice(0, 4);
  return [...TEAM_COLOR_CYCLE];
}

function getTeamDisplayLabel(teamKey) {
  return getTeamColorInfo(teamKey).label;
}

function arePlayersAllied(playerA, playerB) {
  return !!(isTeamModeEnabled() && playerA && playerB && playerA !== playerB && playerA.teamKey && playerB.teamKey && playerA.teamKey === playerB.teamKey);
}

function isFriendlyOwner(ownerIndex, playerIndex) {
  if (ownerIndex === null || ownerIndex === undefined || playerIndex === null || playerIndex === undefined) return false;
  if (ownerIndex === playerIndex) return true;
  const ownerPlayer = state.players?.[ownerIndex];
  const currentPlayer = state.players?.[playerIndex];
  return arePlayersAllied(ownerPlayer, currentPlayer);
}

function getHostileGranOnCell(row, col, playerIndex) {
  return (state.players || []).find((candidate, index) => (
    candidate
    && candidate.activeCharacterId === "battler1"
    && candidate.position?.row === row
    && candidate.position?.col === col
    && !isFriendlyOwner(index, playerIndex)
  )) || null;
}

function isProtectedByStoneholdPresence(cell, playerIndex) {
  if (!cell || playerIndex === null || playerIndex === undefined) return false;
  return !!getHostileGranOnCell(cell.row, cell.col, playerIndex);
}

function canPlayerRepaintCell(playerIndex, cell) {
  if (!cell) return false;
  if (isFoodCourtMapActive() && getFoodCourtTableAt(cell.row, cell.col)) return false;
  return !isProtectedByStoneholdPresence(cell, playerIndex);
}

function isUsefulComputerPaintTarget(playerIndex, cell) {
  return !!(
    cell
    && !cell.obstacle
    && canPlayerRepaintCell(playerIndex, cell)
    && !isFriendlyOwner(cell.owner, playerIndex)
  );
}

function arePointsAdjacentOrSame(pointA, pointB) {
  if (!pointA || !pointB) return false;
  return Math.abs(pointA.row - pointB.row) <= 1 && Math.abs(pointA.col - pointB.col) <= 1;
}

function applyFoodCourtSetupDefaults() {
  if (!state.setupFlow || !isFoodCourtMap()) return;
  state.setupFlow.matchMode = "team";
  const foodCourtTeamKeys = getAvailableSetupTeamKeys();
  state.setupFlow.players.forEach((setupPlayer, index) => {
    setupPlayer.teamKey = foodCourtTeamKeys.includes(setupPlayer.teamKey)
      ? setupPlayer.teamKey
      : foodCourtTeamKeys[index % foodCourtTeamKeys.length];
    syncSetupReadyForController(setupPlayer);
  });
}

function normalizeFoodCourtTeamKey(teamKey, fallbackIndex = 0) {
  const foodCourtTeamKeys = TEAM_COLOR_CYCLE.slice(0, 4);
  return foodCourtTeamKeys.includes(teamKey)
    ? teamKey
    : foodCourtTeamKeys[((fallbackIndex % foodCourtTeamKeys.length) + foodCourtTeamKeys.length) % foodCourtTeamKeys.length];
}

function getFoodCourtTeamOrderForSetupPlayers(players = state.setupFlow?.players || []) {
  const seen = new Set();
  const order = [];
  (players || []).forEach((setupPlayer, index) => {
    const teamKey = normalizeFoodCourtTeamKey(setupPlayer?.teamKey, index);
    if (!seen.has(teamKey)) {
      seen.add(teamKey);
      order.push(teamKey);
    }
  });
  return order;
}

function getFoodCourtTableRequirementSummary(players = state.setupFlow?.players || []) {
  const teamOrder = getFoodCourtTeamOrderForSetupPlayers(players);
  const counts = new Map(teamOrder.map((teamKey) => [teamKey, 0]));
  (players || []).forEach((setupPlayer, index) => {
    const teamKey = normalizeFoodCourtTeamKey(setupPlayer?.teamKey, index);
    counts.set(teamKey, (counts.get(teamKey) || 0) + 1);
  });
  const entries = teamOrder.map((teamKey) => {
    const memberCount = counts.get(teamKey) || 0;
    return {
      teamKey,
      memberCount,
      requiredTableCount: Math.ceil(memberCount / 2)
    };
  });
  const totalRequiredTables = entries.reduce((sum, entry) => sum + entry.requiredTableCount, 0);
  return { teamOrder, entries, totalRequiredTables };
}

function getFoodCourtSetupValidation(players = state.setupFlow?.players || []) {
  const { teamOrder, entries, totalRequiredTables } = getFoodCourtTableRequirementSummary(players);
  if (teamOrder.length < 2) return { ok: false, reason: "Food Court requires at least 2 teams." };
  if (teamOrder.length > 4) return { ok: false, reason: "Food Court supports at most 4 teams." };
  if (totalRequiredTables > FOOD_COURT_TABLES.length) {
    return { ok: false, reason: `Food Court has only 4 tables, but these teams need ${totalRequiredTables}.` };
  }
  if (entries.some((entry) => entry.memberCount > 4)) {
    return { ok: false, reason: "A Food Court team can have at most 4 members." };
  }
  return { ok: true, reason: "", entries, totalRequiredTables };
}


function initializeFoodCourtState() {
  if (!isFoodCourtMapActive()) {
    state.foodCourt = null;
    return;
  }
  const summary = getFoodCourtTableRequirementSummary(state.players);
  const tableAssignments = {};
  const teams = {};
  let nextTableIndex = 0;
  summary.entries.forEach((entry) => {
    const teamKey = normalizeTeamKey(entry.teamKey);
    const tableIds = [];
    for (let i = 0; i < entry.requiredTableCount; i += 1) {
      const tableId = FOOD_COURT_TABLE_ASSIGNMENT_ORDER[nextTableIndex];
      nextTableIndex += 1;
      if (!tableId) continue;
      tableIds.push(tableId);
      tableAssignments[tableId] = teamKey;
    }
    teams[teamKey] = {
      teamKey,
      tableIds,
      deliveredFoods: FOOD_COURT_FOOD_ORDER.reduce((acc, foodType) => {
        acc[foodType] = false;
        return acc;
      }, {})
    };
  });
  state.foodCourt = {
    teamOrder: summary.teamOrder.map((teamKey) => normalizeTeamKey(teamKey)),
    tableAssignments,
    teams,
    shops: {
      sushi: { cooldown: 0 },
      burger: { cooldown: 0 },
      dumpling: { cooldown: 0 },
      generalLeft: { cooldown: 0, itemId: "forceShard" },
      generalRight: { cooldown: 0, itemId: "forceShard" }
    },
    flagAppeared: false,
    flagShopId: null
  };
}

function setupFoodCourtInitialBases() {
  if (!isFoodCourtMapActive() || !state.foodCourt) return false;
  const assignedSeatKeys = new Set();
  state.foodCourt.teamOrder.forEach((teamKey) => {
    const teamState = getFoodCourtTeamState(teamKey);
    const teamPlayers = state.players
      .map((player, index) => ({ player, index }))
      .filter(({ player, index }) => normalizeTeamKey(player.teamKey, index) === teamKey);
    const seats = (teamState?.tableIds || []).flatMap((tableId) => {
      const table = getFoodCourtTableDefinition(tableId);
      return (table?.starts || []).map((seat, seatIndex) => ({
        ...seat,
        key: `${tableId}-seat-${seatIndex}`,
        tableId,
        tableLabel: table?.label || tableId
      }));
    });
    teamPlayers.forEach(({ player, index }, memberIndex) => {
      const seat = seats[memberIndex];
      if (!seat) return;
      assignedSeatKeys.add(seat.key);
      player.position = { row: seat.row, col: seat.col };
      player.startPosition = { row: seat.row, col: seat.col };
      player.startCornerKey = seat.key;
      const cell = getCell(seat.row, seat.col);
      if (cell) {
        cell.owner = index;
        cell.startOwner = index;
      }
      log(`${player.name}'s Food Court seat is beside the ${seat.tableLabel}.`, true);
    });
  });
  Object.entries(state.foodCourt.tableAssignments || {}).forEach(([tableId, teamKey]) => {
    const table = getFoodCourtTableDefinition(tableId);
    if (!table) return;
    log(`${getTeamDisplayLabel(teamKey)} owns the ${table.label}.`, true);
  });
  state.setupSelection.active = false;
  state.setupSelection.availableCorners = [];
  state.setupSelection.currentPlayerIndex = null;
  state.setupSelection.computerChoiceMode = null;
  state.setupSelection.resolve = null;
  return assignedSeatKeys.size > 0;
}

function getFoodCourtTableTeamKey(tableId) {
  const assigned = state.foodCourt?.tableAssignments?.[tableId];
  return assigned ? normalizeTeamKey(assigned) : null;
}

function getFoodCourtAdjacentOwnTable(player) {
  if (!isFoodCourtMapActive() || !player?.position) return null;
  const playerTeamKey = normalizeTeamKey(player.teamKey, state.players.indexOf(player));
  return FOOD_COURT_TABLES.find((table) => {
    if (getFoodCourtTableTeamKey(table.id) !== playerTeamKey) return false;
    return (table.starts || []).some((seat) => seat.row === player.position.row && seat.col === player.position.col);
  }) || null;
}

function isFoodCourtFoodDeliveredForTeam(teamKey, foodType) {
  return !!getFoodCourtTeamState(teamKey)?.deliveredFoods?.[foodType];
}

function getFoodCourtHeldFoodType(player) {
  return player?.foodSlot?.id || null;
}

function playerHasFoodCourtFood(player) {
  return !!(isFoodCourtMapActive() && player?.foodSlot);
}

function setFoodCourtShopCooldown(shopId, cooldown = 1) {
  if (!state.foodCourt?.shops?.[shopId]) return;
  const nextCooldown = Math.max(0, Number(cooldown) || 0);
  const shop = Object.values(FOOD_COURT_SHOPS).find((entry) => entry.id === shopId);
  state.foodCourt.shops[shopId].cooldown = nextCooldown;
  state.foodCourt.shops[shopId].cooldownSetRound = Number(state.round) || 1;
  if (nextCooldown > 0 && isFoodCourtGeneralStoreShop(shop)) {
    state.foodCourt.shops[shopId].itemId = null;
  }
}

function decrementFoodCourtPreparationCooldowns() {
  if (!isFoodCourtMapActive() || !state.foodCourt?.shops) return;
  Object.entries(state.foodCourt.shops).forEach(([shopId, shopState]) => {
    const previousCooldown = Math.max(0, Number(shopState.cooldown) || 0);
    if (previousCooldown > 0 && Number(shopState.cooldownSetRound) === Number(state.round) - 1) return;
    shopState.cooldown = Math.max(0, previousCooldown - 1);
    const shop = Object.values(FOOD_COURT_SHOPS).find((entry) => entry.id === shopId);
    if (previousCooldown > 0 && shopState.cooldown === 0 && isFoodCourtGeneralStoreShop(shop)) {
      prepareFoodCourtGeneralStoreItem(shopId);
    }
  });
}

function shouldComputerTakeFood(player, incomingFoodType) {
  if (!player || !incomingFoodType) return false;
  const teamKey = normalizeTeamKey(player.teamKey, state.players.indexOf(player));
  if (isFoodCourtFoodDeliveredForTeam(teamKey, incomingFoodType)) return false;
  const currentFoodType = getFoodCourtHeldFoodType(player);
  if (!currentFoodType) {
    const missingFoods = getFoodCourtMissingFoods(teamKey);
    const alliedCarrier = getFoodCourtTeamMembers(teamKey).some(({ member }) => {
      return member && member.id !== player.id && getFoodCourtHeldFoodType(member) === incomingFoodType;
    });
    if (alliedCarrier && missingFoods.length > 1) return false;
    return true;
  }
  if (isFoodCourtFoodDeliveredForTeam(teamKey, currentFoodType)) return true;
  return false;
}

function shouldComputerDiscardFood(player) {
  if (!player?.foodSlot) return false;
  const teamKey = normalizeTeamKey(player.teamKey, state.players.indexOf(player));
  return isFoodCourtFoodDeliveredForTeam(teamKey, player.foodSlot.id);
}

async function askFoodCourtDecision(player, title, body, yesLabel, noLabel = "Skip") {
  if (isComputerPlayer(player)) return false;
  return new Promise((resolve) => {
    showSimpleModal({
      title,
      body,
      buttons: [
        { label: noLabel, style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: yesLabel, style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

async function maybeDeliverFoodCourtFood(player) {
  if (!isFoodCourtMapActive() || !player?.foodSlot) return false;
  const table = getFoodCourtAdjacentOwnTable(player);
  if (!table) return false;
  const teamKey = normalizeTeamKey(player.teamKey, state.players.indexOf(player));
  const teamState = getFoodCourtTeamState(teamKey);
  const foodType = player.foodSlot.id;
  const foodIcon = getFoodCourtFoodIcon(foodType);
  if (!teamState) return false;
  if (teamState.deliveredFoods?.[foodType]) {
    log(`${player.name} could not serve ${foodIcon} because ${getTeamDisplayLabel(teamKey)} has already delivered it.`, true);
    return false;
  }
  if (shouldComputerDelayFoodCourtCompletion(player, teamKey, foodType)) return false;
  teamState.deliveredFoods[foodType] = true;
  player.foodSlot = null;
  log(`${player.name} delivered ${foodIcon} for ${getTeamDisplayLabel(teamKey)}.`, true);
  renderAll();
  if (hasFoodCourtTeamCompleted(teamKey)) {
    finishGame({ type: "food-court-complete", winnerTeamKey: teamKey });
    return true;
  }
  return false;
}

async function maybeUseFoodCourtFoodShop(player, cell) {
  if (!isFoodCourtMapActive() || !player || !cell) return false;
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (!shop || !shop.foodType) return false;
  if (!isCellOwnedByPlayerTeam(cell, state.players.indexOf(player))) return false;
  if (getFoodCourtShopStatus(shop.id).preparing) return false;
  const incomingFood = createFoodCourtFood(shop.foodType);
  if (!incomingFood) return false;
  const replacedFood = player.foodSlot;
  player.foodSlot = incomingFood;
  setFoodCourtShopCooldown(shop.id, 2);
  log(`${player.name} received ${incomingFood.icon} ${incomingFood.label}${replacedFood ? ` and discarded ${replacedFood.icon}` : ""}.`, true);
  renderAll();
  return true;
}

async function maybeUseFoodCourtGeneralStore(player, cell) {
  if (!isFoodCourtMapActive() || !player || !cell) return false;
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (!isFoodCourtGeneralStoreShop(shop)) return false;
  if (!isCellOwnedByPlayerTeam(cell, state.players.indexOf(player))) return false;
  if (getFoodCourtShopStatus(shop.id).preparing) return false;
  if (ensureFoodCourtGeneralStoreItem(shop.id) === "flag") {
    state.foodCourt.flagAppeared = true;
    claimFlag(player);
    setFoodCourtShopCooldown(shop.id, 2);
    renderAll();
    return true;
  }
  const shard = cloneItemForInventory("forceShard");
  if (!canReceiveInventoryItem(player, shard)) {
    log(`${player.name} could not receive a Power Shard from the general store because the bag is full.`, true);
    return false;
  }
  addItemToInventory(player, shard, { suppressLog: true });
  setFoodCourtShopCooldown(shop.id, 2);
  await animatePowerShardCollect(cell.row, cell.col, player);
  showPowerShardPickupBanner(player);
  log(`${player.name} received a Power Shard from the general store.`, true);
  renderAll();
  return true;
}

async function maybeCollectFoodCourtGeneralStoreShardOnPass(player, cell) {
  if (!isFoodCourtMapActive() || !player || !cell) return false;
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (!isFoodCourtGeneralStoreShop(shop)) return false;
  if (!isCellOwnedByPlayerTeam(cell, state.players.indexOf(player))) return false;
  if (getFoodCourtShopStatus(shop.id).preparing) return false;
  if (ensureFoodCourtGeneralStoreItem(shop.id) !== "forceShard") return false;
  const shard = cloneItemForInventory("forceShard");
  if (!canReceiveInventoryItem(player, shard)) return false;
  addItemToInventory(player, shard, { suppressLog: true });
  setFoodCourtShopCooldown(shop.id, 2);
  await animatePowerShardCollect(cell.row, cell.col, player);
  showPowerShardPickupBanner(player);
  log(`${player.name} picked up a Power Shard while passing the general store.`, true);
  renderAll();
  return true;
}

async function maybeDiscardFoodAtHungryTile(player, cell) {
  if (!isFoodCourtMapActive() || !player?.foodSlot || !cell) return false;
  if (!isFoodCourtHungryTile(cell.row, cell.col)) return false;
  if (!isCellOwnedByPlayerTeam(cell, state.players.indexOf(player))) return false;
  const discarded = player.foodSlot;
  player.foodSlot = null;
  log(`${player.name} gave away ${discarded.icon} at the hungry guest tile.`, true);
  renderAll();
  return true;
}

async function processFoodCourtEndOfTurn(player) {
  if (!isFoodCourtMapActive() || !player?.position || state.gameOver) return false;
  const cell = getCell(player.position.row, player.position.col);
  if (await maybeDeliverFoodCourtFood(player)) return true;
  await maybeUseFoodCourtFoodShop(player, cell);
  await maybeUseFoodCourtGeneralStore(player, cell);
  await maybeDiscardFoodAtHungryTile(player, cell);
  return state.gameOver;
}

async function processFoodCourtBattleFoodTransfer(winner, loser) {
  if (!isFoodCourtMapActive() || !winner || !loser || !loser.foodSlot) return false;
  const defeatedFood = loser.foodSlot;
  loser.foodSlot = null;
  const winnerCurrentFood = winner.foodSlot;
  let takeFood = false;
  if (isComputerPlayer(winner)) {
    takeFood = shouldComputerTakeFood(winner, defeatedFood.id);
  } else {
    const body = winnerCurrentFood
      ? `${sanitize(loser.name)} lost ${sanitize(defeatedFood.icon)}. ${sanitize(winner.name)} is carrying ${sanitize(winnerCurrentFood.icon)}. Replace it with the defeated food? The current food will be lost.`
      : `${sanitize(loser.name)} lost ${sanitize(defeatedFood.icon)}. ${sanitize(winner.name)} can take it.`;
    takeFood = await askFoodCourtDecision(winner, "Take Defeated Food", body, winnerCurrentFood ? "Replace" : "Take", "Leave");
  }
  if (takeFood) {
    winner.foodSlot = defeatedFood;
    log(`${winner.name} took ${defeatedFood.icon} from ${loser.name}${winnerCurrentFood ? ` and discarded ${winnerCurrentFood.icon}` : ""}.`, true);
  } else {
    log(`${loser.name} lost ${defeatedFood.icon}.`, true);
  }
  renderAll();
  return true;
}

function discardFoodCourtFoodForReturnToStart(player, reasonText = "returned to the starting tile") {
  if (!isFoodCourtMapActive() || !player?.foodSlot) return false;
  const discarded = player.foodSlot;
  player.foodSlot = null;
  log(`${player.name} lost ${discarded.icon} ${discarded.label} because they ${reasonText}.`, true);
  return true;
}

function createDefaultSetupPlayers(count = 2) {
  const ids = Object.keys(characterLibrary);
  return Array.from({ length: Math.max(2, Math.min(8, count)) }, (_, index) => ({
    name: `Player ${index + 1}`,
    controller: "human",
    teamKey: normalizeTeamKey(null, index),
    mainCharacterId: ids[(index * 2) % Math.max(1, ids.length)] || ids[0],
    subCharacterId: ids[(index * 2 + 1) % Math.max(1, ids.length)] || ids[1] || ids[0],
    ready: false
  }));
}

function getRoyalMarchTeamForIndex(index, totalPlayers = ROYAL_MARCH_PLAYER_COUNT) {
  return index < Math.ceil(totalPlayers / 2) ? "red" : "blue";
}

function normalizeRoyalMarchTeamKey(teamKey, index, totalPlayers = ROYAL_MARCH_PLAYER_COUNT) {
  return teamKey === "red" || teamKey === "blue" ? teamKey : getRoyalMarchTeamForIndex(index, totalPlayers);
}

function cycleRoyalMarchTeamKey(teamKey) {
  return normalizeRoyalMarchTeamKey(teamKey) === "red" ? "blue" : "red";
}

function getDefaultRoyalMarchRole(index, totalPlayers = ROYAL_MARCH_PLAYER_COUNT) {
  const blueKingIndex = Math.ceil(totalPlayers / 2);
  if (index === 0 || index === blueKingIndex) return "king";
  const fallbackRoles = ["queen", "rook", "bishop", "knight"];
  return fallbackRoles[(index - (index > blueKingIndex ? 1 : 0) - 1 + fallbackRoles.length) % fallbackRoles.length];
}

function createRoyalMarchSetupPlayers(existingPlayers = []) {
  const targetCount = Math.max(ROYAL_MARCH_MIN_PLAYERS, Math.min(ROYAL_MARCH_MAX_PLAYERS, existingPlayers.length || ROYAL_MARCH_MIN_PLAYERS));
  const defaults = createDefaultSetupPlayers(targetCount);
  const preserveExistingTeams = existingPlayers.length >= ROYAL_MARCH_MIN_PLAYERS;
  return defaults.map((defaultPlayer, index) => {
    const existing = existingPlayers[index] || {};
    const controller = getSetupPlayerController(existing);
    const setupPlayer = {
      ...defaultPlayer,
      name: existing.name || defaultPlayer.name,
      controller,
      teamKey: preserveExistingTeams ? normalizeRoyalMarchTeamKey(existing.teamKey, index, targetCount) : getRoyalMarchTeamForIndex(index, targetCount),
      mainCharacterId: existing.mainCharacterId || defaultPlayer.mainCharacterId,
      subCharacterId: existing.subCharacterId || defaultPlayer.subCharacterId,
      ready: !!existing.ready,
      royalRole: existing.royalRole || getDefaultRoyalMarchRole(index, targetCount)
    };
    if (setupPlayer.mainCharacterId === setupPlayer.subCharacterId) {
      setupPlayer.subCharacterId = defaultPlayer.subCharacterId !== setupPlayer.mainCharacterId
        ? defaultPlayer.subCharacterId
        : (Object.keys(characterLibrary).find((id) => id !== setupPlayer.mainCharacterId) || setupPlayer.subCharacterId);
    }
    syncSetupReadyForController(setupPlayer);
    return setupPlayer;
  });
}

function applyRoyalMarchSetupDefaults() {
  if (!state.setupFlow) return;
  if (isFoodCourtMap()) {
    applyFoodCourtSetupDefaults();
    return;
  }
  if (!isRoyalMarchMap()) return;
  state.setupFlow.matchMode = "team";
  state.setupFlow.players = createRoyalMarchSetupPlayers(state.setupFlow.players || []);
}

function getRoyalMarchRoleForPlayer(playerOrIndex) {
  const player = typeof playerOrIndex === "number" ? state.players?.[playerOrIndex] : playerOrIndex;
  const setupIndex = typeof playerOrIndex === "number" ? playerOrIndex : Math.max(0, state.players.indexOf(player));
  const role = player?.royalRole || getDefaultRoyalMarchRole(setupIndex, state.players?.length || ROYAL_MARCH_PLAYER_COUNT);
  return ROYAL_MARCH_ROLE_DEFINITIONS[role] ? role : "rook";
}

function getRoyalMarchRoleDefinition(playerOrIndex) {
  return ROYAL_MARCH_ROLE_DEFINITIONS[getRoyalMarchRoleForPlayer(playerOrIndex)] || ROYAL_MARCH_ROLE_DEFINITIONS.rook;
}

function isRoyalMarchKing(playerOrIndex) {
  return isRoyalMarchMapActive() && getRoyalMarchRoleForPlayer(playerOrIndex) === "king";
}

function getRoyalMarchTeamRoleCount(players, teamKey, role, ignoreIndex = -1) {
  return (players || []).reduce((count, setupPlayer, index) => {
    if (index === ignoreIndex) return count;
    if (normalizeTeamKey(setupPlayer.teamKey, index) !== teamKey) return count;
    return count + (getRoyalMarchRoleForSetupPlayer(setupPlayer, index) === role ? 1 : 0);
  }, 0);
}

function getRoyalMarchRoleForSetupPlayer(setupPlayer, index) {
  const role = setupPlayer?.royalRole || getDefaultRoyalMarchRole(index, state.setupFlow?.players?.length || ROYAL_MARCH_PLAYER_COUNT);
  return ROYAL_MARCH_ROLE_DEFINITIONS[role] ? role : "rook";
}

function canAssignRoyalMarchRole(players, playerIndex, role) {
  const setupPlayer = players?.[playerIndex];
  const definition = ROYAL_MARCH_ROLE_DEFINITIONS[role];
  if (!setupPlayer || !definition) return false;
  const teamKey = normalizeTeamKey(setupPlayer.teamKey, playerIndex);
  if (role !== "king" && getRoyalMarchRoleForSetupPlayer(setupPlayer, playerIndex) === "king") {
    const remainingKings = getRoyalMarchTeamRoleCount(players, teamKey, "king", playerIndex);
    if (remainingKings < 1) return false;
  }
  const currentCount = getRoyalMarchTeamRoleCount(players, teamKey, role, playerIndex);
  return currentCount < definition.maxPerTeam;
}

function cycleRoyalMarchSetupRole(playerIndex) {
  const players = state.setupFlow?.players || [];
  const setupPlayer = players[playerIndex];
  if (!setupPlayer) return;
  const currentRole = getRoyalMarchRoleForSetupPlayer(setupPlayer, playerIndex);
  const currentIndex = ROYAL_MARCH_ROLE_ORDER.indexOf(currentRole);
  const teamKey = normalizeTeamKey(setupPlayer.teamKey, playerIndex);
  for (let offset = 1; offset <= ROYAL_MARCH_ROLE_ORDER.length; offset += 1) {
    const nextRole = ROYAL_MARCH_ROLE_ORDER[(currentIndex + offset) % ROYAL_MARCH_ROLE_ORDER.length];
    if (nextRole === "king") {
      const existingKingIndex = players.findIndex((candidate, index) => (
        index !== playerIndex
        && normalizeTeamKey(candidate.teamKey, index) === teamKey
        && getRoyalMarchRoleForSetupPlayer(candidate, index) === "king"
      ));
      if (existingKingIndex >= 0) {
        players[existingKingIndex].royalRole = currentRole === "king" ? "rook" : currentRole;
        setupPlayer.royalRole = "king";
        if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
        syncSetupReadyForController(setupPlayer);
        syncSetupReadyForController(players[existingKingIndex]);
        return;
      }
    }
    if (canAssignRoyalMarchRole(players, playerIndex, nextRole)) {
      setupPlayer.royalRole = nextRole;
      if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
      syncSetupReadyForController(setupPlayer);
      return;
    }
  }
}

function findRoyalMarchTeamKingIndex(players, teamKey, exceptIndex = -1) {
  return (players || []).findIndex((candidate, index) => (
    index !== exceptIndex
    && normalizeTeamKey(candidate.teamKey, index) === teamKey
    && getRoyalMarchRoleForSetupPlayer(candidate, index) === "king"
  ));
}

function getRoyalMarchFallbackRoleForPlayer(players, playerIndex, preferredRole = "rook") {
  const order = [preferredRole, "rook", "bishop", "knight", "queen"].filter((role, index, list) => list.indexOf(role) === index);
  return order.find((role) => role !== "king" && canAssignRoyalMarchRole(players, playerIndex, role)) || "rook";
}

function setRoyalMarchSetupRole(playerIndex, role) {
  const players = state.setupFlow?.players || [];
  const setupPlayer = players[playerIndex];
  if (!setupPlayer || !ROYAL_MARCH_ROLE_DEFINITIONS[role]) return false;
  const currentRole = getRoyalMarchRoleForSetupPlayer(setupPlayer, playerIndex);
  if (currentRole === role) return false;
  const teamKey = normalizeTeamKey(setupPlayer.teamKey, playerIndex);

  if (role === "king") {
    const existingKingIndex = findRoyalMarchTeamKingIndex(players, teamKey, playerIndex);
    if (existingKingIndex >= 0) {
      players[existingKingIndex].royalRole = getRoyalMarchFallbackRoleForPlayer(players, existingKingIndex, currentRole);
      syncSetupReadyForController(players[existingKingIndex]);
    }
    setupPlayer.royalRole = "king";
  } else {
    const currentPlayerIsOnlyKing = currentRole === "king" && findRoyalMarchTeamKingIndex(players, teamKey, playerIndex) < 0;
    if (currentPlayerIsOnlyKing) return false;
    if (!canAssignRoyalMarchRole(players, playerIndex, role)) return false;
    setupPlayer.royalRole = role;
  }

  if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
  syncSetupReadyForController(setupPlayer);
  return true;
}

function canSelectRoyalMarchSetupRole(playerIndex, role) {
  const players = state.setupFlow?.players || [];
  const setupPlayer = players[playerIndex];
  if (!setupPlayer || !ROYAL_MARCH_ROLE_DEFINITIONS[role]) return false;
  const currentRole = getRoyalMarchRoleForSetupPlayer(setupPlayer, playerIndex);
  if (currentRole === role) return true;
  if (role === "king") return true;
  const teamKey = normalizeTeamKey(setupPlayer.teamKey, playerIndex);
  if (currentRole === "king" && findRoyalMarchTeamKingIndex(players, teamKey, playerIndex) < 0) return false;
  return canAssignRoyalMarchRole(players, playerIndex, role);
}

function renderRoyalMarchRolePanel(setupPlayer, playerIndex) {
  const players = state.setupFlow?.players || [];
  const teamKey = normalizeTeamKey(setupPlayer.teamKey, playerIndex);
  const currentRole = getRoyalMarchRoleForSetupPlayer(setupPlayer, playerIndex);
  const canEditRole = canEditSetupPlayer(playerIndex);
  return `
    <div class="setupRoyalRolePanel" role="group" aria-label="Royal piece role">
      ${ROYAL_MARCH_ROLE_ORDER.map((role) => {
        const definition = ROYAL_MARCH_ROLE_DEFINITIONS[role];
        const count = getRoyalMarchTeamRoleCount(players, teamKey, role);
        const max = definition.maxPerTeam;
        const selected = currentRole === role;
        const disabled = !canEditRole || !canSelectRoyalMarchSetupRole(playerIndex, role);
        return `
          <button type="button" class="setupRoyalRoleChoice ${selected ? "is-selected" : ""}" data-royal-role-choice="${playerIndex}" data-royal-role-id="${sanitize(role)}" ${disabled ? "disabled aria-disabled=\"true\"" : ""} aria-label="${sanitize(definition.label)}">
            <span class="setupRoyalRoleCount">${count}/${max}</span>
            <span class="setupRoyalRoleIcon">${sanitize(definition.icon)}</span>
            <span class="setupRoyalRoleName">${sanitize(definition.label)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function deepClone(value) {

  return JSON.parse(JSON.stringify(value));
}

function nextId(prefix) {
  const value = `${prefix}-${state.globalIdCounter}`;
  state.globalIdCounter += 1;
  return value;
}
function isTutorialActive() {
  return !!state.tutorial?.active;
}

function getTutorialStep() {
  return Number(state.tutorial?.step) || 0;
}


function resetTutorialRuntime() {
  state.tutorial = {
    active: false,
    step: 0,
    pendingBattleLaunch: false,
    baseChoiceLocked: null,
    moveTargetPath: [],
    moveTargetPaint: [],
    modalShownForStep: null
  };
}

function resetMatchRuntimeState() {
  state.matchRuntimeVersion += 1;
  if (state.computerTurnTimer) {
    window.clearTimeout(state.computerTurnTimer);
    state.computerTurnTimer = null;
  }
  if (state.flagCaptureAnimationTimeout) {
    window.clearTimeout(state.flagCaptureAnimationTimeout);
    state.flagCaptureAnimationTimeout = null;
  }
  if (state.powerShardPickupBannerTimeout) {
    window.clearTimeout(state.powerShardPickupBannerTimeout);
    state.powerShardPickupBannerTimeout = null;
  }
  if (state.lastRoundBannerTimeout) {
    window.clearTimeout(state.lastRoundBannerTimeout);
    state.lastRoundBannerTimeout = null;
  }
  if (state.skillActivationBannerTimeout) {
    window.clearTimeout(state.skillActivationBannerTimeout);
    state.skillActivationBannerTimeout = null;
  }
  if (state.diceAnimation?.raf !== null) {
    window.cancelAnimationFrame(state.diceAnimation.raf);
    state.diceAnimation.raf = null;
  }
  if (state.orderAnimation?.interval !== null) {
    window.clearInterval(state.orderAnimation.interval);
    state.orderAnimation.interval = null;
  }
  if (rightPanelCloseTimer) {
    window.clearTimeout(rightPanelCloseTimer);
    rightPanelCloseTimer = null;
  }
  clearInteractionPrompts();
  state.roundTransitionActive = false;
  state.movementAnimating = false;
  state.battleIntroRunning = false;
  state.pendingBattle = null;
  state.returningPlayerIds = [];
  state.turnActionOrigin = null;
  state.turnActionOriginalOwners = {};
  state.turnUsedItem = false;
  state.selectedPath = [];
  state.selectedPaintTargets = [];
  state.moveDie = null;
  state.paintDie = null;
  state.remainingMove = 0;
  state.remainingPaint = 0;
  state.paintPhaseStartRemaining = 0;
  state.currentAction = null;
  state.phase = "setup";
  state.gameOver = false;
  state.lastRoundActive = false;
  state.lastRoundHudActive = false;
  state.lastRoundReason = "";
  state.gameEndContext = null;
  state.turnMoveCountBonus = 0;
  state.turnPaintCountBonus = 0;
  state.turnNormalMoveDistance = 0;
  state.allowFreeCameraDuringInput = false;
  state.turnHadBattle = false;
  state.turnCapturedEnemyCount = 0;
  state.foodCourt = null;
  state.pendingBattleResult = null;
  state.pendingBattleResultContext = null;
  state.pendingBattleResultChoice = null;
  state.flagCaptureAnimation = null;
  state.skillActivationBanner = null;
  state.powerShardPickupBanner = null;
  state.damageTextPopups = [];
  state.territoryPointPopups = [];
  state.statLossPopups = [];
  state.mimiGamblerRipples = [];
  state.brakkExplosionEffects = [];
  state.brakkMissileEffects = [];
  state.veskaThreadEffects = [];
  state.rascaTailImpactEffects = [];
  state.ui.zoomPanelOpen = false;
  state.ui.itemTrayOpen = false;
  state.ui.swapBubbleOpen = false;
  state.ui.skillPanelOpen = false;
  state.ui.diceBubbleOpen = false;
  state.ui.restBubbleOpen = false;
  state.ui.rightPanelMode = null;
  state.ui.selectedItemIndex = null;
  state.ui.selectedTileInspect = null;
  state.ui.matchAbortPromptOpen = false;
  state.setupSelection.active = false;
  state.setupSelection.availableCorners = [];
  state.setupSelection.currentPlayerIndex = null;
  state.setupSelection.computerChoiceMode = null;
  state.setupSelection.autoPlaceAllComputers = false;
  state.setupSelection.resolve = null;
}

function isMatchRuntimeCurrent(runtimeVersion) {
  return runtimeVersion === state.matchRuntimeVersion && ui.gameScreen.classList.contains("active");
}

function showTutorialModal(title, body, onClose = null, label = "OK") {
  showSimpleModal({
    title,
    body,
    buttons: [{
      label,
      style: "primary",
      onClick: () => {
        closeTopModal();
        if (typeof onClose === 'function') onClose();
      }
    }]
  });
}

function isRoyalMarchTutorialActive() {
  return isTutorialActive() && state.tutorial?.kind === "royalMarch";
}

const ROYAL_MARCH_TUTORIAL_STEPS = [
  {
    step: 101,
    role: "king",
    title: "① King Movement",
    body: "The King can step in any of the eight directions and can change direction freely. In Royal March, the King can only enter tiles owned by your team, so it cannot move onto uncolored tiles or enemy-owned tiles. Follow the marked route across your own red tiles.",
    retry: "Move the King to the marked target using only red tiles. You can change direction one step at a time.",
    move: 3,
    paint: 0,
    path: [{ row: 4, col: 3 }, { row: 3, col: 3 }, { row: 2, col: 2 }, { row: 1, col: 2 }],
    owned: [{ row: 4, col: 3 }, { row: 3, col: 3 }, { row: 2, col: 2 }, { row: 1, col: 2 }]
  },
  {
    step: 102,
    role: "king",
    title: "② Royal March Victory",
    body: "A team wins Royal March if its King is on the enemy back rank when the round ends. Move the red King onto the red goal edge at row 7.",
    retry: "Move the King onto the marked row-7 target. This demonstrates the Royal March win condition.",
    move: 1,
    paint: 0,
    path: [{ row: 5, col: 3 }, { row: 6, col: 3 }],
    owned: [{ row: 5, col: 3 }, { row: 6, col: 3 }]
  },
  {
    step: 103,
    role: "queen",
    title: "③ Queen Movement",
    body: "The Queen can move horizontally, vertically, or diagonally, but each move must stay in one direction. Select the marked diagonal destination directly.",
    retry: "Select the marked diagonal destination directly. The Queen cannot bend the route during one move.",
    move: 3,
    paint: 3,
    path: [{ row: 4, col: 4 }, { row: 3, col: 3 }, { row: 2, col: 2 }, { row: 1, col: 1 }]
  },
  {
    step: 104,
    role: "rook",
    title: "④ Rook Movement",
    body: "The Rook moves only horizontally or vertically. Select the marked straight-line destination.",
    retry: "Select the marked horizontal destination. The Rook cannot move diagonally.",
    move: 4,
    paint: 4,
    path: [{ row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 }]
  },
  {
    step: 105,
    role: "bishop",
    title: "⑤ Bishop Movement",
    body: "The Bishop moves only diagonally. Select the marked diagonal destination.",
    retry: "Select the marked diagonal destination. The Bishop cannot move horizontally or vertically.",
    move: 3,
    paint: 3,
    path: [{ row: 5, col: 1 }, { row: 4, col: 2 }, { row: 3, col: 3 }, { row: 2, col: 4 }]
  },
  {
    step: 106,
    role: "knight",
    title: "⑥ Knight Movement",
    body: "The Knight moves in L-shaped jumps. Unlike Queen, Rook, and Bishop, it can choose a new jump direction each time. Click the two marked jumps in order.",
    retry: "Click the marked Knight jumps in order. Each jump must be two tiles in one direction and one tile to the side.",
    move: 2,
    paint: 2,
    path: [{ row: 3, col: 3 }, { row: 1, col: 4 }, { row: 3, col: 5 }]
  }
];

function getRoyalMarchTutorialStepConfig(step = getTutorialStep()) {
  return ROYAL_MARCH_TUTORIAL_STEPS.find((entry) => entry.step === step) || ROYAL_MARCH_TUTORIAL_STEPS[0];
}

function resetRoyalMarchTutorialPlayers(role) {
  state.players = [
    createPlayer(0, { name: "You", controller: "human", teamKey: "red", mainCharacterId: "painter1", subCharacterId: "battler1" }),
    createPlayer(1, { name: "Blue King", controller: "computer", teamKey: "blue", mainCharacterId: "battler1", subCharacterId: "painter2" })
  ];
  state.players[0].royalRole = role;
  state.players[1].royalRole = "king";
  state.players[0].name = "You";
  state.players[1].name = "Blue King";
  state.players[1].isComputer = true;
}

function resetRoyalMarchTutorialBoard(config) {
  state.selectedMapId = "royalMarch";
  state.matchMode = "team";
  state.board = createBoard();
  state.rascaClones = [];
  state.rascaTailImpactEffects = [];
  getPlayableBoardCells().forEach((cell) => {
    cell.owner = null;
    cell.startOwner = null;
    cell.groundItem = null;
    cell.obstacle = null;
  });
  (config.owned || [config.path[0]]).forEach((point) => {
    const cell = getCell(point.row, point.col);
    if (cell) cell.owner = 0;
  });
  const start = config.path[0];
  const startCell = getCell(start.row, start.col);
  if (startCell) startCell.startOwner = 0;
  const target = config.path[config.path.length - 1];
  const targetCell = getCell(target.row, target.col);
  if (targetCell && config.step !== 102) targetCell.owner = targetCell.owner ?? null;
}

function prepareRoyalMarchTutorialStep(step = ROYAL_MARCH_TUTORIAL_STEPS[0].step) {
  const config = getRoyalMarchTutorialStepConfig(step);
  state.tutorial.active = true;
  state.tutorial.kind = "royalMarch";
  state.tutorial.step = config.step;
  state.tutorial.moveTargetPath = config.path.map((point) => ({ ...point }));
  state.tutorial.moveTargetPaint = [];
  state.tutorial.modalShownForStep = null;
  resetRoyalMarchTutorialPlayers(config.role);
  resetRoyalMarchTutorialBoard(config);
  const start = config.path[0];
  state.players[0].position = { ...start };
  state.players[0].startPosition = { ...start };
  state.players[1].position = { row: 0, col: 3 };
  state.players[1].startPosition = { row: 0, col: 3 };
  state.round = 1;
  state.completedTurnsInRound = 0;
  state.gameOver = false;
  state.rascaClones = [];
  state.rascaTailImpactEffects = [];
  state.logEntries = [];
  state.order = [0, 1];
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = 0;
  state.phase = "game";
  state.setupSelection.active = false;
  state.computerTurnTimer = null;
  ui.setupScreen.classList.remove("active");
  ui.gameScreen.classList.add("active");
  beginTurn();
  setTurnDiceResults(config.move, config.paint);
  showTutorialModal(config.title, config.body);
}

function finishRoyalMarchTutorial() {
  showTutorialModal(
    "Royal March Tutorial Complete",
    "You practiced King, Queen, Rook, Bishop, and Knight movement, plus the Royal March back-rank win condition.",
    () => {
      resetTutorialRuntime();
      state.selectedMapId = "royalMarch";
      state.gameOver = false;
      ui.gameScreen.classList.remove("active");
      ui.setupScreen.classList.add("active");
      if (state.setupFlow) state.setupFlow.view = "map-detail";
      renderSetupFlow();
    },
    "Back to stage"
  );
}

function abortMatchToCharacterSelection() {
  resetMatchRuntimeState();
  if (typeof closeTopModal === "function") closeTopModal();
  resetTutorialRuntime();
  ui.gameScreen.classList.remove("active");
  ui.setupScreen.classList.add("active");
  if (state.setupFlow) state.setupFlow.view = "player-setup";
  renderSetupFlow();
}

function completeRoyalMarchTutorialStep() {
  const config = getRoyalMarchTutorialStepConfig();
  const currentIndex = ROYAL_MARCH_TUTORIAL_STEPS.findIndex((entry) => entry.step === config.step);
  if (config.step === 102) {
    showTutorialModal(
      "Royal March Victory",
      "If the round ended now, the red team would win immediately because its King is on the enemy back rank.",
      () => prepareRoyalMarchTutorialStep(ROYAL_MARCH_TUTORIAL_STEPS[currentIndex + 1].step)
    );
    return;
  }
  const next = ROYAL_MARCH_TUTORIAL_STEPS[currentIndex + 1];
  if (!next) {
    finishRoyalMarchTutorial();
    return;
  }
  showTutorialModal("Step Complete", "Good. Continue to the next Royal March piece.", () => prepareRoyalMarchTutorialStep(next.step));
}

function handleRoyalMarchTutorialMoveResult(player) {
  if (!isRoyalMarchTutorialActive() || state.currentPlayerIndex !== 0 || player !== state.players[0]) return false;
  const config = getRoyalMarchTutorialStepConfig();
  const target = config.path[config.path.length - 1];
  const reachedTarget = player.position?.row === target.row && player.position?.col === target.col;
  if (!reachedTarget) {
    showTutorialModal(`Retry ${config.title}`, config.retry, () => prepareRoyalMarchTutorialStep(config.step));
    return true;
  }
  completeRoyalMarchTutorialStep();
  return true;
}

function startRoyalMarchTutorial() {
  resetTutorialRuntime();
  prepareRoyalMarchTutorialStep(ROYAL_MARCH_TUTORIAL_STEPS[0].step);
}

function assignTutorialStartTile(playerIndex, row, col, label) {
  const player = state.players[playerIndex];
  if (!player) return;
  player.position = { row, col };
  player.startPosition = { row, col };
  player.startCornerKey = label || `${row},${col}`;
  const cell = getCell(row, col);
  if (cell) {
    cell.owner = playerIndex;
    cell.startOwner = playerIndex;
  }
}

function resetTutorialPlayersToBase() {
  state.players = [
    createPlayer(0, { name: 'You', controller: 'human', teamKey: 'red', mainCharacterId: 'painter1', subCharacterId: 'battler1' }),
    createPlayer(1, { name: 'CPU Tutor', controller: 'computer', teamKey: 'blue', mainCharacterId: 'battler1', subCharacterId: 'painter2' })
  ];
  state.players[0].name = 'You';
  state.players[1].name = 'CPU Tutor';
  state.players[1].isComputer = true;
}

function setTutorialCharacter(playerIndex, characterId, statsOverride = null) {
  const player = state.players[playerIndex];
  const character = characterLibrary[characterId];
  if (!player || !character) return;
  player.activeCharacterId = characterId;
  player.baseStats = JSON.parse(JSON.stringify(character.stats));
  player.currentStats = JSON.parse(JSON.stringify(statsOverride || character.stats));
  player.tempMaxBonus = { attack: 0, hp: 0, technique: 0 };
  player.icon = character.iconImage || character.icon;
  player.statuses = {
    hiddenTurns: 0,
    poison: 0,
    poisonZoneTurns: {},
    slowZoneImmunity: new Set(),
    pitImmunity: new Set(),
    zoneEntryPrompted: new Set(),
    mesmerSyncRounds: 0,
    mesmerSyncBattleRemaining: 0,
    pushAheadRounds: 0,
    corvenOmenGauge: 0,
    corvenTurnLossTotal: 0,
    corvenCurseTurns: 0,
    corvenAutoHealTurns: 0,
    hobbsProtectiveDetail: null,
    hobbsBattleProtect: null
  };
  player.statuses.mimiMode = "star";
  player.statuses.mimiNextDiceBoost = 0;
  player.statuses.mimiForceDiceOne = false;
  player.statuses.brakkPaintBomb = null;
  player.statuses.brakkLastOwnMoveDistance = null;
  player.statuses.corvenOmenGauge = 0;
  player.statuses.corvenTurnLossTotal = 0;
  player.statuses.corvenCurseTurns = 0;
  player.statuses.corvenAutoHealTurns = 0;
  player.items = [];
  player.cooldowns = { ...(player.cooldowns || {}), trapper3VenomVarnish: 0 };
  player.ownedFlag = false;
  player.flagPoints = 0;
  player.battleWins = 0;
  player.zoneDisarms = [];
  player.pitDisarms = [];
  player.cooldowns = { painter2Hide: 0, painter3Backblast: 0, painter4Backtrack: 0, trapper1Zone: 0, trapper3VenomVarnish: 0, trickster3FieldCache: 0, trickster3BaitedBoulder: 0, tanker2Quickdig: 0, tanker3ProtectiveDetail: 0, tanker3BreakItUp: 0, battler3MesmerSync: 0, battler4BleakOffering: 0, battler5EmergencyCallout: 0, supporter1PushAhead: 0, supporter2FreshBatch: 0, mimiOffRecord: 0, rascaShedRelay: 0, rascaSnapback: 0 };
}

function resetTutorialBoardBase() {
  state.selectedMapId = 'simpleArena';
  state.matchMode = 'ffa';
  state.board = createBoard();
  state.round = 1;
  state.completedTurnsInRound = 0;
  state.gameOver = false;
  state.logEntries = [];
  state.order = [0, 1];
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = 0;
  state.phase = 'game';
  state.computerTurnTimer = null;
  state.movementAnimating = false;
  state.battleIntroRunning = false;
  state.setupSelection.active = false;
  state.setupSelection.availableCorners = [];
  state.setupSelection.currentPlayerIndex = null;
  state.setupSelection.computerChoiceMode = null;
  state.setupSelection.autoPlaceAllComputers = false;
  state.setupSelection.resolve = null;
  ui.setupScreen.classList.remove('active');
  ui.gameScreen.classList.add('active');
}

function prepareTutorialTurn(moveValue, paintValue) {
  state.currentPlayerIndex = 0;
  state.currentTurnOrderIndex = 0;
  beginTurn();
  if (typeof moveValue === 'number' && typeof paintValue === 'number') {
    setTurnDiceResults(moveValue, paintValue);
  }
}

function beginTutorialPlacement() {
  state.tutorial.step = 2;
  state.currentPlayerIndex = 0;
  state.setupSelection.active = true;
  state.setupSelection.availableCorners = [{ key: 'top-left', row: 0, col: 0, label: 'Top Left' }];
  state.setupSelection.currentPlayerIndex = 0;
  state.setupSelection.resolve = (corner) => {
    state.setupSelection.active = false;
    state.setupSelection.availableCorners = [];
    state.setupSelection.currentPlayerIndex = null;
    state.setupSelection.computerChoiceMode = null;
    state.setupSelection.resolve = null;
    assignTutorialStartTile(0, corner.row, corner.col, corner.key);
    assignTutorialStartTile(1, ROWS - 1, COLS - 1, 'bottom-right');
    renderAll();
    showTutorialModal(
      '② Initial Placement',
      'Starting tiles have been placed. The bright corner tile is your base, and enemies cannot repaint it. Next you will roll fixed tutorial dice.',
      () => prepareTutorialRollStep()
    );
  };
  renderAll();
}

function prepareTutorialRollStep() {
  state.tutorial.step = 3;
  state.tutorial.modalShownForStep = null;
  state.round = 1;
  state.completedTurnsInRound = 0;
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = 0;
  beginTurn();
  showTutorialModal(
    '③ Roll the Dice',
    'Open the dice button and roll. In this tutorial the result is fixed to Move 2 and Paint 4 so the lesson is easy to follow.',
  );
}

function prepareTutorialObstacleStep() {
  state.tutorial.step = 6;
  resetTutorialBoardBase();
  setTutorialCharacter(0, 'painter1', { attack: 90, hp: 92, technique: 104 });
  setTutorialCharacter(1, 'battler1');
  assignTutorialStartTile(0, 2, 2, 'tutorial-obstacle');
  assignTutorialStartTile(1, ROWS - 1, COLS - 1, 'bottom-right');
  const startCell = getCell(2, 2); if (startCell) startCell.startOwner = 0;
  const rockCell = getCell(2, 3);
  if (rockCell) rockCell.obstacle = createObstacleState('forceRock');
  prepareTutorialTurn(1, 1);
  showTutorialModal(
    '⑥ Break an Obstacle',
    'Move one tile into the uncolored Power Rock space. That movement also spends 1 Space because uncolored tiles are painted during movement. Then spend Attack to break the obstacle. Breaking obstacles can open routes, reveal drops, and Scrabbit restores 5 to a chosen stat after the break.',
  );
}

function prepareTutorialHealStep() {
  state.tutorial.step = 7;
  resetTutorialBoardBase();
  setTutorialCharacter(0, 'battler1', { attack: 72, hp: 64, technique: 100 });
  setTutorialCharacter(1, 'battler1');
  assignTutorialStartTile(0, 2, 1, 'tutorial-heal');
  assignTutorialStartTile(1, ROWS - 1, COLS - 1, 'bottom-right');
  const healCell = getCell(3, 1);
  if (healCell) healCell.owner = 0;
  prepareTutorialTurn(1, 0);
  showTutorialModal(
    '⑦ Recovery Tiles',
    'Move onto your own green Attack recovery tile and end the turn there. Recovery tiles only work if you finish on them and the tile belongs to you.',
  );
}

function prepareTutorialFlagPickupStep() {
  state.tutorial.step = 8;
  resetTutorialBoardBase();
  setTutorialCharacter(0, 'painter1');
  setTutorialCharacter(1, 'battler1');
  assignTutorialStartTile(0, 3, 3, 'tutorial-flag');
  assignTutorialStartTile(1, ROWS - 1, COLS - 1, 'bottom-right');
  const flagCell = getCell(3, 4);
  if (flagCell) {
    flagCell.obstacle = null;
    flagCell.owner = null;
    flagCell.groundItem = { id: 'flag', name: 'Flag', icon: '🚩' };
  }
  prepareTutorialTurn(1, 1);
  showTutorialModal(
    '⑧ Pick Up the Flag',
    'Move one tile onto the flag space and end the turn there. Because the flag tile is uncolored, entering it during movement also spends 1 Space. The obstacle has already been removed for this lesson.',
  );
}

function prepareTutorialBattleStep() {
  state.tutorial.step = 9;
  resetTutorialBoardBase();
  setTutorialCharacter(0, 'battler2', { attack: 120, hp: 90, technique: 90 });
  setTutorialCharacter(1, 'painter2', { attack: 80, hp: 110, technique: 110 });
  assignTutorialStartTile(0, 3, 4, 'center');
  state.players[1].position = { row: 3, col: 4 };
  const center = getCell(3, 4);
  if (center) {
    center.owner = 1;
    center.obstacle = null;
    center.groundItem = null;
  }
  state.currentPlayerIndex = 0;
  state.currentAction = null;
  state.moveDie = null;
  state.paintDie = null;
  state.remainingMove = 0;
  state.remainingPaint = 0;
  state.turnMoveCountBonus = 0;
  state.turnPaintCountBonus = 0;
  renderAll();
  showTutorialModal(
    '⑨ Battle Basics',
    'You will now fight the CPU. Attack beats Technique, Technique beats HP, and HP beats Attack. In this matchup, choosing Attack is the best answer.',
    async () => {
      await resolveBattle(state.players[0], state.players[1]);
    },
    'Start battle'
  );
}

function resetTutorialBattleStep() {
  showTutorialModal('Retry ⑨ Battle Basics', 'Choose a stronger stat matchup. In this tutorial, Attack is the intended answer.', () => prepareTutorialBattleStep());
}

function prepareTutorialFlagStealBattleStep() {
  state.tutorial.step = 10;
  resetTutorialBoardBase();
  setTutorialCharacter(0, 'battler2', { attack: 120, hp: 90, technique: 90 });
  setTutorialCharacter(1, 'painter2', { attack: 80, hp: 110, technique: 110 });
  assignTutorialStartTile(0, 3, 4, 'center');
  state.players[1].position = { row: 3, col: 4 };
  state.players[1].ownedFlag = true;
  state.players[1].flagPoints = FLAG_POINTS;
  const center = getCell(3, 4);
  if (center) {
    center.owner = 1;
    center.obstacle = null;
    center.groundItem = null;
  }
  state.currentPlayerIndex = 0;
  state.currentAction = null;
  state.moveDie = null;
  state.paintDie = null;
  state.remainingMove = 0;
  state.remainingPaint = 0;
  state.turnMoveCountBonus = 0;
  state.turnPaintCountBonus = 0;
  renderAll();
  showTutorialModal(
    '⑩ Win a Battle and Steal the Flag',
    'Now the CPU is carrying the flag. Win this battle and the flag will be transferred automatically to the winner.',
    async () => {
      await resolveBattle(state.players[0], state.players[1]);
    },
    'Start battle'
  );
}

function resetTutorialFlagStealBattleStep() {
  showTutorialModal('Retry ⑩ Flag Steal', 'Win the battle to take the flag from the CPU.', () => prepareTutorialFlagStealBattleStep());
}

function prepareTutorialFinishStep() {
  state.tutorial.step = 11;
  resetTutorialBoardBase();
  assignTutorialStartTile(0, 0, 0, 'top-left');
  assignTutorialStartTile(1, ROWS - 1, COLS - 1, 'bottom-right');
  for (let row = 0; row < getBoardRows(); row += 1) {
    for (let col = 0; col < getBoardCols(); col += 1) {
      const cell = getCell(row, col);
      if (!cell || cell.startOwner !== null) continue;
      cell.owner = (row === ROWS - 1 && col >= COLS - 2) ? 1 : 0;
      cell.obstacle = null;
      if (cell.groundItem?.id === 'flag') cell.groundItem = null;
    }
  }
  state.players[0].ownedFlag = true;
  state.players[0].flagPoints = FLAG_POINTS;
  state.players[0].battleWins = 1;
  renderAll();
  showTutorialModal(
    '⑪ Game End',
    'The tutorial will now fast-forward to the end of the match. The result screen compares territory, flag bonus, and battle-win bonus.',
    () => {
      finishGame();
      state.tutorial.step = 12;
    },
    'Show results'
  );
}

async function startTutorial() {
  resetTutorialRuntime();
  state.tutorial.active = true;
  resetTutorialPlayersToBase();
  resetTutorialBoardBase();
  renderAll();
  state.tutorial.step = 1;
  showTutorialModal(
    '① Turn Order',
    'This tutorial uses a fixed order so the lesson stays clear. You act first, then the CPU. Next you will choose your starting tile.',
    () => beginTutorialPlacement()
  );
}



function getObstacleLayoutEntries() {
  return [
    { row: 2, col: 3, obstacleId: "forceRock" },
    { row: 2, col: 4, obstacleId: "intelligenceRock" },
    { row: 2, col: 5, obstacleId: "forceRock" },
    { row: 3, col: 3, obstacleId: "intelligenceRock" },
    { row: 3, col: 5, obstacleId: "forceRock" },
    { row: 4, col: 3, obstacleId: "intelligenceRock" },
    { row: 4, col: 4, obstacleId: "forceRock" },
    { row: 4, col: 5, obstacleId: "intelligenceRock" }
  ];
}

function createObstacleState(obstacleId) {
  const definition = OBSTACLE_DEFINITIONS[obstacleId];
  if (!definition) return null;
  return {
    id: definition.id,
    name: definition.name,
    icon: definition.icon,
    allowedStat: definition.allowedStat,
    hp: definition.hp,
    maxHp: definition.hp,
    dropItemId: definition.dropItemId
  };
}

function createSkavaBoulderState(ownerIndex, statKey, enhanced = false) {
  return {
    id: "skavaBoulder",
    name: "Baited Boulder",
    icon: getStatIcon(statKey),
    allowedStat: statKey,
    hp: 20,
    maxHp: 20,
    dropItemId: "forceShard",
    skavaOwnerIndex: ownerIndex,
    skavaDecayAmount: 5,
    skavaDecayDrops: false,
    skavaProtectedOwnerEndsRemaining: enhanced ? 2 : 0
  };
}

function isSkavaBoulderObstacle(obstacle) {
  return !!(obstacle && obstacle.id === "skavaBoulder");
}

function isSkavaBoulderProtected(obstacle) {
  return isSkavaBoulderObstacle(obstacle) && (Number(obstacle.skavaProtectedOwnerEndsRemaining) || 0) > 0;
}

function cloneItemForInventory(itemId) {
  const definition = itemDefinitions[itemId];
  if (!definition) return null;
  return {
    id: definition.id,
    name: definition.shortName || definition.name,
    icon: definition.icon,
    quantity: definition.stackable ? 1 : undefined
  };
}

function isStackableItem(item) {
  const definition = item && itemDefinitions[item.id];
  return !!(definition && definition.stackable);
}

function getStackCount(item) {
  if (!item) return 0;
  return isStackableItem(item) ? Math.max(1, Number(item.quantity) || 1) : 1;
}

function getInventorySlotCount(player) {
  return Array.isArray(player?.items) ? player.items.length : 0;
}

function findInventoryItemIndex(player, itemId) {
  return player.items.findIndex((item) => item.id === itemId);
}

function getStackLimitForItem(itemId) {
  if (itemId === "forceShard") return MAX_POWER_SHARDS;
  if (itemId === "coin") return MIMI_MAX_COINS;
  return Number.POSITIVE_INFINITY;
}

function canReceiveInventoryItem(player, item) {
  if (!player || !item) return false;
  if (isStackableItem(item)) {
    const existingIndex = findInventoryItemIndex(player, item.id);
    if (existingIndex !== -1) {
      return getStackCount(player.items[existingIndex]) < getStackLimitForItem(item.id);
    }
    return getInventorySlotCount(player) < MAX_ITEMS;
  }
  return getInventorySlotCount(player) < MAX_ITEMS;
}

function addItemToInventory(player, item, { suppressLog = false } = {}) {
  if (!player || !item) return false;
  const definition = itemDefinitions[item.id];
  if (definition?.stackable) {
    const existingIndex = findInventoryItemIndex(player, item.id);
    const amount = Math.max(1, Number(item.quantity) || 1);
    const stackLimit = getStackLimitForItem(item.id);
    if (existingIndex !== -1) {
      const current = getStackCount(player.items[existingIndex]);
      const addable = Math.max(0, Math.min(amount, stackLimit - current));
      if (addable <= 0) return false;
      player.items[existingIndex].quantity = current + addable;
      return true;
    }
    if (getInventorySlotCount(player) >= MAX_ITEMS) return false;
    const addable = Math.max(0, Math.min(amount, stackLimit));
    if (addable <= 0) return false;
    player.items.push({ id: item.id, name: item.name || definition.shortName || definition.name, icon: item.icon || definition.icon, quantity: addable });
    return true;
  }
  if (getInventorySlotCount(player) >= MAX_ITEMS) return false;
  player.items.push({ ...item });
  return true;
}

function removeOneStackedItem(player, itemId, amount = 1) {
  const index = findInventoryItemIndex(player, itemId);
  if (index === -1) return 0;
  const item = player.items[index];
  if (!isStackableItem(item)) {
    player.items.splice(index, 1);
    return 1;
  }
  const removable = Math.min(getStackCount(item), Math.max(1, amount));
  item.quantity = getStackCount(item) - removable;
  if (item.quantity <= 0) player.items.splice(index, 1);
  return removable;
}

function getManualUsableInventoryEntries(player) {
  if (!player) return [];
  return player.items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !(itemDefinitions[item.id]?.battleOnly));
}

function getForceShardCount(player) {
  const index = findInventoryItemIndex(player, "forceShard");
  if (index === -1) return 0;
  return getStackCount(player.items[index]);
}

function getMimiMode(player) {
  if (!player || player.activeCharacterId !== "trickster1") return null;
  return player.statuses?.mimiMode === "gambler" ? "gambler" : "star";
}

function isMimiInStarMode(player) {
  return getMimiMode(player) === "star";
}

function isMimiInGamblerMode(player) {
  return getMimiMode(player) === "gambler";
}

function getMimiCoinCount(player) {
  const index = findInventoryItemIndex(player, "coin");
  return index === -1 ? 0 : getStackCount(player.items[index]);
}

function getRascaClonesForPlayer(playerOrIndex) {
  const ownerIndex = typeof playerOrIndex === "number" ? playerOrIndex : state.players.indexOf(playerOrIndex);
  if (ownerIndex < 0) return [];
  return (state.rascaClones || []).filter((clone) => clone.ownerIndex === ownerIndex);
}

function getRascaCloneAt(row, col, predicate = null) {
  return (state.rascaClones || []).find((clone) => (
    clone.row === row
    && clone.col === col
    && (typeof predicate !== "function" || predicate(clone))
  )) || null;
}

function isRascaClonePaintSourceForPlayer(player, row, col) {
  return getRascaClonesForPlayer(player).some((clone) => (
    Math.abs(clone.row - row) + Math.abs(clone.col - col) <= 1
  ));
}

function recalculateRascaCloneMaxHp(ownerIndex) {
  const owner = state.players[ownerIndex];
  const clones = getRascaClonesForPlayer(ownerIndex);
  if (!owner || !clones.length) return;
  const maxHp = Math.max(1, Math.ceil(getCurrentMax(owner, "hp") / clones.length));
  clones.forEach((clone) => {
    clone.maxHp = maxHp;
    if (clone.hp > maxHp) clone.hp = maxHp;
  });
}

function removeRascaClone(cloneId) {
  const clone = (state.rascaClones || []).find((entry) => entry.id === cloneId);
  if (!clone) return null;
  state.rascaClones = state.rascaClones.filter((entry) => entry.id !== cloneId);
  recalculateRascaCloneMaxHp(clone.ownerIndex);
  return clone;
}

function damageRascaClone(clone, amount, reason = "clone damage", sourceOwnerIndex = null) {
  if (!clone || amount <= 0) return;
  const owner = state.players[clone.ownerIndex];
  if (!owner) {
    removeRascaClone(clone.id);
    return;
  }
  const actual = Math.min(Math.max(0, Number(amount) || 0), Math.max(0, Number(clone.hp) || 0));
  clone.hp = Math.max(0, clone.hp - actual);
  if (actual > 0) {
    queueBoardDamageText(clone.row, clone.col, actual, "player");
    applyFieldDamage(owner, actual, `${owner.name}'s detached tail took ${actual} damage, and ${owner.name} suffered the same HP damage.`, sourceOwnerIndex);
  }
  if (clone.hp <= 0) {
    removeRascaClone(clone.id);
    log(`${owner.name}'s detached tail vanished after ${reason}.`, true);
  }
}

function createRascaCloneCombatant(clone) {
  const owner = state.players[clone.ownerIndex];
  const cloneCount = Math.max(1, getRascaClonesForPlayer(clone.ownerIndex).length);
  const splitStats = {
    attack: Math.ceil((Number(owner?.currentStats?.attack) || 0) / cloneCount),
    hp: Math.ceil((Number(owner?.currentStats?.hp) || 0) / cloneCount),
    technique: Math.ceil((Number(owner?.currentStats?.technique) || 0) / cloneCount)
  };
  return {
    id: clone.id,
    name: `${owner?.name || "Rasca"}'s Tail`,
    isComputer: !!owner?.isComputer,
    teamKey: owner?.teamKey,
    activeCharacterId: "trickster2",
    isRascaTailCombatant: true,
    selectedCharacters: ["trickster2", "trickster2"],
    baseStats: { ...splitStats },
    currentStats: { ...splitStats },
    tempMaxBonus: { attack: 0, hp: 0, technique: 0 },
    position: { row: clone.row, col: clone.col },
    items: owner?.items || [],
    statuses: { hiddenTurns: 0, poisonZoneTurns: {}, mesmerSyncRounds: 0, mesmerSyncBattleRemaining: 0, pushAheadRounds: 0 },
    battleExhaustionMax: 5
  };
}

function addMimiCoins(player, amount, reason = "Crowd Pleaser") {
  if (!player || player.activeCharacterId !== "trickster1" || !isMimiInStarMode(player)) return 0;
  const current = getMimiCoinCount(player);
  const addable = Math.max(0, Math.min(Math.max(0, Number(amount) || 0), MIMI_MAX_COINS - current));
  if (addable <= 0) return 0;
  const added = addItemToInventory(player, { id: "coin", name: "Coin", icon: itemDefinitions.coin.icon, quantity: addable }, { suppressLog: true });
  if (!added) return 0;
  queueCoinGainPopup(player, addable);
  log(`${player.name} gained ${addable} Coin${addable === 1 ? "" : "s"} from ${reason}.`, true);
  return addable;
}

function spendMimiCoins(player, amount) {
  return removeOneStackedItem(player, "coin", Math.max(1, Number(amount) || 1));
}

function ensureMimiModeAfterCoinChange(player) {
  if (!player || player.activeCharacterId !== "trickster1") return;
  if (isMimiInGamblerMode(player) && getMimiCoinCount(player) <= 0) {
    player.statuses.mimiMode = "star";
    const character = characterLibrary.trickster1;
    player.icon = character?.iconImage || character?.icon || player.icon;
    showSkillActivationBanner(player, "Star Mode");
    log(`${player.name} returned to Star Mode.`, true);
    renderAll();
  }
}

function cleanupExpiredVisualEffects(now = performance.now()) {
  state.mimiGamblerRipples = (state.mimiGamblerRipples || []).filter((entry) => entry.expiresAt > now);
  state.brakkExplosionEffects = (state.brakkExplosionEffects || []).filter((entry) => entry.expiresAt > now);
  state.brakkMissileEffects = (state.brakkMissileEffects || []).filter((entry) => entry.expiresAt > now);
  state.rascaTailImpactEffects = (state.rascaTailImpactEffects || []).filter((entry) => entry.expiresAt > now);
  state.veskaThreadEffects = (state.veskaThreadEffects || []).filter((entry) => entry.expiresAt > now);
  state.statLossPopups = (state.statLossPopups || []).filter((entry) => !entry.expiresAt || entry.expiresAt > now);
  state.pipPopcornEffects = (state.pipPopcornEffects || []).filter((entry) => !entry.expiresAt || entry.expiresAt > now);
  state.damageTextPopups = (state.damageTextPopups || []).filter((entry) => !entry.expiresAt || entry.expiresAt > now);
  state.territoryPointPopups = (state.territoryPointPopups || []).filter((entry) => !entry.expiresAt || entry.expiresAt > now);
}

function triggerPipPopcornEffect(player, variant = "passive") {
  if (!player?.id) return;
  const now = performance.now();
  const effectId = nextId("pippopcorn");
  cleanupExpiredVisualEffects(now);
  state.pipPopcornEffects = (state.pipPopcornEffects || []).filter((entry) => !(entry.playerId === player.id && entry.variant === variant));
  state.pipPopcornEffects.push({
    id: effectId,
    playerId: player.id,
    variant,
    createdAt: now,
    expiresAt: now + 1000
  });
  renderAll();
  setTimeout(() => {
    state.pipPopcornEffects = state.pipPopcornEffects.filter((entry) => entry.id !== effectId);
    renderAll();
  }, 1000);
}

function getActivePipPopcornEffects(player) {
  if (!player?.id) return [];
  const now = performance.now();
  return (state.pipPopcornEffects || []).filter((entry) => entry.playerId === player.id && (!entry.expiresAt || entry.expiresAt > now));
}

function buildPipPopcornEffectHtml(player) {
  const effects = getActivePipPopcornEffects(player);
  if (!effects.length) return "";
  return `
    <div class="pipPopcornEffects" aria-hidden="true">
      ${effects.map((entry, index) => `<span class="pipPopcornKernel pipPopcornKernel--${sanitize(entry.variant || "passive")}" style="--pip-popcorn-index:${index};"></span>`).join("")}
    </div>
  `;
}

function triggerMimiGamblerRipple(player) {
  if (!player || player.activeCharacterId !== "trickster1") return;
  const now = performance.now();
  const rippleId = nextId("mimiripple");
  cleanupExpiredVisualEffects(now);
  state.mimiGamblerRipples = (state.mimiGamblerRipples || []).filter((entry) => entry.playerId !== player.id);
  state.mimiGamblerRipples.push({
    id: rippleId,
    playerId: player.id,
    createdAt: now,
    expiresAt: now + 1000
  });
  setTimeout(() => {
    state.mimiGamblerRipples = state.mimiGamblerRipples.filter((entry) => entry.id !== rippleId);
  }, 1000);
}

function hasActiveMimiGamblerRipple(player) {
  if (!player) return false;
  const now = performance.now();
  return (state.mimiGamblerRipples || []).some((entry) => entry.playerId === player.id && entry.expiresAt > now);
}

function buildMimiGamblerRippleHtml(player) {
  if (!hasActiveMimiGamblerRipple(player)) return "";
  return `
    <div class="mimiGamblerRipple" aria-hidden="true">
      <span class="mimiGamblerRippleRing"></span>
      <span class="mimiGamblerRippleCoin coin-a">🪙</span>
      <span class="mimiGamblerRippleCoin coin-b">🪙</span>
      <span class="mimiGamblerRippleCoin coin-c">🪙</span>
      <span class="mimiGamblerRippleCoin coin-d">🪙</span>
      <span class="mimiGamblerRippleCoin coin-e">🪙</span>
    </div>
  `;
}

function triggerBrakkExplosionEffect(player) {
  if (!player || player.activeCharacterId !== "painter3") return;
  const now = performance.now();
  const effectId = nextId("brakkboom");
  cleanupExpiredVisualEffects(now);
  state.brakkExplosionEffects = (state.brakkExplosionEffects || []).filter((entry) => entry.playerId !== player.id);
  state.brakkExplosionEffects.push({
    id: effectId,
    playerId: player.id,
    createdAt: now,
    expiresAt: now + 1000
  });
  setTimeout(() => {
    state.brakkExplosionEffects = state.brakkExplosionEffects.filter((entry) => entry.id !== effectId);
  }, 1000);
}

function hasActiveBrakkExplosionEffect(player) {
  if (!player) return false;
  const now = performance.now();
  return (state.brakkExplosionEffects || []).some((entry) => entry.playerId === player.id && entry.expiresAt > now);
}

function buildBrakkExplosionEffectHtml(player) {
  if (!hasActiveBrakkExplosionEffect(player)) return "";
  return `
    <div class="brakkExplosionEffect" aria-hidden="true">
      <span class="brakkExplosionShockwave"></span>
      <span class="brakkExplosionCore">💣</span>
      <span class="brakkExplosionBlast blast-a"></span>
      <span class="brakkExplosionBlast blast-b"></span>
      <span class="brakkExplosionBlast blast-c"></span>
      <span class="brakkExplosionBlast blast-d"></span>
      <span class="brakkExplosionPaint paint-a"></span>
      <span class="brakkExplosionPaint paint-b"></span>
      <span class="brakkExplosionPaint paint-c"></span>
      <span class="brakkExplosionPaint paint-d"></span>
      <span class="brakkExplosionPaint paint-e"></span>
    </div>
  `;
}

function triggerBrakkMissileEffects(points) {
  const validPoints = (Array.isArray(points) ? points : [])
    .map((point) => ({ row: Number(point?.row), col: Number(point?.col) }))
    .filter((point) => Number.isInteger(point.row) && Number.isInteger(point.col) && !!getCell(point.row, point.col));
  if (!validPoints.length) return;
  const now = performance.now();
  const effectId = nextId("brakkmissiles");
  cleanupExpiredVisualEffects(now);
  state.brakkMissileEffects.push({
    id: effectId,
    points: validPoints,
    createdAt: now,
    expiresAt: now + 1000
  });
  setTimeout(() => {
    state.brakkMissileEffects = state.brakkMissileEffects.filter((entry) => entry.id !== effectId);
  }, 1000);
}

function hasActiveBrakkMissileEffect(row, col) {
  const now = performance.now();
  return (state.brakkMissileEffects || []).some((entry) => (
    entry.expiresAt > now
    && Array.isArray(entry.points)
    && entry.points.some((point) => point.row === row && point.col === col)
  ));
}

function buildBrakkMissileEffectHtml(row, col) {
  if (!hasActiveBrakkMissileEffect(row, col)) return "";
  const delayMs = Math.abs((row * 37 + col * 23) % 160);
  return `
    <span class="brakkMissileStrike" style="--brakk-missile-delay:${delayMs}ms;" aria-hidden="true">
      <span class="brakkMissileShell">💧</span>
      <span class="brakkMissileSplash splash-a"></span>
      <span class="brakkMissileSplash splash-b"></span>
      <span class="brakkMissileSplash splash-c"></span>
    </span>
  `;
}

function triggerRascaTailImpactEffects(points) {
  const validPoints = (Array.isArray(points) ? points : [])
    .map((point) => ({ row: Number(point?.row), col: Number(point?.col) }))
    .filter((point) => Number.isInteger(point.row) && Number.isInteger(point.col) && !!getCell(point.row, point.col));
  if (!validPoints.length) return;
  const deduped = [];
  const seen = new Set();
  validPoints.forEach((point) => {
    const key = `${point.row},${point.col}`;
    if (seen.has(key)) return;
    seen.add(key);
    deduped.push(point);
  });
  const now = performance.now();
  const effectId = nextId("rascaimpact");
  cleanupExpiredVisualEffects(now);
  state.rascaTailImpactEffects.push({
    id: effectId,
    points: deduped,
    createdAt: now,
    expiresAt: now + 1000
  });
  setTimeout(() => {
    state.rascaTailImpactEffects = state.rascaTailImpactEffects.filter((entry) => entry.id !== effectId);
  }, 1000);
}

function hasActiveRascaTailImpactEffect(row, col) {
  const now = performance.now();
  return (state.rascaTailImpactEffects || []).some((entry) => (
    entry.expiresAt > now
    && Array.isArray(entry.points)
    && entry.points.some((point) => point.row === row && point.col === col)
  ));
}

function buildRascaTailImpactEffectHtml(row, col) {
  if (!hasActiveRascaTailImpactEffect(row, col)) return "";
  const delayMs = Math.abs((row * 41 + col * 29) % 120);
  return `
    <span class="rascaTailImpactEffect" style="--rasca-impact-delay:${delayMs}ms;" aria-hidden="true">
      <span class="rascaTailImpactGear gear-a">⚙</span>
      <span class="rascaTailImpactGear gear-b">⚙</span>
      <span class="rascaTailImpactSpark spark-a"></span>
      <span class="rascaTailImpactSpark spark-b"></span>
      <span class="rascaTailImpactSpark spark-c"></span>
      <span class="rascaTailImpactCore"></span>
    </span>
  `;
}

function triggerVeskaThreadEffects(ownerIndex) {
  const owner = state.players[ownerIndex];
  if (!owner || owner.activeCharacterId !== "trapper3") return;
  const points = getPlayableBoardCells()
    .filter((cell) => cell && cell.owner !== null && isFriendlyOwner(cell.owner, ownerIndex))
    .map((cell) => ({ row: cell.row, col: cell.col }));
  if (!points.length) return;
  const now = performance.now();
  const effectId = nextId("veskathread");
  cleanupExpiredVisualEffects(now);
  state.veskaThreadEffects.push({
    id: effectId,
    ownerIndex,
    points,
    createdAt: now,
    expiresAt: now + 1000
  });
  setTimeout(() => {
    state.veskaThreadEffects = state.veskaThreadEffects.filter((entry) => entry.id !== effectId);
  }, 1000);
}

function hasActiveVeskaThreadEffect(row, col) {
  const now = performance.now();
  return (state.veskaThreadEffects || []).some((entry) => (
    entry.expiresAt > now
    && Array.isArray(entry.points)
    && entry.points.some((point) => point.row === row && point.col === col)
  ));
}

function buildVeskaThreadEffectHtml(row, col) {
  if (!hasActiveVeskaThreadEffect(row, col)) return "";
  const delayMs = Math.abs((row * 31 + col * 47) % 180);
  return `
    <span class="veskaThreadEffect" style="--veska-thread-delay:${delayMs}ms;" aria-hidden="true">
      <span class="veskaThread strand-a"></span>
      <span class="veskaThread strand-b"></span>
      <span class="veskaThread strand-c"></span>
      <span class="veskaThread strand-d"></span>
      <span class="veskaThreadGlow"></span>
      <span class="veskaThreadDroplet drop-a"></span>
      <span class="veskaThreadDroplet drop-b"></span>
    </span>
  `;
}

function getVictoryBonusPoints(player) {
  return Math.floor(Math.max(0, Number(player?.battleWins) || 0) * 3);
}

function getRoyalMarchBonusPoints(player) {
  return isRoyalMarchMapActive() ? Math.max(0, Number(player?.royalBonusPoints) || 0) : 0;
}

function awardRoyalMarchKingDefeatBonus(receiver, defeatedKing, reason = "king defeat") {
  if (!isRoyalMarchMapActive() || !receiver || !defeatedKing || !isRoyalMarchKing(defeatedKing)) return 0;
  receiver.royalBonusPoints = Math.max(0, Number(receiver.royalBonusPoints) || 0) + 3;
  log(`${receiver.name} gained +3 royal bonus for ${reason}.`, true);
  return 3;
}

function getRoyalMarchTeamKing(teamKey) {
  if (!isRoyalMarchMapActive()) return null;
  return state.players.find((player, index) => normalizeTeamKey(player.teamKey, index) === teamKey && isRoyalMarchKing(player)) || null;
}

function getDisplayedBonusPoints(player) {
  return Math.max(0, Number(player?.flagPoints) || 0) + getVictoryBonusPoints(player) + getRoyalMarchBonusPoints(player);
}

function playerHasFlag(player) {
  return !!(player && (player.ownedFlag || Math.max(0, Number(player.flagPoints) || 0) > 0));
}

function dropFlagAtPlayerPosition(player, reasonText = null) {
  if (!playerHasFlag(player) || !player?.position) return false;
  const cell = getCell(player.position.row, player.position.col);
  if (!cell) return false;
  player.ownedFlag = false;
  player.flagPoints = 0;
  cell.groundItem = { id: "flag", name: itemDefinitions.flag.shortName, icon: itemDefinitions.flag.icon };
  if (reasonText) log(reasonText, true);
  return true;
}

function transferFlagToPlayer(winner, loser, reason = 'captured') {
  if (!winner || !loser || !playerHasFlag(loser)) return false;
  state.players.forEach((other) => {
    if (!other) return;
    other.ownedFlag = false;
    other.flagPoints = 0;
  });
  winner.ownedFlag = true;
  winner.flagPoints = getCurrentMapFlagBonus();
  loser.ownedFlag = false;
  loser.flagPoints = 0;
  showFlagCaptureBanner(winner.name);
  log(`${winner.name} ${reason === 'stole' ? 'stole' : 'captured'} the flag.`, true);
  return true;
}

function getPlayerCurrentScore(playerIndex) {
  const player = state.players?.[playerIndex];
  if (!player) return 0;
  return getOwnedTileCount(playerIndex) + getDisplayedBonusPoints(player) + getCaptureTerritoryPointsForPlayer(playerIndex);
}

function isAlliedStartTileForPlayer(player, row, col) {
  const cell = getCell(row, col);
  const playerIndex = state.players.indexOf(player);
  return !!(cell && playerIndex >= 0 && cell.startOwner !== null && isFriendlyOwner(cell.startOwner, playerIndex));
}

function maybeFinishFlagDelivery(player) {
  if (!doesCurrentMapUseFlagDeliveryWin() || !playerHasFlag(player) || !player?.position) return false;
  if (!isAlliedStartTileForPlayer(player, player.position.row, player.position.col)) return false;
  finishGame({
    type: 'flag-delivery',
    winnerPlayerIndex: state.players.indexOf(player),
    winnerTeamKey: normalizeTeamKey(player.teamKey, state.players.indexOf(player))
  });
  return true;
}

function getControlAreaCells(area = getCurrentMapControlArea()) {
  if (!area) return [];
  const cells = [];
  for (let row = area.rowStart; row <= area.rowEnd; row += 1) {
    for (let col = area.colStart; col <= area.colEnd; col += 1) {
      const cell = getCell(row, col);
      if (cell?.playable) cells.push(cell);
    }
  }
  return cells;
}

function isCellInControlArea(cell, area = getCurrentMapControlArea()) {
  return !!(cell && area
    && cell.row >= area.rowStart && cell.row <= area.rowEnd
    && cell.col >= area.colStart && cell.col <= area.colEnd);
}

function getControlAreaOwnerKeyForCell(cell) {
  if (!cell || cell.owner === null || cell.owner === undefined) return null;
  return isTeamModeEnabled() ? normalizeTeamKey(state.players[cell.owner]?.teamKey, cell.owner) : `player:${cell.owner}`;
}

function maybeFinishControlAreaWin() {
  if (!doesCurrentMapUseControlAreaWin()) return false;
  const cells = getControlAreaCells();
  if (!cells.length) return false;
  const firstKey = getControlAreaOwnerKeyForCell(cells[0]);
  if (!firstKey) return false;
  const allOwnedBySameSide = cells.every((cell) => getControlAreaOwnerKeyForCell(cell) === firstKey);
  if (!allOwnedBySameSide) return false;
  const winnerPlayerIndex = firstKey.startsWith("player:")
    ? Number(firstKey.split(":")[1])
    : state.players.findIndex((player, index) => normalizeTeamKey(player?.teamKey, index) === firstKey);
  finishGame({
    type: "control-area",
    winnerPlayerIndex,
    winnerTeamKey: firstKey.startsWith("player:") ? normalizeTeamKey(state.players[winnerPlayerIndex]?.teamKey, winnerPlayerIndex) : firstKey
  });
  return true;
}

function getRoyalMarchGoalRowForTeam(teamKey) {
  const normalized = normalizeTeamKey(teamKey);
  if (normalized === "red") return getBoardRows() - 1;
  if (normalized === "blue") return 0;
  return null;
}

function isRoyalMarchEnemyBackRankTile(playerIndex, row, col) {
  if (!isRoyalMarchMapActive()) return false;
  const player = state.players?.[playerIndex];
  if (!player || !Number.isInteger(row) || !Number.isInteger(col)) return false;
  const goalRow = getRoyalMarchGoalRowForTeam(player.teamKey);
  return goalRow !== null && row === goalRow && col >= 0 && col < getBoardCols();
}

function maybeFinishRoyalMarchKingGoalAtRoundEnd() {
  if (!isRoyalMarchMapActive()) return false;
  const winnerIndex = state.players.findIndex((player, index) => (
    isRoyalMarchKing(player)
    && player?.position
    && isRoyalMarchEnemyBackRankTile(index, player.position.row, player.position.col)
  ));
  if (winnerIndex < 0) return false;
  const winner = state.players[winnerIndex];
  finishGame({
    type: "royal-march-king-goal",
    winnerPlayerIndex: winnerIndex,
    winnerTeamKey: normalizeTeamKey(winner.teamKey, winnerIndex)
  });
  return true;
}

function getAlliedStartTiles(player) {
  const playerIndex = state.players.indexOf(player);
  if (playerIndex < 0) return [];
  return getPlayableBoardCells().filter((cell) => cell.startOwner !== null && isFriendlyOwner(cell.startOwner, playerIndex));
}

function getDistanceToNearestAlliedStart(player, point) {
  const starts = getAlliedStartTiles(player);
  if (!starts.length || !point) return Number.POSITIVE_INFINITY;
  return starts.reduce((best, cell) => Math.min(best, Math.abs(cell.row - point.row) + Math.abs(cell.col - point.col)), Number.POSITIVE_INFINITY);
}

function getLeadingPlayerIndexes() {
  const scores = state.players.map((_, index) => getPlayerCurrentScore(index));
  const maxScore = scores.length ? Math.max(...scores) : 0;
  if (!scores.length) return [];
  return scores.reduce((leaders, score, index) => {
    if (score === maxScore) leaders.push(index);
    return leaders;
  }, []);
}

function getCellPlayersInRange(centerRow, centerCol, radius = 1) {
  return state.players.filter((player) => {
    if (!player.position) return false;
    return Math.abs(player.position.row - centerRow) <= radius && Math.abs(player.position.col - centerCol) <= radius;
  });
}

function randomChoice(values) {
  if (!values.length) return null;
  return values[randomInt(0, values.length - 1)];
}

function statLabel(key) {
  return key === "attack" ? "Attack" : key === "hp" ? "HP" : "Technique";
}

function statEnglishLabel(key) {
  return key === "attack" ? "attack" : key === "hp" ? "HP" : "technique";
}

function queueStatPopup(player, items, kind = "loss") {
  if (!player || !Array.isArray(items) || !items.length) return;
  const filtered = items
    .map((item) => ({
      statKey: item.statKey,
      amount: Math.max(0, Number(item.amount) || 0),
      kind,
      shakeX: kind === "loss" ? randomInt(-7, 7) : 0,
      shakeY: kind === "loss" ? randomInt(-6, 6) : 0
    }))
    .filter((item) => item.amount > 0);
  if (!filtered.length) return;

  const now = performance.now();
  const popupDurationMs = 1600;
  let popup = state.statLossPopups.find((entry) => entry.playerId === player.id) || null;
  if (popup) {
    popup.items = [...popup.items, ...filtered];
    popup.createdAt = now;
    popup.expiresAt = now + popupDurationMs;
  } else {
    const popupId = nextId(kind === "gain" ? "statgain" : kind === "capgain" ? "statcap" : "statloss");
    popup = {
      id: popupId,
      playerId: player.id,
      createdAt: now,
      expiresAt: now + popupDurationMs,
      items: filtered
    };
    state.statLossPopups.push(popup);
  }
  renderAll();
  const scheduledPopupId = popup.id;
  const scheduledExpiresAt = popup.expiresAt;
  setTimeout(() => {
    state.statLossPopups = state.statLossPopups.filter((entry) => !(entry.id === scheduledPopupId && entry.expiresAt === scheduledExpiresAt));
  }, popupDurationMs);
}

function queueStatLossPopup(player, lossItems) {
  queueStatPopup(player, lossItems, "loss");
}

function hasActiveLossPopupForStat(player, statKey) {
  const popup = getActiveStatLossPopup(player?.id);
  if (!popup || !Array.isArray(popup.items)) return false;
  return popup.items.some((item) => item.kind === "loss" && item.statKey === statKey && (Number(item.amount) || 0) > 0);
}

function queueStatGainPopup(player, gainItems) {
  queueStatPopup(player, gainItems, "gain");
}

function queueCoinGainPopup(player, amount) {
  queueStatPopup(player, [{ statKey: "coin", amount }], "gain");
}

function queueStatMaxGainPopup(player, gainItems) {
  queueStatPopup(player, gainItems, "capgain");
}

function getActiveStatLossPopup(playerId) {
  const now = performance.now();
  return (state.statLossPopups || []).find((entry) => entry.playerId === playerId && (!entry.expiresAt || entry.expiresAt > now)) || null;
}

function buildStatLossPopupHtml(player) {
  const popup = getActiveStatLossPopup(player.id);
  if (!popup) return "";
  const animationDurationMs = 1450;
  const elapsedMs = Math.max(0, Math.min(animationDurationMs, Math.floor(performance.now() - (popup.createdAt || performance.now()))));
  return `
    <div class="avatarStatLossStack" aria-hidden="true">
      ${popup.items.map((item, index) => {
        const sign = item.kind === "gain" || item.kind === "capgain" ? "+" : "-";
        const lineClass = item.kind === "gain"
          ? "avatarStatLossLine gain"
          : item.kind === "capgain"
            ? "avatarStatLossLine capgain"
            : "avatarStatLossLine loss";
        return `
          <div
            class="${lineClass}"
            style="--loss-index:${index}; --loss-shake-x:${item.shakeX}px; --loss-shake-y:${item.shakeY}px; animation-delay:-${elapsedMs}ms;"
          >${sign}${item.amount}${item.statKey === "coin" ? "🪙" : sanitize(getStatIcon(item.statKey))}</div>
        `;
      }).join("")}
    </div>
  `;
}

function getDamagePopupBaseTransform(entry) {
  const centerX = entry.col * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  const centerY = entry.row * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  const z = entry.target === "player" ? 52 : 42;
  return `translate3d(${centerX}px, ${centerY}px, ${z}px)`;
}

function queueBoardDamageText(row, col, amount, target = "obstacle") {
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (safeAmount <= 0) return;
  const popupId = nextId("boarddmg");
  const now = performance.now();
  state.damageTextPopups.push({
    id: popupId,
    row,
    col,
    amount: safeAmount,
    target,
    createdAt: now,
    expiresAt: now + 1150
  });
  renderAll();
  setTimeout(() => {
    state.damageTextPopups = state.damageTextPopups.filter((entry) => entry.id !== popupId);
    renderAll();
  }, 1150);
}

function renderBoardDamageTextPopups() {
  if (!ui.board3d) return;
  state.damageTextElements.clear();
  state.damageTextPopups.forEach((entry) => {
    const floater = document.createElement("div");
    floater.className = `damageTextBillboard damageTextBillboard--${entry.target}`;
    floater.style.transform = getDamagePopupBaseTransform(entry);
    floater.innerHTML = `<div class="damageTextFacing"><span class="damageTextLine">-${entry.amount}</span></div>`;
    ui.board3d.appendChild(floater);
    state.damageTextElements.add(floater);
  });
}

function getTerritoryPointPopupBaseTransform(entry) {
  const centerX = entry.col * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  const centerY = entry.row * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  return `translate3d(${centerX}px, ${centerY}px, 58px)`;
}

function queueTerritoryPointPopup(territory, scoreKey, amount) {
  if (!territory || !scoreKey || !Number.isFinite(amount) || amount <= 0) return;
  const bounds = getTerritoryBounds(territory);
  if (!bounds) return;
  const popupId = nextId('territorypts');
  const now = performance.now();
  state.territoryPointPopups.push({
    id: popupId,
    row: bounds.centerRow,
    col: bounds.centerCol,
    amount,
    accent: getCaptureTerritoryAccent(scoreKey),
    createdAt: now,
    expiresAt: now + 4200
  });
  renderAll();
  setTimeout(() => {
    state.territoryPointPopups = state.territoryPointPopups.filter((entry) => entry.id !== popupId);
    renderAll();
  }, 4200);
}

function renderTerritoryPointPopups() {
  if (!ui.board3d) return;
  state.territoryPointTextElements.clear();
  const now = performance.now();
  (state.territoryPointPopups || []).filter((entry) => !entry.expiresAt || entry.expiresAt > now).forEach((entry) => {
    const elapsedMs = Math.max(0, now - entry.createdAt);
    const floater = document.createElement('div');
    floater.className = 'territoryPointTextBillboard';
    floater.style.transform = getTerritoryPointPopupBaseTransform(entry);
    floater.innerHTML = `<div class="territoryPointTextFacing"><span class="territoryPointTextLine" style="--territory-point-accent:${sanitize(entry.accent)}; animation-delay:-${elapsedMs}ms;">+${entry.amount}</span></div>`;
    ui.board3d.appendChild(floater);
    state.territoryPointTextElements.add(floater);
  });
}

function showFlagCaptureBanner(playerName) {
  if (!ui.flagCaptureBanner) return;
  if (state.flagCaptureAnimationTimeout) {
    clearTimeout(state.flagCaptureAnimationTimeout);
    state.flagCaptureAnimationTimeout = null;
  }
  ui.flagCaptureBanner.innerHTML = `<span class="flagCaptureBannerPlayer">${sanitize(playerName)}</span><br>has captured the flag!`;
  ui.flagCaptureBanner.classList.remove("play");
  void ui.flagCaptureBanner.offsetWidth;
  ui.flagCaptureBanner.classList.add("play");
  state.flagCaptureAnimationTimeout = setTimeout(() => {
    ui.flagCaptureBanner.classList.remove("play");
    state.flagCaptureAnimationTimeout = null;
  }, 2200);
}


function playFlagCaptureBanner(playerName) {
  showFlagCaptureBanner(playerName);
}

function getBoardPixelPoint(row, col) {
  const x = col * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  const y = row * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  return { x, y };
}

function ensureTopPlayerEventBannerElement() {
  if (ui.powerShardPickupBanner) return ui.powerShardPickupBanner;
  const targetRoot = document.getElementById('gameScreen') || document.body;
  if (!targetRoot) return null;
  const banner = document.createElement('div');
  banner.id = 'powerShardPickupBanner';
  banner.className = 'powerShardPickupBanner';
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-atomic', 'true');
  targetRoot.appendChild(banner);
  ui.powerShardPickupBanner = banner;
  return banner;
}

function showTopPlayerEventBanner(player, text) {
  const banner = ensureTopPlayerEventBannerElement();
  if (!banner || !player || !text) return;
  if (state.powerShardPickupBannerTimeout) {
    clearTimeout(state.powerShardPickupBannerTimeout);
    state.powerShardPickupBannerTimeout = null;
  }
  banner.innerHTML = `
    <div class="powerShardPickupBannerInner">
      <div class="powerShardPickupBannerIcon">${getPlayerCharacterIconMarkup(player, "characterIconAsset--banner")}</div>
      <div class="powerShardPickupBannerText">${text}</div>
    </div>
  `;
  banner.classList.remove('play');
  void banner.offsetWidth;
  banner.classList.add('play');
  state.powerShardPickupBannerTimeout = setTimeout(() => {
    banner.classList.remove('play');
    state.powerShardPickupBannerTimeout = null;
  }, 2600);
}

function showPowerShardPickupBanner(player) {
  if (!player) return;
  showTopPlayerEventBanner(player, `${sanitize(player.name)} picked up a Power Shard.`);
}

function animatePowerShardDrop(row, col) {
  return new Promise((resolve) => {
    if (!ui.board3d) {
      resolve();
      return;
    }
    const point = getBoardPixelPoint(row, col);
    const shard = document.createElement('div');
    shard.className = 'powerShardAnim powerShardAnim--drop';
    shard.innerHTML = '<span class="powerShardAnimInner">💪</span>';
    shard.style.left = `${point.x}px`;
    shard.style.top = `${point.y}px`;
    ui.board3d.appendChild(shard);
    requestAnimationFrame(() => {
      shard.classList.add('is-play');
    });
    const finish = () => {
      shard.removeEventListener('animationend', finish);
      shard.remove();
      resolve();
    };
    shard.addEventListener('animationend', finish);
  });
}

function animatePowerShardCollect(row, col, player) {
  return new Promise((resolve) => {
    if (!ui.board3d || !player?.position) {
      resolve();
      return;
    }
    const startPoint = getBoardPixelPoint(row, col);
    const endPoint = getBoardPixelPoint(player.position.row, player.position.col);
    const shard = document.createElement('div');
    shard.className = 'powerShardAnim powerShardAnim--collect';
    shard.innerHTML = '<span class="powerShardAnimInner">💪</span>';
    shard.style.left = `${startPoint.x}px`;
    shard.style.top = `${startPoint.y}px`;
    shard.style.setProperty('--collect-x', `${endPoint.x - startPoint.x}px`);
    shard.style.setProperty('--collect-y', `${endPoint.y - startPoint.y - 42}px`);
    ui.board3d.appendChild(shard);
    requestAnimationFrame(() => {
      shard.classList.add('is-play');
    });
    const finish = () => {
      shard.removeEventListener('animationend', finish);
      shard.remove();
      resolve();
    };
    shard.addEventListener('animationend', finish);
  });
}

function getPlayerAccentColor(playerOrIndex) {
  const playerIndex = typeof playerOrIndex === "number" ? playerOrIndex : state.players.indexOf(playerOrIndex);
  const rootStyles = getComputedStyle(document.documentElement);
  const variableNames = ["--p1", "--p2", "--p3", "--p4", "--p5", "--p6", "--p7", "--p8"];
  const fallbackColors = ["#53d7ff", "#ff7f7f", "#ffd166", "#5dd39e", "#ff8fcb", "#b686ff", "#8B5A2B", "#00E5FF"];
  const normalizedIndex = ((playerIndex % variableNames.length) + variableNames.length) % variableNames.length;
  const variableName = variableNames[normalizedIndex];
  return rootStyles.getPropertyValue(variableName).trim() || fallbackColors[normalizedIndex] || fallbackColors[0];
}

function parseCssColor(colorValue) {
  if (typeof colorValue !== "string") return null;
  const trimmed = colorValue.trim();
  if (!trimmed) return null;
  const hex = trimmed.match(/^#([0-9a-fA-F]{3,8})$/);
  if (hex) {
    const raw = hex[1];
    if (raw.length === 3 || raw.length === 4) {
      return {
        r: Number.parseInt(raw[0] + raw[0], 16),
        g: Number.parseInt(raw[1] + raw[1], 16),
        b: Number.parseInt(raw[2] + raw[2], 16)
      };
    }
    if (raw.length >= 6) {
      return {
        r: Number.parseInt(raw.slice(0, 2), 16),
        g: Number.parseInt(raw.slice(2, 4), 16),
        b: Number.parseInt(raw.slice(4, 6), 16)
      };
    }
  }
  const rgb = trimmed.match(/^rgba?\(([^\)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(',').map((part) => Number.parseFloat(part.trim()));
    if (parts.length >= 3 && parts.slice(0, 3).every((value) => Number.isFinite(value))) {
      return {
        r: Math.max(0, Math.min(255, parts[0])),
        g: Math.max(0, Math.min(255, parts[1])),
        b: Math.max(0, Math.min(255, parts[2]))
      };
    }
  }
  return null;
}

function rgbToCss(rgb, alpha = 1) {
  if (!rgb) return `rgba(126, 220, 117, ${alpha})`;
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(Number(value) || 0)));
  return `rgba(${clamp(rgb.r)}, ${clamp(rgb.g)}, ${clamp(rgb.b)}, ${alpha})`;
}

function mixRgb(baseRgb, targetRgb, ratio = 0.5) {
  const safeBase = baseRgb || { r: 126, g: 220, b: 117 };
  const safeTarget = targetRgb || { r: 12, g: 18, b: 28 };
  const weight = Math.max(0, Math.min(1, Number(ratio) || 0));
  return {
    r: safeBase.r * (1 - weight) + safeTarget.r * weight,
    g: safeBase.g * (1 - weight) + safeTarget.g * weight,
    b: safeBase.b * (1 - weight) + safeTarget.b * weight
  };
}

function getPlayerPaintSolidColor(playerOrIndex) {
  return extractSolidColorFromGradient(getTileGradientForPlayer(playerOrIndex, 'solid'), getPlayerAccentColor(playerOrIndex));
}

function getBattlePalette(playerOrIndex) {
  const accent = getPlayerPaintSolidColor(playerOrIndex);
  const rgb = parseCssColor(accent) || { r: 126, g: 220, b: 117 };
  return {
    accent,
    border: rgbToCss(rgb, 0.82),
    glow: rgbToCss(rgb, 0.34),
    soft: rgbToCss(rgb, 0.16),
    softChooser: rgbToCss(rgb, 0.24),
    radial: rgbToCss(rgb, 0.18),
    bgA: rgbToCss(mixRgb(rgb, { r: 18, g: 24, b: 38 }, 0.56), 0.94),
    bgB: rgbToCss(mixRgb(rgb, { r: 8, g: 12, b: 22 }, 0.82), 0.98)
  };
}

function buildBattlePanelStyle(playerOrIndex, panelRole = 'left', chooser = false) {
  const palette = getBattlePalette(playerOrIndex);
  const radialX = panelRole === 'right' ? '78%' : '20%';
  const angle = panelRole === 'right' ? '315deg' : '135deg';
  return `--battle-accent:${palette.accent};--battle-border:${palette.border};--battle-glow:${palette.glow};--battle-soft:${chooser ? palette.softChooser : palette.soft};--battle-radial:${palette.radial};--battle-bg-a:${palette.bgA};--battle-bg-b:${palette.bgB};--battle-radial-x:${radialX};--battle-angle:${angle};`;
}

function buildBattleChoicePanelStyle(playerOrIndex, panelRole = 'left', chooser = false) {
  if (chooser) return buildBattlePanelStyle(playerOrIndex, panelRole, true);
  const radialX = panelRole === 'right' ? '78%' : '20%';
  const angle = panelRole === 'right' ? '315deg' : '135deg';
  return `--battle-accent:rgba(244,248,255,0.96);--battle-border:rgba(255,255,255,0.58);--battle-glow:rgba(255,255,255,0.28);--battle-soft:rgba(255,255,255,0.12);--battle-radial:rgba(255,255,255,0.2);--battle-bg-a:rgba(242,246,255,0.94);--battle-bg-b:rgba(188,199,219,0.94);--battle-radial-x:${radialX};--battle-angle:${angle};`;
}

function buildBattleLayoutStyle(leftPlayer, rightPlayer) {
  return `--battle-divider-left:${getBattlePalette(leftPlayer).accent};--battle-divider-right:${getBattlePalette(rightPlayer).accent};`;
}

function buildSevenSegmentCounterStyle(playerIndex) {
  const accent = getPlayerPaintSolidColor(playerIndex);
  const rgb = parseCssColor(accent) || { r: 126, g: 220, b: 117 };
  const background = rgbToCss(mixRgb(rgb, { r: 10, g: 14, b: 26 }, 0.72), 0.78);
  const glow = rgbToCss(rgb, 0.34);
  return `--seg-color:${accent};--seg-bg:${background};--counter-glow:${glow};`;
}

const TEAM_TILE_GRADIENTS = {
  red: {
    solid: 'linear-gradient(135deg, rgba(255, 118, 118, 0.95), rgba(184, 52, 67, 0.94))',
    preview: 'linear-gradient(135deg, rgba(255, 118, 118, 0.72), rgba(184, 52, 67, 0.66))'
  },
  blue: {
    solid: 'linear-gradient(135deg, rgba(124, 195, 255, 0.96), rgba(53, 109, 220, 0.92))',
    preview: 'linear-gradient(135deg, rgba(124, 195, 255, 0.72), rgba(53, 109, 220, 0.66))'
  },
  yellow: {
    solid: 'linear-gradient(135deg, rgba(255, 218, 114, 0.96), rgba(219, 153, 47, 0.92))',
    preview: 'linear-gradient(135deg, rgba(255, 218, 114, 0.72), rgba(219, 153, 47, 0.66))'
  },
  green: {
    solid: 'linear-gradient(135deg, rgba(119, 223, 164, 0.96), rgba(34, 151, 102, 0.92))',
    preview: 'linear-gradient(135deg, rgba(119, 223, 164, 0.72), rgba(34, 151, 102, 0.66))'
  },
  pink: {
    solid: 'linear-gradient(135deg, rgba(255, 173, 219, 0.96), rgba(216, 82, 160, 0.92))',
    preview: 'linear-gradient(135deg, rgba(255, 173, 219, 0.72), rgba(216, 82, 160, 0.66))'
  },
  purple: {
    solid: 'linear-gradient(135deg, rgba(194, 151, 255, 0.96), rgba(115, 66, 221, 0.92))',
    preview: 'linear-gradient(135deg, rgba(194, 151, 255, 0.72), rgba(115, 66, 221, 0.66))'
  },
  brown: {
    solid: 'linear-gradient(135deg, rgba(176, 119, 77, 0.96), rgba(107, 63, 32, 0.92))',
    preview: 'linear-gradient(135deg, rgba(176, 119, 77, 0.72), rgba(107, 63, 32, 0.66))'
  },
  cyan: {
    solid: 'linear-gradient(135deg, rgba(108, 247, 255, 0.96), rgba(0, 173, 199, 0.92))',
    preview: 'linear-gradient(135deg, rgba(108, 247, 255, 0.72), rgba(0, 173, 199, 0.66))'
  }
};

function getPlayerTeamKey(playerOrIndex) {
  const player = typeof playerOrIndex === 'number' ? state.players?.[playerOrIndex] : playerOrIndex;
  return normalizeTeamKey(player?.teamKey, typeof playerOrIndex === 'number' ? playerOrIndex : Math.max(0, state.players.indexOf(player)));
}

function getTileGradientForPlayer(playerOrIndex, variant = 'solid') {
  if (isTeamModeEnabled()) {
    const teamKey = getPlayerTeamKey(playerOrIndex);
    const palette = TEAM_TILE_GRADIENTS[teamKey] || TEAM_TILE_GRADIENTS.red;
    return palette[variant] || palette.solid;
  }
  const playerIndex = typeof playerOrIndex === 'number' ? playerOrIndex : state.players.indexOf(playerOrIndex);
  const fallback = {
    0: { solid: 'linear-gradient(135deg, rgba(124, 195, 255, 0.96), rgba(53, 109, 220, 0.92))', preview: 'linear-gradient(135deg, rgba(124, 195, 255, 0.72), rgba(53, 109, 220, 0.66))' },
    1: { solid: 'linear-gradient(135deg, rgba(255, 118, 118, 0.95), rgba(184, 52, 67, 0.94))', preview: 'linear-gradient(135deg, rgba(255, 118, 118, 0.72), rgba(184, 52, 67, 0.66))' },
    2: { solid: 'linear-gradient(135deg, rgba(255, 218, 114, 0.96), rgba(219, 153, 47, 0.92))', preview: 'linear-gradient(135deg, rgba(255, 218, 114, 0.72), rgba(219, 153, 47, 0.66))' },
    3: { solid: 'linear-gradient(135deg, rgba(119, 223, 164, 0.96), rgba(34, 151, 102, 0.92))', preview: 'linear-gradient(135deg, rgba(119, 223, 164, 0.72), rgba(34, 151, 102, 0.66))' },
    4: { solid: 'linear-gradient(135deg, rgba(255, 173, 219, 0.96), rgba(216, 82, 160, 0.92))', preview: 'linear-gradient(135deg, rgba(255, 173, 219, 0.72), rgba(216, 82, 160, 0.66))' },
    5: { solid: 'linear-gradient(135deg, rgba(194, 151, 255, 0.96), rgba(115, 66, 221, 0.92))', preview: 'linear-gradient(135deg, rgba(194, 151, 255, 0.72), rgba(115, 66, 221, 0.66))' },
    6: { solid: 'linear-gradient(135deg, rgba(176, 119, 77, 0.96), rgba(107, 63, 32, 0.92))', preview: 'linear-gradient(135deg, rgba(176, 119, 77, 0.72), rgba(107, 63, 32, 0.66))' },
    7: { solid: 'linear-gradient(135deg, rgba(108, 247, 255, 0.96), rgba(0, 173, 199, 0.92))', preview: 'linear-gradient(135deg, rgba(108, 247, 255, 0.72), rgba(0, 173, 199, 0.66))' }
  };
  const normalizedIndex = ((playerIndex % Object.keys(fallback).length) + Object.keys(fallback).length) % Object.keys(fallback).length;
  return (fallback[normalizedIndex] || fallback[0])[variant] || fallback[0].solid;
}

function applyTileTopVisual(tile) {
  if (!tile) return;
  const top = tile.querySelector('.tileTop');
  if (!top) return;
  const row = Number(tile.dataset.row);
  const col = Number(tile.dataset.col);
  const cell = getCell(row, col);
  if (!cell) return;
  top.style.removeProperty('background');
  top.style.removeProperty('color');
  if (tile.classList.contains('paintTarget')) {
    top.style.setProperty('background', getTileGradientForPlayer(state.currentPlayerIndex, 'preview'), 'important');
    return;
  }
  if (cell.owner !== null) {
    top.style.setProperty('background', getTileGradientForPlayer(cell.owner, 'solid'), 'important');
    return;
  }
  if (isRoyalMarchMapActive()) {
    top.style.setProperty('background', ((row + col) % 2 === 0) ? '#d8d5cc' : '#34363b', 'important');
    top.style.setProperty('color', ((row + col) % 2 === 0) ? '#1d2024' : '#eceae4', 'important');
  } else if (isCentralDominionMapActive()) {
    if (tile.classList.contains('setup-dim') || tile.classList.contains('setup-available')) return;
    top.style.setProperty('background', 'linear-gradient(180deg, #d7dbe1 0%, #bfc5cf 100%)', 'important');
    top.style.setProperty('color', '#1d2430', 'important');
  }
}

function isSetupComputer(setupPlayer) {
  return getSetupPlayerController(setupPlayer) === 'computer';
}

function syncSetupReadyForController(setupPlayer) {
  if (!setupPlayer) return;
  if (isSetupComputer(setupPlayer)) {
    setupPlayer.ready = isSetupPlayerValid(setupPlayer);
  }
}


function ensureLastRoundBannerElement() {
  if (ui.lastRoundBanner) return ui.lastRoundBanner;
  const targetRoot = document.getElementById('gameScreen') || document.body;
  if (!targetRoot) return null;
  const banner = document.createElement('div');
  banner.id = 'lastRoundBanner';
  banner.className = 'lastRoundBanner';
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-atomic', 'true');
  targetRoot.appendChild(banner);
  ui.lastRoundBanner = banner;
  return banner;
}

function getCurrentRoundFinalReason() {
  const reasons = [];
  if (doesCurrentMapEndWhenBoardOwned() && isBoardFullyOwned()) reasons.push('All tiles have been claimed.');
  if (state.round >= getCurrentMapMaxRounds()) reasons.push(`Round ${getCurrentMapMaxRounds()} is the final round.`);
  return reasons.join(' ');
}

function playLastRoundBanner(reasonText = '') {
  const banner = ensureLastRoundBannerElement();
  if (!banner) return;
  if (state.lastRoundBannerTimeout) {
    clearTimeout(state.lastRoundBannerTimeout);
    state.lastRoundBannerTimeout = null;
  }
  banner.innerHTML = `
    <div class="lastRoundBannerInner">
      <div class="lastRoundBannerTitle">⚠️ Last Round Confirmed</div>
      <div class="lastRoundBannerText">${sanitize(reasonText || 'This round will be the final round.')}</div>
    </div>
  `;
  banner.classList.remove('play');
  void banner.offsetWidth;
  banner.classList.add('play');
  state.lastRoundHudActive = false;
  state.lastRoundBannerTimeout = setTimeout(() => {
    banner.classList.remove('play');
    state.lastRoundBannerTimeout = null;
    state.lastRoundHudActive = true;
    renderHud();
  }, 2600);
}

function ensureRoundStartBannerElement() {
  if (ui.roundStartBanner) return ui.roundStartBanner;
  const targetRoot = document.getElementById('boardWrap') || document.getElementById('gameScreen') || document.body;
  if (!targetRoot) return null;
  const banner = document.createElement('div');
  banner.id = 'roundStartBanner';
  banner.className = 'roundStartBanner';
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-atomic', 'true');
  targetRoot.appendChild(banner);
  ui.roundStartBanner = banner;
  return banner;
}

async function playRoundStartBanner(roundNumber) {
  const banner = ensureRoundStartBannerElement();
  if (!banner) {
    await wait(1000);
    return;
  }
  banner.textContent = `Round ${roundNumber}`;
  banner.classList.remove('play');
  void banner.offsetWidth;
  banner.classList.add('play');
  await wait(1000);
  banner.classList.remove('play');
}

function evaluateLastRoundState({ announce = true } = {}) {
  if (state.phase !== 'game' || state.gameOver || state.setupSelection.active) return false;
  const shouldBeLast = (doesCurrentMapEndWhenBoardOwned() && isBoardFullyOwned()) || state.round >= getCurrentMapMaxRounds();
  if (shouldBeLast) {
    const reasonText = getCurrentRoundFinalReason();
    const becameLastRound = !state.lastRoundActive;
    state.lastRoundActive = true;
    state.lastRoundReason = reasonText;
    if (becameLastRound) {
      if (announce) playLastRoundBanner(reasonText);
      else state.lastRoundHudActive = true;
    }
  } else {
    state.lastRoundActive = false;
    state.lastRoundHudActive = false;
    state.lastRoundReason = '';
  }
  return state.lastRoundActive;
}

function showSkillActivationBanner(player, skillName) {
  if (!ui.skillActivationBanner || !player || !skillName) return;
  if (state.skillActivationBannerTimeout) {
    clearTimeout(state.skillActivationBannerTimeout);
    state.skillActivationBannerTimeout = null;
  }

  const playerName = player.name || "Unknown";
  const accentColor = getPlayerAccentColor(player);

  ui.skillActivationBanner.style.setProperty("--skill-banner-accent", accentColor);
  ui.skillActivationBanner.innerHTML = `
    <div class="skillActivationBannerInner">
      <div class="skillActivationBannerIcon" aria-hidden="true">${getPlayerCharacterIconMarkup(player, "characterIconAsset--banner")}</div>
      <div class="skillActivationBannerText"><span><strong>${sanitize(playerName)}</strong> activated <strong>${sanitize(skillName)}</strong>.</span></div>
    </div>
  `;

  ui.skillActivationBanner.classList.remove("play");
  void ui.skillActivationBanner.offsetWidth;
  ui.skillActivationBanner.classList.add("play");

  state.skillActivationBannerTimeout = setTimeout(() => {
    ui.skillActivationBanner.classList.remove("play");
    state.skillActivationBannerTimeout = null;
  }, 4000);
}
function otherPlayerIndex(index) {
  return index === 0 ? 1 : 0;
}

function getCell(row, col) {
  if (row < 0 || col < 0) return null;
  const rows = getBoardRows();
  const cols = getBoardCols();
  if (row >= rows || col >= cols) return null;
  const cell = state.board[row]?.[col] || null;
  if (!cell || cell.playable === false) return null;
  return cell;
}

function hasObstacle(row, col) {
  return !!getCell(row, col)?.obstacle;
}

function isObstacleEncounterCandidate(row, col) {
  const cell = getCell(row, col);
  return !!(cell && cell.obstacle);
}

function buildSetupFlowMarkup() {
  return `
    <div class="setupFlowRoot">
      <section id="mapSelectView" class="setupView active">
        <div class="setupViewHeader centered setupHeaderWithAction">
          <h1 class="setupTitle">Select a map</h1>
          <div class="setupHeaderActionGroup">
            <button id="startTutorialButton" class="compactBackButton setupTutorialButton" type="button">Tutorial</button>
            <button id="setupRandomMapButton" class="compactBackButton setupRandomMapButton" type="button">🎲 Random</button>
            <button class="compactBackButton compactSetupFullscreenButton" type="button" data-setup-fullscreen aria-label="Full Screen">⛶</button>
          </div>
        </div>
        <div id="setupMapList" class="setupMapList"></div>
      </section>

      <section id="mapDetailView" class="setupView setupMapDetailView">
        <div class="setupDetailTopBar">
          <button id="setupBackToMapsButton" class="compactBackButton" type="button">🔙</button>
          <button class="compactBackButton compactSetupFullscreenButton" type="button" data-setup-fullscreen aria-label="Full Screen">⛶</button>
        </div>
        <div class="setupMapDetailLayout">
          <section class="setupMapPreviewPanel card">
            <div id="setupMapDetailPreview" class="setupMapDetailPreview"></div>
          </section>
          <aside class="setupMapInfoPanel card">
            <div id="setupMapDetailInfo" class="setupMapDetailInfo"></div>
            <div class="setupMapActionRow">
              <button id="setupMapChooseButton" class="primaryButton largeButton setupSelectStageButton" type="button">Select</button>
              <button id="setupRoyalMarchTutorialButton" class="secondaryButton largeButton setupRoyalMarchTutorialButton" type="button">Short Tutorial</button>
            </div>
          </aside>
        </div>
      </section>

      <section id="playerSetupView" class="setupView setupPlayerView">
        <div class="setupPlayerTopBar">
          <button id="setupBackToMapDetailButton" class="compactBackButton" type="button">🔙</button>
          <button id="setupModeToggleButton" class="compactBackButton setupModeToggleButton" type="button">Solo</button>
          <button id="setupAddPlayerButton" class="compactBackButton setupAddPlayerButton" type="button" aria-label="Add player">＋</button>
          <div id="setupStageTopLabel" class="setupStageTopLabel" aria-live="polite"></div>
          <button id="setupFillBotsButton" class="compactBackButton setupFillBotsButton" type="button">Fill Bots</button>
          <button class="compactBackButton compactSetupFullscreenButton" type="button" data-setup-fullscreen aria-label="Full Screen">⛶</button>
        </div>
        <div class="setupPlayerTopArea">
          <div id="setupPlayersScroller" class="setupPlayersScroller"></div>
        </div>
        <div class="setupPlayerFooter card">
          <div id="setupReadySummary" class="setupReadySummary"></div>
          <button id="setupPlayButton" class="primaryButton largeButton setupPlayButton" type="button">Play</button>
        </div>
      </section>

      <div id="setupTeamPickerPopup" class="setupTeamPickerPopup hidden" aria-hidden="true"></div>

      <div id="setupCharacterOverlay" class="setupCharacterOverlay hidden" aria-hidden="true">
        <div class="setupCharacterOverlayShell card">
          <div class="setupCharacterOverlayHeader">
            <button id="setupCharacterOverlayBack" class="compactBackButton" type="button">🔙</button>
            <div id="setupCharacterOverlayTitle" class="setupCharacterOverlayTitle"></div>
            <button class="compactBackButton compactSetupFullscreenButton" type="button" data-setup-fullscreen aria-label="Full Screen">⛶</button>
          </div>
          <div class="setupCharacterOverlayBody">
            <div class="setupCharacterPickerRail">
              <div id="setupCharacterGrid" class="setupCharacterGrid"></div>
            </div>
            <aside id="setupCharacterDetailPanel" class="setupCharacterDetailPanel"></aside>
          </div>
        </div>
      </div>
    </div>
  `;
}

function cacheSetupFlowUi() {
  ui.setupMapList = document.getElementById("setupMapList");
  ui.mapSelectView = document.getElementById("mapSelectView");
  ui.mapDetailView = document.getElementById("mapDetailView");
  ui.playerSetupView = document.getElementById("playerSetupView");
  ui.setupMapDetailPreview = document.getElementById("setupMapDetailPreview");
  ui.setupMapDetailInfo = document.getElementById("setupMapDetailInfo");
  ui.setupPlayersScroller = document.getElementById("setupPlayersScroller");
  ui.setupStageTopLabel = document.getElementById("setupStageTopLabel");
  ui.setupModeToggleButton = document.getElementById("setupModeToggleButton");
  ui.setupReadySummary = document.getElementById("setupReadySummary");
  ui.setupPlayButton = document.getElementById("setupPlayButton");
  ui.setupCharacterOverlay = document.getElementById("setupCharacterOverlay");
  ui.setupCharacterOverlayTitle = document.getElementById("setupCharacterOverlayTitle");
  ui.setupCharacterGrid = document.getElementById("setupCharacterGrid");
  ui.setupCharacterDetailPanel = document.getElementById("setupCharacterDetailPanel");
  ui.setupTeamPickerPopup = document.getElementById("setupTeamPickerPopup");
}

function initializeSetupFlowState() {
  state.selectedMapId = state.selectedMapId || "simpleArena";
  const defaultSetupPlayers = createDefaultSetupPlayers(2);
  state.setupFlow = {
    view: "map-select",
    matchMode: state.matchMode || "ffa",
    players: defaultSetupPlayers,
    picker: {
      open: false,
      playerIndex: 0,
      slotKey: "mainCharacterId",
      inspectCharacterId: defaultSetupPlayers[0].mainCharacterId
    },
    teamPicker: {
      open: false,
      playerIndex: 0
    },
    previewCamera: {
      yaw: -36,
      tilt: 68,
      scale: 0.62,
      pointerId: null,
      dragging: false,
      lastX: 0
    }
  };
}

function initSetupFlow() {
  initializeSetupFlowState();
  ui.setupScreen.innerHTML = buildSetupFlowMarkup();
  cacheSetupFlowUi();
  bindSetupFlowEvents();
  renderSetupFlow();
}

function bindSetupFlowEvents() {
  if (ui.setupScreen.dataset.setupBound === "true") return;
  ui.setupScreen.dataset.setupBound = "true";

  ui.setupScreen.addEventListener("click", handleSetupScreenClick);
  ui.setupScreen.addEventListener("input", handleSetupScreenInput);
  ui.setupScreen.addEventListener("change", handleSetupScreenInput);
  ui.setupScreen.addEventListener("pointerdown", handleSetupPreviewPointerDown);
  ui.setupScreen.addEventListener("pointermove", handleSetupPreviewPointerMove);
  ui.setupScreen.addEventListener("pointerup", handleSetupPreviewPointerUp);
  ui.setupScreen.addEventListener("pointercancel", handleSetupPreviewPointerUp);
}

function handleSetupScreenClick(event) {
  const fullscreenButton = event.target.closest("[data-setup-fullscreen]");
  if (fullscreenButton) {
    event.stopPropagation();
    toggleFullscreen();
    return;
  }

  if (handleGuestSetupScreenClick(event)) return;

  if (event.target.closest("#startTutorialButton")) {
    void startTutorial();
    return;
  }

  if (event.target.closest("#setupRandomMapButton")) {
    const maps = Object.values(MAP_LIBRARY);
    const candidates = maps.length > 1 ? maps.filter((mapDefinition) => mapDefinition.id !== state.selectedMapId) : maps;
    const selectedMap = randomChoice(candidates);
    if (!selectedMap) return;
    state.selectedMapId = selectedMap.id;
    applyRoyalMarchSetupDefaults();
    state.setupFlow.view = "map-detail";
    renderSetupFlow();
    return;
  }

  const mapButton = event.target.closest("[data-map-select]");
  if (mapButton) {
    state.selectedMapId = mapButton.dataset.mapSelect;
    applyRoyalMarchSetupDefaults();
    state.setupFlow.view = "map-detail";
    renderSetupFlow();
    return;
  }

  if (event.target.closest("#setupBackToMapsButton")) {
    state.setupFlow.view = "map-select";
    renderSetupVisibility();
    return;
  }

  if (event.target.closest("#setupMapChooseButton")) {
    applyRoyalMarchSetupDefaults();
    state.setupFlow.view = "player-setup";
    renderSetupFlow();
    return;
  }

  if (event.target.closest("#setupRoyalMarchTutorialButton")) {
    if (!isRoyalMarchMap()) return;
    startRoyalMarchTutorial();
    return;
  }

  if (event.target.closest("#setupBackToMapDetailButton")) {
    state.setupFlow.view = "map-detail";
    renderSetupFlow();
    return;
  }

  if (event.target.closest("#setupModeToggleButton")) {
    if (isRoyalMarchMap() || isFoodCourtMap()) return;
    state.setupFlow.matchMode = state.setupFlow.matchMode === "team" ? "ffa" : "team";
    state.setupFlow.players.forEach((setupPlayer, index) => {
      setupPlayer.teamKey = normalizeTeamKey(setupPlayer.teamKey, index);
      if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
      syncSetupReadyForController(setupPlayer);
    });
    renderSetupFlow();
    return;
  }


  if (event.target.closest("#setupAddPlayerButton")) {
    if (state.setupFlow.players.length >= 8) return;
    const nextIndex = state.setupFlow.players.length;
    const newPlayer = createDefaultSetupPlayers(nextIndex + 1)[nextIndex];
    if (multiplayer.session.isRoomPlay && multiplayer.session.isHost) {
      newPlayer.controller = "computer";
      newPlayer.hubPlayerId = null;
      maybeApplyComputerDefaultName(newPlayer, nextIndex);
      syncSetupReadyForController(newPlayer);
    }
    if (isRoyalMarchMap()) {
      newPlayer.teamKey = getRoyalMarchTeamForIndex(nextIndex, nextIndex + 1);
      newPlayer.royalRole = getDefaultRoyalMarchRole(nextIndex, nextIndex + 1);
    }
    state.setupFlow.players.push(newPlayer);
    applyRoyalMarchSetupDefaults();
    renderSetupFlow();
    return;
  }

  if (event.target.closest("#setupFillBotsButton")) {
    let changed = false;
    state.setupFlow.players.forEach((setupPlayer, index) => {
      if (isSetupPlayerReady(setupPlayer)) return;
      if (multiplayer.session.isRoomPlay && setupPlayer.hubPlayerId) return;
      if (getSetupPlayerController(setupPlayer) !== "computer") {
        setupPlayer.controller = "computer";
        maybeApplyComputerDefaultName(setupPlayer, index);
        changed = true;
      }
      syncSetupReadyForController(setupPlayer);
    });
    if (changed) {
      renderSetupPlayerCards();
      renderSetupFooter();
    } else {
      renderSetupFooter();
    }
    return;
  }

  const removePlayerButton = event.target.closest("[data-player-remove]");
  if (removePlayerButton) {
    const minPlayers = isRoyalMarchMap() ? ROYAL_MARCH_MIN_PLAYERS : 2;
    if (state.setupFlow.players.length <= minPlayers) return;
    const playerIndex = Number(removePlayerButton.dataset.playerRemove);
    if (!Number.isInteger(playerIndex) || playerIndex < 0 || playerIndex >= state.setupFlow.players.length) return;
    if (multiplayer.session.isRoomPlay && !isSetupComputer(state.setupFlow.players[playerIndex])) return;
    state.setupFlow.players.splice(playerIndex, 1);
    applyRoyalMarchSetupDefaults();
    if (state.setupFlow.picker.playerIndex >= state.setupFlow.players.length) {
      state.setupFlow.picker.open = false;
      state.setupFlow.picker.playerIndex = 0;
    }
    renderSetupFlow();
    return;
  }

  const readyButton = event.target.closest("[data-player-ready-button]");
  if (readyButton) {
    const playerIndex = Number(readyButton.dataset.playerReadyButton);
    if (!canEditSetupPlayer(playerIndex)) return;
    const setupPlayer = state.setupFlow.players[playerIndex];
    if (!setupPlayer) return;
    if (isSetupComputer(setupPlayer)) {
      syncSetupReadyForController(setupPlayer);
    } else {
      setupPlayer.ready = !setupPlayer.ready;
    }
    renderSetupPlayerCards();
    renderSetupFooter();
    return;
  }

  const randomButton = event.target.closest("[data-player-randomize]");
  if (randomButton) {
    const playerIndex = Number(randomButton.dataset.playerRandomize);
    if (!canEditSetupPlayer(playerIndex)) return;
    const setupPlayer = state.setupFlow.players[playerIndex];
    if (!setupPlayer) return;
    const ids = Object.keys(characterLibrary);
    const firstIndex = randomInt(0, Math.max(0, ids.length - 1));
    let secondIndex = firstIndex;
    if (ids.length > 1) {
      while (secondIndex === firstIndex) secondIndex = randomInt(0, ids.length - 1);
    }
    setupPlayer.mainCharacterId = ids[firstIndex] || ids[0];
    setupPlayer.subCharacterId = ids[secondIndex] || ids[1] || ids[0];
    if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
    syncSetupReadyForController(setupPlayer);
    renderSetupPlayerCards();
    renderSetupFooter();
    return;
  }

  const teamButton = event.target.closest("[data-player-team]");
  if (teamButton) {
    const playerIndex = Number(teamButton.dataset.playerTeam);
    if (!canEditSetupPlayer(playerIndex)) return;
    const setupPlayer = state.setupFlow.players[playerIndex];
    if (!setupPlayer) return;
    state.setupFlow.teamPicker = {
      open: true,
      playerIndex
    };
    renderSetupTeamPickerPopup();
    return;
  }

  const teamChoiceButton = event.target.closest("[data-setup-team-choice]");
  if (teamChoiceButton) {
    const playerIndex = Number(teamChoiceButton.dataset.playerIndex);
    if (!canEditSetupPlayer(playerIndex)) return;
    const teamKey = teamChoiceButton.dataset.setupTeamChoice;
    const setupPlayer = state.setupFlow.players[playerIndex];
    if (!setupPlayer || !getAvailableSetupTeamKeys().includes(teamKey)) return;
    setupPlayer.teamKey = normalizeTeamKey(teamKey, playerIndex);
    if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
    syncSetupReadyForController(setupPlayer);
    state.setupFlow.teamPicker = { open: false, playerIndex: 0 };
    renderSetupFlow();
    return;
  }

  if (event.target.closest("[data-setup-team-picker-close]") || (event.target.classList && event.target.classList.contains("setupTeamPickerPopup"))) {
    state.setupFlow.teamPicker = { open: false, playerIndex: 0 };
    renderSetupTeamPickerPopup();
    return;
  }

  const slotButton = event.target.closest("[data-character-slot]");
  if (slotButton) {
    const playerIndex = Number(slotButton.dataset.playerIndex);
    if (!canEditSetupPlayer(playerIndex)) return;
    const slotKey = slotButton.dataset.slotKey;
    const setupPlayer = state.setupFlow.players[playerIndex];
    state.setupFlow.picker.open = true;
    state.setupFlow.picker.playerIndex = playerIndex;
    state.setupFlow.picker.slotKey = slotKey;
    state.setupFlow.picker.inspectCharacterId = setupPlayer?.[slotKey] || null;
    renderCharacterPicker();
    return;
  }

  if (event.target.closest("#setupCharacterOverlayBack") || event.target.closest(".setupCharacterOverlay") === ui.setupCharacterOverlay && event.target === ui.setupCharacterOverlay) {
    state.setupFlow.picker.open = false;
    renderCharacterPicker();
    return;
  }

  const inspectButton = event.target.closest("[data-character-inspect]");
  if (inspectButton) {
    state.setupFlow.picker.inspectCharacterId = inspectButton.dataset.characterInspect;
    renderCharacterPicker();
    return;
  }

  const selectButton = event.target.closest("[data-character-select]");
  if (selectButton) {
    const selectedCharacterId = selectButton.dataset.characterSelect;
    const picker = state.setupFlow.picker;
    if (!canEditSetupPlayer(picker.playerIndex)) return;
    const setupPlayer = state.setupFlow.players[picker.playerIndex];
    const oppositeKey = picker.slotKey === "mainCharacterId" ? "subCharacterId" : "mainCharacterId";
    const ignoreReserveConflict = isSetupComputer(setupPlayer) && picker.slotKey === "mainCharacterId";
    if (!ignoreReserveConflict && setupPlayer[oppositeKey] === selectedCharacterId) {
      showSimpleModal({
        title: "Character already selected",
        body: "Choose different characters for the same player's Starter and Reserve.",
        buttons: [{ label: "OK", style: "primary", onClick: closeTopModal }]
      });
      return;
    }
    setupPlayer[picker.slotKey] = selectedCharacterId;
    if (!isSetupComputer(setupPlayer)) setupPlayer.ready = false;
    syncSetupReadyForController(setupPlayer);
    state.setupFlow.picker.open = false;
    renderSetupPlayerCards();
    renderSetupFooter();
    renderCharacterPicker();
    return;
  }

  const controllerToggle = event.target.closest("[data-player-controller]");
  if (controllerToggle) {
    const playerIndex = Number(controllerToggle.dataset.playerController);
    if (multiplayer.session.isRoomPlay && !multiplayer.session.isHost) return;
    if (multiplayer.session.isRoomPlay && multiplayer.session.isHost && !canEditSetupPlayer(playerIndex)) return;
    const setupPlayer = state.setupFlow.players[playerIndex];
    if (!setupPlayer) return;
    if (multiplayer.session.isRoomPlay && setupPlayer.hubPlayerId) return;
    setupPlayer.controller = getSetupPlayerController(setupPlayer) === "computer" ? "human" : "computer";
    if (!isSetupComputer(setupPlayer) && setupPlayer.mainCharacterId === setupPlayer.subCharacterId) {
      const fallbackReserve = Object.keys(characterLibrary).find((id) => id !== setupPlayer.mainCharacterId) || setupPlayer.subCharacterId;
      setupPlayer.subCharacterId = fallbackReserve;
    }
    maybeApplyComputerDefaultName(setupPlayer, playerIndex);
    if (!isSetupComputer(setupPlayer)) {
      setupPlayer.ready = false;
    }
    syncSetupReadyForController(setupPlayer);
    renderSetupPlayerCards();
    renderSetupFooter();
    return;
  }

  const royalRoleChoice = event.target.closest("[data-royal-role-choice]");
  if (royalRoleChoice) {
    if (!isRoyalMarchMap()) return;
    const playerIndex = Number(royalRoleChoice.dataset.royalRoleChoice);
    if (!canEditSetupPlayer(playerIndex)) return;
    const role = royalRoleChoice.dataset.royalRoleId;
    setRoyalMarchSetupRole(playerIndex, role);
    renderSetupPlayerCards();
    renderSetupFooter();
    return;
  }

  const royalRoleButton = event.target.closest("[data-royal-role]");
  if (royalRoleButton) {
    if (!isRoyalMarchMap()) return;
    const playerIndex = Number(royalRoleButton.dataset.royalRole);
    if (!canEditSetupPlayer(playerIndex)) return;
    cycleRoyalMarchSetupRole(playerIndex);
    renderSetupPlayerCards();
    renderSetupFooter();
    return;
  }

  if (event.target.closest("#setupPlayButton")) {
    if (!canStartFromSetup()) return;
    startGame();
  }
}

function handleSetupScreenInput(event) {
  const nameInput = event.target.closest("[data-player-name-input]");
  if (nameInput) {
    const playerIndex = Number(nameInput.dataset.playerIndex);
    if (multiplayer.session.isRoomPlay && multiplayer.session.isGuest) {
      if (isLocalSetupPlayerSlot(playerIndex)) sendGuestSetupAction({ op: "name", playerIndex, value: nameInput.value.slice(0, 12) });
      return;
    }
    if (!canEditSetupPlayer(playerIndex)) {
      renderSetupPlayerCards();
      return;
    }
    const setupPlayer = state.setupFlow.players[playerIndex];
    setupPlayer.name = nameInput.value.slice(0, 12);
    syncSetupReadyForController(setupPlayer);
    renderSetupFooter();
    scheduleSetupSnapshot();
    return;
  }

}

function renderSetupFlow() {
  applyRoyalMarchSetupDefaults();
  renderSetupVisibility();
  renderMapList();
  renderMapDetail();
  renderSetupPlayerCards();
  renderSetupFooter();
  renderSetupTeamPickerPopup();
  renderCharacterPicker();
  updateFullscreenButton();
  scheduleSetupSnapshot();
}

function renderSetupVisibility() {
  const view = state.setupFlow.view;
  ui.mapSelectView?.classList.toggle("active", view === "map-select");
  ui.mapDetailView?.classList.toggle("active", view === "map-detail");
  ui.playerSetupView?.classList.toggle("active", view === "player-setup");
  scheduleSetupSnapshot();
}

function getMapTileClass(type, listMode = false) {
  if (listMode && type !== 'territory' && type !== 'control') return "ghost";
  if (type === "flag") return "flag";
  if (type === "heal-hp") return "healHp";
  if (type === "heal-atk") return "healAtk";
  if (type === "heal-tech") return "healTech";
  if (String(type).startsWith("food-")) return "foodShop";
  if (type === "general-store") return "generalStore";
  if (type === "hungry") return "hungry";
  if (type === "table") return "foodTable";
  if (type === 'territory') return 'territory';
  if (type === 'control') return 'territory';
  return "normal";
}

function renderMiniMapHtml(mapDefinition, { listMode = false, showSpawns = false } = {}) {
  const specialByCell = new Map();
  const flagKeys = new Set();
  const territoryKeys = new Set();
  const controlAreaKeys = new Set();
  const tableKeys = new Set((mapDefinition.tables || []).map((entry) => `${entry.row},${entry.col}`));
  mapDefinition.specialTiles.forEach((entry) => {
    const cellKey = `${entry.row},${entry.col}`;
    if (entry.type === "flag") {
      flagKeys.add(cellKey);
    } else if (!specialByCell.has(cellKey)) {
      specialByCell.set(cellKey, entry.type);
    }
  });
  (mapDefinition.territories || []).forEach((territory) => {
    for (let row = territory.rowStart; row <= territory.rowEnd; row += 1) {
      for (let col = territory.colStart; col <= territory.colEnd; col += 1) {
        territoryKeys.add(`${row},${col}`);
      }
    }
  });
  if (mapDefinition.controlArea) {
    for (let row = mapDefinition.controlArea.rowStart; row <= mapDefinition.controlArea.rowEnd; row += 1) {
      for (let col = mapDefinition.controlArea.colStart; col <= mapDefinition.controlArea.colEnd; col += 1) {
        controlAreaKeys.add(`${row},${col}`);
      }
    }
  }
  const obstacleByCell = new Map(mapDefinition.getObstacleEntries().map((entry) => [`${entry.row},${entry.col}`, entry.obstacleId]));
  const spawnKeys = new Set(mapDefinition.startCorners.map((entry) => `${entry.row},${entry.col}`));
  const cells = [];
  for (let row = 0; row < mapDefinition.rows; row += 1) {
    for (let col = 0; col < mapDefinition.cols; col += 1) {
      if (!isPlayableMapCell(mapDefinition, row, col)) continue;
      const cellKey = `${row},${col}`;
      const type = controlAreaKeys.has(cellKey) ? 'control' : (territoryKeys.has(cellKey) ? 'territory' : (specialByCell.get(cellKey) || (tableKeys.has(cellKey) ? "table" : "normal")));
      const obstacleId = obstacleByCell.get(cellKey);
      const spawn = showSpawns && spawnKeys.has(cellKey);
      const specialIcon = getFoodCourtSetupSpecialIcon(type);
      const overlay = listMode
        ? ""
        : `${flagKeys.has(cellKey) ? '<span class="setupMiniOverlayIcon">🚩</span>' : ""}${specialIcon ? `<span class="setupMiniOverlayIcon foodCourtMiniIcon">${sanitize(specialIcon)}</span>` : ""}${obstacleId ? `<span class="setupMiniObstacleIcon">${sanitize(OBSTACLE_DEFINITIONS[obstacleId].icon)}</span>` : ""}`;
      cells.push(`<div class="setupMiniTile ${getMapTileClass(type, listMode)} ${spawn ? "spawn" : ""}" style="grid-row:${row + 1}; grid-column:${col + 1};">${overlay}</div>`);
    }
  }
  return `<div class="setupMiniMap ${listMode ? "listMode" : "detailMode"}" style="--setup-map-rows:${mapDefinition.rows}; --setup-map-cols:${mapDefinition.cols};">${cells.join("")}</div>`;
}

function renderMapList() {
  if (!ui.setupMapList) return;
  const maps = Object.values(MAP_LIBRARY);
  ui.setupMapList.innerHTML = maps.map((mapDefinition) => `
    <button type="button" class="setupMapCard card" data-map-select="${sanitize(mapDefinition.id)}">
      <div class="setupMapCardPreview">${renderMiniMapHtml(mapDefinition, { listMode: true })}</div>
      <div class="setupMapCardName">${sanitize(mapDefinition.name)}</div>
    </button>
  `).join("");
}

function renderSetupPreviewField(mapDefinition) {
  const specialByCell = new Map();
  const flagKeys = new Set();
  const territoryKeys = new Set();
  const controlAreaKeys = new Set();
  const tableKeys = new Set((mapDefinition.tables || []).map((entry) => `${entry.row},${entry.col}`));
  mapDefinition.specialTiles.forEach((entry) => {
    const cellKey = `${entry.row},${entry.col}`;
    if (entry.type === "flag") {
      flagKeys.add(cellKey);
    } else if (!specialByCell.has(cellKey)) {
      specialByCell.set(cellKey, entry.type);
    }
  });
  (mapDefinition.territories || []).forEach((territory) => {
    for (let row = territory.rowStart; row <= territory.rowEnd; row += 1) {
      for (let col = territory.colStart; col <= territory.colEnd; col += 1) {
        territoryKeys.add(`${row},${col}`);
      }
    }
  });
  if (mapDefinition.controlArea) {
    for (let row = mapDefinition.controlArea.rowStart; row <= mapDefinition.controlArea.rowEnd; row += 1) {
      for (let col = mapDefinition.controlArea.colStart; col <= mapDefinition.controlArea.colEnd; col += 1) {
        controlAreaKeys.add(`${row},${col}`);
      }
    }
  }
  const obstacleByCell = new Map(mapDefinition.getObstacleEntries().map((entry) => [`${entry.row},${entry.col}`, entry.obstacleId]));
  const spawnKeys = new Set(mapDefinition.startCorners.map((entry) => `${entry.row},${entry.col}`));
  const width = mapDefinition.cols * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  const height = mapDefinition.rows * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  const tiles = [];

  for (let row = 0; row < mapDefinition.rows; row += 1) {
    for (let col = 0; col < mapDefinition.cols; col += 1) {
      if (!isPlayableMapCell(mapDefinition, row, col)) continue;
      const cellKey = `${row},${col}`;
      const type = controlAreaKeys.has(cellKey) ? 'control' : (territoryKeys.has(cellKey) ? 'territory' : (specialByCell.get(cellKey) || (tableKeys.has(cellKey) ? "table" : "normal")));
      const obstacleId = obstacleByCell.get(cellKey);
      const isSpawn = spawnKeys.has(cellKey);
      const classes = ["tile", "setupPreviewTile"];
      if (mapDefinition.id === "royalMarch") {
        classes.push("royal-march-tile", (row + col) % 2 === 0 ? "royal-light" : "royal-dark");
      } else if (mapDefinition.id === "centralDominion") {
        classes.push("central-dominion-tile");
      }
      if (type === "heal-hp") classes.push("heal-hp");
      if (type === "heal-atk") classes.push("heal-atk");
      if (type === "heal-tech") classes.push("heal-tech");
      if (String(type).startsWith("food-") || type === "general-store") classes.push("foodCourtShopTile");
      if (type === "hungry") classes.push("foodCourtHungryTile");
      if (type === "table") classes.push("foodCourtTableTile", "foodCourtUnusedTable");
      if (type === 'territory' || type === 'control') classes.push('territory-cell');
      if (isSpawn) classes.push("setup-available", 'spawn-tile');
      const content = [];
      if (type === "heal-hp") content.push(`<span class="specialGlyph healGlyph">💗</span>`);
      if (type === "heal-atk") content.push(`<span class="specialGlyph atkGlyph">⚔️</span>`);
      if (type === "heal-tech") content.push(`<span class="specialGlyph techGlyph">🪄</span>`);
      if (String(type).startsWith("food-") || type === "general-store" || type === "hungry" || type === "table") content.push(`<span class="specialGlyph foodCourtPreviewGlyph">${sanitize(getFoodCourtSetupSpecialIcon(type))}</span>`);
      if (type === 'territory') content.push(`<span class="territoryPreviewMark">⚑</span>`);
      if (type === 'control') content.push(`<span class="territoryPreviewMark">◆</span>`);
      const flagHtml = flagKeys.has(cellKey)
        ? `<span class="flagBillboard setupPreviewFacing" aria-hidden="true"><span class="flagBillboardPole"></span><span class="flagBillboardCloth"></span><span class="flagBillboardBase"></span></span>`
        : "";
      let obstacleHtml = "";
      if (obstacleId && OBSTACLE_DEFINITIONS[obstacleId]) {
        const obstacleState = createObstacleState(obstacleId);
        obstacleHtml = `
          <span class="obstacleBillboard obstacle-${obstacleId} setupPreviewFacing" aria-hidden="true">
            <span class="obstacleHpBar">${renderObstacleMiniBar(obstacleState)}</span>
            <span class="obstacleGlyphWrap">
              <span class="obstacleRockGlyph">🪨</span>
              <span class="obstacleTypeGlyph">${sanitize(OBSTACLE_DEFINITIONS[obstacleId].icon)}</span>
            </span>
          </span>`;
      }
      tiles.push(`
        <div class="${classes.join(" ")}" style="transform:${getTileTransform(row, col, 0)}">
          <div class="tileTop">${content.join("")}</div>
          <div class="tileSide"></div>
          ${flagHtml}
          ${obstacleHtml}
        </div>
      `);
    }
  }

  const backgroundImage = mapDefinition.id === "royalMarch"
    ? `${BACKGROUND_IMAGE_PATH}royal_march_background.png`
    : (mapDefinition.id === "centralDominion"
      ? `${BACKGROUND_IMAGE_PATH}central_dominion_background.png`
      : (mapDefinition.id === "bigBridge"
        ? `${BACKGROUND_IMAGE_PATH}big_bridge_background.png`
        : (mapDefinition.id === "foodCourt" ? `${BACKGROUND_IMAGE_PATH}food_court.png` : `${BACKGROUND_IMAGE_PATH}arena_background.png`)));
  return `
    <div id="setupMapPreviewStage" class="setupMapPreviewStage" aria-label="Map preview">
      <img class="setupMapPreviewBackground" src="${sanitize(backgroundImage)}" alt="">
      <div class="setupMapPreviewGlow"></div>
      <div id="setupMapPreviewBoard3d" class="setupMapPreviewBoard3d" style="width:${width}px;height:${height}px;margin-left:${-width / 2}px;margin-top:${-height / 2}px;">
        ${tiles.join("")}
      </div>
    </div>
  `;
}

function updateSetupPreviewScale() {
  const stage = document.getElementById("setupMapPreviewStage");
  if (!stage || !state.setupFlow?.previewCamera) return;
  const mapDefinition = getSelectedMapDefinition();
  const width = mapDefinition.cols * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  const height = mapDefinition.rows * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  const availableWidth = Math.max(180, stage.clientWidth - 26);
  const availableHeight = Math.max(160, stage.clientHeight - 28);
  const scaleByWidth = availableWidth / (width + 92);
  const scaleByHeight = availableHeight / (height + 164);
  state.setupFlow.previewCamera.scale = Math.max(0.38, Math.min(0.88, scaleByWidth, scaleByHeight));
}

function applySetupPreviewCamera() {
  const board = document.getElementById("setupMapPreviewBoard3d");
  if (!board || !state.setupFlow?.previewCamera) return;
  const previewCamera = state.setupFlow.previewCamera;
  board.style.transform = `translate3d(0, 0, 0) scale(${previewCamera.scale}) rotateX(${previewCamera.tilt}deg) rotateZ(${previewCamera.yaw}deg)`;
  board.querySelectorAll(".setupPreviewFacing.flagBillboard").forEach((flag) => {
    flag.style.transform = `translate(-50%, -72%) translateZ(12px) rotateZ(${-previewCamera.yaw}deg) rotateX(${-previewCamera.tilt}deg)`;
  });
  board.querySelectorAll(".setupPreviewFacing.obstacleBillboard").forEach((obstacle) => {
    obstacle.style.transform = `translate(-50%, -88%) translateZ(24px) rotateZ(${-previewCamera.yaw}deg) rotateX(${-previewCamera.tilt}deg)`;
  });
}

function handleSetupPreviewPointerDown(event) {
  const stage = event.target.closest("#setupMapPreviewStage");
  if (!stage || state.setupFlow?.view !== "map-detail") return;
  if (!state.setupFlow?.previewCamera) return;
  state.setupFlow.previewCamera.dragging = true;
  state.setupFlow.previewCamera.pointerId = event.pointerId;
  state.setupFlow.previewCamera.lastX = event.clientX;
  stage.setPointerCapture?.(event.pointerId);
}

function handleSetupPreviewPointerMove(event) {
  const previewCamera = state.setupFlow?.previewCamera;
  if (!previewCamera?.dragging || previewCamera.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - previewCamera.lastX;
  previewCamera.lastX = event.clientX;
  previewCamera.yaw -= deltaX * 0.38;
  applySetupPreviewCamera();
}

function handleSetupPreviewPointerUp(event) {
  const previewCamera = state.setupFlow?.previewCamera;
  if (!previewCamera || previewCamera.pointerId !== event.pointerId) return;
  previewCamera.dragging = false;
  previewCamera.pointerId = null;
}

function getMapSpecialTileSummary(mapDefinition) {
  const iconByType = {
    flag: "🚩",
    "heal-hp": "💗",
    "heal-atk": "⚔️",
    "heal-tech": "🪄",
    "food-sushi": "🍣",
    "food-burger": "🍔",
    "food-dumpling": "🥟",
    "general-store": "🪨",
    hungry: "😋"
  };
  const labelByType = {
    flag: "Flag",
    "heal-hp": "HP restore",
    "heal-atk": "Attack restore",
    "heal-tech": "Technique restore",
    "food-sushi": "Japanese Food Shop",
    "food-burger": "Western Food Shop",
    "food-dumpling": "Chinese Food Shop",
    "general-store": "General Store",
    hungry: "Hungry Guest"
  };
  const seen = new Set();
  const specials = mapDefinition.specialTiles
    .filter((entry) => {
      if (seen.has(entry.type)) return false;
      seen.add(entry.type);
      return true;
    })
    .map((entry) => ({
      icon: iconByType[entry.type] || "•",
      label: labelByType[entry.type] || entry.label || entry.type
    }));
  if (Array.isArray(mapDefinition.tables) && mapDefinition.tables.length) {
    specials.push({ icon: '🍽️', label: `${mapDefinition.tables.length} team tables` });
  }
  if (Array.isArray(mapDefinition.territories) && mapDefinition.territories.length) {
    specials.push({ icon: '🟩', label: `${mapDefinition.territories.length} territory zones` });
  }
  if (mapDefinition.controlArea) {
    specials.push({ icon: '◆', label: `${mapDefinition.controlArea.label || 'Control Area'} instant-win zone` });
  }
  return specials;
}

function getMapObstacleSummary(mapDefinition) {
  const counts = new Map();
  mapDefinition.getObstacleEntries().forEach((entry) => {
    counts.set(entry.obstacleId, (counts.get(entry.obstacleId) || 0) + 1);
  });
  return [...counts.entries()].map(([obstacleId, count]) => {
    const definition = OBSTACLE_DEFINITIONS[obstacleId];
    return {
      icon: definition ? `🪨 ${definition.icon}` : "🪨",
      label: definition ? `${definition.name} ×${count}` : `Rock ×${count}`
    };
  });
}



function getMapRuleSummary(mapDefinition) {
  if (!mapDefinition) return [];
  if (mapDefinition.id === 'simpleArena') {
    return [
      { icon: '🎯', label: 'Claim tiles, win battles, and hold the flag to finish with the highest score.' },
      { icon: '🚩', label: 'The flag is worth +15 final points while carried; it can change hands through battle.' },
      { icon: '🧱', label: 'Center rocks block routes until destroyed with the matching stat.' }
    ];
  }
  if (mapDefinition.id === 'flagCarrier') {
    return [
      { icon: '🚩', label: 'The flag gives no point bonus here; it is a delivery objective.' },
      { icon: '🏁', label: 'Carry the flag to any allied start tile to win immediately.' },
      { icon: '☠️', label: 'Opponent-owned tiles deal 100 HP at turn end, so crossing enemy territory is extremely risky.' }
    ];
  }
  if (mapDefinition.id === 'captureTerritory') {
    return [
      { icon: '🎨', label: 'Paint normal field tiles as usual, but the three territory zones create extra round-end income.' },
      { icon: '⚑', label: 'At round end, a territory scores only if one player or team owns all painted tiles there and no enemy is standing inside.' },
      { icon: '⛔', label: 'Controlled territories give +3 for the first painted tile, then +1 for each additional painted tile; mixed paint or enemy presence blocks the score.' }
    ];
  }
  if (mapDefinition.id === 'royalMarch') {
    return [
      { icon: '♟️', label: 'Red-vs-Blue team map: players move using their assigned chess-piece roles.' },
      { icon: '♔', label: 'Kings can only enter own-team tiles. They may step onto an unowned enemy back-rank tile to claim the goal, but enemy-owned tiles still block them.' },
      { icon: '🏁', label: 'A team wins if its King stands on the enemy back rank when the round ends.' },
      { icon: '👑', label: 'Defeating an enemy King gives +3 royal bonus points; it does not end the game immediately.' }
    ];
  }
  if (mapDefinition.id === 'centralDominion') {
    return [
      { icon: '◆', label: 'The Central Core is the main objective zone in the middle of the map.' },
      { icon: '🏁', label: 'Own every Central Core tile at the same time to win immediately.' },
      { icon: '⏳', label: 'If no one controls the full core, the match is decided by score after round 15.' }
    ];
  }
  if (mapDefinition.id === 'bigBridge') {
    return [
      { icon: '🌉', label: 'Two wide areas are connected by a narrow bridge, so the center becomes the main choke point.' },
      { icon: '🚩', label: 'The bridge flag is worth +15 final points while carried.' },
      { icon: '🧱', label: 'Bridge rocks and restore tiles make route control around the center especially important.' }
    ];
  }
  if (mapDefinition.id === 'foodCourt') {
    return [
      { icon: '👥', label: 'Team-only map for 2-4 teams; each team is assigned one or more table seats.' },
      { icon: '🍱', label: 'Stop on a food shop tile your team owns to automatically take or replace one carried food.' },
      { icon: '🍽️', label: 'Return to one of your team table seats while carrying food to serve it automatically.' },
      { icon: '⭐', label: 'Served food gives +5 points each; completing the full set adds +15 more, for 30 food points total.' },
      { icon: '🏁', label: 'When any team completes Japanese, Western, and Chinese food, the game ends and the highest-scoring team wins.' },
      { icon: '🛒', label: 'General Stores provide Power Shards, with a one-time chance for a flag instead.' },
      { icon: '🚧', label: 'Table tiles are blocked; players cannot pass through or stop on them.' }
    ];
  }
  return [
    { icon: '🎯', label: 'Claim tiles, win battles, and use the map objectives to finish with the highest score.' }
  ];
}

function getMapEndConditionSummary(mapDefinition) {
  if (mapDefinition.id === 'simpleArena') {
    return [
      { icon: '🟨', label: 'All tiles are claimed by the end of the round' },
      { icon: '⏳', label: `Round ${SIMPLE_ARENA_MAX_ROUNDS} ends` }
    ];
  }
  if (mapDefinition.id === 'flagCarrier') {
    return [
      { icon: '🚩', label: 'Carry the flag to any allied start tile for an instant win' },
      { icon: '⏳', label: `Round ${FLAG_CARRIER_MAX_ROUNDS} ends` }
    ];
  }
  if (mapDefinition.id === 'captureTerritory') {
    return [
      { icon: '⚑', label: 'Each territory scores 3+ points at round end only when one player or team owns all painted tiles there and no enemy is inside' },
      { icon: '⏳', label: `Highest score after round ${CAPTURE_TERRITORY_MAX_ROUNDS} wins` }
    ];
  }
  if (mapDefinition.id === 'royalMarch') {
    return [
      { icon: '♔', label: "Have your king on the enemy back rank when a round ends" },
      { icon: '⏳', label: `Highest team score after round ${ROYAL_MARCH_MAX_ROUNDS} wins` }
    ];
  }
  if (mapDefinition.id === 'centralDominion') {
    return [
      { icon: '◆', label: 'Own every Central Core tile at the same time for an instant win' },
      { icon: '⏳', label: `Highest score after round ${CENTRAL_DOMINION_MAX_ROUNDS} wins` }
    ];
  }
  if (mapDefinition.id === 'bigBridge') {
    return [
      { icon: '🟨', label: 'All playable tiles are claimed by the end of the round' },
      { icon: '⏳', label: `Round ${BIG_BRIDGE_MAX_ROUNDS} ends` }
    ];
  }
  if (mapDefinition.id === 'foodCourt') {
    return [
      { icon: '🍱', label: 'Any team completes all 3 foods; final victory is decided by total team score' },
      { icon: '⏳', label: `Highest team score after round ${FOOD_COURT_MAX_ROUNDS} wins if no full set is completed` }
    ];
  }
  return [{ icon: '⏳', label: `Round ${mapDefinition.maxRounds || SIMPLE_ARENA_MAX_ROUNDS} ends` }];
}

function renderSetupDetailChipList(items, extraClass = "") {
  return `<div class="setupDetailChipList ${extraClass}">${items.map((item) => `
    <div class="setupDetailChip">
      <span class="setupDetailChipIcon">${sanitize(item.icon || "•")}</span>
      <span class="setupDetailChipLabel">${sanitize(item.label || "")}</span>
    </div>
  `).join("")}</div>`;
}

function getMapHazardSummary(mapDefinition) {
  if (!mapDefinition) return [];
  const hazards = [];
  const enemyTileDamage = Number(mapDefinition.enemyTileEndDamage) || ENEMY_TILE_END_DAMAGE;
  hazards.push({ icon: '☠️', label: `Ending your turn on an opponent-owned tile deals ${enemyTileDamage} HP damage` });
  if (mapDefinition.id === 'captureTerritory') {
    hazards.push({ icon: '⛔', label: 'Mixed painted colors or enemy presence make a territory contested and block control points' });
  }
  return hazards;
}

function renderMapDetail() {
  if (!ui.setupMapDetailPreview || !ui.setupMapDetailInfo) return;
  const mapDefinition = getSelectedMapDefinition();
  const flagBonusValue = mapDefinition.flagBonus != null ? `+${mapDefinition.flagBonus}` : "+0";
  const specialTiles = getMapSpecialTileSummary(mapDefinition);
  const obstacles = getMapObstacleSummary(mapDefinition);
  const hazards = getMapHazardSummary(mapDefinition);
  const rules = getMapRuleSummary(mapDefinition);
  const endConditions = getMapEndConditionSummary(mapDefinition);

  ui.setupMapDetailPreview.innerHTML = renderSetupPreviewField(mapDefinition);
  ui.setupMapDetailInfo.innerHTML = `
    <h2 class="setupMapDetailTitle">${sanitize(mapDefinition.name)}</h2>
    <div class="setupMapDetailStats">
      <div class="setupMapDetailLine stackLine setupMapRulesLine">
        <span>Rules</span>
        ${renderSetupDetailChipList(rules, "is-rule")}
      </div>
      <div class="setupMapDetailLine compactValueLine">
        <span>🚩 Flag Bonus</span>
        <strong>${sanitize(flagBonusValue)}</strong>
      </div>
      <div class="setupMapDetailLine stackLine">
        <span>Special Tiles</span>
        ${renderSetupDetailChipList(specialTiles, "is-special")}
      </div>
      <div class="setupMapDetailLine stackLine">
        <span>Obstacles</span>
        ${renderSetupDetailChipList(obstacles, "is-obstacle")}
      </div>
      <div class="setupMapDetailLine stackLine">
        <span>Danger Gimmicks</span>
        ${renderSetupDetailChipList(hazards, "is-hazard")}
      </div>
      <div class="setupMapDetailLine stackLine">
        <span>End Conditions</span>
        ${renderSetupDetailChipList(endConditions, "is-end-condition")}
      </div>
    </div>
  `;
  const royalTutorialButton = document.getElementById("setupRoyalMarchTutorialButton");
  royalTutorialButton?.classList.toggle("hidden", mapDefinition.id !== "royalMarch");
  royalTutorialButton?.closest(".setupMapActionRow")?.classList.toggle("is-single", mapDefinition.id !== "royalMarch");
  requestAnimationFrame(() => {
    updateSetupPreviewScale();
    applySetupPreviewCamera();
  });
}

function getSetupPlayerDisplayName(setupPlayer, index) {
  return (setupPlayer.name || `Player ${index + 1}`).trim().slice(0, 12) || `Player ${index + 1}`;
}

function getSetupPlayerController(setupPlayer) {
  return setupPlayer?.controller === "computer" ? "computer" : "human";
}

function isComputerPlayer(player) {
  return !!player && !!player.isComputer;
}

function isPlayerReturningToStart(player) {
  if (!player) return false;
  return Array.isArray(state.returningPlayerIds) && state.returningPlayerIds.includes(player.id);
}

function getComputerDisplayName(index) {
  return `CPU ${index + 1}`;
}

function maybeApplyComputerDefaultName(setupPlayer, index) {
  if (!setupPlayer) return;
  const current = (setupPlayer.name || "").trim();
  const humanDefault = `Player ${index + 1}`;
  const cpuDefault = getComputerDisplayName(index);
  if (getSetupPlayerController(setupPlayer) === "computer") {
    if (!current || current == humanDefault) {
      setupPlayer.name = cpuDefault;
    }
  } else if (!current || current == cpuDefault) {
    setupPlayer.name = humanDefault;
  }
}


function isSetupPlayerValid(setupPlayer) {
  if (!setupPlayer || !setupPlayer.mainCharacterId) return false;
  if (isSetupComputer(setupPlayer)) return true;
  return !!(setupPlayer.subCharacterId && setupPlayer.mainCharacterId !== setupPlayer.subCharacterId);
}

function getEffectiveSetupSubCharacterId(setupPlayer) {
  if (!setupPlayer) return null;
  if (isSetupComputer(setupPlayer)) return null;
  return setupPlayer.subCharacterId || null;
}

function isSetupPlayerReady(setupPlayer) {
  return isSetupPlayerValid(setupPlayer) && !!setupPlayer.ready;
}

function canStartFromSetup() {
  if (isRoyalMarchMap()) {
    const players = state.setupFlow.players || [];
    if (players.length < ROYAL_MARCH_MIN_PLAYERS || players.length > ROYAL_MARCH_MAX_PLAYERS) return false;
    if (!players.every((setupPlayer) => isSetupPlayerReady(setupPlayer))) return false;
    return ["red", "blue"].every((teamKey) => {
      const teamPlayers = players.filter((setupPlayer, index) => normalizeTeamKey(setupPlayer.teamKey, index) === teamKey);
      const kingCount = getRoyalMarchTeamRoleCount(players, teamKey, "king");
      const nonKingCount = teamPlayers.length - kingCount;
      return teamPlayers.length >= 2 && teamPlayers.length <= 4 && kingCount === 1 && nonKingCount >= 1;
    });
  }
  if (!state.setupFlow.players.length || !state.setupFlow.players.every((setupPlayer) => isSetupPlayerReady(setupPlayer))) {
    return false;
  }
  if (isFoodCourtMap()) {
    if (state.setupFlow.matchMode !== "team") return false;
    return !!getFoodCourtSetupValidation(state.setupFlow.players).ok;
  }
  if (state.setupFlow.matchMode !== "team") return true;
  const teams = new Set(state.setupFlow.players.map((setupPlayer, index) => normalizeTeamKey(setupPlayer.teamKey, index)));
  return teams.size >= 2;
}

function renderSetupPlayerCards() {
  if (!ui.setupPlayersScroller) return;
  applyRoyalMarchSetupDefaults();
  const matchMode = state.setupFlow.matchMode || "ffa";
  const royalMarch = isRoyalMarchMap();
  const playerCount = state.setupFlow.players.length;
  const columnCount = Math.min(playerCount, 4);
  const rowCount = playerCount > 4 ? 2 : 1;
  ui.setupPlayersScroller.classList.toggle("is-multirow", playerCount > 4);
  ui.setupPlayersScroller.style.setProperty("--setup-player-columns", String(columnCount));
  ui.setupPlayersScroller.style.setProperty("--setup-player-rows", String(rowCount));
  ui.setupPlayersScroller.innerHTML = state.setupFlow.players.map((setupPlayer, index) => {
    const starter = characterLibrary[setupPlayer.mainCharacterId];
    const reserve = characterLibrary[setupPlayer.subCharacterId];
    const teamKey = normalizeTeamKey(setupPlayer.teamKey, index);
    const teamInfo = getTeamColorInfo(teamKey);
    const cardClass = isSetupPlayerReady(setupPlayer) ? "is-ready" : "";
    const teamStyle = matchMode === "team" ? ` style="--setup-team-accent:${sanitize(teamInfo.accent)};"` : "";
    const roleDefinition = royalMarch ? ROYAL_MARCH_ROLE_DEFINITIONS[getRoyalMarchRoleForSetupPlayer(setupPlayer, index)] : null;
    const editable = canEditSetupPlayer(index);
    const roomOwned = multiplayer.session.isRoomPlay && isLocalSetupPlayerSlot(index);
    const lockedAttr = editable ? "" : "disabled aria-disabled=\"true\"";
    const nameLockAttr = editable ? "" : "readonly aria-readonly=\"true\"";
    const removable = state.setupFlow.players.length > (royalMarch ? ROYAL_MARCH_MIN_PLAYERS : 2)
      && (!multiplayer.session.isRoomPlay || (multiplayer.session.isHost && isSetupComputer(setupPlayer)));
    const controllerLockedAttr = multiplayer.session.isRoomPlay && (!multiplayer.session.isHost || !editable || !!setupPlayer.hubPlayerId)
      ? "disabled aria-disabled=\"true\""
      : "";
    return `
      <section class="setupPlayerCard card ${cardClass} ${editable ? "is-editable" : "is-locked"} ${roomOwned ? "is-local-room-player" : ""} ${matchMode === "team" ? `team-${sanitize(teamKey)}` : ""}" data-setup-player-card="${index}"${teamStyle}>
        ${removable ? `<button type="button" class="setupPlayerRemoveButton" data-player-remove="${index}" aria-label="Remove player">✖</button>` : ""}
        <div class="setupPlayerCardHeader">
          <label class="setupPlayerNameBlock">
            <span>Player Name</span>
            <input type="text" maxlength="12" value="${sanitize(getSetupPlayerDisplayName(setupPlayer, index))}" data-player-name-input data-player-index="${index}" ${nameLockAttr}>
          </label>
          <button type="button" class="setupReadyButton ${setupPlayer.ready ? "is-ready" : "is-waiting"}${isSetupComputer(setupPlayer) ? " is-locked" : ""}" data-player-ready-button="${index}" aria-label="Toggle ready" ${lockedAttr}>✅</button>
          <button type="button" class="setupControllerToggle ${getSetupPlayerController(setupPlayer) === "computer" ? "is-computer" : "is-human"}" data-player-controller="${index}" aria-label="${getSetupPlayerController(setupPlayer) === "computer" ? "Switch to Human" : "Switch to Computer"}" title="${getSetupPlayerController(setupPlayer) === "computer" ? "CPU" : "Human"}" ${controllerLockedAttr}>${getSetupPlayerController(setupPlayer) === "computer" ? "🤖" : "👤"}</button>
          ${matchMode === "team" ? `<button type="button" class="setupTeamButton team-${sanitize(teamKey)}" data-player-team="${index}" aria-label="${sanitize(teamInfo.label)}" ${lockedAttr}>⚑</button>` : ""}
          <button type="button" class="setupRandomizeButton" data-player-randomize="${index}" aria-label="Randomize characters" ${lockedAttr}>🎲</button>
        </div>
        ${royalMarch && roleDefinition ? renderRoyalMarchRolePanel(setupPlayer, index) : ""}
        <div class="setupCharacterSlots ${isSetupComputer(setupPlayer) ? "is-computer" : ""}">
          ${renderSetupCharacterSlot(setupPlayer, index, "mainCharacterId", "Starter", starter, editable)}
          ${isSetupComputer(setupPlayer) ? "" : renderSetupCharacterSlot(setupPlayer, index, "subCharacterId", "Reserve", reserve, editable)}
        </div>
      </section>
    `;
  }).join("");
}

function renderSetupCharacterSlot(setupPlayer, playerIndex, slotKey, label, character, editable = true) {
  if (!character) return "";
  return `
    <button type="button" class="setupCharacterSlot" data-character-slot data-player-index="${playerIndex}" data-slot-key="${slotKey}" ${editable ? "" : "disabled aria-disabled=\"true\""}>
      <span class="setupCharacterSlotRole">${sanitize(label)}</span>
      <span class="setupCharacterSlotCircle">${getCharacterIconMarkup(character, "characterIconAsset--setupSlot")}</span>
      <span class="setupCharacterSlotName">${sanitize(character.displayName || character.name)}</span>
    </button>
  `;
}

function renderSetupTeamPickerPopup() {
  if (!ui.setupTeamPickerPopup) return;
  const picker = state.setupFlow?.teamPicker;
  const playerIndex = Number(picker?.playerIndex);
  const setupPlayer = state.setupFlow?.players?.[playerIndex];
  if (!picker?.open || !setupPlayer || state.setupFlow?.view !== "player-setup" || state.setupFlow?.matchMode !== "team") {
    ui.setupTeamPickerPopup.classList.add("hidden");
    ui.setupTeamPickerPopup.setAttribute("aria-hidden", "true");
    ui.setupTeamPickerPopup.innerHTML = "";
    scheduleSetupSnapshot();
    return;
  }
  const currentTeamKey = normalizeTeamKey(setupPlayer.teamKey, playerIndex);
  const playerName = getSetupPlayerDisplayName(setupPlayer, playerIndex);
  const teamButtons = getAvailableSetupTeamKeys().map((teamKey) => {
    const teamInfo = getTeamColorInfo(teamKey);
    const selected = teamKey === currentTeamKey;
    return `
      <button type="button"
        class="setupTeamChoiceButton team-${sanitize(teamKey)}${selected ? " is-selected" : ""}"
        data-setup-team-choice="${sanitize(teamKey)}"
        data-player-index="${playerIndex}"
        style="--team-choice-accent:${sanitize(teamInfo.accent)};"
        aria-label="${sanitize(teamInfo.label)}"
        aria-pressed="${selected ? "true" : "false"}">
        <span class="setupTeamChoiceFlag">⚑</span>
        <span class="setupTeamChoiceLabel">${sanitize(teamInfo.label.replace(/\s*Team$/i, ""))}</span>
      </button>
    `;
  }).join("");
  ui.setupTeamPickerPopup.innerHTML = `
    <div class="setupTeamPickerCard card" role="dialog" aria-modal="true" aria-label="Choose team flag">
      <div class="setupTeamPickerHeader">
        <div>
          <span class="setupTeamPickerEyebrow">Team Flag</span>
          <strong>${sanitize(playerName)}</strong>
        </div>
        <button type="button" class="compactBackButton setupTeamPickerClose" data-setup-team-picker-close aria-label="Close">x</button>
      </div>
      <div class="setupTeamChoiceGrid">
        ${teamButtons}
      </div>
    </div>
  `;
  ui.setupTeamPickerPopup.classList.remove("hidden");
  ui.setupTeamPickerPopup.setAttribute("aria-hidden", "false");
  scheduleSetupSnapshot();
}

function renderSetupFooter() {
  if (!ui.setupStageTopLabel || !ui.setupReadySummary || !ui.setupPlayButton) return;
  const mapDefinition = getSelectedMapDefinition();
  const matchMode = state.setupFlow.matchMode || "ffa";
  const royalMarch = isRoyalMarchMap();
  const foodCourt = isFoodCourtMap();
  if (ui.setupModeToggleButton) {
    ui.setupModeToggleButton.textContent = matchMode === "team" ? "Teams" : "Solo";
    ui.setupModeToggleButton.disabled = royalMarch || foodCourt;
    ui.setupModeToggleButton.classList.toggle("is-locked", royalMarch || foodCourt);
  }
  const addButton = document.getElementById("setupAddPlayerButton");
  const fillButton = document.getElementById("setupFillBotsButton");
  if (addButton) {
    if (multiplayer.session.isRoomPlay && multiplayer.session.isGuest) {
      const joined = isGuestJoinedCurrentSetup();
      addButton.textContent = joined ? "Leave" : "Join";
      addButton.disabled = !multiplayer.connected;
      addButton.classList.toggle("is-locked", !multiplayer.connected);
    } else {
      addButton.textContent = multiplayer.session.isRoomPlay ? "Add CPU" : "＋";
      const addLocked = state.setupFlow.players.length >= (royalMarch ? ROYAL_MARCH_MAX_PLAYERS : 8);
      addButton.disabled = addLocked;
      addButton.classList.toggle("is-locked", addLocked);
    }
  }
  if (fillButton) {
    fillButton.textContent = "Fill Bots";
    fillButton.disabled = multiplayer.session.isRoomPlay && !multiplayer.session.isHost;
    fillButton.classList.toggle("is-locked", fillButton.disabled);
  }
  if (ui.setupModeToggleButton && multiplayer.session.isRoomPlay && !multiplayer.session.isHost) {
    ui.setupModeToggleButton.disabled = true;
    ui.setupModeToggleButton.classList.add("is-locked");
  }
  ui.setupStageTopLabel.innerHTML = `<span class="setupStageTopPrefix">Stage</span><strong>${sanitize(mapDefinition.name)}</strong>`;
  const readyChips = state.setupFlow.players.map((setupPlayer, index) => {
    const statusClass = isSetupPlayerReady(setupPlayer) ? "ready" : (isSetupPlayerValid(setupPlayer) ? "waiting" : "invalid");
    const statusText = isSetupPlayerReady(setupPlayer) ? "Ready" : (isSetupPlayerValid(setupPlayer) ? "Waiting" : "Invalid");
    const teamKey = normalizeTeamKey(setupPlayer.teamKey, index);
    return `<div class="setupReadyChip ${statusClass}"><span>${sanitize(getSetupPlayerDisplayName(setupPlayer, index))}${matchMode === "team" ? ` <em class="setupReadyTeam team-${sanitize(teamKey)}">⚑</em>` : ""}</span><strong>${statusText}</strong></div>`;
  });
  if (foodCourt) {
    const validation = getFoodCourtSetupValidation(state.setupFlow.players);
    if (!validation.ok) readyChips.push(`<div class="setupReadyChip invalid"><span>${sanitize(validation.reason)}</span><strong>Map rule</strong></div>`);
  }
  ui.setupReadySummary.innerHTML = readyChips.join("");
  ui.setupPlayButton.disabled = !canStartFromSetup() || (multiplayer.session.isRoomPlay && !multiplayer.session.isHost);
  scheduleSetupSnapshot();
}

function renderCharacterPicker() {
  if (!ui.setupCharacterOverlay || !ui.setupCharacterOverlayTitle || !ui.setupCharacterGrid || !ui.setupCharacterDetailPanel) return;
  const picker = state.setupFlow.picker;
  const setupPlayer = state.setupFlow.players[picker.playerIndex];
  const slotLabel = picker.slotKey === "mainCharacterId" ? "Starter" : "Reserve";
  const editable = canEditSetupPlayer(picker.playerIndex);
  const overlayWillOpen = !!picker.open;
  if (!overlayWillOpen && ui.setupCharacterOverlay.contains(document.activeElement)) {
    document.activeElement.blur();
    const playerCardsScroller = document.getElementById("setupPlayerCardsScroller");
    if (playerCardsScroller instanceof HTMLElement) {
      playerCardsScroller.focus({ preventScroll: true });
    }
  }
  ui.setupCharacterOverlay.classList.toggle("hidden", !overlayWillOpen);
  ui.setupCharacterOverlay.toggleAttribute("inert", !overlayWillOpen);
  ui.setupCharacterOverlay.setAttribute("aria-hidden", overlayWillOpen ? "false" : "true");
  if (!overlayWillOpen || !setupPlayer) {
    scheduleSetupSnapshot();
    return;
  }

  ui.setupCharacterOverlayTitle.textContent = `${getSetupPlayerDisplayName(setupPlayer, picker.playerIndex)} · Select ${slotLabel}`;
  const oppositeKey = picker.slotKey === "mainCharacterId" ? "subCharacterId" : "mainCharacterId";
  const ignoreReserveConflict = isSetupComputer(setupPlayer) && picker.slotKey === "mainCharacterId";
  ui.setupCharacterGrid.innerHTML = Object.values(characterLibrary).map((character) => {
    const blocked = !ignoreReserveConflict && setupPlayer[oppositeKey] === character.id;
    const selected = setupPlayer[picker.slotKey] === character.id;
    return `
      <div class="setupCharacterCard ${selected ? "is-selected" : ""}">
        <button type="button" class="setupCharacterInspectButton" data-character-inspect="${sanitize(character.id)}" aria-label="Show details for ${sanitize(character.displayName || character.name)}">
          ${getCharacterIconMarkup(character, "characterIconAsset--setupPicker")}
          <span class="setupCharacterInspectName">${sanitize(character.displayName || character.name)}</span>
        </button>
        <button type="button" class="primaryButton setupCharacterSelectButton" data-character-select="${sanitize(character.id)}" ${blocked || !editable ? "disabled" : ""}>${blocked ? "Used" : "Select"}</button>
      </div>
    `;
  }).join("");

  const fallbackCharacterId = setupPlayer[picker.slotKey] || setupPlayer[oppositeKey] || Object.keys(characterLibrary)[0] || null;
  const targetCharacter = characterLibrary[picker.inspectCharacterId] || characterLibrary[fallbackCharacterId] || null;
  const detailOpen = !!targetCharacter;
  ui.setupCharacterDetailPanel.classList.toggle("hidden", !detailOpen);
  ui.setupCharacterDetailPanel.setAttribute("aria-hidden", detailOpen ? "false" : "true");
  ui.setupCharacterDetailPanel.innerHTML = detailOpen
    ? buildCharacterDetailContent(targetCharacter, "Character Info", null)
    : "";
  scheduleSetupSnapshot();
}

function sanitize(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}


function getCharacterIconAsset(characterId, variant = "default") {
  const assets = window.CHARACTER_ICON_IMAGES?.[characterId];
  return assets?.[variant] || assets?.default || "";
}

function applyCharacterIconAssets(library) {
  Object.entries(window.CHARACTER_ICON_IMAGES || {}).forEach(([characterId, assets]) => {
    const character = library[characterId];
    if (!character) return;
    if (assets.default) character.iconImage = assets.default;
    if (assets.gambler) character.gamblerIconImage = assets.gambler;
  });
}

function getCharacterDefinition(characterOrId) {
  if (!characterOrId) return null;
  if (typeof characterOrId === "string") return characterLibrary[characterOrId] || null;
  if (characterOrId.id && characterLibrary[characterOrId.id]) return characterLibrary[characterOrId.id];
  return characterOrId;
}

function getCharacterIconMarkup(characterOrId, className = "characterIconAsset--inline", decorative = true) {
  const character = getCharacterDefinition(characterOrId);
  if (!character) {
    return `<span class="characterEmojiFallback ${className}"${decorative ? ' aria-hidden="true"' : ""}>❔</span>`;
  }
  if (character.iconImage) {
    const altText = decorative ? "" : sanitize(character.displayName || character.name || "character icon");
    return `<img class="characterIconAsset ${className}" src="${sanitize(character.iconImage)}" alt="${altText}"${decorative ? ' aria-hidden="true"' : ""}>`;
  }
  return `<span class="characterEmojiFallback ${className}"${decorative ? ' aria-hidden="true"' : ""}>${sanitize(character.icon || "❔")}</span>`;
}

function getPlayerCharacterIconMarkup(player, className = "characterIconAsset--inline", decorative = true) {
  if (!player) return getCharacterIconMarkup(null, className, decorative);
  if (player.isRascaTailCombatant) {
    const altText = decorative ? "" : "detached tail icon";
    return `<img class="characterIconAsset ${className}" src="${sanitize(getCharacterIconAsset("trickster2", "tail"))}" alt="${altText}"${decorative ? ' aria-hidden="true"' : ""}>`;
  }
  const character = getCharacterDefinition(player.activeCharacterId);
  if (character?.id === "trickster1" && isMimiInGamblerMode(player)) {
    const altText = decorative ? "" : sanitize(character.displayName || character.name || "character icon");
    return `<img class="characterIconAsset ${className}" src="${sanitize(character.gamblerIconImage || character.iconImage)}" alt="${altText}"${decorative ? ' aria-hidden="true"' : ""}>`;
  }
  return getCharacterIconMarkup(player.activeCharacterId, className, decorative);
}

function createPlayer(setupIndex, config) {
  const activeTemplate = characterLibrary[config.mainCharacterId];
  const benchTemplate = config.subCharacterId ? characterLibrary[config.subCharacterId] : null;

  return {
    id: `player-${setupIndex}`,
    setupIndex,
    name: config.name,
    isComputer: config.controller === "computer",
    teamKey: normalizeTeamKey(config.teamKey, setupIndex),
    icon: activeTemplate.iconImage || activeTemplate.icon,
    selectedCharacters: [config.mainCharacterId, config.subCharacterId].filter(Boolean),
    activeCharacterId: config.mainCharacterId,
    benchCharacterId: config.subCharacterId || null,
    royalRole: config.royalRole || getDefaultRoyalMarchRole(setupIndex),
    royalBonusPoints: 0,
    activeCharacterData: createCharacterState(activeTemplate),
    benchCharacterData: benchTemplate ? createCharacterState(benchTemplate) : null,
    baseStats: deepClone(activeTemplate.stats),
    currentStats: deepClone(activeTemplate.stats),
    tempMaxBonus: { attack: 0, hp: 0, technique: 0 },
    position: null,
    startPosition: null,
    startCornerKey: null,
    items: [],
    swapAvailable: true,
    statuses: {
      hiddenTurns: 0,
      poisonMarkers: [],
      poisonZoneTurns: {},
      slowZoneImmunity: new Set(),
      pitImmunity: new Set(),
      zoneEntryPrompted: new Set(),
      mesmerSyncRounds: 0,
      mesmerSyncBattleRemaining: 0,
      pushAheadRounds: 0,
      corvenOmenGauge: 0,
      corvenTurnLossTotal: 0,
      corvenCurseTurns: 0,
      corvenAutoHealTurns: 0,
      hobbsProtectiveDetail: null,
      hobbsBattleProtect: null,
      mimiMode: "star",
      mimiNextDiceBoost: 0,
      mimiForceDiceOne: false,
      brakkPaintBomb: null,
      brakkLastOwnMoveDistance: null
    },
    cooldowns: {
      painter2Hide: 0,
      painter3Backblast: 0,
      painter4Backtrack: 0,
      trapper1Zone: 0,
      trapper3VenomVarnish: 0,
      trickster3FieldCache: 0,
      trickster3BaitedBoulder: 0,
      tanker2Quickdig: 0,
      tanker3ProtectiveDetail: 0,
      tanker3BreakItUp: 0,
      battler3MesmerSync: 0,
      battler4BleakOffering: 0,
      battler5EmergencyCallout: 0,
      supporter1PushAhead: 0,
      supporter2FreshBatch: 0,
      mimiOffRecord: 0,
      rascaShedRelay: 0,
      rascaSnapback: 0
    },
    turnFlags: {
      usedSkill: false,
      skippedMoveByRest: false,
      noBattleThisTurn: false,
      forcedMoveLimit: false,
      mimiRouletteUsed: false,
      moppetEmergencyCalloutPrimed: false,
      brakkPrimedPayloadApplied: false
    },
    ownedFlag: false,
    flagPoints: 0,
    foodSlot: null,
    battleWins: 0,
    attackDrainValue: 0,
    hpLostThisLife: 0,
    hpLossMilestonesAwarded: 0,
    battleExhaustionMax: 5,
    startTileProtected: true
  };
}

function createCharacterState(template) {
  return {
    id: template.id,
    name: template.name,
    icon: template.iconImage || template.icon,
    type: template.type,
    stats: deepClone(template.stats),
    summary: template.summary,
    skillText: template.skillText
  };
}

function createBoard() {
  const mapDefinition = getSelectedMapDefinition();
  const obstacleMap = new Map(mapDefinition.getObstacleEntries().map((entry) => [`${entry.row},${entry.col}`, entry.obstacleId]));
  const specialsByCell = new Map();
  const groundItemsByCell = new Map();
  const territoriesByCell = new Map();
  (mapDefinition.specialTiles || []).forEach((entry) => {
    const key = `${entry.row},${entry.col}`;
    if (entry.type === "flag") {
      groundItemsByCell.set(key, { id: "flag", name: "Flag", icon: "flag-model" });
      return;
    }
    if (!specialsByCell.has(key)) specialsByCell.set(key, []);
    specialsByCell.get(key).push(entry.type);
  });
  (mapDefinition.territories || []).forEach((territory) => {
    for (let row = territory.rowStart; row <= territory.rowEnd; row += 1) {
      for (let col = territory.colStart; col <= territory.colEnd; col += 1) {
        const key = `${row},${col}`;
        if (!territoriesByCell.has(key)) territoriesByCell.set(key, []);
        territoriesByCell.get(key).push(territory.id);
      }
    }
  });
  const board = [];
  for (let row = 0; row < (mapDefinition.rows || 0); row += 1) {
    const rowCells = [];
    for (let col = 0; col < (mapDefinition.cols || 0); col += 1) {
      const playable = isPlayableMapCell(mapDefinition, row, col);
      const key = `${row},${col}`;
      const obstacleId = playable ? (obstacleMap.get(key) || null) : null;
      rowCells.push({
        row,
        col,
        playable,
        owner: null,
        startOwner: null,
        territoryIds: playable ? [...(territoriesByCell.get(key) || [])] : [],
        special: playable ? [...(specialsByCell.get(key) || [])] : [],
        groundItem: playable && groundItemsByCell.get(key) ? { ...groundItemsByCell.get(key) } : null,
        obstacle: obstacleId ? createObstacleState(obstacleId) : null,
        skavaCache: null,
        pits: [],
        zones: [],
        playersHere: []
      });
    }
    board.push(rowCells);
  }
  return board;
}


async function startGame() {
  if (multiplayer.session.isRoomPlay) {
    if (!multiplayer.session.isHost) {
      showSimpleModal({
        title: "Waiting for host",
        body: "The host starts online room matches.",
        buttons: [{ label: "Close", style: "primary", onClick: closeTopModal }]
      });
      return;
    }
    if (!multiplayer.connected || (multiplayer.room?.players?.length || 0) < 2) {
      showSimpleModal({
        title: "Waiting for player 2",
        body: "Start the match after the second player has joined the room.",
        buttons: [{ label: "Close", style: "primary", onClick: closeTopModal }]
      });
      return;
    }
    configureHubSetupPlayersFromRoom(multiplayer.room);
    hubSend(HUB_ROOM_EVENTS.START_GAME, {
      roomCode: multiplayer.session.roomCode,
      playerId: multiplayer.session.playerId,
      gameId: HUB_GAME_ID,
      seed: Date.now()
    });
  }
  resetMatchRuntimeState();
  applyRoyalMarchSetupDefaults();
  state.matchRuntimeVersion += 1;
  const matchRuntimeVersion = state.matchRuntimeVersion;
  const setupPlayers = state.setupFlow?.players?.length
    ? state.setupFlow.players
    : createDefaultSetupPlayers();
  const configs = setupPlayers.map((entry, index) => {
    maybeApplyComputerDefaultName(entry, index);
    return {
      name: getSetupPlayerDisplayName(entry, index),
      controller: getSetupPlayerController(entry),
      teamKey: normalizeTeamKey(entry.teamKey, index),
      mainCharacterId: entry.mainCharacterId,
      subCharacterId: getEffectiveSetupSubCharacterId(entry),
      royalRole: getRoyalMarchRoleForSetupPlayer(entry, index)
    };
  });

  const hasDuplicateOwn = configs.some((config) => config.controller !== "computer" && config.mainCharacterId === config.subCharacterId);
  if (hasDuplicateOwn) {
    showSimpleModal({
      title: "Character selection error",
      body: "Choose different characters for the same player's Starter and Reserve.",
      buttons: [{ label: "Close", style: "primary", onClick: closeTopModal }]
    });
    return;
  }

  state.matchMode = (isRoyalMarchMap() || isFoodCourtMap()) ? "team" : (state.setupFlow?.matchMode || "ffa");
  state.board = createBoard();
  state.players = configs.map((config, index) => createPlayer(index, config));
  state.venomVarnishes = [];
  state.veskaThreadEffects = [];
  state.rascaTailImpactEffects = [];
  state.rascaClones = [];
  initializeCaptureTerritoryState();
  initializeFoodCourtState();
  state.round = 1;
  state.completedTurnsInRound = 0;
  state.lastRoundActive = false;
  state.lastRoundHudActive = false;
  state.lastRoundReason = '';
  state.gameOver = false;
  state.logEntries = [];
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = 0;
  state.setupSelection.active = false;
  state.setupSelection.availableCorners = [];
  state.setupSelection.currentPlayerIndex = null;
  state.setupSelection.resolve = null;
  state.phase = "game";

  ui.setupScreen.classList.remove("active");
  ui.gameScreen.classList.add("active");

  renderAll();

  log("Starting the game. Determining turn order.", true);
  state.order = await determineOrderAnimated();
  if (!isMatchRuntimeCurrent(matchRuntimeVersion)) return;
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = state.order[0];
  renderAll();

  await setupInitialBases();
  if (!isMatchRuntimeCurrent(matchRuntimeVersion)) return;
  evaluateLastRoundState({ announce: false });
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = state.order[0];
  beginTurn();
}

async function determineOrderAnimated() {
  let unresolved = state.players.map((_, index) => index);
  const rolls = Array.from({ length: state.players.length }, () => null);

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { values, tied } = await animateOrderCounterSequence(unresolved, rolls);
    values.forEach((value, index) => {
      if (value !== null && value !== undefined) rolls[index] = value;
    });

    if (!tied.length) {
      const sorted = state.players.map((_, index) => index).sort((a, b) => rolls[b] - rolls[a]);
      return sorted;
    }

    unresolved = tied;
    log(`${tied.map((index) => state.players[index].name).join(" and ")} tied, so the numbers will be decided again.`, true);
  }
}

async function setupInitialBases() {
  if (setupFoodCourtInitialBases()) {
    state.currentTurnOrderIndex = 0;
    state.currentPlayerIndex = state.order[0];
    renderAll();
    return;
  }
  const mapDefinition = getSelectedMapDefinition();
  const corners = (mapDefinition.startCorners || []).map((entry, index) => ({
    key: entry.key || `start-${index}`,
    row: entry.row,
    col: entry.col,
    label: entry.label || `Start ${index + 1}`,
    teamKey: entry.teamKey || null
  }));
  const available = [...corners];

  for (const playerIndex of state.order) {
    const player = state.players[playerIndex];
    state.currentPlayerIndex = playerIndex;
    renderAll();
    // eslint-disable-next-line no-await-in-loop
    const eligible = isRoyalMarchMapActive()
      ? available.filter((corner) => !corner.teamKey || normalizeTeamKey(corner.teamKey) === normalizeTeamKey(player.teamKey, playerIndex))
      : available;
    const selected = await chooseCorner(player, eligible.length ? eligible : available);
    available.splice(available.findIndex((corner) => corner.key === selected.key), 1);
    player.position = { row: selected.row, col: selected.col };
    player.startPosition = { row: selected.row, col: selected.col };
    player.startCornerKey = selected.key;
    const cell = getCell(selected.row, selected.col);
    cell.owner = playerIndex;
    cell.startOwner = playerIndex;
    log(`${player.name}'s starting tile is ${selected.label}.`, true);
    state.setupSelection.active = false;
    state.setupSelection.availableCorners = [];
    state.setupSelection.currentPlayerIndex = null;
    state.setupSelection.computerChoiceMode = null;
    state.setupSelection.resolve = null;
    renderAll();
  }
  state.currentTurnOrderIndex = 0;
  state.currentPlayerIndex = state.order[0];
}

function chooseCorner(player, availableCorners) {
  return new Promise((resolve) => {
    state.setupSelection.active = true;
    state.setupSelection.availableCorners = availableCorners.map((corner) => ({ ...corner }));
    state.setupSelection.currentPlayerIndex = player.setupIndex;
    state.setupSelection.computerChoiceMode = isComputerPlayer(player) && !state.setupSelection.autoPlaceAllComputers ? "prompt" : null;
    state.setupSelection.resolve = (corner) => {
      state.setupSelection.active = false;
      state.setupSelection.availableCorners = [];
      state.setupSelection.currentPlayerIndex = null;
      state.setupSelection.computerChoiceMode = null;
      state.setupSelection.resolve = null;
      resolve(corner);
    };
    renderAll();
    if (isComputerPlayer(player) && state.setupSelection.autoPlaceAllComputers && typeof state.setupSelection.resolve === "function") {
      window.setTimeout(() => {
        if (!state.setupSelection.active || state.setupSelection.currentPlayerIndex !== player.setupIndex) return;
        const selected = chooseComputerStartingCorner(availableCorners);
        if (selected) {
          state.setupSelection.resolve(selected);
        }
      }, 720);
    }
  });
}

function chooseComputerStartingCorner(availableCorners) {
  const ordered = [...availableCorners].sort((a, b) => {
    const scoreA = a.row + a.col;
    const scoreB = b.row + b.col;
    return scoreA - scoreB;
  });
  return ordered[0] || availableCorners[0] || null;
}

function chooseCurrentComputerStartingCorner(autoPlaceAll = false) {
  if (!state.setupSelection.active || typeof state.setupSelection.resolve !== "function") return;
  const player = state.players[state.setupSelection.currentPlayerIndex];
  if (!player || !isComputerPlayer(player)) return;
  if (autoPlaceAll) state.setupSelection.autoPlaceAllComputers = true;
  const selected = chooseComputerStartingCorner(state.setupSelection.availableCorners);
  if (selected) state.setupSelection.resolve(selected);
}

function chooseCurrentComputerStartManually() {
  if (!state.setupSelection.active) return;
  const player = state.players[state.setupSelection.currentPlayerIndex];
  if (!player || !isComputerPlayer(player)) return;
  state.setupSelection.computerChoiceMode = "manual";
  renderAll();
}


function beginTurn() {
  if (state.gameOver) return;
  const matchRuntimeVersion = state.matchRuntimeVersion;
  const player = getCurrentPlayer();
  state.roundTransitionActive = false;
  state.turnHadBattle = false;
  state.turnCapturedEnemyCount = 0;
  state.turnUsedItem = false;
  state.selectedPath = [];
  state.selectedPaintTargets = [];
  state.currentAction = null;
  state.moveDie = null;
  state.paintDie = null;
  state.remainingMove = 0;
  state.remainingPaint = 0;
  state.turnMoveCountBonus = 0;
  state.turnPaintCountBonus = 0;
  state.turnNormalMoveDistance = 0;
  state.allowFreeCameraDuringInput = false;
  state.turnActionOrigin = null;
  state.turnActionOriginalOwners = {};
  state.ui.itemTrayOpen = false;
  state.ui.swapBubbleOpen = false;
  state.ui.skillPanelOpen = false;
  state.ui.diceBubbleOpen = false;
  state.ui.restBubbleOpen = false;
  state.ui.rightPanelMode = null;
  state.ui.selectedItemIndex = null;
  state.ui.obstaclePrompt = null;
  state.ui.zoneEnhancePrompt = null;
  state.ui.zoneEntryPrompt = null;
  state.ui.pitEnhancePrompt = null;
  state.ui.pitEntryPrompt = null;

  if (player.statuses.hiddenTurns > 0) player.statuses.hiddenTurns -= 1;
  refreshZoneEntryPromptState(player);
  player.turnFlags = {
    usedSkill: false,
    skippedMoveByRest: false,
    noBattleThisTurn: false,
    forcedMoveLimit: isAffectedBySlowZone(player),
    hiddenRevealThisTurn: false,
    mimiRouletteUsed: false,
    moppetEmergencyCalloutPrimed: false,
    brakkPrimedPayloadApplied: false
  };

  processZoneEndTurnDamage(player, "turnStartCleanup");
  renderAll();
  log(`${player.name}'s turn begins.`, true);

  const openingZone = getThreateningEnhancedZonesAtPoint(player, player.position)[0];
  if (openingZone) {
    void maybePromptZoneEntryDisarm(player, openingZone).then(() => {
      if (!isMatchRuntimeCurrent(matchRuntimeVersion)) return;
      player.turnFlags.forcedMoveLimit = isAffectedBySlowZone(player);
      renderAll();
      if (isComputerPlayer(player) && state.currentPlayerIndex === state.players.indexOf(player)) {
        scheduleComputerTurn(420, matchRuntimeVersion);
      }
    });
  }
  if (isComputerPlayer(player)) {
    scheduleComputerTurn(openingZone ? 980 : 520, matchRuntimeVersion);
  }
}

function getCurrentPlayer() {
  return state.players[state.currentPlayerIndex];
}

function getOtherPlayer() {
  return state.players[otherPlayerIndex(state.currentPlayerIndex)];
}


function scheduleComputerTurn(delay = 420, runtimeVersion = state.matchRuntimeVersion) {
  if (state.computerTurnTimer) {
    window.clearTimeout(state.computerTurnTimer);
    state.computerTurnTimer = null;
  }
  const player = getCurrentPlayer();
  if (!isMatchRuntimeCurrent(runtimeVersion) || !isComputerPlayer(player) || state.gameOver || state.setupSelection.active) return;
  state.computerTurnTimer = window.setTimeout(() => {
    state.computerTurnTimer = null;
    if (!isMatchRuntimeCurrent(runtimeVersion)) return;
    void runComputerTurn(player.id);
  }, delay);
}

function isComputerTurnLocked(player) {
  return !player
    || !isComputerPlayer(player)
    || isPlayerReturningToStart(player)
    || state.gameOver
    || state.setupSelection.active
    || state.movementAnimating
    || state.battleIntroRunning
    || isInteractionPromptBlocking();
}

function shouldComputerSwap(player) {
  return false;
}

function getSimulatedFullRestPlayer(player) {
  if (!player) return null;
  const partialRestoreAmount = getMoppetRestRestoreAmount(player);
  return {
    ...player,
    currentStats: {
      attack: partialRestoreAmount !== null
        ? Math.min(getCurrentMax(player, 'attack'), (Number(player.currentStats?.attack) || 0) + partialRestoreAmount)
        : getCurrentMax(player, 'attack'),
      hp: partialRestoreAmount !== null
        ? Math.min(getCurrentMax(player, 'hp'), (Number(player.currentStats?.hp) || 0) + partialRestoreAmount)
        : getCurrentMax(player, 'hp'),
      technique: partialRestoreAmount !== null
        ? Math.min(getCurrentMax(player, 'technique'), (Number(player.currentStats?.technique) || 0) + partialRestoreAmount)
        : getCurrentMax(player, 'technique')
    }
  };
}

function getComputerRestBattleSwing(player) {
  if (!player || !player.position) return 0;
  const restedPlayer = getSimulatedFullRestPlayer(player);
  if (!restedPlayer) return 0;
  let bestSwing = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - player.position.row) + Math.abs(other.position.col - player.position.col);
    if (distance > 2) return;
    const nowPlan = getBestComputerBattlePlan(player, other);
    const restedPlan = getBestComputerBattlePlan(restedPlayer, other);
    const nowWorst = nowPlan?.worstMargin ?? -999;
    const restedWorst = restedPlan?.worstMargin ?? -999;
    let swing = (restedWorst - nowWorst) * 0.18 + ((restedPlan?.guaranteedWin ? 1 : 0) - (nowPlan?.guaranteedWin ? 1 : 0)) * 3.5;
    if ((nowPlan?.losses || 3) >= 2 && (restedPlan?.losses || 3) <= 1) swing += 2.4;
    if ((nowPlan?.guaranteedLoss || false) && !(restedPlan?.guaranteedLoss || false)) swing += 3.4;
    if (distance === 1) swing += 0.9;
    bestSwing = Math.max(bestSwing, swing);
  });
  return bestSwing;
}

function shouldComputerRest(player) {
  if (!player || !maybeShowRestButton()) return false;
  const statKeys = ["attack", "hp", "technique"];
  const ratios = statKeys.map((statKey) => {
    const max = Math.max(1, getCurrentMax(player, statKey));
    return (player.currentStats[statKey] || 0) / max;
  });
  const totalMissing = statKeys.reduce((sum, statKey) => {
    return sum + Math.max(0, getCurrentMax(player, statKey) - (Number(player.currentStats?.[statKey]) || 0));
  }, 0);
  const minRatio = Math.min(...ratios);
  const hpRatio = ratios[1] || 1;
  const restBattleSwing = getComputerRestBattleSwing(player);
  const snapshot = getComputerScoreSnapshot(player);
  const closeoutUrgency = snapshot.closeoutUrgency || 0;
  if (canMoppetUseBorrowedBreakroom(player)) {
    const enemyPressure = getMoppetStartZoneProfile(player, player.position).enemyBonus;
    if (enemyPressure >= 10 && totalMissing < 34 && hpRatio >= 0.58) return false;
    return minRatio <= 0.34 || hpRatio <= 0.48 || totalMissing >= 72 || restBattleSwing >= 5.8 || (totalMissing >= 42 && enemyPressure >= 10) || (closeoutUrgency > 0.82 && hpRatio <= 0.62);
  }
  if (player.activeCharacterId === "tanker3") {
    const guardActive = !!getHobbsProtectiveDetailState(player) || !!getHobbsBattleProtectState(player);
    if (guardActive && hpRatio >= 0.56 && totalMissing < 48) return false;
    return hpRatio <= 0.38 || minRatio <= 0.34 || totalMissing >= 82 || restBattleSwing >= 5.1 || (closeoutUrgency > 0.72 && hpRatio <= 0.58);
  }
  if (player.activeCharacterId === 'battler2') {
    return minRatio <= 0.28 || hpRatio <= 0.34 || totalMissing >= 95 || restBattleSwing >= 5.2 || (closeoutUrgency > 0.75 && hpRatio <= 0.72);
  }
  return minRatio <= 0.45 || hpRatio <= 0.58 || totalMissing >= 55 || restBattleSwing >= 4.3 || (closeoutUrgency > 0.75 && hpRatio <= 0.76);
}

function canComputerBreakObstacle(player, cell) {
  const obstacle = cell?.obstacle;
  if (!player || !obstacle) return false;
  if (isSkavaBoulderProtected(obstacle)) return false;
  const allowedStat = obstacle.allowedStat;
  const available = Math.max(0, Number(player.currentStats?.[allowedStat]) || 0);
  const hp = Math.max(0, Number(obstacle.hp) || 0);
  return available >= hp && hp > 0;
}

function canTorgaUseCragstep(player) {
  return !!player && player.activeCharacterId === "painter4" && Number(state.moveDie) === 1;
}

function getStandardMoveDeltas(player) {
  const deltas = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ];
  if (canTorgaUseCragstep(player)) {
    deltas.push(
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    );
  }
  return deltas;
}

function getComputerMoveCandidates(player, point, visited, remainingSteps, paintBudget, path, results) {
  const score = scoreComputerPath(player, path, paintBudget);
  results.push({ path: path.map((entry) => ({ ...entry })), score });
  if (remainingSteps <= 0) return;
  const deltas = getStandardMoveDeltas(player);
  deltas.forEach((delta) => {
    const nextRow = point.row + delta.row;
    const nextCol = point.col + delta.col;
    const cell = getCell(nextRow, nextCol);
    const key = `${nextRow},${nextCol}`;
    if (!cell || visited.has(key)) return;
    if (!canPlayerEnterMapCell(player, cell)) return;
    if (cell.obstacle && !canComputerBreakObstacle(player, cell)) return;
    const playerIndex = state.players.indexOf(player);
    const additionalPaint = cell.owner === null && canPlayerRepaintCell(playerIndex, cell) ? 1 : 0;
    if (paintBudget - additionalPaint < 0) return;
    visited.add(key);
    path.push({ row: nextRow, col: nextCol });
    getComputerMoveCandidates(player, { row: nextRow, col: nextCol }, visited, remainingSteps - 1, paintBudget - additionalPaint, path, results);
    path.pop();
    visited.delete(key);
  });
}

function getRoyalMarchComputerMoveCandidates(player) {
  const origin = player.position ? { ...player.position } : null;
  if (!origin || !state.moveDie) return [{ path: origin ? [origin] : [], score: -999 }];
  const moveAllowance = getCurrentTurnMoveAllowance();
  const candidates = [{ path: [origin], score: scoreComputerPath(player, [origin]) }];
  const previousSelection = state.selectedPath;
  const previousCurrent = state.currentPlayerIndex;
  state.currentPlayerIndex = state.players.indexOf(player);
  const enqueue = (candidatePath) => {
    if (!isValidRoyalMarchMovePath(candidatePath)) return;
    candidates.push({
      path: candidatePath.map((point) => ({ ...point })),
      score: scoreComputerPath(player, candidatePath)
    });
  };
  const role = getRoyalMarchRoleForPlayer(player);
  if (role === "king") {
    const explore = (path, remaining) => {
      if (remaining <= 0) return;
      for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
          if (dr === 0 && dc === 0) continue;
          const next = { row: path[path.length - 1].row + dr, col: path[path.length - 1].col + dc };
          if (path.some((point) => point.row === next.row && point.col === next.col)) continue;
          const candidatePath = [...path, next];
          if (!isValidRoyalMarchMovePath(candidatePath)) continue;
          enqueue(candidatePath);
          explore(candidatePath, remaining - 1);
        }
      }
    };
    explore([origin], moveAllowance);
  } else if (role === "knight") {
    const deltas = [
      { row: -2, col: -1 }, { row: -2, col: 1 }, { row: -1, col: -2 }, { row: -1, col: 2 },
      { row: 1, col: -2 }, { row: 1, col: 2 }, { row: 2, col: -1 }, { row: 2, col: 1 }
    ];
    const explore = (path, remaining) => {
      if (remaining <= 0) return;
      deltas.forEach((delta) => {
        const last = path[path.length - 1];
        const next = { row: last.row + delta.row, col: last.col + delta.col };
        if (path.some((point) => point.row === next.row && point.col === next.col)) return;
        const candidatePath = [...path, next];
        if (!isValidRoyalMarchMovePath(candidatePath)) return;
        enqueue(candidatePath);
        explore(candidatePath, remaining - 1);
      });
    };
    explore([origin], moveAllowance);
  } else {
    const deltas = [];
    if (role === "rook" || role === "queen") deltas.push({ row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 });
    if (role === "bishop" || role === "queen") deltas.push({ row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 });
    deltas.forEach((delta) => {
      const path = [origin];
      for (let step = 1; step <= moveAllowance; step += 1) {
        path.push({ row: origin.row + delta.row * step, col: origin.col + delta.col * step });
        if (!isValidRoyalMarchMovePath(path)) break;
        enqueue(path);
      }
    });
  }
  state.selectedPath = previousSelection;
  state.currentPlayerIndex = previousCurrent;
  return candidates;
}

function getComputerCurrentScore(player) {
  if (!player) return 0;
  const playerIndex = state.players.indexOf(player);
  if (playerIndex === -1) return getDisplayedBonusPoints(player);
  return getPlayerCurrentScore(playerIndex);
}

function getComputerStrategicScore(player) {
  if (!player) return 0;
  if (!isTeamModeEnabled()) return getComputerCurrentScore(player);
  const playerIndex = state.players.indexOf(player);
  if (playerIndex === -1) return getComputerCurrentScore(player);
  const teamKey = normalizeTeamKey(player.teamKey, playerIndex);
  return state.players.reduce((sum, member, index) => {
    if (!member) return sum;
    if (normalizeTeamKey(member.teamKey, index) !== teamKey) return sum;
    return sum + getPlayerCurrentScore(index);
  }, 0);
}

function getComputerCloseoutUrgency(player, snapshot = null) {
  if (!player) return 0;
  if (doesCurrentMapUseFlagDeliveryWin()) return 0;
  const info = snapshot || getComputerScoreSnapshot(player);
  const lead = Math.max(0, Number(info.scoreLeadOverSecond) || 0);
  const neutralTiles = Math.max(0, Number(info.neutralTiles) || 0);
  if (!info.leading) return 0;
  if (neutralTiles > 10) return 0;
  if (lead <= 0) return 0;
  const leadConfidence = Math.min(1.6, lead / Math.max(4, neutralTiles * 0.9 + 2));
  let urgency = leadConfidence;
  if (neutralTiles <= 6) urgency += 0.35;
  if (info.endgame) urgency += 0.2;
  if (info.veryLate) urgency += 0.15;
  return Math.max(0, Math.min(2.2, urgency));
}

function getRemainingClaimableTileCount() {
  let count = 0;
  for (let row = 0; row < getBoardRows(); row += 1) {
    for (let col = 0; col < getBoardCols(); col += 1) {
      const cell = getCell(row, col);
      if (!cell || cell.obstacle) continue;
      if (cell.owner === null) count += 1;
    }
  }
  return count;
}

function getComputerScoreSnapshot(player) {
  if (!player) {
    return {
      ownScore: 0,
      ownRank: 1,
      leaderScore: 0,
      secondScore: 0,
      lowestScore: 0,
      scoreGapToLeader: 0,
      scoreLeadOverSecond: 0,
      trailing: false,
      leading: false,
      endgame: false,
      veryLate: false,
      roundsRemaining: 0,
      neutralTiles: 0
    };
  }
  const ownScore = getComputerStrategicScore(player);
  const scoreboard = state.players
    .filter((entry) => !!entry)
    .map((entry) => ({ player: entry, score: getComputerStrategicScore(entry) }))
    .sort((a, b) => b.score - a.score);
  const leaderScore = scoreboard[0]?.score || ownScore;
  const secondScore = scoreboard[Math.min(1, Math.max(0, scoreboard.length - 1))]?.score || leaderScore;
  const lowestScore = scoreboard[scoreboard.length - 1]?.score || ownScore;
  const ownRank = Math.max(1, scoreboard.findIndex((entry) => entry.player === player) + 1 || 1);
  const roundsRemaining = Math.max(0, getCurrentMapMaxRounds() - (Number(state.round) || 1));
  const neutralTiles = getRemainingClaimableTileCount();
  const leading = ownScore >= leaderScore;
  const trailing = ownScore < leaderScore;
  const endgame = !!state.lastRoundActive || roundsRemaining <= 1 || neutralTiles <= 8;
  const veryLate = !!state.lastRoundActive || roundsRemaining === 0 || neutralTiles <= 4;
  const closeoutUrgency = getComputerCloseoutUrgency(player, {
    ownScore,
    ownRank,
    leaderScore,
    secondScore,
    lowestScore,
    scoreGapToLeader: Math.max(0, leaderScore - ownScore),
    scoreLeadOverSecond: Math.max(0, ownScore - secondScore),
    trailing,
    leading,
    endgame,
    veryLate,
    roundsRemaining,
    neutralTiles
  });
  return {
    ownScore,
    ownRank,
    leaderScore,
    secondScore,
    lowestScore,
    scoreGapToLeader: Math.max(0, leaderScore - ownScore),
    scoreLeadOverSecond: Math.max(0, ownScore - secondScore),
    trailing,
    leading,
    endgame,
    veryLate,
    roundsRemaining,
    neutralTiles,
    closeoutUrgency
  };
}

function isFlagCarrierMapActive() {
  return getSelectedMapDefinition()?.id === "flagCarrier";
}

function getFlagCarrierMapUrgency(player) {
  if (!isFlagCarrierMapActive() || !player) return 0;
  return 1;
}

function getFlagCarrierMaxPriorityValue(player, opponent = null) {
  if (!isFlagCarrierMapActive() || !player) return 0;
  let value = 0;
  if (playerHasFlag(player)) value += 120;
  if (opponent && !arePlayersAllied(player, opponent) && playerHasFlag(opponent)) value += 135;
  return value;
}

function getFlagCarrierFrontlineValue(player, point) {
  if (!isFlagCarrierMapActive() || !player || !point) return 0;
  const cell = getCell(point.row, point.col);
  if (!cell || cell.obstacle) return -999;
  let value = 0;
  const rowDistanceFromMid = Math.abs(point.row - 6);
  const colDistanceFromCore = Math.abs(point.col - 6);

  // The map is a long corridor that bottlenecks around rows 5-8 and the final approach.
  // Defensive characters must still contest that lane instead of idling near spawn.
  if (point.row >= 5 && point.row <= 8) value += 10.5;
  else if (point.row >= 4 && point.row <= 9) value += 4.5;
  value += Math.max(0, 8 - rowDistanceFromMid * 1.6);
  if (point.col >= 1 && point.col <= 6) value += 2.4;
  if (point.col >= 4 && point.col <= 6) value += 2.8;
  if (point.col >= 6) value += 2.2;
  value += Math.max(0, 3.5 - colDistanceFromCore * 0.7);

  const homeDistance = getDistanceToNearestAlliedStart(player, point);
  if (!playerHasFlag(player)) {
    if (homeDistance === 0) value -= 12;
    else if (homeDistance === 1) value -= 8;
    else if (homeDistance === 2) value -= 4;
  }

  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (playerHasFlag(other)) {
      if (distance === 0) value += 44;
      else if (distance === 1) value += 28;
      else if (distance === 2) value += 18;
      else if (distance === 3) value += 10;
      else if (distance === 4) value += 4;
    } else {
      if (distance === 1) value += 3.8;
      else if (distance === 2) value += 1.9;
    }
  });

  if (isTeamModeEnabled()) {
    state.players.forEach((other) => {
      if (!other || other.id === player.id || !other.position || !arePlayersAllied(player, other)) return;
      const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
      if (playerHasFlag(other)) {
        if (distance === 1) value += 14;
        else if (distance === 2) value += 9;
        else if (distance === 3) value += 4;
      } else if (other.position.row >= 5 && other.position.row <= 8) {
        if (distance === 1) value += 1.8;
        else if (distance === 2) value += 1.1;
      }
    });
  }

  if (cell.owner === null) value += 0.6;
  else if (!isFriendlyOwner(cell.owner, state.currentPlayerIndex)) value += 2.2;
  return value;
}

function getComputerPriorityTargetValue(player, opponent) {
  if (!player || !opponent || arePlayersAllied(player, opponent)) return 0;
  const snapshot = getComputerScoreSnapshot(player);
  const opponentScore = getComputerStrategicScore(opponent);
  const leaderScore = snapshot.leaderScore;
  let value = 0;
  if (playerHasFlag(opponent)) value += Math.max(4.5, FLAG_POINTS * 0.42);
  if (opponentScore >= leaderScore) value += snapshot.endgame ? 4.2 : 2.8;
  if (opponentScore > snapshot.ownScore) value += Math.min(4.5, (opponentScore - snapshot.ownScore) * (snapshot.endgame ? 0.75 : 0.42));
  if (snapshot.trailing) value += Math.min(2.4, snapshot.scoreGapToLeader * 0.16);
  if (isFlagCarrierMapActive() && playerHasFlag(opponent)) value += 135;
  value += getCaptureTerritoryBattleTargetBonus(player, opponent, opponent.position) * 0.18;
  return value;
}

function getComputerCorvenBlackFeatherValue(player, opponent, estimate = null) {
  if (!player || !opponent || player.activeCharacterId !== "battler4" || arePlayersAllied(player, opponent)) return 0;
  if (playerHasFlag(player)) return 0;
  const omen = getCorvenOmenGauge(player);
  if (omen < 25) return 0;
  const snapshot = getComputerScoreSnapshot(player);
  const targetBonus = getComputerPriorityTargetValue(player, opponent);
  const opponentCell = opponent.position ? getCell(opponent.position.row, opponent.position.col) : null;
  const lossChance = estimate
    ? (estimate.guaranteedLoss ? 1 : Math.max(0, Number(estimate.weightedLosses) || 0))
    : 1;
  let value = 0;
  if (omen >= 100) {
    const highValueTarget = playerHasFlag(opponent) || targetBonus >= 5.5 || isRoyalMarchKing(opponent);
    value += 9 + targetBonus * 1.2;
    if (playerHasFlag(opponent)) value += isFlagCarrierMapActive() ? 220 : 18;
    if (snapshot.endgame) value += 4.8;
    if (isRoyalMarchKing(opponent)) value += 12;
    if (opponentCell && doesCurrentMapUseControlAreaWin() && isCellInControlArea(opponentCell)) value += 10;
    if (opponentCell) value += getCaptureTerritoryBattleTargetBonus(player, opponent, opponent.position) * 0.22;
    if (!highValueTarget) value -= 7.5;
  } else if (omen >= 75) {
    value += 3.4 + targetBonus * 0.68 + (snapshot.endgame ? 1.4 : 0);
    if (playerHasFlag(opponent)) value += isFlagCarrierMapActive() ? 8 : 2.2;
  } else if (omen >= 50) {
    value += 2.1 + targetBonus * 0.48;
  } else {
    value += 1.1 + targetBonus * 0.26;
  }
  return value * lossChance;
}

function getComputerCorvenPriorityNearPoint(player, point) {
  if (!player || player.activeCharacterId !== "battler4" || !point) return 0;
  let value = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (distance > 2) return;
    const targetValue = getComputerPriorityTargetValue(player, other)
      + (playerHasFlag(other) ? (isFlagCarrierMapActive() ? 28 : 6) : 0)
      + (isRoyalMarchKing(other) ? 7 : 0);
    const weight = distance === 0 ? 1.1 : distance === 1 ? 0.82 : 0.45;
    value += targetValue * weight;
  });
  return value;
}

function getComputerVisibleFlagCarrierPressureValue(player, point) {
  if (!player || !point) return 0;
  let value = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!playerHasFlag(other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (isFlagCarrierMapActive()) {
      if (distance === 0) value += 120;
      else if (distance === 1) value += 70;
      else if (distance === 2) value += 34;
      else if (distance === 3) value += 16;
      return;
    }
    if (distance === 0) value += Math.max(5.6, FLAG_POINTS * 0.55);
    else if (distance === 1) value += Math.max(3.4, FLAG_POINTS * 0.28);
    else if (distance === 2) value += 1.25;
  });
  return value;
}

function getFlagCarrierPathPriorityBonus(player, endpoint, endCell, opponentOnEndpoint = null) {
  if (!isFlagCarrierMapActive() || !player || !endpoint || !endCell) return 0;
  if (playerHasFlag(player)) {
    const homeDistance = getDistanceToNearestAlliedStart(player, endpoint);
    if (isAlliedStartTileForPlayer(player, endpoint.row, endpoint.col)) return 5000;
    if (Number.isFinite(homeDistance)) return Math.max(0, 2400 - homeDistance * 260);
    return 0;
  }

  let bonus = 0;
  if (endCell.groundItem?.id === 'flag' || endCell.special.includes('flag')) bonus += 4200;

  const flagAccess = getFlagAccessScoreAtPoint(endpoint.row, endpoint.col);
  if (flagAccess > 0) bonus += flagAccess * 14;

  const canStealFlag = opponentOnEndpoint
    && playerHasFlag(opponentOnEndpoint)
    && !arePlayersAllied(player, opponentOnEndpoint)
    && canBattleOccurAtCellForPlayers(player, opponentOnEndpoint, endpoint.row, endpoint.col);
  if (canStealFlag) bonus += 4600;

  bonus += getComputerVisibleFlagCarrierPressureValue(player, endpoint) * 16;
  return bonus;
}

function getFoodCourtTeamMembers(teamKey) {
  if (!isFoodCourtMapActive()) return [];
  const normalizedTeamKey = normalizeTeamKey(teamKey);
  return state.players
    .map((member, index) => ({ member, index }))
    .filter(({ member, index }) => !!member && normalizeTeamKey(member.teamKey, index) === normalizedTeamKey);
}

function getFoodCourtMissingFoods(teamKey) {
  return FOOD_COURT_FOOD_ORDER.filter((foodType) => !isFoodCourtFoodDeliveredForTeam(teamKey, foodType));
}

function getFoodCourtFoodNeedValue(teamKey, foodType) {
  if (!foodType || isFoodCourtFoodDeliveredForTeam(teamKey, foodType)) return 0;
  const deliveredCount = getFoodCourtDeliveredCount(teamKey);
  let value = 88 + deliveredCount * 34;
  if (deliveredCount >= FOOD_COURT_FOOD_ORDER.length - 1) value += 95;
  return value;
}

function isFoodCourtLowerSidePlayer(player) {
  if (!isFoodCourtMapActive() || !player) return false;
  const start = player.startPosition || player.position;
  return !!start && start.row >= 7;
}

function getFoodCourtNearestOwnSeatDistance(player, point) {
  if (!isFoodCourtMapActive() || !player || !point) return Infinity;
  const playerIndex = state.players.indexOf(player);
  const teamKey = normalizeTeamKey(player.teamKey, playerIndex);
  const teamState = getFoodCourtTeamState(teamKey);
  let best = Infinity;
  (teamState?.tableIds || []).forEach((tableId) => {
    const table = getFoodCourtTableDefinition(tableId);
    (table?.starts || []).forEach((seat) => {
      best = Math.min(best, Math.abs(seat.row - point.row) + Math.abs(seat.col - point.col));
    });
  });
  return best;
}

function getFoodCourtBestApproachBonus(point, targets, weight = 1) {
  if (!point || !targets?.length) return 0;
  let best = 0;
  targets.forEach((target) => {
    if (!target) return;
    const distance = Math.abs(target.row - point.row) + Math.abs(target.col - point.col);
    best = Math.max(best, Math.max(0, (10 - distance) * weight));
  });
  return best;
}

function getFoodCourtCompletionOutcomeValue(player, teamKey, deliveredFoodType) {
  if (!isFoodCourtMapActive() || !player || !teamKey || !deliveredFoodType) return 0;
  if (isFoodCourtFoodDeliveredForTeam(teamKey, deliveredFoodType)) return 0;
  const deliveredCount = getFoodCourtDeliveredCount(teamKey);
  if (deliveredCount < FOOD_COURT_FOOD_ORDER.length - 1) return 0;
  const ownBaseScore = getComputerStrategicScore(player);
  const ownProjected = ownBaseScore + getFoodCourtFoodBonusAfterDelivery(teamKey, deliveredFoodType);
  let bestOpponent = -Infinity;
  state.players.forEach((other, index) => {
    if (!other || arePlayersAllied(player, other)) return;
    const otherTeamKey = normalizeTeamKey(other.teamKey, index);
    const otherBaseScore = getComputerStrategicScore(other);
    bestOpponent = Math.max(bestOpponent, otherBaseScore + getFoodCourtFoodBonus(otherTeamKey));
  });
  if (!Number.isFinite(bestOpponent)) return 95;
  return ownProjected >= bestOpponent ? 150 : -260;
}

function getFoodCourtFoodBonusAfterDelivery(teamKey, deliveredFoodType) {
  const teamState = getFoodCourtTeamState(teamKey);
  if (!teamState || !deliveredFoodType) return getFoodCourtFoodBonus(teamKey);
  const deliveredCount = FOOD_COURT_FOOD_ORDER.reduce((sum, foodType) => {
    return sum + ((teamState.deliveredFoods?.[foodType] || foodType === deliveredFoodType) ? 1 : 0);
  }, 0);
  return deliveredCount * 5 + (deliveredCount >= FOOD_COURT_FOOD_ORDER.length ? 15 : 0);
}

function shouldComputerDelayFoodCourtCompletion(player, teamKey, deliveredFoodType) {
  if (!isComputerPlayer(player)) return false;
  return getFoodCourtCompletionOutcomeValue(player, teamKey, deliveredFoodType) < -80;
}

function getFoodCourtCarrierThreatValue(observer, carrier) {
  if (!isFoodCourtMapActive() || !observer || !carrier?.foodSlot) return 0;
  const carrierIndex = state.players.indexOf(carrier);
  const carrierTeamKey = normalizeTeamKey(carrier.teamKey, carrierIndex);
  const foodType = carrier.foodSlot.id;
  const needValue = getFoodCourtFoodNeedValue(carrierTeamKey, foodType);
  if (needValue <= 0) return 0;
  const tableDistance = getFoodCourtNearestOwnSeatDistance(carrier, carrier.position);
  let value = needValue * 0.12;
  if (getFoodCourtDeliveredCount(carrierTeamKey) >= FOOD_COURT_FOOD_ORDER.length - 1) value += 30;
  if (Number.isFinite(tableDistance)) value += Math.max(0, 24 - tableDistance * 4.5);
  return value;
}

function getFoodCourtEscortValue(player, point) {
  if (!isFoodCourtMapActive() || !player || !point || !isTeamModeEnabled()) return 0;
  let value = 0;
  const playerIndex = state.players.indexOf(player);
  const teamKey = normalizeTeamKey(player.teamKey, playerIndex);
  state.players.forEach((ally, allyIndex) => {
    if (!ally || ally.id === player.id || !ally.position) return;
    if (normalizeTeamKey(ally.teamKey, allyIndex) !== teamKey) return;
    const allyFoodType = getFoodCourtHeldFoodType(ally);
    if (!allyFoodType || isFoodCourtFoodDeliveredForTeam(teamKey, allyFoodType)) return;
    const distance = Math.abs(ally.position.row - point.row) + Math.abs(ally.position.col - point.col);
    const importance = getFoodCourtFoodNeedValue(teamKey, allyFoodType);
    if (distance === 1) value += importance * 0.28;
    else if (distance === 2) value += importance * 0.18;
    else if (distance === 3) value += importance * 0.08;
    const seatDistance = getFoodCourtNearestOwnSeatDistance(ally, point);
    if (Number.isFinite(seatDistance)) value += Math.max(0, (7 - seatDistance) * importance * 0.015);
  });
  return value;
}

function getFoodCourtGeneralStoreValue(player, point, shop, endCell, endpointOnly = false) {
  if (!isFoodCourtMapActive() || !player || !point || !isFoodCourtGeneralStoreShop(shop)) return 0;
  const playerIndex = state.players.indexOf(player);
  const preparing = getFoodCourtShopStatus(shop.id).preparing;
  const shopCell = getCell(shop.row, shop.col);
  const ownedByTeam = shopCell && isCellOwnedByPlayerTeam(shopCell, playerIndex);
  const lowerSide = isFoodCourtLowerSidePlayer(player);
  const itemId = preparing ? null : ensureFoodCourtGeneralStoreItem(shop.id);
  let value = lowerSide ? 42 : 18;
  if (!ownedByTeam) value += endpointOnly ? 36 : 20;
  if (preparing) value *= 0.35;
  else if (itemId === "flag") value += endpointOnly ? 190 : 75;
  else if (itemId === "forceShard") value += ownedByTeam ? (lowerSide ? 72 : 45) : (lowerSide ? 38 : 18);
  if (playerHasFlag(player) || playerHasFoodCourtFood(player)) value *= 0.35;
  const distance = Math.abs(shop.row - point.row) + Math.abs(shop.col - point.col);
  if (endpointOnly && distance === 0) return value;
  return Math.max(0, value - distance * (lowerSide ? 7 : 9));
}

function getFoodCourtPaintTargetBonus(player, cell) {
  if (!isFoodCourtMapActive() || !player || !cell) return 0;
  const playerIndex = state.players.indexOf(player);
  if (playerIndex < 0 || !canPlayerRepaintCell(playerIndex, cell)) return 0;
  const teamKey = normalizeTeamKey(player.teamKey, playerIndex);
  let bonus = 0;
  const shop = getFoodCourtShopAt(cell.row, cell.col);
  if (shop?.foodType) {
    const need = getFoodCourtFoodNeedValue(teamKey, shop.foodType);
    if (need > 0) bonus += need * 0.075;
    if (!getFoodCourtShopStatus(shop.id).preparing) bonus += need > 0 ? 4.5 : 1.2;
  } else if (isFoodCourtGeneralStoreShop(shop)) {
    bonus += isFoodCourtLowerSidePlayer(player) ? 8.5 : 4.5;
    if (!getFoodCourtShopStatus(shop.id).preparing && ensureFoodCourtGeneralStoreItem(shop.id) === "flag") bonus += 16;
  }
  if (isFoodCourtHungryTile(cell.row, cell.col) && shouldComputerDiscardFood(player)) bonus += 5.5;
  const seatDistance = getFoodCourtNearestOwnSeatDistance(player, cell);
  if (Number.isFinite(seatDistance) && seatDistance <= 1) bonus += player.foodSlot ? 5.5 : 2.2;
  state.players.forEach((other) => {
    if (!other || !other.position || arePlayersAllied(player, other)) return;
    if (!other.foodSlot || !isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - cell.row) + Math.abs(other.position.col - cell.col);
    if (distance <= 2) bonus += getFoodCourtCarrierThreatValue(player, other) * (distance === 0 ? 0.22 : 0.1);
  });
  return bonus;
}

function getFoodCourtPathPriorityBonus(player, endpoint, endCell) {
  if (!isFoodCourtMapActive() || !player || !endpoint || !endCell) return 0;
  const playerIndex = state.players.indexOf(player);
  const teamKey = normalizeTeamKey(player.teamKey, playerIndex);
  const heldFoodType = getFoodCourtHeldFoodType(player);
  const missingFoods = getFoodCourtMissingFoods(teamKey);
  const lowerSide = isFoodCourtLowerSidePlayer(player);
  let bonus = 0;
  if (heldFoodType) {
    const ownTable = getFoodCourtAdjacentOwnTable({ ...player, position: endpoint });
    if (ownTable && !isFoodCourtFoodDeliveredForTeam(teamKey, heldFoodType)) {
      bonus += 320 + getFoodCourtFoodNeedValue(teamKey, heldFoodType);
      bonus += getFoodCourtCompletionOutcomeValue(player, teamKey, heldFoodType);
    }
    if (!isFoodCourtFoodDeliveredForTeam(teamKey, heldFoodType)) {
      const seatDistance = getFoodCourtNearestOwnSeatDistance(player, endpoint);
      if (Number.isFinite(seatDistance)) bonus += Math.max(0, 120 - seatDistance * 18);
      state.players.forEach((other) => {
        if (!other || !other.position || arePlayersAllied(player, other)) return;
        if (!isComputerAwareOfPlayerPosition(player, other)) return;
        const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
        if (distance === 0) bonus -= 42;
        else if (distance === 1) bonus -= 24;
        else if (distance === 2) bonus -= 10;
      });
    }
    if (isFoodCourtHungryTile(endpoint.row, endpoint.col) && isFoodCourtFoodDeliveredForTeam(teamKey, heldFoodType)) bonus += 135;
    const shop = getFoodCourtShopAt(endpoint.row, endpoint.col);
    if (shop?.foodType && !getFoodCourtShopStatus(shop.id).preparing && shouldComputerTakeFood(player, shop.foodType)) {
      bonus += 115 + getFoodCourtFoodNeedValue(teamKey, shop.foodType) * 0.65;
    }
  } else {
    const shop = getFoodCourtShopAt(endpoint.row, endpoint.col);
    if (shop?.foodType) {
      const needValue = getFoodCourtFoodNeedValue(teamKey, shop.foodType);
      if (!getFoodCourtShopStatus(shop.id).preparing && needValue > 0) {
        bonus += 165 + needValue;
        if (lowerSide && missingFoods.length > 1) bonus -= 70;
      } else if (getFoodCourtShopStatus(shop.id).preparing && needValue > 0) {
        bonus += 22;
      }
    }
    if (isFoodCourtGeneralStoreShop(shop)) bonus += getFoodCourtGeneralStoreValue(player, endpoint, shop, endCell, true);
    const foodTargets = Object.values(FOOD_COURT_SHOPS)
      .filter((entry) => entry.foodType && getFoodCourtFoodNeedValue(teamKey, entry.foodType) > 0 && !getFoodCourtShopStatus(entry.id).preparing);
    const foodApproachWeight = lowerSide && missingFoods.length > 1 ? 5.5 : 10.5;
    bonus += getFoodCourtBestApproachBonus(endpoint, foodTargets, foodApproachWeight);
  }
  Object.values(FOOD_COURT_SHOPS).forEach((shop) => {
    if (isFoodCourtGeneralStoreShop(shop)) {
      bonus += getFoodCourtGeneralStoreValue(player, endpoint, shop, endCell, false) * (lowerSide ? 1.05 : 0.55);
    }
  });
  bonus += getFoodCourtEscortValue(player, endpoint);
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!other.foodSlot) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    const threatValue = getFoodCourtCarrierThreatValue(player, other);
    const ownNeedValue = getFoodCourtFoodNeedValue(teamKey, other.foodSlot.id);
    const targetValue = Math.max(threatValue, ownNeedValue * 0.55);
    if (distance === 0 && canBattleOccurAtCellForPlayers(player, other, endpoint.row, endpoint.col)) {
      bonus += shouldComputerTakeFood(player, other.foodSlot.id) ? 150 + targetValue : 36 + threatValue;
    } else if (distance === 1) {
      bonus += shouldComputerTakeFood(player, other.foodSlot.id) ? 22 + targetValue * 0.24 : 8 + threatValue * 0.14;
    } else if (distance === 2) {
      bonus += threatValue * 0.12;
    }
  });
  if (!heldFoodType && missingFoods.length === 1) {
    const neededFood = missingFoods[0];
    const allyAlreadyCarrying = state.players.some((ally, allyIndex) => {
      if (!ally || ally.id === player.id) return false;
      if (normalizeTeamKey(ally.teamKey, allyIndex) !== teamKey) return false;
      return getFoodCourtHeldFoodType(ally) === neededFood;
    });
    if (allyAlreadyCarrying) bonus += getFoodCourtEscortValue(player, endpoint) * 0.9;
  }
  return bonus;
}

function getComputerTeamSupportValue(player, point) {
  if (!player || !point || !isTeamModeEnabled()) return 0;
  let value = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || !arePlayersAllied(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    const allyHasFlag = playerHasFlag(other);
    if (allyHasFlag) {
      if (distance === 1) value += 2.8;
      else if (distance === 2) value += 1.6;
      else if (distance === 3) value += 0.7;
    } else if (distance === 0) {
      value -= 0.35;
    }
  });
  return value;
}

function getComputerFuturePositionValue(player, endpoint) {
  if (!player || !endpoint) return 0;
  const snapshot = getComputerScoreSnapshot(player);
  let best = 0;
  for (let row = endpoint.row - 2; row <= endpoint.row + 2; row += 1) {
    for (let col = endpoint.col - 2; col <= endpoint.col + 2; col += 1) {
      const distance = Math.abs(row - endpoint.row) + Math.abs(col - endpoint.col);
      if (distance === 0 || distance > 2) continue;
      const cell = getCell(row, col);
      if (!cell || cell.obstacle) continue;
      let local = 0;
      if (cell.groundItem?.id === 'flag') local += Math.max(8.5, FLAG_POINTS * 0.82);
      else if (cell.groundItem?.id === 'forceShard') local += getPowerShardPickupValue(player, cell) * 0.5;
      if (cell.special.includes('flag')) local += Math.max(6.2, FLAG_POINTS * 0.55);
      local += getComputerHealTileValue(player, cell) * 0.65;
      if (canPlayerRepaintCell(state.currentPlayerIndex, cell)) {
        if (cell.owner === null) local += snapshot.endgame ? 0.45 : 0.7;
        else if (!isFriendlyOwner(cell.owner, state.currentPlayerIndex)) local += snapshot.endgame ? 0.9 : 0.65;
      }
      const opponent = state.players.find((other) => other
        && other.id !== player.id
        && !arePlayersAllied(player, other)
        && isComputerAwareOfPlayerPosition(player, other)
        && other.position
        && other.position.row === row
        && other.position.col === col);
      if (opponent && canBattleOccurAtCellForPlayers(player, opponent, row, col)) {
        local += getComputerBattleTileValue(player, opponent) * (snapshot.endgame ? 0.55 : 0.38);
      }
      local += getComputerVisibleFlagCarrierPressureValue(player, { row, col }) * 0.4;
      local -= getComputerEnemyTileDanger(player, { row, col }, cell) * 0.2;
      local /= distance;
      if (local > best) best = local;
    }
  }
  return best;
}

function chooseComputerGroundskeeperStat(player) {
  if (!player) return 'hp';
  const options = ['attack', 'hp', 'technique'];
  return options
    .map((statKey) => {
      const max = Math.max(1, getCurrentMax(player, statKey));
      const current = Math.max(0, Number(player.currentStats?.[statKey]) || 0);
      const missing = Math.max(0, max - current);
      const ratioMissing = missing / max;
      const hpSafetyBonus = statKey === 'hp' ? 0.12 : 0;
      const techniqueBonus = statKey === 'technique' ? 0.03 : 0;
      return { statKey, score: missing + ratioMissing * 30 + hpSafetyBonus + techniqueBonus };
    })
    .sort((a, b) => b.score - a.score)[0]?.statKey || 'hp';
}

function getComputerPredictedBattleChoiceWeights(actor, target) {
  const choices = ["attack", "hp", "technique"];
  const weights = { attack: 1, hp: 1, technique: 1 };
  if (!actor || !target) return weights;
  choices.forEach((choice) => {
    let local = 0;
    choices.forEach((targetChoice) => {
      const ownValue = calculateBattleBreakdown(actor, target, choice, targetChoice).finalValue;
      const targetValue = calculateBattleBreakdown(target, actor, targetChoice, choice).finalValue;
      local += (ownValue - targetValue) * 0.03;
    });
    weights[choice] += local / choices.length;
  });
  const actorId = actor.activeCharacterId;
  if (actorId === 'battler2') {
    weights.attack += 1.15;
    weights.hp -= 0.12;
    weights.technique -= 0.08;
  } else if (actorId === 'battler1') {
    const cell = actor.position ? getCell(actor.position.row, actor.position.col) : null;
    if (cell && isFriendlyOwner(cell.owner, actor.id)) {
      weights.attack += 0.16;
      weights.hp += 0.12;
      weights.technique += 0.12;
    }
  } else if (actorId === 'battler3') {
    const attackCurrent = Number(actor.currentStats?.attack) || 0;
    if ((actor.cooldowns?.battler3MesmerSync || 0) <= 0 && attackCurrent >= 15) {
      weights.attack += 0.24;
      weights.hp += 0.18;
      weights.technique += 0.28;
    }
  } else if (actorId === 'tanker1') {
    if (playerHasFlag(actor)) weights.hp += 0.55;
  } else if (actorId === 'tanker2') {
    if ((actor.items?.length || 0) >= 4) weights.hp += 0.2;
  }
  choices.forEach((choice) => {
    weights[choice] = Math.max(0.08, weights[choice]);
  });
  return weights;
}

function getComputerBattleCounterplayBonus(player, opponent, ownChoice, estimate = null) {
  if (!player || !opponent || !ownChoice) return 0;
  const opponentWeights = getComputerPredictedBattleChoiceWeights(opponent, player);
  let bonus = 0;
  if (opponent.activeCharacterId === 'battler2') {
    const attackWeight = opponentWeights.attack || 0;
    if (ownChoice === 'hp') bonus += 1.7 + attackWeight * 1.35;
    else bonus -= attackWeight * 0.55;
  }
  if (opponent.activeCharacterId === 'battler1') {
    const opponentCell = opponent.position ? getCell(opponent.position.row, opponent.position.col) : null;
    if (opponentCell && isFriendlyOwner(opponentCell.owner, opponent.id) && estimate) {
      if (estimate.guaranteedLoss) bonus -= 1.8;
      else if (estimate.losses >= 2) bonus -= 0.9;
    }
  }
  if (playerHasFlag(player) && ownChoice === 'hp') bonus += 0.35;
  if (isFlagCarrierMapActive()) {
    if (playerHasFlag(opponent) && ownChoice === 'hp') bonus += 0.45;
    if (playerHasFlag(player) && ownChoice === 'hp') bonus += 0.4;
  }
  return bonus;
}

function hasDominionOfBalanceAdvantage(player, opponent) {
  const playerIsNaja = player?.activeCharacterId === "battler3";
  const opponentIsNaja = opponent?.activeCharacterId === "battler3";
  return !!playerIsNaja && !opponentIsNaja;
}

function classifyPredictedBattleResult(player, opponent, ownValue, opponentValue) {
  if (ownValue > opponentValue) return 1;
  if (ownValue < opponentValue) return -1;
  if (hasDominionOfBalanceAdvantage(player, opponent)) return 1;
  if (hasDominionOfBalanceAdvantage(opponent, player)) return -1;
  return 0;
}

function cloneBattleSimulationPlayer(player, overrides = {}) {
  if (!player) return player;
  const currentStats = {
    attack: Number(player.currentStats?.attack) || 0,
    hp: Number(player.currentStats?.hp) || 0,
    technique: Number(player.currentStats?.technique) || 0,
    ...(overrides.currentStats || {})
  };
  const statuses = {
    ...(player.statuses || {}),
    ...((overrides.statuses) || {})
  };
  const cooldowns = {
    ...(player.cooldowns || {}),
    ...((overrides.cooldowns) || {})
  };
  return {
    ...player,
    ...overrides,
    currentStats,
    statuses,
    cooldowns,
    items: overrides.items || player.items,
    position: overrides.position || player.position,
    startPosition: overrides.startPosition || player.startPosition
  };
}

function canSimulateMesmerSyncBattle(player) {
  return !!player
    && player.activeCharacterId === 'battler3'
    && (Number(player.cooldowns?.battler3MesmerSync) || 0) <= 0
    && (Number(player.currentStats?.attack) || 0) >= 15;
}

function createMesmerSyncBattleSimulation(player, opponent) {
  if (!canSimulateMesmerSyncBattle(player)) return null;
  const playerClone = cloneBattleSimulationPlayer(player, {
    currentStats: {
      attack: Math.max(0, (Number(player.currentStats?.attack) || 0) - 15),
      hp: Number(player.currentStats?.hp) || 0,
      technique: Number(player.currentStats?.technique) || 0
    },
    statuses: {
      ...(player.statuses || {}),
      mesmerSyncRounds: 1,
      mesmerSyncBattleRemaining: 1
    }
  });
  const opponentClone = cloneBattleSimulationPlayer(opponent);
  return { player: playerClone, opponent: opponentClone };
}

function compareBattleEstimates(a, b) {
  return (
    (Number(b.guaranteedWin) ? 1 : 0) - (Number(a.guaranteedWin) ? 1 : 0)
    || a.losses - b.losses
    || b.worstMargin - a.worstMargin
    || b.winRate - a.winRate
    || b.averageMargin - a.averageMargin
    || b.bestMargin - a.bestMargin
  );
}

function estimateComputerBattleOutcomeVariant(player, opponent, ownChoice, options = {}) {
  const choices = ["attack", "hp", "technique"];
  const opponentChoiceWeights = getComputerPredictedBattleChoiceWeights(opponent, player);
  const totalWeight = choices.reduce((sum, choice) => sum + Math.max(0.08, opponentChoiceWeights[choice] || 0), 0) || 1;
  let wins = 0;
  let losses = 0;
  let ties = 0;
  let weightedWins = 0;
  let weightedLosses = 0;
  let weightedTies = 0;
  let totalMargin = 0;
  let worstMargin = Number.POSITIVE_INFINITY;
  let bestMargin = Number.NEGATIVE_INFINITY;
  choices.forEach((opponentChoice) => {
    const weight = Math.max(0.08, opponentChoiceWeights[opponentChoice] || 0);
    const ownValue = calculateBattleBreakdown(player, opponent, ownChoice, opponentChoice).finalValue;
    const opponentValue = calculateBattleBreakdown(opponent, player, opponentChoice, ownChoice).finalValue;
    const margin = ownValue - opponentValue;
    const result = classifyPredictedBattleResult(player, opponent, ownValue, opponentValue);
    totalMargin += margin * weight;
    worstMargin = Math.min(worstMargin, margin);
    bestMargin = Math.max(bestMargin, margin);
    if (result > 0) {
      wins += 1;
      weightedWins += weight;
    } else if (result < 0) {
      losses += 1;
      weightedLosses += weight;
    } else {
      ties += 1;
      weightedTies += weight;
    }
  });
  return {
    ownChoice,
    wins,
    losses,
    ties,
    weightedWins,
    weightedLosses,
    weightedTies,
    averageMargin: totalMargin / totalWeight,
    winRate: weightedWins / totalWeight,
    worstMargin,
    bestMargin,
    guaranteedWin: losses === 0 && wins > 0,
    guaranteedLoss: wins === 0 && ties === 0,
    opponentChoiceWeights,
    usesMesmerSync: !!options.usesMesmerSync
  };
}

function estimateComputerBattleOutcome(player, opponent, ownChoice, options = {}) {
  const forceMesmer = options.forceMesmer === true;
  const forceNormal = options.forceMesmer === false;
  if (forceMesmer) {
    const simulation = createMesmerSyncBattleSimulation(player, opponent);
    return simulation
      ? estimateComputerBattleOutcomeVariant(simulation.player, simulation.opponent, ownChoice, { usesMesmerSync: true })
      : estimateComputerBattleOutcomeVariant(player, opponent, ownChoice, { usesMesmerSync: false });
  }
  const normalEstimate = estimateComputerBattleOutcomeVariant(player, opponent, ownChoice, { usesMesmerSync: false });
  if (forceNormal) return normalEstimate;
  const simulation = createMesmerSyncBattleSimulation(player, opponent);
  if (!simulation) return normalEstimate;
  const mesmerEstimate = estimateComputerBattleOutcomeVariant(simulation.player, simulation.opponent, ownChoice, { usesMesmerSync: true });
  return compareBattleEstimates(mesmerEstimate, normalEstimate) < 0 ? mesmerEstimate : normalEstimate;
}

function getBestComputerBattlePlan(player, opponent, options = {}) {
  const choices = ["attack", "hp", "technique"];
  return choices
    .map((ownChoice) => estimateComputerBattleOutcome(player, opponent, ownChoice, options))
    .sort(compareBattleEstimates)[0] || null;
}

function getComputerBattleTileValue(player, opponent) {
  if (!player || !opponent) return 0;
  const snapshot = getComputerScoreSnapshot(player);
  const targetBonus = getComputerPriorityTargetValue(player, opponent);
  const moppetTargetBonus = getMoppetPriorityTargetValue(player, opponent, opponent.position);
  const plans = ["attack", "hp", "technique"]
    .map((ownChoice) => estimateComputerBattleOutcome(player, opponent, ownChoice))
    .map((estimate) => ({
      estimate,
      tactical: getComputerCorvenBlackFeatherValue(player, opponent, estimate),
      strategic: (() => {
        const counterplayBonus = getComputerBattleCounterplayBonus(player, opponent, estimate.ownChoice, estimate);
        const weightedLossPressure = (estimate.weightedLosses || 0) * 3.2;
        let value = estimate.winRate * 4.8 + estimate.averageMargin * 0.04 + estimate.worstMargin * 0.09 + targetBonus + moppetTargetBonus + counterplayBonus;
        value -= weightedLossPressure;
        value += getComputerCorvenBlackFeatherValue(player, opponent, estimate);
        if (estimate.guaranteedWin) value += 3.4;
        if (estimate.losses >= 2) value -= 2.8;
        if (estimate.guaranteedLoss) value -= 5.5;
        if (playerHasFlag(player)) value += estimate.ownChoice === 'hp' ? 0.75 : 0;
        if (snapshot.trailing) value += estimate.winRate * 0.8;
        if (snapshot.endgame) value += targetBonus + Math.max(0, estimate.worstMargin) * 0.05;
        return value;
      })()
    }))
    .sort((a, b) => b.strategic - a.strategic || compareBattleEstimates(a.estimate, b.estimate));
  const bestEntry = plans[0];
  const bestPlan = bestEntry?.estimate;
  if (!bestPlan) return 0;
  const opponentScore = getComputerStrategicScore(opponent);
  const playerScore = getComputerStrategicScore(player);
  const scoreGap = Math.max(-10, Math.min(10, opponentScore - playerScore));
  const catchupBonus = scoreGap > 0 ? scoreGap * 0.28 : 0;
  const endgameBonus = snapshot.endgame ? (bestPlan.winRate * 0.6 + Math.max(0, bestPlan.averageMargin) * 0.02) : 0;
  const restSwing = player.position && player.startPosition
    && player.position.row === player.startPosition.row && player.position.col === player.startPosition.col
    ? getComputerRestBattleSwing(player)
    : 0;
  let score = 0.25 + bestPlan.winRate * 3.5 + bestPlan.averageMargin * 0.03 + catchupBonus + targetBonus + moppetTargetBonus + endgameBonus;
  score += getComputerBattleCounterplayBonus(player, opponent, bestPlan.ownChoice, bestPlan) * 0.8;
  score -= (bestPlan.weightedLosses || 0) * 2.6;
  score += Math.max(-4, Math.min(5, bestPlan.worstMargin * 0.08));
  if (bestPlan.guaranteedWin) score += 3.2;
  if (bestPlan.losses >= 2) score -= 4.1;
  if (bestPlan.worstMargin <= -25) score -= 3.2;
  if (bestPlan.worstMargin <= -10) score -= 1.3;
  if (bestPlan.guaranteedLoss) score -= 6.5;
  score += bestEntry?.tactical || 0;
  if (restSwing >= 4 && bestPlan.losses >= 1) score -= Math.min(4.8, restSwing * 0.55);
  if (snapshot.closeoutUrgency > 0) {
    const isHighValueStop = playerHasFlag(opponent) || opponentScore >= snapshot.leaderScore || opponentScore > playerScore;
    if (!isHighValueStop) score -= snapshot.closeoutUrgency * 4.4;
    if (bestPlan.guaranteedLoss || bestPlan.losses >= 2) score -= snapshot.closeoutUrgency * 3.6;
  }
  if (isFlagCarrierMapActive()) {
    if (playerHasFlag(opponent)) score += 4600;
    else if (playerHasFlag(player)) score += 24 + Math.max(0, bestPlan.winRate - 0.34) * 14;
  }
  if (player.activeCharacterId === "battler5") {
    const profile = getMoppetStartZoneProfile(player, player.position);
    if (profile.ownPenalty >= 10) score -= 8;
    else if (profile.enemyBonus >= 10) score += 6;
  }
  score += getCaptureTerritoryBattleTargetBonus(player, opponent, opponent.position);
  return score;
}

function getComputerHealTileValue(player, cell) {
  if (!player || !cell || !Array.isArray(cell.special) || !cell.special.length) return 0;
  let score = 0;
  const missingAttack = Math.max(0, getCurrentMax(player, 'attack') - (Number(player.currentStats?.attack) || 0));
  const missingHp = Math.max(0, getCurrentMax(player, 'hp') - (Number(player.currentStats?.hp) || 0));
  const missingTechnique = Math.max(0, getCurrentMax(player, 'technique') - (Number(player.currentStats?.technique) || 0));
  if (cell.special.includes('heal-atk')) score += Math.min(20, missingAttack) * 0.18;
  if (cell.special.includes('heal-hp')) score += Math.min(20, missingHp) * 0.22;
  if (cell.special.includes('heal-tech')) score += Math.min(20, missingTechnique) * 0.18;
  return score;
}

function isHiddenFromComputerObserver(observer, target) {
  if (!observer || !target || observer.id === target.id) return false;
  if (!isComputerPlayer(observer)) return false;
  if (arePlayersAllied(observer, target)) return false;
  return (Number(target.statuses?.hiddenTurns) || 0) > 0;
}

function isComputerAwareOfPlayerPosition(observer, target) {
  if (!target || !target.position) return false;
  return !isHiddenFromComputerObserver(observer, target);
}

function getComputerEnemyTileDanger(player, endpoint, endCell) {
  if (!player || !endpoint || !endCell) return 0;
  const playerIndex = state.currentPlayerIndex;
  const snapshot = getComputerScoreSnapshot(player);
  let danger = 0;
  if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) {
    const tileDamage = getCurrentEnemyTileEndDamage();
    danger += Math.max(2.3, tileDamage * 0.12);
  }
  if (playerHasFlag(player) || (snapshot.leading && snapshot.endgame)) {
    danger += 0.75;
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position) return;
    if (arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    if (distance === 0) return;
    if (distance <= 1) {
      const otherBestPlan = getBestComputerBattlePlan(other, player);
      danger += 1.8 + (otherBestPlan?.winRate || 0) * 2.2 + Math.max(0, (otherBestPlan?.averageMargin || 0)) * 0.04;
    } else if (distance === 2) {
      danger += 0.9;
    }
  });
  if (isFlagCarrierMapActive() && endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex) && !playerHasFlag(player)) {
    danger += 12;
  }
  return danger;
}

function getFlagTargetCells() {
  const targets = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cell = getCell(row, col);
      if (!cell) continue;
      if (cell.groundItem?.id === 'flag' || cell.special.includes('flag')) {
        targets.push({ row, col });
      }
    }
  }
  return targets;
}

function getDistanceToNearestFlagTarget(row, col) {
  const targets = getFlagTargetCells();
  if (!targets.length) return Number.POSITIVE_INFINITY;
  return targets.reduce((best, target) => {
    const distance = Math.abs(target.row - row) + Math.abs(target.col - col);
    return Math.min(best, distance);
  }, Number.POSITIVE_INFINITY);
}

function getFlagAccessScoreAtPoint(row, col) {
  const distance = getDistanceToNearestFlagTarget(row, col);
  if (!Number.isFinite(distance)) return 0;
  if (isFlagCarrierMapActive()) {
    if (distance === 0) return 120;
    if (distance === 1) return 72;
    if (distance === 2) return 36;
    if (distance === 3) return 16;
    if (distance === 4) return 7;
    return 0;
  }
  if (distance === 0) return Math.max(18, FLAG_POINTS * 1.7);
  if (distance === 1) return Math.max(9.2, FLAG_POINTS * 0.78);
  if (distance === 2) return Math.max(5.4, FLAG_POINTS * 0.42);
  if (distance === 3) return 2.2;
  return 0;
}

function getPowerShardPickupValue(player, cell) {
  if (!player || !cell || cell.groundItem?.id !== 'forceShard') return 0;
  const shardCount = getForceShardCount(player);
  if (shardCount >= MAX_POWER_SHARDS) return 0;
  const urgency = MAX_POWER_SHARDS - shardCount;
  return 4.4 + urgency * 1.1;
}

function getObstacleBreakValue(player, cell, point) {
  const obstacle = cell?.obstacle;
  if (!player || !obstacle || !point) return 0;
  if (!canComputerBreakObstacle(player, cell)) return -999;
  const allowedStat = obstacle.allowedStat;
  const available = Math.max(0, Number(player.currentStats?.[allowedStat]) || 0);
  const hp = Math.max(0, Number(obstacle.hp) || 0);
  let score = 0.95;
  score -= hp * 0.045;
  const flagAccess = getFlagAccessScoreAtPoint(point.row, point.col);
  score += flagAccess;
  if (isFlagCarrierMapActive() && !playerHasFlag(player)) score += flagAccess * 0.85;
  if (obstacle.dropItemId === 'forceShard') {
    const simulatedCell = { groundItem: { id: 'forceShard' } };
    const shardValue = getPowerShardPickupValue(player, simulatedCell);
    score += shardValue;
    score += canReceiveInventoryItem(player, cloneItemForInventory('forceShard')) ? 0.95 : -1.2;
  }
  for (let row = point.row - 1; row <= point.row + 1; row += 1) {
    for (let col = point.col - 1; col <= point.col + 1; col += 1) {
      const nearby = getCell(row, col);
      if (!nearby) continue;
      if (nearby.special.includes('flag')) score += Math.max(2.6, FLAG_POINTS * 0.18);
      if (nearby.groundItem?.id === 'flag') score += Math.max(3.2, FLAG_POINTS * 0.24);
      if (!nearby.obstacle) score += getComputerHealTileValue(player, nearby) * 0.25;
    }
  }
  const shardCount = getForceShardCount(player);
  if (shardCount >= MAX_POWER_SHARDS && obstacle.dropItemId === 'forceShard' && flagAccess < Math.max(9, FLAG_POINTS * 0.85)) {
    score -= 2.6;
  }
  return score;
}

function getPathObstacleBreakTotal(player, path) {
  if (!player || !Array.isArray(path) || path.length <= 1) return 0;
  let total = 0;
  path.slice(1).forEach((point) => {
    const cell = getCell(point.row, point.col);
    if (cell?.obstacle) total += getObstacleBreakValue(player, cell, point);
  });
  return total;
}


function getComputerLocalPressure(player, point = null) {
  if (!player) return 0;
  const origin = point || player.position;
  if (!origin) return 0;
  let pressure = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - origin.row) + Math.abs(other.position.col - origin.col);
    if (distance <= 1) pressure += 2.0;
    else if (distance === 2) pressure += 0.85;
  });
  return pressure;
}

function chooseComputerItemStat(player, itemId) {
  if (!player) return 'hp';
  const localPressure = getComputerLocalPressure(player);
  const options = ['attack', 'hp', 'technique'].map((statKey) => {
    const maxValue = Math.max(1, getCurrentMax(player, statKey));
    const currentValue = Math.max(0, Number(player.currentStats?.[statKey]) || 0);
    const missing = Math.max(0, maxValue - currentValue);
    let score = missing;
    if (itemId === 'abilityRestore') {
      if (statKey === 'hp') score += missing * 0.45 + localPressure * 0.4;
      else if (statKey === 'technique') score += missing * 0.16;
      else score += missing * 0.1;
      score += (1 - currentValue / maxValue) * 12;
    } else if (itemId === 'abilityExpand') {
      score = 0;
      if (statKey === 'hp') score += 4.2 + localPressure * 0.9;
      if (statKey === 'technique') score += 3.2 + ((player.cooldowns?.tanker2Quickdig || 0) > 0 ? 0 : 1.2);
      if (statKey === 'attack') score += 2.8 + localPressure * 0.35;
      score += (1 - currentValue / maxValue) * 6;
    }
    return { statKey, score };
  });
  options.sort((a, b) => b.score - a.score);
  return options[0]?.statKey || 'hp';
}

function chooseComputerItemAction(player) {
  if (!player || state.turnUsedItem || !!state.moveDie) return null;
  const usableEntries = getManualUsableInventoryEntries(player);
  if (!usableEntries.length) return null;

  const inventorySlots = getInventorySlotCount(player);
  const slotPressure = inventorySlots >= 5 ? 2.6 : inventorySlots >= 4 ? 1.4 : 0;
  const hpCurrent = Math.max(0, Number(player.currentStats?.hp) || 0);
  const attackCurrent = Math.max(0, Number(player.currentStats?.attack) || 0);
  const techniqueCurrent = Math.max(0, Number(player.currentStats?.technique) || 0);
  const hpMax = Math.max(1, getCurrentMax(player, 'hp'));
  const attackMax = Math.max(1, getCurrentMax(player, 'attack'));
  const techniqueMax = Math.max(1, getCurrentMax(player, 'technique'));
  const hpMissing = Math.max(0, hpMax - hpCurrent);
  const attackMissing = Math.max(0, attackMax - attackCurrent);
  const techniqueMissing = Math.max(0, techniqueMax - techniqueCurrent);
  const hpRatio = hpCurrent / hpMax;
  const localPressure = getComputerLocalPressure(player);
  const restLikely = shouldComputerRest(player);

  const plans = [];
  usableEntries.forEach(({ item, index }) => {
    if (item.id === 'potion') {
      let score = 0;
      if (hpMissing >= 8) score += hpMissing * 0.12;
      if (hpRatio <= 0.55) score += 3.2;
      if (hpRatio <= 0.38) score += 5.0;
      score += localPressure * 0.7;
      score += slotPressure * 0.5;
      if (restLikely) score -= 4.0;
      if (score >= 4.0) plans.push({ itemIndex: index, itemId: item.id, statKey: null, score });
    } else if (item.id === 'abilityRestore') {
      const statKey = chooseComputerItemStat(player, item.id);
      let bestMissing = hpMissing;
      if (statKey === 'attack') bestMissing = attackMissing;
      else if (statKey === 'technique') bestMissing = techniqueMissing;
      let score = bestMissing * 0.13 + slotPressure;
      if (statKey === 'hp' && hpRatio <= 0.68) score += 2.4 + localPressure * 0.5;
      if (statKey === 'technique' && techniqueMissing >= 10) score += 1.2;
      if (statKey === 'attack' && attackMissing >= 10) score += 0.8;
      if (restLikely && statKey === 'hp') score -= 3.2;
      if (score >= 3.4) plans.push({ itemIndex: index, itemId: item.id, statKey, score });
    } else if (item.id === 'abilityExpand') {
      const statKey = chooseComputerItemStat(player, item.id);
      let score = slotPressure * 1.25 + localPressure * 0.55;
      if (statKey === 'hp') score += 2.8;
      else if (statKey === 'technique') score += 2.1;
      else score += 1.7;
      if (hpRatio <= 0.48 && statKey === 'hp') score += 1.9;
      if (player.activeCharacterId === 'tanker2') score += 0.9;
      if (restLikely && statKey === 'hp') score -= 1.8;
      if (score >= 4.2) plans.push({ itemIndex: index, itemId: item.id, statKey, score });
    }
  });
  plans.sort((a, b) => b.score - a.score);
  return plans[0] || null;
}

function applyComputerItemAction(player, plan) {
  if (!player || !plan || state.turnUsedItem || !!state.moveDie) return false;
  const item = player.items?.[plan.itemIndex];
  if (!item) return false;
  if (plan.itemId === 'abilityRestore') {
    const amount = restoreStat(player, plan.statKey, 10);
    log(`${player.name} restored ${amount} to ${statLabel(plan.statKey)}.`, true);
  } else if (plan.itemId === 'abilityExpand') {
    const amount = increaseStatMax(player, plan.statKey, 10);
    log(`${player.name} increased the max value of ${statLabel(plan.statKey)} by ${amount}.`, true);
  } else if (plan.itemId === 'potion') {
    const amount = restoreStat(player, 'hp', 20);
    log(`${player.name} restored ${amount} HP with a Potion.`, true);
  } else {
    return false;
  }
  player.items.splice(plan.itemIndex, 1);
  state.turnUsedItem = true;
  renderAll();
  return true;
}


function getScrabbitPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "painter1") return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  let frontierNeutral = 0;
  let frontierEnemy = 0;
  let pathNeutral = 0;
  let pathEnemy = 0;
  path.slice(1).forEach((point) => {
    const cell = getCell(point.row, point.col);
    if (!cell) return;
    if (cell.owner === null) pathNeutral += 1;
    else if (!isFriendlyOwner(cell.owner, playerIndex)) pathEnemy += 1;
  });
  bonus += pathNeutral * 1.35;
  bonus += pathEnemy * 0.7;
  bonus += Math.max(0, path.length - 1) * 0.55;
  const endpoint = path[path.length - 1];
  if (endpoint) {
    for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
      for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
        if (row === endpoint.row && col === endpoint.col) continue;
        const nearby = getCell(row, col);
        if (!nearby || nearby.obstacle) continue;
        if (nearby.owner === null) frontierNeutral += 1;
        else if (!isFriendlyOwner(nearby.owner, playerIndex)) frontierEnemy += 1;
      }
    }
  }
  bonus += frontierNeutral * 0.95;
  bonus += frontierEnemy * 0.4;

  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);
  if (opponentOnEndpoint) {
    const plan = getBestComputerBattlePlan(player, opponentOnEndpoint);
    const strongFight = !!plan && (plan.winRate >= 2 / 3) && (plan.averageMargin >= 6);
    bonus += strongFight ? 1.8 : -3.2;
  }

  if (endCell) {
    const localDanger = getComputerEnemyTileDanger(player, endpoint, endCell);
    bonus -= localDanger * 0.45;
    if (endCell.owner === playerIndex) bonus += 0.65;
  }
  return bonus;
}

function getScrabbitPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "painter1" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  if (cell.owner === null) bonus += 0.95;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.3;
  let neutralNearby = 0;
  let enemyNearby = 0;
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === null) neutralNearby += 1;
      else if (!isFriendlyOwner(nearby.owner, playerIndex)) enemyNearby += 1;
    }
  }
  bonus += neutralNearby * 0.45;
  bonus += enemyNearby * 0.18;
  return bonus;
}


function getMiraPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "painter2") return 0;
  const playerIndex = state.currentPlayerIndex;
  const endpoint = path[path.length - 1];
  if (!endpoint) return 0;
  let bonus = 0;
  let stolenTiles = 0;
  let neutralTiles = 0;
  path.slice(1).forEach((point) => {
    const cell = getCell(point.row, point.col);
    if (!cell || cell.obstacle) return;
    if (cell.owner === null) neutralTiles += 1;
    else if (!isFriendlyOwner(cell.owner, playerIndex)) stolenTiles += 1;
  });
  bonus += stolenTiles * 2.2;
  bonus += neutralTiles * 0.45;

  let nearbyEnemyTiles = 0;
  let nearbyNeutralTiles = 0;
  let adjacentOpponents = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === null) nearbyNeutralTiles += 1;
      else if (!isFriendlyOwner(nearby.owner, playerIndex)) nearbyEnemyTiles += 1;
    }
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    if (distance <= 1) adjacentOpponents += 1;
  });

  bonus += nearbyEnemyTiles * 0.8;
  bonus += nearbyNeutralTiles * 0.18;

  const isHidden = (Number(player.statuses?.hiddenTurns) || 0) > 0;
  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);
  if (opponentOnEndpoint) {
    const plan = getBestComputerBattlePlan(player, opponentOnEndpoint);
    const favorableFight = !!plan && (plan.winRate >= 2 / 3) && (plan.averageMargin >= 4);
    bonus += favorableFight ? 1.15 : (isHidden ? -0.9 : -2.8);
  }
  if (adjacentOpponents > 0) {
    bonus += isHidden ? adjacentOpponents * 0.45 : adjacentOpponents * -0.9;
  }
  if (isHidden) {
    bonus += getFlagAccessScoreAtPoint(endpoint.row, endpoint.col) * 0.22;
  }
  if (endCell) {
    bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * (isHidden ? 0.18 : 0.34);
  }
  return bonus;
}

function getMiraPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "painter2" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  if (cell.owner === null) bonus += 0.18;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 1.3;
  let enemyNearby = 0;
  let neutralNearby = 0;
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === null) neutralNearby += 1;
      else if (!isFriendlyOwner(nearby.owner, playerIndex)) enemyNearby += 1;
    }
  }
  bonus += enemyNearby * 0.52;
  bonus += neutralNearby * 0.08;
  return bonus;
}

function isDiagonalStep(pointA, pointB) {
  return !!pointA && !!pointB && Math.abs(pointA.row - pointB.row) === 1 && Math.abs(pointA.col - pointB.col) === 1;
}

function getTorgaBacktrackScore(player, point = null) {
  if (!player || player.activeCharacterId !== "painter4" || !player.startPosition) return -999;
  const origin = point || player.position;
  if (!origin) return -999;
  if (origin.row === player.startPosition.row && origin.col === player.startPosition.col) return -999;
  const techniqueCurrent = Number(player.currentStats?.technique) || 0;
  if (techniqueCurrent < 15 || (Number(player.cooldowns?.painter4Backtrack) || 0) > 0) return -999;
  const currentCell = getCell(origin.row, origin.col);
  const startCell = getCell(player.startPosition.row, player.startPosition.col);
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  const techniqueRatio = techniqueCurrent / Math.max(1, getCurrentMax(player, 'technique'));
  const currentDanger = getComputerEnemyTileDanger(player, origin, currentCell);
  const startDanger = getComputerEnemyTileDanger(player, player.startPosition, startCell);
  const distanceHome = Math.abs(origin.row - player.startPosition.row) + Math.abs(origin.col - player.startPosition.col);
  const currentObjective = getFlagAccessScoreAtPoint(origin.row, origin.col)
    + getControlAreaTacticalBonus(player, currentCell) * 0.16
    + getCaptureTerritoryPathBonus(player, currentCell) * 0.08;
  const startObjective = getFlagAccessScoreAtPoint(player.startPosition.row, player.startPosition.col)
    + getControlAreaTacticalBonus(player, startCell) * 0.16
    + getCaptureTerritoryPathBonus(player, startCell) * 0.08;
  let score = Math.max(0, currentDanger - startDanger) * 1.25;
  score += Math.max(0, distanceHome - 2) * 0.55;
  if (hpRatio <= 0.34) score += 5.2;
  else if (hpRatio <= 0.5) score += 2.1;
  if (techniqueRatio <= 0.25) score -= 2.3;
  score += getComputerHealTileValue(player, startCell) * 0.34;
  score += Math.max(-4, Math.min(4, (startObjective - currentObjective) * 0.18));
  if (playerHasFlag(player)) {
    const onAlliedStart = isAlliedStartTileForPlayer(player, origin.row, origin.col);
    score -= onAlliedStart ? 14 : 6.5;
    if (currentDanger >= 7.5 && hpRatio <= 0.42) score += 4.8;
  }
  if (state.currentAction === "paint" && Number(state.remainingPaint) > 0 && currentDanger < 5.5) score -= 1.4;
  return score;
}

function getTorgaPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "painter4" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  const playerIndex = state.players.indexOf(player);
  const cragstepActive = canTorgaUseCragstep(player);
  let bonus = 0;
  let diagonalSteps = 0;
  let neutralPath = 0;
  let enemyPath = 0;
  for (let index = 1; index < path.length; index += 1) {
    const previous = path[index - 1];
    const point = path[index];
    const cell = getCell(point.row, point.col);
    if (isDiagonalStep(previous, point)) diagonalSteps += 1;
    if (!cell || cell.obstacle) continue;
    if (cell.owner === null) neutralPath += 1;
    else if (!isFriendlyOwner(cell.owner, playerIndex)) enemyPath += 1;
  }
  if (cragstepActive && diagonalSteps > 0) {
    bonus += diagonalSteps * 2.6;
    bonus += enemyPath * 0.85 + neutralPath * 0.55;
  }
  let roughNearby = 0;
  let enemyNearby = 0;
  let neutralNearby = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby) continue;
      if (nearby.obstacle) roughNearby += 1;
      else if (nearby.owner === null) neutralNearby += 1;
      else if (!isFriendlyOwner(nearby.owner, playerIndex)) enemyNearby += 1;
    }
  }
  bonus += roughNearby * (cragstepActive ? 0.7 : 0.28);
  bonus += neutralNearby * 0.2;
  bonus += enemyNearby * 0.38;
  if (endCell.owner === null) bonus += 0.45;
  else if (!isFriendlyOwner(endCell.owner, playerIndex)) bonus += 0.95;
  bonus += getControlAreaTacticalBonus(player, endCell) * 0.18;
  bonus += getCaptureTerritoryPathBonus(player, endCell) * 0.12;
  bonus += getFlagAccessScoreAtPoint(endpoint.row, endpoint.col) * (playerHasFlag(player) ? 0.08 : 0.18);
  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);
  if (opponentOnEndpoint) {
    const plan = getBestComputerBattlePlan(player, opponentOnEndpoint);
    bonus += plan?.winRate >= 0.6 ? 1.2 : -2.4;
  }
  const backtrackScore = getTorgaBacktrackScore(player, endpoint);
  if (backtrackScore >= 5) bonus += Math.min(2.2, backtrackScore * 0.16);
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * (hpRatio <= 0.45 ? 0.32 : 0.18);
  return bonus;
}

function getTorgaPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "painter4" || !cell) return 0;
  const playerIndex = state.players.indexOf(player);
  let bonus = 0;
  if (cell.owner === null) bonus += 0.55;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.85;
  let roughNearby = 0;
  let diagonalEnemyPressure = 0;
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby) continue;
      if (nearby.obstacle) roughNearby += 1;
      if (Math.abs(scanRow - row) === 1 && Math.abs(scanCol - col) === 1 && nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) {
        diagonalEnemyPressure += 1;
      }
    }
  }
  bonus += roughNearby * 0.22;
  bonus += diagonalEnemyPressure * 0.34;
  bonus += getControlAreaTacticalBonus(player, cell) * 0.18;
  bonus += getCaptureTerritoryPaintTargetBonus(player, cell) * 0.16;
  if (cell.special.includes('flag') || cell.groundItem?.id === 'flag') bonus += 1.4;
  return bonus;
}

function getGranPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "battler1") return 0;
  const playerIndex = state.currentPlayerIndex;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  const isOwnTile = endCell.owner === playerIndex;
  const flagCarrierMap = isFlagCarrierMapActive();
  const isHomeTile = isAlliedStartTileForPlayer(player, endpoint.row, endpoint.col);
  const homeDistance = getDistanceToNearestAlliedStart(player, endpoint);
  const frontlineValue = getFlagCarrierFrontlineValue(player, endpoint);
  const ownTileCount = path.slice(1).reduce((count, point) => {
    const cell = getCell(point.row, point.col);
    return count + (cell && cell.owner === playerIndex ? 1 : 0);
  }, 0);
  let bonus = 0;
  bonus += ownTileCount * 0.55;
  if (isOwnTile) bonus += 2.6;
  else if (endCell.owner === null) bonus += 0.25;
  else bonus -= 1.45;

  const playerScore = getComputerCurrentScore(player);
  const highestOpponentScore = state.players.reduce((best, other) => {
    if (!other || other.id === player.id || arePlayersAllied(player, other)) return best;
    return Math.max(best, getComputerCurrentScore(other));
  }, -Infinity);
  const leading = playerScore >= highestOpponentScore;
  const hasFlagLead = !!player.flagHolder || leading;
  if (hasFlagLead && isOwnTile) bonus += 0.9;
  if (hasFlagLead && !isOwnTile && endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus -= 1.35;

  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);
  if (opponentOnEndpoint) {
    const plan = getBestComputerBattlePlan(player, opponentOnEndpoint);
    const favorableFight = !!plan && (plan.winRate >= 2 / 3) && (plan.averageMargin >= 2);
    if (isOwnTile) {
      bonus += favorableFight ? 3.25 : 0.85;
    } else {
      bonus += favorableFight ? 0.7 : -2.2;
    }
  }

  let adjacentOwnTiles = 0;
  let adjacentEnemyTiles = 0;
  let adjacentOpponents = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === playerIndex) adjacentOwnTiles += 1;
      else if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) adjacentEnemyTiles += 1;
    }
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    if (distance <= 1) adjacentOpponents += 1;
  });
  bonus += adjacentOwnTiles * 0.35;
  if (isOwnTile) bonus += adjacentEnemyTiles * 0.28 + adjacentOpponents * 0.9;
  else bonus -= adjacentOpponents * 0.7;

  if (flagCarrierMap) {
    bonus += frontlineValue * 1.05;
    if (!playerHasFlag(player) && isHomeTile) bonus -= 8.5;
    else if (!playerHasFlag(player) && Number.isFinite(homeDistance) && homeDistance <= 2) bonus -= Math.max(0, 5 - homeDistance * 1.7);
    if (playerHasFlag(player) && isHomeTile) bonus += 18;
    if (!playerHasFlag(player) && endpoint.row >= 5 && endpoint.row <= 8) bonus += 4.2;
    if (adjacentEnemyTiles > 0) bonus += 2.6;
    if (adjacentOpponents > 0) bonus += 3.2;
  }

  const flagAccess = getFlagAccessScoreAtPoint(endpoint.row, endpoint.col);
  if (player.flagHolder) {
    bonus += isOwnTile ? flagAccess * 0.12 : -flagAccess * 0.08;
  } else if (isOwnTile && flagAccess > 0) {
    bonus += flagAccess * 0.08;
  }

  bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * (isOwnTile ? 0.18 : 0.42);
  if (flagCarrierMap && !playerHasFlag(player) && !playerHasFlag(state.players.find((other) => other && other.id !== player.id && arePlayersAllied(player, other)))) {
    bonus += Math.max(0, 2.5 - Math.max(0, homeDistance - 3) * 0.3);
  }
  return bonus;
}

function getGranPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "battler1" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  const flagCarrierMap = isFlagCarrierMapActive();
  let bonus = 0;
  if (cell.owner === null) bonus += 0.35;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.55;
  let friendlyNearby = 0;
  let enemyNearby = 0;
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === playerIndex) friendlyNearby += 1;
      else if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) enemyNearby += 1;
    }
  }
  bonus += friendlyNearby * 0.22;
  bonus += enemyNearby * 0.18;
  if (cell.special.includes('flag')) bonus += 0.8;
  if (player.flagHolder && cell.owner === null) bonus -= 0.12;
  if (flagCarrierMap) {
    bonus += getFlagCarrierFrontlineValue(player, { row, col }) * 0.18;
    if (row >= 5 && row <= 8) bonus += 1.4;
    if (cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex)) bonus += 1.2;
  }
  return bonus;
}


function getVorkPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "battler2") return 0;
  const playerIndex = state.currentPlayerIndex;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  let bonus = 0;

  const attackCurrent = Math.max(0, Number(player.currentStats?.attack) || 0);
  const hpCurrent = Math.max(0, Number(player.currentStats?.hp) || 0);
  const techniqueCurrent = Math.max(0, Number(player.currentStats?.technique) || 0);
  const attackRatio = attackCurrent / Math.max(1, getCurrentMax(player, 'attack'));
  const hpRatio = hpCurrent / Math.max(1, getCurrentMax(player, 'hp'));
  const techniqueRatio = techniqueCurrent / Math.max(1, getCurrentMax(player, 'technique'));

  let visibleEnemyCount = 0;
  let adjacentEnemies = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  let enemyTileAround = 0;

  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    visibleEnemyCount += 1;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    nearestDistance = Math.min(nearestDistance, distance);
    if (distance <= 1) adjacentEnemies += 1;
  });

  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) enemyTileAround += 1;
    }
  }

  if (Number.isFinite(nearestDistance)) {
    if (nearestDistance === 0) bonus += 3.4;
    else if (nearestDistance === 1) bonus += 2.1;
    else if (nearestDistance === 2) bonus += 1.1;
  } else {
    bonus -= 0.7;
  }

  bonus += enemyTileAround * 0.34;
  bonus += visibleEnemyCount > 0 ? 0.25 : -0.35;

  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);

  if (opponentOnEndpoint) {
    const attackPlan = estimateComputerBattleOutcome(player, opponentOnEndpoint, 'attack');
    const bestPlan = getBestComputerBattlePlan(player, opponentOnEndpoint);
    const attackBias = attackPlan.winRate * 5.0 + attackPlan.averageMargin * 0.06;
    const bestBias = (bestPlan?.winRate || 0) * 3.0 + (bestPlan?.averageMargin || 0) * 0.04;
    bonus += attackBias + bestBias;
    if (attackPlan.winRate >= 2 / 3 || attackPlan.averageMargin >= 5) bonus += 3.2;
    else if (hpRatio <= 0.35) bonus -= 1.6;
    else bonus += 0.3;
  } else {
    bonus += adjacentEnemies > 0 ? 0.9 : -0.9;
  }

  if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus += 0.65;
  if (endCell.owner === playerIndex) bonus -= 0.2;

  const flagAccess = getFlagAccessScoreAtPoint(endpoint.row, endpoint.col);
  if (player.flagHolder) {
    bonus += flagAccess * 0.06;
  } else {
    bonus += flagAccess * 0.12;
  }

  if (attackRatio >= 0.85) bonus += 0.95;
  if (attackRatio <= 0.42) bonus -= 0.75;
  if (hpRatio <= 0.3) bonus -= 1.45;
  if (techniqueRatio <= 0.22) bonus -= 0.25;

  bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * (hpRatio <= 0.38 ? 0.44 : 0.18);
  return bonus;
}

function getVorkPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "battler2" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  if (cell.owner === null) bonus += 0.18;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.85;

  let nearbyEnemies = 0;
  let nearbyEnemyTiles = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - row) + Math.abs(other.position.col - col);
    if (distance <= 1) nearbyEnemies += 1;
  });

  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) nearbyEnemyTiles += 1;
    }
  }

  bonus += nearbyEnemyTiles * 0.22;
  bonus += nearbyEnemies * 0.48;
  if (cell.groundItem?.id === 'flag') bonus += 1.2;
  if (cell.special.includes('flag')) bonus += 0.85;
  return bonus;
}

function getTotoZoneStrategicValue(player, centerPoint) {
  if (!player || player.activeCharacterId !== "trapper1" || !centerPoint) return 0;
  const playerIndex = state.currentPlayerIndex;
  let value = 0;
  let enemyTiles = 0;
  let neutralTiles = 0;
  let enemiesInside = 0;
  let enemiesNear = 0;
  let healTiles = 0;
  let flagTiles = 0;
  let obstaclePressure = 0;

  for (let row = centerPoint.row - 1; row <= centerPoint.row + 1; row += 1) {
    for (let col = centerPoint.col - 1; col <= centerPoint.col + 1; col += 1) {
      const cell = getCell(row, col);
      if (!cell) continue;
      if (cell.owner === null) neutralTiles += 1;
      else if (!isFriendlyOwner(cell.owner, playerIndex)) enemyTiles += 1;
      if (Array.isArray(cell.special)) {
        if (cell.special.includes('flag')) flagTiles += 1;
        if (cell.special.includes('heal-atk') || cell.special.includes('heal-hp') || cell.special.includes('heal-tech')) healTiles += 1;
      }
      if (cell.groundItem?.id === 'flag') flagTiles += 1;
      if (cell.obstacle) {
        const obstacle = cell.obstacle;
        const hp = Math.max(0, Number(obstacle.hp) || 0);
        let obstacleValue = 0.45;
        if (hp <= 15) obstacleValue += 2.2;
        else if (hp <= 30) obstacleValue += 1.0;
        const accessScore = getFlagAccessScoreAtPoint(row, col);
        obstacleValue += accessScore * 0.34;
        if (obstacle.dropItemId === 'forceShard') {
          const simulatedCell = { groundItem: { id: 'forceShard' } };
          obstacleValue += getPowerShardPickupValue(player, simulatedCell) * 0.95;
        }
        for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
          for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
            const nearby = getCell(scanRow, scanCol);
            if (!nearby) continue;
            if (Array.isArray(nearby.special) && nearby.special.includes('flag')) obstacleValue += Math.max(1.5, FLAG_POINTS * 0.1);
            if (nearby.groundItem?.id === 'flag') obstacleValue += Math.max(1.8, FLAG_POINTS * 0.14);
            if (!nearby.obstacle) obstacleValue += getComputerHealTileValue(player, nearby) * 0.14;
          }
        }
        if (getForceShardCount(player) >= MAX_POWER_SHARDS && obstacle.dropItemId === 'forceShard' && accessScore < Math.max(9, FLAG_POINTS * 0.85)) {
          obstacleValue -= 1.7;
        }
        obstaclePressure += obstacleValue;
      }
    }
  }

  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - centerPoint.row) + Math.abs(other.position.col - centerPoint.col);
    if (distance <= 1) enemiesInside += 1;
    else if (distance <= 2) enemiesNear += 1;
  });

  value += enemyTiles * 0.55;
  value += neutralTiles * 0.12;
  value += enemiesInside * 3.4;
  value += enemiesNear * 1.45;
  value += healTiles * 1.15;
  value += flagTiles * Math.max(1.8, FLAG_POINTS * 0.12);
  value += obstaclePressure * 0.72;
  return value;
}

function getTotoPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "trapper1" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  const zoneValue = getTotoZoneStrategicValue(player, endpoint);
  bonus += zoneValue * 0.58;

  let enemyTilesAround = 0;
  let visibleEnemiesNear = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) enemyTilesAround += 1;
    }
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    if (distance <= 2) visibleEnemiesNear += 1;
  });

  bonus += enemyTilesAround * 0.42;
  bonus += visibleEnemiesNear * 0.85;

  if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus += 0.5;
  if (endCell.special.includes('flag') || endCell.groundItem?.id === 'flag') bonus += Math.max(1.2, FLAG_POINTS * 0.09);
  const attackCurrent = Math.max(0, Number(player.currentStats?.attack) || 0);
  if (attackCurrent >= 30) bonus += 0.55;
  else bonus -= 1.1;

  bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * 0.12;
  return bonus;
}

function getTotoPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "trapper1" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  if (cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.92;
  else if (cell.owner === null) bonus += 0.16;

  let enemyAdjacency = 0;
  let strategicAdjacency = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - row) + Math.abs(other.position.col - col);
    if (distance <= 2) enemyAdjacency += 1;
  });
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby) continue;
      if (nearby.special.includes('flag') || nearby.groundItem?.id === 'flag') strategicAdjacency += 1;
      if (nearby.special.includes('heal-atk') || nearby.special.includes('heal-hp') || nearby.special.includes('heal-tech')) strategicAdjacency += 1;
    }
  }
  bonus += enemyAdjacency * 0.26;
  bonus += strategicAdjacency * 0.24;
  return bonus;
}

function getKazanPitStrategicValue(player, centerPoint) {
  if (!player || player.activeCharacterId !== "trapper2" || !centerPoint) return 0;
  const playerIndex = state.currentPlayerIndex;
  const cell = getCell(centerPoint.row, centerPoint.col);
  if (!cell) return 0;
  let value = 0;
  let adjacentEnemyTiles = 0;
  let adjacentNeutralTiles = 0;
  let nearbyEnemies = 0;
  let nearbyThreat = 0;

  if (cell.special.includes('flag') || cell.groundItem?.id === 'flag') value += Math.max(5.5, FLAG_POINTS * 0.36);
  if (cell.special.includes('heal-atk') || cell.special.includes('heal-hp') || cell.special.includes('heal-tech')) value += 3.0;
  if (cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex)) value += 1.4;
  else if (cell.owner === null) value += 0.45;

  for (let row = centerPoint.row - 1; row <= centerPoint.row + 1; row += 1) {
    for (let col = centerPoint.col - 1; col <= centerPoint.col + 1; col += 1) {
      if (row === centerPoint.row && col === centerPoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby) continue;
      if (!nearby.obstacle) {
        if (nearby.owner === null) adjacentNeutralTiles += 1;
        else if (!isFriendlyOwner(nearby.owner, playerIndex)) adjacentEnemyTiles += 1;
        if (nearby.special.includes('flag') || nearby.groundItem?.id === 'flag') value += Math.max(1.2, FLAG_POINTS * 0.08);
        if (nearby.special.includes('heal-atk') || nearby.special.includes('heal-hp') || nearby.special.includes('heal-tech')) value += 0.9;
      }
    }
  }

  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - centerPoint.row) + Math.abs(other.position.col - centerPoint.col);
    if (distance <= 1) nearbyEnemies += 1;
    else if (distance <= 2) nearbyThreat += 1;
  });

  const existingOwnPit = cell.pits?.some((pit) => pit.ownerIndex === playerIndex);
  if (existingOwnPit) value -= 2.4;

  value += adjacentEnemyTiles * 0.7;
  value += adjacentNeutralTiles * 0.12;
  value += nearbyEnemies * 2.2;
  value += nearbyThreat * 0.85;
  value += getFlagAccessScoreAtPoint(centerPoint.row, centerPoint.col) * 0.18;
  return value;
}

function getKazanPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "trapper2" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  const pitValue = getKazanPitStrategicValue(player, endpoint);
  bonus += pitValue * 0.62;

  const attackCurrent = Math.max(0, Number(player.currentStats?.attack) || 0);
  const hpCurrent = Math.max(0, Number(player.currentStats?.hp) || 0);
  const hpRatio = hpCurrent / Math.max(1, getCurrentMax(player, 'hp'));
  if (attackCurrent >= 15) bonus += 0.55;
  else bonus -= 1.6;

  let adjacentEnemies = 0;
  let enemyTilesAround = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) enemyTilesAround += 1;
    }
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    if (distance <= 1) adjacentEnemies += 1;
  });

  bonus += enemyTilesAround * 0.34;
  bonus += adjacentEnemies * 0.82;
  if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus += 0.55;
  if (endCell.special.includes('flag') || endCell.groundItem?.id === 'flag') bonus += Math.max(1.6, FLAG_POINTS * 0.11);

  bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * (hpRatio <= 0.38 ? 0.4 : 0.2);
  return bonus;
}

function getKazanPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "trapper2" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  if (cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.82;
  else if (cell.owner === null) bonus += 0.22;

  let enemyAdjacency = 0;
  let strategicAdjacency = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - row) + Math.abs(other.position.col - col);
    if (distance <= 2) enemyAdjacency += 1;
  });
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby) continue;
      if (nearby.special.includes('flag') || nearby.groundItem?.id === 'flag') strategicAdjacency += 1;
      if (nearby.special.includes('heal-atk') || nearby.special.includes('heal-hp') || nearby.special.includes('heal-tech')) strategicAdjacency += 1;
    }
  }
  bonus += enemyAdjacency * 0.22;
  bonus += strategicAdjacency * 0.2;
  return bonus;
}

function getVeskaVenomProfile(player, point = null) {
  if (!player || player.activeCharacterId !== "trapper3") {
    return {
      value: 0,
      ownedTiles: 0,
      enemyOnVenom: 0,
      enemyNearVenom: 0,
      friendlyNearPoint: 0,
      enemiesNearPoint: 0,
      strategicFriendlyTiles: 0,
      unsafe: 0
    };
  }
  const center = point || player.position;
  if (!center) {
    return {
      value: 0,
      ownedTiles: 0,
      enemyOnVenom: 0,
      enemyNearVenom: 0,
      friendlyNearPoint: 0,
      enemiesNearPoint: 0,
      strategicFriendlyTiles: 0,
      unsafe: 0
    };
  }
  const playerIndex = state.players.indexOf(player);
  const snapshot = getComputerScoreSnapshot(player);
  let ownedTiles = 0;
  let enemyOnVenom = 0;
  let enemyNearVenom = 0;
  let friendlyNearPoint = 0;
  let enemiesNearPoint = 0;
  let strategicFriendlyTiles = 0;
  let unsafe = 0;

  const visibleEnemies = state.players.filter((other) => other
    && other.id !== player.id
    && other.position
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other));

  getPlayableBoardCells().forEach((cell) => {
    if (!cell || cell.obstacle || cell.owner === null || !isFriendlyOwner(cell.owner, playerIndex)) return;
    ownedTiles += 1;
    const centerDistance = Math.abs(cell.row - center.row) + Math.abs(cell.col - center.col);
    if (centerDistance <= 2) friendlyNearPoint += 1;
    if (cell.special.includes('flag') || cell.groundItem?.id === 'flag') strategicFriendlyTiles += 1.6;
    if (cell.special.includes('heal-atk') || cell.special.includes('heal-hp') || cell.special.includes('heal-tech')) strategicFriendlyTiles += 0.7;
    strategicFriendlyTiles += getCaptureTerritoryPaintTargetBonus(player, cell) * 0.035;
    strategicFriendlyTiles += getControlAreaTacticalBonus(player, cell) * 0.045;

    visibleEnemies.forEach((enemy) => {
      const distance = Math.abs(enemy.position.row - cell.row) + Math.abs(enemy.position.col - cell.col);
      if (distance === 0) enemyOnVenom += 1;
      else if (distance <= 2) enemyNearVenom += 1.15 / distance;
      else if (distance <= 4 && (cell.special.includes('flag') || cell.groundItem?.id === 'flag' || Array.isArray(cell.territoryIds) && cell.territoryIds.length)) {
        enemyNearVenom += 0.22;
      }
    });
  });

  visibleEnemies.forEach((enemy) => {
    const distance = Math.abs(enemy.position.row - center.row) + Math.abs(enemy.position.col - center.col);
    if (distance <= 3) enemiesNearPoint += Math.max(0.4, 2.8 - distance * 0.65);
    if (distance <= 2) {
      const enemyPlan = getBestComputerBattlePlan(enemy, player);
      unsafe += 1.1 + Math.max(0, 3 - distance) * 1.15 + (enemyPlan?.winRate || 0) * 3.2;
    }
  });

  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  if (hpRatio < 0.42) unsafe += 3.2;
  else if (hpRatio < 0.58) unsafe += 1.25;

  let value = 0;
  value += enemyOnVenom * 6.2;
  value += enemyNearVenom * 1.65;
  value += Math.min(10, ownedTiles * 0.2);
  value += Math.min(6.5, friendlyNearPoint * 0.55);
  value += enemiesNearPoint * 1.15;
  value += Math.min(7.5, strategicFriendlyTiles);
  if (snapshot.closeoutUrgency > 0) value += snapshot.closeoutUrgency * Math.min(4.5, ownedTiles * 0.18);
  value -= Math.max(0, unsafe - 6) * 0.42;

  return {
    value,
    ownedTiles,
    enemyOnVenom,
    enemyNearVenom,
    friendlyNearPoint,
    enemiesNearPoint,
    strategicFriendlyTiles,
    unsafe
  };
}

function getVeskaPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "trapper3" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  const playerIndex = state.players.indexOf(player);
  const activeVenom = !!getActiveVeskaVarnishForOwner(playerIndex);
  const skillReady = (Number(player.cooldowns?.trapper3VenomVarnish) || 0) <= 0 && !activeVenom;
  const profile = getVeskaVenomProfile(player, endpoint);
  let bonus = profile.value * (activeVenom ? 0.42 : 0.28);

  if (activeVenom && endCell.owner !== null && isFriendlyOwner(endCell.owner, playerIndex)) bonus += 1.9;
  if (skillReady && profile.ownedTiles >= 4 && profile.friendlyNearPoint >= 2) bonus += profile.value * 0.22;
  if (skillReady && profile.enemyOnVenom > 0) bonus += 3.4;
  if (profile.enemiesNearPoint > 0 && endCell.owner !== null && isFriendlyOwner(endCell.owner, playerIndex)) bonus += profile.enemiesNearPoint * 0.55;
  if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus += activeVenom ? 0.35 : 0.9;
  if (endCell.special.includes('flag') || endCell.groundItem?.id === 'flag') bonus += Math.max(1.4, FLAG_POINTS * 0.1);
  bonus += getCaptureTerritoryPathBonus(player, endCell) * (activeVenom ? 0.18 : 0.08);
  bonus += getControlAreaTacticalBonus(player, endCell) * (activeVenom ? 0.2 : 0.1);

  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  bonus -= profile.unsafe * (hpRatio < 0.5 ? 0.28 : 0.14);
  return bonus;
}

function getVeskaPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "trapper3" || !cell) return 0;
  const playerIndex = state.players.indexOf(player);
  const activeVenom = !!getActiveVeskaVarnishForOwner(playerIndex);
  const skillReady = (Number(player.cooldowns?.trapper3VenomVarnish) || 0) <= 0 && !activeVenom;
  if (!activeVenom && !skillReady) return 0;

  let bonus = 0;
  if (cell.owner === null) bonus += activeVenom ? 0.85 : 0.35;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += activeVenom ? 2.4 : 1.15;

  let nearbyEnemyPressure = 0;
  let adjacentFriendlyTiles = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - row) + Math.abs(other.position.col - col);
    if (distance <= 3) nearbyEnemyPressure += Math.max(0.3, 2.6 - distance * 0.65);
  });
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner !== null && isFriendlyOwner(nearby.owner, playerIndex)) adjacentFriendlyTiles += 1;
      if (nearby.special.includes('flag') || nearby.groundItem?.id === 'flag') bonus += activeVenom ? 1.2 : 0.55;
      if (nearby.special.includes('heal-atk') || nearby.special.includes('heal-hp') || nearby.special.includes('heal-tech')) bonus += activeVenom ? 0.55 : 0.25;
    }
  }

  bonus += nearbyEnemyPressure * (activeVenom ? 1.05 : 0.48);
  bonus += adjacentFriendlyTiles * (activeVenom ? 0.38 : 0.22);
  bonus += getCaptureTerritoryPaintTargetBonus(player, cell) * (activeVenom ? 0.22 : 0.08);
  bonus += getControlAreaTacticalBonus(player, cell) * (activeVenom ? 0.26 : 0.12);
  return bonus;
}

function getBrumPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "tanker1") return 0;
  const playerIndex = state.currentPlayerIndex;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  const flagCarrierMap = isFlagCarrierMapActive();
  const isHomeTile = isAlliedStartTileForPlayer(player, endpoint.row, endpoint.col);
  const homeDistance = getDistanceToNearestAlliedStart(player, endpoint);
  const frontlineValue = getFlagCarrierFrontlineValue(player, endpoint);
  let bonus = 0;
  const hpRatio = Math.max(0, Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  const techniqueRatio = Math.max(0, Number(player.currentStats?.technique) || 0) / Math.max(1, getCurrentMax(player, 'technique'));
  const attackRatio = Math.max(0, Number(player.currentStats?.attack) || 0) / Math.max(1, getCurrentMax(player, 'attack'));
  const pathSteps = Math.max(0, path.length - 1);

  if (endCell.owner === playerIndex) bonus += 1.35;
  else if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus += 0.95;
  if (endCell.special.includes('flag') || endCell.groundItem?.id === 'flag') bonus += Math.max(2.8, FLAG_POINTS * 0.18);
  bonus += getComputerHealTileValue(player, endCell) * 0.52;

  let nearbyEnemies = 0;
  let nearbyFriendlyTiles = 0;
  let nearbyEnemyTiles = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === playerIndex) nearbyFriendlyTiles += 1;
      else if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) nearbyEnemyTiles += 1;
    }
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - endpoint.row) + Math.abs(other.position.col - endpoint.col);
    if (distance <= 1) nearbyEnemies += 1;
  });

  bonus += nearbyFriendlyTiles * 0.24;
  bonus += nearbyEnemyTiles * 0.18;
  bonus += nearbyEnemies * 0.62;

  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);
  if (opponentOnEndpoint) {
    const plan = getBestComputerBattlePlan(player, opponentOnEndpoint);
    bonus += (plan?.winRate || 0) >= (2 / 3) ? 1.8 : 0.45;
    if ((plan?.averageMargin || 0) >= 5) bonus += 0.9;
  }

  if (player.flagHolder) {
    bonus += endCell.owner === playerIndex ? 1.15 : 0;
    bonus += getFlagAccessScoreAtPoint(endpoint.row, endpoint.col) * 0.08;
  } else {
    bonus += getFlagAccessScoreAtPoint(endpoint.row, endpoint.col) * 0.14;
  }

  if (flagCarrierMap) {
    bonus += frontlineValue * 0.95;
    if (!playerHasFlag(player) && isHomeTile) bonus -= 9.5;
    else if (!playerHasFlag(player) && Number.isFinite(homeDistance) && homeDistance <= 2) bonus -= Math.max(0, 5.8 - homeDistance * 1.8);
    if (!playerHasFlag(player) && endpoint.row >= 5 && endpoint.row <= 8) bonus += 4.8;
    if (nearbyEnemies > 0) bonus += 2.8;
    if (nearbyEnemyTiles > 0) bonus += 2.1;
    if (isTeamModeEnabled()) bonus += getComputerTeamSupportValue(player, endpoint) * 0.8;
  }

  if (hpRatio <= 0.4) bonus += (endCell.owner === playerIndex ? 1.4 : 0) + getComputerHealTileValue(player, endCell) * 0.18;
  if (techniqueRatio <= 0.34) bonus += getComputerHealTileValue(player, endCell) * 0.16;
  if (attackRatio <= 0.25 && nearbyEnemies === 0) bonus -= 0.6;

  // Heavy Steps: Brum cannot roll a 4 on the Move die, so it should slightly favor
  // closer, stickier control over overextending to the far edge of its movement.
  bonus += nearbyFriendlyTiles * 0.1;
  if (pathSteps >= 3 && endCell.owner !== playerIndex && !endCell.special.includes('flag') && endCell.groundItem?.id !== 'flag') {
    bonus -= 0.55;
  }
  if (pathSteps <= 2 && (endCell.owner === playerIndex || nearbyFriendlyTiles >= 2)) {
    bonus += 0.35;
  }

  bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * (flagCarrierMap && !playerHasFlag(player) ? 0.14 : 0.2);
  return bonus;
}

function getBrumPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "tanker1" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  const flagCarrierMap = isFlagCarrierMapActive();
  let bonus = 0;
  if (cell.owner === null) bonus += 0.22;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.44;
  let friendlyNearby = 0;
  let strategicNearby = 0;
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.owner === playerIndex) friendlyNearby += 1;
      if (nearby.special.includes('flag') || nearby.groundItem?.id === 'flag') strategicNearby += 1;
      if (nearby.special.includes('heal-atk') || nearby.special.includes('heal-hp') || nearby.special.includes('heal-tech')) strategicNearby += 1;
    }
  }
  bonus += friendlyNearby * 0.18;
  bonus += strategicNearby * 0.22;
  if (cell.special.includes('flag')) bonus += 0.95;
  if (cell.special.includes('heal-atk') || cell.special.includes('heal-hp') || cell.special.includes('heal-tech')) bonus += 0.55;
  return bonus;
}


function getMogPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "tanker2") return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint || !endCell) return 0;
  let bonus = 0;
  const playerIndex = state.currentPlayerIndex;
  const hpRatio = Math.max(0, Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  const techniqueRatio = Math.max(0, Number(player.currentStats?.technique) || 0) / Math.max(1, getCurrentMax(player, 'technique'));
  const inventorySlots = getInventorySlotCount(player);
  const localPressure = getComputerLocalPressure(player, endpoint);

  if (endCell.groundItem) {
    if (endCell.groundItem.id === 'flag') bonus += Math.max(1.4, FLAG_POINTS * 0.09);
    else if (endCell.groundItem.id === 'forceShard') bonus += getPowerShardPickupValue(player, endCell) * 0.35;
    else bonus += 2.8;
  }
  bonus += getComputerHealTileValue(player, endCell) * 0.42;
  if (inventorySlots <= 2) bonus += 0.45;
  else if (inventorySlots >= 4) bonus += 1.1;
  if ((player.cooldowns?.tanker2Quickdig || 0) <= 0 && techniqueRatio >= 0.32 && inventorySlots < MAX_ITEMS) {
    bonus += 0.7;
  }

  let nearbyItems = 0;
  let nearbyEnemyTiles = 0;
  let nearbyFriendlyTiles = 0;
  for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
    for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
      if (row === endpoint.row && col === endpoint.col) continue;
      const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.groundItem && nearby.groundItem.id !== 'flag') nearbyItems += 1;
      if (nearby.owner === playerIndex) nearbyFriendlyTiles += 1;
      else if (nearby.owner !== null && !isFriendlyOwner(nearby.owner, playerIndex)) nearbyEnemyTiles += 1;
    }
  }
  bonus += nearbyItems * 0.9;
  bonus += nearbyEnemyTiles * 0.28;
  bonus += nearbyFriendlyTiles * 0.16;

  if (hpRatio >= 0.56) {
    bonus += Math.min(1.8, localPressure * 0.3);
  } else {
    bonus -= localPressure * 0.22;
  }

  if (hpRatio <= 0.42) bonus += getComputerHealTileValue(player, endCell) * 0.25;
  if (player.flagHolder) bonus -= localPressure * 0.18;

  return bonus;
}

function getMogPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "tanker2" || !cell) return 0;
  const playerIndex = state.currentPlayerIndex;
  let bonus = 0;
  if (cell.owner === null) bonus += 0.18;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 0.34;
  if (cell.groundItem && cell.groundItem.id !== 'flag') bonus += 1.25;
  if (cell.special.includes('heal-hp') || cell.special.includes('heal-tech') || cell.special.includes('heal-atk')) bonus += 0.4;
  let nearbyItems = 0;
  let strategicNearby = 0;
  for (let scanRow = row - 1; scanRow <= row + 1; scanRow += 1) {
    for (let scanCol = col - 1; scanCol <= col + 1; scanCol += 1) {
      if (scanRow === row && scanCol === col) continue;
      const nearby = getCell(scanRow, scanCol);
      if (!nearby || nearby.obstacle) continue;
      if (nearby.groundItem && nearby.groundItem.id !== 'flag') nearbyItems += 1;
      if (nearby.special.includes('heal-atk') || nearby.special.includes('heal-hp') || nearby.special.includes('heal-tech')) strategicNearby += 1;
    }
  }
  bonus += nearbyItems * 0.35;
  bonus += strategicNearby * 0.16;
  return bonus;
}

function getBrakkBlastProfile(player, point = null) {
  if (!player) return { score: 0, paintableCount: 0, enemyTiles: 0, neutralTiles: 0, vulnerable: 0 };
  const center = point || player.position;
  if (!center) return { score: 0, paintableCount: 0, enemyTiles: 0, neutralTiles: 0, vulnerable: 0 };
  const playerIndex = state.players.indexOf(player);
  const snapshot = getComputerScoreSnapshot(player);
  let score = 0;
  let paintableCount = 0;
  let enemyTiles = 0;
  let neutralTiles = 0;
  for (let row = center.row - 2; row <= center.row + 2; row += 1) {
    for (let col = center.col - 2; col <= center.col + 2; col += 1) {
      const cell = getCell(row, col);
      if (!cell || cell.obstacle) continue;
      if (cell.startOwner !== null && cell.startOwner !== playerIndex) continue;
      if (isFriendlyOwner(cell.owner, playerIndex)) continue;
      paintableCount += 1;
      if (cell.owner === null) {
        neutralTiles += 1;
        score += snapshot.endgame ? 1.45 : 1.05;
      } else {
        enemyTiles += 1;
        score += snapshot.endgame ? 1.35 : 1.85;
      }
      score += getCaptureTerritoryPaintTargetBonus(player, cell) * 0.22;
      score += getControlAreaTacticalBonus(player, cell) * 0.28;
      if (cell.special.includes('flag')) score += Math.max(1.8, FLAG_POINTS * 0.18);
      if (cell.groundItem?.id === 'flag') score += Math.max(2.6, FLAG_POINTS * 0.24);
    }
  }

  const stored = Math.max(0, Number(getBrakkPaintBomb(player)?.storedPaint) || 0);
  const expectedCapacity = isBrakkPaintBombActive(player)
    ? Math.max(stored, Math.min(6, stored + Math.max(0, Number(state.paintDie) || 0)))
    : Math.min(6, Math.max(3, Number(state.remainingPaint) || Number(state.paintDie) || 3));
  score += Math.min(paintableCount, expectedCapacity) * 0.85;
  if (paintableCount < 3) score -= 4.4;
  if (enemyTiles >= 3) score += enemyTiles * 0.7;
  if (neutralTiles >= 5 && snapshot.closeoutUrgency > 0) score += snapshot.closeoutUrgency * 5.5;

  let vulnerable = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - center.row) + Math.abs(other.position.col - center.col);
    if (distance > 2) return;
    const battlePlan = getBestComputerBattlePlan(other, player);
    vulnerable += 1.2 + Math.max(0, 3 - distance) * 1.3
      + (battlePlan?.winRate || 0) * 3.6
      + Math.max(0, Number(battlePlan?.averageMargin) || 0) * 0.05;
  });
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
  if (hpRatio < 0.42) vulnerable += 3.8;
  else if (hpRatio < 0.58) vulnerable += 1.4;
  score -= vulnerable * 0.85;

  return { score, paintableCount, enemyTiles, neutralTiles, vulnerable };
}

function getBrakkPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "painter3" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint) return 0;
  const profile = getBrakkBlastProfile(player, endpoint);
  let bonus = profile.score * 0.28;
  const skillReady = (Number(player.cooldowns?.painter3Backblast) || 0) <= 0 && !isBrakkPaintBombActive(player);
  const hpCurrent = Number(player.currentStats?.hp) || 0;
  if (skillReady && hpCurrent >= 32 && profile.paintableCount >= 4) {
    bonus += profile.score * 0.42;
    if (profile.enemyTiles >= 3) bonus += 2.4;
  }
  if (endCell && endCell.owner !== null && !isFriendlyOwner(endCell.owner, state.players.indexOf(player))) {
    bonus -= profile.vulnerable * 0.35;
  }
  return bonus;
}

function getBrakkPaintTacticalBonus(player, cell, row, col) {
  if (!player || player.activeCharacterId !== "painter3" || !cell) return 0;
  const playerIndex = state.players.indexOf(player);
  let bonus = 0;
  if (cell.owner === null) bonus += isBrakkPaintBombDetonating(player) ? 1.35 : 0.75;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += isBrakkPaintBombDetonating(player) ? 2.35 : 1.05;
  if (isBrakkPaintBombDetonating(player)) {
    const centerDistance = Math.max(Math.abs(player.position.row - row), Math.abs(player.position.col - col));
    bonus += Math.max(0, 2 - centerDistance) * 0.25;
    bonus += getCaptureTerritoryPaintTargetBonus(player, cell) * 0.35;
    bonus += getControlAreaTacticalBonus(player, cell) * 0.45;
  }
  return bonus;
}

function getCaptureTerritoryControlProfile(player, territory) {
  if (!isCaptureTerritoryMapActive() || !player || !territory) return null;
  const playerIndex = state.players.indexOf(player);
  if (playerIndex < 0) return null;
  const ownKey = getCaptureTerritoryScoreKeyForPlayerIndex(playerIndex);
  const summary = getTerritoryStateSummary(territory);
  const ownPaintCount = Number(summary.paintedOwnerCounts?.get?.(ownKey)) || 0;
  const enemyPaintCount = summary.paintedOwnerKeys.reduce((count, key) => key === ownKey ? count : count + (Number(summary.paintedOwnerCounts?.get?.(key)) || 0), 0);
  const enemyOccupants = getPlayersInsideTerritory(territory).filter((other) => other && other.id !== player.id && !arePlayersAllied(player, other));
  const totalPainted = ownPaintCount + enemyPaintCount;
  const ownPaintShare = totalPainted > 0 ? ownPaintCount / totalPainted : 0;
  const enemyControlled = !!summary.soleOccupantKey && summary.soleOccupantKey !== ownKey;
  const ownControlled = summary.soleOccupantKey === ownKey;
  const ownFavoredButContested = !enemyControlled && !ownControlled && ownPaintCount > 0 && ownPaintShare >= 0.58 && (enemyPaintCount > 0 || enemyOccupants.length > 0);
  return {
    ownKey,
    summary,
    ownPaintCount,
    enemyPaintCount,
    enemyOccupants,
    enemyControlled,
    ownControlled,
    ownFavoredButContested,
    ownPaintShare
  };
}

function getCaptureTerritoryProfileForCell(player, cell) {
  if (!cell || !Array.isArray(cell.territoryIds) || !cell.territoryIds.length) return null;
  const territory = getCurrentMapTerritories().find((entry) => entry.id === cell.territoryIds[0]);
  return getCaptureTerritoryControlProfile(player, territory);
}

function getCaptureTerritoryTakeoverSafetyBonus(player, profile, point = null) {
  if (!isCaptureTerritoryMapActive() || !player || !profile?.enemyControlled) return 0;
  const visibleEnemies = profile.enemyOccupants.filter((opponent) => (
    opponent?.position && isComputerAwareOfPlayerPosition(player, opponent)
  ));
  if (!visibleEnemies.length) return 34;
  let bestBattleValue = Number.NEGATIVE_INFINITY;
  visibleEnemies.forEach((opponent) => {
    const plan = getBestComputerBattlePlan(player, opponent);
    if (!plan) return;
    const distance = point && opponent.position
      ? Math.abs(opponent.position.row - point.row) + Math.abs(opponent.position.col - point.col)
      : 0;
    const endpointBattle = distance === 0 ? 16 : 0;
    const closeBattle = distance === 1 ? 8 : 0;
    const distancePenalty = Math.min(18, distance * 3.5);
    const value = endpointBattle + closeBattle - distancePenalty
      + (plan.winRate * 58)
      + Math.max(-18, Math.min(22, plan.averageMargin * 0.18))
      - ((plan.weightedLosses || 0) * 18);
    bestBattleValue = Math.max(bestBattleValue, value);
  });
  if (!Number.isFinite(bestBattleValue)) return -18;
  if (bestBattleValue >= 34) return bestBattleValue;
  return bestBattleValue - 28;
}

function hasNeverControlledCaptureTerritory() {
  if (!isCaptureTerritoryMapActive()) return false;
  return getCurrentMapTerritories().some((territory) => getTerritoryStateSummary(territory).isNeverControlled);
}

function getCaptureTerritoryPaintTargetBonus(player, cell) {
  const profile = getCaptureTerritoryProfileForCell(player, cell);
  if (!profile) return 0;
  const playerIndex = state.players.indexOf(player);
  const isEnemyPaint = cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex);
  if (hasNeverControlledCaptureTerritory()) {
    if (profile.summary.isNeverControlled) {
      if (cell.owner === null) return 132;
      if (isEnemyPaint) return 118;
      return 84;
    }
    return 0;
  }
  if (profile.enemyControlled) {
    return (isEnemyPaint ? 82 : 58) + getCaptureTerritoryTakeoverSafetyBonus(player, profile, cell);
  }
  if (profile.ownFavoredButContested) {
    return isEnemyPaint ? 42 : 18;
  }
  if (profile.summary.contested && isEnemyPaint) return 24;
  if (!profile.summary.soleOccupantKey && profile.ownPaintCount === 0) return 12;
  return 0;
}

function getCaptureTerritoryBattleTargetBonus(player, opponent, point) {
  if (!isCaptureTerritoryMapActive() || !player || !opponent || !point || arePlayersAllied(player, opponent)) return 0;
  const cell = getCell(point.row, point.col);
  const profile = getCaptureTerritoryProfileForCell(player, cell);
  if (!profile) return 0;
  if (hasNeverControlledCaptureTerritory()) {
    return profile.summary.isNeverControlled ? 126 : 0;
  }
  if (profile.enemyControlled) return 96 + getCaptureTerritoryTakeoverSafetyBonus(player, profile, point);
  if (profile.ownFavoredButContested) return 48;
  if (profile.summary.contested) return 24;
  return 0;
}

function getCaptureTerritoryPathBonus(player, endCell) {
  if (!isCaptureTerritoryMapActive() || !player || !endCell || !Array.isArray(endCell.territoryIds) || !endCell.territoryIds.length) return 0;
  let bonus = 0;
  endCell.territoryIds.forEach((territoryId) => {
    const territory = getCurrentMapTerritories().find((entry) => entry.id === territoryId);
    if (!territory) return;
    const profile = getCaptureTerritoryControlProfile(player, territory);
    if (!profile) return;
    if (hasNeverControlledCaptureTerritory()) {
      bonus += profile.summary.isNeverControlled ? 150 : 0;
      return;
    }
    if (profile.enemyControlled) {
      bonus += 72 + getCaptureTerritoryTakeoverSafetyBonus(player, profile, endCell);
      return;
    }
    if (profile.ownFavoredButContested) {
      bonus += 34;
      return;
    }
    if (profile.summary.contested) {
      bonus += 16;
      return;
    }
    if (!profile.summary.soleOccupantKey) {
      bonus += 14;
      return;
    }
    if (profile.ownControlled) {
      bonus += 10;
      return;
    }
    bonus += 12;
  });
  return bonus;
}

function getControlAreaTacticalBonus(player, cell) {
  if (!doesCurrentMapUseControlAreaWin() || !player || !cell || !isCellInControlArea(cell)) return 0;
  const playerIndex = state.players.indexOf(player);
  const ownKey = isTeamModeEnabled() ? normalizeTeamKey(player.teamKey, playerIndex) : `player:${playerIndex}`;
  const cells = getControlAreaCells();
  const ownedBySide = cells.filter((entry) => getControlAreaOwnerKeyForCell(entry) === ownKey).length;
  const remainingAfterThis = cells.length - Math.max(ownedBySide, getControlAreaOwnerKeyForCell(cell) === ownKey ? ownedBySide : ownedBySide + 1);
  let bonus = 0;
  if (cell.owner === null) bonus += 12;
  else if (!isFriendlyOwner(cell.owner, playerIndex)) bonus += 24;
  else bonus += 4;
  bonus += ownedBySide * 1.8;
  if (remainingAfterThis <= 3) bonus += (4 - remainingAfterThis) * 22;
  return bonus;
}

function scoreComputerPath(player, path) {
  const playerIndex = state.currentPlayerIndex;
  const snapshot = getComputerScoreSnapshot(player);
  const closeoutUrgency = snapshot.closeoutUrgency || 0;
  const suppressMovePaint = isMoppetEmergencyCalloutActive(player);
  let score = 0;
  const endpoint = path[path.length - 1];
  const origin = path[0] || endpoint;
  if (!endpoint) return -999;
  score -= Math.max(0, path.length - 1) * 0.06;
  path.slice(1).forEach((point) => {
    const cell = getCell(point.row, point.col);
    if (!cell) return;
    if (cell.obstacle) {
      score += getObstacleBreakValue(player, cell, point);
      return;
    }
    const paintRelevant = cell.startOwner === null;
    if (paintRelevant && !suppressMovePaint && canPlayerRepaintCell(playerIndex, cell)) {
      if (cell.owner === null) score += snapshot.endgame ? 1.7 : 2.5;
      else if (!isFriendlyOwner(cell.owner, playerIndex)) score += snapshot.endgame ? 2.25 : 1.8;
      score += getCaptureTerritoryPaintTargetBonus(player, cell) * 0.34;
      score += getControlAreaTacticalBonus(player, cell) * 0.46;
      score += getFoodCourtPaintTargetBonus(player, cell) * 0.85;
      if (closeoutUrgency > 0 && cell.owner === null) score += closeoutUrgency * 2.6;
    }
    if (cell.groundItem?.id === 'forceShard') score += getPowerShardPickupValue(player, cell);
    const foodCourtStepShop = getFoodCourtShopAt(point.row, point.col);
    if (isFoodCourtGeneralStoreShop(foodCourtStepShop) && !getFoodCourtShopStatus(foodCourtStepShop.id).preparing) {
      const stepItemId = ensureFoodCourtGeneralStoreItem(foodCourtStepShop.id);
      if (stepItemId === "forceShard" && isCellOwnedByPlayerTeam(cell, playerIndex)) {
        score += isFoodCourtLowerSidePlayer(player) ? 80 : 38;
      } else if (stepItemId === "flag" && point.row === endpoint.row && point.col === endpoint.col) {
        score += 180;
      }
    }
  });
  const endCell = getCell(endpoint.row, endpoint.col);
  if (endCell) {
    if (endCell.groundItem) {
      if (endCell.groundItem.id === 'flag') {
        score += isFlagCarrierMapActive() ? 220 : Math.max(snapshot.endgame ? 24 : 18, FLAG_POINTS * (snapshot.endgame ? 2.45 : 1.9));
      } else if (endCell.groundItem.id === 'forceShard') score += getPowerShardPickupValue(player, endCell);
      else score += 4;
    }
    score += getComputerHealTileValue(player, endCell);
    if (endCell.special.includes('flag')) {
      score += isFlagCarrierMapActive() ? 220 : Math.max(snapshot.endgame ? 21 : 16, FLAG_POINTS * (snapshot.endgame ? 2.1 : 1.55));
    }
    score += getFlagAccessScoreAtPoint(endpoint.row, endpoint.col) * (snapshot.endgame ? 1.35 : 1);
    if (doesCurrentMapUseFlagDeliveryWin() && playerHasFlag(player)) {
      if (isAlliedStartTileForPlayer(player, endpoint.row, endpoint.col)) score += isFlagCarrierMapActive() ? 400 : 160;
      const homeDistance = getDistanceToNearestAlliedStart(player, endpoint);
      if (Number.isFinite(homeDistance)) score += isFlagCarrierMapActive() ? Math.max(0, 140 - homeDistance * 22) : Math.max(0, 18 - homeDistance * 2.2);
    }
    score += getComputerVisibleFlagCarrierPressureValue(player, endpoint);
    score += getComputerTeamSupportValue(player, endpoint);
    score += getCaptureTerritoryPathBonus(player, endCell);
    if (isRoyalMarchKing(player) && isRoyalMarchEnemyBackRankTile(playerIndex, endpoint.row, endpoint.col)) {
      score += state.completedTurnsInRound >= state.players.length - 1 ? 520 : 260;
    }

    const opponentOnEndpoint = state.players.find((other) => {
      return other.id !== player.id
        && !arePlayersAllied(player, other)
        && isComputerAwareOfPlayerPosition(player, other)
        && other.position
        && other.position.row === endpoint.row
        && other.position.col === endpoint.col;
    });
    if (opponentOnEndpoint && canBattleOccurAtCellForPlayers(player, opponentOnEndpoint, endpoint.row, endpoint.col)) {
      score += getComputerBattleTileValue(player, opponentOnEndpoint);
      if (snapshot.endgame) score += getComputerPriorityTargetValue(player, opponentOnEndpoint) * 0.75;
    }
    if (suppressMovePaint && canMoppetEmergencyCalloutRepaintCell(player, endCell)) {
      score += snapshot.endgame ? 3.1 : 2.55;
      score += getCaptureTerritoryPaintTargetBonus(player, endCell) * 0.34;
      score += getControlAreaTacticalBonus(player, endCell) * 0.46;
      if (closeoutUrgency > 0) score += closeoutUrgency * 1.8;
    }
    score += getFlagCarrierPathPriorityBonus(player, endpoint, endCell, opponentOnEndpoint);
    score += getFoodCourtPathPriorityBonus(player, endpoint, endCell);
    if (isFlagCarrierMapActive()) {
      const endpointHomeDistance = getDistanceToNearestAlliedStart(player, endpoint);
      const originHomeDistance = getDistanceToNearestAlliedStart(player, origin);
      const endpointFlagAccess = getFlagAccessScoreAtPoint(endpoint.row, endpoint.col);
      const originFlagAccess = getFlagAccessScoreAtPoint(origin.row, origin.col);
      const frontlineValue = Math.max(0, getFlagCarrierFrontlineValue(player, endpoint));
      const enemyFlagActive = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
      const allyFlagActive = state.players.some((other) => other && arePlayersAllied(player, other) && other.id !== player.id && playerHasFlag(other));
      score += frontlineValue * 1.18;
      if (!playerHasFlag(player)) {
        score += (endpointFlagAccess - originFlagAccess) * (enemyFlagActive ? 1.8 : 2.6);
        if (enemyFlagActive) {
          score += getComputerVisibleFlagCarrierPressureValue(player, endpoint) * 0.72;
        }
        if (!enemyFlagActive && !allyFlagActive) {
          if (path.length <= 1) score -= 24;
          if (Number.isFinite(endpointHomeDistance) && endpointHomeDistance <= 2) {
            score -= Math.max(0, 18 - endpointHomeDistance * 5.5);
          }
          if (Number.isFinite(originHomeDistance) && Number.isFinite(endpointHomeDistance) && endpointHomeDistance >= originHomeDistance) {
            score -= 12;
          }
        } else if (enemyFlagActive && Number.isFinite(endpointHomeDistance) && endpointHomeDistance === 0 && path.length <= 1) {
          score -= 10;
        }
      }
    }

    for (let row = endpoint.row - 1; row <= endpoint.row + 1; row += 1) {
      for (let col = endpoint.col - 1; col <= endpoint.col + 1; col += 1) {
        const nearby = getCell(row, col);
      if (!nearby || nearby.obstacle) continue;
      if (!suppressMovePaint && canPlayerRepaintCell(playerIndex, nearby)) {
        if (nearby.owner === null) score += snapshot.endgame ? 0.5 : 0.8;
        else if (!isFriendlyOwner(nearby.owner, playerIndex)) score += snapshot.endgame ? 1.25 : 1.05;
        score += getCaptureTerritoryPaintTargetBonus(player, nearby) * 0.18;
        score += getControlAreaTacticalBonus(player, nearby) * 0.24;
        score += getFoodCourtPaintTargetBonus(player, nearby) * 0.28;
      }
      if (nearby.groundItem?.id === 'forceShard') score += 0.45;
        if (nearby.groundItem?.id === 'flag') score += isFlagCarrierMapActive() ? 24 : Math.max(2.4, FLAG_POINTS * 0.24);
      }
    }

    if (snapshot.leading && snapshot.endgame) {
      if (endCell.owner === playerIndex) score += 2.4;
      if (playerHasFlag(player)) score += getComputerHealTileValue(player, endCell) * 0.25;
    }
    if (closeoutUrgency > 0) {
      if (endCell.owner === playerIndex) score += closeoutUrgency * 1.8;
      if (canPlayerRepaintCell(playerIndex, endCell)) {
        if (endCell.owner === null) score += closeoutUrgency * 4.2;
        if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) score -= closeoutUrgency * 1.2;
      }
      score += getComputerFuturePositionValue(player, endpoint) * closeoutUrgency * 0.22;
    }
    if (snapshot.trailing && snapshot.endgame) {
      score += getComputerFuturePositionValue(player, endpoint) * 0.55;
    } else {
      score += getComputerFuturePositionValue(player, endpoint) * 0.32;
    }

    score -= getComputerEnemyTileDanger(player, endpoint, endCell) * (1 + closeoutUrgency * 0.45);
    score += getScrabbitPathTacticalBonus(player, path, endCell);
    score += getMiraPathTacticalBonus(player, path, endCell);
    score += getTorgaPathTacticalBonus(player, path, endCell);
    score += getGranPathTacticalBonus(player, path, endCell);
    score += getVorkPathTacticalBonus(player, path, endCell);
    score += getTotoPathTacticalBonus(player, path, endCell);
    score += getKazanPathTacticalBonus(player, path, endCell);
    score += getVeskaPathTacticalBonus(player, path, endCell);
    score += getBrumPathTacticalBonus(player, path, endCell);
    score += getMogPathTacticalBonus(player, path, endCell);
    score += getBrakkPathTacticalBonus(player, path, endCell);
    score += getGallusPathTacticalBonus(player, path, endCell);
    score += getPipPathTacticalBonus(player, path, endCell);
    score += getRascaPathTacticalBonus(player, path, endCell);
    score += getCorvenPathTacticalBonus(player, path, endCell);
    score += getMoppetPathTacticalBonus(player, path, endCell);
    score += getHobbsPathTacticalBonus(player, path, endCell);
  }
  score += Math.max(0, path.length - 1) * (snapshot.trailing ? 0.04 : 0.02);
  return score;
}

function chooseComputerMovePath(player) {
  const origin = player.position ? { ...player.position } : null;
  if (!origin || !state.moveDie) return origin ? [origin] : [];
  const moveAllowance = getCurrentTurnMoveAllowance();
  const paintAllowance = getCurrentTurnPaintAllowance();
  const results = isRoyalMarchMapActive() ? getRoyalMarchComputerMoveCandidates(player) : [];
  if (!isRoyalMarchMapActive()) {
    const visited = new Set([`${origin.row},${origin.col}`]);
    getComputerMoveCandidates(player, origin, visited, moveAllowance, paintAllowance, [origin], results);
  }
  const snapshot = getComputerScoreSnapshot(player);
  results.sort((a, b) => {
    const base = b.score - a.score;
    if (Math.abs(base) > 0.0001) return base;
    if ((snapshot.closeoutUrgency || 0) > 0) return a.path.length - b.path.length;
    return b.path.length - a.path.length;
  });
  const movingResults = results.filter((entry) => entry.path.length >= 2);
  const bestResult = movingResults[0] || results[0] || { path: [origin] };
  return bestResult.path.map((entry) => ({ ...entry }));
}

function chooseComputerPaintTargets(player) {
  const center = player.position;
  if (!center || state.currentAction !== "paint") return [];
  const snapshot = getComputerScoreSnapshot(player);
  const candidates = [];
  const paintRange = isBrakkPaintBombDetonating(player) ? 2 : 1;
  const candidatePoints = [];
  const seenCandidatePoints = new Set();
  const addPaintCandidatePoint = (row, col) => {
    const key = `${row},${col}`;
    if (seenCandidatePoints.has(key)) return;
    seenCandidatePoints.add(key);
    candidatePoints.push({ row, col });
  };
  for (let row = center.row - paintRange; row <= center.row + paintRange; row += 1) {
    for (let col = center.col - paintRange; col <= center.col + paintRange; col += 1) {
      addPaintCandidatePoint(row, col);
    }
  }
  if (player.activeCharacterId === "trickster2") {
    getRascaClonesForPlayer(player).forEach((clone) => {
      getRascaTailInfluenceCells({ row: clone.row, col: clone.col }).forEach((point) => addPaintCandidatePoint(point.row, point.col));
    });
  }
  for (const { row, col } of candidatePoints) {
      const cell = getCell(row, col);
      if (!isUsefulComputerPaintTarget(state.currentPlayerIndex, cell)) continue;
      if (cell.startOwner !== null && cell.startOwner !== state.currentPlayerIndex) continue;
      const paintRelevant = cell.startOwner === null;
      const closeoutUrgency = snapshot.closeoutUrgency || 0;
      let score = paintRelevant ? (cell.owner === null ? 1.25 : 2.35) : 0.2;
      if (cell.groundItem) {
        if (cell.groundItem.id === 'flag') score += Math.max(4, FLAG_POINTS * 0.45);
        else if (cell.groundItem.id === 'forceShard') score += getPowerShardPickupValue(player, cell);
        else score += 2.2;
      }
      score += getComputerHealTileValue(player, cell) * 0.9;
      if (cell.special.includes('flag')) score += Math.max(snapshot.endgame ? 4.8 : 2.4, FLAG_POINTS * (snapshot.endgame ? 0.45 : 0.28));
      score += getFlagAccessScoreAtPoint(row, col) * (snapshot.endgame ? 0.5 : 0.35);
      score += getComputerVisibleFlagCarrierPressureValue(player, { row, col }) * 0.4;
      score += getComputerTeamSupportValue(player, { row, col }) * 0.35;
      const adjacentEnemy = state.players.some((other) => {
        if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return false;
        if (!isComputerAwareOfPlayerPosition(player, other)) return false;
        return Math.abs(other.position.row - row) + Math.abs(other.position.col - col) <= 1;
      });
      if (adjacentEnemy) score += isFlagCarrierMapActive() ? 1.8 : 0.65;
      if (paintRelevant && closeoutUrgency > 0) {
        if (cell.owner === null) score += closeoutUrgency * 4.4;
        if (cell.owner !== null && !isFriendlyOwner(cell.owner, state.currentPlayerIndex)) score -= closeoutUrgency * 0.9;
      }
      if (paintRelevant) {
        score += getCaptureTerritoryPaintTargetBonus(player, cell);
        score += getControlAreaTacticalBonus(player, cell);
        score += getFoodCourtPaintTargetBonus(player, cell);
      }
      score += getScrabbitPaintTacticalBonus(player, cell, row, col);
      score += getMiraPaintTacticalBonus(player, cell, row, col);
      score += getTorgaPaintTacticalBonus(player, cell, row, col);
      score += getGranPaintTacticalBonus(player, cell, row, col);
      score += getVorkPaintTacticalBonus(player, cell, row, col);
      score += getTotoPaintTacticalBonus(player, cell, row, col);
      score += getKazanPaintTacticalBonus(player, cell, row, col);
      score += getVeskaPaintTacticalBonus(player, cell, row, col);
      score += getBrumPaintTacticalBonus(player, cell, row, col);
      score += getMogPaintTacticalBonus(player, cell, row, col);
      score += getBrakkPaintTacticalBonus(player, cell, row, col);
      if (player.activeCharacterId === "trickster2") {
        const rascaPaintValue = getComputerRascaTailPlacementValue(player, { row, col }, { ignoreExistingTail: true });
        if (Number.isFinite(rascaPaintValue)) score += rascaPaintValue * 0.05;
        if (isRascaClonePaintSourceForPlayer(player, row, col)) score += 0.8;
      }
      candidates.push({ row, col, score });
  }
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, Math.max(0, state.remainingPaint)).map(({ row, col }) => ({ row, col }));
}

function getComputerMimiStatNeed(player) {
  if (!player || player.activeCharacterId !== "trickster1") {
    return {
      totalMissing: 0,
      hpRatio: 1,
      lowestRatio: 1,
      critical: false,
      pressure: 0,
      battleUpside: 0
    };
  }
  const statKeys = ["attack", "hp", "technique"];
  let totalMissing = 0;
  let lowestRatio = 1;
  statKeys.forEach((statKey) => {
    const maxValue = Math.max(1, getCurrentMax(player, statKey));
    const current = Math.max(0, Number(player.currentStats?.[statKey]) || 0);
    totalMissing += Math.max(0, maxValue - current);
    lowestRatio = Math.min(lowestRatio, current / maxValue);
  });
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  let pressure = 0;
  let battleUpside = 0;
  if (player.position) {
    const currentCell = getCell(player.position.row, player.position.col);
    if (currentCell && currentCell.owner !== null && !isFriendlyOwner(currentCell.owner, state.currentPlayerIndex)) {
      pressure += 2.6;
    }
    state.players.forEach((other) => {
      if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
      if (!isComputerAwareOfPlayerPosition(player, other)) return;
      const distance = Math.abs(other.position.row - player.position.row) + Math.abs(other.position.col - player.position.col);
      if (distance <= 1) pressure += 2.2;
      else if (distance <= 2) pressure += 0.9;
      const plan = distance <= 2 ? getBestComputerBattlePlan(player, other) : null;
      if (plan) {
        if (plan.guaranteedLoss || plan.winRate <= 0.34) pressure += 1.4;
        if (plan.guaranteedWin || plan.winRate >= 0.66) battleUpside += 1.2 + getComputerPriorityTargetValue(player, other) * 0.22;
      }
    });
  }
  return {
    totalMissing,
    hpRatio,
    lowestRatio,
    critical: hpRatio <= 0.38 || lowestRatio <= 0.28,
    pressure,
    battleUpside
  };
}

function getComputerMimiCapRoom(player) {
  if (!player) return 0;
  return ["attack", "hp", "technique"].reduce((sum, statKey) => {
    return sum + Math.max(0, DEFAULT_MAX_STAT - getCurrentMax(player, statKey));
  }, 0);
}

function getComputerTurnsUntilPlayerIndex(playerIndex) {
  if (!Array.isArray(state.order) || !state.order.length) return Number.POSITIVE_INFINITY;
  const currentOrderSlot = Math.max(0, Number(state.currentTurnOrderIndex) || 0);
  const targetOrderSlot = state.order.indexOf(playerIndex);
  if (targetOrderSlot === -1) return Number.POSITIVE_INFINITY;
  return (targetOrderSlot - currentOrderSlot + state.order.length) % state.order.length;
}

function getComputerVisibleEnemyPressureNearPoint(player, point, radius = 2) {
  if (!player || !point) return 0;
  let pressure = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (distance > radius) return;
    pressure += distance === 0 ? 3.4 : distance === 1 ? 2.4 : 1.1;
    if (playerHasFlag(other)) pressure += isFlagCarrierMapActive() ? 8 : 2.6;
  });
  return pressure;
}

function getComputerGallusAllyValue(gallus, ally) {
  if (!gallus || !ally || !ally.position || !arePlayersAllied(gallus, ally)) return 0;
  const allyIndex = state.players.indexOf(ally);
  const turnsUntil = getComputerTurnsUntilPlayerIndex(allyIndex);
  const soonBonus = Number.isFinite(turnsUntil) ? Math.max(0, 4 - turnsUntil) * 0.95 : 0;
  const pressure = getComputerVisibleEnemyPressureNearPoint(ally, ally.position, 2);
  let value = 2.4 + soonBonus + Math.min(4.5, pressure * 0.75);
  if (playerHasFlag(ally)) value += isFlagCarrierMapActive() ? 14 : 5.5;
  if (isRoyalMarchKing(ally)) value += 8.5;
  if (ally.activeCharacterId && String(ally.activeCharacterId).startsWith("battler")) value += 1.8;
  if (isFlagCarrierMapActive()) value += Math.max(0, getFlagCarrierFrontlineValue(ally, ally.position)) * 0.22;
  if ((Number(ally.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(ally, "hp")) <= 0.4 && pressure > 0) value += 1.2;
  return value;
}

function getComputerGallusSupportPositionValue(gallus, point) {
  if (!gallus || gallus.activeCharacterId !== "supporter1" || !point || !isTeamModeEnabled()) return 0;
  let value = 0;
  let directSupportCount = 0;
  state.players.forEach((ally) => {
    if (!ally || ally === gallus || !ally.position || !arePlayersAllied(gallus, ally)) return;
    const rowDistance = Math.abs(ally.position.row - point.row);
    const colDistance = Math.abs(ally.position.col - point.col);
    const chebyshev = Math.max(rowDistance, colDistance);
    const allyValue = getComputerGallusAllyValue(gallus, ally);
    if (chebyshev <= 1) {
      directSupportCount += 1;
      value += allyValue;
    } else if (chebyshev === 2) {
      value += allyValue * 0.28;
    }
  });
  value += getComputerTeamSupportValue(gallus, point) * 1.35;
  value += getComputerVisibleFlagCarrierPressureValue(gallus, point) * 0.35;
  if (isFlagCarrierMapActive()) value += Math.max(0, getFlagCarrierFrontlineValue(gallus, point)) * 0.28;
  if (directSupportCount === 0) value -= 1.2;
  return value;
}

function getGallusPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "supporter1" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint) return 0;
  let bonus = getComputerGallusSupportPositionValue(player, endpoint);
  if (endCell) {
    if (endCell.owner === state.currentPlayerIndex) bonus += 0.45;
    else if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, state.currentPlayerIndex)) bonus -= 0.55;
  }
  return bonus;
}

function getPipEligibleTargets(player) {
  if (!player || !player.position) return [];
  return state.players.filter((candidate) => candidate
    && candidate.position
    && (candidate === player || arePlayersAllied(player, candidate))
    && Math.max(Math.abs(candidate.position.row - player.position.row), Math.abs(candidate.position.col - player.position.col)) <= 2
    && ["attack", "hp", "technique"].some((statKey) => (Number(candidate.currentStats?.[statKey]) || 0) < getCurrentMax(candidate, statKey)));
}

function getPipMissingStatKeys(player) {
  if (!player) return [];
  return ["attack", "hp", "technique"].filter((statKey) => (Number(player.currentStats?.[statKey]) || 0) < getCurrentMax(player, statKey));
}

function getPipSupportPriority(pip, target) {
  if (!pip || !target || !target.position) return 0;
  const cell = getCell(target.position.row, target.position.col);
  const pressure = getComputerLocalPressure(target, target.position);
  const danger = getComputerEnemyTileDanger(target, target.position, cell);
  const enemyAdjacency = getVisibleEnemyAdjacencyCount(target, target.position);
  let value = 1.4 + Math.min(5.2, pressure * 0.48) + Math.min(4.2, danger * 0.38) + enemyAdjacency * 1.55;
  if (playerHasFlag(target)) value += isFlagCarrierMapActive() ? 18 : 6.5;
  if (isRoyalMarchKing(target)) value += 14;
  if (cell?.territoryIds?.length) value += isCaptureTerritoryMapActive() ? 5.2 : 1.4;
  if (cell && isCellInControlArea(cell)) value += 4.8;
  if (target.activeCharacterId && String(target.activeCharacterId).startsWith("battler")) value += 3.2;
  if (["battler1", "battler2", "battler3", "battler5"].includes(target.activeCharacterId)) value += 1.8;
  if (target.activeCharacterId === "tanker3") value += 3.4;
  if (target.activeCharacterId === "supporter2") value += target === pip ? 1.2 : 0.6;
  if (isFlagCarrierMapActive() && target === pip && playerHasFlag(target)) value -= 8.5;
  if (target === pip) value -= Math.max(0, danger - 2.4) * 0.35;
  if (getSelectedMapDefinition()?.id === "bigBridge" && enemyAdjacency > 0) value += 2.4;
  return value;
}

function getPipLikelyBattleStat(target) {
  if (!target?.position) return null;
  const enemies = state.players.filter((other) => other
    && other.position
    && !arePlayersAllied(target, other)
    && isComputerAwareOfPlayerPosition(target, other)
    && Math.abs(other.position.row - target.position.row) + Math.abs(other.position.col - target.position.col) <= 2);
  const plans = enemies
    .map((enemy) => getBestComputerBattlePlan(target, enemy))
    .filter(Boolean)
    .sort(compareBattleEstimates);
  return plans[0]?.ownChoice || null;
}

function getPipHealStatValue(pip, target, statKey) {
  if (!target || !["attack", "hp", "technique"].includes(statKey)) return -Infinity;
  const missing = Math.max(0, getCurrentMax(target, statKey) - (Number(target.currentStats?.[statKey]) || 0));
  if (missing <= 0) return -Infinity;
  const current = Math.max(0, Number(target.currentStats?.[statKey]) || 0);
  const max = Math.max(1, getCurrentMax(target, statKey));
  const ratio = current / max;
  const cell = target.position ? getCell(target.position.row, target.position.col) : null;
  const danger = target.position ? getComputerEnemyTileDanger(target, target.position, cell) : 0;
  const pressure = target.position ? getComputerLocalPressure(target, target.position) : 0;
  const enemyAdjacency = target.position ? getVisibleEnemyAdjacencyCount(target, target.position) : 0;
  const likelyBattleStat = getPipLikelyBattleStat(target);
  let value = Math.min(12, missing * (statKey === "hp" ? 0.34 : 0.3));
  value += (1 - ratio) * (statKey === "hp" ? 5.6 : 3.4);
  if (statKey === "hp") {
    value += Math.min(6.5, danger * 0.65 + pressure * 0.45 + enemyAdjacency * 1.2);
    if (ratio <= 0.36) value += 5.2;
    if (target.activeCharacterId === "tanker3") value += 5.6;
    if (target.activeCharacterId === "battler5") value += 2.6;
    if (isRoyalMarchKing(target) || playerHasFlag(target)) value += 2.5;
  }
  if (statKey === "attack") {
    if (likelyBattleStat === "attack") value += 5.2;
    if (target.activeCharacterId === "battler2") value += 6.4;
    if (target.activeCharacterId === "battler1") value += 3.4;
    if (target.activeCharacterId === "battler5") value += 2.2;
    if (enemyAdjacency > 0) value += 1.8;
  }
  if (statKey === "technique") {
    if (likelyBattleStat === "technique") value += 4.8;
    if (["supporter2", "trickster1", "trickster3", "painter4", "tanker2", "battler3", "battler4"].includes(target.activeCharacterId)) value += 3.6;
    if (target.activeCharacterId === "supporter2" && (Number(target.cooldowns?.supporter2FreshBatch) || 0) <= 1) value += 3.4;
    if (target.activeCharacterId === "tanker3") value += 1.4;
  }
  return value;
}

function getPipBestHealStat(player, pip = null) {
  if (!player) return null;
  const missingStats = getPipMissingStatKeys(player);
  if (!missingStats.length) return null;
  return missingStats
    .map((statKey) => ({
      statKey,
      value: pip ? getPipHealStatValue(pip, player, statKey) : Math.max(0, getCurrentMax(player, statKey) - (Number(player.currentStats?.[statKey]) || 0))
    }))
    .sort((left, right) => right.value - left.value)[0]?.statKey || missingStats[0] || null;
}

function getPipFreshBatchTargetValue(pip, target) {
  if (!pip || !target || !target.position) return -Infinity;
  const healStat = getPipBestHealStat(target, pip);
  if (!healStat) return -Infinity;
  const healValue = getPipHealStatValue(pip, target, healStat);
  const bestMissing = Math.max(0, getCurrentMax(target, healStat) - (Number(target.currentStats?.[healStat]) || 0));
  const totalMissing = ["attack", "hp", "technique"].reduce((sum, statKey) => {
    return sum + Math.max(0, getCurrentMax(target, statKey) - (Number(target.currentStats?.[statKey]) || 0));
  }, 0);
  const danger = getComputerEnemyTileDanger(target, target.position, getCell(target.position.row, target.position.col));
  const pressure = getComputerLocalPressure(target, target.position);
  const enemyAdjacency = getVisibleEnemyAdjacencyCount(target, target.position);
  const supportPriority = getPipSupportPriority(pip, target);
  let score = healValue + Math.min(8, bestMissing * 0.16) + Math.min(8, totalMissing * 0.08);
  score += supportPriority * 0.72 + danger * 0.28 + pressure * 0.2 + enemyAdjacency * 0.8;
  if (target === pip) score += (danger >= 3.8 || (Number(target.currentStats?.hp) || 0) <= 34) ? 2.6 : -1.6;
  if (isFlagCarrierMapActive() && target === pip && playerHasFlag(target)) score -= 7;
  return score;
}

function isPipFreshBatchBlastEnemy(pip, target, other) {
  if (!pip || !target || !other) return false;
  if (other === pip || other.id === pip.id) return false;
  if (other === target || other.id === target.id) return false;
  if (arePlayersAllied(pip, other)) return false;
  return true;
}

function getPipFreshBatchBlastTargets(target, pip = null) {
  if (!target?.position) return [];
  return state.players.filter((other) => other
    && other.position
    && (pip ? isPipFreshBatchBlastEnemy(pip, target, other) : !arePlayersAllied(target, other))
    && Math.abs(other.position.row - target.position.row) + Math.abs(other.position.col - target.position.col) === 1);
}

function getPipFreshBatchBlastValue(pip, target, blastTargets) {
  if (!pip || !target || !Array.isArray(blastTargets) || !blastTargets.length) return 0;
  const attackCurrent = Number(pip.currentStats?.attack) || 0;
  if (attackCurrent < 15) return 0;
  let value = blastTargets.length === 1 ? 3.2 : 9.5 + (blastTargets.length - 2) * 4.2;
  blastTargets.forEach((enemy) => {
    value += Math.min(6, getComputerPriorityTargetValue(pip, enemy) * 0.55);
    if (playerHasFlag(enemy)) value += isFlagCarrierMapActive() ? 8 : 2.2;
    if (isRoyalMarchKing(enemy)) value += 6;
    if ((Number(enemy.currentStats?.hp) || 0) <= 15) value += 5.5;
  });
  if (playerHasFlag(target) || isRoyalMarchKing(target)) value += 3.2;
  if (getSelectedMapDefinition()?.id === "bigBridge") value += blastTargets.length * 2.4;
  if (target.position) {
    const cell = getCell(target.position.row, target.position.col);
    if (cell?.territoryIds?.length) value += 1.8;
    if (cell && isCellInControlArea(cell)) value += 1.8;
  }
  if (attackCurrent < 30) value -= 5.5;
  else if (attackCurrent < 45) value -= 2.2;
  return value;
}

function getPipFreshBatchTimingValue(pip, action) {
  if (!pip || !action?.target || !action.statKey) return -Infinity;
  const target = action.target;
  const missing = Math.max(0, getCurrentMax(target, action.statKey) - (Number(target.currentStats?.[action.statKey]) || 0));
  const totalMissing = ["attack", "hp", "technique"].reduce((sum, statKey) => {
    return sum + Math.max(0, getCurrentMax(target, statKey) - (Number(target.currentStats?.[statKey]) || 0));
  }, 0);
  const cell = target.position ? getCell(target.position.row, target.position.col) : null;
  const danger = target.position ? getComputerEnemyTileDanger(target, target.position, cell) : 0;
  const pressure = target.position ? getComputerLocalPressure(target, target.position) : 0;
  const enemyAdjacency = target.position ? getVisibleEnemyAdjacencyCount(target, target.position) : 0;
  const turnsUntilTarget = getComputerTurnsUntilPlayerIndex(state.players.indexOf(target));
  let timing = Math.min(9, missing * 0.18) + Math.min(7, totalMissing * 0.055);
  timing += getPipSupportPriority(pip, target) * 0.38;
  timing += Math.min(7, danger * 0.48 + pressure * 0.34 + enemyAdjacency * 1.25);
  if (Number.isFinite(turnsUntilTarget) && turnsUntilTarget <= 1) timing += 2.8;
  if (playerHasFlag(target)) timing += isFlagCarrierMapActive() ? 7 : 2.5;
  if (isRoyalMarchKing(target)) timing += 5.2;
  if (action.useBlast) timing += getPipFreshBatchBlastValue(pip, target, getPipFreshBatchBlastTargets(target, pip)) * 0.5;
  if (totalMissing < 18 && !action.useBlast && !playerHasFlag(target) && !isRoyalMarchKing(target)) timing -= 7.4;
  if (missing < 12 && !action.useBlast) timing -= 3.4;
  if ((Number(pip.currentStats?.technique) || 0) < 35 && totalMissing < 28 && !action.useBlast) timing -= 2.5;
  const pipDanger = pip.position ? getComputerEnemyTileDanger(pip, pip.position, getCell(pip.position.row, pip.position.col)) : 0;
  const pipHpRatio = (Number(pip.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(pip, "hp"));
  if (pipDanger >= 5.5 && pipHpRatio <= 0.46 && target !== pip) timing -= 4.2;
  return timing;
}

function chooseComputerPipFreshBatchAction(player) {
  if (!player || player.activeCharacterId !== "supporter2") return null;
  if ((Number(player.cooldowns?.supporter2FreshBatch) || 0) > 0) return null;
  if ((Number(player.currentStats?.technique) || 0) < 15) return null;
  const scored = getPipEligibleTargets(player)
    .map((target) => {
      const statKey = getPipBestHealStat(target, player);
      const blastTargets = getPipFreshBatchBlastTargets(target, player);
      const blastValue = getPipFreshBatchBlastValue(player, target, blastTargets);
      const canSpendAttack = (Number(player.currentStats?.attack) || 0) >= 15;
      const useBlast = canSpendAttack && blastTargets.length > 0 && blastValue >= (blastTargets.length >= 2 ? 7.5 : 5.8);
      const action = {
        target,
        statKey,
        useBlast,
        score: getPipFreshBatchTargetValue(player, target) + Math.max(0, blastValue) * 0.55
      };
      action.timing = getPipFreshBatchTimingValue(player, action);
      return action;
    })
    .filter((entry) => entry.statKey)
    .sort((left, right) => right.timing - left.timing || right.score - left.score);
  const best = scored[0] || null;
  if (!best || best.timing < 8.6 || best.score < 7.2) return null;
  return { target: best.target, statKey: best.statKey, useBlast: best.useBlast, score: best.score, timing: best.timing };
}

function getPipSupportPositionValue(pip, point) {
  if (!pip || pip.activeCharacterId !== "supporter2" || !point) return 0;
  const cell = getCell(point.row, point.col);
  if (!cell) return 0;
  const pipDanger = getComputerEnemyTileDanger(pip, point, cell);
  let value = -pipDanger * 0.9;
  let coveredImportantAllies = 0;
  let tooCloseThreats = 0;
  state.players.forEach((ally) => {
    if (!ally || ally === pip || !ally.position || !arePlayersAllied(pip, ally)) return;
    const chebyshev = Math.max(Math.abs(ally.position.row - point.row), Math.abs(ally.position.col - point.col));
    const priority = getPipSupportPriority(pip, ally);
    if (chebyshev <= 2) {
      coveredImportantAllies += priority >= 5 ? 1 : 0;
      value += priority * (chebyshev === 2 ? 0.86 : chebyshev === 1 ? 0.62 : 0.38);
    } else if (chebyshev === 3) {
      value += priority * 0.18;
    }
  });
  state.players.forEach((enemy) => {
    if (!enemy || !enemy.position || arePlayersAllied(pip, enemy) || !isComputerAwareOfPlayerPosition(pip, enemy)) return;
    const distance = Math.abs(enemy.position.row - point.row) + Math.abs(enemy.position.col - point.col);
    if (distance <= 1) tooCloseThreats += 1;
    if (distance === 2) value -= 1.2;
  });
  if (coveredImportantAllies === 0) value -= 2.2;
  if (getSelectedMapDefinition()?.id === "bigBridge" && coveredImportantAllies > 0) value += 1.8;
  value -= tooCloseThreats * 3.8;
  if (playerHasFlag(pip)) value -= isFlagCarrierMapActive() ? 10 : 2.4;
  if (cell.owner !== null && isFriendlyOwner(cell.owner, state.players.indexOf(pip))) value += 0.7;
  return value;
}

function getPipPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "supporter2" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint) return 0;
  let bonus = getPipSupportPositionValue(player, endpoint);
  if (endCell) {
    if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, state.currentPlayerIndex)) bonus -= 1.4;
    bonus += getComputerHealTileValue(player, endCell) * 0.18;
  }
  return bonus;
}

function getRascaTailInfluenceCells(point) {
  if (!point) return [];
  return [
    { row: point.row, col: point.col },
    { row: point.row - 1, col: point.col },
    { row: point.row + 1, col: point.col },
    { row: point.row, col: point.col - 1 },
    { row: point.row, col: point.col + 1 }
  ].filter((entry) => !!getCell(entry.row, entry.col));
}

function isBigBridgeAnchorPoint(point) {
  if (getSelectedMapDefinition()?.id !== "bigBridge" || !point) return false;
  return (point.row === 2 || point.row === 3) && [3, 4, 6, 8, 9].includes(point.col);
}

function getComputerRascaTailPlacementValue(player, point, options = {}) {
  if (!player || player.activeCharacterId !== "trickster2" || !point) return -Infinity;
  const playerIndex = state.players.indexOf(player);
  const cell = getCell(point.row, point.col);
  if (playerIndex < 0 || !cell || cell.obstacle || (!options.ignoreExistingTail && hasAnyRascaCloneOnCell(point.row, point.col))) return -Infinity;
  const snapshot = getComputerScoreSnapshot(player);
  let value = 1.4;
  let adjacentImportantPoint = false;

  getRascaTailInfluenceCells(point).forEach((candidate) => {
    const targetCell = getCell(candidate.row, candidate.col);
    if (!targetCell || targetCell.obstacle) return;
    if (targetCell.owner === null) value += snapshot.endgame ? 1.3 : 2.2;
    else if (!isFriendlyOwner(targetCell.owner, playerIndex)) value += snapshot.endgame ? 2.4 : 2.0;
    value += getCaptureTerritoryPaintTargetBonus(player, targetCell) * 0.18;
    value += getControlAreaTacticalBonus(player, targetCell) * 0.28;
    if (targetCell.groundItem?.id === "forceShard") value += getPowerShardPickupValue(player, targetCell) * 0.32;
    if (targetCell.groundItem?.id === "flag" || targetCell.special.includes("flag")) {
      value += isFlagCarrierMapActive() ? 190 : Math.max(12, FLAG_POINTS * 1.15);
      adjacentImportantPoint = true;
    }
    if (targetCell.special.some((type) => String(type).startsWith("heal-"))) {
      value += 5.2;
      adjacentImportantPoint = true;
    }
    if (doesCurrentMapUseControlAreaWin() && isCellInControlArea(targetCell)) adjacentImportantPoint = true;
    if (isCaptureTerritoryMapActive() && Array.isArray(targetCell.territoryIds) && targetCell.territoryIds.length) adjacentImportantPoint = true;
    value += getFlagAccessScoreAtPoint(candidate.row, candidate.col) * (isFlagCarrierMapActive() ? 1.15 : 0.38);
  });

  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (distance === 0) value += playerHasFlag(other) ? 170 : -8;
    else if (distance === 1) value += playerHasFlag(other) ? 120 : 18;
    else if (distance === 2) value += playerHasFlag(other) ? 48 : 7.5;
  });

  if (isFlagCarrierMapActive()) {
    value += Math.max(0, getFlagCarrierFrontlineValue(player, point)) * 0.72;
    if (playerHasFlag(player)) {
      const homeDistance = getDistanceToNearestAlliedStart(player, point);
      if (Number.isFinite(homeDistance)) value += Math.max(0, 34 - homeDistance * 5.8);
    }
  }
  if (doesCurrentMapUseControlAreaWin() && isCellInControlArea(cell)) value += 42;
  if (isCaptureTerritoryMapActive() && Array.isArray(cell.territoryIds) && cell.territoryIds.length) {
    value += getCaptureTerritoryPathBonus(player, cell) * 0.5;
  }
  if (isRoyalMarchMapActive() && isRoyalMarchKing(player) && isRoyalMarchEnemyBackRankTile(playerIndex, point.row, point.col)) value += 80;
  if (isBigBridgeAnchorPoint(point)) value += 34;
  if (adjacentImportantPoint) value += 9.5;
  value -= Math.min(18, getComputerEnemyTileDanger(player, point, cell) * 0.35);
  if (options.enhanced) {
    const techniqueRatio = (Number(player.currentStats?.technique) || 0) / Math.max(1, getCurrentMax(player, "technique"));
    value += techniqueRatio >= 0.45 ? 5.8 : 2.1;
  }
  return value;
}

function getComputerRascaBestAnchor(player) {
  const clones = getRascaClonesForPlayer(player);
  if (!clones.length) return null;
  return clones
    .map((clone) => ({
      clone,
      value: getComputerRascaTailPlacementValue(player, { row: clone.row, col: clone.col }, { ignoreExistingTail: true }),
      hpRatio: (Number(clone.hp) || 0) / Math.max(1, Number(clone.maxHp) || 1)
    }))
    .sort((a, b) => b.value - a.value)[0] || null;
}

function shouldComputerRascaAllowSecondTail(player, placementValue) {
  const clones = getRascaClonesForPlayer(player);
  if (clones.length !== 1) return false;
  if (isRoyalMarchMapActive()) return false;
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  if (hpRatio < 0.62) return false;
  const anchor = getComputerRascaBestAnchor(player);
  if (!anchor || anchor.hpRatio < 0.55 || anchor.value < 14) return false;
  const snapshot = getComputerScoreSnapshot(player);
  if (isFlagCarrierMapActive()) return placementValue >= 82 && !playerHasFlag(player);
  if (doesCurrentMapUseControlAreaWin()) return placementValue >= 58;
  if (isCaptureTerritoryMapActive()) return placementValue >= 62 || (snapshot.endgame && snapshot.trailing && placementValue >= 42);
  if (getSelectedMapDefinition()?.id === "bigBridge") return placementValue >= 54;
  return snapshot.endgame && (snapshot.trailing || snapshot.scoreLeadOverSecond >= 12) && placementValue >= 48;
}

function getRascaPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "trickster2" || !Array.isArray(path) || !path.length || !endCell) return 0;
  const endpoint = path[path.length - 1];
  let bonus = getComputerRascaTailPlacementValue(player, endpoint) * 0.16;
  const clones = getRascaClonesForPlayer(player);
  if (clones.length < 3 && !hasAnyRascaCloneOnCell(endpoint.row, endpoint.col)) {
    bonus += getComputerRascaTailPlacementValue(player, endpoint) * (state.currentAction === "paint" ? 0.13 : 0.08);
  }
  if (clones.length) {
    const nearestTailDistance = clones.reduce((best, clone) => Math.min(best, Math.abs(clone.row - endpoint.row) + Math.abs(clone.col - endpoint.col)), Infinity);
    if (Number.isFinite(nearestTailDistance)) {
      if (nearestTailDistance === 0) bonus -= 1.4;
      else if (nearestTailDistance <= 3) bonus += 2.4 - nearestTailDistance * 0.25;
      else bonus -= Math.min(3.2, (nearestTailDistance - 3) * 0.55);
    }
  }
  if (isFlagCarrierMapActive()) bonus += getFlagCarrierPathPriorityBonus(player, endpoint, endCell) * 0.04;
  return bonus;
}

function getCorvenPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "battler4" || !Array.isArray(path) || !path.length || !endCell) return 0;
  const endpoint = path[path.length - 1];
  if (!endpoint) return 0;
  const playerIndex = state.currentPlayerIndex;
  const omen = getCorvenOmenGauge(player);
  const autoHealTurns = Math.max(0, Number(player.statuses?.corvenAutoHealTurns) || 0);
  const hpRatio = Math.max(0, Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  const localPressure = getComputerLocalPressure(player, endpoint);
  const danger = getComputerEnemyTileDanger(player, endpoint, endCell);
  const homeDistance = getDistanceToNearestAlliedStart(player, endpoint);
  const priorityPressure = getComputerCorvenPriorityNearPoint(player, endpoint);
  const flagPressure = getComputerVisibleFlagCarrierPressureValue(player, endpoint);
  const routePressure = priorityPressure + flagPressure * (isFlagCarrierMapActive() ? 0.08 : 0.16);
  let bonus = 0;

  if (playerHasFlag(player)) {
    if (Number.isFinite(homeDistance)) bonus += Math.max(0, 8 - homeDistance * 1.6);
    bonus -= danger * 0.42;
    return bonus;
  }

  if (endCell.owner !== null && !isFriendlyOwner(endCell.owner, playerIndex)) bonus += 0.9;
  if (endCell.owner === null) bonus += 0.5;
  if (doesCurrentMapUseControlAreaWin() && isCellInControlArea(endCell)) bonus += omen >= 75 ? 4.8 : 2.2;
  if (isCaptureTerritoryMapActive()) bonus += getCaptureTerritoryPathBonus(player, endCell) * (omen >= 75 ? 0.28 : 0.14);
  if (isFlagCarrierMapActive()) bonus += getFlagCarrierPathPriorityBonus(player, endpoint, endCell) * (omen >= 100 ? 0.24 : omen >= 50 ? 0.14 : 0.07);
  bonus += routePressure * (omen >= 100 ? 1.35 : omen >= 75 ? 1.1 : omen >= 50 ? 0.82 : omen >= 25 ? 0.44 : 0.12);

  if (omen < 25) {
    bonus -= danger * (hpRatio <= 0.46 ? 0.34 : 0.18);
    if (routePressure <= 2.5) bonus -= localPressure * 0.16;
    return bonus;
  }

  if (omen < 50) {
    bonus += Math.min(2.8, localPressure * 0.18);
    if (routePressure >= 3.5) bonus += 1.6;
    bonus -= Number.isFinite(homeDistance) && homeDistance === 0 ? 2.4 : 0;
    return bonus;
  }

  if (omen < 75) {
    bonus += Math.min(4.2, localPressure * 0.32);
    if (routePressure >= 5) bonus += 2.8;
    if (danger <= 7.5) bonus += 1.2;
    bonus -= Number.isFinite(homeDistance) && homeDistance === 0 ? 3.2 : 0;
    return bonus;
  }

  if (omen < 100) {
    bonus += Math.min(6.2, localPressure * 0.48);
    bonus += routePressure >= 6 ? 3.4 : 0;
    if (autoHealTurns > 0 && hpRatio >= 0.4) bonus += Math.min(2.4, danger * 0.24);
    if (Number.isFinite(homeDistance) && homeDistance === 0) bonus -= 4.8;
    return bonus;
  }

  bonus += routePressure >= 7 ? 5.5 : -4.8;
  if (routePressure >= 9) bonus += 4.5;
  if (priorityPressure >= 6) bonus += 2.8;
  if (Number.isFinite(homeDistance) && homeDistance === 0) bonus -= 6.2;
  if (danger >= 9 && routePressure < 7) bonus -= 3.6;
  return bonus;
}

function getMoppetEmergencyCalloutValue(player) {
  if (!player || player.activeCharacterId !== "battler5" || !!state.moveDie) return -Infinity;
  if ((Number(player.cooldowns?.battler5EmergencyCallout) || 0) > 0) return -Infinity;
  if ((Number(player.currentStats?.technique) || 0) < 15 || playerHasFlag(player) || playerHasFoodCourtFood(player)) return -Infinity;
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  const currentCell = player.position ? getCell(player.position.row, player.position.col) : null;
  const localDanger = getComputerEnemyTileDanger(player, player.position, currentCell);
  if (hpRatio <= 0.34 || localDanger >= 12.5) return -Infinity;
  const enemyFlagActive = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
  const unclaimedFlagPresent = getPlayableBoardCells().some((cell) => cell?.groundItem?.id === "flag");
  const enemyStartPressure = state.players.reduce((best, other) => {
    if (!other || arePlayersAllied(player, other) || !other.startPosition || !player.position) return best;
    const distance = Math.max(Math.abs(player.position.row - other.startPosition.row), Math.abs(player.position.col - other.startPosition.col));
    if (distance > 5) return best;
    return Math.max(best, 12 - distance * 2);
  }, 0);
  const flagPressure = getComputerVisibleFlagCarrierPressureValue(player, player.position);
  const frontlinePressure = getFlagCarrierFrontlineValue(player, player.position);
  const priorityPressure = getComputerFuturePositionValue(player, player.position);
  let totalGain = 0;
  let positiveCases = 0;
  let maxStepGain = 0;
  let maxScoreGain = Number.NEGATIVE_INFINITY;
  let averageEndpointDanger = 0;
  let enemyOwnedEndpoints = 0;
  let forcedReturnRiskCases = 0;
  let evaluatedCases = 0;
  for (let moveDie = 1; moveDie <= 4; moveDie += 1) {
    for (let paintDie = 1; paintDie <= 4; paintDie += 1) {
      const normal = simulateMoppetRouteValue(player, moveDie, paintDie, false);
      const emergency = simulateMoppetRouteValue(player, moveDie, paintDie, true);
      const scoreGain = emergency.score - normal.score;
      const stepGain = emergency.steps - normal.steps;
      const endpoint = emergency.path?.[emergency.path.length - 1] || player.position;
      const endCell = endpoint ? getCell(endpoint.row, endpoint.col) : null;
      const endpointRepaintable = canMoppetEmergencyCalloutRepaintCell(player, endCell);
      const repaintCount = endpointRepaintable ? 1 : 0;
      const endpointDanger = endpoint && endCell ? getComputerEnemyTileDanger(player, endpoint, endCell) : 0;
      const enemyOwnedEndpoint = !!(endCell && endCell.owner !== null && !isFriendlyOwner(endCell.owner, state.players.indexOf(player)));
      const enemyTilePenalty = enemyOwnedEndpoint && !endpointRepaintable ? getCurrentEnemyTileEndDamage() * 2 : 0;
      const projectedHpAfterPenalty = Math.max(0, (Number(player.currentStats?.hp) || 0) - enemyTilePenalty);
      totalGain += repaintCount * 1.8;
      if (scoreGain > 0.75 || stepGain > 0) positiveCases += 1;
      totalGain += scoreGain;
      maxStepGain = Math.max(maxStepGain, stepGain);
      maxScoreGain = Math.max(maxScoreGain, scoreGain);
      averageEndpointDanger += endpointDanger;
      if (enemyOwnedEndpoint) enemyOwnedEndpoints += 1;
      if (enemyOwnedEndpoint && projectedHpAfterPenalty <= 0) forcedReturnRiskCases += 1;
      evaluatedCases += 1;
    }
  }
  const averageGain = totalGain / 16;
  averageEndpointDanger /= Math.max(1, evaluatedCases);
  if (maxStepGain <= 0) return -Infinity;
  if (positiveCases < 4 && maxScoreGain < 10) return -Infinity;
  let value = enemyStartPressure + flagPressure * 0.65 + frontlinePressure * 0.45 + priorityPressure * 0.18;
  value += averageGain * 0.9 + maxStepGain * 4.4 + positiveCases * 0.9;
  if (enemyFlagActive) value += 18;
  else if (unclaimedFlagPresent && isFlagCarrierMapActive()) value += 10;
  value -= Math.max(0, localDanger - 5.5) * 2.2;
  value -= Math.max(0, 0.55 - hpRatio) * 34;
  value -= averageEndpointDanger * 1.35;
  value -= enemyOwnedEndpoints * 3.8;
  value -= forcedReturnRiskCases * 24;
  if (forcedReturnRiskCases >= 4) return -Infinity;
  return value;
}

function chooseComputerRascaShedEnhancement(player, placementValue = null) {
  if (!player || player.activeCharacterId !== "trickster2") return false;
  const techniqueCurrent = Number(player.currentStats?.technique) || 0;
  if (techniqueCurrent < 10) return false;
  const techniqueRatio = techniqueCurrent / Math.max(1, getCurrentMax(player, "technique"));
  const value = Number.isFinite(placementValue) ? placementValue : getComputerRascaTailPlacementValue(player, player.position, { enhanced: true });
  const nearbyEnemy = state.players.some((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && player.position
    && Math.abs(other.position.row - player.position.row) + Math.abs(other.position.col - player.position.col) <= 2);
  const anchorMap = isFlagCarrierMapActive() || doesCurrentMapUseControlAreaWin() || getSelectedMapDefinition()?.id === "bigBridge";
  if (isRoyalMarchMapActive() && !nearbyEnemy) return false;
  if (isFlagCarrierMapActive() && nearbyEnemy && value >= 34 && techniqueRatio >= 0.34) return true;
  if (anchorMap && value >= 44 && techniqueRatio >= 0.36) return true;
  if (nearbyEnemy && value >= 26 && techniqueRatio >= 0.44) return true;
  return false;
}

function chooseComputerRascaSnapbackPlan(player) {
  if (!player || player.activeCharacterId !== "trickster2" || !player.position) return null;
  if ((Number(player.cooldowns?.rascaSnapback) || 0) > 0) return null;
  const clones = getRascaClonesForPlayer(player);
  if (!clones.length) return null;
  const currentCell = getCell(player.position.row, player.position.col);
  const currentValue = scoreComputerPath(player, [{ ...player.position }]);
  const currentDanger = getComputerEnemyTileDanger(player, player.position, currentCell);
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));

  const plans = clones.map((clone) => {
    const tailPoint = { row: clone.row, col: clone.col };
    const tailCell = getCell(clone.row, clone.col);
    let moveValue = scoreComputerPath(player, [tailPoint])
      + getComputerRascaTailPlacementValue(player, tailPoint, { ignoreExistingTail: true }) * 0.18
      - getComputerEnemyTileDanger(player, tailPoint, tailCell) * 0.4
      - currentValue;
    if (isFlagCarrierMapActive()) {
      if (playerHasFlag(player)) moveValue -= 6000;
      else {
        if (tailCell?.groundItem?.id === "flag" || tailCell?.special.includes("flag")) moveValue += 4200;
        moveValue += getFlagAccessScoreAtPoint(clone.row, clone.col) * 16;
      }
    }
    if (doesCurrentMapUseFlagDeliveryWin() && playerHasFlag(player)) moveValue -= 240;
    if (doesCurrentMapUseControlAreaWin() && tailCell && isCellInControlArea(tailCell)) moveValue += 86;
    if (isCaptureTerritoryMapActive() && tailCell) moveValue += getCaptureTerritoryPathBonus(player, tailCell) * 0.72;
    if (hpRatio <= 0.35 && currentDanger >= 6) moveValue += Math.max(0, currentDanger * 1.4);
    const anchorValue = getComputerRascaTailPlacementValue(player, tailPoint, { ignoreExistingTail: true });
    const lowHpTail = (Number(clone.hp) || 0) <= Math.max(4, Math.ceil((Number(clone.maxHp) || 1) * 0.3));
    const recallValue = lowHpTail && anchorValue < 22 ? 8.2 : -4.5;
    const emergencyEscape = hpRatio <= 0.35 && currentDanger >= 6 && getComputerEnemyTileDanger(player, tailPoint, tailCell) + 2 < currentDanger;
    const intervention = isFlagCarrierMapActive() && !playerHasFlag(player) && moveValue >= 14;
    return { clone, moveToClone: emergencyEscape || intervention || moveValue >= 18, score: Math.max(moveValue, recallValue), moveValue, recallValue };
  }).sort((a, b) => b.score - a.score);

  const best = plans[0];
  if (!best) return null;
  if (best.moveToClone && best.moveValue >= (isFlagCarrierMapActive() ? 14 : 18)) return best;
  if (!best.moveToClone && best.recallValue >= 7.5) return { ...best, moveToClone: false };
  return null;
}

function chooseComputerRascaSkillAction(player) {
  if (!player || player.activeCharacterId !== "trickster2" || !canUseSkill()) return null;
  const snapbackPlan = chooseComputerRascaSnapbackPlan(player);
  const ownerIndex = state.players.indexOf(player);
  const clones = getRascaClonesForPlayer(ownerIndex);
  const baseCanShed = ownerIndex >= 0
    && player.position
    && (Number(player.cooldowns?.rascaShedRelay) || 0) <= 0
    && !hasAnyRascaCloneOnCell(player.position.row, player.position.col);
  const placementValue = baseCanShed ? getComputerRascaTailPlacementValue(player, player.position) : -Infinity;
  const canShed = baseCanShed
    && (clones.length === 0 || shouldComputerRascaAllowSecondTail(player, placementValue));
  const shedThreshold = state.currentAction === "paint"
    ? (isFlagCarrierMapActive() ? 14 : 8.2)
    : (isFlagCarrierMapActive() ? 18 : 10.5);
  const shedPlan = canShed && placementValue >= shedThreshold
    ? { type: "shed", score: placementValue, enhanced: chooseComputerRascaShedEnhancement(player, placementValue) }
    : null;
  if (snapbackPlan && (!shedPlan || snapbackPlan.score > shedPlan.score + 3)) return { type: "snapback", ...snapbackPlan };
  return shedPlan;
}

function getComputerGallusPushAheadValue(player) {
  if (!player || player.activeCharacterId !== "supporter1") return -Infinity;
  if ((player.cooldowns?.supporter1PushAhead || 0) > 0) return -Infinity;
  if ((Number(player.statuses?.pushAheadRounds) || 0) > 0) return -Infinity;
  const attackCurrent = Number(player.currentStats?.attack) || 0;
  const techniqueCurrent = Number(player.currentStats?.technique) || 0;
  if (attackCurrent < 10 || techniqueCurrent < 10) return -Infinity;

  const snapshot = getComputerScoreSnapshot(player);
  const attackRatio = attackCurrent / Math.max(1, getCurrentMax(player, "attack"));
  const techniqueRatio = techniqueCurrent / Math.max(1, getCurrentMax(player, "technique"));
  let value = !state.moveDie ? 3.4 : 0.9;
  if (snapshot.trailing) value += 1.3;
  if (snapshot.endgame) value += 0.8;
  if (isRoyalMarchKing(player)) value += 1.6;
  if (isFlagCarrierMapActive()) value += 0.9;

  let nearbyAllyCount = 0;
  state.players.forEach((ally) => {
    if (!ally || ally === player || !ally.position || !player.position || !arePlayersAllied(player, ally)) return;
    if (!arePointsAdjacentOrSame(player.position, ally.position)) return;
    nearbyAllyCount += 1;
    const allyValue = getComputerGallusAllyValue(player, ally);
    const allyTurnsUntil = getComputerTurnsUntilPlayerIndex(state.players.indexOf(ally));
    const actsBeforeRoundEnd = Number.isFinite(allyTurnsUntil) && allyTurnsUntil > 0 && allyTurnsUntil <= Math.max(1, state.players.length - state.currentTurnOrderIndex);
    value += 2.2 + allyValue * (actsBeforeRoundEnd ? 0.52 : 0.32);
  });

  if (nearbyAllyCount >= 2) value += 1.6;
  const resourcePenalty = (attackRatio < 0.34 ? 2.2 : attackRatio < 0.48 ? 0.9 : 0)
    + (techniqueRatio < 0.34 ? 2.6 : techniqueRatio < 0.48 ? 1.1 : 0);
  value -= resourcePenalty;
  if (nearbyAllyCount === 0 && snapshot.leading && !snapshot.endgame) value -= 2.6;
  return value;
}

function getComputerMimiShardValue(player, amount) {
  if (!player || amount <= 0) return 0;
  const current = getForceShardCount(player);
  const existingShardIndex = findInventoryItemIndex(player, "forceShard");
  const canStack = existingShardIndex !== -1 && current < MAX_POWER_SHARDS;
  const hasFreeSlot = getInventorySlotCount(player) < MAX_ITEMS;
  if (!canStack && !hasFreeSlot) return 0.35 * amount;
  const addable = Math.max(0, Math.min(amount, MAX_POWER_SHARDS - current));
  const pressure = getComputerMimiStatNeed(player).pressure;
  return addable * (3.8 + Math.min(1.4, pressure * 0.18));
}

function getComputerMimiDiceBoostValue(player, amount) {
  if (!player || amount <= 0) return 0;
  const snapshot = getComputerScoreSnapshot(player);
  let value = amount * 3.4;
  if (!state.moveDie) value += amount * 2.8;
  if (state.currentAction === "paint") value += amount * 1.1;
  if (snapshot.trailing) value += amount * 1.2;
  if (snapshot.endgame) value += amount * 0.8;
  if (isRoyalMarchKing(player)) value += amount * 2.2;
  return value;
}

function getComputerMimiRouletteOutcomeValue(player, outcome) {
  const need = getComputerMimiStatNeed(player);
  const snapshot = getComputerScoreSnapshot(player);
  const amount = Math.max(0, Number(outcome?.amount) || 0);
  switch (outcome?.type) {
    case "restore": {
      const recoverable = ["attack", "hp", "technique"].reduce((sum, statKey) => {
        const maxValue = getCurrentMax(player, statKey);
        const current = Number(player.currentStats?.[statKey]) || 0;
        return sum + Math.min(amount, Math.max(0, maxValue - current));
      }, 0);
      let value = recoverable * 0.34;
      if (need.hpRatio <= 0.45) value += Math.min(amount, Math.max(0, getCurrentMax(player, "hp") - player.currentStats.hp)) * 0.42;
      value += need.pressure * 0.45;
      return value;
    }
    case "shard":
      return getComputerMimiShardValue(player, amount);
    case "diceBoost":
      return getComputerMimiDiceBoostValue(player, amount);
    case "shardDiceBoost":
      return getComputerMimiShardValue(player, Number(outcome.shardAmount) || 0)
        + getComputerMimiDiceBoostValue(player, Number(outcome.diceAmount) || 0);
    case "maxBonus": {
      const room = getComputerMimiCapRoom(player);
      if (room <= 0) return 0.5;
      return Math.min(room, amount * 3) * (snapshot.roundsRemaining >= 2 ? 0.32 : 0.18) + (snapshot.trailing ? 1.4 : 0);
    }
    case "maxAndRestore": {
      const maxValue = getComputerMimiRouletteOutcomeValue(player, { type: "maxBonus", amount });
      const restoreValue = getComputerMimiRouletteOutcomeValue(player, { type: "restore", amount });
      return maxValue + restoreValue + 1.1;
    }
    case "jackpotWin": {
      const shardValue = getComputerMimiShardValue(player, Number(outcome.shardAmount) || 0);
      const diceValue = getComputerMimiDiceBoostValue(player, Number(outcome.diceAmount) || 0);
      const maxValue = getComputerMimiRouletteOutcomeValue(player, { type: "maxBonus", amount });
      const restoreValue = getComputerMimiRouletteOutcomeValue(player, { type: "restore", amount });
      return shardValue + diceValue + maxValue + restoreValue + 2.4;
    }
    case "statLoss":
    case "statLossDiceOne": {
      const actualLoss = ["attack", "hp", "technique"].reduce((sum, statKey) => {
        const current = Number(player.currentStats?.[statKey]) || 0;
        return sum + Math.min(amount, current);
      }, 0);
      let penalty = actualLoss * 0.28 + need.pressure * 0.8;
      if ((Number(player.currentStats?.hp) || 0) <= amount + 5) penalty += 9.5;
      if (outcome.type === "statLossDiceOne") {
        penalty += !state.moveDie ? 6.5 : 2.4;
        if (snapshot.endgame || isRoyalMarchKing(player)) penalty += 1.8;
      }
      return -penalty;
    }
    default:
      return 0;
  }
}

function scoreComputerMimiRoulette(player, roulette) {
  if (!player || !roulette || !canSpinMimiRoulette(player, roulette)) return -Infinity;
  const cost = getMimiRouletteCost(player, roulette);
  const coins = getMimiCoinCount(player);
  const expected = roulette.outcomes.reduce((sum, outcome) => {
    return sum + (Number(outcome.weight) || 0) / 100 * getComputerMimiRouletteOutcomeValue(player, outcome);
  }, 0);
  const need = getComputerMimiStatNeed(player);
  const snapshot = getComputerScoreSnapshot(player);
  let score = expected - cost * 0.16;
  if (coins - cost <= 0 && need.critical) score += 1.2;
  if (coins - cost <= 0 && need.hpRatio >= 0.72 && snapshot.leading && !snapshot.endgame) score -= 1.4;
  if (roulette.id === "pocket" && coins < 5) score += 0.8;
  if (roulette.id === "jackpot" && (need.hpRatio <= 0.42 || !state.moveDie)) score -= 0.9;
  return score;
}

function chooseComputerMimiRoulette(player) {
  if (!player || player.activeCharacterId !== "trickster1") return null;
  const scored = MIMI_ROULETTES
    .filter((roulette) => canSpinMimiRoulette(player, roulette))
    .map((roulette) => ({ roulette, score: scoreComputerMimiRoulette(player, roulette) + Math.random() * 0.18 }))
    .sort((a, b) => b.score - a.score);
  return scored[0]?.roulette || null;
}

function shouldComputerActivateMimiOffRecord(player) {
  if (!player || player.activeCharacterId !== "trickster1" || !isMimiInStarMode(player)) return false;
  if ((Number(player.cooldowns?.mimiOffRecord) || 0) > 0) return false;
  const coins = getMimiCoinCount(player);
  if (coins < 5) return false;
  const need = getComputerMimiStatNeed(player);
  const snapshot = getComputerScoreSnapshot(player);
  const bestRoulette = chooseComputerMimiRoulette(player);
  const rouletteScore = bestRoulette ? scoreComputerMimiRoulette(player, bestRoulette) : -Infinity;
  let score = rouletteScore;
  score += Math.min(4.2, need.totalMissing * 0.075);
  score += need.pressure * 0.55 + need.battleUpside * 0.45;
  if (need.critical) score += 3.2;
  if (snapshot.trailing) score += 1.8;
  if (snapshot.endgame) score += snapshot.trailing ? 2.1 : 0.7;
  if (coins >= 15) score += 1.1;
  else if (coins >= 10) score += 0.55;
  else score -= 0.55;
  if (snapshot.leading && !snapshot.endgame && need.hpRatio >= 0.76 && need.totalMissing < 16 && need.pressure <= 0) score -= 2.4;
  return score >= 3.4;
}

function shouldComputerSpinMimiRoulette(player) {
  if (!player || player.activeCharacterId !== "trickster1" || !isMimiInGamblerMode(player)) return false;
  if (player.turnFlags?.mimiRouletteUsed || getMimiCoinCount(player) <= 0) return false;
  const roulette = chooseComputerMimiRoulette(player);
  if (!roulette) return false;
  const score = scoreComputerMimiRoulette(player, roulette);
  const need = getComputerMimiStatNeed(player);
  const snapshot = getComputerScoreSnapshot(player);
  if (need.critical || snapshot.trailing || snapshot.endgame) return score >= -1.5;
  return score >= 0.2 || getMimiCoinCount(player) <= 5;
}

function shouldComputerUseSkill(player) {
  if (!player || !canUseSkill()) return false;
  if (player.activeCharacterId === "tanker3") {
    return !!chooseComputerHobbsSkillAction(player);
  }
  const availability = getSkillAvailabilityState(player);
  if (availability.disabled) return false;

  if (player.activeCharacterId === "trickster1") {
    if (isMimiInStarMode(player)) return shouldComputerActivateMimiOffRecord(player);
    if (isMimiInGamblerMode(player)) return shouldComputerSpinMimiRoulette(player);
    return false;
  }

  if (player.activeCharacterId === "trickster2") {
    return !!chooseComputerRascaSkillAction(player);
  }

  if (player.activeCharacterId === "painter2") {
    const hiddenTurns = Number(player.statuses?.hiddenTurns) || 0;
    if (hiddenTurns > 0) return false;
    const enemyAdjacency = state.players.some((other) => other
      && other.id !== player.id
      && !arePlayersAllied(player, other)
      && isComputerAwareOfPlayerPosition(player, other)
      && other.position
      && player.position
      && Math.abs(other.position.row - player.position.row) + Math.abs(other.position.col - player.position.col) <= 2);
    let nearbyEnemyTiles = 0;
    if (player.position) {
      for (let row = player.position.row - 2; row <= player.position.row + 2; row += 1) {
        for (let col = player.position.col - 2; col <= player.position.col + 2; col += 1) {
          const cell = getCell(row, col);
          if (!cell || cell.obstacle) continue;
          if (cell.owner !== null && !isFriendlyOwner(cell.owner, state.currentPlayerIndex)) nearbyEnemyTiles += 1;
        }
      }
    }
    const techniqueCurrent = Number(player.currentStats?.technique) || 0;
    const techniqueMax = Math.max(1, getCurrentMax(player, 'technique'));
    const techniqueRatio = techniqueCurrent / techniqueMax;
    return techniqueCurrent >= 15 && techniqueRatio >= 0.24 && (enemyAdjacency || nearbyEnemyTiles >= 4);
  }

  if (player.activeCharacterId === "painter3") {
    if (isFlagCarrierMapActive() && playerHasFlag(player)) return false;
    if ((Number(player.cooldowns?.painter3Backblast) || 0) > 0 || isBrakkPaintBombActive(player)) return false;
    const hpCurrent = Number(player.currentStats?.hp) || 0;
    if (hpCurrent < 32 || !player.position) return false;
    const profile = getBrakkBlastProfile(player, player.position);
    const hpRatio = hpCurrent / Math.max(1, getCurrentMax(player, 'hp'));
    const safeEnough = profile.vulnerable <= (hpRatio >= 0.72 ? 7.5 : 4.8);
    if (!safeEnough && profile.enemyTiles < 5) return false;
    if (!state.moveDie) return profile.paintableCount >= 5 && profile.score >= 8.2;
    if (state.currentAction === "paint") {
      const storedAfterCurrentPaint = Math.min(6, Math.max(0, Number(state.remainingPaint) || 0));
      const threshold = storedAfterCurrentPaint >= 4 ? 7.4 : 9.2;
      return profile.paintableCount >= 4 && profile.score >= threshold;
    }
    return false;
  }

  if (player.activeCharacterId === "painter4") {
    if ((Number(player.cooldowns?.painter4Backtrack) || 0) > 0) return false;
    if ((Number(player.currentStats?.technique) || 0) < 15 || !player.position || !player.startPosition) return false;
    const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
    const techniqueRatio = (Number(player.currentStats?.technique) || 0) / Math.max(1, getCurrentMax(player, 'technique'));
    const distanceHome = Math.abs(player.position.row - player.startPosition.row) + Math.abs(player.position.col - player.startPosition.col);
    const danger = getComputerEnemyTileDanger(player, player.position, getCell(player.position.row, player.position.col));
    const backtrackScore = getTorgaBacktrackScore(player, player.position);
    if (!Number.isFinite(backtrackScore) || backtrackScore < 0) return false;
    if (playerHasFlag(player)) return danger >= 7.5 && hpRatio <= 0.42 && backtrackScore >= 4.5;
    if (hpRatio <= 0.36 && distanceHome >= 3 && backtrackScore >= 4.2) return true;
    if (danger >= 5.5 && distanceHome >= 2 && techniqueRatio >= 0.26 && backtrackScore >= 5.0) return true;
    if (state.currentAction === "paint" && danger >= 4.2 && hpRatio <= 0.52 && distanceHome >= 4 && backtrackScore >= 5.6) return true;
    return false;
  }

  if (player.activeCharacterId === "trapper1") {
    const attackCurrent = Number(player.currentStats?.attack) || 0;
    if (attackCurrent < 30 || !player.position) return false;
    const strategicValue = getTotoZoneStrategicValue(player, player.position);
    const hasExistingZone = getOwnedZones(state.currentPlayerIndex).length > 0;
    const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
    if (strategicValue >= 6.2) return true;
    if (!hasExistingZone && strategicValue >= 4.5 && hpRatio >= 0.4) return true;
    return false;
  }

  if (player.activeCharacterId === "trapper2") {
    const attackCurrent = Number(player.currentStats?.attack) || 0;
    if (attackCurrent < 15 || !player.position) return false;
    const cell = getCell(player.position.row, player.position.col);
    if (cell?.pits?.some((pit) => pit.ownerIndex === state.currentPlayerIndex)) return false;
    const strategicValue = getKazanPitStrategicValue(player, player.position);
    const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
    if (strategicValue >= 6.0) return true;
    if (strategicValue >= 4.2 && hpRatio >= 0.42) return true;
    return false;
  }

  if (player.activeCharacterId === "trapper3") {
    if ((Number(player.cooldowns?.trapper3VenomVarnish) || 0) > 0) return false;
    if (getActiveVeskaVarnishForOwner(state.players.indexOf(player))) return false;
    const attackCurrent = Number(player.currentStats?.attack) || 0;
    const hpCurrent = Number(player.currentStats?.hp) || 0;
    const techniqueCurrent = Number(player.currentStats?.technique) || 0;
    if (attackCurrent < 8 || hpCurrent < 26 || techniqueCurrent < 8) return false;
    const profile = getVeskaVenomProfile(player, player.position);
    const hpRatio = hpCurrent / Math.max(1, getCurrentMax(player, 'hp'));
    const hasUsableWeb = profile.ownedTiles >= 4 || profile.enemyOnVenom > 0 || profile.enemyNearVenom >= 2.4;
    const safeEnough = profile.unsafe <= (hpRatio >= 0.68 ? 8.5 : 5.8);
    if (!hasUsableWeb || !safeEnough) return false;
    if (profile.enemyOnVenom > 0 && hpRatio >= 0.34) return true;
    if (!state.moveDie && profile.value >= 10.4 && hpRatio >= 0.42) return true;
    if (state.currentAction === "paint" && profile.value >= 8.2 && hpRatio >= 0.46) return true;
    if (profile.enemyNearVenom >= 4.2 && profile.value >= 9.0 && hpRatio >= 0.5) return true;
    return false;
  }

  if (player.activeCharacterId === "battler3") {
    if ((player.cooldowns?.battler3MesmerSync || 0) > 0) return false;
    const attackCurrent = Number(player.currentStats?.attack) || 0;
    if (attackCurrent < 15 || !player.position) return false;
    const nearbyEnemies = state.players.filter((other) => other
      && other.id !== player.id
      && !arePlayersAllied(player, other)
      && isComputerAwareOfPlayerPosition(player, other)
      && other.position
      && Math.abs(other.position.row - player.position.row) + Math.abs(other.position.col - player.position.col) <= 2
      && canBattleOccurAtCellForPlayers(player, other, other.position.row, other.position.col));
    if (nearbyEnemies.length) {
      const hasStrongMesmerPlan = nearbyEnemies.some((other) => {
        const normalPlan = getBestComputerBattlePlan(player, other, { forceMesmer: false });
        const mesmerPlan = getBestComputerBattlePlan(player, other, { forceMesmer: true });
        if (!mesmerPlan) return false;
        if (!normalPlan) return mesmerPlan.winRate > 0;
        if (compareBattleEstimates(mesmerPlan, normalPlan) < 0) return true;
        const normalWeak = normalPlan.guaranteedLoss || normalPlan.winRate <= 0.34 || normalPlan.losses >= 2;
        const mesmerStrong = mesmerPlan.guaranteedWin || mesmerPlan.winRate >= 0.66 || mesmerPlan.losses <= 1;
        return normalWeak && mesmerStrong;
      });
      if (hasStrongMesmerPlan) return true;
    }
    if (state.currentAction === "paint") {
      const currentCell = getCell(player.position.row, player.position.col);
      if (currentCell && currentCell.owner !== null && !isFriendlyOwner(currentCell.owner, state.currentPlayerIndex)) {
        return nearbyEnemies.length > 0;
      }
    }
    return false;
  }

  if (player.activeCharacterId === "battler4") {
    if ((Number(player.cooldowns?.battler4BleakOffering) || 0) > 0) return false;
    if (playerHasFlag(player)) return false;
    const omen = getCorvenOmenGauge(player);
    if (omen >= 100) return false;
    const autoHealTurns = Math.max(0, Number(player.statuses?.corvenAutoHealTurns) || 0);
    const attackCurrent = Math.max(0, Number(player.currentStats?.attack) || 0);
    const hpCurrent = Math.max(0, Number(player.currentStats?.hp) || 0);
    const techniqueCurrent = Math.max(0, Number(player.currentStats?.technique) || 0);
    const projectedOmen = Math.min(100, omen + 25);
    const hpRatio = hpCurrent / Math.max(1, getCurrentMax(player, "hp"));
    const pressure = getComputerEnemyTileDanger(player, player.position, getCell(player.position.row, player.position.col));
    const localPressure = getComputerLocalPressure(player);
    const flagPressure = getComputerVisibleFlagCarrierPressureValue(player, player.position);
    const priorityPressure = getComputerCorvenPriorityNearPoint(player, player.position);
    const enemyFlagActive = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
    const battleLikelySoon = pressure >= 2.8 || localPressure >= 3.4 || flagPressure >= (isFlagCarrierMapActive() ? 16 : 4.4) || priorityPressure >= 3.8;
    const nearStatFloor = attackCurrent <= 6 || hpCurrent <= 12 || techniqueCurrent <= 6;
    if (nearStatFloor && projectedOmen < 100) return false;
    if (omen < 25) {
      if (hpRatio < 0.34) return false;
      if (enemyFlagActive && hpRatio >= 0.4) return true;
      if (battleLikelySoon && hpRatio >= 0.44) return true;
      if (!state.moveDie && autoHealTurns <= 2 && hpRatio >= 0.54) return true;
      return false;
    }
    if (enemyFlagActive && omen < 75 && hpRatio >= 0.4 && autoHealTurns <= 2) return true;
    if (projectedOmen >= 100 && hpRatio >= 0.38 && (flagPressure >= (isFlagCarrierMapActive() ? 12 : 3.4) || priorityPressure >= 4.2 || pressure >= 2.2)) return true;
    if (autoHealTurns <= 2 && hpRatio >= 0.48 && (pressure >= 3 || localPressure >= 4 || priorityPressure >= 3.8)) return true;
    if (!state.moveDie && projectedOmen >= 50 && (pressure >= 2.8 || priorityPressure >= 3.2 || enemyFlagActive) && hpRatio >= 0.42) return true;
    if (state.currentAction === "paint" && projectedOmen >= 50 && (pressure >= 2.2 || priorityPressure >= 3 || enemyFlagActive) && hpRatio >= 0.4) return true;
    return false;
  }

  if (player.activeCharacterId === "battler5") {
    const profile = getMoppetStartZoneProfile(player, player.position);
    const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
    const enemyFlagActive = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
    const useValue = getMoppetEmergencyCalloutValue(player);
    if (profile.ownPenalty >= 10 && hpRatio >= 0.54) return useValue >= 8.5;
    if (enemyFlagActive && hpRatio >= 0.48) return useValue >= 10.5;
    return useValue >= 13.5;
  }

  if (player.activeCharacterId === "tanker2") {
    if ((player.cooldowns?.tanker2Quickdig || 0) > 0) return false;
    if (getInventorySlotCount(player) >= MAX_ITEMS) return false;
    const techniqueCurrent = Number(player.currentStats?.technique) || 0;
    const techniqueRatio = techniqueCurrent / Math.max(1, getCurrentMax(player, 'technique'));
    const totalMissing = Math.max(0, getCurrentMax(player, 'hp') - (Number(player.currentStats?.hp) || 0))
      + Math.max(0, getCurrentMax(player, 'attack') - (Number(player.currentStats?.attack) || 0))
      + Math.max(0, getCurrentMax(player, 'technique') - (Number(player.currentStats?.technique) || 0));
    const inventorySlots = getInventorySlotCount(player);
    const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
    if (techniqueCurrent < 10 || techniqueRatio < 0.26) return false;
    return inventorySlots <= 1 || totalMissing >= 18 || hpRatio <= 0.72;
  }

  if (player.activeCharacterId === "supporter1") {
    const value = getComputerGallusPushAheadValue(player);
    const threshold = !state.moveDie ? 4.4 : 6.2;
    return value >= threshold;
  }

  if (player.activeCharacterId === "supporter2") {
    return !!chooseComputerPipFreshBatchAction(player);
  }

  if (player.activeCharacterId === "trickster3") {
    return !!chooseComputerSkavaSkillAction(player);
  }

  return false;
}

async function runComputerTurn(expectedPlayerId) {
  const matchRuntimeVersion = state.matchRuntimeVersion;
  const isStale = () => !isMatchRuntimeCurrent(matchRuntimeVersion);
  const player = getCurrentPlayer();
  if (isStale() || !player || player.id !== expectedPlayerId || !isComputerPlayer(player) || state.gameOver) return;
  if (isInteractionPromptBlocking()) {
    scheduleComputerTurn(320, matchRuntimeVersion);
    return;
  }
  if (!state.moveDie) {
    if (shouldComputerSwap(player)) {
      await wait(220);
      if (isStale()) return;
      executeSwap(player);
      if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
      await wait(140);
      if (isStale()) return;
    }
    if (shouldComputerRest(player)) {
      await wait(320);
      if (isStale()) return;
      restFlow();
      return;
    }
    const computerItemPlan = chooseComputerItemAction(player);
    if (computerItemPlan) {
      await wait(220);
      if (isStale()) return;
      if (applyComputerItemAction(player, computerItemPlan)) {
        if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
        await wait(120);
        if (isStale()) return;
      }
    }
    if (shouldComputerUseSkill(player)) {
      await wait(220);
      if (isStale()) return;
      const rascaAction = player.activeCharacterId === "trickster2" ? chooseComputerRascaSkillAction(player) : null;
      const hobbsAction = player.activeCharacterId === "tanker3" ? chooseComputerHobbsSkillAction(player) : null;
      await useSkillFlow(
        rascaAction?.type === "snapback" ? 1
          : rascaAction?.type === "shed" ? 0
          : Number.isInteger(hobbsAction?.skillIndex) ? hobbsAction.skillIndex
          : null
      );
      if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
      if (isPlayerReturningToStart(player)) {
        advanceTurn();
        return;
      }
      if (player.activeCharacterId === "trickster1" && shouldComputerUseSkill(player)) {
        await wait(180);
        if (isStale()) return;
        await useSkillFlow();
        if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
        if (isPlayerReturningToStart(player)) {
          advanceTurn();
          return;
        }
      }
    }
    state.ui.diceBubbleOpen = true;
    renderExpandablePanels();
    await wait(260);
    if (isStale()) return;
    state.ui.diceBubbleOpen = false;
    renderExpandablePanels();
    await rollTurnDiceAnimated();
  }
  if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
  if (isInteractionPromptBlocking()) {
    scheduleComputerTurn(320, matchRuntimeVersion);
    return;
  }
  if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
  if (state.currentAction === "move") {
    state.selectedPath = chooseComputerMovePath(player);
    state.remainingMove = Math.max(0, getCurrentTurnMoveAllowance() - (state.selectedPath.length - 1));
    state.remainingPaint = Math.max(0, getCurrentTurnPaintAllowance() - countUnownedCellsInPath(state.selectedPath));
    refreshTileHighlights();
    renderHud();
    renderControls();
    await wait(260);
    if (isStale()) return;
    if (state.selectedPath.length < 2 || canSkipMovePhaseBecauseBlocked()) {
      state.currentAction = "paint";
      state.paintPhaseStartRemaining = state.remainingPaint;
      renderAll();
    } else {
      await confirmMovePhase();
    }
  }
  if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
  if (isInteractionPromptBlocking()) {
    scheduleComputerTurn(320, matchRuntimeVersion);
    return;
  }
  if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
  if (state.currentAction === "paint") {
    if (shouldComputerUseSkill(player)) {
      await wait(200);
      if (isStale()) return;
      const rascaAction = player.activeCharacterId === "trickster2" ? chooseComputerRascaSkillAction(player) : null;
      const hobbsAction = player.activeCharacterId === "tanker3" ? chooseComputerHobbsSkillAction(player) : null;
      await useSkillFlow(
        rascaAction?.type === "snapback" ? 1
          : rascaAction?.type === "shed" ? 0
          : Number.isInteger(hobbsAction?.skillIndex) ? hobbsAction.skillIndex
          : null
      );
      if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
      if (isPlayerReturningToStart(player)) {
        advanceTurn();
        return;
      }
      if (player.activeCharacterId === "trickster1" && shouldComputerUseSkill(player)) {
        await wait(180);
        if (isStale()) return;
        await useSkillFlow();
        if (isStale() || state.gameOver || getCurrentPlayer()?.id !== expectedPlayerId) return;
        if (isPlayerReturningToStart(player)) {
          advanceTurn();
          return;
        }
      }
    }
    state.selectedPaintTargets = chooseComputerPaintTargets(player);
    state.remainingPaint = Math.max(0, state.paintPhaseStartRemaining - state.selectedPaintTargets.length);
    refreshTileHighlights();
    renderHud();
    renderControls();
    await wait(220);
    if (isStale()) return;
    await confirmPaintPhase();
  }
}

function chooseComputerBattleStat(player, opponent) {
  const snapshot = getComputerScoreSnapshot(player);
  if (player?.activeCharacterId === 'battler2' && opponent) {
    const attackPlan = estimateComputerBattleOutcome(player, opponent, 'attack');
    const bestPlan = getBestComputerBattlePlan(player, opponent);
    const attackCompetitive = attackPlan && bestPlan
      && attackPlan.losses <= bestPlan.losses
      && attackPlan.worstMargin >= bestPlan.worstMargin - 6
      && (attackPlan.winRate >= bestPlan.winRate - 0.12)
      && (attackPlan.averageMargin >= bestPlan.averageMargin - 8);
    if (attackCompetitive) return 'attack';
  }
  if (player && opponent) {
    const plans = ['attack', 'hp', 'technique']
      .map((ownChoice) => {
        const estimate = estimateComputerBattleOutcome(player, opponent, ownChoice);
        const targetBonus = getComputerPriorityTargetValue(player, opponent);
        const counterplayBonus = getComputerBattleCounterplayBonus(player, opponent, ownChoice, estimate);
        const weightedLossPressure = (estimate.weightedLosses || 0) * 3.2;
        let strategic = estimate.winRate * 4.8 + estimate.averageMargin * 0.04 + estimate.worstMargin * 0.09 + targetBonus + counterplayBonus;
        strategic -= weightedLossPressure;
        strategic += getComputerCorvenBlackFeatherValue(player, opponent, estimate);
        if (estimate.guaranteedWin) strategic += 3.4;
        if (estimate.losses >= 2) strategic -= 2.8;
        if (estimate.guaranteedLoss) strategic -= 5.5;
        if (playerHasFlag(player)) strategic += ownChoice === 'hp' ? 0.75 : 0;
        if (snapshot.trailing) strategic += estimate.winRate * 0.8;
        if (snapshot.endgame) strategic += targetBonus + Math.max(0, estimate.worstMargin) * 0.05;
        return { ownChoice, strategic };
      })
      .sort((a, b) => b.strategic - a.strategic);
    return plans[0]?.ownChoice || 'attack';
  }
  return getBestComputerBattlePlan(player, opponent)?.ownChoice || 'attack';
}


function startTurnActionState(player) {
  state.turnActionOrigin = player.position ? { ...player.position } : null;
  state.turnActionOriginalOwners = {};
  state.selectedPath = player.position ? [{ row: player.position.row, col: player.position.col }] : [];
  state.selectedPaintTargets = [];
}

function getCurrentTurnMoveAllowance() {
  if (isMoppetEmergencyCalloutActive(getCurrentPlayer())) {
    return getMoppetEmergencyCalloutMoveAllowance();
  }
  return Math.max(0, (Number(state.moveDie) || 0) + (Number(state.turnMoveCountBonus) || 0));
}

function getCurrentTurnPaintAllowance() {
  if (isMoppetEmergencyCalloutActive(getCurrentPlayer())) return 0;
  return Math.max(0, (Number(state.paintDie) || 0) + (Number(state.turnPaintCountBonus) || 0));
}

function getBrakkPaintBomb(player) {
  return player?.statuses?.brakkPaintBomb || null;
}

function isBrakkPaintBombActive(player) {
  return !!getBrakkPaintBomb(player);
}

function isBrakkPaintBombDetonating(player) {
  return getBrakkPaintBomb(player)?.phase === "detonating";
}

function addBrakkPaintBombCharge(player, amount) {
  const bomb = getBrakkPaintBomb(player);
  if (!bomb) return 0;
  const before = Math.max(0, Number(bomb.storedPaint) || 0);
  const next = Math.min(6, before + Math.max(0, Number(amount) || 0));
  bomb.storedPaint = next;
  return next - before;
}

function clearBrakkPaintBomb(player, reason = "") {
  if (!getBrakkPaintBomb(player)) return;
  player.statuses.brakkPaintBomb = null;
  if (reason) log(`${player.name}'s Paint Bomb ended: ${reason}.`, true);
}

function handleBrakkPaintBombAfterDice(player) {
  const bomb = getBrakkPaintBomb(player);
  if (!bomb) return false;
  const chargeAmount = Math.max(0, Number(state.remainingPaint) || 0);
  addBrakkPaintBombCharge(player, chargeAmount);
  state.remainingMove = 0;
  state.selectedPath = player.position ? [{ row: player.position.row, col: player.position.col }] : [];
  state.selectedPaintTargets = [];
  state.currentAction = "paint";
  if (bomb.phase === "ready") {
    bomb.phase = "detonating";
    state.remainingPaint = Math.max(0, Number(bomb.storedPaint) || 0);
    state.paintPhaseStartRemaining = state.remainingPaint;
    log(`${player.name}'s Paint Bomb is ready to blast up to ${state.remainingPaint} tiles.`, true);
  } else {
    state.remainingPaint = 0;
    state.paintPhaseStartRemaining = 0;
    log(`${player.name} braced in Paint Bomb state and stored ${Math.max(0, Number(bomb.storedPaint) || 0)} Space.`, true);
  }
  return true;
}

function finalizeBrakkPaintBombAtTurnEnd(player) {
  const bomb = getBrakkPaintBomb(player);
  if (!bomb) return;
  if (bomb.phase === "detonating") {
    clearBrakkPaintBomb(player, "the bomb resolved");
    return;
  }
  if (bomb.phase === "charging") {
    bomb.phase = "ready";
    log(`${player.name}'s Paint Bomb will detonate on their next turn.`, true);
  }
}

function addCurrentTurnMovePaintCountBonus(player, amount, message = "", { render = true } = {}) {
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (safeAmount <= 0) return;
  state.turnMoveCountBonus = (Number(state.turnMoveCountBonus) || 0) + safeAmount;
  state.turnPaintCountBonus = (Number(state.turnPaintCountBonus) || 0) + safeAmount;
  state.remainingMove = Math.max(0, (Number(state.remainingMove) || 0) + safeAmount);
  if (!isMoppetEmergencyCalloutActive(player)) {
    state.remainingPaint = Math.max(0, (Number(state.remainingPaint) || 0) + safeAmount);
  }
  log(message || `${player.name}'s Move and Space counts increased by +${safeAmount}.`, true);
  if (render) {
    refreshTileHighlights();
    renderHud();
    renderControls();
  }
}

function addCurrentTurnPaintCountBonus(player, amount, message = "", { render = true } = {}) {
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (safeAmount <= 0) return;
  state.turnPaintCountBonus = (Number(state.turnPaintCountBonus) || 0) + safeAmount;
  if (!isMoppetEmergencyCalloutActive(player)) {
    state.remainingPaint = Math.max(0, (Number(state.remainingPaint) || 0) + safeAmount);
  }
  log(message || `${player.name}'s Space count increased by +${safeAmount}.`, true);
  if (render) {
    refreshTileHighlights();
    renderHud();
    renderControls();
  }
}

function applyTorgaBroadStrideAfterRoll(player, moveValue) {
  if (!player || player.activeCharacterId !== "painter4") return;
  if (Number(moveValue) !== 4) return;
  addCurrentTurnPaintCountBonus(player, 1, `${player.name}'s Broad Stride increased this turn's Space count by +1.`, { render: false });
}

function shouldApplyBrakkPrimedPayload(player) {
  if (!player || player.activeCharacterId !== "painter3") return false;
  if (player.turnFlags?.brakkPrimedPayloadApplied) return false;
  const lastDistance = player.statuses?.brakkLastOwnMoveDistance;
  if (lastDistance === null || lastDistance === undefined) return false;
  return Math.max(0, Number(lastDistance) || 0) < 2;
}

function applyBrakkPrimedPayloadAfterRoll(player) {
  if (!shouldApplyBrakkPrimedPayload(player)) return;
  if (!player.turnFlags) player.turnFlags = {};
  player.turnFlags.brakkPrimedPayloadApplied = true;
  addCurrentTurnPaintCountBonus(player, 1, `${player.name}'s Primed Payload increased this turn's Space count by +1.`, { render: false });
}

function recordCurrentTurnNormalMoveDistance(distance) {
  state.turnNormalMoveDistance = Math.max(0, Number(distance) || 0);
}

function finalizeBrakkPrimedPayloadTurnRecord(player) {
  if (!player?.statuses) return;
  if (player.activeCharacterId !== "painter3") return;
  player.statuses.brakkLastOwnMoveDistance = Math.max(0, Number(state.turnNormalMoveDistance) || 0);
}

function resetBrakkPrimedPayloadMemory(player) {
  if (!player?.statuses) return;
  player.statuses.brakkLastOwnMoveDistance = null;
}

function setTurnDiceResults(moveValue, paintValue) {
  const player = getCurrentPlayer();
  if (player?.turnFlags) {
    player.turnFlags.hiddenRevealThisTurn = true;
  }
  state.moveDie = moveValue;
  state.paintDie = paintValue;
  state.remainingMove = isMoppetEmergencyCalloutActive(player) ? (moveValue + paintValue) : moveValue;
  state.remainingPaint = isMoppetEmergencyCalloutActive(player) ? 0 : paintValue;
  startTurnActionState(player);
  state.currentAction = "move";
  state.rotationLocked = false;
  state.ui.skillPanelOpen = false;
  log(`${player.name} rolled Move ${moveValue} and Space ${paintValue}.`, true);
  applyTorgaBroadStrideAfterRoll(player, moveValue);
  applyBrakkPrimedPayloadAfterRoll(player);
  if (hasPushAheadDiceBoost(player)) {
    addCurrentTurnMovePaintCountBonus(player, 1, `${player.name} gained +1 Move and +1 Space from Push Ahead!`, { render: false });
  }
  handleBrakkPaintBombAfterDice(player);
  renderAll();
  if (isTutorialActive() && getTutorialStep() === 3 && state.currentPlayerIndex === 0 && state.tutorial.modalShownForStep !== 4) {
    state.tutorial.step = 4;
    state.tutorial.modalShownForStep = 4;
    showTutorialModal(
      '④ Move',
      'Use the highlighted movement controls to move up to 2 tiles. You do not need to spend all movement, but you must move at least 1 tile. Entering an uncolored tile also spends 1 Space because that tile is painted during movement.',
    );
  }
}

async function rollTurnDiceAnimated() {
  const player = getCurrentPlayer();
  if (!player) return;
  let moveValue = rollMoveDie(player);
  let paintValue = rollPaintDie(player);
  if (isTutorialActive() && getTutorialStep() === 3 && state.currentPlayerIndex === 0) {
    moveValue = 2;
    paintValue = 4;
  }
  if (player.turnFlags && player.turnFlags.forcedMoveLimit) {
    moveValue = 1;
  }
  let pendingMimiCountBoost = 0;
  if ((Number(player.statuses?.corvenCurseTurns) || 0) > 0) {
    moveValue = 1;
    paintValue = 1;
    log(`${player.name}'s dice were fixed at 1 by 🐦‍⬛ Cursed.`, true);
  } else if (player.statuses?.mimiForceDiceOne) {
    moveValue = 1;
    paintValue = 1;
    player.statuses.mimiForceDiceOne = false;
    log(`${player.name}'s next dice were fixed at 1 by Jackpot Frenzy.`, true);
  } else if ((Number(player.statuses?.mimiNextDiceBoost) || 0) > 0) {
    pendingMimiCountBoost = Number(player.statuses.mimiNextDiceBoost) || 0;
    player.statuses.mimiNextDiceBoost = 0;
  }
  await animateDiceRollSequence({
    title: "Turn Dice",
    subtitle: `${player.name} Move and Paint`,
    dice: [
      { label: "Move", result: moveValue, display: String(moveValue), face: ((moveValue - 1) % 6) + 1 },
      { label: "Space", result: paintValue, display: String(paintValue), face: ((paintValue - 1) % 6) + 1 }
    ],
    odds: {
      move: getMoveDieDistribution(player),
      space: getPaintDieDistribution(player)
    },
    autoStopDelay: isComputerPlayer(player) ? randomInt(620, 1180) : null
  });
  setTurnDiceResults(moveValue, paintValue);
  if (pendingMimiCountBoost > 0) {
    addCurrentTurnMovePaintCountBonus(
      player,
      pendingMimiCountBoost,
      `${player.name}'s Move and Space counts increased by +${pendingMimiCountBoost} after the roll.`
    );
  }
}

function rollPaintDie(player) {
  if (player.activeCharacterId === "painter1") {
    const roll = Math.random() * 100;
    if (roll < 20) return 1;
    if (roll < 40) return 2;
    if (roll < 60) return 3;
    if (roll < 80) return 4;
    if (roll < 95) return 5;
    return 6;
  }
  return randomInt(1, 4);
}

function rollMoveDie(player) {
  if (player?.activeCharacterId === "tanker1") {
    return randomInt(1, 3);
  }
  return randomInt(1, 4);
}

function updateMapVisualClasses() {
  if (!ui.boardWrap) return;
  ui.boardWrap.classList.toggle("royal-march-background", isRoyalMarchMapActive());
  ui.boardWrap.classList.toggle("central-dominion-background", isCentralDominionMapActive());
  ui.boardWrap.classList.toggle("big-bridge-background", getSelectedMapDefinition()?.id === "bigBridge");
  ui.boardWrap.classList.toggle("food-court-background", isFoodCourtMapActive());
}

function renderAll(options = {}) {
  cleanupExpiredVisualEffects();
  updateMapVisualClasses();
  if (options.fullBoard || shouldRebuildBoard()) {
    renderBoard();
  } else {
    updateBoardVisualState();
  }
  renderPlayerPanels();
  renderHud();
  renderControls();
  renderExpandablePanels();
  renderObstacleActionPanel();
  renderInlinePromptPanel();
  multiplayerScheduleSnapshot();
}

function renderHud() {
  const currentPlayer = getCurrentPlayer();
  const hideSetupControls = state.setupSelection.active;
  const showActionOverlay = state.setupSelection.active || (!!state.moveDie && !hideSetupControls);
  if (ui.actionOverlay) ui.actionOverlay.classList.toggle("hidden", !showActionOverlay);
  if (ui.actionOverlay) ui.actionOverlay.classList.toggle("setupSelectionOverlay", state.setupSelection.active);
  if (ui.skillDock) ui.skillDock.classList.toggle("hidden", hideSetupControls);
  if (ui.bottomRightDock) ui.bottomRightDock.classList.toggle("hidden", hideSetupControls);
  if (ui.rightOverlayPanel && hideSetupControls) {
    ui.rightOverlayPanel.classList.add("hidden");
  }
  if (state.setupSelection.active) {
    const setupPlayer = state.players[state.setupSelection.currentPlayerIndex];
    ui.roundInfo.classList.remove('lastRound');
    ui.roundInfo.textContent = "Initial Placement";
    ui.turnInfo.textContent = setupPlayer ? `${setupPlayer.name}: choose a starting tile` : "Choose Starting Tile";
  } else {
    ui.roundInfo.classList.toggle('lastRound', !!state.lastRoundHudActive && !state.gameOver);
    if (state.lastRoundHudActive && !state.gameOver) {
      ui.roundInfo.innerHTML = `Round ${state.round}<span class="roundInfoAlert">Last Round!</span>`;
    } else {
      ui.roundInfo.textContent = `Round ${state.round}`;
    }
    ui.turnInfo.textContent = state.gameOver
      ? "Game Over"
      : currentPlayer
        ? `${currentPlayer.name}'s turn`
        : "Preparing";
  }

  if (ui.phaseLabel) ui.phaseLabel.textContent = describePhase();
  if (ui.moveDieValue) ui.moveDieValue.textContent = state.moveDie ?? "-";
  if (ui.paintDieValue) ui.paintDieValue.textContent = state.paintDie ?? "-";
  if (ui.remainingMoveValue) ui.remainingMoveValue.textContent = state.remainingMove ?? "-";
  if (ui.remainingPaintValue) ui.remainingPaintValue.textContent = state.remainingPaint ?? "-";

  if (ui.moveModeChip) {
    const moveActive = state.currentAction === "move";
    const moveDimmed = !!state.moveDie && state.currentAction !== "move";
    ui.moveModeChip.classList.toggle("active", moveActive);
    ui.moveModeChip.classList.toggle("dimmed", moveDimmed);
    if (ui.moveModeCard) {
      ui.moveModeCard.classList.toggle("active", moveActive);
      ui.moveModeCard.classList.toggle("dimmed", moveDimmed);
    }
  }
  if (ui.paintModeChip) {
    const paintActive = state.currentAction === "paint";
    const paintDimmed = !!state.moveDie && state.currentAction === "move";
    ui.paintModeChip.classList.toggle("active", paintActive);
    ui.paintModeChip.classList.toggle("dimmed", paintDimmed);
    if (ui.paintModeCard) {
      ui.paintModeCard.classList.toggle("active", paintActive);
      ui.paintModeCard.classList.toggle("dimmed", paintDimmed);
    }
  }
  if (ui.cameraActionButton) {
    ui.cameraActionButton.classList.toggle("active", state.currentAction === "camera");
    ui.cameraActionButton.disabled = !state.moveDie || state.gameOver || isInteractionPromptBlocking() || isComputerPlayer(currentPlayer);
  }
  renderDiceOddsPanels();
}

function getMoveDieDistribution(player) {
  if (!player) return [];
  if ((Number(player.statuses?.corvenCurseTurns) || 0) > 0) {
    return [{ value: 1, probability: 1 }];
  }
  if (player.turnFlags && player.turnFlags.forcedMoveLimit) {
    return [{ value: 1, probability: 1 }];
  }
  if (player.activeCharacterId === "tanker1") {
    return [1, 2, 3].map((value) => ({ value, probability: 1 / 3 }));
  }
  return [1, 2, 3, 4].map((value) => ({ value, probability: 0.25 }));
}

function getPaintDieDistribution(player) {
  if (!player) return [];
  if ((Number(player.statuses?.corvenCurseTurns) || 0) > 0) {
    return [{ value: 1, probability: 1 }];
  }
  if (player.activeCharacterId === "painter1") {
    return [
      { value: 1, probability: 0.20 },
      { value: 2, probability: 0.20 },
      { value: 3, probability: 0.20 },
      { value: 4, probability: 0.20 },
      { value: 5, probability: 0.15 },
      { value: 6, probability: 0.05 }
    ];
  }
  return [1, 2, 3, 4].map((value) => ({ value, probability: 0.25 }));
}

function formatProbability(probability) {
  const percent = probability * 100;
  return `${percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1)}%`;
}

function createDieOddsPanelHtml(title, distribution) {
  return `
    <div class="dieOddsTitle">${sanitize(title)}</div>
    <div class="dieOddsList">
      ${distribution.map((entry) => `
        <div class="dieOddsRow">
          <span class="dieOddsValue">${entry.value}</span>
          <span class="dieOddsRate">${formatProbability(entry.probability)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDieOddsPanel(target, title, distribution) {
  if (!target) return;
  target.innerHTML = createDieOddsPanelHtml(title, distribution);
}

function renderDiceOddsPanels() {
  if (ui.moveOddsPanel) ui.moveOddsPanel.innerHTML = "";
  if (ui.paintOddsPanel) ui.paintOddsPanel.innerHTML = "";
}

function describePhase() {
  if (state.gameOver) return "Game Over";
  if (!state.moveDie) return "Before Action";
  if (state.currentAction === "move") return "Choosing Movement Path";
  if (state.currentAction === "paint") return "Choosing Paint Tiles";
  if (state.currentAction === "camera") return "Rotating Camera";
  return "Waiting";
}


function updateDrawerCollapsedOffset() {
  const wrap = ui.playerDrawerWrap;
  const dock = ui.playerSummaryDock;
  if (!wrap || !dock) return;
  const hideDistance = Math.max(0, dock.offsetHeight);
  wrap.style.setProperty('--drawer-hide-distance', `${hideDistance}px`);
}

function renderPlayerPanels() {
  if (!ui.playerSummaryTabs || !ui.expandedPlayerPanel) return;

  ui.playerSummaryHeader.innerHTML = `<span class="summaryHeaderLabel">Players</span>`;
  const ownedCounts = state.players.map((_, idx) => getOwnedTileCount(idx));
  const maxOwned = ownedCounts.length ? Math.max(...ownedCounts) : 0;
  const displayOrder = state.order.length === state.players.length ? state.order : state.players.map((_, index) => index);
  if (ui.playerSummaryDock) {
    ui.playerSummaryDock.style.setProperty('--summary-count', String(Math.min(displayOrder.length, 4)));
  }
  if (ui.playerDrawerWrap) {
    ui.playerDrawerWrap.classList.toggle('is-open', !!state.ui.summaryDrawerOpen);
  }
  if (ui.playerDrawerToggle) {
    ui.playerDrawerToggle.setAttribute('aria-expanded', state.ui.summaryDrawerOpen ? 'true' : 'false');
    ui.playerDrawerToggle.textContent = state.ui.summaryDrawerOpen ? 'Players🔼' : 'Players🔽';
  }
  if (ui.teamScoreDock) {
    if (isTeamModeEnabled()) {
      const teamEntries = buildCurrentTeamHudEntries();
      if (teamEntries.length === 0) {
        ui.teamScoreDock.classList.add('hidden');
        ui.teamScoreDock.innerHTML = '';
      } else {
        ui.teamScoreDock.classList.remove('hidden');
        ui.teamScoreDock.style.setProperty('--score-pill-columns', String(Math.min(teamEntries.length, 4) || 1));
        const highest = teamEntries.reduce((best, entry) => Math.max(best, entry.total), Number.NEGATIVE_INFINITY);
        ui.teamScoreDock.innerHTML = teamEntries.map((entry) => {
          const teamInfo = getTeamColorInfo(entry.teamKey);
          const isLeader = entry.total === highest;
          return `
            <div class="teamScorePill team-${sanitize(entry.teamKey)} ${isLeader ? 'is-leading' : ''}" style="--team-score-accent:${sanitize(teamInfo.accent)};">
              <span class="teamScoreText ${isLeader ? 'is-leading' : ''}"><span class="teamFlag team-${sanitize(entry.teamKey)}">⚑</span>${isLeader ? ' <span class="hudLeaderCrown" aria-label="Leading">👑</span>' : ''} ${entry.total} pts</span>
              ${isFoodCourtMapActive() ? `<span class="teamScoreFoodRow">${buildFoodCourtProgressHtml(entry.teamKey, { compact: true })}</span>` : ''}
            </div>
          `;
        }).join('');
      }
    } else {
      const playerEntries = buildCurrentIndividualHudEntries();
      if (playerEntries.length === 0) {
        ui.teamScoreDock.classList.add('hidden');
        ui.teamScoreDock.innerHTML = '';
      } else {
        ui.teamScoreDock.classList.remove('hidden');
        ui.teamScoreDock.style.setProperty('--score-pill-columns', String(Math.min(playerEntries.length, 4) || 1));
        const highest = playerEntries.reduce((best, entry) => Math.max(best, entry.total), Number.NEGATIVE_INFINITY);
        ui.teamScoreDock.innerHTML = playerEntries.map((entry) => {
          const isLeader = entry.total === highest;
          return `
            <div class="teamScorePill ${isLeader ? 'is-leading' : ''}" style="--team-score-accent:${sanitize(entry.accent)};">
              <span class="teamScoreText ${isLeader ? 'is-leading' : ''}"><span class="teamFlag">${sanitize(entry.shortLabel)}</span> |${isLeader ? ' <span class="hudLeaderCrown" aria-label="Leading">👑</span>' : ''} ${entry.total} pts${entry.hasFlag ? ' <span class="hudFlagMarker" aria-label="Has flag">🚩</span>' : ''}</span>
            </div>
          `;
        }).join('');
      }
    }
  }

  ui.playerSummaryTabs.innerHTML = displayOrder.map((playerIndex) => {
    const player = state.players[playerIndex];
    const index = playerIndex;
    const isTurn = !state.gameOver && state.currentPlayerIndex === index;
    const isOpen = state.ui.summaryPanelOpen && state.selectedPlayerSummaryIndex === index;
    const mainChar = getOriginalCharacterInfo(player, "main");
    const benchChar = getOriginalCharacterInfo(player, "bench");
    const mainUnavailable = !player.swapAvailable && player.selectedCharacters[0] !== player.activeCharacterId;
    const ownedCount = ownedCounts[index] ?? 0;
    const isLeader = maxOwned > 0 && ownedCount === maxOwned;
    const teamFlag = isTeamModeEnabled() ? `<span class="teamFlag team-${sanitize(player.teamKey || getPlayerTeamKey(player))}">⚑</span>` : "";
    return `
      <button
        type="button"
        class="playerSummaryButton ${isTurn ? "currentTurn" : ""} ${isOpen ? "open" : ""}"
        data-player-index="${index}"
        data-summary-index="${index}"
        aria-label="Show info for ${sanitize(player.name)}"
      >
        <span class="playerSummaryName">${teamFlag}${sanitize(player.name)}</span>
        <span class="playerSummaryIcons"><span class="summaryIconWrap">${getCharacterIconMarkup(mainChar, "characterIconAsset--summary")}${mainUnavailable ? `<span class="summaryIconCross">✕</span>` : ""}</span> / <span class="summaryIconWrap">${getCharacterIconMarkup(benchChar, "characterIconAsset--summary")}</span></span>
        <span class="playerOwnedCount ${isLeader ? "leader" : ""}">
          <span class="playerOwnedCountValue">${ownedCount}</span>
          ${getDisplayedBonusPoints(player) > 0 ? `<span class="playerOwnedCountBonus">+${getDisplayedBonusPoints(player)}</span>` : ""}
        </span>
      </button>
    `;
  }).join("");

  const selectedIndex = Number.isInteger(state.selectedPlayerSummaryIndex) ? state.selectedPlayerSummaryIndex : 0;
  const selectedPlayer = state.players[selectedIndex] ?? null;

  if (!state.ui.summaryPanelOpen || !selectedPlayer) {
    ui.expandedPlayerPanel.classList.add("hidden");
    ui.expandedPlayerPanel.innerHTML = "";
    requestAnimationFrame(updateDrawerCollapsedOffset);
    return;
  }

  const statuses = collectStatusTags(selectedPlayer);
  ui.expandedPlayerPanel.classList.remove("hidden");
  ui.expandedPlayerPanel.dataset.playerIndex = String(selectedIndex);
  ui.expandedPlayerPanel.classList.toggle("currentTurn", !state.gameOver && state.currentPlayerIndex === selectedIndex);
  ui.expandedPlayerPanel.innerHTML = `
    <div class="summaryPanelBody">
      <div class="statList compactSingleColumn">
        ${renderStatPanelRow(selectedPlayer, "attack")}
        ${renderStatPanelRow(selectedPlayer, "hp")}
        ${renderStatPanelRow(selectedPlayer, "technique")}
      </div>
      <div class="summaryStatusRow">${statuses.length ? statuses.map(renderStatusTag).join("") : `<span class="statusTag muted">No status</span>`}</div>
      <div class="itemDivider"></div>
      <div class="summaryItems">${renderItemList(selectedPlayer)}</div>
      <div class="characterSummaryGrid">${renderCharacterSummaryCards(selectedPlayer)}</div>
    </div>
  `;

  bindExpandedCharacterButtons();
  requestAnimationFrame(updateDrawerCollapsedOffset);
}

function renderStatusTag(status) {
  return `<span class="statusTag ${status.kind}">${sanitize(status.label)}</span>`;
}

function collectStatusTags(player) {
  const list = [];
  if (player.activeCharacterId === "trickster1") {
    const mode = isMimiInGamblerMode(player) ? "🪙Gambler Mode" : "⭐Star Mode";
    list.push({ label: mode, kind: "positive" });
  }
  if (isRoyalMarchMapActive()) {
    const roleDefinition = getRoyalMarchRoleDefinition(player);
    list.push({ label: `${roleDefinition.icon} ${roleDefinition.label}`, kind: "positive" });
  }
  if (player.ownedFlag) list.push({ label: "🚩 Flag", kind: "warning" });
  if (isFoodCourtMapActive()) list.push({ label: `${player.foodSlot?.icon || "💬"} Food`, kind: player.foodSlot ? "positive" : "muted" });
  if (player.statuses.hiddenTurns > 0) list.push({ label: `🫥 Hidden ${player.statuses.hiddenTurns}`, kind: "positive" });
  if (player.activeCharacterId === "battler4") list.push({ label: `🐦‍⬛ Omen ${getCorvenOmenGauge(player)}%`, kind: "warning" });
  if ((Number(player.statuses?.corvenCurseTurns) || 0) > 0) list.push({ label: `🐦‍⬛ Cursed ${player.statuses.corvenCurseTurns}`, kind: "danger" });
  if ((Number(player.statuses?.corvenAutoHealTurns) || 0) > 0) list.push({ label: `🧪 Auto Heal ${player.statuses.corvenAutoHealTurns}`, kind: "positive" });
  const protectiveDetail = getHobbsProtectiveDetailState(player);
  if (protectiveDetail) {
    list.push({
      label: `🛡️ Guarding ${protectiveDetail.target === player ? "Self" : protectiveDetail.target.name} ${Math.max(0, Number(protectiveDetail.defenseHp) || 0)}/50`,
      kind: "positive"
    });
  }
  const guardedBy = getHobbsProtectiveCasterForTarget(player);
  if (guardedBy && guardedBy.id !== player.id) {
    const guardState = getHobbsProtectiveDetailState(guardedBy);
    list.push({ label: `🛡️ Protected ${Math.max(0, Number(guardState?.defenseHp) || 0)}/50`, kind: "positive" });
  }
  const battleProtect = getHobbsBattleProtectState(player);
  if (battleProtect) list.push({ label: `🛡️ Covering ${battleProtect.target === player ? "Self" : battleProtect.target.name}`, kind: "positive" });
  const battleProtectedBy = getHobbsBattleProtectCasterForTarget(player);
  if (battleProtectedBy && battleProtectedBy.id !== player.id) list.push({ label: "🛡️ Battle Protected", kind: "positive" });
  if (isBrakkPaintBombActive(player)) {
    const bomb = getBrakkPaintBomb(player);
    list.push({ label: `💣 Paint Bomb ${Math.max(0, Number(bomb?.storedPaint) || 0)}/6`, kind: "warning" });
  }
  const venom = getActiveVeskaVarnishForOwner(state.players.indexOf(player));
  if (venom) list.push({ label: `🕸️ Venom Varnish ${venom.remainingTurns}`, kind: "warning" });
  if (isMesmerSyncActiveFor(player)) list.push({ label: "🌀 Mesmer Sync 1 battle", kind: "positive" });
  if ((Number(player.statuses?.pushAheadRounds) || 0) > 0) list.push({ label: `Push Ahead ${player.statuses.pushAheadRounds}`, kind: "positive" });
  if (hasPushAheadDiceBoost(player) && player.activeCharacterId !== "supporter1") list.push({ label: "Inspired", kind: "positive" });
  if (isAffectedBySlowZone(player)) list.push({ label: "Move Limit", kind: "danger" });
  return list;
}

function renderStatPanelRow(player, statKey) {
  const maxValue = getCurrentMax(player, statKey);
  const value = player.currentStats[statKey];
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const fillClass = statKey === "attack" ? "attack" : statKey === "hp" ? "hp" : "technique";
  const icon = statKey === "attack" ? "⚔️" : statKey === "hp" ? "❤️" : "🧠";
  return `
    <div class="statRow ${fillClass}">
      <div class="statIcon">${icon}</div>
      <div class="statBar"><div class="statFill ${fillClass}" style="width:${percentage}%"></div></div>
      <div class="statValue">${value}/${maxValue}</div>
    </div>
  `;
}

function renderItemBadge(item) {
  const count = getStackCount(item);
  return count > 1 ? `<span class="itemStackBadge">x${count}</span>` : '';
}

function renderItemList(player) {
  const foodChip = isFoodCourtMapActive()
    ? `<span class="itemChip foodSlotChip ${player.foodSlot ? "" : "muted"}">Food: ${sanitize(player.foodSlot?.icon || "💬")} ${sanitize(player.foodSlot?.label || "Empty")}</span>`
    : "";
  const itemChips = player.items.length === 0
    ? `<span class="itemChip muted">No items</span>`
    : player.items.map((item) => `<span class="itemChip itemChipWithBadge">${item.icon} ${sanitize(item.name)}${renderItemBadge(item)}</span>`).join("");
  return `${foodChip}${itemChips}`;
}

function getOwnedTileCount(playerIndex) {
  if (!state.board || !state.board.length) return 0;
  return getPlayableBoardCells().reduce((count, cell) => count + (cell.owner === playerIndex && isScoringFieldCell(cell) ? 1 : 0), 0);
}

function getOriginalCharacterInfo(player, slot) {
  const index = slot === "main" ? 0 : 1;
  const charId = player.selectedCharacters[index];
  return characterLibrary[charId];
}

function renderCharacterSummaryCards(player) {
  const mainChar = getOriginalCharacterInfo(player, "main");
  const benchChar = getOriginalCharacterInfo(player, "bench");
  const mainUnavailable = !player.swapAvailable && player.selectedCharacters[0] !== player.activeCharacterId;
  const mainOnField = player.activeCharacterId === mainChar.id;
  const benchOnField = !!benchChar && player.activeCharacterId === benchChar.id;
  const cards = [
    {
      slot: "main",
      char: mainChar,
      onField: mainOnField,
      crossed: mainUnavailable
    }
  ];
  if (benchChar) {
    cards.push({
      slot: "bench",
      char: benchChar,
      onField: benchOnField,
      crossed: false
    });
  }

  return cards.map(({ slot, char, onField, crossed }) => `
    <button type="button" class="characterSummaryCard ${onField ? "is-active" : "is-inactive"} ${crossed ? "is-crossed" : ""}" data-character-slot="${slot}">
      <span class="characterSummaryIconWrap">
        <span class="characterSummaryIcon">${getCharacterIconMarkup(char, "characterIconAsset--card")}</span>
        ${crossed ? `<span class="characterSummaryCross">✕</span>` : ``}
      </span>
      <span class="characterSummaryName">${sanitize(char.name)}</span>
    </button>
  `).join("");
}

function bindExpandedCharacterButtons() {
  if (!ui.expandedPlayerPanel) return;
  Array.from(ui.expandedPlayerPanel.querySelectorAll("[data-character-slot]")).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const slot = button.dataset.characterSlot;
      state.ui.selectedCharacterInspect = {
        playerIndex: state.selectedPlayerSummaryIndex,
        slot
      };
      state.ui.rightPanelMode = "character";
      renderExpandablePanels();
    });
  });
}

function stableVisualString(value) {
  try {
    return JSON.stringify(value, (key, entry) => {
      if (entry instanceof Set) return Array.from(entry).sort();
      if (entry instanceof Map) return Array.from(entry.entries()).sort();
      if (typeof entry === "function") return undefined;
      return entry;
    }) || "";
  } catch (error) {
    return String(value ?? "");
  }
}


function getBoardStructuralSignature() {
  if (!state.board.length) return "empty";
  const cellParts = getPlayableBoardCells().map((cell) => {
    const groundItem = cell.groundItem
      ? `${cell.groundItem.id || ""}:${cell.groundItem.name || ""}:${cell.groundItem.icon || ""}`
      : "";
    const obstacle = cell.obstacle
      ? [
          cell.obstacle.id || "",
          cell.obstacle.hp ?? "",
          cell.obstacle.maxHp ?? "",
          cell.obstacle.allowedStat || "",
          cell.obstacle.dropItemId || "",
          cell.obstacle.skavaOwnerIndex ?? "",
          cell.obstacle.skavaProtectedOwnerEndsRemaining ?? ""
        ].join(":")
      : "";
    const pits = (cell.pits || [])
      .map((pit) => [pit.id, pit.ownerIndex, pit.remainingTurns, pit.passThrough ? 1 : 0].join(":"))
      .join(",");
    const zones = (cell.zones || [])
      .map((zone) => [zone.id, zone.ownerIndex, zone.center?.row, zone.center?.col, zone.enhanced ? 1 : 0].join(":"))
      .sort()
      .join(",");
    const cache = cell.skavaCache
      ? [cell.skavaCache.ownerIndex, cell.skavaCache.statKey, cell.skavaCache.specialType].join(":")
      : "";
    return [
      cell.row,
      cell.col,
      cell.playable ? 1 : 0,
      cell.startOwner ?? "",
      (cell.territoryIds || []).join(","),
      (cell.special || []).join(","),
      groundItem,
      obstacle,
      pits,
      zones,
      cache
    ].join("#");
  }).join("|");
  return [
    state.selectedMapId,
    getBoardRows(),
    getBoardCols(),
    isRoyalMarchMapActive() ? 1 : 0,
    isCentralDominionMapActive() ? 1 : 0,
    getSelectedMapDefinition()?.id || "",
    stableVisualString(state.brakkMissileEffects || []),
    stableVisualString(state.rascaTailImpactEffects || []),
    stableVisualString(state.veskaThreadEffects || []),
    stableVisualString(state.foodCourt || null),
    cellParts
  ].join("||");
}

function getBoardActorSignature() {
  const playerParts = (state.players || []).map((player, index) => ({
    id: player.id,
    name: player.name,
    index,
    activeCharacterId: player.activeCharacterId,
    position: player.position,
    ownedFlag: !!player.ownedFlag,
    foodSlot: player.foodSlot || null,
    currentStats: player.currentStats,
    maxStats: player.maxStats,
    statusSummary: player.statuses,
    teamKey: player.teamKey,
    defeated: !!player.defeated,
    eliminated: !!player.eliminated,
    originalMain: player.originalMainCharacterId,
    originalBench: player.originalBenchCharacterId
  }));
  return stableVisualString({
    currentPlayerIndex: state.currentPlayerIndex,
    gameOver: state.gameOver,
    setupActive: !!state.setupSelection.active,
    teamMode: state.matchMode,
    leading: isRoyalMarchMapActive() ? [] : getLeadingPlayerIndexes(),
    players: playerParts,
    rascaClones: state.rascaClones || [],
    hobbsTargetPrompt: state.ui.hobbsTargetPrompt || null,
    playerTargetPrompt: state.ui.playerTargetPrompt || null,
    rascaSnapbackPrompt: state.ui.rascaSnapbackPrompt || null,
    damageTextPopups: state.damageTextPopups || [],
    territoryPointPopups: state.territoryPointPopups || [],
    mimiGamblerRipples: state.mimiGamblerRipples || [],
    brakkExplosionEffects: state.brakkExplosionEffects || [],
    pipPopcornEffects: state.pipPopcornEffects || [],
    statLossPopups: state.statLossPopups || []
  });
}

function shouldRebuildBoard() {
  if (!state.board.length || !ui.board3d) return false;
  const playableCount = getPlayableBoardCells().length;
  if (state.tileElements.size !== playableCount) return true;
  if (!state.boardRenderSignature) return true;
  return state.boardRenderSignature !== getBoardStructuralSignature();
}

function removeClassPrefix(element, prefix) {
  if (!element) return;
  Array.from(element.classList).forEach((className) => {
    if (className.startsWith(prefix)) element.classList.remove(className);
  });
}

function applyBaseTileClasses(tile, cell) {
  if (!tile || !cell) return;
  removeClassPrefix(tile, "owner-");
  removeClassPrefix(tile, "paint-player-");
  tile.classList.remove(
    "royal-march-tile",
    "royal-light",
    "royal-dark",
    "royal-goal-row-blue",
    "royal-goal-row-red",
    "central-dominion-tile",
    "food-court-tile",
    "foodCourtTableTile",
    "foodCourtShopTile",
    "foodCourtHungryTile",
    "foodCourtPreparingTile",
    "foodCourtAssignedTable",
    "foodCourtUnusedTable",
    "start-base",
    "royal-king-start",
    "obstacle-target",
    "heal-hp",
    "heal-atk",
    "heal-tech",
    "territory-cell",
    "territory-contested",
    "territory-owned",
    "territory-neutral",
    "control-area-cell",
    "setup-dim",
    "setup-available",
    "tutorial-route",
    "tutorial-target"
  );

  if (isRoyalMarchMapActive()) {
    tile.classList.add("royal-march-tile", (cell.row + cell.col) % 2 === 0 ? "royal-light" : "royal-dark");
    if (cell.row === 0) tile.classList.add("royal-goal-row-blue");
    if (cell.row === getBoardRows() - 1) tile.classList.add("royal-goal-row-red");
  } else if (isCentralDominionMapActive()) {
    tile.classList.add("central-dominion-tile");
  }
  applyFoodCourtTileClasses(tile, cell);

  if (cell.owner !== null) tile.classList.add(`owner-${cell.owner}`);
  if (isRoyalMarchTutorialActive()) {
    const tutorialPathIndex = state.tutorial.moveTargetPath?.findIndex((point) => point.row === cell.row && point.col === cell.col) ?? -1;
    if (tutorialPathIndex > 0) tile.classList.add("tutorial-route");
    if (tutorialPathIndex === (state.tutorial.moveTargetPath?.length || 0) - 1) tile.classList.add("tutorial-target");
  }
  if (cell.startOwner !== null) {
    tile.classList.add("start-base");
    if (isRoyalMarchMapActive() && isRoyalMarchKing(cell.startOwner)) tile.classList.add("royal-king-start");
  }
  if (state.ui.obstaclePrompt && state.ui.obstaclePrompt.row === cell.row && state.ui.obstaclePrompt.col === cell.col) tile.classList.add("obstacle-target");
  if (cell.special.includes("heal-hp")) tile.classList.add("heal-hp");
  if (cell.special.includes("heal-atk")) tile.classList.add("heal-atk");
  if (cell.special.includes("heal-tech")) tile.classList.add("heal-tech");

  const primaryTerritory = getPrimaryTerritoryForCell(cell);
  if (primaryTerritory) {
    const territorySummary = getTerritoryStateSummary(primaryTerritory);
    tile.classList.add("territory-cell");
    if (territorySummary.contested) tile.classList.add("territory-contested");
    else if (territorySummary.soleOccupantKey) tile.classList.add("territory-owned");
    else tile.classList.add("territory-neutral");
    tile.style.setProperty("--territory-accent", getTerritoryVisualAccent(territorySummary));
    const badge = tile.querySelector(".territoryStatusBadge");
    if (isTerritoryCenterCell(cell, primaryTerritory)) {
      const nextBadgeHtml = renderTerritoryStatusBadgeHtml(primaryTerritory);
      if (badge) badge.outerHTML = nextBadgeHtml;
      else tile.querySelector(".tileTop")?.insertAdjacentHTML("afterbegin", nextBadgeHtml);
    } else if (badge) {
      badge.remove();
    }
  } else {
    tile.style.removeProperty("--territory-accent");
    tile.querySelector(".territoryStatusBadge")?.remove?.();
  }

  const isControlArea = isCellInControlArea(cell);
  if (isControlArea) {
    tile.classList.add("territory-cell", "territory-neutral", "control-area-cell");
    tile.style.setProperty("--territory-accent", "rgba(255, 216, 94, 0.96)");
  }

  if (state.setupSelection.active) {
    tile.classList.add("setup-dim");
    const isAvailableCorner = state.setupSelection.availableCorners.some((corner) => corner.row === cell.row && corner.col === cell.col);
    if (isAvailableCorner) tile.classList.add("setup-available");
    if (cell.startOwner !== null) {
      tile.classList.remove("setup-dim", "setup-available");
    }
  }

  applyTileTopVisual(tile);
}

function updateBoardTileVisuals() {
  getPlayableBoardCells().forEach((cell) => {
    const tile = state.tileElements.get(`${cell.row},${cell.col}`);
    if (!tile) return;
    applyBaseTileClasses(tile, cell);
  });
  refreshTileHighlights();
}

function removeBoardActorsAndTransientEffects() {
  state.avatarElements.forEach((avatar) => avatar?.remove?.());
  state.avatarElements.clear();
  state.damageTextElements.forEach((floater) => floater?.remove?.());
  state.damageTextElements.clear();
  state.territoryPointTextElements.forEach((floater) => floater?.remove?.());
  state.territoryPointTextElements.clear();
  if (!ui.board3d) return;
  ui.board3d
    .querySelectorAll(".rascaCloneBillboard, .hobbsProtectLine, .hobbsBattleProtectLine")
    .forEach((element) => element.remove());
}

function renderBoardActorsAndTransientEffects() {
  if (!ui.board3d) return;
  const leadingPlayerIndexes = isRoyalMarchMapActive() ? new Set() : new Set(getLeadingPlayerIndexes());

  (state.rascaClones || []).forEach((clone) => {
    const owner = state.players[clone.ownerIndex];
    if (!owner) return;
    const cloneElement = document.createElement("div");
    const snapbackSelected = !!(state.ui.rascaSnapbackPrompt && state.ui.rascaSnapbackPrompt.selectedId === clone.id);
    cloneElement.className = `rascaCloneBillboard player-${clone.ownerIndex}${clone.enhanced ? " is-enhanced" : ""}${snapbackSelected ? " is-rasca-target-selected" : ""}`;
    cloneElement.dataset.rascaCloneId = clone.id;
    cloneElement.style.transform = getAvatarTransform(clone.row, clone.col, clone.ownerIndex);
    cloneElement.innerHTML = `
      <div class="avatarBillboard">
        <div class="rascaCloneIcon"><img class="rascaTailIconImage" src="${sanitize(getCharacterIconAsset("trickster2", "tail"))}" alt="" aria-hidden="true"></div>
        <div class="rascaCloneHp">${renderObstacleMiniBar({ hp: Math.max(0, Math.ceil(clone.hp)), maxHp: Math.max(1, Math.ceil(clone.maxHp)) })}</div>
        ${clone.enhanced ? `<div class="rascaCloneAura">⚡</div>` : ""}
      </div>
    `;
    ui.board3d.appendChild(cloneElement);
  });

  state.players.forEach((player, index) => {
    if (!player.position) return;
    const avatar = document.createElement("div");
    const isSelectedPlayerTarget = !!(state.ui.playerTargetPrompt && state.ui.playerTargetPrompt.selectedId === player.id);
    avatar.className = `playerAvatar player-${index}${isSelectedPlayerTarget ? " is-player-target-selected" : ""}`;
    const isActiveTurnAvatar = !state.gameOver && !state.setupSelection.active && state.currentPlayerIndex === index;
    if (isActiveTurnAvatar) avatar.classList.add("awaiting-roll");
    const isHiddenFromField = player.statuses.hiddenTurns > 0 && !isCurrentPlayerViewingOwnHidden(index) && !shareCellWithAnyOtherPlayer(index);
    if (isHiddenFromField) avatar.classList.add("hiddenAvatar");
    avatar.style.transform = getAvatarTransform(player.position.row, player.position.col, index);

    const billboard = document.createElement("div");
    billboard.className = "avatarBillboard";
    const royalRoleDefinition = isRoyalMarchMapActive() ? getRoyalMarchRoleDefinition(player) : null;
    const guardedBy = getHobbsProtectiveCasterForTarget(player);
    const isProtectedByHobbs = !!guardedBy;
    const battleProtectedBy = getHobbsBattleProtectCasterForTarget(player);
    const hasBattleProtect = !!battleProtectedBy;
    const teamFlagBadge = isTeamModeEnabled()
      ? `<div class="avatarTeamFlagBadge" aria-label="${sanitize(getTeamDisplayLabel(player.teamKey || getPlayerTeamKey(index)))}"><span class="teamFlag team-${sanitize(player.teamKey || getPlayerTeamKey(index))}">⚑</span></div>`
      : "";
    billboard.innerHTML = `
      <div class="avatarIconGlyphWrap">
        ${buildMimiGamblerRippleHtml(player)}
        ${buildBrakkExplosionEffectHtml(player)}
        ${buildPipPopcornEffectHtml(player)}
        ${teamFlagBadge}
        ${buildFoodCourtAvatarFoodBadgeHtml(player)}
        <div class="avatarIconGlyph">${getPlayerCharacterIconMarkup(player, "characterIconAsset--avatar")}</div>
        ${royalRoleDefinition ? `<div class="avatarRoyalRoleIcon" aria-label="${sanitize(royalRoleDefinition.label)}">${sanitize(royalRoleDefinition.icon)}</div>` : ""}
        ${isBrakkPaintBombActive(player) ? `<div class="avatarBombStatusIcon" aria-label="Paint Bomb">💣</div>` : ""}
        ${leadingPlayerIndexes.has(index) ? `<div class="avatarLeaderCrown" aria-label="Current leader">👑</div>` : ""}
        ${(isProtectedByHobbs || hasBattleProtect) ? `
          <div class="hobbsShieldBadgeRow${isProtectedByHobbs && hasBattleProtect ? " is-double" : ""}">
            ${isProtectedByHobbs ? `<div class="hobbsShieldBadge is-silver" aria-label="Protected">&#128737;</div>` : ""}
            ${hasBattleProtect ? `<div class="hobbsShieldBadge is-gold" aria-label="Battle Protected">&#128737;</div>` : ""}
          </div>
        ` : ""}
      </div>
      ${player.ownedFlag ? `
        <div class="avatarFlagBadge" aria-label="Has Flag">
          <span class="avatarFlagBadgePole"></span>
          <span class="avatarFlagBadgeCloth"></span>
        </div>
      ` : ""}
      <div class="avatarLabel ${isHiddenFromField ? "hiddenLabel" : ""}">
        ${player.activeCharacterId === "tanker3" ? renderHobbsGuardBar(player) : ""}
        ${player.activeCharacterId === "battler4" ? renderCorvenOmenBar(player) : ""}
        ${["attack", "hp", "technique"].map((statKey) => renderMiniBar(player, statKey)).join("")}
      </div>
      ${isHiddenFromField ? "" : buildStatLossPopupHtml(player)}
    `;
    avatar.appendChild(billboard);
    state.avatarElements.set(player.id, avatar);
    ui.board3d.appendChild(avatar);
  });

  state.players.forEach((player, index) => {
    const detail = getHobbsProtectiveDetailState(player);
    if (!detail || detail.selfTarget || !player.position || !detail.target?.position) return;
    const from = getAvatarBoardPoint(player.position.row, player.position.col, index);
    const targetIndex = state.players.indexOf(detail.target);
    const to = getAvatarBoardPoint(detail.target.position.row, detail.target.position.col, targetIndex);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.max(0, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const line = document.createElement("div");
    line.className = "hobbsProtectLine";
    line.style.width = `${length}px`;
    line.style.transform = `translate3d(${from.x}px, ${from.y}px, 30px) rotate(${angle}deg)`;
    ui.board3d.appendChild(line);
  });
  state.players.forEach((player, index) => {
    const battleProtect = getHobbsBattleProtectState(player);
    if (!battleProtect || !player.position || !battleProtect.target?.position || battleProtect.target === player) return;
    const from = getAvatarBoardPoint(player.position.row, player.position.col, index);
    const targetIndex = state.players.indexOf(battleProtect.target);
    const to = getAvatarBoardPoint(battleProtect.target.position.row, battleProtect.target.position.col, targetIndex);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.max(0, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const line = document.createElement("div");
    line.className = "hobbsBattleProtectLine";
    line.style.width = `${length}px`;
    line.style.transform = `translate3d(${from.x}px, ${from.y}px, 30px) rotate(${angle}deg)`;
    ui.board3d.appendChild(line);
  });

  renderBoardDamageTextPopups();
  renderTerritoryPointPopups();
  updateAvatarBillboards();
}

function updateBoardVisualState() {
  if (!state.board.length || !ui.board3d) return;
  const width = getBoardCols() * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  const height = getBoardRows() * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  ui.board3d.style.width = `${width}px`;
  ui.board3d.style.height = `${height}px`;
  ui.board3d.style.marginLeft = `${-width / 2}px`;
  ui.board3d.style.marginTop = `${-height / 2}px`;
  applyCameraTransform();
  updateBoardTileVisuals();
  const nextActorSignature = getBoardActorSignature();
  if (state.boardActorSignature !== nextActorSignature) {
    removeBoardActorsAndTransientEffects();
    renderBoardActorsAndTransientEffects();
    state.boardActorSignature = nextActorSignature;
  } else {
    updateAvatarBillboards();
  }
}

function renderBoard() {
  if (!state.board.length) return;
  ui.board3d.innerHTML = "";
  state.tileElements.clear();
  state.avatarElements.clear();
  state.flagElements.clear();
  state.obstacleElements.clear();
  state.groundItemElements.clear();
  state.foodCourtServedFoodElements.clear();
  state.zoneElements.clear();
  state.damageTextElements.clear();
  state.territoryPointTextElements.clear();
  state.popcornEffectElements.clear();
  state.territoryElements.clear();

  const width = getBoardCols() * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  const height = getBoardRows() * (BOARD_SIZE + BOARD_GAP) - BOARD_GAP;
  ui.board3d.style.width = `${width}px`;
  ui.board3d.style.height = `${height}px`;
  ui.board3d.style.marginLeft = `${-width / 2}px`;
  ui.board3d.style.marginTop = `${-height / 2}px`;
  applyCameraTransform();

  getPlayableBoardCells().forEach((cell) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    if (isRoyalMarchMapActive()) {
      tile.classList.add("royal-march-tile", (cell.row + cell.col) % 2 === 0 ? "royal-light" : "royal-dark");
      if (cell.row === 0) tile.classList.add("royal-goal-row-blue");
      if (cell.row === getBoardRows() - 1) tile.classList.add("royal-goal-row-red");
    } else if (isCentralDominionMapActive()) {
      tile.classList.add("central-dominion-tile");
    }
    applyFoodCourtTileClasses(tile, cell);
    if (cell.owner !== null) tile.classList.add(`owner-${cell.owner}`);
    if (isRoyalMarchTutorialActive()) {
      const tutorialPathIndex = state.tutorial.moveTargetPath?.findIndex((point) => point.row === cell.row && point.col === cell.col) ?? -1;
      if (tutorialPathIndex > 0) tile.classList.add("tutorial-route");
      if (tutorialPathIndex === (state.tutorial.moveTargetPath?.length || 0) - 1) tile.classList.add("tutorial-target");
    }
    if (cell.startOwner !== null) {
      tile.classList.add("start-base");
      if (isRoyalMarchMapActive() && isRoyalMarchKing(cell.startOwner)) tile.classList.add("royal-king-start");
    }
    if (state.ui.obstaclePrompt && state.ui.obstaclePrompt.row === cell.row && state.ui.obstaclePrompt.col === cell.col) tile.classList.add('obstacle-target');
    if (cell.special.includes("heal-hp")) tile.classList.add("heal-hp");
    if (cell.special.includes("heal-atk")) tile.classList.add("heal-atk");
    if (cell.special.includes("heal-tech")) tile.classList.add("heal-tech");
    const primaryTerritory = getPrimaryTerritoryForCell(cell);
    if (primaryTerritory) {
      const territorySummary = getTerritoryStateSummary(primaryTerritory);
      tile.classList.add('territory-cell');
      if (territorySummary.contested) tile.classList.add('territory-contested');
      else if (territorySummary.soleOccupantKey) tile.classList.add('territory-owned');
      else tile.classList.add('territory-neutral');
      tile.style.setProperty('--territory-accent', getTerritoryVisualAccent(territorySummary));
    }
    const isControlArea = isCellInControlArea(cell);
    if (isControlArea) {
      tile.classList.add('territory-cell', 'territory-neutral', 'control-area-cell');
      tile.style.setProperty('--territory-accent', 'rgba(255, 216, 94, 0.96)');
    }

    const setupActive = state.setupSelection.active;
    if (setupActive) {
      tile.classList.add("setup-dim");
      const isAvailableCorner = state.setupSelection.availableCorners.some((corner) => corner.row === cell.row && corner.col === cell.col);
      if (isAvailableCorner) tile.classList.add("setup-available");
      if (cell.startOwner !== null) {
        tile.classList.remove("setup-dim", "setup-available");
      }
    }

    const position = getTileTransform(cell.row, cell.col, 0);
    tile.style.transform = position;
    tile.dataset.row = String(cell.row);
    tile.dataset.col = String(cell.col);

    const top = document.createElement("div");
    top.className = "tileTop";
    const side = document.createElement("div");
    side.className = "tileSide";
    const content = [];
    if (cell.special.includes("heal-hp")) content.push(`<span class="specialGlyph healGlyph">💗</span>`);
    if (cell.special.includes("heal-atk")) content.push(`<span class="specialGlyph atkGlyph">⚔️</span>`);
    if (cell.special.includes("heal-tech")) content.push(`<span class="specialGlyph techGlyph">🪄</span>`);
    content.push(buildFoodCourtTileContentHtml(cell));
    if (primaryTerritory && isTerritoryCenterCell(cell, primaryTerritory)) content.push(renderTerritoryStatusBadgeHtml(primaryTerritory));
    if (isControlArea) content.push(`<span class="territoryPreviewMark controlAreaMark">◆</span>`);
    content.push(buildBrakkMissileEffectHtml(cell.row, cell.col));
    content.push(buildRascaTailImpactEffectHtml(cell.row, cell.col));
    content.push(buildVeskaThreadEffectHtml(cell.row, cell.col));

    let flagElement = null;
    let groundItemElement = null;
    const servedFoodElement = createFoodCourtServedFoodElement(getFoodCourtTableAt(cell.row, cell.col));
    const visibleGroundItem = cell.groundItem || getFoodCourtReadyShopGroundItem(getFoodCourtShopAt(cell.row, cell.col));
    if (visibleGroundItem) {
      if (visibleGroundItem.id === "flag") {
        flagElement = document.createElement("span");
        flagElement.className = "flagBillboard";
        flagElement.setAttribute("aria-label", "Flag");
        flagElement.innerHTML = `
          <span class="flagBillboardPole"></span>
          <span class="flagBillboardCloth"></span>
          <span class="flagBillboardBase"></span>
        `;
      } else {
        groundItemElement = document.createElement("span");
        const itemId = sanitize(visibleGroundItem.id || "unknownItem");
        const itemLabel = sanitize(visibleGroundItem.name || "Item");
        groundItemElement.className = `groundItemBillboard groundItemBillboard--${itemId}`;
        groundItemElement.setAttribute("aria-label", itemLabel);
        groundItemElement.innerHTML = `
          <span class="groundItemBillboardInner">${sanitize(visibleGroundItem.icon || "*")}</span>
        `;
      }
    }
    top.innerHTML = content.join("");
    if (cell.pits.length) {
      const activePit = cell.pits[cell.pits.length - 1];
      const pitElement = document.createElement("span");
      pitElement.className = `pitMarker${activePit?.passThrough ? " is-pass-through" : ""}`;
      pitElement.setAttribute("aria-hidden", "true");
      pitElement.innerHTML = `
        <span class="pitMarkerOuter"></span>
        <span class="pitMarkerInner"></span>
        ${activePit?.passThrough ? '<span class="pitMarkerSpiral"></span>' : ''}
      `;
      top.appendChild(pitElement);
    }
    tile.append(top, side);
    applyTileTopVisual(tile);
    if (flagElement) {
      tile.append(flagElement);
      state.flagElements.add(flagElement);
    }
    if (groundItemElement) {
      tile.append(groundItemElement);
      state.groundItemElements.add(groundItemElement);
    }
    if (servedFoodElement) {
      tile.append(servedFoodElement);
      state.foodCourtServedFoodElements.add(servedFoodElement);
    }
    if (cell.obstacle) {
      const obstacleElement = document.createElement('span');
      obstacleElement.className = `obstacleBillboard obstacle-${cell.obstacle.id}`;
      obstacleElement.setAttribute('aria-label', cell.obstacle.name);
      const reinforcedClass = isSkavaBoulderProtected(cell.obstacle) ? " is-reinforced" : "";
      obstacleElement.innerHTML = `
        <span class="obstacleHpBar">${renderObstacleMiniBar(cell.obstacle)}</span>
        <span class="obstacleGlyphWrap${reinforcedClass}">
          <span class="obstacleRockGlyph">🪨</span>
          <span class="obstacleTypeGlyph">${cell.obstacle.icon}</span>
        </span>
      `;
      tile.append(obstacleElement);
      state.obstacleElements.add(obstacleElement);
    }
    tile.addEventListener("pointerup", onTilePointerUp);
    tile.addEventListener("click", onTileClick);

    const key = `${cell.row},${cell.col}`;
    state.tileElements.set(key, tile);
    ui.board3d.appendChild(tile);
  });

  const seenZoneVisuals = new Set();
  getPlayableBoardCells().forEach((cell) => {
    cell.zones.forEach((zone) => {
      if (seenZoneVisuals.has(zone.id)) return;
      seenZoneVisuals.add(zone.id);
      const zoneElement = document.createElement("div");
      zoneElement.className = `zoneVolume${zone.enhanced ? " is-enhanced" : ""}`;
      zoneElement.setAttribute("aria-hidden", "true");
      zoneElement.style.width = `${BOARD_SIZE * 3 + BOARD_GAP * 2}px`;
      zoneElement.style.height = `${BOARD_SIZE * 3 + BOARD_GAP * 2}px`;
      zoneElement.style.setProperty('--zone-height', `${zone.enhanced ? 72 : 62}px`);
      zoneElement.style.transform = getZoneTransform(zone.center.row, zone.center.col);
      zoneElement.innerHTML = `
        <span class="zoneVolumeFace zoneVolumeTop"></span>
        <span class="zoneVolumeFace zoneVolumeNorth"></span>
        <span class="zoneVolumeFace zoneVolumeSouth"></span>
        <span class="zoneVolumeFace zoneVolumeWest"></span>
        <span class="zoneVolumeFace zoneVolumeEast"></span>
      `;
      ui.board3d.appendChild(zoneElement);
      state.zoneElements.add(zoneElement);
    });
  });

  const leadingPlayerIndexes = isRoyalMarchMapActive() ? new Set() : new Set(getLeadingPlayerIndexes());

  (state.rascaClones || []).forEach((clone) => {
    const owner = state.players[clone.ownerIndex];
    if (!owner) return;
    const cloneElement = document.createElement("div");
    const snapbackSelected = !!(state.ui.rascaSnapbackPrompt && state.ui.rascaSnapbackPrompt.selectedId === clone.id);
    cloneElement.className = `rascaCloneBillboard player-${clone.ownerIndex}${clone.enhanced ? " is-enhanced" : ""}${snapbackSelected ? " is-rasca-target-selected" : ""}`;
    cloneElement.dataset.rascaCloneId = clone.id;
    cloneElement.style.transform = getAvatarTransform(clone.row, clone.col, clone.ownerIndex);
    cloneElement.innerHTML = `
      <div class="avatarBillboard">
        <div class="rascaCloneIcon"><img class="rascaTailIconImage" src="${sanitize(getCharacterIconAsset("trickster2", "tail"))}" alt="" aria-hidden="true"></div>
        <div class="rascaCloneHp">${renderObstacleMiniBar({ hp: Math.max(0, Math.ceil(clone.hp)), maxHp: Math.max(1, Math.ceil(clone.maxHp)) })}</div>
        ${clone.enhanced ? `<div class="rascaCloneAura">⚡</div>` : ""}
      </div>
    `;
    ui.board3d.appendChild(cloneElement);
  });

  state.players.forEach((player, index) => {
    if (!player.position) return;
    const avatar = document.createElement("div");
    const isSelectedPlayerTarget = !!(state.ui.playerTargetPrompt && state.ui.playerTargetPrompt.selectedId === player.id);
    avatar.className = `playerAvatar player-${index}${isSelectedPlayerTarget ? " is-player-target-selected" : ""}`;
    const isActiveTurnAvatar = !state.gameOver && !state.setupSelection.active && state.currentPlayerIndex === index;
    if (isActiveTurnAvatar) avatar.classList.add('awaiting-roll');
    const isHiddenFromField = player.statuses.hiddenTurns > 0 && !isCurrentPlayerViewingOwnHidden(index) && !shareCellWithAnyOtherPlayer(index);
    if (isHiddenFromField) avatar.classList.add("hiddenAvatar");
    avatar.style.transform = getAvatarTransform(player.position.row, player.position.col, index);

    const billboard = document.createElement("div");
    billboard.className = "avatarBillboard";
    const royalRoleDefinition = isRoyalMarchMapActive() ? getRoyalMarchRoleDefinition(player) : null;
    const guardedBy = getHobbsProtectiveCasterForTarget(player);
    const isProtectedByHobbs = !!guardedBy;
    const battleProtectedBy = getHobbsBattleProtectCasterForTarget(player);
    const hasBattleProtect = !!battleProtectedBy;
    const teamFlagBadge = isTeamModeEnabled()
      ? `<div class="avatarTeamFlagBadge" aria-label="${sanitize(getTeamDisplayLabel(player.teamKey || getPlayerTeamKey(index)))}"><span class="teamFlag team-${sanitize(player.teamKey || getPlayerTeamKey(index))}">⚑</span></div>`
      : "";
    billboard.innerHTML = `
      <div class="avatarIconGlyphWrap">
        ${buildMimiGamblerRippleHtml(player)}
        ${buildBrakkExplosionEffectHtml(player)}
        ${buildPipPopcornEffectHtml(player)}
        ${teamFlagBadge}
        ${buildFoodCourtAvatarFoodBadgeHtml(player)}
        <div class="avatarIconGlyph">${getPlayerCharacterIconMarkup(player, "characterIconAsset--avatar")}</div>
        ${royalRoleDefinition ? `<div class="avatarRoyalRoleIcon" aria-label="${sanitize(royalRoleDefinition.label)}">${sanitize(royalRoleDefinition.icon)}</div>` : ""}
        ${isBrakkPaintBombActive(player) ? `<div class="avatarBombStatusIcon" aria-label="Paint Bomb">💣</div>` : ""}
        ${leadingPlayerIndexes.has(index) ? `<div class="avatarLeaderCrown" aria-label="Current leader">👑</div>` : ""}
        ${(isProtectedByHobbs || hasBattleProtect) ? `
          <div class="hobbsShieldBadgeRow${isProtectedByHobbs && hasBattleProtect ? " is-double" : ""}">
            ${isProtectedByHobbs ? `<div class="hobbsShieldBadge is-silver" aria-label="Protected">&#128737;</div>` : ""}
            ${hasBattleProtect ? `<div class="hobbsShieldBadge is-gold" aria-label="Battle Protected">&#128737;</div>` : ""}
          </div>
        ` : ""}
      </div>
      ${player.ownedFlag ? `
        <div class="avatarFlagBadge" aria-label="Has Flag">
          <span class="avatarFlagBadgePole"></span>
          <span class="avatarFlagBadgeCloth"></span>
        </div>
      ` : ""}
      <div class="avatarLabel ${isHiddenFromField ? "hiddenLabel" : ""}">
        ${player.activeCharacterId === "tanker3" ? renderHobbsGuardBar(player) : ""}
        ${player.activeCharacterId === "battler4" ? renderCorvenOmenBar(player) : ""}
        ${["attack", "hp", "technique"].map((statKey) => renderMiniBar(player, statKey)).join("")}
      </div>
      ${isHiddenFromField ? "" : buildStatLossPopupHtml(player)}
    `;
    avatar.appendChild(billboard);
    state.avatarElements.set(player.id, avatar);
    ui.board3d.appendChild(avatar);
  });

  state.players.forEach((player, index) => {
    const detail = getHobbsProtectiveDetailState(player);
    if (!detail || detail.selfTarget || !player.position || !detail.target?.position) return;
    const from = getAvatarBoardPoint(player.position.row, player.position.col, index);
    const targetIndex = state.players.indexOf(detail.target);
    const to = getAvatarBoardPoint(detail.target.position.row, detail.target.position.col, targetIndex);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.max(0, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const line = document.createElement("div");
    line.className = "hobbsProtectLine";
    line.style.width = `${length}px`;
    line.style.transform = `translate3d(${from.x}px, ${from.y}px, 30px) rotate(${angle}deg)`;
    ui.board3d.appendChild(line);
  });
  state.players.forEach((player, index) => {
    const battleProtect = getHobbsBattleProtectState(player);
    if (!battleProtect || !player.position || !battleProtect.target?.position || battleProtect.target === player) return;
    const from = getAvatarBoardPoint(player.position.row, player.position.col, index);
    const targetIndex = state.players.indexOf(battleProtect.target);
    const to = getAvatarBoardPoint(battleProtect.target.position.row, battleProtect.target.position.col, targetIndex);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.max(0, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const line = document.createElement("div");
    line.className = "hobbsBattleProtectLine";
    line.style.width = `${length}px`;
    line.style.transform = `translate3d(${from.x}px, ${from.y}px, 30px) rotate(${angle}deg)`;
    ui.board3d.appendChild(line);
  });

  renderBoardDamageTextPopups();
  renderTerritoryPointPopups();
  updateAvatarBillboards();
  refreshTileHighlights();
  state.boardRenderSignature = getBoardStructuralSignature();
  state.boardActorSignature = getBoardActorSignature();
}

function rememberTurnCellOwner(cell) {
  if (!state.turnActionOrigin) return;
  const key = `${cell.row},${cell.col}`;
  if (!(key in state.turnActionOriginalOwners)) {
    state.turnActionOriginalOwners[key] = cell.owner;
  }
}

function resetTurnSelection() {
  const player = getCurrentPlayer();
  if (!player || !state.turnActionOrigin || !state.moveDie) return;

  Object.entries(state.turnActionOriginalOwners).forEach(([key, owner]) => {
    const [row, col] = key.split(",").map(Number);
    const cell = getCell(row, col);
    if (cell) cell.owner = owner;
  });

  player.position = { ...state.turnActionOrigin };
  state.selectedPath = [{ ...state.turnActionOrigin }];
  state.selectedPaintTargets = [];
  state.remainingMove = getCurrentTurnMoveAllowance();
  state.remainingPaint = getCurrentTurnPaintAllowance();
  state.currentAction = "move";
  renderAll();
}

function cancelPaintSelection() {
  if (state.currentAction !== "paint") return;
  state.selectedPaintTargets = [];
  state.remainingPaint = state.paintPhaseStartRemaining || 0;
  refreshTileHighlights();
  renderHud();
  renderControls();
}
function refreshTileHighlights() {
  const origin = state.selectedPath?.[0] || null;
  state.tileElements.forEach((tile, key) => {
    tile.classList.remove(
      "selectable",
      "highlight",
      "path",
      "move-origin",
      "paintTarget",
      "paint-player-0",
      "paint-player-1",
      "paint-player-2",
      "paint-player-3",
      "paint-player-4",
      "paint-player-5",
      "paint-player-6",
      "paint-player-7"
    );
    const [row, col] = key.split(",").map(Number);
    if (state.currentAction === "move") {
      if (isValidMoveSelection(row, col)) tile.classList.add("selectable");
      const pathIndex = state.selectedPath.findIndex((point) => point.row === row && point.col === col);
      if (pathIndex > 0) {
        tile.classList.add("path");
      }
    }
    if (state.currentAction === "paint") {
      if (isValidPaintSelection(row, col)) tile.classList.add("selectable");
      if (state.selectedPaintTargets.some((point) => point.row === row && point.col === col)) {
        tile.classList.add("paintTarget", `paint-player-${state.currentPlayerIndex}`);
      }
    }
    if (state.ui.skavaTargetPrompt) {
      const cell = getCell(row, col);
      const valid = state.ui.skavaTargetPrompt.type === "fieldCache"
        ? isValidSkavaFieldCacheCell(cell)
        : isValidSkavaBoulderCell(cell);
      if (valid) tile.classList.add("selectable");
    }
    applyTileTopVisual(tile);
  });
}

function renderObstacleMiniBar(obstacle) {
  const maxValue = Math.max(1, Number(obstacle.maxHp) || 1);
  const value = Math.max(0, Number(obstacle.hp) || 0);
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  return `
    <span class="miniBar obstacleMiniBar">
      <span class="miniFill hp" style="width:${percentage}%"></span>
      <span class="miniValue">${value}</span>
    </span>
  `;
}

function renderMiniBar(player, statKey) {
  const maxValue = getCurrentMax(player, statKey);
  const value = player.currentStats[statKey];
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const fillClass = statKey === "attack" ? "attack" : statKey === "hp" ? "hp" : "technique";
  return `
    <div class="miniBar">
      <div class="miniFill ${fillClass}" style="width:${percentage}%"></div>
      <div class="miniValue">${value}</div>
    </div>
  `;
}

function renderCorvenOmenBar(player) {
  const value = getCorvenOmenGauge(player);
  return `
    <div class="miniBar corvenOmenMiniBar">
      <div class="miniFill corven-omen" style="width:${value}%"></div>
      <div class="miniValue">${value}</div>
    </div>
  `;
}

function renderHobbsGuardBar(player) {
  const detail = getHobbsProtectiveDetailState(player);
  if (!detail) return "";
  const value = Math.max(0, Number(detail.defenseHp) || 0);
  const percentage = Math.max(0, Math.min(100, (value / 50) * 100));
  return `
    <div class="miniBar hobbsGuardMiniBar">
      <div class="miniFill hobbs-guard" style="width:${percentage}%"></div>
      <div class="miniValue">${value}</div>
    </div>
  `;
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function renderBattleIntroBars(player) {
  return ["attack", "hp", "technique"].map((statKey) => renderMiniBar(player, statKey)).join("");
}

async function playBattleIntro(attacker, defender) {
  if (!ui.battleIntroOverlay) return;

  state.battleIntroRunning = true;
  ui.battleIntroLeftBars.innerHTML = renderBattleIntroBars(attacker);
  ui.battleIntroRightBars.innerHTML = renderBattleIntroBars(defender);
  ui.battleIntroLeftIcon.innerHTML = getPlayerCharacterIconMarkup(attacker, "characterIconAsset--battleIntro");
  ui.battleIntroRightIcon.innerHTML = getPlayerCharacterIconMarkup(defender, "characterIconAsset--battleIntro");
  ui.battleIntroLeftName.textContent = attacker.name;
  ui.battleIntroRightName.textContent = defender.name;

  const leftPanel = ui.battleIntroOverlay.querySelector('.battleIntroPanelLeft');
  const rightPanel = ui.battleIntroOverlay.querySelector('.battleIntroPanelRight');
  if (leftPanel) leftPanel.setAttribute('style', buildBattlePanelStyle(attacker, 'left', false));
  if (rightPanel) rightPanel.setAttribute('style', buildBattlePanelStyle(defender, 'right', false));
  const center = ui.battleIntroOverlay.querySelector('.battleIntroCenter');
  if (center) {
    center.style.setProperty('--battle-divider-left', getBattlePalette(attacker).accent);
    center.style.setProperty('--battle-divider-right', getBattlePalette(defender).accent);
  }

  ui.boardWrap.classList.add("battleIntroActive");
  ui.battleIntroOverlay.classList.remove("hidden");
  ui.battleIntroOverlay.classList.remove("is-settled", "is-outro");

  // reflow so the entrance animation always starts from the initial state
  void ui.battleIntroOverlay.offsetWidth;
  ui.battleIntroOverlay.classList.add("is-visible");

  await wait(720);
  ui.battleIntroOverlay.classList.add("is-settled");
  await wait(2000);
  ui.battleIntroOverlay.classList.add("is-outro");
  await wait(720);

  ui.battleIntroOverlay.classList.remove("is-visible", "is-settled", "is-outro");
  ui.battleIntroOverlay.classList.add("hidden");
  ui.boardWrap.classList.remove("battleIntroActive");
  state.battleIntroRunning = false;
}

function getTileTransform(row, col, z = 0) {
  const x = col * (BOARD_SIZE + BOARD_GAP);
  const y = row * (BOARD_SIZE + BOARD_GAP);
  return `translate3d(${x}px, ${y}px, ${z}px)`;
}

function getAvatarTransform(row, col, playerIndex) {
  const offsetX = col * (BOARD_SIZE + BOARD_GAP) + 10 + (playerIndex === 1 ? 10 : 0);
  const offsetY = row * (BOARD_SIZE + BOARD_GAP) + 10 + (playerIndex === 1 ? 6 : 0);
  return `translate3d(${offsetX}px, ${offsetY}px, 32px)`;
}

function getAvatarBoardPoint(row, col, playerIndex) {
  return {
    x: col * (BOARD_SIZE + BOARD_GAP) + 24 + (playerIndex === 1 ? 10 : 0),
    y: row * (BOARD_SIZE + BOARD_GAP) + 24 + (playerIndex === 1 ? 6 : 0)
  };
}

function getZoneTransform(row, col) {
  const size = BOARD_SIZE * 3 + BOARD_GAP * 2;
  const centerX = col * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  const centerY = row * (BOARD_SIZE + BOARD_GAP) + BOARD_SIZE / 2;
  return `translate3d(${centerX - size / 2}px, ${centerY - size / 2}px, 10px)`;
}

function updateAvatarBillboards() {
  state.avatarElements.forEach((avatar) => {
    const billboard = avatar.querySelector(".avatarBillboard");
    if (!billboard) return;
    const returnHeight = Number(avatar.dataset.returnHeight) || 0;
    const lift = returnHeight > 0 ? `translateZ(${returnHeight}px) ` : "";
    billboard.style.transform = `${lift}rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  document.querySelectorAll(".rascaCloneBillboard .avatarBillboard").forEach((billboard) => {
    billboard.style.transform = `rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  state.flagElements.forEach((flag) => {
    if (!flag || !flag.style) return;
    flag.style.transform = `translate(-50%, -82%) translateZ(12px) rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  state.obstacleElements.forEach((obstacle) => {
    if (!obstacle || !obstacle.style) return;
    obstacle.style.transform = `translate(-50%, -88%) translateZ(24px) rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  state.groundItemElements.forEach((item) => {
    if (!item || !item.style) return;
    item.style.transform = `translate(-50%, -82%) translateZ(20px) rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  state.foodCourtServedFoodElements.forEach((item) => {
    if (!item || !item.style) return;
    item.style.transform = `translate(-50%, -108%) translateZ(30px) rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  state.damageTextElements.forEach((floater) => {
    const facing = floater?.querySelector?.('.damageTextFacing');
    if (!facing || !facing.style) return;
    facing.style.transform = `translate(-50%, -90%) rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
  state.territoryPointTextElements.forEach((floater) => {
    const facing = floater?.querySelector?.('.territoryPointTextFacing');
    if (!facing || !facing.style) return;
    facing.style.transform = `translate(-50%, -112%) rotateZ(${-state.camera.yaw}deg) rotateX(${-state.camera.tilt}deg)`;
  });
}

function clampCameraPan() {
  const maxPanX = 170 + Math.max(0, (state.camera.zoom - 1) * 130);
  const maxPanY = 130 + Math.max(0, (state.camera.zoom - 1) * 100);
  state.camera.panX = Math.max(-maxPanX, Math.min(maxPanX, state.camera.panX));
  state.camera.panY = Math.max(-maxPanY, Math.min(maxPanY, state.camera.panY));
}

function applyCameraTransform() {
  clampCameraPan();
  ui.board3d.style.transform = `translate3d(${state.camera.panX}px, ${state.camera.panY}px, 0) scale(${state.camera.zoom}) rotateX(${state.camera.tilt}deg) rotateZ(${state.camera.yaw}deg)`;
  updateAvatarBillboards();
}

function getFullscreenTarget() {
  return document.documentElement;
}

function isFullscreenActive() {
  return !!document.fullscreenElement;
}

function updateFullscreenButton() {
  const fullscreenActive = isFullscreenActive();
  if (ui.fullscreenButton) {
    ui.fullscreenButton.classList.toggle("active", fullscreenActive);
    ui.fullscreenButton.textContent = fullscreenActive ? "🡼" : "⛶";
  }
  document.querySelectorAll("[data-setup-fullscreen]").forEach((button) => {
    button.classList.toggle("active", fullscreenActive);
    button.textContent = fullscreenActive ? "🡼" : "⛶";
  });
}

async function toggleFullscreen() {
  const target = getFullscreenTarget();
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (target.requestFullscreen) {
      await target.requestFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen toggle failed", error);
  } finally {
    updateFullscreenButton();
  }
}

function getTwoPointerDistance(pointerMap) {
  const points = Array.from(pointerMap.values());
  if (points.length < 2) return 0;
  return Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
}

function beginPinchZoom() {
  state.camera.pinchActive = true;
  state.camera.dragging = false;
  state.camera.pointerId = null;
  state.camera.pinchStartDistance = getTwoPointerDistance(state.camera.activePointers) || 1;
  state.camera.pinchStartZoom = state.camera.zoom;
  state.camera.suppressTileClickUntil = performance.now() + 260;
}

function updatePinchZoom() {
  if (!state.camera.pinchActive || state.camera.activePointers.size < 2) return;
  const currentDistance = getTwoPointerDistance(state.camera.activePointers);
  if (!currentDistance || !state.camera.pinchStartDistance) return;
  const ratio = currentDistance / state.camera.pinchStartDistance;
  state.camera.zoom = Math.max(0.4, Math.min(1.6, state.camera.pinchStartZoom * ratio));
  applyCameraTransform();
  renderZoomDock();
}

function handleTileSelection(row, col) {
  if (multiplayer.session.isRoomPlay && !multiplayer.session.isHost) {
    if (state.setupSelection.active) {
      if (state.setupSelection.currentPlayerIndex === getLocalPlayerSlot()) {
        sendHubAction(HUB_ACTION_TYPES.SELECT_TILE, { row, col });
      }
      return;
    }
    if ((state.currentAction === "move" || state.currentAction === "paint") && isLocalRoomPlayerTurn()) {
      sendHubAction(HUB_ACTION_TYPES.SELECT_TILE, { row, col });
      return;
    }
  }
  if (multiplayer.session.isRoomPlay && multiplayer.session.isHost) {
    if (state.setupSelection.active && state.setupSelection.currentPlayerIndex !== getLocalPlayerSlot()) return;
    if ((state.currentAction === "move" || state.currentAction === "paint") && !isLocalRoomPlayerTurn()) return;
  }
  if (state.ui.skavaTargetPrompt) {
    if (resolveSkavaTargetTileSelection(row, col)) return;
  }
  if (state.movementAnimating || isInteractionPromptBlocking()) return;
  if (performance.now() < state.camera.suppressTileClickUntil) return;

  if (state.setupSelection.active) {
    const selectedCorner = state.setupSelection.availableCorners.find((corner) => corner.row === row && corner.col === col);
    if (selectedCorner && typeof state.setupSelection.resolve === "function") {
      state.setupSelection.resolve(selectedCorner);
    }
    return;
  }

  if (state.currentAction === "move") {
    updateMovePathSelection(row, col);
  } else if (state.currentAction === "paint") {
    updatePaintSelection(row, col);
  } else {
    state.ui.selectedTileInspect = { row, col };
    state.ui.selectedCharacterInspect = null;
    state.ui.selectedItemIndex = null;
    state.ui.rightPanelMode = "tile";
    renderExpandablePanels();
  }
}

function onTilePointerUp(event) {
  if (event.pointerType === "mouse") return;
  if (state.camera.pinchActive || state.camera.activePointers.size > 1) return;
  if (state.camera.dragging && state.camera.pointerId === event.pointerId && state.camera.moved) return;
  const tile = event.currentTarget;
  const row = Number(tile.dataset.row);
  const col = Number(tile.dataset.col);
  state.camera.lastTilePointerSelectionAt = performance.now();
  event.preventDefault();
  handleTileSelection(row, col);
}

function onTileClick(event) {
  if (performance.now() - (state.camera.lastTilePointerSelectionAt || 0) < 350) return;
  const row = Number(event.currentTarget.dataset.row);
  const col = Number(event.currentTarget.dataset.col);
  handleTileSelection(row, col);
}

function getViewportTileAtPoint(clientX, clientY, { setupOnly = false } = {}) {
  let best = null;
  let bestDistance = Infinity;
  state.tileElements.forEach((tile) => {
    if (!tile || (setupOnly && !tile.classList.contains("setup-available"))) return;
    const rect = tile.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const hitSlop = setupOnly ? 10 : 4;
    const inside = clientX >= rect.left - hitSlop
      && clientX <= rect.right + hitSlop
      && clientY >= rect.top - hitSlop
      && clientY <= rect.bottom + hitSlop;
    if (!inside) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(clientX - centerX, clientY - centerY);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = tile;
    }
  });
  return best;
}

function handleBoardTilePointSelection(event) {
  if (!state.setupSelection.active) return false;
  if (state.camera.pinchActive || state.camera.activePointers.size > 1 || state.camera.moved) return false;
  if (performance.now() < state.camera.suppressTileClickUntil) return false;
  const target = event.target;
  if (target?.closest?.(".tile")) return false;
  const frameRect = ui.cameraFrame?.getBoundingClientRect?.();
  if (!frameRect) return false;
  const { clientX, clientY } = event;
  if (clientX < frameRect.left || clientX > frameRect.right || clientY < frameRect.top || clientY > frameRect.bottom) return false;
  const tile = getViewportTileAtPoint(clientX, clientY, { setupOnly: true });
  if (!tile) return false;
  state.camera.lastTilePointerSelectionAt = performance.now();
  event.preventDefault();
  event.stopPropagation();
  handleTileSelection(Number(tile.dataset.row), Number(tile.dataset.col));
  return true;
}

function updateMovePathSelection(row, col) {
  if (!isValidMoveSelection(row, col)) return;
  const path = state.selectedPath;
  const existingIndex = path.findIndex((point, index) => index > 0 && point.row === row && point.col === col);
  if (existingIndex >= 0) {
    path.splice(existingIndex + 1);
  } else if (isRoyalMarchMapActive()) {
    const candidatePath = buildRoyalMarchCandidatePath(row, col);
    state.selectedPath = candidatePath ? candidatePath.map((point) => ({ ...point })) : path;
  } else {
    path.push({ row, col });
  }
  state.remainingMove = Math.max(0, getCurrentTurnMoveAllowance() - (state.selectedPath.length - 1));
  state.remainingPaint = Math.max(0, getCurrentTurnPaintAllowance() - countUnownedCellsInPath(state.selectedPath));
  refreshTileHighlights();
  renderHud();
  renderControls();
}

function countUnownedCellsInPath(path) {
  if (isMoppetEmergencyCalloutActive(getCurrentPlayer())) return 0;
  const playerIndex = state.currentPlayerIndex;
  return path.slice(1).filter((point) => {
    const cell = getCell(point.row, point.col);
    return cell.owner === null && canPlayerRepaintCell(playerIndex, cell);
  }).length;
}

function canRoyalMarchKingEnterCell(cell, playerIndex) {
  if (!cell) return false;
  if (isFriendlyOwner(cell.owner, playerIndex)) return true;
  if (!isRoyalMarchEnemyBackRankTile(playerIndex, cell.row, cell.col)) return false;
  return cell.owner === null;
}

function buildRoyalMarchLinePath(path, row, col) {
  const origin = path[0];
  const dx = Math.sign(row - origin.row);
  const dy = Math.sign(col - origin.col);
  const rowDistance = Math.abs(row - origin.row);
  const colDistance = Math.abs(col - origin.col);
  const role = getRoyalMarchRoleForPlayer(state.currentPlayerIndex);
  const straight = rowDistance === 0 || colDistance === 0;
  const diagonal = rowDistance === colDistance;
  if (role === "rook" && !straight) return null;
  if (role === "bishop" && !diagonal) return null;
  if (role === "queen" && !straight && !diagonal) return null;
  const distance = Math.max(rowDistance, colDistance);
  if (distance < 1 || distance > getCurrentTurnMoveAllowance()) return null;
  const built = [origin];
  for (let step = 1; step <= distance; step += 1) {
    built.push({ row: origin.row + dx * step, col: origin.col + dy * step });
  }
  return built;
}

function buildRoyalMarchKnightPath(path, row, col) {
  const last = path[path.length - 1];
  const rowDistance = Math.abs(row - last.row);
  const colDistance = Math.abs(col - last.col);
  if (!((rowDistance === 2 && colDistance === 1) || (rowDistance === 1 && colDistance === 2))) return null;
  return [...path, { row, col }];
}

function buildRoyalMarchKingPath(path, row, col) {
  const last = path[path.length - 1];
  if (Math.max(Math.abs(last.row - row), Math.abs(last.col - col)) !== 1) return null;
  return [...path, { row, col }];
}

function buildRoyalMarchCandidatePath(row, col) {
  const path = state.selectedPath || [];
  if (!isRoyalMarchMapActive() || state.currentAction !== "move" || !path.length) return null;
  const role = getRoyalMarchRoleForPlayer(state.currentPlayerIndex);
  if (role === "king") return buildRoyalMarchKingPath(path, row, col);
  if (role === "knight") return buildRoyalMarchKnightPath(path, row, col);
  return path.length === 1 ? buildRoyalMarchLinePath(path, row, col) : null;
}

function isValidRoyalMarchMovePath(candidatePath) {
  if (!Array.isArray(candidatePath) || candidatePath.length < 2) return false;
  if (candidatePath.length - 1 > getCurrentTurnMoveAllowance()) return false;
  const playerIndex = state.currentPlayerIndex;
  const role = getRoyalMarchRoleForPlayer(playerIndex);
  const seen = new Set();
  for (const point of candidatePath) {
    const key = `${point.row},${point.col}`;
    if (seen.has(key)) return false;
    seen.add(key);
    const cell = getCell(point.row, point.col);
    if (!cell) return false;
    if (point !== candidatePath[0] && !canPlayerEnterMapCell(getCurrentPlayer(), cell)) return false;
    if (cell.obstacle) return true;
    if (role === "king" && point !== candidatePath[0] && !canRoyalMarchKingEnterCell(cell, playerIndex)) return false;
  }
  return countUnownedCellsInPath(candidatePath) <= getCurrentTurnPaintAllowance();
}

function isValidMoveSelection(row, col) {
  if (state.currentAction !== "move") return false;
  const path = state.selectedPath;
  if (!path.length) return false;
  const existingIndex = path.findIndex((point, index) => index > 0 && point.row === row && point.col === col);
  if (existingIndex >= 0) return true;
  if (isRoyalMarchMapActive()) {
    return isValidRoyalMarchMovePath(buildRoyalMarchCandidatePath(row, col));
  }
  const last = path[path.length - 1];
  const rowDistance = Math.abs(last.row - row);
  const colDistance = Math.abs(last.col - col);
  const orthogonalStep = rowDistance + colDistance === 1;
  const diagonalStep = canTorgaUseCragstep(getCurrentPlayer()) && rowDistance === 1 && colDistance === 1;
  if (!orthogonalStep && !diagonalStep) {
    return false;
  }

  const candidatePath = [...path, { row, col }];
  const moveLength = candidatePath.length - 1;
  if (moveLength > getCurrentTurnMoveAllowance()) return false;
  const paintCost = countUnownedCellsInPath(candidatePath);
  if (paintCost > getCurrentTurnPaintAllowance()) return false;
  const cell = getCell(row, col);
  if (!cell) return false;
  if (!canPlayerEnterMapCell(getCurrentPlayer(), cell)) return false;
  if (cell.obstacle) return true;
  return true;
}

function hasAnyValidMoveSelection() {
  if (state.currentAction !== "move") return false;
  return getPlayableBoardCells().some((cell) => isValidMoveSelection(cell.row, cell.col));
}

function canSkipMovePhaseBecauseBlocked() {
  if (state.currentAction !== "move") return false;
  if ((state.selectedPath?.length || 0) !== 1) return false;
  return !hasAnyValidMoveSelection();
}

function parseTranslate3d(transformText) {
  const match = /translate3d\(([-\d.]+)px,\s*([-\d.]+)px,\s*([-\d.]+)px\)/.exec(transformText || "");
  if (!match) return { x: 0, y: 0, z: 0 };
  return { x: Number(match[1]), y: Number(match[2]), z: Number(match[3]) };
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function getComputerObstaclePromptResponse(player, cell) {
  const obstacle = cell?.obstacle;
  if (!player || !obstacle) return { type: 'cancel' };
  const allowedStat = obstacle.allowedStat;
  const available = Math.max(0, Number(player.currentStats?.[allowedStat]) || 0);
  const required = Math.max(0, Number(obstacle.hp) || 0);
  if (available < required || required <= 0) return { type: 'cancel' };
  return {
    type: 'damage',
    values: {
      attack: allowedStat === 'attack' ? required : 0,
      hp: allowedStat === 'hp' ? required : 0,
      technique: allowedStat === 'technique' ? required : 0
    }
  };
}

function showObstaclePrompt(player, cell) {
  return new Promise((resolve) => {
    if (isComputerPlayer(player)) {
      resolve(getComputerObstaclePromptResponse(player, cell));
      return;
    }
    state.ui.obstaclePrompt = {
      playerId: player.id,
      row: cell.row,
      col: cell.col,
      values: { attack: 0, hp: 0, technique: 0 },
      collapsed: false,
      resolve
    };
    renderAll();
  });
}

function getObstacleDropItem(dropItemId) {
  return cloneItemForInventory(dropItemId);
}

async function distributeObstacleDrop(dropItemId, breaker, cell) {
  const drop = getObstacleDropItem(dropItemId);
  if (!drop) return;
  await animatePowerShardDrop(cell.row, cell.col);
  let nearbyPlayers = getCellPlayersInRange(cell.row, cell.col, 1);
  const withCapacity = nearbyPlayers.filter((candidate) => canReceiveInventoryItem(candidate, drop));
  let receiver = null;
  if (withCapacity.length) {
    if (withCapacity.includes(breaker)) {
      receiver = breaker;
    } else {
      receiver = randomChoice(withCapacity);
    }
  }
  if (receiver) {
    await animatePowerShardCollect(cell.row, cell.col, receiver);
    addItemToInventory(receiver, drop);
    showPowerShardPickupBanner(receiver);
    log(`${receiver.name} picked up ${drop.name}.`, true);
    return;
  }
  cell.groundItem = drop;
  log(`${drop.name} stayed in place.`, true);
}

async function handleObstacleAtStep(player, cell) {
  const obstacle = cell?.obstacle;
  if (!obstacle) return { type: 'destroyed' };
  const response = await showObstaclePrompt(player, cell);
  if (!response || response.type === 'cancel') {
    log(`${player.name} stopped in front of ${obstacle.name}.`, true);
    return { type: 'stop-for-paint' };
  }
  const values = response.values || { attack: 0, hp: 0, technique: 0 };
  const allowedStat = obstacle.allowedStat;
  const amount = Math.max(0, Number(values[allowedStat]) || 0);
  if (amount <= 0) {
    log(`${player.name} did not damage ${obstacle.name}.`, true);
    return { type: 'stop-for-paint' };
  }
  if (!spendStatExact(player, allowedStat, amount)) {
    return { type: 'stop-for-paint' };
  }
  const { actualDamage, destroyed } = applyObstacleDamageState(cell, obstacle, amount);
  log(`${player.name} dealt ${actualDamage} damage to ${obstacle.name}.`, true);
  if (!destroyed) {
    renderAll();
    return { type: 'stop-for-paint' };
  }
  const dropItemId = obstacle.dropItemId;
  cell.obstacle = null;
  renderAll();
  if (player.activeCharacterId === "painter1" && amount > 0) {
    if (isComputerPlayer(player)) {
      const statKey = chooseComputerGroundskeeperStat(player);
      const restored = restoreStat(player, statKey, 5);
      log(`${player.name} restored ${restored} ${statLabel(statKey)} with Groundskeeper’s Habit.`, true);
    } else {
      await chooseStatIconModal(player, "Groundskeeper’s Habit", "Choose a stat to restore after breaking the obstacle.", (statKey) => {
        const restored = restoreStat(player, statKey, 5);
        log(`${player.name} restored ${restored} ${statLabel(statKey)} with Groundskeeper’s Habit.`, true);
      });
    }
  }
  if (dropItemId) await distributeObstacleDrop(dropItemId, player, cell);
  renderAll();
  if (isTutorialActive() && getTutorialStep() === 6 && state.players.indexOf(player) === 0) {
    setTimeout(() => showTutorialModal('Obstacle cleared', 'Great. Broken obstacles can open the route to important spaces and may drop items. Next you will use a recovery tile.', () => prepareTutorialHealStep()), 200);
  }
  return { type: 'destroyed' };
}

async function animateAvatarHopStep(player, fromPoint, toPoint) {
  const playerIndex = state.players.indexOf(player);
  const avatar = state.avatarElements.get(player.id);
  if (!avatar) {
    player.position = { ...toPoint };
    renderAll();
    await wait(220);
    return;
  }

  const fromTransform = getAvatarTransform(fromPoint.row, fromPoint.col, playerIndex);
  const toTransform = getAvatarTransform(toPoint.row, toPoint.col, playerIndex);
  const from = parseTranslate3d(fromTransform);
  const to = parseTranslate3d(toTransform);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const jumpHeight = Math.max(from.z, to.z) + 18;
  const midTransform = `translate3d(${midX}px, ${midY}px, ${jumpHeight}px)`;

  avatar.style.transform = fromTransform;
  const animation = avatar.animate([
    { transform: fromTransform, offset: 0 },
    { transform: midTransform, offset: 0.45 },
    { transform: toTransform, offset: 1 }
  ], {
    duration: 360,
    easing: 'cubic-bezier(0.22, 0.7, 0.2, 1)',
    fill: 'forwards'
  });
  await animation.finished.catch(() => {});
  player.position = { ...toPoint };
  renderAll();
}

async function resolveMovementStepEvents(player, previousPoint, point, isFinal) {
  const cell = getCell(point.row, point.col);
  getThreateningVeskaVarnishes(player, cell).forEach((effect) => {
    applyVeskaVenomLoss(player, effect, 2, "crossing allied paint");
  });
  if (isPlayerReturningToStart(player)) {
    renderAll();
    return { type: 'turn-end' };
  }
  refreshZoneEntryPromptState(player);
  const threateningEnhancedZone = getThreateningEnhancedZonesAtPoint(player, point)[0];
  if (threateningEnhancedZone && !isPointInsideZone(previousPoint, threateningEnhancedZone)) {
    const disarmedZone = await maybePromptZoneEntryDisarm(player, threateningEnhancedZone);
    const stillAffectedByEnteredZone = isPointInsideZone(point, threateningEnhancedZone)
      && threateningEnhancedZone.enhanced
      && !player.statuses.slowZoneImmunity.has(threateningEnhancedZone.id);
    player.turnFlags.forcedMoveLimit = isAffectedBySlowZone(player);
    if (!disarmedZone && stillAffectedByEnteredZone && !isFinal) {
      return { type: 'stop-for-paint' };
    }
  }
  if (!isFinal) {
    await maybeCollectFoodCourtGeneralStoreShardOnPass(player, cell);
  }

  const playerIndex = state.players.indexOf(player);
    const pit = cell.pits.find((candidate) => !isFriendlyOwner(candidate.ownerIndex, playerIndex) && (candidate.passThrough || isFinal));
  if (!pit) return { type: 'continue' };

  triggerPit(player, cell, pit);
  renderAll();
  if (player.position.row === player.startPosition.row && player.position.col === player.startPosition.col) {
    return { type: 'turn-end' };
  }
  return { type: 'continue' };
}

async function animateMoveAlongSelectedPath(player, path) {
  const traversed = [];
  const steps = path.slice(1);
  const suppressMovePaint = isMoppetEmergencyCalloutActive(player);
  const playerIndex = state.currentPlayerIndex;
  for (let index = 0; index < steps.length; index += 1) {
    const point = steps[index];
    const fromPoint = player.position ? { ...player.position } : { ...path[0] };
    const cell = getCell(point.row, point.col);

    if (cell.obstacle) {
      const obstacleOutcome = await handleObstacleAtStep(player, cell);
      if (obstacleOutcome.type === 'stop-for-paint') {
        return { interrupted: 'obstacle-stop', traversed };
      }
      if (obstacleOutcome.type !== 'destroyed') {
        return { interrupted: 'turn-end', traversed };
      }
    }

    if (!suppressMovePaint && cell.owner === null && canPlayerRepaintCell(playerIndex, cell)) {
      rememberTurnCellOwner(cell);
      cell.owner = playerIndex;
      addMimiCoins(player, 1, "painting");
      if (maybeFinishControlAreaWin()) {
        return { interrupted: 'turn-end', traversed };
      }
    }
    renderAll();
    await animateAvatarHopStep(player, fromPoint, point);
    traversed.push({ ...point });
    const stepOutcome = await resolveMovementStepEvents(player, fromPoint, point, index === steps.length - 1);
    if (stepOutcome.type !== 'continue') {
      return { interrupted: stepOutcome.type, traversed };
    }
  }
  return { interrupted: null, traversed };
}

async function confirmMovePhase() {
  if (state.currentAction !== "move" || state.movementAnimating || isInteractionPromptBlocking()) return;
  const player = getCurrentPlayer();
  const finalPoint = state.selectedPath[state.selectedPath.length - 1];
  const remainingPaintAfterMove = Math.max(0, state.remainingPaint);

  state.movementAnimating = true;
  state.remainingMove = 0;
  state.remainingPaint = remainingPaintAfterMove;
  renderHud();
  renderControls();

  const moveResult = await animateMoveAlongSelectedPath(player, state.selectedPath);
  state.movementAnimating = false;
  recordCurrentTurnNormalMoveDistance((moveResult.traversed || []).length);

  const actualPaintUsedFromMove = (moveResult.traversed || []).reduce((count, point) => {
    const key = `${point.row},${point.col}`;
    return count + (state.turnActionOriginalOwners[key] === null ? 1 : 0);
  }, 0);
  state.remainingPaint = Math.max(0, getCurrentTurnPaintAllowance() - actualPaintUsedFromMove);
  evaluateLastRoundState({ announce: true });

  const currentPoint = player.position ? { ...player.position } : { ...state.turnActionOrigin };
  log(`${player.name} moved to (${currentPoint.row + 1}, ${currentPoint.col + 1}).`, true);

  if (moveResult.interrupted === 'obstacle-stop') {
    state.currentAction = 'paint';
    state.selectedPath = [currentPoint];
    state.paintPhaseStartRemaining = state.remainingPaint;
    renderAll();
    return;
  }

  if (isTutorialActive() && getTutorialStep() === 4 && state.currentPlayerIndex === 0) {
    const movedEnough = state.selectedPath.length >= 2;
    if (!movedEnough) {
      showTutorialModal('Retry ④ Move', 'Move at least 1 tile to continue the tutorial.', () => prepareTutorialRollStep());
      return;
    }
  }

  const stillAtDestination = !moveResult.interrupted && player.position.row === finalPoint.row && player.position.col === finalPoint.col;
  if (!stillAtDestination) {
    state.currentAction = null;
    state.rotationLocked = false;
    renderAll();
    await resolveEndOfActionTurn();
    return;
  }

  if (handleRoyalMarchTutorialMoveResult(player)) {
    state.currentAction = null;
    state.rotationLocked = false;
    renderAll();
    return;
  }

  state.currentAction = "paint";
  state.paintPhaseStartRemaining = state.remainingPaint;
  renderAll();
  if (isTutorialActive() && getTutorialStep() === 4 && state.currentPlayerIndex === 0) {
    state.tutorial.step = 5;
    showTutorialModal(
      '⑤ Paint Tiles',
      'After moving, use your remaining Space value to paint nearby tiles. Pick at least 1 tile to see how territory spreads around your current position.',
    );
  }
}

function canConfirmMovePhase() {
  if (state.currentAction !== "move") return false;
  if (state.selectedPath.length >= 2) return true;
  if (canSkipMovePhaseBecauseBlocked()) return true;
  return isRoyalMarchMapActive() && isRoyalMarchKing(getCurrentPlayer()) && state.selectedPath.length >= 1;
}

function isValidPaintSelection(row, col) {
  if (state.currentAction !== "paint") return false;
  if (state.remainingPaint <= 0) return false;
  const player = getCurrentPlayer();
  const center = player.position;
  const range = isBrakkPaintBombDetonating(player) ? 2 : 1;
  const inPlayerRange = Math.abs(center.row - row) <= range && Math.abs(center.col - col) <= range;
  if (!inPlayerRange && !isRascaClonePaintSourceForPlayer(player, row, col)) return false;
  const cell = getCell(row, col);
  if (!cell || cell.obstacle) return false;
  if (cell.startOwner !== null && cell.startOwner !== state.currentPlayerIndex) return false;
  if (!canPlayerRepaintCell(state.currentPlayerIndex, cell)) return false;
  if (isFriendlyOwner(cell.owner, state.currentPlayerIndex)) return false;
  return !state.selectedPaintTargets.some((point) => point.row === row && point.col === col);
}

function updatePaintSelection(row, col) {
  if (!isValidPaintSelection(row, col)) return;
  state.selectedPaintTargets.push({ row, col });
  state.remainingPaint -= 1;
  refreshTileHighlights();
  renderHud();
  renderControls();
}

async function confirmPaintPhase() {
  if (state.currentAction !== "paint" || isInteractionPromptBlocking()) return;
  const player = getCurrentPlayer();
  if (isTutorialActive() && getTutorialStep() === 5 && state.currentPlayerIndex === 0) {
    const paintedEnough = state.selectedPaintTargets.length >= 1;
    if (!paintedEnough) {
      showTutorialModal('Retry ⑤ Paint Tiles', 'Paint at least 1 nearby tile to continue the tutorial.', () => prepareTutorialRollStep());
      return;
    }
  }

  let mimiPaintedCount = 0;
  const brakkBombDetonated = isBrakkPaintBombDetonating(player);
  state.selectedPaintTargets.forEach((point) => {
    const cell = getCell(point.row, point.col);
    rememberTurnCellOwner(cell);
    if (cell.owner !== null && !isFriendlyOwner(cell.owner, state.currentPlayerIndex)) {
      state.turnCapturedEnemyCount += 1;
    }
    if ((cell.startOwner === null || cell.startOwner === state.currentPlayerIndex) && canPlayerRepaintCell(state.currentPlayerIndex, cell)) {
      cell.owner = state.currentPlayerIndex;
      mimiPaintedCount += 1;
    }
  });
  addMimiCoins(player, mimiPaintedCount, "painting");
  if (brakkBombDetonated) {
    triggerBrakkExplosionEffect(player);
    triggerBrakkMissileEffects(state.selectedPaintTargets);
    renderAll();
    await wait(1000);
  }
  if (maybeFinishControlAreaWin()) {
    renderAll();
    return;
  }
  evaluateLastRoundState({ announce: true });

  if (player.activeCharacterId === "painter2" && state.turnCapturedEnemyCount > 0) {
    const restored = restoreStat(player, "technique", state.turnCapturedEnemyCount);
    if (restored > 0) {
      log(`${player.name} restored Technique by ${restored} recovered.`, true);
    }
  }

  state.currentAction = null;
  state.rotationLocked = false;
  renderAll();
  if (isTutorialActive() && getTutorialStep() === 5 && state.currentPlayerIndex === 0) {
    showTutorialModal('Step complete', 'Good. You rolled dice, moved, and painted tiles. Next you will learn how to break obstacles.', () => prepareTutorialObstacleStep());
    return;
  }
  await resolveEndOfActionTurn();
}

async function resolveEndOfActionTurn() {
  const player = getCurrentPlayer();
  const cell = getCell(player.position.row, player.position.col);

  const finishTurnAfterForcedReturn = () => {
    clampPlayerStats(player);
    renderAll();
    if (!state.gameOver) {
      advanceTurn();
    }
    return true;
  };

  if (applyMoppetEmergencyCalloutEndTileRepaint(player)) {
    renderAll();
    return;
  }

  if (cell.owner !== null && !isFriendlyOwner(cell.owner, state.currentPlayerIndex)) {
    const enemyTileDamage = getCurrentEnemyTileEndDamage();
    applyFieldDamage(player, enemyTileDamage, `${player.name} ended the turn on an opponent-owned tile and took ${enemyTileDamage} damage to HP.`, cell.owner);
    if (isPlayerReturningToStart(player)) {
      finishTurnAfterForcedReturn();
      return;
    }
  }

  if (cell.owner === state.currentPlayerIndex) {
    const recoveryAmount = getRecoveryTileAmountForPlayer(cell, state.currentPlayerIndex);
    if (cell.special.includes("heal-hp")) {
      const amount = restoreStat(player, "hp", recoveryAmount);
      if (amount > 0) log(`${player.name} restored HP by ${amount} recovered.`, true);
    }
    if (cell.special.includes("heal-atk")) {
      const amount = restoreStat(player, "attack", recoveryAmount);
      if (amount > 0) log(`${player.name} restored Attack by ${amount} recovered.`, true);
    }
    if (cell.special.includes("heal-tech")) {
      const amount = restoreStat(player, "technique", recoveryAmount);
      if (amount > 0) log(`${player.name} restored Technique by ${amount} recovered.`, true);
    }
  }

  if (isTutorialActive() && getTutorialStep() === 7 && state.currentPlayerIndex === 0 && cell.owner === state.currentPlayerIndex && Array.isArray(cell.special) && cell.special.some((value) => String(value).startsWith('heal-'))) {
    renderAll();
    showTutorialModal('Recovery complete', 'Recovery tiles restore a specific stat when you end your turn on a tile you own. Next you will pick up the flag.', () => prepareTutorialFlagPickupStep());
    return;
  }

  if (isTutorialActive() && getTutorialStep() === 6 && state.currentPlayerIndex === 0) {
    const tutorialRockCell = getCell(2, 3);
    if (tutorialRockCell?.obstacle) {
      renderAll();
      showTutorialModal('Retry ⑥ Break an Obstacle', 'This step only clears when you actually break the obstacle. Try again and spend Attack until the rock is destroyed.', () => prepareTutorialObstacleStep());
      return;
    }
  }

  await pickupGroundItemIfPossible(player);
  if (await processFoodCourtEndOfTurn(player)) return;
  if (maybeFinishFlagDelivery(player)) return;
  await processZoneEndTurnDamage(player, "turnEnd");
  if (isPlayerReturningToStart(player)) {
    finishTurnAfterForcedReturn();
    return;
  }
  applyOwnedZoneObstacleDamage(player);
  await maybeResolveBattle();
  if (isPlayerReturningToStart(player)) {
    finishTurnAfterForcedReturn();
    return;
  }
  if (maybeFinishFlagDelivery(player)) return;

  if (player.activeCharacterId === "battler2" && !state.turnHadBattle) {
    const before = player.currentStats.attack;
    player.currentStats.attack = Math.max(0, player.currentStats.attack - 2);
    if (player.currentStats.attack !== before) {
      if (!hasActiveLossPopupForStat(player, "attack")) {
        queueStatLossPopup(player, [{ statKey: "attack", amount: before - player.currentStats.attack }]);
      }
      log(`${player.name} had no battle, so Attack decreased by 2.`, true);
    }
  }

  applyMimiEndTurnModeEffect(player);
  processRascaCloneEndTurnEffects(player);
  if (isPlayerReturningToStart(player)) {
    finishTurnAfterForcedReturn();
    return;
  }
  finalizeBrakkPaintBombAtTurnEnd(player);
  applyCorvenTurnEndAutoHeal(player);
  if (applyCorvenTurnEndCurse(player)) {
    finishTurnAfterForcedReturn();
    return;
  }
  applyPipFreeSamples(player);
  if (player.activeCharacterId === "trickster3") {
    reduceSkavaBoulderProtectionForOwner(state.players.indexOf(player));
  }
  if (player.activeCharacterId === "tanker3") {
    tickHobbsStatusesAtOwnerTurnEnd(player);
    if (isPlayerReturningToStart(player)) {
      finishTurnAfterForcedReturn();
      return;
    }
  }

  clampPlayerStats(player);
  renderAll();

  if (!state.gameOver) {
    advanceTurn();
  }
}

function decrementRoundCooldowns() {
  state.players.forEach((player) => {
    if (player.cooldowns.painter2Hide > 0) player.cooldowns.painter2Hide -= 1;
    if (player.cooldowns.painter3Backblast > 0) player.cooldowns.painter3Backblast -= 1;
    if (player.cooldowns.painter4Backtrack > 0) player.cooldowns.painter4Backtrack -= 1;
    if (player.cooldowns.trapper1Zone > 0) player.cooldowns.trapper1Zone -= 1;
    if (player.cooldowns.trapper3VenomVarnish > 0) player.cooldowns.trapper3VenomVarnish -= 1;
    if (player.cooldowns.trickster3FieldCache > 0) player.cooldowns.trickster3FieldCache -= 1;
    if (player.cooldowns.trickster3BaitedBoulder > 0) player.cooldowns.trickster3BaitedBoulder -= 1;
    if (player.cooldowns.tanker2Quickdig > 0) player.cooldowns.tanker2Quickdig -= 1;
    if (player.cooldowns.tanker3ProtectiveDetail > 0) player.cooldowns.tanker3ProtectiveDetail -= 1;
    if (player.cooldowns.tanker3BreakItUp > 0) player.cooldowns.tanker3BreakItUp -= 1;
    if (player.cooldowns.battler3MesmerSync > 0) player.cooldowns.battler3MesmerSync -= 1;
    if (player.cooldowns.battler4BleakOffering > 0) player.cooldowns.battler4BleakOffering -= 1;
    if (player.cooldowns.battler5EmergencyCallout > 0) player.cooldowns.battler5EmergencyCallout -= 1;
    if (player.cooldowns.supporter1PushAhead > 0) player.cooldowns.supporter1PushAhead -= 1;
    if (player.cooldowns.supporter2FreshBatch > 0) player.cooldowns.supporter2FreshBatch -= 1;
    if (player.cooldowns.mimiOffRecord > 0) player.cooldowns.mimiOffRecord -= 1;
    if (player.cooldowns.rascaShedRelay > 0) player.cooldowns.rascaShedRelay -= 1;
    if (player.cooldowns.rascaSnapback > 0) player.cooldowns.rascaSnapback -= 1;
    if ((Number(player.statuses?.mesmerSyncRounds) || 0) > 0) {
      player.statuses.mesmerSyncRounds -= 1;
      if ((Number(player.statuses?.mesmerSyncRounds) || 0) <= 0) {
        player.statuses.mesmerSyncBattleRemaining = 0;
      }
    }
    if ((Number(player.statuses?.pushAheadRounds) || 0) > 0) player.statuses.pushAheadRounds -= 1;
  });
  decrementFoodCourtPreparationCooldowns();
}

function processCaptureTerritoryRoundEnd() {
  if (!isCaptureTerritoryMapActive()) return;
  getCurrentMapTerritories().forEach((territory) => {
    const { contested, soleOccupantKey, territoryBonusPoints } = getTerritoryStateSummary(territory);
    if (contested || !soleOccupantKey) return;
    const awardKey = getCaptureTerritoryAwardKey(soleOccupantKey);
    const gained = awardCaptureTerritoryPoints(awardKey, territoryBonusPoints);
    if (gained > 0) {
      queueTerritoryPointPopup(territory, soleOccupantKey, gained);
      log(`${territory.label} generated ${gained} points for ${getCaptureTerritoryDisplayLabel(soleOccupantKey)}.`, true);
    }
  });
}

async function advanceTurn() {
  if (isTutorialActive() && state.tutorial?.kind !== "royalMarch" && getTutorialStep() >= 6) {
    return;
  }
  finalizeBrakkPrimedPayloadTurnRecord(getCurrentPlayer());
  resolvePendingCorvenOmenGains();
  let startedNewRound = false;
  state.completedTurnsInRound += 1;
  if (state.completedTurnsInRound >= state.players.length) {
    state.completedTurnsInRound = 0;
    processCaptureTerritoryRoundEnd();
    if (maybeFinishRoyalMarchKingGoalAtRoundEnd()) return;
    if ((doesCurrentMapEndWhenBoardOwned() && isBoardFullyOwned()) || state.round >= getCurrentMapMaxRounds()) {
      finishGame();
      return;
    }
    state.round += 1;
    decrementRoundCooldowns();
    cleanupExpiredEffects();
    startedNewRound = true;
  }

  state.currentTurnOrderIndex = (state.currentTurnOrderIndex + 1) % state.order.length;
  state.currentPlayerIndex = state.order[state.currentTurnOrderIndex];
  if (startedNewRound) {
    state.roundTransitionActive = true;
    state.currentAction = null;
    state.moveDie = null;
    state.paintDie = null;
    state.remainingMove = 0;
    state.remainingPaint = 0;
    renderAll();
    await playRoundStartBanner(state.round);
    if (state.gameOver) return;
    state.roundTransitionActive = false;
    evaluateLastRoundState({ announce: true });
  }
  beginTurn();
}

function isBoardFullyOwned() {
  return getPlayableBoardCells().every((cell) => cell.owner !== null);
}

function buildFoodCourtResultDetailHtml(teamKey) {
  if (!isFoodCourtMapActive()) return "";
  const teamState = getFoodCourtTeamState(teamKey);
  if (!teamState) return "";
  const deliveredFoods = FOOD_COURT_FOOD_ORDER.filter((foodType) => !!teamState.deliveredFoods?.[foodType]);
  const deliveredCount = deliveredFoods.length;
  const basePoints = deliveredCount * 5;
  const fullSetBonus = deliveredCount >= FOOD_COURT_FOOD_ORDER.length ? 15 : 0;
  const total = basePoints + fullSetBonus;
  const foodMarks = FOOD_COURT_FOOD_ORDER.map((foodType) => {
    const delivered = !!teamState.deliveredFoods?.[foodType];
    return delivered ? getFoodCourtFoodIcon(foodType) : "Empty";
  }).join(" / ");
  const formula = `${deliveredCount} food${deliveredCount === 1 ? "" : "s"} x 5${fullSetBonus ? " + full set 15" : ""}`;
  return `<div class="note foodCourtResultDetail">Food Points ${total}: ${sanitize(foodMarks)} (${sanitize(formula)})</div>`;
}

function buildFinalResultScoreRowHtml(entry, index, teamMode) {
  if (teamMode) {
    const foodDetail = buildFoodCourtResultDetailHtml(entry.teamKey);
    return `<div class="scoreLine"><strong>#${index + 1} ${sanitize(getTeamDisplayLabel(entry.teamKey))}</strong><span>${entry.flag > 0 ? "🚩 " : ""}${entry.total} pts</span></div><div class="note">Members ${entry.members.map((member) => sanitize(member.player.name)).join(" / ")} · Field ${entry.territory} / ${getTerritoryPointBreakdownLabel()} ${(entry.controlPoints || 0)} / Food ${(entry.foodBonus || 0)} / Flag ${entry.flag} / Battle ${entry.victoryBonus} (${entry.battleWins} wins)</div>${foodDetail}`;
  }
  return `<div class="scoreLine"><strong>#${index + 1} ${sanitize(entry.player.name)}</strong><span>${entry.player.ownedFlag ? "🚩 " : ""}${entry.total} pts</span></div><div class="note">Field ${entry.territory} / ${getTerritoryPointBreakdownLabel()} ${(entry.controlPoints || 0)} / Flag ${entry.flag} / Battle ${entry.victoryBonus} (${entry.battleWins} wins)</div>`;
}

function finishGame(context = null) {
  state.gameOver = true;
  state.gameEndContext = context || null;
  const playerScores = state.players.map((player, index) => {
    const territory = getOwnedTileCount(index);
    const flag = player.ownedFlag ? getCurrentMapFlagBonus() : 0;
    const battleWins = Math.max(0, Number(player.battleWins) || 0);
    const victoryBonus = Math.floor(battleWins * 3);
    const royalBonus = getRoyalMarchBonusPoints(player);
    const controlPoints = getCaptureTerritoryPointsForPlayer(index);
    return {
      player,
      territory,
      flag,
      battleWins,
      victoryBonus,
      royalBonus,
      controlPoints,
      total: territory + flag + victoryBonus + royalBonus + controlPoints,
      teamKey: normalizeTeamKey(player.teamKey, index)
    };
  });

  const teamMode = state.matchMode === "team";
  let rankingEntries = teamMode ? buildTeamResultEntries(playerScores) : playerScores.sort((a, b) => b.total - a.total || b.territory - a.territory);

  if (context?.type === 'flag-delivery' || context?.type === 'royal-march-king-goal' || context?.type === 'control-area') {
    if (teamMode) {
      rankingEntries = rankingEntries.sort((a, b) => {
        const aWin = a.teamKey === context.winnerTeamKey ? 1 : 0;
        const bWin = b.teamKey === context.winnerTeamKey ? 1 : 0;
        return bWin - aWin || b.total - a.total || b.territory - a.territory;
      });
    } else {
      rankingEntries = rankingEntries.sort((a, b) => {
        const aWin = state.players.indexOf(a.player) === context.winnerPlayerIndex ? 1 : 0;
        const bWin = state.players.indexOf(b.player) === context.winnerPlayerIndex ? 1 : 0;
        return bWin - aWin || b.total - a.total || b.territory - a.territory;
      });
    }
  }

  const podiumEntries = buildFinalPodiumEntries(rankingEntries);
  const title = context?.type === 'flag-delivery'
    ? 'Flag Delivered!'
    : (context?.type === 'royal-march-king-goal'
      ? 'Royal March!'
      : (context?.type === 'control-area'
        ? 'Central Dominion!'
        : (context?.type === 'food-court-complete' ? 'Food Set Completed!' : 'Game Results')));
  const leadNote = context?.type === 'royal-march-king-goal'
    ? `${sanitize(getTeamDisplayLabel(context.winnerTeamKey))} wins immediately because its king held the enemy back rank at round end.`
    : context?.type === 'control-area'
    ? (teamMode
      ? `${sanitize(getTeamDisplayLabel(context.winnerTeamKey))} wins immediately by owning every Central Core tile at the same time.`
      : `${sanitize(state.players[context.winnerPlayerIndex]?.name || 'The winner')} wins immediately by owning every Central Core tile at the same time.`)
    : context?.type === 'food-court-complete'
    ? `${sanitize(getTeamDisplayLabel(context.winnerTeamKey))} completed 🍣 🍔 🥟. Final victory is still decided by total score.`
    : context?.type === 'flag-delivery'
    ? (teamMode
      ? `${sanitize(getTeamDisplayLabel(context.winnerTeamKey))} wins immediately by carrying the flag to an allied base.`
      : `${sanitize(state.players[context.winnerPlayerIndex]?.name || 'The winner')} wins immediately by carrying the flag to their base.`)
    : (getSelectedMapDefinition()?.id === 'flagCarrier'
      ? 'The round limit ended the match, so territory and battle wins decided the result.'
      : (isFoodCourtMapActive()
        ? 'The Food Court round limit ended the match, so field control, battle wins, delivered food, and flags decided the result.'
        : (isCaptureTerritoryMapActive()
          ? 'After 15 rounds, field control, territory control, and battle wins decided the result.'
          : (getSelectedMapDefinition()?.id === 'centralDominion'
            ? 'After 15 rounds, field control and battle wins decided the result.'
          : ''))));

  renderAll();
  showSimpleModal({
    title,
    body: `
      <div class="finalResultsWrap ${teamMode ? "teamMode" : "soloMode"}">
        ${leadNote ? `<div class="note" style="margin-bottom:14px;">${leadNote}</div>` : ''}
        <div class="finalPodium" role="img" aria-label="Final ranking podium">
          ${podiumEntries.map((entry) => renderFinalPodiumColumn(entry, teamMode)).join("")}
        </div>
        <div class="finalResultsSummary scoreCard">
          ${rankingEntries.map((entry, index) => buildFinalResultScoreRowHtml(entry, index, teamMode)).join("<hr style='border-color: rgba(255,255,255,0.08)'>")}
        </div>
      </div>
    `,
    buttons: [
      {
        label: "Play again",
        style: "primary",
        onClick: () => {
          closeTopModal();
          abortMatchToCharacterSelection();
        }
      }
    ]
  });
}

function buildCurrentTeamHudEntries() {
  if (!isTeamModeEnabled()) return [];
  const grouped = new Map();
  state.players.forEach((player, index) => {
    const teamKey = normalizeTeamKey(player.teamKey, index);
    if (!grouped.has(teamKey)) {
      grouped.set(teamKey, {
        teamKey,
        total: 0,
        hasFlag: false,
        controlPoints: getCaptureTerritoryPointsForTeam(teamKey),
        foodBonus: getFoodCourtFoodBonus(teamKey)
      });
    }
    const group = grouped.get(teamKey);
    const territory = getOwnedTileCount(index);
    const flag = Math.max(0, Number(player?.flagPoints) || 0);
    const victoryBonus = getVictoryBonusPoints(player);
    const royalBonus = getRoyalMarchBonusPoints(player);
    group.total += territory + flag + victoryBonus;
    group.total += royalBonus;
    group.hasFlag = group.hasFlag || playerHasFlag(player);
  });
  grouped.forEach((group) => {
    group.total += group.controlPoints || 0;
    group.total += group.foodBonus || 0;
  });
  return Array.from(grouped.values());
}

function buildCurrentIndividualHudEntries() {
  const displayOrder = state.order.length === state.players.length
    ? state.order.slice()
    : state.players.map((_, index) => index);
  return displayOrder.map((index) => {
    const player = state.players[index];
    const territory = getOwnedTileCount(index);
    const flag = Math.max(0, Number(player?.flagPoints) || 0);
    const victoryBonus = getVictoryBonusPoints(player);
    const royalBonus = getRoyalMarchBonusPoints(player);
    const controlPoints = getCaptureTerritoryPointsForPlayer(index);
    const safeName = String(player?.name || `P${index + 1}`);
    const shortLabel = safeName.length >= 5 ? safeName.slice(0, 5) : safeName;
    return {
      playerIndex: index,
      player,
      total: territory + flag + victoryBonus + royalBonus + controlPoints,
      shortLabel,
      accent: getPlayerPaintSolidColor(index),
      hasFlag: playerHasFlag(player)
    };
  });
}

function buildTeamResultEntries(playerScores) {
  const grouped = new Map();
  playerScores.forEach((entry, index) => {
    const teamKey = normalizeTeamKey(entry.teamKey, index);
    if (!grouped.has(teamKey)) {
      grouped.set(teamKey, {
        teamKey,
        territory: 0,
        flag: 0,
        battleWins: 0,
        victoryBonus: 0,
        royalBonus: 0,
        controlPoints: getCaptureTerritoryPointsForTeam(teamKey),
        foodBonus: getFoodCourtFoodBonus(teamKey),
        total: 0,
        members: []
      });
    }
    const group = grouped.get(teamKey);
    group.territory += entry.territory;
    group.flag += entry.flag;
    group.battleWins += entry.battleWins || 0;
    group.victoryBonus += entry.victoryBonus || 0;
    group.royalBonus += entry.royalBonus || 0;
    group.total += entry.territory + entry.flag + (entry.victoryBonus || 0) + (entry.royalBonus || 0);
    group.members.push(entry);
  });
  grouped.forEach((group) => {
    group.total += group.controlPoints || 0;
    group.total += group.foodBonus || 0;
  });
  return Array.from(grouped.values()).sort((a, b) => b.total - a.total || b.territory - a.territory);
}

function buildFinalPodiumEntries(scores) {
  const heights = [154, 110, 88, 74];
  const medals = ["👑", "🥈", "🥉", ""];
  const topEntries = scores.slice(0, Math.max(2, Math.min(scores.length, 4)));
  if (topEntries.length === 2) {
    return [
      {
        ...topEntries[1],
        rank: 2,
        height: heights[1],
        medal: medals[1],
        orderClass: "is-left"
      },
      {
        ...topEntries[0],
        rank: 1,
        height: heights[0],
        medal: medals[0],
        orderClass: "is-right is-winner"
      }
    ];
  }
  const arranged = [];
  const layoutOrder = [1, 0, 2, 3];
  layoutOrder.forEach((scoreIndex, visualIndex) => {
    const score = topEntries[scoreIndex];
    if (!score) return;
    arranged.push({
      ...score,
      rank: scoreIndex + 1,
      height: heights[Math.min(scoreIndex, heights.length - 1)],
      medal: medals[Math.min(scoreIndex, medals.length - 1)],
      orderClass: visualIndex === 0 ? "is-left" : visualIndex === 1 ? "is-center is-winner" : visualIndex === 2 ? "is-right" : "is-far-right"
    });
  });
  return arranged;
}

function renderFinalPodiumColumn(entry, teamMode = false) {
  const pointsLabel = `${entry?.flag > 0 || entry?.player?.ownedFlag ? "🚩 " : ""}${entry?.total ?? 0}`;
  const characters = teamMode
    ? (entry.members || []).map((member) => `<div class="finalPodiumCharacter">${getCharacterIconMarkup(member?.player?.selectedCharacters?.[0] || member?.player?.activeCharacterId, "characterIconAsset--podium")}</div>`).join("")
    : `<div class="finalPodiumCharacter">${getCharacterIconMarkup(entry?.player?.selectedCharacters?.[0] || entry?.player?.activeCharacterId, "characterIconAsset--podium")}</div>`;
  const names = teamMode
    ? (entry.members || []).map((member) => `<div class="finalPodiumName">${sanitize(member?.player?.name || "Player")}</div>`).join("")
    : `<div class="finalPodiumName">${sanitize(entry?.player?.name || "Player")}</div>`;
  const teamBadge = teamMode ? `<div class="finalPodiumTeamBadge team-${sanitize(entry.teamKey)}">${sanitize(getTeamDisplayLabel(entry.teamKey))}</div>` : "";
  return `
    <div class="finalPodiumEntry ${sanitize(entry.orderClass || "")}">
      <div class="finalPodiumPoints">${sanitize(pointsLabel)}</div>
      <div class="finalPodiumCharacterRow ${teamMode ? "is-team" : ""}">${characters}</div>
      <div class="finalPodiumColumn" style="height:${Math.max(74, Number(entry.height) || 74)}px;">
        ${entry.medal ? `<div class="finalPodiumMedal" aria-hidden="true">${entry.medal}</div>` : ""}
        ${teamBadge}
        <div class="finalPodiumNameList ${teamMode ? "is-team" : ""}">${names}</div>
      </div>
    </div>
  `;
}

function claimFlag(player) {
  if (!playerHasFlag(player)) {
    state.players.forEach((other) => {
      other.ownedFlag = false;
      other.flagPoints = 0;
    });
    player.ownedFlag = true;
    player.flagPoints = getCurrentMapFlagBonus();
    showFlagCaptureBanner(player.name);
    log(`${player.name} picked up the flag.`, true);
  }
}

async function pickupGroundItemIfPossible(player) {
  const cell = getCell(player.position.row, player.position.col);
  if (!cell.groundItem) return;
  if (cell.groundItem.id === "flag") {
    state.players.forEach((other) => {
      other.ownedFlag = false;
      other.flagPoints = 0;
    });
    player.ownedFlag = true;
    player.flagPoints = getCurrentMapFlagBonus();
    showFlagCaptureBanner(player.name);
    log(`${player.name} picked up the dropped flag.`, true);
    cell.groundItem = null;
    if (isTutorialActive() && getTutorialStep() === 8 && state.players.indexOf(player) === 0) {
      setTimeout(() => showTutorialModal('Flag captured', 'Now you have the flag. It raises your score and makes you a target. Next you will learn a basic battle.', () => prepareTutorialBattleStep()), 200);
    }
    return;
  }
  if (!canReceiveInventoryItem(player, cell.groundItem)) {
    log(`${player.name} could not pick up the item at their feet because the bag is full.`, true);
    return;
  }
  const groundItem = cell.groundItem;
  cell.groundItem = null;
  if (groundItem.id === 'forceShard') {
    await animatePowerShardCollect(cell.row, cell.col, player);
    showPowerShardPickupBanner(player);
  }
  addItemToInventory(player, groundItem);
  log(`${player.name} picked up ${groundItem.name}.`, true);
}

function applyFieldDamage(player, damage, message, sourceOwnerIndex = null, options = {}) {
  const charId = player.activeCharacterId;
  let remaining = damage;
  if (isMoppetEmergencyCalloutActive(player) && remaining > 0) {
    remaining *= 2;
  }
  if (!options.ignoreHobbsProtection && remaining > 0) {
    const protectResult = getHobbsProtectionRedirectResult(player, remaining, sourceOwnerIndex, message);
    remaining = protectResult.remainingDamage;
    if (protectResult.handled && remaining <= 0) {
      handleZeroHp(player, sourceOwnerIndex);
      return { hpLoss: 0, techniqueSpent: 0 };
    }
  }
  const popupLosses = [];
  let hpLoss = 0;
  let techniqueSpent = 0;

  if (charId === "tanker1") {
    const portion = Math.floor(remaining / 2);
    techniqueSpent = Math.min(player.currentStats.technique, portion);
    player.currentStats.technique -= techniqueSpent;
    remaining -= techniqueSpent;
    if (techniqueSpent > 0) {
      popupLosses.push({ statKey: "technique", amount: techniqueSpent });
      log(`${player.name} used Tanker 1 to spend ${techniqueSpent} Technique and absorb part of the damage.`, true);
    }
  }

  if (remaining > 0) {
    const before = player.currentStats.hp;
    player.currentStats.hp = Math.max(0, player.currentStats.hp - remaining);
    hpLoss = before - player.currentStats.hp;
    if (hpLoss > 0) {
      popupLosses.push({ statKey: "hp", amount: hpLoss });
      registerHpLoss(player, hpLoss);
    }
  }

  if (popupLosses.length) {
    queueStatLossPopup(player, popupLosses);
  }
  registerCorvenTurnLoss(player, hpLoss + techniqueSpent);
  if (message) {
    const loggedMessage = remaining !== damage
      ? `${message} Emergency Callout doubled it to ${remaining} HP damage.`
      : message;
    log(loggedMessage, true);
  }
  handleZeroHp(player, sourceOwnerIndex);
  return { hpLoss, techniqueSpent };
}

function registerHpLoss(player, amount) {
  if (amount <= 0) return;
  player.hpLostThisLife += amount;

  if (player.activeCharacterId === "tanker2") {
    const milestones = Math.floor(player.hpLostThisLife / 20);
    while (player.hpLossMilestonesAwarded < milestones) {
      player.hpLossMilestonesAwarded += 1;
      generateTanker2Item(player);
    }
  }
}

function getCorvenOmenGauge(player) {
  return Math.max(0, Math.min(100, Number(player?.statuses?.corvenOmenGauge) || 0));
}

function resetCorvenOmen(player, reason = null) {
  if (!player) return;
  player.statuses.corvenOmenGauge = 0;
  player.statuses.corvenTurnLossTotal = 0;
  if (reason) log(reason, true);
}

function addCorvenOmen(player, amount, reason = null) {
  if (!player || player.activeCharacterId !== "battler4") return 0;
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (safeAmount <= 0) return 0;
  const before = getCorvenOmenGauge(player);
  const after = Math.min(100, before + safeAmount);
  const gained = after - before;
  player.statuses.corvenOmenGauge = after;
  if (gained > 0 && reason) log(`${player.name} gained ${gained}% Omen from ${reason}.`, true);
  return gained;
}

function resetCorvenForcedReturnState(player, reason = null) {
  if (!player || player.activeCharacterId !== "battler4") return;
  resetCorvenOmen(player, reason);
  if (player.cooldowns) player.cooldowns.battler4BleakOffering = 0;
}

function registerCorvenTurnLoss(player, amount) {
  if (!player || player.activeCharacterId !== "battler4") return;
  const safeAmount = Math.max(0, Math.ceil(Number(amount) || 0));
  if (safeAmount <= 0) return;
  player.statuses.corvenTurnLossTotal = (Number(player.statuses?.corvenTurnLossTotal) || 0) + safeAmount;
}

function resolvePendingCorvenOmenGains() {
  state.players.forEach((player) => {
    if (!player || player.activeCharacterId !== "battler4") return;
    const pending = Math.max(0, Number(player.statuses?.corvenTurnLossTotal) || 0);
    player.statuses.corvenTurnLossTotal = 0;
    if (pending <= 0) return;
    const omenGain = Math.ceil(pending / 2);
    addCorvenOmen(player, omenGain, `Omen Hoard after losing ${pending} total stats`);
  });
}

function applyCorvenCurse(player, turns, sourcePlayer = null) {
  if (!player) return 0;
  const safeTurns = Math.max(0, Math.ceil(Number(turns) || 0));
  if (safeTurns <= 0) return 0;
  player.statuses.corvenCurseTurns = Math.max(Number(player.statuses?.corvenCurseTurns) || 0, safeTurns);
  log(`${player.name} was afflicted with 🐦‍⬛ Cursed for ${safeTurns} turn${safeTurns === 1 ? "" : "s"}${sourcePlayer ? ` by ${sourcePlayer.name}` : ""}.`, true);
  return safeTurns;
}

function applyCorvenAutoHeal(player, turns) {
  if (!player) return 0;
  const safeTurns = Math.max(0, Math.ceil(Number(turns) || 0));
  if (safeTurns <= 0) return 0;
  player.statuses.corvenAutoHealTurns = Math.max(0, Number(player.statuses?.corvenAutoHealTurns) || 0) + safeTurns;
  log(`${player.name} gained 🧪 Auto Heal for ${safeTurns} turns.`, true);
  return player.statuses.corvenAutoHealTurns;
}

function applyCorvenTurnEndAutoHeal(player) {
  if (!player || (Number(player.statuses?.corvenAutoHealTurns) || 0) <= 0) return false;
  const gains = [];
  ["attack", "hp", "technique"].forEach((statKey) => {
    const maxValue = getCurrentMax(player, statKey);
    const before = Number(player.currentStats?.[statKey]) || 0;
    player.currentStats[statKey] = Math.min(maxValue, before + 3);
    const gained = player.currentStats[statKey] - before;
    if (gained > 0) gains.push({ statKey, amount: gained });
  });
  if (gains.length) {
    queueStatGainPopup(player, gains);
    log(`${player.name} restored 3 to each current stat from 🧪 Auto Heal.`, true);
  }
  player.statuses.corvenAutoHealTurns = Math.max(0, (Number(player.statuses?.corvenAutoHealTurns) || 0) - 1);
  return gains.length > 0;
}

async function applyCorvenBlackFeatherOnBattleLoss(loser, winner) {
  if (!loser || !winner || loser.activeCharacterId !== "battler4") return;
  const omenGauge = getCorvenOmenGauge(loser);
  if (omenGauge < 25) return;
  if (omenGauge >= 100) {
    if (playerHasFlag(winner)) {
      dropFlagAtPlayerPosition(winner, `${winner.name} was driven back by ${loser.name}'s Black Feather and dropped the flag.`);
    }
    discardFoodCourtFoodForReturnToStart(winner, `was driven back by ${loser.name}'s Black Feather`);
    applyCorvenCurse(winner, 1, loser);
    log(`${winner.name} was sent back to the starting tile by ${loser.name}'s Black Feather.`, true);
    await animatePlayerReturnToStart(winner);
    return;
  }
  if (omenGauge >= 75) {
    applyCorvenCurse(winner, 3, loser);
    return;
  }
  if (omenGauge >= 50) {
    applyCorvenCurse(winner, 2, loser);
    return;
  }
  applyCorvenCurse(winner, 1, loser);
}

function applyCorvenTurnEndCurse(player) {
  if (!player || (Number(player.statuses?.corvenCurseTurns) || 0) <= 0) return false;
  const losses = applyAllStatLoss(player, 5, { queuePopup: true });
  if (losses.length) {
    log(`${player.name} lost 5 from each current stat from 🐦‍⬛ Cursed.`, true);
  }
  player.statuses.corvenCurseTurns = Math.max(0, (Number(player.statuses?.corvenCurseTurns) || 0) - 1);
  return isPlayerReturningToStart(player);
}

function createRandomTanker2Item() {
  const itemId = TANKER2_ITEM_TYPES[randomInt(0, TANKER2_ITEM_TYPES.length - 1)];
  const definition = itemDefinitions[itemId];
  return { id: definition.id, name: definition.shortName, icon: definition.icon };
}

function generateTanker2Item(player) {
  const item = createRandomTanker2Item();
  if (canReceiveInventoryItem(player, item)) {
    addItemToInventory(player, item);
    log(`${player.name} gained ${item.name} .`, true);
  } else {
    const cell = getCell(player.position.row, player.position.col);
    cell.groundItem = item;
    log(`${player.name}'s bag was full, so ${item.name} fell at their feet.`, true);
  }
}

function handleZeroHp(player, sourceOwnerIndex = null) {
  if (!player || player.currentStats.hp > 0) return;
  if (isPlayerReturningToStart(player)) return;
  if (isRoyalMarchMapActive() && isRoyalMarchKing(player) && Number.isInteger(sourceOwnerIndex)) {
    const sourcePlayer = state.players[sourceOwnerIndex];
    if (sourcePlayer && !arePlayersAllied(sourcePlayer, player)) {
      const sourceTeamKey = normalizeTeamKey(sourcePlayer.teamKey, sourceOwnerIndex);
      const teamKing = getRoyalMarchTeamKing(sourceTeamKey);
      awardRoyalMarchKingDefeatBonus(teamKing, player, `${player.name}'s king falling on the field`);
    }
  }
  if (playerHasFlag(player)) {
    dropFlagAtPlayerPosition(player, `${player.name} reached 0 HP and dropped the flag on the spot.`);
  }
  discardFoodCourtFoodForReturnToStart(player, "reached 0 HP");
  if (player.activeCharacterId === "battler4") {
    resetCorvenForcedReturnState(player);
  }
  if (player.activeCharacterId === "tanker3") {
    clearAllHobbsEffects(player);
  }
  clearBrakkPaintBomb(player, "Brakk was defeated");
  player.tempMaxBonus = { attack: 0, hp: 0, technique: 0 };
  const maxHp = getCurrentMax(player, "hp");
  player.currentStats = {
    attack: Math.min(getCurrentMax(player, "attack"), player.currentStats.attack),
    hp: maxHp,
    technique: getCurrentMax(player, "technique")
  };
  player.hpLostThisLife = 0;
  player.hpLossMilestonesAwarded = 0;
  showTopPlayerEventBanner(player, `${sanitize(player.name)} was defeated and sent back to the starting tile!`);
  log(`${player.name} was defeated and sent back to the starting tile.`, true);
  void animatePlayerReturnToStart(player);
}

function clampPlayerStats(player) {
  ["attack", "hp", "technique"].forEach((key) => {
    player.currentStats[key] = Math.max(0, Math.min(200, player.currentStats[key]));
    const max = getCurrentMax(player, key);
    if (player.currentStats[key] > max) {
      player.currentStats[key] = Math.min(200, player.currentStats[key]);
    }
  });
}

function getCurrentMax(player, statKey) {
  return Math.min(DEFAULT_MAX_STAT, player.baseStats[statKey] + player.tempMaxBonus[statKey]);
}

function restoreStat(player, statKey, amount) {
  const maxValue = getCurrentMax(player, statKey);
  const before = player.currentStats[statKey];
  player.currentStats[statKey] = Math.min(maxValue, player.currentStats[statKey] + amount);
  const restoredAmount = player.currentStats[statKey] - before;
  if (restoredAmount > 0) {
    queueStatGainPopup(player, [{ statKey, amount: restoredAmount }]);
  }
  return restoredAmount;
}

function increaseStatMax(player, statKey, amount) {
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (safeAmount <= 0) return 0;
  const previous = Number(player.tempMaxBonus[statKey]) || 0;
  const limit = Math.max(0, DEFAULT_MAX_STAT - player.baseStats[statKey]);
  const next = Math.min(limit, previous + safeAmount);
  const raisedAmount = next - previous;
  player.tempMaxBonus[statKey] = next;
  clampPlayerStats(player);
  if (raisedAmount > 0) {
    queueStatMaxGainPopup(player, [{ statKey, amount: raisedAmount }]);
  }
  return raisedAmount;
}

function spendStatForSkill(player, statKey, amount) {
  const actualAmount = Math.max(0, Number(amount) || 0);
  if (player.currentStats[statKey] < actualAmount) {
    return false;
  }
  player.currentStats[statKey] -= actualAmount;
  if (actualAmount > 0) {
    queueStatLossPopup(player, [{ statKey, amount: actualAmount }]);
  }
  return true;
}

function spendStatExact(player, statKey, amount) {
  const actualAmount = Math.max(0, Number(amount) || 0);
  if (player.currentStats[statKey] < actualAmount) {
    return false;
  }
  player.currentStats[statKey] -= actualAmount;
  if (actualAmount > 0) {
    queueStatLossPopup(player, [{ statKey, amount: actualAmount }]);
  }
  return true;
}

function canUseItems() {
  const player = getCurrentPlayer();
  return !state.turnUsedItem && getManualUsableInventoryEntries(player).length > 0 && !state.moveDie;
}

function useItemFlow() {
  state.ui.itemTrayOpen = !state.ui.itemTrayOpen;
  if (!state.ui.itemTrayOpen) {
    if (state.ui.rightPanelMode === "item") {
      state.ui.rightPanelMode = null;
      state.ui.selectedItemIndex = null;
    }
  }
  renderExpandablePanels();
}

function showItemChoiceModal(player) { return player; }

function chooseStatFromModal(player, title, message, callback) {
  return new Promise((resolve) => {
    showSimpleModal({
      title,
      body: `${sanitize(player.name)} — ${sanitize(message)}`,
      buttons: [
        { label: "Attack", style: "option", onClick: () => { callback("attack"); closeTopModal(); resolve(); } },
        { label: "HP", style: "option", onClick: () => { callback("hp"); closeTopModal(); resolve(); } },
        { label: "Technique", style: "option", onClick: () => { callback("technique"); closeTopModal(); resolve(); } }
      ]
    });
  });
}

function chooseStatIconModal(player, title, message, callback, allowedStats = ["attack", "hp", "technique"]) {
  const selectableStats = Array.isArray(allowedStats) && allowedStats.length ? allowedStats : ["attack", "hp", "technique"];
  const selectableSet = new Set(selectableStats);
  return new Promise((resolve) => {
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.inlinePromptPanel) {
      state.ui.inlinePrompt = {
        playerName: player.name,
        title,
        message,
        allowedStats: selectableStats,
        callback,
        resolve
      };
      renderInlinePromptPanel();
      return;
    }

    showSimpleModal({
      title,
      body: `${sanitize(player.name)} — ${sanitize(message)}`,
      buttons: [
        { label: "⚔️ Attack", style: "option", disabled: !selectableSet.has("attack"), onClick: () => { callback("attack"); closeTopModal(); resolve(); } },
        { label: "❤️ HP", style: "option", disabled: !selectableSet.has("hp"), onClick: () => { callback("hp"); closeTopModal(); resolve(); } },
        { label: "🧠 Technique", style: "option", disabled: !selectableSet.has("technique"), onClick: () => { callback("technique"); closeTopModal(); resolve(); } }
      ]
    });
  });
}

function chooseHobbsTargetFromModal(title, message, candidates, actingPlayer = getCurrentPlayer()) {
  const uniqueCandidates = dedupePlayersById(candidates);
  if (!uniqueCandidates.length) return Promise.resolve(null);
  return new Promise((resolve) => {
    const orderedCandidates = orderPlayerTargetCandidates(uniqueCandidates, actingPlayer);
    state.ui.playerTargetPrompt = {
      title,
      message,
      playerId: actingPlayer?.id || null,
      candidates: orderedCandidates.map((candidate) => candidate.id),
      selectedId: null,
      collapsed: false,
      resolve
    };
    state.ui.rightPanelMode = null;
    renderAll();
  });
}

function orderPlayerTargetCandidates(candidates, actingPlayer) {
  const uniqueCandidates = dedupePlayersById(candidates);
  if (!actingPlayer || !uniqueCandidates.some((candidate) => candidate.id === actingPlayer.id)) return uniqueCandidates;
  return [
    actingPlayer,
    ...uniqueCandidates.filter((candidate) => candidate.id !== actingPlayer.id)
  ];
}

function dedupePlayersById(candidates) {
  const uniqueCandidates = [];
  const seen = new Set();
  (candidates || []).forEach((candidate) => {
    if (!candidate || seen.has(candidate.id)) return;
    seen.add(candidate.id);
    uniqueCandidates.push(candidate);
  });
  return uniqueCandidates;
}

function getPlayerTargetPromptPlayers(prompt = state.ui.playerTargetPrompt) {
  if (!prompt) return [];
  const candidates = Array.isArray(prompt.candidates) ? prompt.candidates : [];
  return candidates
    .map((playerId) => state.players.find((player) => player?.id === playerId) || null)
    .filter(Boolean);
}

function selectPlayerTargetPromptPlayer(playerId) {
  const prompt = state.ui.playerTargetPrompt;
  if (!prompt || !(prompt.candidates || []).includes(playerId)) return;
  prompt.selectedId = playerId;
  renderAll();
}

function resolvePlayerTargetSelection(targetId = null) {
  const prompt = state.ui.playerTargetPrompt;
  if (!prompt) return;
  state.ui.playerTargetPrompt = null;
  const target = targetId ? state.players.find((player) => player?.id === targetId) || null : null;
  if (typeof prompt.resolve === "function") prompt.resolve(target);
  renderAll();
}

function buildPlayerTargetMiniStatsHtml(player) {
  return `
    <div class="playerTargetStats" aria-label="Current stats">
      ${["attack", "hp", "technique"].map((statKey) => `
        <div class="playerTargetStat">
          <span class="playerTargetStatLabel playerTargetStatIcon" aria-label="${sanitize(statLabel(statKey))}">${getResourceIcon(statKey)}</span>
          ${renderMiniBar(player, statKey)}
        </div>
      `).join("")}
    </div>
  `;
}

function buildPlayerTargetPromptContent(prompt) {
  const players = getPlayerTargetPromptPlayers(prompt);
  const selectedId = prompt?.selectedId || null;
  return `
    <button type="button" class="playerTargetDrawerButton" data-player-target-drawer-toggle aria-label="${prompt?.collapsed ? "Show selection panel" : "Hide selection panel"}">${prompt?.collapsed ? "‹" : "›"}</button>
    <div class="overlayPanelHeader playerTargetHeader">
      <div>
        <h3>${sanitize(prompt?.title || "Select Player")}</h3>
        <p class="playerTargetMessage">${sanitize(prompt?.message || "Choose a player.")}</p>
      </div>
    </div>
    <div class="overlayPanelScroll playerTargetScroll">
      ${players.map((player) => {
        const statuses = collectStatusTags(player);
        const isSelected = player.id === selectedId;
        return `
          <button
            type="button"
            class="playerTargetPanel player-${state.players.indexOf(player)} ${isSelected ? "selected" : ""}"
            data-player-target-id="${sanitize(player.id)}"
            aria-pressed="${isSelected ? "true" : "false"}"
          >
            <span class="playerTargetIcon">${getPlayerCharacterIconMarkup(player, "characterIconAsset--targetPanel")}</span>
            <span class="playerTargetInfo">
              <span class="playerTargetName">${sanitize(player.name)}</span>
              ${buildPlayerTargetMiniStatsHtml(player)}
              <span class="playerTargetStatusRow">${statuses.length ? statuses.map(renderStatusTag).join("") : `<span class="statusTag muted">No status</span>`}</span>
            </span>
          </button>
        `;
      }).join("")}
    </div>
    <div class="playerTargetActions">
      <button type="button" class="ghostButton" data-player-target-cancel>Cancel</button>
      <button type="button" class="primaryButton" data-player-target-confirm ${selectedId ? "" : "disabled"}>Confirm</button>
    </div>
  `;
}

function bindPlayerTargetPromptPanel() {
  if (!ui.rightOverlayPanel) return;
  const drawerButton = ui.rightOverlayPanel.querySelector("[data-player-target-drawer-toggle]");
  if (drawerButton) {
    drawerButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const prompt = state.ui.playerTargetPrompt;
      if (!prompt) return;
      prompt.collapsed = !prompt.collapsed;
      renderAll();
    });
  }
  Array.from(ui.rightOverlayPanel.querySelectorAll("[data-player-target-id]")).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectPlayerTargetPromptPlayer(button.dataset.playerTargetId);
    });
  });
  const cancelButton = ui.rightOverlayPanel.querySelector("[data-player-target-cancel]");
  if (cancelButton) {
    cancelButton.addEventListener("click", (event) => {
      event.stopPropagation();
      resolvePlayerTargetSelection(null);
    });
  }
  const confirmButton = ui.rightOverlayPanel.querySelector("[data-player-target-confirm]");
  if (confirmButton) {
    confirmButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const prompt = state.ui.playerTargetPrompt;
      if (!prompt?.selectedId) return;
      resolvePlayerTargetSelection(prompt.selectedId);
    });
  }
}

function renderPlayerTargetPromptPanel() {
  const prompt = state.ui.playerTargetPrompt;
  if (!prompt) return false;
  if (ui.logToggleButton) ui.logToggleButton.classList.remove("active");
  openRightOverlayPanel(buildPlayerTargetPromptContent(prompt), "player-target");
  ui.rightOverlayPanel.classList.toggle("playerTargetCollapsed", !!prompt.collapsed);
  bindPlayerTargetPromptPanel();
  return true;
}

function getRascaSnapbackPromptClones(prompt = state.ui.rascaSnapbackPrompt) {
  if (!prompt) return [];
  const player = state.players.find((entry) => entry?.id === prompt.playerId) || null;
  const ownerIndex = state.players.indexOf(player);
  if (ownerIndex < 0) return [];
  const candidates = Array.isArray(prompt.candidates) && prompt.candidates.length
    ? prompt.candidates
    : getRascaClonesForPlayer(ownerIndex).map((clone) => clone.id);
  return candidates
    .map((cloneId) => (state.rascaClones || []).find((clone) => clone?.id === cloneId) || null)
    .filter((clone) => clone && clone.ownerIndex === ownerIndex);
}

function selectRascaSnapbackPromptClone(cloneId) {
  const prompt = state.ui.rascaSnapbackPrompt;
  if (!prompt || !(prompt.candidates || []).includes(cloneId)) return;
  prompt.selectedId = cloneId;
  renderAll();
}

function resolveRascaSnapbackPrompt(cloneId = null) {
  const prompt = state.ui.rascaSnapbackPrompt;
  if (!prompt) return;
  const clone = cloneId ? (state.rascaClones || []).find((entry) => entry?.id === cloneId) || null : null;
  state.ui.rascaSnapbackPrompt = null;
  if (typeof prompt.resolve === "function") prompt.resolve(clone);
  renderAll();
}

function buildRascaCloneTargetHpHtml(clone) {
  const maxHp = Math.max(1, Math.ceil(Number(clone?.maxHp) || 1));
  const hp = Math.max(0, Math.ceil(Number(clone?.hp) || 0));
  const percentage = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  return `
    <div class="playerTargetStats" aria-label="Tail HP">
      <div class="playerTargetStat">
        <span class="playerTargetStatLabel playerTargetStatIcon" aria-label="HP">${getResourceIcon("hp")}</span>
        <div class="miniBar">
          <div class="miniFill hp" style="width:${percentage}%"></div>
          <div class="miniValue">${hp}</div>
        </div>
      </div>
    </div>
  `;
}

function buildRascaSnapbackPromptContent(prompt) {
  const player = state.players.find((entry) => entry?.id === prompt?.playerId) || null;
  const clones = getRascaSnapbackPromptClones(prompt);
  const selectedId = prompt?.selectedId || null;
  return `
    <button type="button" class="playerTargetDrawerButton" data-rasca-snapback-drawer-toggle aria-label="${prompt?.collapsed ? "Show selection panel" : "Hide selection panel"}">${prompt?.collapsed ? "‹" : "›"}</button>
    <div class="overlayPanelHeader playerTargetHeader">
      <div>
        <h3>${sanitize(prompt?.title || "Snapback")}</h3>
        <p class="playerTargetMessage">${sanitize(prompt?.message || `${player?.name || "Rasca"} must choose a detached tail.`)}</p>
      </div>
    </div>
    <div class="overlayPanelScroll playerTargetScroll">
      ${clones.map((clone, index) => {
        const isSelected = clone.id === selectedId;
        const statuses = [
          { label: `Tile ${clone.row + 1}-${clone.col + 1}`, kind: "muted" },
          clone.enhanced ? { label: "Enhanced", kind: "warning" } : { label: "Normal", kind: "muted" }
        ];
        return `
          <button
            type="button"
            class="playerTargetPanel rascaCloneTargetPanel player-${clone.ownerIndex} ${isSelected ? "selected" : ""}"
            data-rasca-clone-target-id="${sanitize(clone.id)}"
            aria-pressed="${isSelected ? "true" : "false"}"
          >
            <span class="playerTargetIcon rascaCloneTargetIcon"><img class="rascaTailIconImage" src="${sanitize(getCharacterIconAsset("trickster2", "tail"))}" alt="" aria-hidden="true"></span>
            <span class="playerTargetInfo">
              <span class="playerTargetName">Detached Tail ${index + 1}</span>
              ${buildRascaCloneTargetHpHtml(clone)}
              <span class="playerTargetStatusRow">${statuses.map(renderStatusTag).join("")}</span>
            </span>
          </button>
        `;
      }).join("")}
    </div>
    <div class="playerTargetActions">
      <button type="button" class="ghostButton" data-rasca-snapback-cancel>Cancel</button>
      <button type="button" class="primaryButton" data-rasca-snapback-confirm ${selectedId ? "" : "disabled"}>Confirm</button>
    </div>
  `;
}

function bindRascaSnapbackPromptPanel() {
  if (!ui.rightOverlayPanel) return;
  const drawerButton = ui.rightOverlayPanel.querySelector("[data-rasca-snapback-drawer-toggle]");
  if (drawerButton) {
    drawerButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const prompt = state.ui.rascaSnapbackPrompt;
      if (!prompt) return;
      prompt.collapsed = !prompt.collapsed;
      renderAll();
    });
  }
  Array.from(ui.rightOverlayPanel.querySelectorAll("[data-rasca-clone-target-id]")).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectRascaSnapbackPromptClone(button.dataset.rascaCloneTargetId);
    });
  });
  const cancelButton = ui.rightOverlayPanel.querySelector("[data-rasca-snapback-cancel]");
  if (cancelButton) {
    cancelButton.addEventListener("click", (event) => {
      event.stopPropagation();
      resolveRascaSnapbackPrompt(null);
    });
  }
  const confirmButton = ui.rightOverlayPanel.querySelector("[data-rasca-snapback-confirm]");
  if (confirmButton) {
    confirmButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const prompt = state.ui.rascaSnapbackPrompt;
      if (!prompt?.selectedId) return;
      resolveRascaSnapbackPrompt(prompt.selectedId);
    });
  }
}

function renderRascaSnapbackPromptPanel() {
  const prompt = state.ui.rascaSnapbackPrompt;
  if (!prompt) return false;
  if (ui.logToggleButton) ui.logToggleButton.classList.remove("active");
  openRightOverlayPanel(buildRascaSnapbackPromptContent(prompt), "player-target");
  ui.rightOverlayPanel.classList.toggle("playerTargetCollapsed", !!prompt.collapsed);
  bindRascaSnapbackPromptPanel();
  return true;
}

function chooseSkavaTargetTile(player, type, title, message) {
  return new Promise((resolve) => {
    state.ui.skavaTargetPrompt = {
      playerId: player.id,
      playerName: player.name,
      type,
      title,
      message,
      resolve
    };
    refreshTileHighlights();
    renderInlinePromptPanel();
  });
}

function resolveSkavaTargetTileSelection(row, col) {
  const prompt = state.ui.skavaTargetPrompt;
  if (!prompt) return false;
  const cell = getCell(row, col);
  const valid = prompt.type === "fieldCache"
    ? isValidSkavaFieldCacheCell(cell)
    : isValidSkavaBoulderCell(cell);
  if (!valid) return true;
  state.ui.skavaTargetPrompt = null;
  refreshTileHighlights();
  renderInlinePromptPanel();
  if (typeof prompt.resolve === "function") prompt.resolve({ row, col });
  return true;
}

function canSwap() {
  const player = getCurrentPlayer();
  return !!(player && player.swapAvailable && player.benchCharacterData && !state.moveDie);
}

function swapCharacterFlow() {
  if (!canSwap()) return;
  state.ui.swapBubbleOpen = !state.ui.swapBubbleOpen;
  renderExpandablePanels();
}

function getBrumSwapStayScore(player) {
  if (!player || !player.position) return 0;
  const currentCell = getCell(player.position.row, player.position.col);
  const ownIndex = state.players.indexOf(player);
  let stayScore = 0;
  if (currentCell) {
    if (currentCell.special.includes('flag') || currentCell.groundItem?.id === 'flag') stayScore += Math.max(9, FLAG_POINTS * 0.9);
    if (currentCell.special.includes('heal-atk') || currentCell.special.includes('heal-hp') || currentCell.special.includes('heal-tech')) stayScore += 2.8;
    if (currentCell.owner === ownIndex) stayScore += 1.3;
    if (currentCell.owner !== null && currentCell.owner !== ownIndex) stayScore += 1.0;
  }
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - player.position.row) + Math.abs(other.position.col - player.position.col);
    if (distance <= 1) stayScore += 2.0;
    else if (distance === 2) stayScore += 0.7;
  });
  if (player.flagHolder) stayScore += Math.max(3.5, FLAG_POINTS * 0.22);
  return stayScore;
}

function executeSwap(player) {
  if (!player) return;
  const oldActive = player.activeCharacterData;
  const newActive = player.benchCharacterData;
  if (!oldActive || !newActive) return;
  clearInteractionPrompts();
  if (typeof closeTopModal === 'function') closeTopModal();
  if (playerHasFlag(player)) {
    dropFlagAtPlayerPosition(player, `${player.name} switched characters and dropped the flag on the spot.`);
  }
  clearBrakkPaintBomb(player, "Brakk switched out");
  if (oldActive.id === "painter3" || newActive.id === "painter3") {
    resetBrakkPrimedPayloadMemory(player);
  }
  if (oldActive.id === "tanker3") {
    clearAllHobbsEffects(player);
  }
  player.benchCharacterData = oldActive;
  player.activeCharacterData = newActive;
  player.activeCharacterId = newActive.id;
  player.benchCharacterId = oldActive.id;
  player.icon = newActive.iconImage || newActive.icon;
  if (newActive.id === "trickster1") {
    player.statuses.mimiMode = "star";
    player.statuses.mimiNextDiceBoost = 0;
    player.statuses.mimiForceDiceOne = false;
  }
  player.baseStats = deepClone(newActive.stats);
  player.currentStats.attack = Math.min(player.currentStats.attack, getCurrentMax(player, 'attack'));
  player.currentStats.hp = Math.min(player.currentStats.hp, getCurrentMax(player, 'hp'));
  player.currentStats.technique = Math.min(player.currentStats.technique, getCurrentMax(player, 'technique'));
  player.swapAvailable = false;
  player.statuses.hiddenTurns = 0;

  const applyReturnToStart = () => {
    if (!player.startPosition) return;
    const wasAwayFromStart = !player.position
      || player.position.row !== player.startPosition.row
      || player.position.col !== player.startPosition.col;
    player.position = { ...player.startPosition };
    if (wasAwayFromStart) {
      discardFoodCourtFoodForReturnToStart(player, "returned to the starting tile during a character swap");
    }
  };
  const finalizeSwapRender = () => {
    log(`${player.name} switched to ${newActive.name}.`, true);
    renderAll();
  };

  if (oldActive.id === 'tanker1') {
    if (isComputerPlayer(player)) {
      const shouldStay = getBrumSwapStayScore(player) >= 3.2;
      if (!shouldStay) applyReturnToStart();
      finalizeSwapRender();
      return;
    }
    showSimpleModal({
      title: 'Tanker 1 Swap Effect',
      body: 'Return to the starting tile?',
      buttons: [
        { label: 'Stay here', style: 'ghost', onClick: () => { closeTopModal(); finalizeSwapRender(); } },
        { label: 'Return to start', style: 'primary', onClick: () => { closeTopModal(); applyReturnToStart(); finalizeSwapRender(); } }
      ]
    });
    return;
  }

  applyReturnToStart();
  finalizeSwapRender();
}

function maybeShowRestButton() {
  const player = getCurrentPlayer();
  if (!player?.position || state.moveDie) return false;
  const cell = getCell(player.position.row, player.position.col);
  return isOwnStartingTileForPlayer(player, cell) || canMoppetUseBorrowedBreakroom(player, cell);
}

function isOwnStartingTileForPlayer(player, cell = null) {
  if (!player?.position || !player.startPosition) return false;
  return player.position.row === player.startPosition.row && player.position.col === player.startPosition.col;
}

function canMoppetUseBorrowedBreakroom(player, cell = null) {
  if (!player || player.activeCharacterId !== "battler5" || !player.position) return false;
  const targetCell = cell || getCell(player.position.row, player.position.col);
  if (!targetCell || targetCell.startOwner === null) return false;
  const playerIndex = state.players.indexOf(player);
  return targetCell.startOwner !== playerIndex && !isFriendlyOwner(targetCell.startOwner, playerIndex);
}

function getMoppetRestRestoreAmount(player) {
  return canMoppetUseBorrowedBreakroom(player) ? 25 : null;
}

function isMoppetEmergencyCalloutActive(player) {
  return !!player?.turnFlags?.moppetEmergencyCalloutPrimed;
}

function getMoppetEmergencyCalloutMoveAllowance() {
  return Math.max(0, (Number(state.moveDie) || 0) + (Number(state.paintDie) || 0) + (Number(state.turnMoveCountBonus) || 0));
}

function canMoppetEnterCell(player, cell) {
  if (!isMoppetEmergencyCalloutActive(player)) return true;
  return !!cell && cell.owner !== null;
}

function canMoppetEmergencyCalloutRepaintCell(player, cell) {
  if (!player || !cell || cell.obstacle) return false;
  const playerIndex = state.players.indexOf(player);
  if (playerIndex < 0) return false;
  if (cell.owner === null || isFriendlyOwner(cell.owner, playerIndex)) return false;
  if (cell.startOwner !== null && cell.startOwner !== playerIndex) return false;
  if (!canPlayerRepaintCell(playerIndex, cell)) return false;
  return true;
}

function applyMoppetEmergencyCalloutEndTileRepaint(player) {
  if (!isMoppetEmergencyCalloutActive(player)) return false;
  if (Math.max(0, Number(state.turnNormalMoveDistance) || 0) <= 0) return false;
  if (!player?.position) return false;
  const cell = getCell(player.position.row, player.position.col);
  if (!canMoppetEmergencyCalloutRepaintCell(player, cell)) return false;
  const playerIndex = state.players.indexOf(player);
  rememberTurnCellOwner(cell);
  if (cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex)) {
    state.turnCapturedEnemyCount += 1;
  }
  cell.owner = playerIndex;
  addMimiCoins(player, 1, "painting");
  log(`${player.name}'s Emergency Callout repainted the tile they ended on.`, true);
  return maybeFinishControlAreaWin();
}

function simulateMoppetRouteValue(player, moveDie, paintDie, useEmergencyCallout = false) {
  if (!player?.position) {
    return { score: -Infinity, steps: 0, path: [] };
  }
  const snapshot = {
    moveDie: state.moveDie,
    paintDie: state.paintDie,
    currentAction: state.currentAction,
    selectedPath: state.selectedPath ? state.selectedPath.map((point) => ({ ...point })) : [],
    currentPlayerIndex: state.currentPlayerIndex,
    primed: !!player.turnFlags?.moppetEmergencyCalloutPrimed
  };
  state.moveDie = moveDie;
  state.paintDie = paintDie;
  state.currentAction = "move";
  state.currentPlayerIndex = state.players.indexOf(player);
  state.selectedPath = [{ ...player.position }];
  player.turnFlags.moppetEmergencyCalloutPrimed = !!useEmergencyCallout;
  const path = chooseComputerMovePath(player);
  const score = scoreComputerPath(player, path);
  const result = {
    score,
    steps: Math.max(0, (path?.length || 1) - 1),
    path: path?.map((point) => ({ ...point })) || []
  };
  player.turnFlags.moppetEmergencyCalloutPrimed = snapshot.primed;
  state.moveDie = snapshot.moveDie;
  state.paintDie = snapshot.paintDie;
  state.currentAction = snapshot.currentAction;
  state.currentPlayerIndex = snapshot.currentPlayerIndex;
  state.selectedPath = snapshot.selectedPath;
  return result;
}

function getMoppetMessMagnetTierBonus(distance) {
  const safeDistance = Math.max(0, Number(distance));
  if (safeDistance <= 1) return 15;
  if (safeDistance <= 2) return 10;
  if (safeDistance <= 3) return 5;
  return 0;
}

function getMoppetMessMagnetBonus(player, opponent) {
  if (!player?.position || player.activeCharacterId !== "battler5") return 0;
  const parts = getMoppetMessMagnetParts(player, opponent);
  return parts.enemyBonus - parts.ownPenalty;
}

function getMoppetClutterFuryParts(player, opponent) {
  if (!player || player.activeCharacterId !== "battler5" || !opponent?.position) {
    return { enemyBonus: 0, allyPenalty: 0 };
  }
  let nearbyEnemyCount = 0;
  let nearbyAllyCount = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || other.id === opponent.id || !other.position) return;
    if (Math.abs(other.position.row - opponent.position.row) <= 1 && Math.abs(other.position.col - opponent.position.col) <= 1) {
      if (arePlayersAllied(player, other)) nearbyAllyCount += 1;
      else nearbyEnemyCount += 1;
    }
  });
  return {
    enemyBonus: Math.min(15, nearbyEnemyCount * 5),
    allyPenalty: Math.min(15, nearbyAllyCount * 5)
  };
}

function getMoppetClutterFuryBonus(player, opponent) {
  return getMoppetClutterFuryParts(player, opponent).enemyBonus;
}

function getHobbsProtectiveDetailState(player) {
  if (!player || player.activeCharacterId !== "tanker3") return null;
  const status = player.statuses?.hobbsProtectiveDetail;
  if (!status || !status.targetId) return null;
  const target = state.players.find((candidate) => candidate?.id === status.targetId) || null;
  if (!target) return null;
  return { ...status, target };
}

function getHobbsBattleProtectState(player) {
  if (!player || player.activeCharacterId !== "tanker3") return null;
  const status = player.statuses?.hobbsBattleProtect;
  if (!status || !status.targetId) return null;
  const target = state.players.find((candidate) => candidate?.id === status.targetId) || null;
  if (!target) return null;
  return { ...status, target };
}

function clearHobbsProtectiveDetail(player, reason = null) {
  if (!player || player.activeCharacterId !== "tanker3") return;
  if (!player.statuses?.hobbsProtectiveDetail) return;
  player.statuses.hobbsProtectiveDetail = null;
  if (reason) log(reason, true);
}

function clearHobbsBattleProtect(player, reason = null) {
  if (!player || player.activeCharacterId !== "tanker3") return;
  if (!player.statuses?.hobbsBattleProtect) return;
  player.statuses.hobbsBattleProtect = null;
  if (reason) log(reason, true);
}

function clearAllHobbsEffects(player, reason = null) {
  if (!player || player.activeCharacterId !== "tanker3") return;
  clearHobbsProtectiveDetail(player, reason);
  clearHobbsBattleProtect(player);
}

function getHobbsProtectiveCasterForTarget(target) {
  if (!target) return null;
  return state.players.find((player) => {
    const detail = getHobbsProtectiveDetailState(player);
    return !!detail && detail.target?.id === target.id;
  }) || null;
}

function getHobbsBattleProtectCasterForTarget(target) {
  if (!target) return null;
  return state.players.find((player) => {
    const detail = getHobbsBattleProtectState(player);
    return !!detail && detail.target?.id === target.id;
  }) || null;
}

function getHobbsProtectiveDetailCandidates(player) {
  if (!player?.position) return [];
  return state.players.filter((candidate) => candidate
    && candidate.position
    && !isPlayerReturningToStart(candidate)
    && (candidate === player || arePlayersAllied(player, candidate))
    && arePointsAdjacentOrSame(player.position, candidate.position));
}

function getHobbsBreakItUpCandidates(player) {
  const map = new Map();
  getHobbsProtectiveDetailCandidates(player).forEach((candidate) => map.set(candidate.id, candidate));
  const detail = getHobbsProtectiveDetailState(player);
  if (detail?.target) map.set(detail.target.id, detail.target);
  return Array.from(map.values());
}

function setHobbsProtectiveDetail(caster, target) {
  if (!caster || caster.activeCharacterId !== "tanker3" || !target) return false;
  state.players.forEach((player) => {
    if (player?.activeCharacterId !== "tanker3" || player.id === caster.id) return;
    const detail = getHobbsProtectiveDetailState(player);
    if (detail?.target?.id === target.id) clearHobbsProtectiveDetail(player);
  });
  caster.statuses.hobbsProtectiveDetail = {
    targetId: target.id,
    selfTarget: target.id === caster.id,
    defenseHp: 50,
    remainingOwnerTurnEnds: 3
  };
  return true;
}

function setHobbsBattleProtect(caster, target) {
  if (!caster || caster.activeCharacterId !== "tanker3" || !target) return false;
  state.players.forEach((player) => {
    if (player?.activeCharacterId !== "tanker3" || player.id === caster.id) return;
    const detail = getHobbsBattleProtectState(player);
    if (detail?.target?.id === target.id) clearHobbsBattleProtect(player);
  });
  caster.statuses.hobbsBattleProtect = {
    targetId: target.id,
    remainingOwnerTurnEnds: 2
  };
  return true;
}

function tickHobbsStatusesAtOwnerTurnEnd(player) {
  if (!player || player.activeCharacterId !== "tanker3") return;
  const defensive = getHobbsProtectiveDetailState(player);
  if (defensive) {
    const nextRemaining = Math.max(0, Number(defensive.remainingOwnerTurnEnds) - 1);
    if (nextRemaining <= 0) {
      clearHobbsProtectiveDetail(player, `${player.name}'s Protective Detail ended.`);
    } else {
      player.statuses.hobbsProtectiveDetail.remainingOwnerTurnEnds = nextRemaining;
    }
  }
  const battleProtect = getHobbsBattleProtectState(player);
  if (battleProtect) {
    const nextRemaining = Math.max(0, Number(battleProtect.remainingOwnerTurnEnds) - 1);
    if (nextRemaining <= 0) {
      clearHobbsBattleProtect(player, `${player.name}'s Break It Up ended.`);
    } else {
      player.statuses.hobbsBattleProtect.remainingOwnerTurnEnds = nextRemaining;
    }
  }
}

function getHobbsProtectionRedirectResult(targetPlayer, damage, sourceOwnerIndex = null, message = "") {
  const caster = getHobbsProtectiveCasterForTarget(targetPlayer);
  const detail = getHobbsProtectiveDetailState(caster);
  if (!caster || !detail || detail.target?.id !== targetPlayer.id) {
    return { remainingDamage: damage, handled: false };
  }
  const incoming = Math.max(0, Number(damage) || 0);
  if (incoming <= 0) return { remainingDamage: 0, handled: true };

  if (detail.selfTarget) {
    const reducedDamage = Math.ceil(incoming / 2);
    caster.statuses.hobbsProtectiveDetail.defenseHp = Math.max(0, Number(detail.defenseHp) - incoming);
    if ((Number(caster.statuses.hobbsProtectiveDetail.defenseHp) || 0) <= 0) {
      clearHobbsProtectiveDetail(caster, `${caster.name}'s Protective Detail ran out.`);
    }
    log(`${caster.name}'s Protective Detail reduced the incoming HP damage to ${reducedDamage}.`, true);
    return { remainingDamage: reducedDamage, handled: true };
  }

  const interceptAmount = Math.min(incoming, Math.max(0, Number(detail.defenseHp) || 0));
  const overflowDamage = Math.max(0, incoming - interceptAmount);
  if (interceptAmount > 0) {
    applyFieldDamage(
      caster,
      interceptAmount,
      `${caster.name} intercepted ${interceptAmount} HP damage for ${targetPlayer.name}.`,
      sourceOwnerIndex,
      { ignoreHobbsProtection: true }
    );
  }
  const nextShield = Math.max(0, (Number(detail.defenseHp) || 0) - interceptAmount);
  caster.statuses.hobbsProtectiveDetail = nextShield > 0
    ? { ...caster.statuses.hobbsProtectiveDetail, defenseHp: nextShield }
    : caster.statuses.hobbsProtectiveDetail;
  if (nextShield <= 0) {
    clearHobbsProtectiveDetail(caster, `${caster.name}'s Protective Detail broke.`);
  }
  if (interceptAmount > 0 && overflowDamage > 0) {
    log(`${targetPlayer.name} still took ${overflowDamage} HP damage after Hobbs's guard broke.`, true);
  } else if (interceptAmount > 0 && overflowDamage <= 0) {
    log(`${targetPlayer.name} took no HP damage because ${caster.name} blocked it.`, true);
  }
  return { remainingDamage: overflowDamage, handled: interceptAmount > 0 };
}

function getHobbsProtectionTargetValue(player, target) {
  if (!player || !target || !target.position) return -Infinity;
  let score = getHobbsStrategicAllyValue(player, target, target.position);
  const hpRatio = (Number(target.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(target, "hp"));
  const techniqueRatio = (Number(player.currentStats?.technique) || 0) / Math.max(1, getCurrentMax(player, "technique"));
  const danger = getComputerEnemyTileDanger(target, target.position, getCell(target.position.row, target.position.col));
  const pressure = getComputerLocalPressure(target, target.position);
  const targetCell = getCell(target.position.row, target.position.col);
  const enemyAdjacency = getVisibleEnemyAdjacencyCount(target, target.position);
  const dangerousEnemyNearby = getVisibleEnemyThreatCountNearPoint(player, target.position);
  const isCriticalTarget = playerHasFlag(target) || isRoyalMarchKing(target) || isHobbsValuableSupportTarget(target) || hpRatio <= 0.45;
  const isImmediateDanger = enemyAdjacency > 0 || dangerousEnemyNearby >= 2.4 || danger >= 3.4 || pressure >= 2.6
    || (targetCell && targetCell.owner !== null && !isFriendlyOwner(targetCell.owner, state.players.indexOf(target)))
    || !!targetCell?.hazard?.type;
  if (target === player) {
    const selfWorth = isHobbsChokepointPosition(player, target.position) || enemyAdjacency > 0 || danger >= 3.2 || dangerousEnemyNearby >= 2.1;
    if (!selfWorth) return -Infinity;
  } else if (!isImmediateDanger && !(isCriticalTarget && dangerousEnemyNearby >= 1.2)) {
    return -Infinity;
  }
  score += (1 - hpRatio) * 12;
  score += danger * 0.9 + pressure * 1.15;
  score += enemyAdjacency * 3.1;
  if (targetCell && targetCell.owner !== null && !isFriendlyOwner(targetCell.owner, state.players.indexOf(target))) score += 4.5;
  if (targetCell && targetCell.hazard?.type) score += 3.8;
  if (target === player && hpRatio <= 0.35) score += 5.2;
  if (target === player && isHobbsChokepointPosition(player, target.position)) score += 7.5;
  if (target !== player && danger <= 0.8 && pressure <= 0.65 && hpRatio >= 0.82 && !playerHasFlag(target) && !isRoyalMarchKing(target)) score -= 4.2;
  if (techniqueRatio <= 0.2) score -= 5;
  return score;
}

function getHobbsBattleProtectTargetValue(player, target) {
  if (!player || !target || !target.position) return -Infinity;
  let score = getHobbsStrategicAllyValue(player, target, target.position) * 1.18;
  const localPressure = getComputerLocalPressure(target, target.position);
  const enemySharingTile = state.players.some((other) => other
    && other.id !== target.id
    && other.position
    && !arePlayersAllied(target, other)
    && other.position.row === target.position.row
    && other.position.col === target.position.col);
  const enemyAdjacency = getVisibleEnemyAdjacencyCount(target, target.position);
  const dangerousEnemyNearby = getVisibleEnemyThreatCountNearPoint(player, target.position);
  const hpRatio = (Number(target.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(target, "hp"));
  const isCriticalTarget = playerHasFlag(target) || isRoyalMarchKing(target) || isHobbsValuableSupportTarget(target) || hpRatio <= 0.42;
  const isImminentBattle = enemySharingTile || enemyAdjacency > 0 || dangerousEnemyNearby >= 2.8 || localPressure >= 3.2;
  if (target === player) {
    if (!isImminentBattle && !isHobbsChokepointPosition(player, target.position)) return -Infinity;
  } else if (!isImminentBattle && !(isCriticalTarget && dangerousEnemyNearby >= 1.6)) {
    return -Infinity;
  }
  if (enemySharingTile) score += 12;
  score += localPressure * 1.45;
  score += enemyAdjacency * 4.5;
  score += dangerousEnemyNearby * 3.8;
  if (target === player) score += 1.2;
  if (getHobbsProtectiveCasterForTarget(target) === player) score += 6.5;
  if (target !== player && hpRatio >= 0.92 && localPressure < 0.6 && enemyAdjacency === 0) score -= 6;
  return score;
}

function chooseComputerHobbsSkillAction(player) {
  if (!player || player.activeCharacterId !== "tanker3") return null;
  const protectReady = (Number(player.cooldowns?.tanker3ProtectiveDetail) || 0) <= 0 && (Number(player.currentStats?.technique) || 0) >= 10 && !getHobbsProtectiveDetailState(player);
  const breakReady = (Number(player.cooldowns?.tanker3BreakItUp) || 0) <= 0 && !getHobbsBattleProtectState(player);

  let bestProtect = null;
  if (protectReady) {
    bestProtect = getHobbsProtectiveDetailCandidates(player)
      .map((target) => ({ target, score: getHobbsProtectionTargetValue(player, target) }))
      .sort((left, right) => right.score - left.score)[0] || null;
  }

  let bestBreak = null;
  if (breakReady) {
    bestBreak = getHobbsBreakItUpCandidates(player)
      .map((target) => ({ target, score: getHobbsBattleProtectTargetValue(player, target) }))
      .sort((left, right) => right.score - left.score)[0] || null;
  }

  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  const mapId = getSelectedMapDefinition()?.id;
  const enemyFlagActive = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
  const protectThreshold = !state.moveDie ? 9.8 : 11.2;
  let breakThreshold = !state.moveDie ? 11.1 : 13.1;
  if (mapId === "flagCarrier" || mapId === "royalMarch" || mapId === "bigBridge") breakThreshold -= 0.9;
  if (enemyFlagActive) breakThreshold -= 0.85;
  if (hpRatio <= 0.36) {
    if (bestBreak && bestBreak.target === player) bestBreak.score -= 5;
    if (bestProtect && bestProtect.target === player) bestProtect.score -= 2.5;
  }
  if (bestBreak && bestBreak.score >= breakThreshold && (!bestProtect || bestBreak.score >= bestProtect.score + 0.8)) {
    return { skillIndex: 1, target: bestBreak.target };
  }
  if (bestProtect && bestProtect.score >= protectThreshold) {
    return { skillIndex: 0, target: bestProtect.target };
  }
  if (bestBreak && bestBreak.score >= breakThreshold) {
    return { skillIndex: 1, target: bestBreak.target };
  }
  return null;
}

function getVisibleEnemyAdjacencyCount(player, point) {
  if (!player || !point) return 0;
  let count = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (distance <= 1) count += 1;
  });
  return count;
}

function getVisibleEnemyThreatCountNearPoint(player, point) {
  if (!player || !point) return 0;
  let count = 0;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || !other.position || arePlayersAllied(player, other)) return;
    if (!isComputerAwareOfPlayerPosition(player, other)) return;
    const distance = Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col);
    if (distance > 2) return;
    let threat = 0.8;
    if (playerHasFlag(other)) threat += isFlagCarrierMapActive() ? 1.7 : 0.45;
    if (isRoyalMarchKing(other)) threat += 1.4;
    const targetValue = getComputerPriorityTargetValue(player, other);
    if (targetValue >= 8) threat += 0.9;
    else if (targetValue >= 4) threat += 0.45;
    count += threat * (distance === 0 ? 1.25 : distance === 1 ? 1 : 0.55);
  });
  return count;
}

function isHobbsValuableSupportTarget(target) {
  return !!target && ["supporter1", "battler4"].includes(target.activeCharacterId);
}

function isHobbsChokepointPosition(player, point) {
  if (!player || !point) return false;
  const mapId = getSelectedMapDefinition()?.id;
  if (!["bigBridge", "royalMarch", "flagCarrier"].includes(mapId)) return false;
  let exits = 0;
  [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ].forEach((delta) => {
    const cell = getCell(point.row + delta.row, point.col + delta.col);
    if (cell && !cell.obstacle) exits += 1;
  });
  return exits <= 2;
}

function getHobbsStrategicAllyValue(player, ally, point = null) {
  if (!player || !ally) return 0;
  const origin = point || ally.position;
  let value = ally === player ? 2.4 : 0;
  const hpRatio = (Number(ally.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(ally, "hp"));
  const missingTotal = ["attack", "hp", "technique"].reduce((sum, statKey) => {
    return sum + Math.max(0, getCurrentMax(ally, statKey) - (Number(ally.currentStats?.[statKey]) || 0));
  }, 0);
  value += (1 - hpRatio) * 10.5;
  value += Math.min(8, missingTotal * 0.1);
  if (playerHasFlag(ally)) value += isFlagCarrierMapActive() ? 48 : 18;
  if (isRoyalMarchMapActive() && isRoyalMarchKing(ally)) value += 42;
  if (isHobbsValuableSupportTarget(ally)) value += 8;
  if (hpRatio <= 0.38) value += 8.5;
  if (origin) {
    if (isCentralDominionMapActive()) {
      const cell = getCell(origin.row, origin.col);
      if (cell && isCellInControlArea(cell)) value += 12;
    }
    if (isCaptureTerritoryMapActive()) {
      const cell = getCell(origin.row, origin.col);
      const profile = getCaptureTerritoryProfileForCell(player, cell);
      if (profile?.enemyControlled || profile?.ownFavoredButContested || profile?.summary?.contested) value += 13;
    }
    if (getSelectedMapDefinition()?.id === "simpleArena") {
      const flagAccess = getFlagAccessScoreAtPoint(origin.row, origin.col);
      value += flagAccess * 0.4;
    }
    if (getSelectedMapDefinition()?.id === "bigBridge" && isHobbsChokepointPosition(player, origin)) value += 8;
  }
  return value;
}

function getHobbsPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "tanker3" || !Array.isArray(path) || !path.length) return 0;
  const endpoint = path[path.length - 1];
  const origin = path[0] || endpoint;
  if (!endpoint || !origin) return 0;
  let bonus = 0;
  let bestAllyPressure = 0;
  state.players.forEach((ally) => {
    if (!ally || ally.id === player.id || !ally.position || !arePlayersAllied(player, ally)) return;
    const targetValue = getHobbsStrategicAllyValue(player, ally, ally.position);
    if (targetValue <= 0) return;
    const endDistance = Math.abs(ally.position.row - endpoint.row) + Math.abs(ally.position.col - endpoint.col);
    const originDistance = Math.abs(ally.position.row - origin.row) + Math.abs(ally.position.col - origin.col);
    let local = 0;
    if (endDistance <= 1) local += targetValue * 0.7;
    else if (endDistance === 2) local += targetValue * 0.42;
    else if (endDistance === 3) local += targetValue * 0.18;
    if (originDistance > endDistance) local += Math.min(9, (originDistance - endDistance) * 1.9);
    else if (endDistance > originDistance && targetValue >= 12) local -= Math.min(8, (endDistance - originDistance) * 1.7);
    if (playerHasFlag(ally) && endDistance <= 1) local += isFlagCarrierMapActive() ? 28 : 8;
    if (isRoyalMarchMapActive() && isRoyalMarchKing(ally) && endDistance <= 1) local += 20;
    bestAllyPressure = Math.max(bestAllyPressure, local);
  });
  bonus += bestAllyPressure;
  if (getHobbsProtectiveDetailState(player)?.selfTarget) {
    const localDanger = getComputerEnemyTileDanger(player, endpoint, endCell || getCell(endpoint.row, endpoint.col));
    if (isHobbsChokepointPosition(player, endpoint)) bonus += 6.5 + localDanger * 0.35;
  } else if ((Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp")) <= 0.34) {
    bonus -= getComputerEnemyTileDanger(player, endpoint, endCell || getCell(endpoint.row, endpoint.col)) * 0.55;
  }
  return bonus;
}

function getMoppetMessMagnetParts(player, opponent) {
  if (!player?.position || player.activeCharacterId !== "battler5") {
    return { enemyBonus: 0, ownPenalty: 0 };
  }
  const ownStart = player.startPosition;
  const opponentStart = opponent?.startPosition;
  const currentPoint = player.position;
  const enemyDistance = opponentStart
    ? Math.max(Math.abs(currentPoint.row - opponentStart.row), Math.abs(currentPoint.col - opponentStart.col))
    : Number.POSITIVE_INFINITY;
  const ownDistance = ownStart
    ? Math.max(Math.abs(currentPoint.row - ownStart.row), Math.abs(currentPoint.col - ownStart.col))
    : Number.POSITIVE_INFINITY;
  return {
    enemyBonus: getMoppetMessMagnetTierBonus(enemyDistance),
    ownPenalty: getMoppetMessMagnetTierBonus(ownDistance)
  };
}

function getMoppetStartZoneProfile(player, point = null) {
  if (!player || player.activeCharacterId !== "battler5") {
    return { enemyBonus: 0, ownPenalty: 0, bestEnemyStart: null };
  }
  const origin = point || player.position;
  if (!origin) return { enemyBonus: 0, ownPenalty: 0, bestEnemyStart: null };
  let enemyBonus = 0;
  let bestEnemyStart = null;
  state.players.forEach((other) => {
    if (!other || other.id === player.id || arePlayersAllied(player, other) || !other.startPosition) return;
    const distance = Math.max(Math.abs(origin.row - other.startPosition.row), Math.abs(origin.col - other.startPosition.col));
    const bonus = getMoppetMessMagnetTierBonus(distance);
    if (bonus > enemyBonus) {
      enemyBonus = bonus;
      bestEnemyStart = { ...other.startPosition, distance, player: other };
    }
  });
  const ownPenalty = player.startPosition
    ? getMoppetMessMagnetTierBonus(Math.max(Math.abs(origin.row - player.startPosition.row), Math.abs(origin.col - player.startPosition.col)))
    : 0;
  return { enemyBonus, ownPenalty, bestEnemyStart };
}

function getMoppetPriorityTargetValue(player, opponent, point = null) {
  if (!player || player.activeCharacterId !== "battler5" || !opponent) return 0;
  let value = 0;
  if (playerHasFlag(opponent)) value += 18;
  if (isRoyalMarchMapActive() && isRoyalMarchKing(opponent)) value += 12;
  if (["supporter1", "battler5", "battler4"].includes(opponent.activeCharacterId)) value += 5;
  const profile = getMoppetStartZoneProfile(player, point || opponent.position || player.position);
  if (profile.enemyBonus >= 10) value += 6;
  const clutter = getMoppetClutterFuryParts(player, opponent);
  value += clutter.enemyBonus * 0.55;
  value -= clutter.allyPenalty * 0.65;
  return value;
}

function getMoppetPathTacticalBonus(player, path, endCell) {
  if (!player || player.activeCharacterId !== "battler5" || !Array.isArray(path) || !path.length || !endCell) return 0;
  const endpoint = path[path.length - 1];
  const profile = getMoppetStartZoneProfile(player, endpoint);
  const currentProfile = getMoppetStartZoneProfile(player, player.position);
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  const totalMissing = ["attack", "hp", "technique"].reduce((sum, statKey) => (
    sum + Math.max(0, getCurrentMax(player, statKey) - (Number(player.currentStats?.[statKey]) || 0))
  ), 0);
  let bonus = 0;
  bonus += profile.enemyBonus * 2.4;
  bonus -= profile.ownPenalty * 2.8;
  bonus += Math.max(0, profile.enemyBonus - currentProfile.enemyBonus) * 1.8;
  bonus -= Math.max(0, profile.ownPenalty - currentProfile.ownPenalty) * 1.2;
  if (profile.bestEnemyStart?.distance <= 1) bonus += 9;
  else if (profile.bestEnemyStart?.distance <= 2) bonus += 5;
  else if (profile.bestEnemyStart?.distance <= 3) bonus += 2;
  if (canMoppetUseBorrowedBreakroom(player, endCell) && totalMissing >= 42) bonus += 20;
  else if (canMoppetUseBorrowedBreakroom(player, endCell) && totalMissing <= 18) bonus -= 7;
  if (isMoppetEmergencyCalloutActive(player)) {
    bonus -= getComputerEnemyTileDanger(player, endpoint, endCell) * 0.45;
    if (profile.enemyBonus >= 10) bonus += 6;
  }
  const opponentOnEndpoint = state.players.find((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && isComputerAwareOfPlayerPosition(player, other)
    && other.position
    && other.position.row === endpoint.row
    && other.position.col === endpoint.col);
  if (opponentOnEndpoint && canBattleOccurAtCellForPlayers(player, opponentOnEndpoint, endpoint.row, endpoint.col)) {
    bonus += getMoppetPriorityTargetValue(player, opponentOnEndpoint, endpoint);
    if (profile.ownPenalty >= 10) bonus -= 7;
  }
  if (isFlagCarrierMapActive() && !playerHasFlag(player)) {
    bonus += Math.max(0, getFlagCarrierFrontlineValue(player, endpoint)) * 0.22;
    if (playerHasFlag(opponentOnEndpoint)) bonus += 16;
  }
  return bonus + (hpRatio <= 0.42 ? -2.8 : 0);
}

function canBattleOccurAtCellForPlayers(playerA, playerB, row, col) {
  if (!playerA || !playerB) return false;
  if (arePlayersAllied(playerA, playerB)) return false;
  const cell = getCell(row, col);
  if (!cell) return false;
  return cell.startOwner === null;
}

function canBattleOccurBetweenPlayers(playerA, playerB) {
  if (!playerA?.position || !playerB?.position) return false;
  if (playerA.position.row !== playerB.position.row || playerA.position.col !== playerB.position.col) return false;
  return canBattleOccurAtCellForPlayers(playerA, playerB, playerA.position.row, playerA.position.col);
}

function canBattleRascaClone(player, clone) {
  if (!player || !clone || !player.position) return false;
  const owner = state.players[clone.ownerIndex];
  if (!owner || arePlayersAllied(player, owner)) return false;
  if (owner.id === player.id) return false;
  return player.position.row === clone.row && player.position.col === clone.col;
}

async function resolveRascaCloneBattle(challenger, clone) {
  const owner = state.players[clone.ownerIndex];
  if (!challenger || !owner || !clone) return;
  state.turnHadBattle = true;
  const cloneCombatant = createRascaCloneCombatant(clone);
  const cloneCountBefore = Math.max(1, getRascaClonesForPlayer(owner).length);
  log(`${challenger.name} and ${cloneCombatant.name} started a battle.`, true);
  await playBattleIntro(challenger, cloneCombatant);
  const choiceA = await chooseBattleStat(challenger, cloneCombatant, "left");
  const choiceB = await chooseBattleStat(cloneCombatant, challenger, "right");
  const context = { initiator: challenger };
  const breakdownA = calculateBattleBreakdown(challenger, cloneCombatant, choiceA, choiceB, context);
  const breakdownB = calculateBattleBreakdown(cloneCombatant, challenger, choiceB, choiceA, context);
  await playBattleResultSequence(challenger, cloneCombatant, choiceA, choiceB, breakdownA, breakdownB);
  consumeMesmerSyncBattleUse(challenger);
  const valueA = breakdownA.finalValue;
  const valueB = breakdownB.finalValue;
  const challengerShardCount = getForceShardCount(challenger);
  if (challengerShardCount > 0) {
    removeOneStackedItem(challenger, "forceShard", challengerShardCount);
    log(`${challenger.name} consumed ${challengerShardCount} Power Shard${challengerShardCount === 1 ? "" : "s"}.`, true);
  }
  const ownerShardCount = getForceShardCount(owner);
  if (ownerShardCount > 0) {
    removeOneStackedItem(owner, "forceShard", ownerShardCount);
    log(`${owner.name}'s detached tail consumed ${ownerShardCount} Power Shard${ownerShardCount === 1 ? "" : "s"} through Shed Relay.`, true);
  }
  if (valueA === valueB) {
    log(`The battle ended in a draw. ${challenger.name} and the detached tail stayed in place.`, true);
    renderAll();
    return;
  }
  if (valueA > valueB) {
    const remainingHp = Math.max(0, Number(clone.hp) || 0);
    removeRascaClone(clone.id);
    challenger.battleWins = Math.max(0, Number(challenger.battleWins) || 0) + (1 / cloneCountBefore);
    if (remainingHp > 0) {
      applyFieldDamage(owner, remainingHp, `${owner.name}'s detached tail was defeated, so ${owner.name} took ${remainingHp} HP damage.`, state.players.indexOf(challenger));
    }
    log(`${challenger.name} defeated ${owner.name}'s detached tail.`, true);
    renderAll();
    return;
  }
  log(`${owner.name}'s detached tail won the battle.`, true);
  const battleExhaustionAmount = calculateBattleExhaustionAmount(valueB, valueA, owner);
  challenger.battleExhaustionMax = 5;
  addMimiCoins(owner, 10, "winning a battle through a detached tail");
  addMimiCoins(challenger, 5, "losing a battle");
  owner.battleWins = Math.max(0, Number(owner.battleWins) || 0) + 1;
  awardRoyalMarchKingDefeatBonus(owner, challenger, `defeating ${challenger.name}'s king with a detached tail`);

  const battleCell = getCell(clone.row, clone.col);
  const ownerIndex = state.players.indexOf(owner);
  if (battleCell?.startOwner === null && canPlayerRepaintCell(ownerIndex, battleCell)) {
    battleCell.owner = ownerIndex;
  }

  const loserOutcome = await chooseBattleLossConsequence(challenger, owner, challenger, owner, battleExhaustionAmount);
  transferFlagToPlayer(owner, challenger, 'stole');
  if (Number.isInteger(loserOutcome.loserItemIndex)) {
    applyBattleItemTransfer(owner, challenger, loserOutcome);
    ensureMimiModeAfterCoinChange(owner);
    ensureMimiModeAfterCoinChange(challenger);
  }
  await processFoodCourtBattleFoodTransfer(owner, challenger);
  await applyCorvenBlackFeatherOnBattleLoss(challenger, owner);
  if (challenger.activeCharacterId === "battler4") {
    resetCorvenForcedReturnState(challenger);
  }
  clearBrakkPaintBomb(challenger, "lost to a detached tail");
  await animatePlayerReturnToStart(challenger);
  log(`${challenger.name} was returned to the starting tile after losing the battle.`, true);
  const exhaustionLosses = applyBattleExhaustion(owner, battleExhaustionAmount);
  owner.battleExhaustionMax = Math.max(5, (Number(owner.battleExhaustionMax) || 5) + 2);
  if (battleExhaustionAmount > 0) {
    log(`${owner.name} lost ${battleExhaustionAmount} from each stat due to exhaustion.`, true);
  }
  if (exhaustionLosses.length) {
    queueStatLossPopup(owner, exhaustionLosses);
  }
  renderAll();
}

function restFlow() {
  const player = getCurrentPlayer();
  if (!maybeShowRestButton()) return;
  const partialRestoreAmount = getMoppetRestRestoreAmount(player);
  ["attack", "hp", "technique"].forEach((key) => {
    if (partialRestoreAmount !== null) {
      player.currentStats[key] = Math.min(getCurrentMax(player, key), (Number(player.currentStats?.[key]) || 0) + partialRestoreAmount);
    } else {
      player.currentStats[key] = getCurrentMax(player, key);
    }
  });
  player.turnFlags.skippedMoveByRest = true;
  const restMessage = partialRestoreAmount !== null
    ? `${player.name} took rest on an opponent's starting tile and restored 25 to each stat!`
    : `${player.name} took rest and restored all stats!`;
  showTopPlayerEventBanner(player, sanitize(restMessage));
  log(restMessage, true);
  renderAll();
  advanceTurn();
}

function tryTriggerHobbsBattleProtection(protectedPlayer, opposingPlayer) {
  const caster = getHobbsBattleProtectCasterForTarget(protectedPlayer);
  const protectState = getHobbsBattleProtectState(caster);
  if (!caster || !protectState || protectState.target?.id !== protectedPlayer.id) return false;
  clearHobbsBattleProtect(caster, `${caster.name}'s Break It Up was consumed.`);
  log(`${caster.name} broke up the battle and protected ${protectedPlayer.name} from ${opposingPlayer.name}.`, true);
  applyFieldDamage(caster, 15, `${caster.name} took 15 HP damage from Break It Up.`, state.players.indexOf(opposingPlayer), { ignoreHobbsProtection: false });
  renderAll();
  return true;
}

function maybeResolveBattle() {
  const current = getCurrentPlayer();
  if (!current?.position || isPlayerReturningToStart(current)) return Promise.resolve();
  const clone = getRascaCloneAt(current.position.row, current.position.col, (candidate) => canBattleRascaClone(current, candidate));
  if (clone) return resolveRascaCloneBattle(current, clone);
  const opponents = state.players.filter((otherPlayer, index) => {
    if (index === state.currentPlayerIndex || !otherPlayer?.position || isPlayerReturningToStart(otherPlayer)) return false;
    if (otherPlayer.position.row !== current.position.row || otherPlayer.position.col !== current.position.col) return false;
    return canBattleOccurBetweenPlayers(current, otherPlayer);
  });
  if (!opponents.length) return Promise.resolve();
  const selectedOpponent = opponents.length === 1 ? opponents[0] : opponents[randomInt(0, opponents.length - 1)];
  if (tryTriggerHobbsBattleProtection(current, selectedOpponent) || tryTriggerHobbsBattleProtection(selectedOpponent, current)) {
    return Promise.resolve();
  }
  return resolveBattle(current, selectedOpponent);
}

function applyMimiEndTurnModeEffect(player) {
  if (!player || player.activeCharacterId !== "trickster1") return;
  if (isMimiInStarMode(player)) {
    const gains = [];
    ["attack", "hp", "technique"].forEach((statKey) => {
      const before = Number(player.currentStats?.[statKey]) || 0;
      const maxValue = getCurrentMax(player, statKey);
      player.currentStats[statKey] = Math.min(maxValue, before + 1);
      const gained = player.currentStats[statKey] - before;
      if (gained > 0) gains.push({ statKey, amount: gained });
    });
    if (gains.length) {
      queueStatGainPopup(player, gains);
      log(`${player.name} recovered 1 to each current stat in Star Mode.`, true);
    }
    return;
  }
  if (isMimiInGamblerMode(player)) {
    const losses = applyAllStatLoss(player, 3);
    if (losses.length) {
      log(`${player.name} lost 3 from each current stat in Gambler Mode.`, true);
    }
  }
}

function processRascaCloneEndTurnEffects(player) {
  const ownerIndex = state.players.indexOf(player);
  if (ownerIndex < 0) return;
  const clones = [...getRascaClonesForPlayer(ownerIndex)];
  clones.forEach((clone) => {
    const cell = getCell(clone.row, clone.col);
    const hostileZone = cell?.zones?.find((zone) => !isFriendlyOwner(zone.ownerIndex, ownerIndex));
    if (hostileZone) {
      const damage = getPoisonFogDamageForExposure(clone, hostileZone);
      damageRascaClone(clone, damage, "poison fog", hostileZone.ownerIndex);
      if ((Number(clone.hp) || 0) <= 0) return;
    } else {
      clearPoisonFogExposure(clone);
    }
    const hostilePit = cell?.pits?.find((pit) => !isFriendlyOwner(pit.ownerIndex, ownerIndex));
    if (hostilePit) {
      damageRascaClone(clone, 30, "pitfall", hostilePit.ownerIndex);
      cell.pits = cell.pits.filter((pit) => pit.id !== hostilePit.id);
    }
  });
  getRascaClonesForPlayer(ownerIndex).filter((clone) => clone.enhanced).forEach((clone) => {
    const impactPoints = [];
    state.players.forEach((target, targetIndex) => {
      if (!target || targetIndex === ownerIndex || !target.position || arePlayersAllied(player, target)) return;
      if (Math.abs(target.position.row - clone.row) + Math.abs(target.position.col - clone.col) > 1) return;
      impactPoints.push({ row: target.position.row, col: target.position.col });
      applyFieldDamage(target, 10, `${target.name} took 10 HP damage from ${player.name}'s enhanced detached tail.`, ownerIndex);
    });
    triggerRascaTailImpactEffects(impactPoints);
  });
}

async function resolveBattle(playerA, playerB) {
  if (state.computerTurnTimer) {
    window.clearTimeout(state.computerTurnTimer);
    state.computerTurnTimer = null;
  }
  state.turnHadBattle = true;
  log(`${playerA.name} and ${playerB.name} started a battle.`, true);

  await playBattleIntro(playerA, playerB);

  const choiceA = await chooseBattleStat(playerA, playerB, "left");
  const choiceB = await chooseBattleStat(playerB, playerA, "right");

  const battleContext = { initiator: playerA };
  const breakdownA = calculateBattleBreakdown(playerA, playerB, choiceA, choiceB, battleContext);
  const breakdownB = calculateBattleBreakdown(playerB, playerA, choiceB, choiceA, battleContext);
  const valueA = breakdownA.finalValue;
  const valueB = breakdownB.finalValue;

  await playBattleResultSequence(playerA, playerB, choiceA, choiceB, breakdownA, breakdownB);
  consumeMesmerSyncBattleUse(playerA, playerB);

  let winner;
  let loser;
  if (valueA === valueB) {
    const tieWinner = getTieWinnerByPassive(playerA, playerB);
    if (!tieWinner) {
      log(`The battle ended in a draw. ${playerA.name} and ${playerB.name} stayed in place.`, true);
      renderAll();
      if (isTutorialActive() && getTutorialStep() === 9) {
        setTimeout(() => resetTutorialBattleStep(), 260);
      }
      if (isTutorialActive() && getTutorialStep() === 10) {
        setTimeout(() => resetTutorialFlagStealBattleStep(), 260);
      }
      return;
    }
    winner = tieWinner === playerA
      ? { player: playerA, choice: choiceA, value: valueA }
      : { player: playerB, choice: choiceB, value: valueB };
    loser = tieWinner === playerA
      ? { player: playerB, choice: choiceB, value: valueB }
      : { player: playerA, choice: choiceA, value: valueA };
    log(`The battle ended in a draw, but ${winner.player.name}'s Dominion of Balance turned it into a win.`, true);
  } else if (valueA > valueB) {
    winner = { player: playerA, choice: choiceA, value: valueA };
    loser = { player: playerB, choice: choiceB, value: valueB };
  } else {
    winner = { player: playerB, choice: choiceB, value: valueB };
    loser = { player: playerA, choice: choiceA, value: valueA };
  }

  applyBattleAfterEffects(playerA, playerB, choiceA, choiceB, valueA, valueB, winner.player);
  const battleExhaustionAmount = calculateBattleExhaustionAmount(winner.value, loser.value, winner.player);
  loser.player.battleExhaustionMax = 5;
  log(`${winner.player.name} won the battle.`, true);
  addMimiCoins(winner.player, 10, "winning a battle");
  addMimiCoins(loser.player, 5, "losing a battle");
  winner.player.battleWins = Math.max(0, Number(winner.player.battleWins) || 0) + 1;
  awardRoyalMarchKingDefeatBonus(winner.player, loser.player, `defeating ${loser.player.name}'s king in battle`);

  const battleCell = getCell(winner.player.position.row, winner.player.position.col);
  const winnerIndex = state.players.indexOf(winner.player);
  if (battleCell.startOwner === null && canPlayerRepaintCell(winnerIndex, battleCell)) {
    battleCell.owner = winnerIndex;
  }

  const loserOutcome = await chooseBattleLossConsequence(loser.player, winner.player, playerA, playerB, battleExhaustionAmount);
  transferFlagToPlayer(winner.player, loser.player, 'stole');
  if (Number.isInteger(loserOutcome.loserItemIndex)) {
    applyBattleItemTransfer(winner.player, loser.player, loserOutcome);
    ensureMimiModeAfterCoinChange(winner.player);
    ensureMimiModeAfterCoinChange(loser.player);
  }
  await processFoodCourtBattleFoodTransfer(winner.player, loser.player);
  await applyCorvenBlackFeatherOnBattleLoss(loser.player, winner.player);
  if (loser.player.activeCharacterId === "battler4") {
    resetCorvenForcedReturnState(loser.player);
  }
  clearBrakkPaintBomb(loser.player, "Brakk lost the battle");
  await animatePlayerReturnToStart(loser.player);
  log(`${loser.player.name} was returned to the starting tile after losing the battle.`, true);
  const exhaustionLosses = applyBattleExhaustion(winner.player, battleExhaustionAmount);
  winner.player.battleExhaustionMax = Math.max(5, (Number(winner.player.battleExhaustionMax) || 5) + 2);
  if (battleExhaustionAmount > 0) {
    log(`${winner.player.name} lost ${battleExhaustionAmount} from each stat due to exhaustion.`, true);
  }
  if (exhaustionLosses.length) {
    queueStatLossPopup(winner.player, exhaustionLosses);
  }
  renderAll();
  if (isTutorialActive() && getTutorialStep() === 9) {
    setTimeout(() => {
      if (winner.player === state.players[0]) {
        showTutorialModal('Battle won', 'Well done. You won the tutorial battle by choosing a strong matchup. Next you will fight again to steal a flag from the CPU.', () => prepareTutorialFlagStealBattleStep());
      } else {
        resetTutorialBattleStep();
      }
    }, 280);
  }
  if (isTutorialActive() && getTutorialStep() === 10) {
    setTimeout(() => {
      if (winner.player === state.players[0] && playerHasFlag(state.players[0])) {
        showTutorialModal('Flag stolen', 'Winning a battle against a flag carrier transfers the flag automatically. The last tutorial step will now show the result screen.', () => prepareTutorialFinishStep());
      } else {
        resetTutorialFlagStealBattleStep();
      }
    }, 280);
  }
}

function isMistveilInitiatorBonusActive(player, context = {}) {
  return !!player
    && player.activeCharacterId === "painter2"
    && (Number(player.statuses?.hiddenTurns) || 0) > 0
    && context.initiator === player;
}

function calculateBattleBreakdown(player, opponent, ownChoice, opponentChoice, context = {}) {
  const displayedState = getDisplayedBattleStatState(player, opponent, ownChoice);
  let baseValue = displayedState.value;
  const ownerIndex = state.players.indexOf(player);
  const cell = getCell(player.position.row, player.position.col);
  const hasAdvantage = checkAdvantage(ownChoice, opponentChoice);
  const bonuses = [];
  const forceShardCount = getForceShardCount(player);

  if (forceShardCount > 0) {
    bonuses.push({ type: 'forceShard', amount: forceShardCount * 8, label: `+${forceShardCount * 8}` });
  }

  if (player.activeCharacterId === "battler2" && ownChoice === "attack" && opponentChoice !== "hp") {
    bonuses.push({ type: "passive", amount: 12, label: "+12" });
  }

  const gallusSupportCount = getGallusBattleSupportersForPlayer(player).length;
  if (gallusSupportCount > 0) {
    bonuses.push({ type: "support", amount: gallusSupportCount * 5, label: `+${gallusSupportCount * 5}` });
  }

  if (isMistveilInitiatorBonusActive(player, context)) {
    bonuses.push({ type: "mistveil", amount: 5, label: "+5" });
  }

  if (player.activeCharacterId === "battler5") {
    const messMagnetParts = getMoppetMessMagnetParts(player, opponent);
    if (messMagnetParts.enemyBonus > 0) {
      bonuses.push({
        type: "messMagnetEnemy",
        amount: messMagnetParts.enemyBonus,
        label: `+${messMagnetParts.enemyBonus}`
      });
    }
    if (messMagnetParts.ownPenalty > 0) {
      bonuses.push({
        type: "messMagnetOwn",
        amount: -messMagnetParts.ownPenalty,
        label: `-${messMagnetParts.ownPenalty}`
      });
    }
    const clutterFuryParts = getMoppetClutterFuryParts(player, opponent);
    if (clutterFuryParts.enemyBonus > 0) {
      bonuses.push({
        type: "clutterFury",
        amount: clutterFuryParts.enemyBonus,
        label: `+${clutterFuryParts.enemyBonus}`
      });
    }
    if (clutterFuryParts.allyPenalty > 0) {
      bonuses.push({
        type: "clutterFuryAlly",
        amount: -clutterFuryParts.allyPenalty,
        label: `-${clutterFuryParts.allyPenalty}`
      });
    }
  }

  if (hasAdvantage) {
    const sameCharacterMatch = !!player?.activeCharacterId
      && player.activeCharacterId === opponent?.activeCharacterId
      && !player?.isRascaTailCombatant
      && !opponent?.isRascaTailCombatant;
    let advantageBonus = sameCharacterMatch ? 40 : 25;
    if (player.activeCharacterId === "battler1" && cell.owner === ownerIndex) {
      advantageBonus = opponent?.activeCharacterId === "battler1" ? 60 : 40;
    }
    bonuses.push({ type: "advantage", amount: advantageBonus, label: `+${advantageBonus}` });
  }

  const finalValue = bonuses.reduce((sum, item) => sum + item.amount, baseValue);
  return {
    baseValue,
    bonuses,
    finalValue
  };
}

function calculateBattleValue(player, opponent, ownChoice, opponentChoice, context = {}) {
  return calculateBattleBreakdown(player, opponent, ownChoice, opponentChoice, context).finalValue;
}

function calculateBattleExhaustionAmount(winnerValue, loserValue, winnerPlayer) {
  const safeWinner = Math.max(0, Number(winnerValue) || 0);
  const safeLoser = Math.max(0, Number(loserValue) || 0);
  const currentMax = Math.max(0, Number(winnerPlayer?.battleExhaustionMax) || 5);
  if (safeWinner <= 0 || safeLoser <= 0 || currentMax <= 0) return 0;
  const ratio = safeLoser / safeWinner;
  const exhaustion = Math.round(ratio * currentMax);
  return Math.max(0, Math.min(currentMax, exhaustion));
}

function applyBattleExhaustion(winnerPlayer, exhaustionAmount) {
  const safeAmount = Math.max(0, Number(exhaustionAmount) || 0);
  if (!winnerPlayer || safeAmount <= 0) return [];
  const losses = [];
  let totalLoss = 0;
  ["attack", "hp", "technique"].forEach((statKey) => {
    const before = Math.max(0, Number(winnerPlayer.currentStats?.[statKey]) || 0);
    const after = before - safeAmount <= 0 ? 1 : before - safeAmount;
    const actualLoss = Math.max(0, before - after);
    winnerPlayer.currentStats[statKey] = after;
    if (actualLoss > 0) {
      losses.push({ statKey, amount: actualLoss });
      totalLoss += actualLoss;
    }
  });
  registerCorvenTurnLoss(winnerPlayer, totalLoss);
  return losses;
}

function checkAdvantage(a, b) {
  return (
    (a === "attack" && b === "technique") ||
    (a === "technique" && b === "hp") ||
    (a === "hp" && b === "attack")
  );
}

function isMesmerSyncActiveFor(player) {
  return !!player
    && player.activeCharacterId === "battler3"
    && (Number(player.statuses?.mesmerSyncRounds) || 0) > 0
    && (Number(player.statuses?.mesmerSyncBattleRemaining) || 0) > 0;
}

function getMesmerSyncSourcePlayer(player, opponent) {
  if (isMesmerSyncActiveFor(opponent)) return opponent;
  return player;
}

function getDisplayedBattleStatState(player, opponent, statKey) {
  const sourcePlayer = getMesmerSyncSourcePlayer(player, opponent);
  return {
    value: Math.max(0, Number(sourcePlayer?.currentStats?.[statKey]) || 0),
    maxValue: Math.max(1, Number(getCurrentMax(sourcePlayer, statKey)) || 1),
    sourcePlayer
  };
}

function consumeMesmerSyncBattleUse(...participants) {
  participants.forEach((player) => {
    if (!isMesmerSyncActiveFor(player)) return;
    player.statuses.mesmerSyncBattleRemaining = Math.max(0, (Number(player.statuses?.mesmerSyncBattleRemaining) || 0) - 1);
    if ((Number(player.statuses?.mesmerSyncBattleRemaining) || 0) <= 0) {
      player.statuses.mesmerSyncRounds = 0;
      log(`${player.name}'s Mesmer Sync was consumed.`, true);
    }
  });
}

function getTieWinnerByPassive(playerA, playerB) {
  const playerANaja = playerA?.activeCharacterId === "battler3";
  const playerBNaja = playerB?.activeCharacterId === "battler3";
  if (playerANaja && !playerBNaja) return playerA;
  if (playerBNaja && !playerANaja) return playerB;
  return null;
}

function getBattleAdvantageBonusPreview(player, opponent = null) {
  const ownerIndex = state.players.indexOf(player);
  const cell = player && player.position ? getCell(player.position.row, player.position.col) : null;
  const sameCharacterMatch = !!player?.activeCharacterId
    && player.activeCharacterId === opponent?.activeCharacterId
    && !player?.isRascaTailCombatant
    && !opponent?.isRascaTailCombatant;
  if (player.activeCharacterId === "battler1" && cell && cell.owner === ownerIndex) {
    return opponent?.activeCharacterId === "battler1" ? 60 : 40;
  }
  return sameCharacterMatch ? 40 : 25;
}

function getBattleSwingBonusPreview() {
  return 0;
}

function getActivePushAheadSupportersForPlayer(player) {
  if (!player?.position) return [];
  return state.players.filter((supporter) => supporter
    && supporter.activeCharacterId === "supporter1"
    && (Number(supporter.statuses?.pushAheadRounds) || 0) > 0
    && supporter.position
    && (supporter === player || arePlayersAllied(supporter, player))
    && arePointsAdjacentOrSame(supporter.position, player.position));
}

function hasPushAheadDiceBoost(player) {
  return getActivePushAheadSupportersForPlayer(player).length > 0;
}

function getGallusBattleSupportersForPlayer(player) {
  if (!player?.position) return [];
  return state.players.filter((supporter) => supporter
    && supporter !== player
    && supporter.activeCharacterId === "supporter1"
    && supporter.position
    && arePlayersAllied(supporter, player)
    && arePointsAdjacentOrSame(supporter.position, player.position));
}

function getBattleCircleMetrics(currentValue) {
  const clamped = Math.max(0, Math.min(200, Number(currentValue) || 0));
  const ratio = clamped / 200;
  const iconSize = 5 + (30 * ratio);
  const buttonSize = iconSize * 2.1 + 16;
  return {
    iconSize: Number(iconSize.toFixed(2)),
    buttonSize: Number(buttonSize.toFixed(2))
  };
}

function getBattleChoicePreviewSuffix(player, statKey) {
  return "";
}

function formatBattleStatDisplay(player, statKey) {
  const value = Math.max(0, Number(player.currentStats[statKey]) || 0);
  const maxValue = Math.max(1, Number(getCurrentMax(player, statKey)) || 1);
  return `${value}/${maxValue}${getBattleChoicePreviewSuffix(player, statKey)}`;
}

function getBattleSelectionPromptText(statKey) {
  return `${statLabel(statKey)}?`;
}

function getBattleChoiceColorClass(player) {
  const index = state.players.indexOf(player);
  return `player-${index}`;
}

function buildCharacterDetailContent(targetCharacter, ownerName, closeButtonClass = "overlayCloseButton") {
  const sections = getCharacterDetailSections(targetCharacter.id);
  const displayLine = targetCharacter.displayName
    ? `${sanitize(targetCharacter.name)} / ${sanitize(targetCharacter.displayName)}`
    : sanitize(targetCharacter.name);
  const closeButtonHtml = closeButtonClass
    ? `<button type="button" class="${closeButtonClass}" aria-label="Close">✕</button>`
    : "";
  return `
    <div class="overlayPanelHeader battleChoiceDetailHeader">
      <div class="characterDetailHero">
        <div class="characterDetailIcon">${getCharacterIconMarkup(targetCharacter, "characterIconAsset--detail")}</div>
        <div class="characterDetailTexts">
          <h3>${displayLine}</h3>
          <p>${sanitize(ownerName)}</p>
        </div>
      </div>
      ${closeButtonHtml}
    </div>
    <div class="overlayPanelScroll battleChoiceDetailScroll">
      ${renderCharacterLoreBlock(targetCharacter)}
      <div class="characterStatTable">
        <div class="characterStatLine"><span>Attack</span><strong>${targetCharacter.stats.attack}</strong></div>
        <div class="characterStatLine"><span>HP</span><strong>${targetCharacter.stats.hp}</strong></div>
        <div class="characterStatLine"><span>Technique</span><strong>${targetCharacter.stats.technique}</strong></div>
      </div>
      ${sections.modes?.length ? renderSectionList("Modes", sections.modes) : ""}
      ${renderSectionList("Active Skills", sections.active)}
      ${renderSectionList("Passive Skills", sections.passive)}
    </div>
  `;
}

function buildBattleCharacterDetailContent(player) {
  const targetCharacter = characterLibrary[player.activeCharacterId];
  return buildCharacterDetailContent(targetCharacter, player.name, "overlayCloseButton battleChoiceDetailClose");
}

function renderBattleChoiceStatBlock({ player, opponent, statKey, panelRole, isChooser, labelIcon, selectedStat }) {
  const displayedState = getDisplayedBattleStatState(player, opponent, statKey);
  const metrics = getBattleCircleMetrics(displayedState.value);
  const colorClass = statKey === "attack" ? "attack" : statKey === "hp" ? "hp" : "technique";
  const selectedClass = isChooser && selectedStat === statKey ? "is-selected" : "";
  const displayText = `${displayedState.value}/${displayedState.maxValue}`;
  const previewSuffix = getBattleChoicePreviewSuffix(player, statKey);
  return `
    <div class="battleChoiceStat battleChoiceStat-${statKey} ${isChooser ? "is-chooser" : "is-viewer"}">
      <div class="battleChoiceStatValue ${colorClass}">${sanitize(displayText)}${previewSuffix ? `<span class="battleChoicePreviewBonus">${sanitize(previewSuffix.trim())}</span>` : ""}</div>
      <button
        type="button"
        class="battleChoiceCircle battleChoiceCircle-${colorClass} ${isChooser ? "is-clickable" : "is-locked"} ${selectedClass}"
        data-battle-stat="${statKey}"
        data-panel-role="${panelRole}"
        ${isChooser ? "" : "disabled"}
        style="--battle-circle-size:${metrics.buttonSize}px; --battle-circle-icon-size:${metrics.iconSize}px;"
        aria-label="${sanitize(player.name)} chooses ${sanitize(statLabel(statKey))}"
      ><span class="battleChoiceCircleIcon">${labelIcon}</span></button>
    </div>
  `;
}

function buildBattleChoicePanelHtml({ player, opponent, panelRole, isChooser, selectedStat = null }) {
  const colorClass = getBattleChoiceColorClass(player);
  return `
    <section class="battleChoicePanel ${colorClass} panel-${panelRole} ${isChooser ? "is-chooser" : ""}" data-panel-role="${panelRole}" style="${sanitize(buildBattleChoicePanelStyle(player, panelRole, isChooser))}">
      <div class="battleChoiceHeaderRow">
        <div class="battleChoicePlayerBlock">
          <div class="battleChoicePlayerTextBlock">
            <div class="battleChoicePlayerName">${sanitize(player.name)}</div>
          </div>
          <button type="button" class="battleChoiceCharacterButton" data-battle-character-panel="${panelRole}" aria-label="Open the character description for ${sanitize(player.name)}"><span class="battleChoiceCharacterIcon">${getPlayerCharacterIconMarkup(player, "characterIconAsset--battleChoice")}</span></button>
        </div>
        <div class="battleChoiceBonusGroup">
          <div class="battleChoiceBonusChip"><span class="battleChoiceBonusIcon">💪</span><strong>+${getBattleAdvantageBonusPreview(player, opponent)}</strong></div>
          <div class="battleChoiceBonusChip muted"><span class="battleChoiceBonusIcon">💦</span><strong>+${getBattleSwingBonusPreview(player)}</strong></div>
        </div>
      </div>
      <div class="battleChoiceMetaRow">
        <div class="battleChoiceStoneRow"><span class="battleChoiceStoneIcon">💪</span><span class="battleChoiceStoneLabel">Stones</span><strong>${getForceShardCount(player)}</strong></div>
      </div>
      ${renderBattleChoiceStatBlock({ player, opponent, statKey: "attack", panelRole, isChooser, labelIcon: "⚔️", selectedStat })}
      ${renderBattleChoiceStatBlock({ player, opponent, statKey: "hp", panelRole, isChooser, labelIcon: "❤️", selectedStat })}
      ${renderBattleChoiceStatBlock({ player, opponent, statKey: "technique", panelRole, isChooser, labelIcon: "🧠", selectedStat })}
    </section>
  `;
}

function buildBattleChoiceConfirmHtml(chooser, selectedStat) {
  if (!selectedStat) return "";
  return `
    <div class="battleChoiceConfirmModal" role="dialog" aria-live="polite" aria-label="${sanitize(statLabel(selectedStat))} selection confirmation">
      <button type="button" class="battleChoiceConfirmClose" data-battle-confirm-close aria-label="Close">✕</button>
      <div class="battleChoiceConfirmText">${sanitize(getBattleSelectionPromptText(selectedStat))}</div>
      <button type="button" class="battleChoiceConfirmButton" data-battle-confirm="${selectedStat}" aria-label="Confirm fighting with ${sanitize(statLabel(selectedStat))}">✅</button>
    </div>
  `;
}

function buildBattleMatchupHelpButtonHtml() {
  return `
    <button type="button" class="battleChoiceHelpButton ghostButton" data-battle-matchup-help aria-label="Open the matchup guide">
      Matchups
    </button>
  `;
}

function buildBattleMatchupHelpBody() {
  return `
    <div class="battleMatchupGuide">
      <img class="battleMatchupGuideImage" src="${GUIDE_IMAGE_PATH}battle_matchups.png" alt="Attack, HP, and Technique matchup chart">
      <div class="battleMatchupGuideText">
        <p><strong>HP</strong> is strong against <strong>Attack</strong>.</p>
        <p><strong>Attack</strong> is strong against <strong>Technique</strong>.</p>
        <p><strong>Technique</strong> is strong against <strong>HP</strong>.</p>
        <p>When your chosen stat has the matchup advantage, a bonus is added to your value.</p>
        <p>After matchup bonuses and other effects are applied, the higher final number wins the battle.</p>
      </div>
    </div>
  `;
}

function buildBattleMatchupHelpModalHtml() {
  return `
    <div class="battleMatchupOverlay" role="dialog" aria-modal="true" aria-label="Stat matchups">
      <div class="battleMatchupCard">
        <div class="battleMatchupCardHeader">
          <h3>Stat Matchups</h3>
          <button type="button" class="battleMatchupClose" data-battle-matchup-close aria-label="Close">✕</button>
        </div>
        ${buildBattleMatchupHelpBody()}
      </div>
    </div>
  `;
}

function buildBattleChoiceModalHtml({ attacker, defender, chooserPanelRole, detailTargetRole = null, selectedStat = null, matchupHelpOpen = false }) {
  const chooser = chooserPanelRole === "left" ? attacker : defender;
  const chooserColorClass = getBattleChoiceColorClass(chooser);
  const detailSideClass = chooserPanelRole === "right" ? "left" : "right";
  const detailPlayer = detailTargetRole === "left" ? attacker : detailTargetRole === "right" ? defender : null;
  return `
    <div class="battleChoiceModal" data-chooser-panel="${chooserPanelRole}">
      <div class="battleChoiceLayout">
        ${buildBattleChoicePanelHtml({ player: attacker, opponent: defender, panelRole: "left", isChooser: chooserPanelRole === "left", selectedStat: chooserPanelRole === "left" ? selectedStat : null })}
        ${buildBattleChoicePanelHtml({ player: defender, opponent: attacker, panelRole: "right", isChooser: chooserPanelRole === "right", selectedStat: chooserPanelRole === "right" ? selectedStat : null })}
        <div class="battleChoiceCenterLabel ${chooserColorClass}" style="--battle-center-accent:${sanitize(getBattlePalette(chooser).accent)};"><span class="battleChoiceCenterPlayer">${sanitize(chooser.name)}</span><br>choosing</div>
        ${buildBattleMatchupHelpButtonHtml()}
        ${buildBattleChoiceConfirmHtml(chooser, selectedStat)}
        ${detailPlayer ? `<aside class="battleChoiceDetailPanel battleChoiceDetailPanel-${detailSideClass}">${buildBattleCharacterDetailContent(detailPlayer)}</aside>` : ""}
        ${matchupHelpOpen ? buildBattleMatchupHelpModalHtml() : ""}
      </div>
    </div>
  `;
}

function createBattleResultCounterHtml(value, statKey) {
  const padded = String(Math.max(0, Number(value) || 0)).padStart(3, "0").slice(-3);
  return `
    <div class="battleResultCounterRow">
      <div class="battleResultChoiceIcon battleResultChoiceIcon-${statKey}" aria-hidden="true">${getStatIcon(statKey)}</div>
      <div class="sevenSegCounter battleResultCounter stat-${statKey}" data-battle-result-counter>
        ${padded.split("").map((digit) => createSevenSegmentDigitHtml(digit)).join("")}
      </div>
    </div>
  `;
}

function updateBattleResultCounter(element, value, statKey) {
  if (!element) return;
  const preservedClasses = Array.from(element.classList).filter((className) => (
    className !== "sevenSegCounter"
    && className !== "battleResultCounter"
    && !className.startsWith("stat-")
  ));
  element.className = `sevenSegCounter battleResultCounter stat-${statKey}${preservedClasses.length ? ` ${preservedClasses.join(" ")}` : ""}`;
  element.setAttribute("data-battle-result-counter", "");

  const padded = String(Math.max(0, Number(value) || 0)).padStart(3, "0").slice(-3);
  const digits = Array.from(element.querySelectorAll(".sevenSegDigit"));
  if (digits.length !== 3) {
    element.innerHTML = padded.split("").map((digit) => createSevenSegmentDigitHtml(digit)).join("");
    return;
  }

  padded.split("").forEach((digit, digitIndex) => {
    const active = new Set(SEVEN_SEGMENT_MAP[Number(digit)] || []);
    ["a", "b", "c", "d", "e", "f", "g"].forEach((segmentKey) => {
      const segment = digits[digitIndex].querySelector(`.seg-${segmentKey}`);
      if (segment) segment.classList.toggle("active", active.has(segmentKey));
    });
  });
}

function buildBattleResultPanelHtml(player, panelRole, choiceKey, baseValue) {
  const playerIndex = state.players.indexOf(player);
  return `
    <section class="battleResultPanel panel-${panelRole} player-${playerIndex}" data-battle-result-panel="${panelRole}" style="${sanitize(buildBattlePanelStyle(player, panelRole, false))}">
      <div class="battleResultNameWrap">
        <div class="battleResultCrown" data-battle-result-crown aria-hidden="true">👑</div>
        <div class="battleResultPlayerName" data-battle-result-name>${sanitize(player.name)}</div>
      </div>
      <div class="battleResultCounterArea" data-battle-result-counter-area>
        ${createBattleResultCounterHtml(baseValue, choiceKey)}
        <div class="battleResultBonusText hidden" data-battle-result-bonus></div>
      </div>
      <div class="battleResultCharacterButtonWrap">
        <div class="battleResultCharacterButton" aria-hidden="true">
          <span class="battleResultCharacterIcon">${getPlayerCharacterIconMarkup(player, "characterIconAsset--battleResult")}</span>
        </div>
      </div>
    </section>
  `;
}

function buildBattleResultModalHtml({ attacker, defender, choiceA, choiceB, breakdownA, breakdownB }) {
  return `
    <div class="battleResultModal" aria-live="polite">
      <div class="battleResultLayout" style="${sanitize(buildBattleLayoutStyle(attacker, defender))}">
        ${buildBattleResultPanelHtml(attacker, "left", choiceA, breakdownA.baseValue)}
        ${buildBattleResultPanelHtml(defender, "right", choiceB, breakdownB.baseValue)}
      </div>
    </div>
  `;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateBattleResultBonus(sideRefs, amount, nextValue) {
  if (!sideRefs || !amount) return;
  const isLoss = amount < 0;
  sideRefs.bonus.textContent = isLoss ? `${amount}` : `+${amount}`;
  sideRefs.bonus.classList.remove("hidden", "is-fading-out", "is-rising", "is-loss", "is-gain");
  sideRefs.bonus.classList.add(isLoss ? "is-loss" : "is-gain");
  sideRefs.bonus.classList.add("is-visible");
  await wait(120);
  sideRefs.counter.classList.remove("is-bounce", "is-shake");
  void sideRefs.counter.offsetWidth;
  sideRefs.counter.classList.add(isLoss ? "is-shake" : "is-bounce");
  updateBattleResultCounter(sideRefs.counter, nextValue, sideRefs.statKey);
  await wait(1000);
  sideRefs.bonus.classList.add("is-rising", "is-fading-out");
  await wait(360);
  sideRefs.bonus.classList.remove("is-visible", "is-rising", "is-fading-out", "is-loss", "is-gain");
  sideRefs.bonus.classList.add("hidden");
  sideRefs.counter.classList.remove("is-shake");
}

function playBattleDoorExitAnimation(modal) {
  const layout = modal?.querySelector?.('.battleResultLayout');
  if (!layout) return Promise.resolve();
  modal.classList.add('battleDoorExitModal');
  ui.modalBackdrop?.classList.add('battleDoorExitBackdrop');
  layout.classList.add('battleDoorExit');
  Array.from(modal.querySelectorAll('button')).forEach((button) => {
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
  });
  return wait(1000);
}

async function playBattleResultSequence(playerA, playerB, choiceA, choiceB, breakdownA, breakdownB) {
  const winnerValue = breakdownA.finalValue > breakdownB.finalValue ? breakdownA.finalValue : breakdownB.finalValue;
  const loserValue = breakdownA.finalValue < breakdownB.finalValue ? breakdownA.finalValue : breakdownB.finalValue;
  const tieWinner = winnerValue === loserValue ? getTieWinnerByPassive(playerA, playerB) : null;
  const isTie = winnerValue === loserValue && !tieWinner;

  return new Promise((resolve) => {
    showRawModal(buildBattleResultModalHtml({
      attacker: playerA,
      defender: playerB,
      choiceA,
      choiceB,
      breakdownA,
      breakdownB
    }), async (modal) => {
      const leftPanel = modal.querySelector('[data-battle-result-panel="left"]');
      const rightPanel = modal.querySelector('[data-battle-result-panel="right"]');
      const leftRefs = {
        panel: leftPanel,
        counter: leftPanel.querySelector('[data-battle-result-counter]'),
        bonus: leftPanel.querySelector('[data-battle-result-bonus]'),
        crown: leftPanel.querySelector('[data-battle-result-crown]'),
        statKey: choiceA
      };
      const rightRefs = {
        panel: rightPanel,
        counter: rightPanel.querySelector('[data-battle-result-counter]'),
        bonus: rightPanel.querySelector('[data-battle-result-bonus]'),
        crown: rightPanel.querySelector('[data-battle-result-crown]'),
        statKey: choiceB
      };

      await wait(500);

      let runningA = breakdownA.baseValue;
      let runningB = breakdownB.baseValue;
      const roundCount = Math.max(breakdownA.bonuses.length, breakdownB.bonuses.length);
      for (let i = 0; i < roundCount; i += 1) {
        const tasks = [];
        if (breakdownA.bonuses[i]) {
          runningA += breakdownA.bonuses[i].amount;
          tasks.push(animateBattleResultBonus(leftRefs, breakdownA.bonuses[i].amount, runningA));
        }
        if (breakdownB.bonuses[i]) {
          runningB += breakdownB.bonuses[i].amount;
          tasks.push(animateBattleResultBonus(rightRefs, breakdownB.bonuses[i].amount, runningB));
        }
        if (tasks.length) {
          await Promise.all(tasks);
          await wait(80);
        }
      }

      if (isTie) {
        leftRefs.panel.classList.add('is-draw');
        rightRefs.panel.classList.add('is-draw');
        leftRefs.counter.classList.add('is-draw');
        rightRefs.counter.classList.add('is-draw');
      } else if (tieWinner === playerA || breakdownA.finalValue > breakdownB.finalValue) {
        leftRefs.counter.classList.add('is-winner');
        rightRefs.counter.classList.add('is-loser');
        leftRefs.crown.classList.add('play');
        leftRefs.panel.classList.add('is-winner');
        rightRefs.panel.classList.add('is-loser');
      } else {
        rightRefs.counter.classList.add('is-winner');
        leftRefs.counter.classList.add('is-loser');
        rightRefs.crown.classList.add('play');
        rightRefs.panel.classList.add('is-winner');
        leftRefs.panel.classList.add('is-loser');
      }

      await wait(2000);
      closeTopModal();
      resolve();
    });
  });
}

function chooseBattleStat(player, opponent, panelRole = "left") {
  if (isComputerPlayer(player)) {
    return new Promise((resolve) => {
      const computerSelectedStat = chooseComputerBattleStat(player, opponent);
      window.setTimeout(() => resolve(computerSelectedStat), 360);
    });
  }

  return new Promise((resolve) => {
    let detailTargetRole = null;
    let selectedStat = null;
    let matchupHelpOpen = false;
    let resolved = false;
    let modal = null;

    const attacker = panelRole === "left" ? player : opponent;
    const defender = panelRole === "left" ? opponent : player;
    const detailSideClass = panelRole === "right" ? "left" : "right";

    const getLayout = () => modal?.querySelector?.(".battleChoiceLayout") || null;

    const finish = (statKey) => {
      if (resolved) return;
      resolved = true;
      closeTopModal({ keepBackdrop: true });
      resolve(statKey);
    };

    const bindConfirmControls = () => {
      const confirmButton = modal?.querySelector?.("[data-battle-confirm]");
      if (confirmButton) {
        confirmButton.addEventListener("click", () => {
          finish(confirmButton.dataset.battleConfirm);
        });
      }

      const confirmCloseButton = modal?.querySelector?.("[data-battle-confirm-close]");
      if (confirmCloseButton) {
        confirmCloseButton.addEventListener("click", () => {
          selectedStat = null;
          syncSelectionState();
        });
      }
    };

    const syncSelectionState = () => {
      if (!modal || !modal.isConnected) return;
      Array.from(modal.querySelectorAll("[data-battle-stat]")).forEach((button) => {
        const isChooserButton = button.dataset.panelRole === panelRole;
        const isSelected = isChooserButton && selectedStat === button.dataset.battleStat;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });

      modal.querySelector(".battleChoiceConfirmModal")?.remove();
      if (!selectedStat) return;
      const layout = getLayout();
      if (!layout) return;
      layout.insertAdjacentHTML("beforeend", buildBattleChoiceConfirmHtml(player, selectedStat));
      bindConfirmControls();
    };

    const bindDetailCloseControl = () => {
      const closeButton = modal?.querySelector?.(".battleChoiceDetailClose");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          detailTargetRole = null;
          syncDetailState();
        });
      }
    };

    const syncDetailState = () => {
      if (!modal || !modal.isConnected) return;
      modal.querySelector(".battleChoiceDetailPanel")?.remove();
      const detailPlayer = detailTargetRole === "left" ? attacker : detailTargetRole === "right" ? defender : null;
      if (!detailPlayer) return;
      const layout = getLayout();
      if (!layout) return;
      layout.insertAdjacentHTML(
        "beforeend",
        `<aside class="battleChoiceDetailPanel battleChoiceDetailPanel-${detailSideClass}">${buildBattleCharacterDetailContent(detailPlayer)}</aside>`
      );
      bindDetailCloseControl();
    };

    const bindMatchupCloseControl = () => {
      const matchupCloseButton = modal?.querySelector?.("[data-battle-matchup-close]");
      if (matchupCloseButton) {
        matchupCloseButton.addEventListener("click", () => {
          matchupHelpOpen = false;
          syncMatchupHelpState();
        });
      }
    };

    const syncMatchupHelpState = () => {
      if (!modal || !modal.isConnected) return;
      modal.querySelector(".battleMatchupOverlay")?.remove();
      if (!matchupHelpOpen) return;
      const layout = getLayout();
      if (!layout) return;
      layout.insertAdjacentHTML("beforeend", buildBattleMatchupHelpModalHtml());
      bindMatchupCloseControl();
    };

    const bindStaticControls = () => {
      Array.from(modal.querySelectorAll("[data-battle-stat]")).forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.panelRole !== panelRole) return;
          selectedStat = button.dataset.battleStat;
          syncSelectionState();
        });
      });

      const matchupHelpButton = modal.querySelector("[data-battle-matchup-help]");
      if (matchupHelpButton) {
        matchupHelpButton.addEventListener("click", () => {
          matchupHelpOpen = true;
          syncMatchupHelpState();
        });
      }

      Array.from(modal.querySelectorAll("[data-battle-character-panel]")).forEach((button) => {
        button.addEventListener("click", () => {
          const targetRole = button.dataset.battleCharacterPanel;
          detailTargetRole = detailTargetRole === targetRole ? null : targetRole;
          syncDetailState();
        });
      });
    };

    showRawModal(buildBattleChoiceModalHtml({
      attacker,
      defender,
      chooserPanelRole: panelRole,
      detailTargetRole: null,
      selectedStat: null,
      matchupHelpOpen: false
    }), (renderedModal) => {
      modal = renderedModal;
      bindStaticControls();
      syncSelectionState();
    });
  });
}

function applyBattleAfterEffects(playerA, playerB, choiceA, choiceB, valueA, valueB, winnerPlayer) {
  const players = [
    { self: playerA, opponent: playerB, ownChoice: choiceA, opponentChoice: choiceB, ownValue: valueA, opponentValue: valueB },
    { self: playerB, opponent: playerA, ownChoice: choiceB, opponentChoice: choiceA, ownValue: valueB, opponentValue: valueA }
  ];

  players.forEach((entry) => {
    const shardCount = getForceShardCount(entry.self);
    if (shardCount > 0) {
      removeOneStackedItem(entry.self, 'forceShard', shardCount);
      log(`${entry.self.name} consumed ${shardCount} Power Shard${shardCount === 1 ? "" : "s"}.`, true);
    }
    const won = entry.self === winnerPlayer;
    if (entry.self.activeCharacterId === "battler1" && won) {
      const cell = getCell(entry.self.position.row, entry.self.position.col);
      const selfIndex = state.players.indexOf(entry.self);
      if (cell.owner === selfIndex) {
        const amount = restoreStat(entry.self, entry.ownChoice, 30);
        if (amount > 0) log(`${entry.self.name} restored ${statLabel(entry.ownChoice)} ${amount} recovered.`, true);
      }
    }

    if (entry.self.activeCharacterId === "battler2") {
      if (won) {
        const steal = Math.min(15, entry.opponent.currentStats.attack);
        entry.opponent.currentStats.attack = Math.max(0, entry.opponent.currentStats.attack - steal);
        entry.self.currentStats.attack = Math.min(200, entry.self.currentStats.attack + steal);
        if (steal > 0) {
          queueStatLossPopup(entry.opponent, [{ statKey: "attack", amount: steal }]);
        }
        log(`${entry.self.name} stole ${steal} Attack.`, true);
      } else {
        const steal = Math.min(5, entry.self.currentStats.attack);
        entry.self.currentStats.attack = Math.max(0, entry.self.currentStats.attack - steal);
        entry.opponent.currentStats.attack = Math.min(200, entry.opponent.currentStats.attack + steal);
        if (steal > 0) {
          queueStatLossPopup(entry.self, [{ statKey: "attack", amount: steal }]);
        }
        log(`${entry.self.name} was defeated and lost ${steal} Attack.`, true);
      }
    }
  });
}

function buildBattleOutcomeItemButton(item, selected, source, index) {
  const stackCount = getStackCount(item);
  const displayCount = item.id === "coin" && source === "loser" ? 1 : stackCount;
  const stackSuffix = displayCount > 1 ? ` x${displayCount}` : '';
  return `
    <button
      type="button"
      class="battleOutcomeItemButton ${selected ? "selected" : ""}"
      data-battle-outcome-source="${source}"
      data-battle-outcome-index="${index}"
      aria-pressed="${selected ? "true" : "false"}"
    >
      <span class="battleOutcomeItemIcon">${sanitize(item.icon || "🎁")}</span>
      <span class="battleOutcomeItemName">${sanitize(item.name || item.shortName || item.id || "item")}${sanitize(stackSuffix)}</span>
    </button>
  `;
}

function buildBattleOutcomePanelHtml({ player, panelRole, isWinner, isLoser, contentHtml = "" }) {
  const playerIndex = state.players.indexOf(player);
  return `
    <section class="battleResultPanel battleOutcomePanel panel-${panelRole} player-${playerIndex} ${isWinner ? "is-winner" : ""} ${isLoser ? "is-loser" : ""}" data-battle-outcome-panel="${panelRole}" style="${sanitize(buildBattlePanelStyle(player, panelRole, false))}">
      <div class="battleResultNameWrap battleOutcomeNameWrap">
        <div class="battleResultCrown battleOutcomeCrown ${isWinner ? "play static" : ""}" data-battle-result-crown aria-hidden="true">👑</div>
        <div class="battleResultPlayerName battleOutcomePlayerName">${sanitize(player.name)}</div>
      </div>
      <div class="battleOutcomeContent">${contentHtml}</div>
    </section>
  `;
}

function buildBattleOutcomeModalHtml({ attacker, defender, winner, loser, selectedLoserItemIndex, selectedWinnerReplaceIndex, exhaustionAmount = 0, loserHasFlag = false }) {
  const winnerHasSpace = winner.items.length < MAX_ITEMS;
  const loserHasItems = loser.items.length > 0;

  const loserPanelContent = `
      <div class="battleOutcomePrompt">Defeat</div>
      <div class="battleOutcomeSubtle">${loserHasItems ? 'one item will be taken, then you will return to your starting position.' : 'you will return to your starting position.'}</div>
      ${loserHasFlag ? '<div class="battleOutcomeSubtle">your flag will also be taken automatically.</div>' : ''}
    `;

  const loserItemsHtml = loser.items.length
    ? loser.items.map((item, index) => buildBattleOutcomeItemButton(item, selectedLoserItemIndex === index, "loser", index)).join("")
    : `<div class="battleOutcomeEmpty">No items</div>`;

  const winnerReplaceHtml = !winnerHasSpace && loserHasItems
    ? `
      <div class="battleOutcomeInventoryBlock secondary">
        <div class="battleOutcomeInventoryLabel">Choose an item to replace</div>
        <div class="battleOutcomeItemGrid battleOutcomeItemGrid-own">
          ${winner.items.map((item, index) => buildBattleOutcomeItemButton(item, selectedWinnerReplaceIndex === index, "winner", index)).join("")}
        </div>
      </div>
    `
    : ``;

  const winnerExhaustionHtml = `
      <div class="battleOutcomeExhaustionBlock" aria-label="battle exhaustion">
        <div class="battleOutcomeExhaustionLabel">Exhaustion</div>
        <div class="battleOutcomeExhaustionValue">-${sanitize(String(Math.max(0, Number(exhaustionAmount) || 0)))} all stats</div>
      </div>
    `;

  const winnerScoreBonusHtml = `
      <div class="battleOutcomeVictoryBonusBlock" aria-label="victory bonus gained">
        <div class="battleOutcomeVictoryBonusLabel">Victory bonus</div>
        <div class="battleOutcomeVictoryBonusValue">+3 score</div>
      </div>
    `;


  const itemControlsHtml = loserHasItems
    ? `
      <div class="battleOutcomeInventoryBlock">
        <div class="battleOutcomeInventoryLabel">Take one item</div>
        <div class="battleOutcomeItemGrid">${loserItemsHtml}</div>
      </div>
      ${winnerReplaceHtml}
    `
    : `<div class="battleOutcomeSubtle">No item can be taken.</div>`;

  const confirmDisabled = (loserHasItems && selectedLoserItemIndex === null) || (!winnerHasSpace && loserHasItems && selectedWinnerReplaceIndex === null);

  const winnerPanelContent = `
      <div class="battleOutcomePrompt battleOutcomePrompt-win">Victory</div>
      ${winnerScoreBonusHtml}
      ${winnerExhaustionHtml}
      ${loserHasFlag ? '<div class="battleOutcomeSubtle">The flag will be stolen automatically.</div>' : ''}
      ${itemControlsHtml}
      <div class="battleOutcomeSubtle">the loser will automatically return to the starting position.</div>
      <div class="battleOutcomeConfirmRow">
        <button type="button" class="battleOutcomeConfirmButton" data-battle-outcome-confirm ${confirmDisabled ? 'disabled aria-disabled="true"' : ''}>✅</button>
      </div>
    `;

  return `
    <div class="battleResultModal battleOutcomeModal" aria-live="polite">
      <div class="battleResultLayout battleOutcomeLayout" style="${sanitize(buildBattleLayoutStyle(attacker, defender))}">
        ${buildBattleOutcomePanelHtml({
          player: attacker,
          panelRole: "left",
          isWinner: attacker.id === winner.id,
          isLoser: attacker.id === loser.id,
          contentHtml: attacker.id === loser.id ? loserPanelContent : winnerPanelContent
        })}
        ${buildBattleOutcomePanelHtml({
          player: defender,
          panelRole: "right",
          isWinner: defender.id === winner.id,
          isLoser: defender.id === loser.id,
          contentHtml: defender.id === loser.id ? loserPanelContent : winnerPanelContent
        })}
      </div>
    </div>
  `;
}

function chooseBattleLossConsequence(loser, winner, attacker, defender, exhaustionAmount = 0) {
  return new Promise((resolve) => {
    const draft = {
      selectedLoserItemIndex: loser.items.length ? 0 : null,
      selectedWinnerReplaceIndex: winner.items.length >= MAX_ITEMS && loser.items.length ? 0 : null
    };

    const render = () => {
      showRawModal(buildBattleOutcomeModalHtml({
        attacker,
        defender,
        winner,
        loser,
        selectedLoserItemIndex: draft.selectedLoserItemIndex,
        selectedWinnerReplaceIndex: draft.selectedWinnerReplaceIndex,
        exhaustionAmount,
        loserHasFlag: playerHasFlag(loser)
      }), (modal) => {
        let finalizing = false;
        const finalize = async () => {
          if (finalizing) return;
          finalizing = true;
          await playBattleDoorExitAnimation(modal);
          closeTopModal();
          resolve({
            loserItemIndex: loser.items.length ? draft.selectedLoserItemIndex : null,
            winnerReplaceIndex: winner.items.length >= MAX_ITEMS && loser.items.length ? draft.selectedWinnerReplaceIndex : null
          });
        };

        if (isComputerPlayer(winner)) {
          window.setTimeout(finalize, 760);
          return;
        }


        Array.from(modal.querySelectorAll('[data-battle-outcome-source]')).forEach((button) => {
          button.addEventListener('click', () => {
            const source = button.dataset.battleOutcomeSource;
            const index = Number(button.dataset.battleOutcomeIndex);
            if (source === 'loser') {
              draft.selectedLoserItemIndex = draft.selectedLoserItemIndex === index ? null : index;
            } else {
              draft.selectedWinnerReplaceIndex = draft.selectedWinnerReplaceIndex === index ? null : index;
            }
            render();
          });
        });

        const confirmButton = modal.querySelector('[data-battle-outcome-confirm]');
        if (confirmButton) {
          confirmButton.addEventListener('click', () => {
            if (loser.items.length && draft.selectedLoserItemIndex === null) return;
            if (winner.items.length >= MAX_ITEMS && loser.items.length && draft.selectedWinnerReplaceIndex === null) return;
            finalize();
          });
        }
      });
    };

    render();
  });
}

function applyBattleItemTransfer(winner, loser, outcome) {
  const loserItemIndex = Number(outcome?.loserItemIndex);
  if (!Number.isInteger(loserItemIndex) || loserItemIndex < 0 || loserItemIndex >= loser.items.length) {
    return;
  }
  const loserItem = loser.items[loserItemIndex];
  let stolen;
  if (loserItem?.id === "coin" && getStackCount(loserItem) > 1) {
    loserItem.quantity = getStackCount(loserItem) - 1;
    stolen = { ...loserItem, quantity: 1 };
  } else {
    [stolen] = loser.items.splice(loserItemIndex, 1);
  }
  if (!stolen) return;

  if (canReceiveInventoryItem(winner, stolen)) {
    addItemToInventory(winner, stolen);
    log(`${winner.name} stole ${stolen.name} from ${loser.name}.`, true);
    return;
  }

  const replaceIndex = Number(outcome?.winnerReplaceIndex);
  if (!Number.isInteger(replaceIndex) || replaceIndex < 0 || replaceIndex >= winner.items.length) {
    const cell = getCell(winner.position.row, winner.position.col);
    cell.groundItem = stolen;
    log(`${winner.name}'s bag was full, so the stolen ${stolen.name} remained on the field.`, true);
    return;
  }

  const [dropped] = winner.items.splice(replaceIndex, 1, stolen);
  const cell = getCell(winner.position.row, winner.position.col);
  cell.groundItem = dropped;
  log(`${winner.name} stole ${stolen.name} from ${loser.name} and left ${dropped.name} at their feet.`, true);
}

async function animatePlayerReturnToStart(player) {
  if (!player || !player.startPosition) return;
  if (!Array.isArray(state.returningPlayerIds)) state.returningPlayerIds = [];
  if (!state.returningPlayerIds.includes(player.id)) state.returningPlayerIds.push(player.id);
  player.position = { ...player.startPosition };
  renderAll();
  const avatar = state.avatarElements.get(player.id);
  if (!avatar) {
    state.returningPlayerIds = (state.returningPlayerIds || []).filter((id) => id !== player.id);
    renderAll();
    return;
  }
  const playerIndex = state.players.indexOf(player);
  const landingTransform = getAvatarTransform(player.startPosition.row, player.startPosition.col, playerIndex);
  const billboard = avatar.querySelector(".avatarBillboard");
  avatar.style.opacity = '1';
  avatar.style.transform = landingTransform;
  avatar.style.transformStyle = 'preserve-3d';
  if (billboard) {
    billboard.style.transformStyle = 'preserve-3d';
    billboard.style.backfaceVisibility = 'visible';
  }
  avatar.dataset.returnHeight = "118";
  updateAvatarBillboards();
  await wait(500);
  const startedAt = performance.now();
  await new Promise((resolve) => {
    const fallDuration = 500;
    const step = (now) => {
      const progress = Math.max(0, Math.min(1, (now - startedAt) / fallDuration));
      const gravityProgress = progress * progress;
      avatar.dataset.returnHeight = String(Math.max(0, 118 * (1 - gravityProgress)));
      updateAvatarBillboards();
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
  delete avatar.dataset.returnHeight;
  avatar.style.opacity = '';
  avatar.style.transform = landingTransform;
  avatar.style.transformStyle = '';
  if (billboard) {
    billboard.style.transformStyle = '';
    billboard.style.backfaceVisibility = '';
  }
  state.returningPlayerIds = (state.returningPlayerIds || []).filter((id) => id !== player.id);
  renderAll();
}

function chooseYesNo(message, yesLabel, noLabel) {
  return new Promise((resolve) => {
    showSimpleModal({
      title: "Select",
      body: message,
      buttons: [
        { label: noLabel, style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: yesLabel, style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

function getSkillCooldownRounds(player, skillEntry = null, skillIndex = null) {
  if (!player) return 0;
  switch (player.activeCharacterId) {
    case "painter2":
      return Number(player.cooldowns.painter2Hide) || 0;
    case "painter3":
      return Number(player.cooldowns.painter3Backblast) || 0;
    case "painter4":
      return Number(player.cooldowns.painter4Backtrack) || 0;
    case "trapper1":
      return Number(player.cooldowns.trapper1Zone) || 0;
    case "trapper3":
      return Number(player.cooldowns.trapper3VenomVarnish) || 0;
    case "tanker2":
      return Number(player.cooldowns.tanker2Quickdig) || 0;
    case "tanker3":
      return skillIndex === 1 ? (Number(player.cooldowns.tanker3BreakItUp) || 0) : (Number(player.cooldowns.tanker3ProtectiveDetail) || 0);
    case "battler3":
      return Number(player.cooldowns.battler3MesmerSync) || 0;
    case "battler4":
      return Number(player.cooldowns.battler4BleakOffering) || 0;
    case "battler5":
      return Number(player.cooldowns.battler5EmergencyCallout) || 0;
    case "supporter1":
      return Number(player.cooldowns.supporter1PushAhead) || 0;
    case "supporter2":
      return Number(player.cooldowns.supporter2FreshBatch) || 0;
    case "trickster1":
      return skillIndex === 0 && isMimiInStarMode(player) ? (Number(player.cooldowns.mimiOffRecord) || 0) : 0;
    case "trickster2":
      return skillIndex === 1 ? (Number(player.cooldowns.rascaSnapback) || 0) : (Number(player.cooldowns.rascaShedRelay) || 0);
    case "trickster3":
      return skillIndex === 1 ? (Number(player.cooldowns.trickster3BaitedBoulder) || 0) : (Number(player.cooldowns.trickster3FieldCache) || 0);
    default:
      return 0;
  }
}

function getSkillCooldownUnit(player) {
  return "rounds";
}

function getPrimaryActiveSkillEntry(characterId) {
  const player = getCurrentPlayer();
  if (characterId === "trickster1" && player?.activeCharacterId === "trickster1") {
    return getCharacterDetailSections(characterId).active[isMimiInGamblerMode(player) ? 1 : 0] || null;
  }
  return getCharacterDetailSections(characterId).active[0] || null;
}

function getSkillAvailabilityState(player, skillEntry = null, skillIndex = null) {
  const resolvedSkillEntry = skillEntry || (player ? getPrimaryActiveSkillEntry(player.activeCharacterId) : null);
  const resolvedSkillIndex = Number.isInteger(skillIndex)
    ? skillIndex
    : Math.max(0, getCharacterDetailSections(player?.activeCharacterId).active.indexOf(resolvedSkillEntry));
  const cooldownRounds = getSkillCooldownRounds(player, resolvedSkillEntry, resolvedSkillIndex);
  if (!player) {
    return {
      cooldownRounds: 0,
      disabled: true,
      label: "",
      reason: "no-player",
      skillEntry: null
    };
  }
  if (cooldownRounds > 0) {
    return {
      cooldownRounds,
      disabled: true,
      label: `${cooldownRounds} ${getSkillCooldownUnit(player)}`,
      reason: "cooldown",
      skillEntry: resolvedSkillEntry
    };
  }
  if (player.activeCharacterId === "trickster1") {
    const coins = getMimiCoinCount(player);
    if (resolvedSkillIndex === 0 && !isMimiInStarMode(player)) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: "Star Mode only",
        reason: "wrong-mode",
        skillEntry: resolvedSkillEntry
      };
    }
    if (resolvedSkillIndex === 0 && coins < 5) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: `${coins}/5 Coins`,
        reason: "insufficient-coin",
        skillEntry: resolvedSkillEntry
      };
    }
    if (resolvedSkillIndex === 1 && !isMimiInGamblerMode(player)) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: "Gambler Mode only",
        reason: "wrong-mode",
        skillEntry: resolvedSkillEntry
      };
    }
    if (resolvedSkillIndex === 1 && (coins <= 0 || player.turnFlags?.mimiRouletteUsed)) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: coins <= 0 ? "0 Coins" : "Used",
        reason: coins <= 0 ? "insufficient-coin" : "used",
        skillEntry: resolvedSkillEntry
      };
    }
  }
  if (player.activeCharacterId === "trickster2") {
    const clones = getRascaClonesForPlayer(player);
    if (resolvedSkillIndex === 0) {
      if (clones.length >= 3) {
        return { cooldownRounds: 0, disabled: true, label: "3/3 Tails", reason: "active", skillEntry: resolvedSkillEntry };
      }
      if (!player.position || hasAnyRascaCloneOnCell(player.position.row, player.position.col)) {
        return { cooldownRounds: 0, disabled: true, label: "Tile occupied", reason: "occupied", skillEntry: resolvedSkillEntry };
      }
    }
    if (resolvedSkillIndex === 1 && clones.length <= 0) {
      return { cooldownRounds: 0, disabled: true, label: "No tails", reason: "no-clone", skillEntry: resolvedSkillEntry };
    }
  }
  if (player.activeCharacterId === "trickster3") {
    const affordableStats = ["attack", "hp", "technique"].filter((statKey) => (Number(player.currentStats?.[statKey]) || 0) >= 15);
    if (!affordableStats.length) {
      return { cooldownRounds: 0, disabled: true, label: "Need 15 in one stat", reason: "insufficient-stat", skillEntry: resolvedSkillEntry };
    }
    if (resolvedSkillIndex === 0) {
      const hasTarget = getPlayableBoardCells().some((cell) => isValidSkavaFieldCacheCell(cell));
      if (!hasTarget) {
        return { cooldownRounds: 0, disabled: true, label: "No normal tile", reason: "no-target", skillEntry: resolvedSkillEntry };
      }
    }
    if (resolvedSkillIndex === 1) {
      const hasTarget = getPlayableBoardCells().some((cell) => isValidSkavaBoulderCell(cell));
      if (!hasTarget) {
        return { cooldownRounds: 0, disabled: true, label: "No empty tile", reason: "no-target", skillEntry: resolvedSkillEntry };
      }
    }
  }
  if (player.activeCharacterId === "tanker3") {
    if (resolvedSkillIndex === 0) {
      if (getHobbsProtectiveDetailState(player)) {
        return { cooldownRounds: 0, disabled: true, label: "Already active", reason: "active", skillEntry: resolvedSkillEntry };
      }
      if ((Number(player.currentStats?.technique) || 0) < 10) {
        const current = Number(player.currentStats?.technique) || 0;
        return { cooldownRounds: 0, disabled: true, label: `🧠 ${current}/10`, reason: "insufficient-stat", skillEntry: resolvedSkillEntry };
      }
      if (!getHobbsProtectiveDetailCandidates(player).length) {
        return { cooldownRounds: 0, disabled: true, label: "No nearby ally", reason: "no-target", skillEntry: resolvedSkillEntry };
      }
    }
    if (resolvedSkillIndex === 1) {
      if (getHobbsBattleProtectState(player)) {
        return { cooldownRounds: 0, disabled: true, label: "Already active", reason: "active", skillEntry: resolvedSkillEntry };
      }
      if (!getHobbsBreakItUpCandidates(player).length) {
        return { cooldownRounds: 0, disabled: true, label: "No target", reason: "no-target", skillEntry: resolvedSkillEntry };
      }
    }
  }
  if (player.activeCharacterId === "supporter2") {
    if ((Number(player.currentStats?.technique) || 0) < 15) {
      const current = Number(player.currentStats?.technique) || 0;
      return { cooldownRounds: 0, disabled: true, label: `🧠 ${current}/15`, reason: "insufficient-stat", skillEntry: resolvedSkillEntry };
    }
    if (!getPipEligibleTargets(player).length) {
      return { cooldownRounds: 0, disabled: true, label: "No target", reason: "no-target", skillEntry: resolvedSkillEntry };
    }
  }
  if (player.activeCharacterId === "battler5") {
    if (playerHasFlag(player) || playerHasFoodCourtFood(player)) {
      return { cooldownRounds: 0, disabled: true, label: "Special item carried", reason: "flag", skillEntry: resolvedSkillEntry };
    }
    if (state.moveDie) {
      return { cooldownRounds: 0, disabled: true, label: "Before rolling", reason: "timing", skillEntry: resolvedSkillEntry };
    }
  }
  if (player.activeCharacterId === "painter3" && isBrakkPaintBombActive(player)) {
    return {
      cooldownRounds: 0,
      disabled: true,
      label: "Paint Bomb active",
      reason: "active",
      skillEntry: resolvedSkillEntry
    };
  }
  if (player.activeCharacterId === "painter4") {
    const atStart = player.position && player.startPosition
      && player.position.row === player.startPosition.row
      && player.position.col === player.startPosition.col;
    if (!player.startPosition || atStart) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: "At start",
        reason: "at-start",
        skillEntry: resolvedSkillEntry
      };
    }
  }
  if (player.activeCharacterId === "trapper3") {
    if (getActiveVeskaVarnishForOwner(state.players.indexOf(player))) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: "Venom active",
        reason: "active",
        skillEntry: resolvedSkillEntry
      };
    }
    const costs = [
      { statKey: "attack", required: 8 },
      { statKey: "hp", required: 8 },
      { statKey: "technique", required: 8 }
    ];
    const missingCost = costs.find(({ statKey, required }) => (Number(player.currentStats?.[statKey]) || 0) < required);
    if (missingCost) {
      const current = Number(player.currentStats?.[missingCost.statKey]) || 0;
      return {
        cooldownRounds: 0,
        disabled: true,
        label: `${getResourceIcon(missingCost.statKey)} ${current}/${missingCost.required}`,
        reason: "insufficient-stat",
        skillEntry: resolvedSkillEntry
      };
    }
  }
  if (resolvedSkillEntry?.meta?.costStat) {
    const statKey = resolvedSkillEntry.meta.costStat;
    const required = Number(resolvedSkillEntry.meta.costAmount) || 0;
    const current = Number(player.currentStats?.[statKey]) || 0;
    if (current < required) {
      return {
        cooldownRounds: 0,
        disabled: true,
        label: `${getResourceIcon(statKey)} ${current}/${required}`,
        reason: "insufficient-stat",
        skillEntry: resolvedSkillEntry
      };
    }
    if (resolvedSkillEntry.meta.extraCostStat) {
      const extraStatKey = resolvedSkillEntry.meta.extraCostStat;
      const extraRequired = Number(resolvedSkillEntry.meta.extraCostAmount) || 0;
      const extraCurrent = Number(player.currentStats?.[extraStatKey]) || 0;
      if (extraCurrent < extraRequired) {
        return {
          cooldownRounds: 0,
          disabled: true,
          label: `${getResourceIcon(extraStatKey)} ${extraCurrent}/${extraRequired}`,
          reason: "insufficient-stat",
          skillEntry: resolvedSkillEntry
        };
      }
    }
  }
  return {
    cooldownRounds: 0,
    disabled: false,
    label: "",
    reason: "ready",
    skillEntry: resolvedSkillEntry
  };
}

function isInteractionPromptBlocking() {
  return !!(
    state.ui.inlinePrompt
    || state.ui.skavaTargetPrompt
    || state.ui.hobbsTargetPrompt
    || state.ui.playerTargetPrompt
    || state.ui.obstaclePrompt
    || state.ui.zoneEnhancePrompt
    || state.ui.zoneEntryPrompt
    || state.ui.pitEnhancePrompt
    || state.ui.pitEntryPrompt
    || state.ui.pipEnhancePrompt
    || state.ui.rascaSnapbackPrompt
    || state.ui.matchAbortPromptOpen
  );
}

function clearInteractionPrompts() {
  state.ui.inlinePrompt = null;
  state.ui.skavaTargetPrompt = null;
  state.ui.hobbsTargetPrompt = null;
  state.ui.playerTargetPrompt = null;
  state.ui.obstaclePrompt = null;
  state.ui.zoneEnhancePrompt = null;
  state.ui.zoneEntryPrompt = null;
  state.ui.pitEnhancePrompt = null;
  state.ui.pitEntryPrompt = null;
  state.ui.pipEnhancePrompt = null;
  state.ui.rascaSnapbackPrompt = null;
}

function canUseSkill() {
  const player = getCurrentPlayer();
  if (state.roundTransitionActive) return false;
  if (!player || isInteractionPromptBlocking()) return false;
  const mimiDoubleAllowed = player.activeCharacterId === "trickster1" && isMimiInGamblerMode(player) && !player.turnFlags?.mimiRouletteUsed;
  if (player.turnFlags.usedSkill && !mimiDoubleAllowed) return false;
  const beforeRollingDice = !state.moveDie;
  const afterMovingBeforePaintEnds = !!state.moveDie && state.currentAction === "paint";
  return beforeRollingDice || afterMovingBeforePaintEnds;
}

function hasAnyRascaCloneOnCell(row, col) {
  return !!getRascaCloneAt(row, col);
}

async function chooseRascaShedRelayEnhancement(player) {
  if ((Number(player.currentStats?.technique) || 0) < 10) return false;
  if (isComputerPlayer(player)) return chooseComputerRascaShedEnhancement(player);
  return new Promise((resolve) => {
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.zoneEnhancePrompt = {
        title: "Shed Relay Upgrade",
        message: `${player.name} can spend an extra 10 Technique to make this detached tail attack nearby enemies at the end of your turns.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "🦎",
        resolve,
        collapsed: false
      };
      state.ui.zoneEntryPrompt = null;
      state.ui.pitEnhancePrompt = null;
      state.ui.pitEntryPrompt = null;
      state.ui.rascaSnapbackPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }
    showSimpleModal({
      title: "Shed Relay Upgrade",
      body: "Spend 10 Technique to make this detached tail attack nearby enemies at the end of your turns?",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

async function activateRascaShedRelay(player) {
  const ownerIndex = state.players.indexOf(player);
  if (ownerIndex < 0 || !player.position) return;
  if ((Number(player.cooldowns?.rascaShedRelay) || 0) > 0) return;
  const clones = getRascaClonesForPlayer(ownerIndex);
  if (clones.length >= 3 || hasAnyRascaCloneOnCell(player.position.row, player.position.col)) return;
  const enhanced = await chooseRascaShedRelayEnhancement(player);
  if (enhanced && !spendStatForSkill(player, "technique", 10)) return;
  const newCount = clones.length + 1;
  const clone = {
    id: nextId("rasca-clone"),
    ownerIndex,
    row: player.position.row,
    col: player.position.col,
    enhanced: !!enhanced,
    maxHp: Math.max(1, Math.ceil(getCurrentMax(player, "hp") / newCount)),
    hp: Math.max(1, Math.ceil((Number(player.currentStats?.hp) || 0) / newCount)),
    poisonZoneTurns: {}
  };
  state.rascaClones.push(clone);
  recalculateRascaCloneMaxHp(ownerIndex);
  player.cooldowns.rascaShedRelay = 1;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Shed Relay");
  log(`${player.name} placed a detached tail with Shed Relay.`, true);
  renderAll();
}

function chooseRascaCloneFromField(player) {
  const ownerIndex = state.players.indexOf(player);
  const clones = ownerIndex >= 0 ? getRascaClonesForPlayer(ownerIndex) : [];
  if (!clones.length) return Promise.resolve(null);
  return new Promise((resolve) => {
    state.ui.rascaSnapbackPrompt = {
      playerId: player.id,
      title: "Snapback",
      message: "Choose a detached tail to recall.",
      candidates: clones.map((clone) => clone.id),
      selectedId: null,
      collapsed: false,
      resolve
    };
    state.ui.zoneEnhancePrompt = null;
    state.ui.zoneEntryPrompt = null;
    state.ui.pitEnhancePrompt = null;
    state.ui.pitEntryPrompt = null;
    state.ui.obstaclePrompt = null;
    state.ui.playerTargetPrompt = null;
    state.ui.rightPanelMode = null;
    renderAll();
  });
}

function resolveRascaSnapbackCloneSelection(clone) {
  const prompt = state.ui.rascaSnapbackPrompt;
  if (!prompt || !clone) return;
  const player = state.players.find((entry) => entry.id === prompt.playerId);
  if (!player || clone.ownerIndex !== state.players.indexOf(player)) return;
  state.ui.rascaSnapbackPrompt = null;
  renderAll();
  if (typeof prompt.resolve === "function") prompt.resolve(clone);
}

async function activateRascaSnapback(player) {
  if ((Number(player.cooldowns?.rascaSnapback) || 0) > 0) return;
  const computerPlan = isComputerPlayer(player) ? chooseComputerRascaSnapbackPlan(player) : null;
  const clone = computerPlan?.clone || await chooseRascaCloneFromField(player);
  if (!clone) return;
  const moveToClone = isComputerPlayer(player)
    ? !!computerPlan?.moveToClone
    : await chooseYesNo("Move to that detached tail's tile after recalling it?", "Move", "Recall Only");
  removeRascaClone(clone.id);
  if (moveToClone) {
    if (playerHasFlag(player)) {
      dropFlagAtPlayerPosition(player, `${player.name} used Snapback and dropped the flag before moving.`);
    }
    discardFoodCourtFoodForReturnToStart(player, "used Snapback");
    player.position = { row: clone.row, col: clone.col };
  }
  player.cooldowns.rascaSnapback = 2;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Snapback");
  log(`${player.name} recalled a detached tail${moveToClone ? " and moved to it" : ""}.`, true);
  renderAll();
}

async function activateRascaSkill(player, skillIndex = null) {
  if (isComputerPlayer(player) && !Number.isInteger(skillIndex)) {
    const action = chooseComputerRascaSkillAction(player);
    if (action?.type === "snapback") {
      await activateRascaSnapback(player);
      return;
    }
  }
  if (skillIndex === 1) {
    await activateRascaSnapback(player);
    return;
  }
  await activateRascaShedRelay(player);
}

function getSkavaCacheStrategicValue(player, point, statKey) {
  const cell = getCell(point.row, point.col);
  if (!player || player.activeCharacterId !== "trickster3" || !cell || !isValidSkavaFieldCacheCell(cell)) return -Infinity;
  const playerIndex = state.players.indexOf(player);
  const snapshot = getComputerScoreSnapshot(player);
  const missing = Math.max(0, getCurrentMax(player, statKey) - (Number(player.currentStats?.[statKey]) || 0));
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  const friendlyOwner = cell.owner !== null && isFriendlyOwner(cell.owner, playerIndex);
  const alliedFrontliners = state.players.filter((other) => other
    && arePlayersAllied(player, other)
    && other.position
    && isComputerAwareOfPlayerPosition(player, other)
    && Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 3);
  const nearbyEnemies = state.players.filter((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && other.position
    && isComputerAwareOfPlayerPosition(player, other)
    && Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 4);
  const directThreats = nearbyEnemies.filter((other) => Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 2);
  const existingCache = getOwnedSkavaCacheCells(playerIndex)[0] || null;
  const cacheForwardPressure = existingCache
    ? Math.max(0, Math.abs(existingCache.row - point.row) + Math.abs(existingCache.col - point.col) - 1)
    : 0;
  let value = missing * 0.24 + getComputerHealTileValue(player, { special: [getSkavaCacheTypeForStat(statKey)] }) * 0.7;
  if (friendlyOwner) value += 4.8;
  else if (cell.owner === null) value += 1.2;
  value += getComputerFuturePositionValue(player, point) * 0.26;
  value += getCaptureTerritoryPathBonus(player, cell) * 0.2;
  value += getControlAreaTacticalBonus(player, cell) * 0.24;
  value += alliedFrontliners.length * 1.25;
  value += nearbyEnemies.length * 0.42;
  value -= directThreats.length * 1.8;
  if (existingCache) value += cacheForwardPressure * 0.18;
  if (alliedFrontliners.some((ally) => playerHasFlag(ally))) value += statKey === "hp" ? 8.5 : 2.4;
  if (playerHasFlag(player)) value += statKey === "hp" ? 6.5 : 1.4;
  if (snapshot.endgame) value += friendlyOwner ? 2.4 : 0.35;
  if (isFlagCarrierMapActive()) value += getFlagCarrierPathPriorityBonus(player, point, cell) * 0.11;
  if (hpRatio <= 0.45 && statKey === "hp") value += 4.6;
  if (isCentralDominionMapActive()) value += isCellInControlArea(cell) ? 2.2 : 0.4;
  if (getSelectedMapDefinition()?.id === "bigBridge") {
    const lateralCentering = Math.max(0, 3 - Math.abs(point.col - Math.floor(getBoardCols() / 2)));
    value += lateralCentering * 0.8;
  }
  return value - getComputerEnemyTileDanger(player, point, cell) * 0.08;
}

function chooseComputerSkavaCacheStat(player) {
  const snapshot = getComputerScoreSnapshot(player);
  return ["attack", "hp", "technique"]
    .filter((statKey) => (Number(player.currentStats?.[statKey]) || 0) >= 15)
    .map((statKey) => {
      const current = Number(player.currentStats?.[statKey]) || 0;
      const maxValue = getCurrentMax(player, statKey);
      const missing = Math.max(0, maxValue - current);
      const affordability = current - 15;
      let score = missing + affordability * 0.1;
      if (statKey === "hp") score += 3;
      if ((playerHasFlag(player) || snapshot.closeoutUrgency > 0.5) && statKey === "hp") score += 5.2;
      if (snapshot.endgame && statKey === "attack") score += 1.2;
      if (!snapshot.endgame && statKey === "technique") score += 1.4;
      return { statKey, score };
    })
    .sort((a, b) => b.score - a.score)[0]?.statKey || null;
}

function chooseComputerSkavaCachePlacement(player, statKey) {
  return getPlayableBoardCells()
    .filter((cell) => isValidSkavaFieldCacheCell(cell))
    .map((cell) => ({
      row: cell.row,
      col: cell.col,
      value: getSkavaCacheStrategicValue(player, { row: cell.row, col: cell.col }, statKey)
    }))
    .sort((a, b) => b.value - a.value)[0] || null;
}

function getSkavaEnemyObjectivePoints(enemy) {
  if (!enemy) return [];
  const objectives = [];
  const pushObjective = (row, col, weight) => {
    const cell = getCell(row, col);
    if (!cell || !cell.playable) return;
    objectives.push({ row, col, weight });
  };

  if (isFlagCarrierMapActive()) {
    if (playerHasFlag(enemy)) {
      getAlliedStartTiles(enemy).forEach((cell) => pushObjective(cell.row, cell.col, 12));
    } else {
      getPlayableBoardCells().forEach((cell) => {
        if (cell.groundItem?.id === "flag") pushObjective(cell.row, cell.col, 14);
        else if (cell.special.includes("flag")) pushObjective(cell.row, cell.col, 10);
      });
    }
  }

  if (doesCurrentMapUseControlAreaWin()) {
    getControlAreaCells().forEach((cell) => pushObjective(cell.row, cell.col, 8));
  }

  if (isCaptureTerritoryMapActive()) {
    getCurrentMapTerritories().forEach((territory) => {
      const bounds = getTerritoryBounds(territory);
      if (!bounds) return;
      const summary = getTerritoryStateSummary(territory);
      const weight = summary.isNeverControlled ? 10 : summary.contested ? 8 : 6;
      pushObjective(bounds.centerRow, bounds.centerCol, weight);
    });
  }

  return objectives;
}

function getSkavaAllyObjectivePoints(ally) {
  if (!ally) return [];
  const objectives = [];
  const pushObjective = (row, col, weight) => {
    const cell = getCell(row, col);
    if (!cell || !cell.playable) return;
    objectives.push({ row, col, weight });
  };

  if (isFlagCarrierMapActive()) {
    if (playerHasFlag(ally)) {
      getAlliedStartTiles(ally).forEach((cell) => pushObjective(cell.row, cell.col, 13));
    } else {
      getPlayableBoardCells().forEach((cell) => {
        if (cell.groundItem?.id === "flag") pushObjective(cell.row, cell.col, 12);
        else if (cell.special.includes("flag")) pushObjective(cell.row, cell.col, 9);
      });
    }
  }

  if (doesCurrentMapUseControlAreaWin()) {
    getControlAreaCells().forEach((cell) => pushObjective(cell.row, cell.col, 7));
  }

  if (isCaptureTerritoryMapActive()) {
    getCurrentMapTerritories().forEach((territory) => {
      const bounds = getTerritoryBounds(territory);
      if (!bounds) return;
      const summary = getTerritoryStateSummary(territory);
      const weight = summary.isNeverControlled ? 9 : summary.contested ? 7 : 5;
      pushObjective(bounds.centerRow, bounds.centerCol, weight);
    });
  }

  return objectives;
}

function getSkavaObjectiveRouteInfluence(actor, point, objectives, options = {}) {
  if (!actor?.position || !point || !Array.isArray(objectives) || !objectives.length) return 0;
  const enhanced = options.enhanced === true;
  const isFlagCarrier = options.flagCarrier === true;
  let score = 0;
  objectives.forEach((objective) => {
    const totalDistance = Math.abs(actor.position.row - objective.row) + Math.abs(actor.position.col - objective.col);
    if (!Number.isFinite(totalDistance) || totalDistance <= 0) return;
    const toPoint = Math.abs(actor.position.row - point.row) + Math.abs(actor.position.col - point.col);
    const fromPoint = Math.abs(point.row - objective.row) + Math.abs(point.col - objective.col);
    if (toPoint <= 0 || toPoint > 4) return;
    if (toPoint + fromPoint !== totalDistance) return;
    let local = Number(objective.weight) || 0;
    if (toPoint === 1) local *= enhanced ? 1.7 : 1.25;
    else if (toPoint === 2) local *= enhanced ? 1.45 : 1.1;
    else local *= 0.78;
    if (isFlagCarrier) local += enhanced ? 10 : 6;
    score += local;
  });
  return score;
}

function getSkavaRouteInterceptionProfile(player, point, enhanced = false) {
  if (!player || !point) return { enemyScore: 0, selfPenalty: 0, allyPenalty: 0, netValue: 0 };
  let enemyScore = 0;
  let allyPenalty = 0;
  const selfPenalty = getSkavaObjectiveRouteInfluence(player, point, getSkavaAllyObjectivePoints(player), {
    enhanced,
    flagCarrier: playerHasFlag(player)
  });
  state.players.forEach((other) => {
    if (!other || !other.position || !isComputerAwareOfPlayerPosition(player, other)) return;
    if (other.id === player.id) return;
    if (arePlayersAllied(player, other)) {
      allyPenalty += getSkavaObjectiveRouteInfluence(other, point, getSkavaAllyObjectivePoints(other), {
        enhanced,
        flagCarrier: playerHasFlag(other)
      });
      return;
    }
    enemyScore += getSkavaObjectiveRouteInfluence(other, point, getSkavaEnemyObjectivePoints(other), {
      enhanced,
      flagCarrier: playerHasFlag(other)
    });
  });
  const netValue = enemyScore - selfPenalty * (enhanced ? 1.45 : 1.28) - allyPenalty * (enhanced ? 1.18 : 1.06);
  return { enemyScore, selfPenalty, allyPenalty, netValue };
}

function getSkavaRouteInterceptionValue(player, point, enhanced = false) {
  return getSkavaRouteInterceptionProfile(player, point, enhanced).netValue;
}

function chooseComputerSkavaBoulderStat(player, point = null) {
  const stats = ["attack", "hp", "technique"].filter((statKey) => (Number(player.currentStats?.[statKey]) || 0) >= 15);
  if (!stats.length) return null;
  const nearbyAllies = point ? state.players.filter((other) => other
    && arePlayersAllied(player, other)
    && other.position
    && isComputerAwareOfPlayerPosition(player, other)
    && Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 3) : [];
  const nearbyEnemies = point ? state.players.filter((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && other.position
    && isComputerAwareOfPlayerPosition(player, other)
    && Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 3) : [];
  return stats
    .map((statKey) => {
      const selfReserve = Math.max(0, (Number(player.currentStats?.[statKey]) || 0) - 15) * 0.08;
      const allyComfort = nearbyAllies.reduce((sum, ally) => sum + Math.max(0, (Number(ally.currentStats?.[statKey]) || 0) - 18), 0) * 0.035;
      const enemyPain = nearbyEnemies.reduce((sum, other) => sum + Math.max(0, 28 - (Number(other.currentStats?.[statKey]) || 0)), 0) * 0.08;
      const score = selfReserve + allyComfort + enemyPain + (statKey === "hp" ? 0.45 : 0);
      return { statKey, score };
    })
    .sort((a, b) => b.score - a.score)[0]?.statKey || null;
}

function getSkavaBoulderStrategicValue(player, point, statKey, enhanced = false) {
  const cell = getCell(point.row, point.col);
  if (!player || player.activeCharacterId !== "trickster3" || !cell || !isValidSkavaBoulderCell(cell)) return -Infinity;
  const playerIndex = state.players.indexOf(player);
  const snapshot = getComputerScoreSnapshot(player);
  const nearbyEnemies = state.players.filter((other) => other
    && other.id !== player.id
    && !arePlayersAllied(player, other)
    && other.position
    && isComputerAwareOfPlayerPosition(player, other)
    && Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 2);
  const nearbyAllies = state.players.filter((other) => other
    && arePlayersAllied(player, other)
    && other.position
    && isComputerAwareOfPlayerPosition(player, other)
    && Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 3);
  const adjacentEnemies = nearbyEnemies.filter((other) => Math.abs(other.position.row - point.row) + Math.abs(other.position.col - point.col) <= 1);
  const existingCache = getOwnedSkavaCacheCells(playerIndex)[0] || null;
  const routeProfile = getSkavaRouteInterceptionProfile(player, point, enhanced);
  const routeInterception = routeProfile.netValue;
  let value = getFlagAccessScoreAtPoint(point.row, point.col) * (isFlagCarrierMapActive() ? 0.85 : 0.2);
  value += getCaptureTerritoryPathBonus(player, cell) * 0.34;
  value += getControlAreaTacticalBonus(player, cell) * 0.42;
  value += routeInterception * (enhanced ? 1.05 : 0.82);
  if (enhanced && routeProfile.enemyScore > 0) {
    value += routeProfile.enemyScore * 0.12;
    value -= routeProfile.selfPenalty * 0.28;
    value -= routeProfile.allyPenalty * 0.16;
  }
  if (doesCurrentMapUseControlAreaWin() && isCellInControlArea(cell)) value += 8.2;
  if (isFlagCarrierMapActive()) value += getComputerVisibleFlagCarrierPressureValue(player, point) * (enhanced ? 0.42 : 0.3);
  value += nearbyEnemies.length * (enhanced ? 4.8 : 2.9);
  value += adjacentEnemies.length * (enhanced ? 5.5 : 2.2);
  value += nearbyAllies.length * 0.65;
  nearbyEnemies.forEach((other) => {
    value += getComputerPriorityTargetValue(player, other) * (enhanced ? 0.54 : 0.28);
    if (playerHasFlag(other)) value += enhanced ? 28 : 16;
  });
  if (existingCache) {
    const distanceToCache = Math.abs(existingCache.row - point.row) + Math.abs(existingCache.col - point.col);
    if (distanceToCache === 1) value += enhanced ? 9.5 : 6.2;
    else if (distanceToCache === 2) value += enhanced ? 6.8 : 4.1;
  }
  if (cell.owner !== null && !isFriendlyOwner(cell.owner, playerIndex)) value += 1.4;
  if (snapshot.endgame) value += enhanced ? 5.2 : 2.1;
  if (getSelectedMapDefinition()?.id === "bigBridge") value += Math.max(0, 4 - Math.abs(point.col - Math.floor(getBoardCols() / 2))) * 1.2;
  return value - getComputerEnemyTileDanger(player, point, cell) * 0.1 + ((Number(player.currentStats?.[statKey]) || 0) - 15) * 0.03;
}

function chooseComputerSkavaBoulderEnhancement(player, point, placementValue) {
  const snapshot = getComputerScoreSnapshot(player);
  const techniqueCurrent = Number(player.currentStats?.technique) || 0;
  const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, "hp"));
  const enemyHasFlag = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
  const routeProfile = point ? getSkavaRouteInterceptionProfile(player, point, true) : null;
  const asymmetricBlock = !!routeProfile
    && routeProfile.enemyScore >= (enemyHasFlag ? 14 : 10)
    && routeProfile.selfPenalty <= Math.max(1.5, routeProfile.enemyScore * 0.22)
    && routeProfile.allyPenalty <= Math.max(2.4, routeProfile.enemyScore * 0.34)
    && routeProfile.netValue >= (enemyHasFlag ? 10 : 7);
  const threshold = enemyHasFlag ? 10.5 : snapshot.endgame ? 11.2 : 13.8;
  return techniqueCurrent >= 15
    && placementValue >= threshold
    && hpRatio >= 0.42
    && asymmetricBlock;
}

function chooseComputerSkavaBoulderPlacement(player, statKey, enhanced = false) {
  return getPlayableBoardCells()
    .filter((cell) => isValidSkavaBoulderCell(cell))
    .map((cell) => ({
      row: cell.row,
      col: cell.col,
      value: getSkavaBoulderStrategicValue(player, { row: cell.row, col: cell.col }, statKey, enhanced)
    }))
    .sort((a, b) => b.value - a.value)[0] || null;
}

function chooseComputerSkavaSkillAction(player) {
  if (!player || player.activeCharacterId !== "trickster3") return null;
  const snapshot = getComputerScoreSnapshot(player);
  const playerIndex = state.players.indexOf(player);
  const existingCache = getOwnedSkavaCacheCells(playerIndex)[0] || null;
  const enemyHasFlag = state.players.some((other) => other && !arePlayersAllied(player, other) && playerHasFlag(other));
  const cacheStat = chooseComputerSkavaCacheStat(player);
  const cachePlacement = cacheStat && (Number(player.cooldowns?.trickster3FieldCache) || 0) <= 0
    ? chooseComputerSkavaCachePlacement(player, cacheStat)
    : null;
  const boulderStatSeed = chooseComputerSkavaBoulderStat(player, cachePlacement || existingCache || player.position);
  const enhancedPlacementSeed = boulderStatSeed ? chooseComputerSkavaBoulderPlacement(player, boulderStatSeed, true) : null;
  const boulderEnhanced = boulderStatSeed ? chooseComputerSkavaBoulderEnhancement(player, enhancedPlacementSeed, enhancedPlacementSeed?.value || -Infinity) : false;
  const boulderStat = chooseComputerSkavaBoulderStat(player, cachePlacement || existingCache || player.position);
  const boulderPlacement = boulderStat && (Number(player.cooldowns?.trickster3BaitedBoulder) || 0) <= 0
    ? chooseComputerSkavaBoulderPlacement(player, boulderStat, boulderEnhanced)
    : null;
  let cacheValue = cachePlacement?.value ?? -Infinity;
  let boulderValue = boulderPlacement?.value ?? -Infinity;
  if (existingCache && boulderPlacement) {
    const distanceToCache = Math.abs(existingCache.row - boulderPlacement.row) + Math.abs(existingCache.col - boulderPlacement.col);
    if (distanceToCache <= 2) boulderValue += 3.8;
  }
  if (cachePlacement && boulderPlacement) {
    const distance = Math.abs(cachePlacement.row - boulderPlacement.row) + Math.abs(cachePlacement.col - boulderPlacement.col);
    if (distance <= 2) {
      cacheValue += 1.8;
      boulderValue += 2.6;
    }
  }
  if (enemyHasFlag) boulderValue += boulderEnhanced ? 7.5 : 4.4;
  if (!existingCache && !snapshot.endgame) cacheValue += 3.2;
  if (snapshot.endgame) boulderValue += 2.8;
  if (cacheValue < 5.2 && boulderValue < 7.8) return null;
  if (boulderValue >= cacheValue + (snapshot.endgame || enemyHasFlag ? 0.35 : 1.1)) {
    return { type: "boulder", statKey: boulderStat, enhanced: boulderEnhanced, point: boulderPlacement };
  }
  return { type: "cache", statKey: cacheStat, point: cachePlacement };
}

async function chooseSkavaBoulderEnhancementPrompt(player) {
  if ((Number(player.currentStats?.technique) || 0) < 15) return false;
  if (isComputerPlayer(player)) return false;
  return new Promise((resolve) => {
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.zoneEnhancePrompt = {
        title: "Baited Boulder Reinforcement",
        message: `${player.name} can spend an extra 15 Technique to keep this boulder unbreakable until the end of your next turn.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "🪨",
        resolve,
        collapsed: false
      };
      state.ui.zoneEntryPrompt = null;
      state.ui.pitEnhancePrompt = null;
      state.ui.pitEntryPrompt = null;
      state.ui.rascaSnapbackPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }
    showSimpleModal({
      title: "Baited Boulder Reinforcement",
      body: "Spend an extra 15 Technique to keep this boulder unbreakable until the end of your next turn?",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

async function activateSkavaFieldCache(player, chosenStatKey = null, chosenPoint = null) {
  if ((Number(player.cooldowns?.trickster3FieldCache) || 0) > 0) return;
  const statKey = chosenStatKey || (isComputerPlayer(player) ? chooseComputerSkavaCacheStat(player) : null);
  if (!statKey || (Number(player.currentStats?.[statKey]) || 0) < 15) return;
  const target = chosenPoint
    || (isComputerPlayer(player)
      ? chooseComputerSkavaCachePlacement(player, statKey)
      : await chooseSkavaTargetTile(player, "fieldCache", "Field Cache", "Click a highlighted normal tile to turn it into a recovery tile."));
  if (!target) return;
  const cell = getCell(target.row, target.col);
  if (!isValidSkavaFieldCacheCell(cell)) return;
  if (!spendStatForSkill(player, statKey, 15)) return;
  applySkavaFieldCache(player, cell, statKey);
  player.cooldowns.trickster3FieldCache = 2;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Field Cache");
  log(`${player.name} placed a ${getSkavaCacheLabel(statKey)} recovery cache.`, true);
  renderAll();
}

async function activateSkavaBaitedBoulder(player, chosenStatKey = null, chosenPoint = null, forcedEnhanced = null) {
  if ((Number(player.cooldowns?.trickster3BaitedBoulder) || 0) > 0) return;
  const statKey = chosenStatKey || (isComputerPlayer(player) ? chooseComputerSkavaBoulderStat(player) : null);
  if (!statKey || (Number(player.currentStats?.[statKey]) || 0) < 15) return;
  const enhanced = forcedEnhanced === null
    ? (isComputerPlayer(player)
      ? (() => {
        const enhancedPlacement = chooseComputerSkavaBoulderPlacement(player, statKey, true);
        return chooseComputerSkavaBoulderEnhancement(player, enhancedPlacement, enhancedPlacement?.value || -Infinity);
      })()
      : await chooseSkavaBoulderEnhancementPrompt(player))
    : !!forcedEnhanced;
  if (enhanced && (Number(player.currentStats?.technique) || 0) < 15) return;
  const target = chosenPoint
    || (isComputerPlayer(player)
      ? chooseComputerSkavaBoulderPlacement(player, statKey, enhanced)
      : await chooseSkavaTargetTile(player, "boulder", "Baited Boulder", "Click a highlighted normal empty tile to place the boulder."));
  if (!target) return;
  const cell = getCell(target.row, target.col);
  if (!isValidSkavaBoulderCell(cell)) return;
  if (!spendStatForSkill(player, statKey, 15)) return;
  if (enhanced && !spendStatForSkill(player, "technique", 15)) {
    restoreStat(player, statKey, 15);
    return;
  }
  cell.obstacle = createSkavaBoulderState(state.players.indexOf(player), statKey, enhanced);
  player.cooldowns.trickster3BaitedBoulder = 2;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Baited Boulder");
  log(`${player.name} placed a baited boulder${enhanced ? " (reinforced)" : ""}.`, true);
  renderAll();
}

async function activateSkavaSkill(player, skillIndex = null) {
  if (isComputerPlayer(player) && !Number.isInteger(skillIndex)) {
    const action = chooseComputerSkavaSkillAction(player);
    if (!action) return;
    if (action.type === "boulder") {
      await activateSkavaBaitedBoulder(player, action.statKey, action.point, action.enhanced);
      return;
    }
    await activateSkavaFieldCache(player, action.statKey, action.point);
    return;
  }
  if (skillIndex === 1) {
    let statKey = null;
    await chooseStatIconModal(player, "Baited Boulder", "Choose which stat this rock uses for both its cost and its break damage.", (value) => { statKey = value; });
    if (!statKey) return;
    await activateSkavaBaitedBoulder(player, statKey);
    return;
  }
  let statKey = null;
  await chooseStatIconModal(player, "Field Cache", "Choose which stat this recovery tile restores. That same stat pays the cost.", (value) => { statKey = value; });
  if (!statKey) return;
  await activateSkavaFieldCache(player, statKey);
}

async function useSkillFlow(skillIndex = null) {
  const player = getCurrentPlayer();
  const activeSections = player ? getCharacterDetailSections(player.activeCharacterId).active : [];
  const skillEntry = Number.isInteger(skillIndex) ? activeSections[skillIndex] : null;
  const availability = getSkillAvailabilityState(player, skillEntry, skillIndex);
  if (!canUseSkill() || availability.disabled) return;

  switch (player.activeCharacterId) {
    case "painter2":
      await activatePainter2Hide(player);
      break;
    case "painter3":
      activateBrakkBackblastCharge(player);
      break;
    case "painter4":
      activateTorgaBacktrack(player);
      break;
    case "trapper1":
      await activateTrapper1Zone(player);
      break;
    case "trapper2":
      await activateTrapper2Pit(player);
      break;
    case "trapper3":
      await activateVeskaVenomVarnish(player);
      break;
    case "battler3":
      activateBattler3MesmerSync(player);
      break;
    case "battler4":
      activateBattler4BleakOffering(player);
      break;
    case "battler5":
      activateBattler5EmergencyCallout(player);
      break;
    case "tanker2":
      await activateTanker2Quickdig(player);
      break;
    case "tanker3":
      await activateTanker3Skill(player, Number.isInteger(skillIndex) ? skillIndex : null);
      break;
    case "supporter1":
      activateSupporter1PushAhead(player);
      break;
    case "supporter2":
      await activateSupporter2FreshBatch(player);
      break;
    case "trickster1":
      await activateMimiSkill(player, Number.isInteger(skillIndex) ? skillIndex : null);
      break;
    case "trickster2":
      await activateRascaSkill(player, Number.isInteger(skillIndex) ? skillIndex : null);
      break;
    case "trickster3":
      await activateSkavaSkill(player, Number.isInteger(skillIndex) ? skillIndex : null);
      break;
    default:
      showSimpleModal({
        title: "Skill Info",
        body: characterLibrary[player.activeCharacterId].skillText,
        buttons: [{ label: "Close", style: "primary", onClick: closeTopModal }]
      });
      break;
  }
}

function activatePainter2Hide(player) {
  if (player.cooldowns.painter2Hide > 0) return;
  if (!spendStatForSkill(player, "technique", 10)) {
    return;
  }
  player.statuses.hiddenTurns = 2;
  player.cooldowns.painter2Hide = 3;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Mistveil");
  log(`${player.name} became hidden.`, true);
  renderAll();
}

function activateTorgaBacktrack(player) {
  if (!player || player.activeCharacterId !== "painter4") return;
  if ((Number(player.cooldowns?.painter4Backtrack) || 0) > 0) return;
  if (!player.position || !player.startPosition) return;
  const atStart = player.position.row === player.startPosition.row && player.position.col === player.startPosition.col;
  if (atStart) return;
  if (!spendStatForSkill(player, "technique", 15)) return;

  dropFlagAtPlayerPosition(player, `${player.name} used Backtrack and dropped the flag.`);
  player.position = { ...player.startPosition };
  discardFoodCourtFoodForReturnToStart(player, "returned to the starting tile with Backtrack");
  const attackRecovered = restoreStat(player, "attack", 15);
  const hpRecovered = restoreStat(player, "hp", 15);
  if (attackRecovered > 0 || hpRecovered > 0) {
    log(`${player.name} restored ${attackRecovered} Attack and ${hpRecovered} HP with Backtrack.`, true);
  }
  player.cooldowns.painter4Backtrack = 4;
  player.turnFlags.usedSkill = true;
  if (state.moveDie !== null) {
    state.selectedPath = [{ ...player.position }];
    state.selectedPaintTargets = [];
    state.remainingMove = 0;
    state.remainingPaint = getCurrentTurnPaintAllowance();
    state.currentAction = "paint";
  }
  showSkillActivationBanner(player, "Backtrack");
  log(`${player.name} returned to the starting tile with Backtrack.`, true);
  renderAll();
}

function activateBrakkBackblastCharge(player) {
  if ((Number(player.cooldowns?.painter3Backblast) || 0) > 0) return;
  if (isBrakkPaintBombActive(player)) return;
  if (!spendStatForSkill(player, "hp", 15)) return;
  player.statuses.brakkPaintBomb = {
    phase: "charging",
    storedPaint: 0
  };
  player.cooldowns.painter3Backblast = 5;
  player.turnFlags.usedSkill = true;
  if (state.currentAction === "paint") {
    addBrakkPaintBombCharge(player, state.remainingPaint);
    state.remainingPaint = 0;
    state.paintPhaseStartRemaining = 0;
    state.selectedPaintTargets = [];
  }
  showSkillActivationBanner(player, "Backblast Charge");
  log(`${player.name} entered Paint Bomb state.`, true);
  renderAll();
}

function activateBattler3MesmerSync(player) {
  if ((player.cooldowns?.battler3MesmerSync || 0) > 0) return;
  if (!spendStatForSkill(player, "attack", 15)) {
    return;
  }
  player.statuses.mesmerSyncRounds = 1;
  player.statuses.mesmerSyncBattleRemaining = 1;
  player.cooldowns.battler3MesmerSync = 4;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Mesmer Sync");
  log(`${player.name} activated Mesmer Sync for the next battle this round.`, true);
  renderAll();
}

function activateBattler4BleakOffering(player) {
  if (!player || player.activeCharacterId !== "battler4") return;
  if ((Number(player.cooldowns?.battler4BleakOffering) || 0) > 0) return;
  const losses = [];
  ["attack", "hp", "technique"].forEach((statKey) => {
    const before = Math.max(0, Number(player.currentStats?.[statKey]) || 0);
    const after = Math.max(1, before - 15);
    const loss = Math.max(0, before - after);
    player.currentStats[statKey] = after;
    if (loss > 0) {
      losses.push({ statKey, amount: loss });
      if (statKey === "hp") registerHpLoss(player, loss);
    }
  });
  if (losses.length) {
    queueStatLossPopup(player, losses);
  }
  addCorvenOmen(player, 25, "Bleak Offering");
  applyCorvenAutoHeal(player, 5);
  player.cooldowns.battler4BleakOffering = 3;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Bleak Offering");
  log(`${player.name} used Bleak Offering.`, true);
  handleZeroHp(player, null);
  renderAll();
}

function activateBattler5EmergencyCallout(player) {
  if (!player || player.activeCharacterId !== "battler5") return;
  if ((Number(player.cooldowns?.battler5EmergencyCallout) || 0) > 0) return;
  if (playerHasFlag(player) || playerHasFoodCourtFood(player) || !!state.moveDie) return;
  if (!spendStatForSkill(player, "technique", 15)) return;
  player.turnFlags.usedSkill = true;
  player.turnFlags.moppetEmergencyCalloutPrimed = true;
  player.cooldowns.battler5EmergencyCallout = 4;
  showSkillActivationBanner(player, "Emergency Callout");
  log(`${player.name} used Emergency Callout. This turn's move range will become Move + Space, the normal paint phase will be skipped, only the tile Moppet ends on can be repainted, and HP damage taken will be doubled.`, true);
  renderAll();
}

async function activateTanker3ProtectiveDetail(player, forcedTarget = null) {
  if (!player || player.activeCharacterId !== "tanker3") return;
  if ((Number(player.cooldowns?.tanker3ProtectiveDetail) || 0) > 0 || getHobbsProtectiveDetailState(player)) return;
  if ((Number(player.currentStats?.technique) || 0) < 10) return;
  const candidates = getHobbsProtectiveDetailCandidates(player);
  if (!candidates.length) return;
  const target = forcedTarget
    || (isComputerPlayer(player)
      ? (candidates
        .map((candidate) => ({ candidate, score: getHobbsProtectionTargetValue(player, candidate) }))
        .sort((left, right) => right.score - left.score)[0]?.candidate || null)
      : await chooseHobbsTargetFromModal("Protective Detail", "Choose yourself or one nearby allied player to guard.", candidates, player));
  if (!target || !candidates.some((candidate) => candidate.id === target.id)) return;
  if (!spendStatForSkill(player, "technique", 10)) return;
  setHobbsProtectiveDetail(player, target);
  player.cooldowns.tanker3ProtectiveDetail = 4;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Protective Detail");
  log(`${player.name} used Protective Detail on ${target === player ? "themself" : target.name}.`, true);
  renderAll();
}

async function activateTanker3BreakItUp(player, forcedTarget = null) {
  if (!player || player.activeCharacterId !== "tanker3") return;
  if ((Number(player.cooldowns?.tanker3BreakItUp) || 0) > 0 || getHobbsBattleProtectState(player)) return;
  const candidates = getHobbsBreakItUpCandidates(player);
  if (!candidates.length) return;
  const target = forcedTarget
    || (isComputerPlayer(player)
      ? (candidates
        .map((candidate) => ({ candidate, score: getHobbsBattleProtectTargetValue(player, candidate) }))
        .sort((left, right) => right.score - left.score)[0]?.candidate || null)
      : await chooseHobbsTargetFromModal("Break It Up", "Choose who should ignore the next battle. Hobbs will take 15 HP damage when it triggers.", candidates, player));
  if (!target || !candidates.some((candidate) => candidate.id === target.id)) return;
  setHobbsBattleProtect(player, target);
  player.cooldowns.tanker3BreakItUp = 3;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Break It Up");
  log(`${player.name} used Break It Up on ${target === player ? "themself" : target.name}.`, true);
  renderAll();
}

async function activateTanker3Skill(player, skillIndex = null) {
  if (skillIndex === 1) {
    await activateTanker3BreakItUp(player);
    return;
  }
  await activateTanker3ProtectiveDetail(player);
}

function activateTanker2Quickdig(player) {
  if (player.cooldowns.tanker2Quickdig > 0) return;
  if (getInventorySlotCount(player) >= MAX_ITEMS) {
    showSimpleModal({
      title: "Bag is full",
      body: "Quickdig can only be used when the bag has free space.",
      buttons: [{ label: "Close", style: "primary", onClick: closeTopModal }]
    });
    return;
  }
  if (!spendStatForSkill(player, "technique", 10)) {
    return;
  }

  const item = createRandomTanker2Item();
  addItemToInventory(player, item);
  player.cooldowns.tanker2Quickdig = 2;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Quickdig");
  log(`${player.name} gained ${item.name} with Quickdig.`, true);
  renderAll();
}

function activateSupporter1PushAhead(player) {
  if ((player.cooldowns?.supporter1PushAhead || 0) > 0) return;
  if (!spendStatForSkill(player, "attack", 10)) return;
  if (!spendStatForSkill(player, "technique", 10)) {
    restoreStat(player, "attack", 10);
    return;
  }
  player.statuses.pushAheadRounds = 2;
  player.cooldowns.supporter1PushAhead = 4;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Push Ahead!");
  log(`${player.name} rallied nearby allies with Push Ahead!`, true);
  renderAll();
}

function applyPipFreeSamples(player) {
  if (!player || player.activeCharacterId !== "supporter2") return;
  const candidates = state.players.filter((candidate) => candidate
    && (candidate === player || arePlayersAllied(player, candidate))
    && getPipMissingStatKeys(candidate).length > 0);
  if (!candidates.length) return;
  const target = candidates[Math.floor(Math.random() * candidates.length)] || null;
  if (!target) return;
  const missingStats = getPipMissingStatKeys(target);
  if (!missingStats.length) return;
  const statKey = missingStats[Math.floor(Math.random() * missingStats.length)];
  const restored = restoreStat(target, statKey, 5);
  if (restored > 0) {
    triggerPipPopcornEffect(target, "passive");
    log(`${player.name}'s Free Samples restored ${restored} ${statLabel(statKey)} for ${target.name}.`, true);
  }
}

function choosePipFreshBatchEnhancementPrompt(player, target, blastTargets) {
  return new Promise((resolve) => {
    if ((Number(player.currentStats?.attack) || 0) < 15 || !blastTargets.length) {
      resolve(false);
      return;
    }
    if (isComputerPlayer(player)) {
      resolve(!!chooseComputerPipFreshBatchAction(player)?.useBlast);
      return;
    }
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.pipEnhancePrompt = {
        title: "Fresh Batch Enhancement",
        message: `${player.name} can spend an extra 15 Attack to deal 15 HP damage to enemy players next to ${target.name}.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "🍿",
        resolve,
        collapsed: false
      };
      state.ui.zoneEnhancePrompt = null;
      state.ui.zoneEntryPrompt = null;
      state.ui.pitEnhancePrompt = null;
      state.ui.pitEntryPrompt = null;
      state.ui.rascaSnapbackPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }
    showSimpleModal({
      title: "Fresh Batch Enhancement",
      body: "Spend an extra 15 Attack to deal 15 HP damage to enemy players next to the healed target.",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

async function activateSupporter2FreshBatch(player, forcedTarget = null, forcedStatKey = null, forcedBlast = null) {
  if (!player || player.activeCharacterId !== "supporter2") return;
  if ((Number(player.cooldowns?.supporter2FreshBatch) || 0) > 0) return;
  if ((Number(player.currentStats?.technique) || 0) < 15) return;
  const candidates = getPipEligibleTargets(player);
  if (!candidates.length) return;
  const computerAction = isComputerPlayer(player) ? chooseComputerPipFreshBatchAction(player) : null;
  const target = forcedTarget
    || (isComputerPlayer(player)
      ? computerAction?.target || null
      : await chooseHobbsTargetFromModal("Fresh Batch", "Choose yourself or one nearby allied player to heal.", candidates, player));
  if (!target || !candidates.some((candidate) => candidate.id === target.id)) return;
  const missingStats = getPipMissingStatKeys(target);
  if (!missingStats.length) return;
  let statKey = forcedStatKey || (isComputerPlayer(player) ? computerAction?.statKey || getPipBestHealStat(target, player) : null);
  if (!statKey) {
    await chooseStatIconModal(target, "Fresh Batch", "Choose which stat to restore by 25.", (value) => { statKey = value; }, missingStats);
  }
  if (!statKey || !missingStats.includes(statKey)) return;
  if (!spendStatForSkill(player, "technique", 15)) return;
  const restored = restoreStat(target, statKey, 25);
  if (restored > 0) triggerPipPopcornEffect(target, "active");
  const blastTargets = getPipFreshBatchBlastTargets(target, player);
  let usedBlast = false;
  if (forcedBlast === true || forcedBlast === false) {
    usedBlast = !!forcedBlast;
  } else if (isComputerPlayer(player)) {
    usedBlast = !!computerAction?.useBlast;
  } else if ((Number(player.currentStats?.attack) || 0) >= 15 && blastTargets.length > 0) {
    usedBlast = await choosePipFreshBatchEnhancementPrompt(player, target, blastTargets);
  }
  if (usedBlast) {
    if (!spendStatForSkill(player, "attack", 15)) {
      usedBlast = false;
    } else {
      blastTargets.forEach((enemy) => {
        applyFieldDamage(enemy, 15, `${enemy.name} took 15 HP damage from ${player.name}'s Fresh Batch burst.`, state.players.indexOf(player));
        triggerPipPopcornEffect(enemy, "blast");
      });
    }
  }
  player.cooldowns.supporter2FreshBatch = 3;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Fresh Batch");
  log(`${player.name} used Fresh Batch on ${target.name}${restored > 0 ? ` and restored ${restored} ${statLabel(statKey)}` : ""}${usedBlast ? ", then blasted nearby enemies" : ""}.`, true);
  renderAll();
}

async function activateMimiSkill(player, skillIndex = null) {
  if (skillIndex === 0 || (skillIndex === null && isMimiInStarMode(player))) {
    if ((Number(player.cooldowns?.mimiOffRecord) || 0) > 0) return;
    if (getMimiCoinCount(player) < 5) return;
    if (!isMimiInStarMode(player)) return;
    player.statuses.mimiMode = "gambler";
    player.icon = characterLibrary.trickster1?.gamblerIconImage || player.icon;
    player.cooldowns.mimiOffRecord = 3;
    player.turnFlags.usedSkill = true;
    triggerMimiGamblerRipple(player);
    showSkillActivationBanner(player, "Off the Record");
    log(`${player.name} switched to Gambler Mode.`, true);
    renderAll();
    if (!isComputerPlayer(player)) {
      state.ui.skillPanelOpen = true;
      renderExpandablePanels();
    }
    return;
  }

  if (skillIndex === 1 && !isMimiInGamblerMode(player)) return;
  if (player.turnFlags?.mimiRouletteUsed || getMimiCoinCount(player) <= 0) return;
  const roulette = await chooseMimiRoulette(player);
  if (!roulette) return;
  await spinMimiRoulette(player, roulette);
}

function getMimiRouletteCost(player, roulette) {
  const coins = getMimiCoinCount(player);
  if (roulette.id === "pocket") return Math.max(1, Math.min(roulette.cost, coins));
  return roulette.cost;
}

function canSpinMimiRoulette(player, roulette) {
  const coins = getMimiCoinCount(player);
  return roulette.id === "pocket" ? coins >= 1 : coins >= roulette.cost;
}

function getMimiRouletteOutcomeCenterDegrees(roulette, outcome) {
  const total = roulette.outcomes.reduce((sum, entry) => sum + entry.weight, 0) || 100;
  let start = 0;
  for (const entry of roulette.outcomes) {
    const span = (entry.weight / total) * 360;
    if (entry === outcome || entry.type === outcome.type) {
      return start + span / 2;
    }
    start += span;
  }
  return 0;
}

function getMimiRouletteOutcomeColor(outcome, index) {
  switch (outcome?.type) {
    case "restore":
      return "#f7f0d2";
    case "shard":
    case "diceBoost":
    case "shardDiceBoost":
      return "#d42d42";
    case "maxBonus":
    case "maxAndRestore":
    case "jackpotWin":
      return "#e3bd55";
    case "statLoss":
    case "statLossDiceOne":
      return "#1c202a";
    default:
      return ["#cf3346", "#20242f", "#e6b84f", "#48566d"][index % 4];
  }
}

function buildMimiRouletteGradient(roulette) {
  const total = roulette.outcomes.reduce((sum, outcome) => sum + (Number(outcome.weight) || 0), 0) || 100;
  let cursor = 0;
  const stops = roulette.outcomes.map((outcome, index) => {
    const start = cursor;
    cursor += ((Number(outcome.weight) || 0) / total) * 100;
    const end = index === roulette.outcomes.length - 1 ? 100 : cursor;
    return `${getMimiRouletteOutcomeColor(outcome, index)} ${start.toFixed(3)}% ${end.toFixed(3)}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function renderMimiRouletteWheel(roulette, className = "") {
  const icons = roulette.outcomes.map((outcome) => {
    const angle = getMimiRouletteOutcomeCenterDegrees(roulette, outcome);
    return `<span style="--mimi-outcome-angle:${angle}deg;--mimi-outcome-angle-neg:${-angle}deg">${outcome.icon}</span>`;
  }).join("");
  return `
    <div class="mimiRouletteWheelFrame" aria-hidden="true">
      <div class="mimiRouletteWheel ${sanitize(className)}" style="--mimi-roulette-bg:${sanitize(buildMimiRouletteGradient(roulette))}">${icons}</div>
      <div class="mimiRoulettePointer"></div>
    </div>
  `;
}

function renderMimiRouletteChoiceBody(player) {
  const coins = getMimiCoinCount(player);
  return `
    <div class="mimiRouletteHeader"><span class="mimiCoinPill">🪙 ${coins}</span><span>Choose a roulette.</span></div>
    <div class="mimiRouletteGrid">
      ${MIMI_ROULETTES.map((roulette) => {
        const canSpin = canSpinMimiRoulette(player, roulette);
        const cost = getMimiRouletteCost(player, roulette);
        return `
          <section class="mimiRouletteCard ${canSpin ? "" : "is-disabled"}">
            <h4>${sanitize(roulette.name)}</h4>
            ${renderMimiRouletteWheel(roulette)}
            <div class="mimiRouletteCost">Cost: 🪙 ${cost}</div>
            <div class="mimiRouletteActions">
              <button type="button" class="ghostButton" data-mimi-roulette-detail="${sanitize(roulette.id)}">Details</button>
              <button type="button" class="primaryButton" data-mimi-roulette-spin="${sanitize(roulette.id)}" ${canSpin ? "" : "disabled"}>Spin</button>
            </div>
          </section>
        `;
      }).join("")}
    </div>
  `;
}

function chooseMimiRoulette(player) {
  if (isComputerPlayer(player)) {
    const roulette = chooseComputerMimiRoulette(player);
    return Promise.resolve(roulette);
  }
  return new Promise((resolve) => {
    const renderChoice = () => {
      showSimpleModal({
        title: "Double or Nothing",
        body: renderMimiRouletteChoiceBody(player),
        buttons: [{ label: "Cancel", style: "ghost", onClick: () => { closeTopModal(); resolve(null); } }],
        afterRender: (modal) => {
          modal.classList.add("mimiRouletteModal");
          Array.from(modal.querySelectorAll("[data-mimi-roulette-spin]")).forEach((button) => {
            button.addEventListener("click", () => {
              const roulette = MIMI_ROULETTES.find((entry) => entry.id === button.dataset.mimiRouletteSpin);
              if (!roulette || !canSpinMimiRoulette(player, roulette)) return;
              closeTopModal();
              resolve(roulette);
            });
          });
          Array.from(modal.querySelectorAll("[data-mimi-roulette-detail]")).forEach((button) => {
            button.addEventListener("click", () => {
              const roulette = MIMI_ROULETTES.find((entry) => entry.id === button.dataset.mimiRouletteDetail);
              if (!roulette) return;
              showSimpleModal({
                title: roulette.name,
                body: `
                  <p>${sanitize(roulette.detail)}</p>
                  <div class="mimiRouletteDetailRows">
                    ${roulette.outcomes.map((outcome) => `
                      <div class="mimiRouletteDetailRow">
                        <span class="mimiRouletteDetailIcon">${outcome.icon}</span>
                        <strong>${outcome.weight}%</strong>
                        <span>${sanitize(outcome.label)}</span>
                      </div>
                    `).join("")}
                  </div>
                `,
                buttons: [{ label: "Back", style: "primary", onClick: renderChoice }]
              });
            });
          });
        }
      });
    };
    renderChoice();
  });
}

function pickMimiRouletteOutcome(roulette) {
  const total = roulette.outcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
  let roll = Math.random() * total;
  for (const outcome of roulette.outcomes) {
    roll -= outcome.weight;
    if (roll <= 0) return outcome;
  }
  return roulette.outcomes[roulette.outcomes.length - 1];
}

function playMimiRouletteStopAnimation(modal, stopDegrees) {
  const wheel = modal.querySelector(".mimiRouletteWheel");
  if (!wheel) return;
  wheel.classList.remove("is-free-spinning", "is-spinning");
  wheel.style.transform = "rotate(0deg)";
  wheel.style.setProperty("--mimi-spin-deg", `${stopDegrees}deg`);
  void wheel.offsetWidth;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wheel.classList.add("is-spinning");
      wheel.style.transform = "";
    });
  });
}

function applyAllStatLoss(player, amount, { queuePopup = true } = {}) {
  const losses = [];
  let totalLoss = 0;
  ["attack", "hp", "technique"].forEach((statKey) => {
    const before = Number(player.currentStats?.[statKey]) || 0;
    player.currentStats[statKey] = Math.max(0, before - amount);
    const lost = before - player.currentStats[statKey];
    if (lost > 0) losses.push({ statKey, amount: lost });
    totalLoss += lost;
    if (statKey === "hp" && lost > 0) registerHpLoss(player, lost);
  });
  if (losses.length && queuePopup) queueStatLossPopup(player, losses);
  registerCorvenTurnLoss(player, totalLoss);
  handleZeroHp(player, null);
  return losses;
}

function getActiveVeskaVarnishForOwner(ownerIndex) {
  return (state.venomVarnishes || []).find((effect) => effect.ownerIndex === ownerIndex && effect.remainingTurns > 0) || null;
}

function isVeskaVarnishTileForEffect(effect, cell, targetPlayer) {
  if (!effect || !cell || cell.owner === null || !targetPlayer) return false;
  const owner = state.players[effect.ownerIndex];
  if (!owner || owner.id === targetPlayer.id || arePlayersAllied(owner, targetPlayer)) return false;
  const tileOwner = state.players[cell.owner];
  if (!tileOwner) return false;
  return cell.owner === effect.ownerIndex || arePlayersAllied(owner, tileOwner);
}

function getThreateningVeskaVarnishes(player, cell) {
  if (!player || !cell) return [];
  const playerIndex = state.players.indexOf(player);
  return (state.venomVarnishes || []).filter((effect) => (
    effect
    && effect.remainingTurns > 0
    && effect.ownerIndex !== playerIndex
    && isVeskaVarnishTileForEffect(effect, cell, player)
  ));
}

function restoreVeskaFromVenom(effect) {
  if (!effect?.enhanced) return;
  const owner = state.players[effect.ownerIndex];
  if (!owner) return;
  const gains = [];
  ["attack", "hp", "technique"].forEach((statKey) => {
    const maxValue = getCurrentMax(owner, statKey);
    const before = Number(owner.currentStats?.[statKey]) || 0;
    owner.currentStats[statKey] = Math.min(maxValue, before + 2);
    const gained = owner.currentStats[statKey] - before;
    if (gained > 0) gains.push({ statKey, amount: gained });
  });
  if (gains.length) queueStatGainPopup(owner, gains);
}

function applyVeskaVenomLoss(player, effect, amount, reason) {
  if (!player || !effect) return false;
  const losses = applyAllStatLoss(player, amount, { queuePopup: true });
  if (!losses.length) return false;
  restoreVeskaFromVenom(effect);
  const owner = state.players[effect.ownerIndex];
  log(`${player.name} lost ${amount} from each current stat from ${owner?.name || "Veska"}'s Venom Varnish${reason ? ` (${reason})` : ""}.`, true);
  return true;
}

function applyMimiDiceBoost(player, amount) {
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (safeAmount <= 0) return;
  if (state.moveDie !== null && state.currentAction !== "paint") {
    addCurrentTurnMovePaintCountBonus(player, safeAmount, `${player.name}'s current Move and Space counts increased by +${safeAmount}.`);
    return;
  }
  player.statuses.mimiNextDiceBoost = (Number(player.statuses?.mimiNextDiceBoost) || 0) + safeAmount;
  log(`${player.name}'s next Move and Space counts will increase by +${safeAmount}.`, true);
}

function applyMimiRouletteRestore(player, amount) {
  const gains = [];
  ["attack", "hp", "technique"].forEach((statKey) => {
    const maxValue = getCurrentMax(player, statKey);
    const before = Number(player.currentStats?.[statKey]) || 0;
    player.currentStats[statKey] = Math.min(maxValue, before + amount);
    const gained = player.currentStats[statKey] - before;
    if (gained > 0) gains.push({ statKey, amount: gained });
  });
  return gains;
}

function applyMimiRouletteMaxGain(player, amount) {
  const gains = [];
  ["attack", "hp", "technique"].forEach((statKey) => {
    const safeAmount = Math.max(0, Number(amount) || 0);
    const previous = Number(player.tempMaxBonus?.[statKey]) || 0;
    const limit = Math.max(0, DEFAULT_MAX_STAT - player.baseStats[statKey]);
    const next = Math.min(limit, previous + safeAmount);
    const raised = next - previous;
    if (raised > 0) {
      player.tempMaxBonus[statKey] = next;
      gains.push({ statKey, amount: raised });
    }
  });
  clampPlayerStats(player);
  return gains;
}

function queueMimiRoulettePopupResult(player, popupResult) {
  if (!popupResult) return;
  if (popupResult.losses?.length) queueStatLossPopup(player, popupResult.losses);
  if (popupResult.gains?.length) queueStatGainPopup(player, popupResult.gains);
  if (popupResult.capGains?.length) queueStatMaxGainPopup(player, popupResult.capGains);
}

function showMimiRouletteResultNotification(player, roulette, outcome) {
  if (!player || !roulette || !outcome) return;
  showTopPlayerEventBanner(
    player,
    `<strong>${sanitize(player.name)}</strong> spun <strong>${sanitize(roulette.name)}</strong> and got <strong>${sanitize(outcome.label)}</strong>.`
  );
}

function applyMimiRouletteOutcome(player, outcome) {
  const popupResult = { losses: [], gains: [], capGains: [] };
  switch (outcome.type) {
    case "restore":
      popupResult.gains.push(...applyMimiRouletteRestore(player, outcome.amount));
      break;
    case "shard":
      addItemToInventory(player, { id: "forceShard", name: "Power Shard", icon: itemDefinitions.forceShard.icon, quantity: outcome.amount }, { suppressLog: true });
      break;
    case "diceBoost":
      applyMimiDiceBoost(player, outcome.amount);
      break;
    case "shardDiceBoost":
      addItemToInventory(player, { id: "forceShard", name: "Power Shard", icon: itemDefinitions.forceShard.icon, quantity: outcome.shardAmount }, { suppressLog: true });
      applyMimiDiceBoost(player, outcome.diceAmount);
      break;
    case "maxBonus":
      popupResult.capGains.push(...applyMimiRouletteMaxGain(player, outcome.amount));
      break;
    case "maxAndRestore":
      popupResult.capGains.push(...applyMimiRouletteMaxGain(player, outcome.amount));
      popupResult.gains.push(...applyMimiRouletteRestore(player, outcome.amount));
      break;
    case "jackpotWin":
      addItemToInventory(player, { id: "forceShard", name: "Power Shard", icon: itemDefinitions.forceShard.icon, quantity: outcome.shardAmount }, { suppressLog: true });
      applyMimiDiceBoost(player, outcome.diceAmount);
      popupResult.capGains.push(...applyMimiRouletteMaxGain(player, outcome.amount));
      popupResult.gains.push(...applyMimiRouletteRestore(player, outcome.amount));
      break;
    case "statLoss":
      popupResult.losses.push(...applyAllStatLoss(player, outcome.amount, { queuePopup: false }));
      break;
    case "statLossDiceOne":
      popupResult.losses.push(...applyAllStatLoss(player, outcome.amount, { queuePopup: false }));
      player.statuses.mimiForceDiceOne = true;
      break;
    default:
      break;
  }
  return popupResult;
}

async function spinMimiRoulette(player, roulette) {
  if (isComputerPlayer(player)) {
    await spinMimiRouletteForComputer(player, roulette);
    return;
  }
  const cost = getMimiRouletteCost(player, roulette);
  if (!canSpinMimiRoulette(player, roulette)) return;
  spendMimiCoins(player, cost);
  player.turnFlags.usedSkill = true;
  player.turnFlags.mimiRouletteUsed = true;
  let stopRequested = false;
  const stopPromise = new Promise((resolve) => {
    showSimpleModal({
      title: roulette.name,
      body: `<div class="mimiRouletteSpinStage">${renderMimiRouletteWheel(roulette, "is-free-spinning")}<p>Press Stop when you are ready.</p></div>`,
      buttons: [{ label: "Stop", style: "primary", onClick: () => { stopRequested = true; resolve(); } }],
      afterRender: () => {}
    });
    if (isComputerPlayer(player)) {
      window.setTimeout(() => {
        if (!stopRequested) resolve();
      }, randomInt(900, 1700));
    }
  });
  await stopPromise;
  const outcome = pickMimiRouletteOutcome(roulette);
  const centerDegrees = getMimiRouletteOutcomeCenterDegrees(roulette, outcome);
  const stopDegrees = 1440 + (360 - centerDegrees);
  showSimpleModal({
    title: roulette.name,
    body: `<div class="mimiRouletteSpinStage">${renderMimiRouletteWheel(roulette)}<p>Stopping...</p></div>`,
    buttons: [],
    afterRender: (modal) => playMimiRouletteStopAnimation(modal, stopDegrees)
  });
  await wait(2000);
  const popupResult = applyMimiRouletteOutcome(player, outcome);
  ensureMimiModeAfterCoinChange(player);
  let resultClosed = false;
  const closeRouletteResult = () => {
    if (resultClosed) return;
    resultClosed = true;
    closeTopModal();
    queueMimiRoulettePopupResult(player, popupResult);
    renderAll();
  };
  showSimpleModal({
    title: "Roulette Result",
    body: `
      <div class="mimiRouletteResult">
        <div class="mimiRouletteResultIcon">${outcome.icon}</div>
        <strong>${sanitize(outcome.label)}</strong>
        <span>Remaining Coins: ${getMimiCoinCount(player)}</span>
      </div>
    `,
    buttons: [{ label: "OK", style: "primary", onClick: closeRouletteResult }]
  });
  showSkillActivationBanner(player, "Double or Nothing");
  log(`${player.name} spun ${roulette.name}: ${outcome.label}.`, true);
  renderAll();
  if (isComputerPlayer(player)) {
    await wait(980);
    closeRouletteResult();
  }
}

async function spinMimiRouletteForComputer(player, roulette) {
  const cost = getMimiRouletteCost(player, roulette);
  if (!canSpinMimiRoulette(player, roulette)) return;
  spendMimiCoins(player, cost);
  player.turnFlags.usedSkill = true;
  player.turnFlags.mimiRouletteUsed = true;
  renderAll();
  await wait(360);

  const outcome = pickMimiRouletteOutcome(roulette);
  const popupResult = applyMimiRouletteOutcome(player, outcome);
  ensureMimiModeAfterCoinChange(player);
  queueMimiRoulettePopupResult(player, popupResult);
  showMimiRouletteResultNotification(player, roulette, outcome);
  showSkillActivationBanner(player, "Double or Nothing");
  log(`${player.name} spun ${roulette.name}: ${outcome.label}.`, true);
  renderAll();
  await wait(260);
}

async function activateTrapper1Zone(player) {
  if (player.cooldowns.trapper1Zone > 0) return;
  if (!spendStatForSkill(player, "attack", 30)) {
    return;
  }

  const doEnhanced = player.currentStats.technique >= 15;
  const zone = {
    id: nextId("zone"),
    ownerIndex: state.currentPlayerIndex,
    center: { ...player.position },
    remainingTurns: 3,
    enhanced: false
  };

  const commit = (enhanced) => {
    zone.enhanced = enhanced;
    if (enhanced) {
      spendStatForSkill(player, "technique", 15);
    }
    removeExistingZoneByOwner(state.currentPlayerIndex);
    applyZoneToBoard(zone);
    player.cooldowns.trapper1Zone = 3;
    player.turnFlags.usedSkill = true;
    showSkillActivationBanner(player, "Bog Tantrum");
    log(`${player.name} placed a poison zone${enhanced ? " (enhanced)" : ""}.`, true);
    renderAll();
  };

  if (doEnhanced) {
    const enhanced = await chooseZoneEnhancementPrompt(player);
    commit(enhanced);
  } else {
    commit(false);
  }
}

function chooseZoneEnhancementPrompt(player) {
  return new Promise((resolve) => {
    const strategicValue = getTotoZoneStrategicValue(player, player.position);
    const shouldEnhanceForComputer = isComputerPlayer(player)
      ? (Number(player.currentStats?.technique) || 0) >= 15 && strategicValue >= 8.5
      : false;

    if (isComputerPlayer(player)) {
      resolve(shouldEnhanceForComputer);
      return;
    }

    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.zoneEnhancePrompt = {
        title: "Bog Tantrum Enhancement",
        message: `${player.name} can spend an extra 15 Technique to limit opponents inside the poison fog to one step for one turn.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "☣️",
        resolve,
        collapsed: false
      };
      state.ui.zoneEntryPrompt = null;
      state.ui.pitEnhancePrompt = null;
      state.ui.pitEntryPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }

    showSimpleModal({
      title: "Poison Zone Enhancement",
      body: "Spend an extra 15 Technique to add an effect that limits opponents to 1 step.",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

function getVeskaVenomStrategicValue(player) {
  return getVeskaVenomProfile(player, player?.position).value;
}

function chooseVeskaVenomEnhancementPrompt(player) {
  return new Promise((resolve) => {
    const canPay = (Number(player.currentStats?.technique) || 0) >= 15;
    if (!canPay) {
      resolve(false);
      return;
    }
    if (isComputerPlayer(player)) {
      const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
      const profile = getVeskaVenomProfile(player, player.position);
      resolve(profile.value >= 11 && hpRatio >= 0.5 && (profile.enemyOnVenom > 0 || profile.enemyNearVenom >= 3.4));
      return;
    }
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.zoneEnhancePrompt = {
        title: "Venom Varnish Enhancement",
        message: `${player.name} can spend an extra 15 Technique to restore 2 to each current stat every time Venom Varnish reduces an opponent's stats.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "V",
        resolve,
        collapsed: false
      };
      state.ui.zoneEntryPrompt = null;
      state.ui.pitEnhancePrompt = null;
      state.ui.pitEntryPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }
    showSimpleModal({
      title: "Venom Varnish Enhancement",
      body: "Spend an extra 15 Technique to restore 2 to each current stat every time Venom Varnish reduces an opponent's stats.",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

async function activateVeskaVenomVarnish(player) {
  const ownerIndex = state.players.indexOf(player);
  if ((Number(player.cooldowns?.trapper3VenomVarnish) || 0) > 0) return;
  if (getActiveVeskaVarnishForOwner(ownerIndex)) return;
  if (!spendStatForSkill(player, "attack", 8)) return;
  if (!spendStatForSkill(player, "hp", 8)) {
    restoreStat(player, "attack", 8);
    return;
  }
  if (!spendStatForSkill(player, "technique", 8)) {
    restoreStat(player, "attack", 8);
    restoreStat(player, "hp", 8);
    return;
  }
  const enhanced = await chooseVeskaVenomEnhancementPrompt(player);
  if (enhanced) spendStatForSkill(player, "technique", 15);
  state.venomVarnishes = (state.venomVarnishes || []).filter((effect) => effect.ownerIndex !== ownerIndex);
  state.venomVarnishes.push({
    id: nextId("venom"),
    ownerIndex,
    remainingTurns: 2,
    enhanced
  });
  triggerVeskaThreadEffects(ownerIndex);
  player.cooldowns.trapper3VenomVarnish = 4;
  player.turnFlags.usedSkill = true;
  showSkillActivationBanner(player, "Venom Varnish");
  log(`${player.name} coated allied paint with Venom Varnish${enhanced ? " (enhanced)" : ""}.`, true);
  renderAll();
}

function isPointInsideZone(point, zone) {
  if (!point || !zone?.center) return false;
  return Math.abs(point.row - zone.center.row) <= 1 && Math.abs(point.col - zone.center.col) <= 1;
}

function getThreateningEnhancedZonesAtPoint(player, point) {
  if (!player || !point) return [];
  const cell = getCell(point.row, point.col);
  if (!cell) return [];
  const playerIndex = state.players.indexOf(player);
  return cell.zones.filter((zone) => (
    zone.ownerIndex !== playerIndex
    && zone.enhanced
    && !player.statuses.slowZoneImmunity.has(zone.id)
  ));
}

function refreshZoneEntryPromptState(player) {
  if (!player?.statuses?.zoneEntryPrompted) return;
  const currentZoneIds = new Set(getThreateningEnhancedZonesAtPoint(player, player.position).map((zone) => zone.id));
  Array.from(player.statuses.zoneEntryPrompted).forEach((zoneId) => {
    if (!currentZoneIds.has(zoneId)) {
      player.statuses.zoneEntryPrompted.delete(zoneId);
    }
  });
}

async function maybePromptZoneEntryDisarm(player, zone) {
  return false;
}

function chooseZoneEntryDisarmPrompt(player, zone) {
  return new Promise((resolve) => {
    if (isComputerPlayer(player)) {
      const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
      if (gameScreenActive && ui.obstacleActionPanel) {
        state.ui.zoneEntryPrompt = {
          zoneId: zone.id,
          title: "Bog Tantrum Counter",
          message: `${player.name} can pay 15 Technique to permanently disable this poison fog's move restriction for themselves.`,
          yesLabel: "Pay",
          noLabel: "Do Not Pay",
          collapsedIcon: "☣️",
          resolve,
          collapsed: false
        };
        renderAll();
        window.setTimeout(() => {
          if (state.ui.zoneEntryPrompt?.zoneId === zone.id) {
            state.ui.zoneEntryPrompt = null;
            renderAll();
            resolve(false);
          }
        }, 760);
        return;
      }
      window.setTimeout(() => resolve(false), 420);
      return;
    }
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.zoneEntryPrompt = {
        zoneId: zone.id,
        title: "Bog Tantrum Counter",
        message: `${player.name} can pay 15 Technique to permanently disable this poison fog's move restriction for themselves.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "☣️",
        resolve,
        collapsed: false
      };
      state.ui.zoneEnhancePrompt = null;
      state.ui.pitEnhancePrompt = null;
      state.ui.pitEntryPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }
    showSimpleModal({
      title: "Bog Tantrum Counter",
      body: "Pay 15 Technique to permanently disable this poison fog's move restriction for yourself.",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

function removeExistingZoneByOwner(ownerIndex) {
  getPlayableBoardCells().forEach((cell) => {
    cell.zones = cell.zones.filter((zone) => zone.ownerIndex !== ownerIndex);
  });
}

function applyZoneToBoard(zone) {
  for (let row = zone.center.row - 1; row <= zone.center.row + 1; row += 1) {
    for (let col = zone.center.col - 1; col <= zone.center.col + 1; col += 1) {
      const cell = getCell(row, col);
      if (cell) cell.zones.push(zone);
    }
  }
}

function getOwnedZones(ownerIndex) {
  const seen = new Set();
  const zones = [];
  getPlayableBoardCells().forEach((cell) => {
    cell.zones.forEach((zone) => {
      if (zone.ownerIndex !== ownerIndex || seen.has(zone.id)) return;
      seen.add(zone.id);
      zones.push(zone);
    });
  });
  return zones;
}

function getSkavaCacheTypeForStat(statKey) {
  return statKey === "attack" ? "heal-atk" : statKey === "hp" ? "heal-hp" : "heal-tech";
}

function getSkavaCacheLabel(statKey) {
  return statKey === "attack" ? "Attack" : statKey === "hp" ? "HP" : "Technique";
}

function getOwnedSkavaCacheCells(ownerIndex) {
  return getPlayableBoardCells().filter((cell) => cell.skavaCache?.ownerIndex === ownerIndex);
}

function clearSkavaFieldCaches(ownerIndex) {
  getOwnedSkavaCacheCells(ownerIndex).forEach((cell) => {
    const specialType = cell.skavaCache?.specialType;
    if (specialType) {
      cell.special = cell.special.filter((entry) => entry !== specialType);
    }
    cell.skavaCache = null;
  });
}

function isSkavaNormalTile(cell) {
  return !!cell
    && !!cell.playable
    && cell.startOwner === null
    && Array.isArray(cell.special)
    && cell.special.length === 0
    && !cell.groundItem;
}

function isValidSkavaFieldCacheCell(cell) {
  return isSkavaNormalTile(cell) && !cell.obstacle;
}

function isValidSkavaBoulderCell(cell) {
  return isSkavaNormalTile(cell)
    && !cell.obstacle
    && getCellPlayersInRange(cell.row, cell.col, 0).length === 0;
}

function applySkavaFieldCache(player, cell, statKey) {
  const ownerIndex = state.players.indexOf(player);
  if (ownerIndex < 0 || !cell) return false;
  clearSkavaFieldCaches(ownerIndex);
  const specialType = getSkavaCacheTypeForStat(statKey);
  if (!cell.special.includes(specialType)) cell.special.push(specialType);
  cell.skavaCache = {
    ownerIndex,
    statKey,
    specialType
  };
  return true;
}

function getRecoveryTileAmountForPlayer(cell, playerIndex) {
  const baseAmount = HEAL_AMOUNT;
  const cacheOwnerIndex = cell?.skavaCache?.ownerIndex;
  if (Number.isInteger(cacheOwnerIndex) && !isFriendlyOwner(cacheOwnerIndex, playerIndex)) {
    return Math.ceil(baseAmount / 2);
  }
  return baseAmount;
}

function getAllSkavaBoulderCells() {
  return getPlayableBoardCells().filter((cell) => isSkavaBoulderObstacle(cell.obstacle));
}

function reduceSkavaBoulderProtectionForOwner(ownerIndex) {
  getAllSkavaBoulderCells().forEach((cell) => {
    const obstacle = cell.obstacle;
    if (!isSkavaBoulderObstacle(obstacle) || obstacle.skavaOwnerIndex !== ownerIndex) return;
    obstacle.skavaProtectedOwnerEndsRemaining = Math.max(0, (Number(obstacle.skavaProtectedOwnerEndsRemaining) || 0) - 1);
  });
}

function applyObstacleDamageState(cell, obstacle, amount, options = {}) {
  const safeAmount = Math.max(0, Number(amount) || 0);
  if (!cell || !obstacle || safeAmount <= 0) return { destroyed: false, actualDamage: 0 };
  const before = Math.max(0, Number(obstacle.hp) || 0);
  if (before <= 0) return { destroyed: true, actualDamage: 0 };
  const protectedObstacle = isSkavaBoulderProtected(obstacle) && options.ignoreProtection !== true;
  const nextHp = protectedObstacle ? Math.max(1, before - safeAmount) : Math.max(0, before - safeAmount);
  obstacle.hp = nextHp;
  return {
    destroyed: nextHp <= 0,
    actualDamage: Math.max(0, before - nextHp)
  };
}

function applyOwnedZoneObstacleDamage(ownerPlayer) {
  const ownerIndex = state.players.indexOf(ownerPlayer);
  if (ownerIndex < 0) return;
  const zones = getOwnedZones(ownerIndex);
  zones.forEach((zone) => {
    for (let row = zone.center.row - 1; row <= zone.center.row + 1; row += 1) {
      for (let col = zone.center.col - 1; col <= zone.center.col + 1; col += 1) {
        const cell = getCell(row, col);
        if (!cell || !cell.obstacle) continue;
        const obstacle = cell.obstacle;
        const { actualDamage, destroyed } = applyObstacleDamageState(cell, obstacle, 15);
        if (actualDamage > 0) {
          queueBoardDamageText(cell.row, cell.col, actualDamage, "obstacle");
        }
        log(`${ownerPlayer.name}'s poison zone dealt 15 damage to ${obstacle.name}.`, true);
        if (destroyed) {
          const dropItemId = obstacle.dropItemId;
          cell.obstacle = null;
          if (dropItemId) { void distributeObstacleDrop(dropItemId, ownerPlayer, cell); }
        }
      }
    }
  });
}

function choosePitEnhancementPrompt(player) {
  return new Promise((resolve) => {
    if (isComputerPlayer(player)) {
      const strategicValue = getKazanPitStrategicValue(player, player.position);
      const techniqueCurrent = Number(player.currentStats?.technique) || 0;
      const hpRatio = (Number(player.currentStats?.hp) || 0) / Math.max(1, getCurrentMax(player, 'hp'));
      const shouldEnhance = techniqueCurrent >= 15 && (strategicValue >= 7.4 || (strategicValue >= 5.8 && hpRatio >= 0.4));
      window.setTimeout(() => resolve(shouldEnhance), 120);
      return;
    }
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.pitEnhancePrompt = {
        title: "Loose Ground Enhancement",
        message: `${player.name} can spend an extra 15 Technique to make this pitfall trigger on players who only pass through it.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: "🕳️",
        resolve,
        collapsed: false
      };
      state.ui.pitEntryPrompt = null;
      state.ui.zoneEnhancePrompt = null;
      state.ui.zoneEntryPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }

    showSimpleModal({
      title: "Loose Ground Enhancement",
      body: "Spend an extra 15 Technique to make the pitfall trigger on players who pass through it.",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

function choosePitEntryDisarmPrompt(player, pit) {
  return new Promise((resolve) => {
    if (isComputerPlayer(player)) {
      const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
      if (gameScreenActive && ui.obstacleActionPanel) {
        state.ui.pitEntryPrompt = {
          pitId: pit.id,
          title: "Loose Ground Counter",
          message: `${player.name} can pay 15 Technique to ignore this pitfall permanently.`,
          yesLabel: "Pay",
          noLabel: "Do Not Pay",
          collapsedIcon: "🕳️",
          resolve,
          collapsed: false
        };
        renderAll();
        window.setTimeout(() => {
          if (state.ui.pitEntryPrompt?.pitId === pit.id) {
            state.ui.pitEntryPrompt = null;
            renderAll();
            resolve(false);
          }
        }, 760);
        return;
      }
      window.setTimeout(() => resolve(false), 420);
      return;
    }
    const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
    if (gameScreenActive && ui.obstacleActionPanel) {
      state.ui.pitEntryPrompt = {
        pitId: pit.id,
        title: "Loose Ground Counter",
        message: `${player.name} can pay 15 Technique to permanently disable this pitfall for themselves.`,
        yesLabel: "Pay",
        noLabel: "Do Not Pay",
        collapsedIcon: pit.passThrough ? "🌀" : "🕳️",
        resolve,
        collapsed: false
      };
      state.ui.pitEnhancePrompt = null;
      state.ui.zoneEnhancePrompt = null;
      state.ui.zoneEntryPrompt = null;
      state.ui.obstaclePrompt = null;
      renderAll();
      return;
    }

    showSimpleModal({
      title: "Loose Ground Counter",
      body: "Pay 15 Technique to permanently disable this pitfall for yourself.",
      buttons: [
        { label: "Do Not Pay", style: "ghost", onClick: () => { closeTopModal(); resolve(false); } },
        { label: "Pay", style: "primary", onClick: () => { closeTopModal(); resolve(true); } }
      ]
    });
  });
}

async function maybePromptPitDisarm(player, pit) {
  if (!player || !pit || player.statuses.pitImmunity.has(pit.id)) return false;
  if ((Number(player.currentStats.technique) || 0) < 15) {
    renderAll();
    return false;
  }
  const disarm = await choosePitEntryDisarmPrompt(player, pit);
  if (disarm && spendStatForSkill(player, "technique", 15)) {
    player.statuses.pitImmunity.add(pit.id);
    log(`${player.name} detected the pitfall and disabled it.`, true);
    renderAll();
    return true;
  }
  renderAll();
  return false;
}

function activateTrapper2Pit(player) {
  if (!spendStatForSkill(player, "attack", 15)) {
    return;
  }

  const pit = {
    id: nextId("pit"),
    ownerIndex: state.currentPlayerIndex,
    row: player.position.row,
    col: player.position.col,
    remainingTurns: 3,
    passThrough: false
  };

  const cell = getCell(pit.row, pit.col);
  const ownerPits = getPlayableBoardCells().flatMap((c) => c.pits.filter((p) => p.ownerIndex === state.currentPlayerIndex));
  if (ownerPits.length >= 3) {
    const oldest = ownerPits[0];
    const oldCell = getCell(oldest.row, oldest.col);
    oldCell.pits = oldCell.pits.filter((p) => p.id !== oldest.id);
  }

  const commit = (passThrough) => {
    pit.passThrough = passThrough;
    if (passThrough) {
      spendStatForSkill(player, "technique", 30);
    }
    cell.pits.push(pit);
    player.turnFlags.usedSkill = true;
    showSkillActivationBanner(player, "Loose Ground");
    log(`${player.name} placed a pitfall${passThrough ? " (pass-through)" : ""}.`, true);
    renderAll();
  };

  if (player.currentStats.technique >= 15) {
    choosePitEnhancementPrompt(player).then((enhance) => {
      commit(!!enhance);
    });
  } else {
    commit(false);
  }
}

function isAffectedBySlowZone(player) {
  if (!player || !player.position) return false;
  const cell = getCell(player.position.row, player.position.col);
  if (!cell) return false;
  const playerIndex = state.players.indexOf(player);
  return cell.zones.some((zone) => !isFriendlyOwner(zone.ownerIndex, playerIndex) && zone.enhanced && !player.statuses.slowZoneImmunity.has(zone.id));
}

function getPoisonFogExposureStore(target) {
  if (!target) return null;
  const holder = target.statuses || target;
  if (!holder.poisonZoneTurns || typeof holder.poisonZoneTurns !== "object" || Array.isArray(holder.poisonZoneTurns)) {
    holder.poisonZoneTurns = {};
  }
  return holder.poisonZoneTurns;
}

function clearPoisonFogExposure(target) {
  const store = getPoisonFogExposureStore(target);
  if (!store) return;
  Object.keys(store).forEach((key) => delete store[key]);
}

function getPoisonFogDamageForExposure(target, zone) {
  const store = getPoisonFogExposureStore(target);
  if (!store || !zone?.id) return 15;
  const previousTurns = Math.max(0, Number(store[zone.id]) || 0);
  const currentTurns = previousTurns + 1;
  Object.keys(store).forEach((key) => {
    if (key !== zone.id) delete store[key];
  });
  store[zone.id] = currentTurns;
  return 15 + Math.max(0, currentTurns - 1) * 5;
}

async function processZoneEndTurnDamage(player, mode) {
  const cell = getCell(player.position.row, player.position.col);
  if (!cell) {
    if (mode !== "turnEnd") clearPoisonFogExposure(player);
    return;
  }
  const playerIndex = state.players.indexOf(player);
  const threateningZone = cell.zones.find((zone) => !isFriendlyOwner(zone.ownerIndex, playerIndex));
  if (mode !== "turnEnd") {
    if (!threateningZone) clearPoisonFogExposure(player);
    return;
  }
  if (threateningZone) {
    const damage = getPoisonFogDamageForExposure(player, threateningZone);
    applyFieldDamage(player, damage, `${player.name} took ${damage} damage from the poison zone.`, threateningZone.ownerIndex);
  } else {
    clearPoisonFogExposure(player);
  }
  if (isPlayerReturningToStart(player)) return;
  getThreateningVeskaVarnishes(player, cell).forEach((effect) => {
    applyVeskaVenomLoss(player, effect, 3, "ending the turn on allied paint");
  });
  if (isPlayerReturningToStart(player)) renderAll();
}

async function checkPassThroughPits(player, path) {
  for (const [index, point] of path.slice(1).entries()) {
    const cell = getCell(point.row, point.col);
    const isFinal = index === path.slice(1).length - 1;
    const playerIndex = state.players.indexOf(player);
    const pit = cell.pits.find((candidate) => !isFriendlyOwner(candidate.ownerIndex, playerIndex) && (candidate.passThrough || isFinal));
    if (!pit) continue;
    if (player.statuses.pitImmunity.has(pit.id)) continue;

    const disarmed = await maybePromptPitDisarm(player, pit);
    if (disarmed) {
      continue;
    }

    triggerPit(player, cell, pit);
    if (player.position.row === player.startPosition.row && player.position.col === player.startPosition.col) {
      break;
    }
  }
}

function triggerPit(player, cell, pit) {
  applyFieldDamage(player, 30, `${player.name} took 30 damage from a pitfall.`, pit.ownerIndex);
  if (cell.startOwner === null && canPlayerRepaintCell(pit.ownerIndex, cell)) {
    cell.owner = pit.ownerIndex;
    maybeFinishControlAreaWin();
  }
  cell.pits = cell.pits.filter((candidate) => candidate.id !== pit.id);
  evaluateLastRoundState({ announce: true });
  renderAll();
}

function cleanupExpiredEffects() {
  const seenPits = new Set();
  const seenZones = new Set();
  state.venomVarnishes = (state.venomVarnishes || []).filter((effect) => {
    effect.remainingTurns -= 1;
    return effect.remainingTurns > 0;
  });

  getPlayableBoardCells().forEach((cell) => {
    cell.pits = cell.pits.filter((pit) => {
      if (!seenPits.has(pit.id)) {
        pit.remainingTurns -= 1;
        seenPits.add(pit.id);
      }
      return pit.remainingTurns > 0;
    });

    cell.zones = cell.zones.filter((zone) => {
      if (!seenZones.has(zone.id)) {
        zone.remainingTurns -= 1;
        seenZones.add(zone.id);
      }
      return zone.remainingTurns > 0;
    });

    const obstacle = cell.obstacle;
    if (isSkavaBoulderObstacle(obstacle)) {
      const { destroyed } = applyObstacleDamageState(cell, obstacle, Number(obstacle.skavaDecayAmount) || 5);
      if (destroyed) {
        cell.obstacle = null;
      }
    }
  });
}

function renderControls() {
  const player = getCurrentPlayer();
  const buttons = [];
  if (state.roundTransitionActive) {
    ui.actionButtons.innerHTML = "";
    if (ui.rollDiceButton) ui.rollDiceButton.disabled = true;
    if (ui.restButton) ui.restButton.disabled = true;
    return;
  }
  if (!player || state.setupSelection.active) {
    if (state.setupSelection.active) {
      const setupPlayer = state.players[state.setupSelection.currentPlayerIndex];
      const isComputerSetup = setupPlayer && isComputerPlayer(setupPlayer);
      const showComputerPrompt = isComputerSetup && state.setupSelection.computerChoiceMode === "prompt";
      const promptText = showComputerPrompt
        ? `${sanitize(setupPlayer.name)} is CPU. Choose who sets this starting tile.`
        : `Choose a starting tile from the white tiles.${isComputerSetup ? ` Setting ${sanitize(setupPlayer.name)}'s CPU start.` : ""}`;
      ui.actionButtons.innerHTML = `
        <div class="setupHintText ${showComputerPrompt ? "setupCpuStartPrompt" : ""}">
          <div class="setupHintMain">${promptText}</div>
          ${showComputerPrompt ? `
            <div class="setupCpuStartActions">
              <button type="button" class="ghostButton setupCpuStartButton" data-cpu-start-action="manual">Choose for CPU</button>
              <button type="button" class="secondaryButton setupCpuStartButton" data-cpu-start-action="single">Let CPU choose</button>
              <button type="button" class="primaryButton setupCpuStartButton" data-cpu-start-action="all">Auto-place all CPUs</button>
            </div>
          ` : ""}
        </div>
      `;
      ui.actionButtons.querySelectorAll("[data-cpu-start-action]").forEach((button) => {
        button.addEventListener("click", () => {
          const action = button.dataset.cpuStartAction;
          if (action === "manual") chooseCurrentComputerStartManually();
          else if (action === "single") chooseCurrentComputerStartingCorner(false);
          else if (action === "all") chooseCurrentComputerStartingCorner(true);
        });
      });
    } else {
      ui.actionButtons.innerHTML = "";
    }
    if (ui.rollDiceButton) ui.rollDiceButton.disabled = true;
    if (ui.restButton) ui.restButton.disabled = true;
    return;
  }

  const interactionLocked = isInteractionPromptBlocking() || !canLocalInteractWithRoomTurn();
  const computerTurn = isComputerPlayer(player);
  if (ui.rollDiceButton) {
    ui.rollDiceButton.disabled = !!state.moveDie || state.gameOver || interactionLocked || computerTurn;
  }
  if (ui.restButton) {
    ui.restButton.disabled = !!state.moveDie || state.gameOver || !maybeShowRestButton() || interactionLocked || computerTurn;
  }

  if (!state.gameOver) {
    if (state.currentAction === "move") {
      buttons.push({ label: "✔", action: confirmMovePhase, disabled: !canConfirmMovePhase() || state.movementAnimating || interactionLocked || computerTurn, className: "primaryButton compactActionConfirm" });
      buttons.push({ label: "↩️", action: resetTurnSelection, disabled: state.selectedPath.length < 2 || state.movementAnimating || interactionLocked || computerTurn, className: "ghostButton compactActionReset" });
    } else if (state.currentAction === "paint") {
      buttons.push({ label: "✔", action: confirmPaintPhase, disabled: interactionLocked || computerTurn, className: "primaryButton compactActionConfirm" });
      buttons.push({ label: "↩️", action: cancelPaintSelection, disabled: state.selectedPaintTargets.length === 0 || interactionLocked || computerTurn, className: "ghostButton compactActionReset" });
    } else if (state.currentAction === "camera") {
      buttons.push({ label: "Back to Input", action: toggleCameraInputMode, disabled: false, className: "primaryButton compactActionBack" });
    }
  }

  ui.actionButtons.innerHTML = buttons.map((button, index) => `
    <button data-action-index="${index}" class="${button.className}" ${button.disabled ? "disabled" : ""}>${sanitize(button.label)}</button>
  `).join("");

  Array.from(ui.actionButtons.querySelectorAll("[data-action-index]")).forEach((button) => {
    const data = buttons[Number(button.dataset.actionIndex)];
    if (data) button.addEventListener("click", data.action);
  });
}

function renderExpandablePanels() {
  if (state.setupSelection.active) {
    state.ui.swapBubbleOpen = false;
    state.ui.skillPanelOpen = false;
    state.ui.diceBubbleOpen = false;
    state.ui.restBubbleOpen = false;
    state.ui.rightPanelMode = null;
    state.ui.playerTargetPrompt = null;
  }
  renderZoomDock();
  renderItemTray();
  renderSwapBubble();
  renderSkillPanel();
  renderDiceBubble();
  renderRestBubble();
  renderRightOverlayPanel();
}

function renderInlinePromptPanel() {
  if (!ui.inlinePromptPanel) return;
  const prompt = state.ui.inlinePrompt;
  const skavaPrompt = state.ui.skavaTargetPrompt;
  const gameScreenActive = !!ui.gameScreen && ui.gameScreen.classList.contains("active");
  if ((!prompt && !skavaPrompt) || !gameScreenActive) {
    ui.inlinePromptPanel.classList.add("hidden");
    ui.inlinePromptPanel.innerHTML = "";
    return;
  }

  if (skavaPrompt) {
    ui.inlinePromptPanel.innerHTML = `
      <div class="inlinePromptCard">
        <div class="inlinePromptTitle">${sanitize(skavaPrompt.title || "Select a Tile")}</div>
        <div class="inlinePromptBody">${sanitize(skavaPrompt.playerName || "")} — ${sanitize(skavaPrompt.message || "Click a highlighted tile.")}</div>
        <div class="inlinePromptChoices">
          <button type="button" class="ghostButton" data-skava-target-cancel>Cancel</button>
        </div>
      </div>
    `;
    ui.inlinePromptPanel.classList.remove("hidden");
    const cancelButton = ui.inlinePromptPanel.querySelector("[data-skava-target-cancel]");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        const currentPrompt = state.ui.skavaTargetPrompt;
        if (!currentPrompt) return;
        state.ui.skavaTargetPrompt = null;
        refreshTileHighlights();
        renderInlinePromptPanel();
        if (typeof currentPrompt.resolve === "function") currentPrompt.resolve(null);
      });
    }
    return;
  }

  const playerName = sanitize(prompt.playerName || "");
  const title = sanitize(prompt.title || "Select");
  const message = sanitize(prompt.message || "");
  const allowedStats = Array.isArray(prompt.allowedStats) && prompt.allowedStats.length
    ? new Set(prompt.allowedStats)
    : new Set(["attack", "hp", "technique"]);
  ui.inlinePromptPanel.innerHTML = `
    <div class="inlinePromptCard">
      <div class="inlinePromptTitle">${title}</div>
      <div class="inlinePromptBody">${playerName} — ${message}</div>
      <div class="inlinePromptChoices">
        <button type="button" class="inlinePromptChoiceButton" data-inline-stat="attack"><span class="inlinePromptChoiceIcon" aria-hidden="true">⚔️</span><span>Attack</span></button>
        <button type="button" class="inlinePromptChoiceButton" data-inline-stat="hp"><span class="inlinePromptChoiceIcon" aria-hidden="true">❤️</span><span>HP</span></button>
        <button type="button" class="inlinePromptChoiceButton" data-inline-stat="technique"><span class="inlinePromptChoiceIcon" aria-hidden="true">🧠</span><span>Technique</span></button>
      </div>
    </div>
  `;
  ui.inlinePromptPanel.classList.remove("hidden");
  Array.from(ui.inlinePromptPanel.querySelectorAll("[data-inline-stat]")).forEach((button) => {
    const statKey = button.dataset.inlineStat;
    if (!allowedStats.has(statKey)) button.disabled = true;
  });

  Array.from(ui.inlinePromptPanel.querySelectorAll("[data-inline-stat]")).forEach((button) => {
    button.addEventListener("click", () => {
      const statKey = button.dataset.inlineStat;
      const currentPrompt = state.ui.inlinePrompt;
      if (!currentPrompt || typeof currentPrompt.callback !== "function") return;
      currentPrompt.callback(statKey);
      state.ui.inlinePrompt = null;
      renderInlinePromptPanel();
      if (typeof currentPrompt.resolve === "function") currentPrompt.resolve();
    });
  });
}

function resolveHobbsTargetSelection(targetId = null) {
  const prompt = state.ui.hobbsTargetPrompt;
  if (!prompt) return false;
  state.ui.hobbsTargetPrompt = null;
  renderAll();
  const target = targetId ? state.players.find((player) => player?.id === targetId) || null : null;
  if (typeof prompt.resolve === "function") prompt.resolve(target);
  return true;
}

function renderObstacleActionPanel() {
  if (!ui.obstacleActionPanel) return;
  const prompt = state.ui.obstaclePrompt;
  const hobbsPrompt = state.ui.hobbsTargetPrompt;
  const specialPrompt = state.ui.zoneEnhancePrompt || state.ui.zoneEntryPrompt || state.ui.pitEnhancePrompt || state.ui.pitEntryPrompt || state.ui.pipEnhancePrompt;
  if ((!prompt && !specialPrompt && !hobbsPrompt) || state.setupSelection.active) {
    ui.obstacleActionPanel.classList.add('hidden');
    ui.obstacleActionPanel.classList.remove('is-collapsed');
    ui.obstacleActionPanel.style.width = '';
    ui.obstacleActionPanel.style.height = '';
    ui.obstacleActionPanel.innerHTML = '';
    return;
  }

  if (hobbsPrompt) {
    ui.obstacleActionPanel.classList.remove('hidden', 'is-collapsed');
    ui.obstacleActionPanel.style.width = '';
    ui.obstacleActionPanel.style.height = '';
    ui.obstacleActionPanel.innerHTML = `
      <div class="obstaclePanelScaled zoneEnhancePanel">
        <div class="obstaclePanelTopRow">
          <h3>${sanitize(hobbsPrompt.title || "Choose Player")}</h3>
          <button type="button" class="ghostButton compactObstacleMapButton" data-hobbs-target-cancel>Cancel</button>
        </div>
        <div class="zoneEnhanceLayout">
          <div class="zoneEnhanceText">${sanitize(hobbsPrompt.message || "Choose a player.")}</div>
          <div class="zoneEnhanceText">Click one of the pulsing player icons on the field.</div>
        </div>
      </div>
    `;
    const cancelButton = ui.obstacleActionPanel.querySelector('[data-hobbs-target-cancel]');
    if (cancelButton) {
      cancelButton.addEventListener('click', () => resolveHobbsTargetSelection(null));
    }
    return;
  }

  if (specialPrompt) {
    if (specialPrompt.collapsed) {
      ui.obstacleActionPanel.classList.remove('hidden');
      ui.obstacleActionPanel.classList.add('is-collapsed');
      ui.obstacleActionPanel.style.width = 'auto';
      ui.obstacleActionPanel.style.height = 'auto';
      ui.obstacleActionPanel.innerHTML = `
        <button type="button" class="compactIconButton obstacleExpandButton zoneExpandButton" data-zone-expand aria-label="Expand Effect UI">${sanitize(specialPrompt.collapsedIcon || '☣️')}</button>
      `;
      const expandButton = ui.obstacleActionPanel.querySelector('[data-zone-expand]');
      if (expandButton) {
        expandButton.addEventListener('click', () => {
          const currentPrompt = state.ui.zoneEnhancePrompt || state.ui.zoneEntryPrompt || state.ui.pitEnhancePrompt || state.ui.pitEntryPrompt || state.ui.pipEnhancePrompt;
          if (!currentPrompt) return;
          if (state.ui.zoneEnhancePrompt && currentPrompt === state.ui.zoneEnhancePrompt) {
            state.ui.zoneEnhancePrompt = { ...currentPrompt, collapsed: false };
          } else if (state.ui.zoneEntryPrompt && currentPrompt === state.ui.zoneEntryPrompt) {
            state.ui.zoneEntryPrompt = { ...currentPrompt, collapsed: false };
          } else if (state.ui.pitEnhancePrompt && currentPrompt === state.ui.pitEnhancePrompt) {
            state.ui.pitEnhancePrompt = { ...currentPrompt, collapsed: false };
          } else if (state.ui.pitEntryPrompt && currentPrompt === state.ui.pitEntryPrompt) {
            state.ui.pitEntryPrompt = { ...currentPrompt, collapsed: false };
          } else if (state.ui.pipEnhancePrompt && currentPrompt === state.ui.pipEnhancePrompt) {
            state.ui.pipEnhancePrompt = { ...currentPrompt, collapsed: false };
          }
          renderAll();
        });
      }
      return;
    }

    ui.obstacleActionPanel.classList.remove('hidden', 'is-collapsed');
    ui.obstacleActionPanel.style.width = '';
    ui.obstacleActionPanel.style.height = '';
    ui.obstacleActionPanel.innerHTML = `
      <div class="obstaclePanelScaled zoneEnhancePanel">
        <div class="obstaclePanelTopRow">
          <h3>${sanitize(specialPrompt.title || 'Bog Tantrum Enhancement')}</h3>
          <button type="button" class="ghostButton compactObstacleMapButton" data-zone-collapse>View Map</button>
        </div>
        <div class="zoneEnhanceLayout">
          <div class="zoneEnhanceText">${sanitize(specialPrompt.message || '')}</div>
          <div class="zoneEnhanceButtons">
            <button type="button" class="secondaryButton compactObstacleButton" data-zone-choice="yes">${sanitize(specialPrompt.yesLabel || 'Pay')}</button>
            <button type="button" class="ghostButton compactObstacleButton" data-zone-choice="no">${sanitize(specialPrompt.noLabel || 'Do Not Pay')}</button>
          </div>
        </div>
      </div>
    `;

    const collapseButton = ui.obstacleActionPanel.querySelector('[data-zone-collapse]');
    if (collapseButton) {
      collapseButton.addEventListener('click', () => {
        const currentPrompt = state.ui.zoneEnhancePrompt || state.ui.zoneEntryPrompt || state.ui.pitEnhancePrompt || state.ui.pitEntryPrompt || state.ui.pipEnhancePrompt;
        if (!currentPrompt) return;
        if (state.ui.zoneEnhancePrompt && currentPrompt === state.ui.zoneEnhancePrompt) {
          state.ui.zoneEnhancePrompt = { ...currentPrompt, collapsed: true };
        } else if (state.ui.zoneEntryPrompt && currentPrompt === state.ui.zoneEntryPrompt) {
          state.ui.zoneEntryPrompt = { ...currentPrompt, collapsed: true };
        } else if (state.ui.pitEnhancePrompt && currentPrompt === state.ui.pitEnhancePrompt) {
          state.ui.pitEnhancePrompt = { ...currentPrompt, collapsed: true };
        } else if (state.ui.pitEntryPrompt && currentPrompt === state.ui.pitEntryPrompt) {
          state.ui.pitEntryPrompt = { ...currentPrompt, collapsed: true };
        } else if (state.ui.pipEnhancePrompt && currentPrompt === state.ui.pipEnhancePrompt) {
          state.ui.pipEnhancePrompt = { ...currentPrompt, collapsed: true };
        }
        renderAll();
      });
    }
    Array.from(ui.obstacleActionPanel.querySelectorAll('[data-zone-choice]')).forEach((button) => {
      button.addEventListener('click', () => {
        const currentPrompt = state.ui.zoneEnhancePrompt || state.ui.zoneEntryPrompt || state.ui.pitEnhancePrompt || state.ui.pitEntryPrompt || state.ui.pipEnhancePrompt;
        if (!currentPrompt) return;
        const willPay = button.dataset.zoneChoice === 'yes';
        state.ui.zoneEnhancePrompt = null;
        state.ui.zoneEntryPrompt = null;
        state.ui.pitEnhancePrompt = null;
        state.ui.pitEntryPrompt = null;
        state.ui.pipEnhancePrompt = null;
        state.ui.rascaSnapbackPrompt = null;
        renderAll();
        if (typeof currentPrompt.resolve === 'function') currentPrompt.resolve(willPay);
      });
    });
    return;
  }

  const player = state.players.find((entry) => entry.id === prompt.playerId) || getCurrentPlayer();
  const cell = getCell(prompt.row, prompt.col);
  const obstacle = cell?.obstacle;
  if (!player || !obstacle) {
    state.ui.obstaclePrompt = null;
    ui.obstacleActionPanel.classList.add('hidden');
    ui.obstacleActionPanel.classList.remove('is-collapsed');
    ui.obstacleActionPanel.style.width = '';
    ui.obstacleActionPanel.style.height = '';
    ui.obstacleActionPanel.innerHTML = '';
    return;
  }

  const values = prompt.values || { attack: 0, hp: 0, technique: 0 };
  const total = Object.values(values).reduce((sum, value) => sum + value, 0);
  const remaining = Math.max(0, obstacle.hp - total);

  if (prompt.collapsed) {
    ui.obstacleActionPanel.classList.remove('hidden');
    ui.obstacleActionPanel.classList.add('is-collapsed');
    ui.obstacleActionPanel.style.width = 'auto';
    ui.obstacleActionPanel.style.height = 'auto';
    ui.obstacleActionPanel.innerHTML = `
      <button type="button" class="compactIconButton obstacleExpandButton" data-obstacle-expand aria-label="Expand Obstacle UI">💥</button>
    `;
    const expandButton = ui.obstacleActionPanel.querySelector('[data-obstacle-expand]');
    if (expandButton) {
      expandButton.addEventListener('click', () => {
        const currentPrompt = state.ui.obstaclePrompt;
        if (!currentPrompt) return;
        state.ui.obstaclePrompt = { ...currentPrompt, collapsed: false };
        renderObstacleActionPanel();
        refreshTileHighlights();
      });
    }
    return;
  }

  const statOrder = ['attack', 'hp', 'technique'];
  const countersHtml = statOrder.map((statKey) => {
    const otherTotal = total - (values[statKey] || 0);
    const allowed = obstacle.allowedStat === statKey;
    const maxAssignable = allowed ? Math.max(0, Math.min(player.currentStats[statKey], obstacle.hp - otherTotal)) : 0;
    const currentValue = values[statKey] || 0;
    const icon = getStatIcon(statKey);
    return `
      <div class="obstacleCounterCard ${allowed ? '' : 'is-disabled'}" data-obstacle-stat-card="${statKey}">
        <div class="obstacleCounterTop"><div class="obstacleCounterIcon">${icon}</div></div>
        <button type="button" class="obstacleCounterQuickButton" data-obstacle-preset="${statKey}:max" ${allowed && currentValue < maxAssignable ? '' : 'disabled'}>🔝</button>
        <button type="button" class="obstacleCounterArrow" data-obstacle-adjust="${statKey}:up" ${allowed && currentValue < maxAssignable ? '' : 'disabled'}>⬆️</button>
        <div class="obstacleCounterValue">${currentValue}</div>
        <button type="button" class="obstacleCounterArrow" data-obstacle-adjust="${statKey}:down" ${allowed && currentValue > 0 ? '' : 'disabled'}>⬇️</button>
        <button type="button" class="obstacleCounterQuickButton" data-obstacle-preset="${statKey}:zero" ${allowed && currentValue > 0 ? '' : 'disabled'}>⤵️</button>
      </div>
    `;
  }).join('');

  ui.obstacleActionPanel.classList.remove('hidden', 'is-collapsed');
  ui.obstacleActionPanel.style.width = '';
  ui.obstacleActionPanel.style.height = '';
  ui.obstacleActionPanel.innerHTML = `
    <div class="obstaclePanelScaled">
      <div class="obstaclePanelTopRow">
        <h3>${sanitize(obstacle.name)}</h3>
        <button type="button" class="ghostButton compactObstacleMapButton" data-obstacle-collapse>View Map</button>
      </div>
      <p>Do you want to damage the obstacle blocking the way?</p>
      <div class="obstacleActionLayout">
        <div class="obstacleCounterGroup">${countersHtml}</div>
        <div class="obstacleSideColumn">
          <div class="obstacleHpPreview">
            <div class="obstacleHpPreviewLabel">HP</div>
            <div class="obstacleHpPreviewValue">${remaining}/${obstacle.hp}</div>
          </div>
          <div class="panelActionRow obstacleActionButtons">
            <button type="button" class="secondaryButton compactObstacleButton" data-obstacle-submit="damage" ${total > 0 ? '' : 'disabled'}>Deal Damage</button>
            <button type="button" class="ghostButton compactObstacleButton" data-obstacle-submit="cancel">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const collapseButton = ui.obstacleActionPanel.querySelector('[data-obstacle-collapse]');
  if (collapseButton) {
    collapseButton.addEventListener('click', () => {
      const currentPrompt = state.ui.obstaclePrompt;
      if (!currentPrompt) return;
      state.ui.obstaclePrompt = { ...currentPrompt, collapsed: true };
      renderObstacleActionPanel();
      refreshTileHighlights();
    });
  }

  Array.from(ui.obstacleActionPanel.querySelectorAll('[data-obstacle-adjust]')).forEach((button) => {
    button.addEventListener('click', () => {
      const [statKey, direction] = button.dataset.obstacleAdjust.split(':');
      const currentPrompt = state.ui.obstaclePrompt;
      if (!currentPrompt) return;
      const currentPlayer = state.players.find((entry) => entry.id === currentPrompt.playerId) || getCurrentPlayer();
      const currentCell = getCell(currentPrompt.row, currentPrompt.col);
      const currentObstacle = currentCell?.obstacle;
      if (!currentPlayer || !currentObstacle) return;
      const nextValues = { ...currentPrompt.values };
      const otherTotal = Object.values(nextValues).reduce((sum, value) => sum + value, 0) - (nextValues[statKey] || 0);
      const maxAssignable = currentObstacle.allowedStat === statKey ? Math.max(0, Math.min(currentPlayer.currentStats[statKey], currentObstacle.hp - otherTotal)) : 0;
      const next = direction === 'up'
        ? Math.min(maxAssignable, (nextValues[statKey] || 0) + 1)
        : Math.max(0, (nextValues[statKey] || 0) - 1);
      nextValues[statKey] = next;
      state.ui.obstaclePrompt = { ...currentPrompt, values: nextValues };
      renderObstacleActionPanel();
      refreshTileHighlights();
    });
  });

  Array.from(ui.obstacleActionPanel.querySelectorAll('[data-obstacle-preset]')).forEach((button) => {
    button.addEventListener('click', () => {
      const [statKey, mode] = button.dataset.obstaclePreset.split(':');
      const currentPrompt = state.ui.obstaclePrompt;
      if (!currentPrompt) return;
      const currentPlayer = state.players.find((entry) => entry.id === currentPrompt.playerId) || getCurrentPlayer();
      const currentCell = getCell(currentPrompt.row, currentPrompt.col);
      const currentObstacle = currentCell?.obstacle;
      if (!currentPlayer || !currentObstacle) return;
      const nextValues = { ...currentPrompt.values };
      const otherTotal = Object.values(nextValues).reduce((sum, value) => sum + value, 0) - (nextValues[statKey] || 0);
      const maxAssignable = currentObstacle.allowedStat === statKey ? Math.max(0, Math.min(currentPlayer.currentStats[statKey], currentObstacle.hp - otherTotal)) : 0;
      nextValues[statKey] = mode === 'max' ? maxAssignable : 0;
      state.ui.obstaclePrompt = { ...currentPrompt, values: nextValues };
      renderObstacleActionPanel();
      refreshTileHighlights();
    });
  });

  Array.from(ui.obstacleActionPanel.querySelectorAll('[data-obstacle-submit]')).forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.obstacleSubmit;
      const currentPrompt = state.ui.obstaclePrompt;
      if (!currentPrompt || typeof currentPrompt.resolve !== 'function') return;
      const payload = mode === 'damage'
        ? { type: 'damage', values: { ...currentPrompt.values } }
        : { type: 'cancel' };
      state.ui.obstaclePrompt = null;
      currentPrompt.resolve(payload);
      renderAll();
    });
  });
}

function renderZoomDock() {
  if (!ui.boardTools || !ui.zoomToggleButton) return;
  ui.boardTools.classList.toggle("hidden", !state.ui.zoomPanelOpen);
  ui.zoomToggleButton.classList.toggle("active", state.ui.zoomPanelOpen);
  if (ui.zoomValue) {
    ui.zoomValue.textContent = `${Math.round(state.camera.zoom * 100)}%`;
  }
  if (ui.zoomSlider) {
    ui.zoomSlider.value = String(Math.round(state.camera.zoom * 100));
  }
  if (ui.cameraPadKnob) {
    ui.cameraPadKnob.style.transform = `translate(${state.camera.padKnobX}px, ${state.camera.padKnobY}px)`;
  }
  updateFullscreenButton();
}

function renderItemTray() {
  const player = getCurrentPlayer();
  if (!ui.itemTray || !ui.itemToggleButton) return;
  ui.itemToggleButton.disabled = !!player && isComputerPlayer(player);
  if (!player || state.setupSelection.active || !state.ui.itemTrayOpen) {
    ui.itemToggleButton.classList.toggle("active", !!state.ui.itemTrayOpen && !!player && !state.setupSelection.active);
    ui.itemTray.classList.add("hidden");
    ui.itemTray.innerHTML = "";
    return;
  }
  ui.itemToggleButton.classList.add("active");
  ui.itemTray.classList.remove("hidden");
  const usableEntries = getManualUsableInventoryEntries(player);
  if (!player.items.length) {
    ui.itemTray.innerHTML = `<div class="itemChip muted">You are carrying nothing</div>`;
    return;
  }
  ui.itemTray.innerHTML = player.items.map((item, index) => {
    const manualUsable = !(itemDefinitions[item.id]?.battleOnly);
    return `
      <button class="inventoryItemButton ${state.ui.selectedItemIndex === index && state.ui.rightPanelMode === "item" ? "active" : ""}" data-item-index="${index}" ${manualUsable && canUseItems() ? "" : "disabled"}>
        <span class="inventoryItemGlyph">${item.icon}</span>
        ${renderItemBadge(item)}
      </button>
    `;
  }).join("");
  Array.from(ui.itemTray.querySelectorAll("[data-item-index]")).forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.selectedItemIndex = Number(button.dataset.itemIndex);
      state.ui.rightPanelMode = "item";
      renderExpandablePanels();
    });
  });
}

function renderSwapBubble() {
  if (!ui.swapBubble || !ui.swapToggleButton) return;
  const player = getCurrentPlayer();
  if (player) ui.swapToggleButton.disabled = isComputerPlayer(player) || !canSwap();
  if (!player) {
    ui.swapToggleButton.disabled = true;
    ui.swapToggleButton.classList.remove("active");
    ui.swapBubble.classList.add("hidden");
    ui.swapBubble.innerHTML = "";
    return;
  }
  ui.swapToggleButton.disabled = !canSwap();
  if (!canSwap()) state.ui.swapBubbleOpen = false;
  ui.swapToggleButton.classList.toggle("active", state.ui.swapBubbleOpen);
  ui.swapBubble.classList.toggle("hidden", !state.ui.swapBubbleOpen);
  if (!state.ui.swapBubbleOpen) return;
  const nextActive = player.benchCharacterData;
  ui.swapBubble.innerHTML = `
    <div class="swapBubbleText">${getCharacterIconMarkup(nextActive, "characterIconAsset--swap")} ${sanitize(nextActive.name)} will swap in. This can be done only once per game.</div>
    <button class="primaryButton" id="swapConfirmButton" ${canSwap() ? "" : "disabled"}>Swap</button>
  `;
  const swapButton = document.getElementById("swapConfirmButton");
  if (swapButton) {
    swapButton.addEventListener("click", () => {
      state.ui.swapBubbleOpen = false;
      executeSwap(player);
      renderExpandablePanels();
    });
  }
}

function renderSkillPanel() {
  if (!ui.skillPanel || !ui.skillToggleButton) return;
  const player = getCurrentPlayer();
  const manualSkill = !!player && ["painter2", "painter3", "painter4", "trapper1", "trapper2", "trapper3", "battler3", "battler4", "battler5", "tanker2", "tanker3", "supporter1", "supporter2", "trickster1", "trickster2", "trickster3"].includes(player.activeCharacterId);
  ui.skillToggleButton.disabled = (!player) || isComputerPlayer(player) || (!manualSkill && !state.ui.skillPanelOpen);
  ui.skillPanel.classList.add("hidden");
  ui.skillPanel.classList.remove("skillPanelCompact", "skillPanelWithAction");
  ui.skillPanel.innerHTML = "";
  if (!player) {
    ui.skillToggleButton.classList.remove("active");
    state.ui.skillPanelOpen = false;
    return;
  }
  ui.skillToggleButton.classList.toggle("active", state.ui.skillPanelOpen);
}

function buildSkillOverlayContent(player) {
  const char = characterLibrary[player.activeCharacterId];
  const activeSections = getCharacterDetailSections(player.activeCharacterId).active;
  const hasActiveSkill = activeSections.length > 0;
  const manualSkill = !!player && ["painter2", "painter3", "painter4", "trapper1", "trapper2", "trapper3", "battler3", "battler4", "battler5", "tanker2", "tanker3", "supporter1", "supporter2", "trickster1", "trickster2", "trickster3"].includes(player.activeCharacterId);

  const descriptionHtml = hasActiveSkill
    ? `<div class="skillDescriptionList skillOverlayList">${activeSections.map((entry, index) => {
        const availability = getSkillAvailabilityState(player, entry, index);
        const statusLabel = availability.label;
        const buttonDisabled = !manualSkill || !canUseSkill() || availability.disabled || isComputerPlayer(player);
        const actionHtml = `
          <div class="panelActionRow skillPanelActionRow skillEntryActionRow">
            <button class="secondaryButton skillEntryUseButton" data-skill-use-index="${index}" ${buttonDisabled ? "disabled" : ""}>Use</button>
            ${statusLabel ? `<span class="skillCooldownLabel">${sanitize(statusLabel)}</span>` : ""}
          </div>
        `;
        return renderSkillEntryHtml(entry, "panel", actionHtml);
      }).join("")}</div>`
    : `<p class="skillEmptyText">No active skills can be used right now</p>`;

  return `
    <div class="overlayPanelHeader skillOverlayHeader">
      <div class="skillOverlayTitleBlock">
        <div class="skillOverlayIcon">${getCharacterIconMarkup(char, "characterIconAsset--targetPanel")}</div>
        <div>
          <h3>${sanitize(char.name)}</h3>
          <p class="skillOverlaySubtitle">Active Skills</p>
        </div>
      </div>
      <button id="overlayCloseButton" class="overlayCloseButton" type="button" aria-label="Close">&times;</button>
    </div>
    <div class="overlayPanelScroll skillOverlayScroll">
      ${descriptionHtml}
    </div>
  `;
}

function bindSkillOverlayPanel() {
  if (!ui.rightOverlayPanel) return;
  Array.from(ui.rightOverlayPanel.querySelectorAll("[data-skill-use-index]")).forEach((button) => {
    button.addEventListener("click", () => {
      void useSkillFlow(Number(button.dataset.skillUseIndex));
    });
  });
}

function renderSkillOverlayPanel() {
  const player = getCurrentPlayer();
  if (!state.ui.skillPanelOpen || !player || isComputerPlayer(player)) return false;
  if (ui.logToggleButton) ui.logToggleButton.classList.remove("active");
  openRightOverlayPanel(buildSkillOverlayContent(player), "skill");
  bindSkillOverlayPanel();
  return true;
}


async function confirmRollDiceFromBubble() {
  if (state.moveDie || state.gameOver) return;
  state.ui.diceBubbleOpen = false;
  renderExpandablePanels();
  await rollTurnDiceAnimated();
}

function confirmRestFromBubble() {
  if (state.moveDie || state.gameOver || !maybeShowRestButton()) return;
  state.ui.restBubbleOpen = false;
  restFlow();
  renderExpandablePanels();
}

function renderDiceBubble() {
  if (!ui.diceBubble || !ui.rollDiceButton) return;
  ui.rollDiceButton.classList.toggle("active", state.ui.diceBubbleOpen);
  ui.diceBubble.classList.toggle("hidden", !state.ui.diceBubbleOpen);
  if (!state.ui.diceBubbleOpen) {
    ui.diceBubble.innerHTML = "";
    return;
  }
  const disabled = !!state.moveDie || state.gameOver || isInteractionPromptBlocking() || isComputerPlayer(getCurrentPlayer());
  ui.diceBubble.innerHTML = `
    <div class="actionBubbleText">After rolling the dice, you cannot use items for the rest of this turn.</div>
    <button class="primaryButton compactBubbleButton" id="confirmRollDiceButton" ${disabled ? "disabled" : ""}>Roll Dice</button>
  `;
  const confirmButton = document.getElementById("confirmRollDiceButton");
  if (confirmButton) confirmButton.addEventListener("click", async (event) => {
    event.stopPropagation();
    if (performance.now() - (state.ui.lastBubblePointerConfirmAt || 0) < 350) return;
    await confirmRollDiceFromBubble();
  });
  if (confirmButton) confirmButton.addEventListener("pointerup", async (event) => {
    if (event.pointerType === "mouse") return;
    event.preventDefault();
    event.stopPropagation();
    state.ui.lastBubblePointerConfirmAt = performance.now();
    await confirmRollDiceFromBubble();
  });
}

function renderRestBubble() {
  if (!ui.restBubble || !ui.restButton) return;
  ui.restButton.classList.toggle("active", state.ui.restBubbleOpen);
  ui.restBubble.classList.toggle("hidden", !state.ui.restBubbleOpen);
  if (!state.ui.restBubbleOpen) {
    ui.restBubble.innerHTML = "";
    return;
  }
  const disabled = !!state.moveDie || state.gameOver || !maybeShowRestButton() || isInteractionPromptBlocking() || isComputerPlayer(getCurrentPlayer());
  ui.restBubble.innerHTML = `
    <div class="actionBubbleText">Resting prevents moving and painting this turn, but restores all stats.</div>
    <button class="primaryButton compactBubbleButton" id="confirmRestButton" ${disabled ? "disabled" : ""}>Rest</button>
  `;
  const confirmButton = document.getElementById("confirmRestButton");
  if (confirmButton) confirmButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (performance.now() - (state.ui.lastBubblePointerConfirmAt || 0) < 350) return;
    confirmRestFromBubble();
  });
  if (confirmButton) confirmButton.addEventListener("pointerup", (event) => {
    if (event.pointerType === "mouse") return;
    event.preventDefault();
    event.stopPropagation();
    state.ui.lastBubblePointerConfirmAt = performance.now();
    confirmRestFromBubble();
  });
}

function getTileDetailPlayerEntries(row, col) {
  const entries = [];
  state.players.forEach((player, index) => {
    if (!player?.position || player.position.row !== row || player.position.col !== col) return;
    entries.push({
      index,
      name: player.name,
      iconMarkup: getPlayerCharacterIconMarkup(player, "characterIconAsset--panelTitle"),
      detail: `Attack ${player.currentStats.attack} / HP ${player.currentStats.hp} / Technique ${player.currentStats.technique}${playerHasFlag(player) ? " / Flag" : ""}`
    });
  });
  (state.rascaClones || []).forEach((clone) => {
    if (clone.row !== row || clone.col !== col) return;
    const owner = state.players[clone.ownerIndex];
    if (!owner) return;
    entries.push({
      index: clone.ownerIndex,
      name: `${owner.name}'s Tail`,
      iconMarkup: `<img class="characterIconAsset characterIconAsset--panelTitle" src="${sanitize(getCharacterIconAsset("trickster2", "tail"))}" alt="" aria-hidden="true">`,
      detail: `HP ${Math.max(0, Math.ceil(clone.hp))}/${Math.max(1, Math.ceil(clone.maxHp))}${clone.enhanced ? " / Enhanced" : ""}`
    });
  });
  return entries;
}

function getTileDetailEffectEntries(cell) {
  if (!cell) return [];
  const entries = [];
  if (cell.startOwner !== null) {
    const startOwner = state.players[cell.startOwner];
    if (startOwner) {
      entries.push({ icon: "🏠", label: `${startOwner.name}'s starting tile` });
    }
  }
  if (cell.owner !== null) {
    const owner = state.players[cell.owner];
    if (owner) {
      entries.push({ icon: "🎨", label: `Painted by ${owner.name}` });
      (state.venomVarnishes || []).forEach((effect) => {
        if (!effect || effect.remainingTurns <= 0) return;
        const effectOwner = state.players[effect.ownerIndex];
        if (!effectOwner) return;
        if (cell.owner !== effect.ownerIndex && !arePlayersAllied(effectOwner, owner)) return;
        entries.push({
          icon: "🕸️",
          label: `Venom Varnish by ${effectOwner.name}${effect.enhanced ? " / enhanced" : ""} / ${effect.remainingTurns} rounds left`
        });
      });
    }
  }
  if (cell.special.includes("heal-hp")) entries.push({ icon: "❤️", label: "Recovery tile: restores HP on your own paint" });
  if (cell.special.includes("heal-atk")) entries.push({ icon: "⚔️", label: "Recovery tile: restores Attack on your own paint" });
  if (cell.special.includes("heal-tech")) entries.push({ icon: "🧠", label: "Recovery tile: restores Technique on your own paint" });
  if (isFoodCourtMapActive()) {
    const table = getFoodCourtTableAt(cell.row, cell.col);
    if (table) {
      const teamKey = getFoodCourtTableTeamKey(table.id);
      entries.push({ icon: "🍽️", label: teamKey ? `${table.label}: ${getTeamDisplayLabel(teamKey)} table` : `${table.label}: unused table` });
    }
    const shop = getFoodCourtShopAt(cell.row, cell.col);
    if (shop?.foodType) {
      const food = getFoodCourtFoodDefinition(shop.foodType);
      entries.push({ icon: food?.icon || "🍽️", label: `${food?.label || "Food"} shop: ${getFoodCourtShopStatus(shop.id).label}` });
    } else if (isFoodCourtGeneralStoreShop(shop)) {
      entries.push({ icon: "🪨", label: `General store: ${getFoodCourtShopStatus(shop.id).label}` });
    }
    if (isFoodCourtHungryTile(cell.row, cell.col)) entries.push({ icon: "😋", label: "Hungry guest: discard carried food on your own paint" });
  }
  if (cell.groundItem?.id === "flag") {
    entries.push({ icon: "🚩", label: "Dropped flag" });
  } else if (cell.groundItem) {
    entries.push({ icon: cell.groundItem.icon || "✨", label: `Ground item: ${cell.groundItem.name}` });
  }
  if (cell.obstacle) {
    entries.push({ icon: cell.obstacle.icon || "🪨", label: `${cell.obstacle.name} / HP ${cell.obstacle.hp}` });
  }
  cell.zones.forEach((zone) => {
    const owner = state.players[zone.ownerIndex];
    entries.push({
      icon: "☣️",
      label: `Bog Tantrum by ${owner?.name || "Unknown"}${zone.enhanced ? " / enhanced movement limit" : ""} / ${zone.remainingTurns} rounds left`
    });
  });
  cell.pits.forEach((pit) => {
    const owner = state.players[pit.ownerIndex];
    entries.push({
      icon: "🕳️",
      label: `Loose Ground by ${owner?.name || "Unknown"}${pit.passThrough ? " / pass-through" : ""} / ${pit.remainingTurns} rounds left`
    });
  });
  if (isCellInControlArea(cell)) entries.push({ icon: "◆", label: "Central Dominion control area" });
  if (cell.territoryIds?.length) entries.push({ icon: "🏳️", label: `Capture Territory area (${cell.territoryIds.join(", ")})` });
  return entries;
}

function buildTileDetailContent(cell) {
  const players = getTileDetailPlayerEntries(cell.row, cell.col);
  const effects = getTileDetailEffectEntries(cell);
  return `
    <div class="overlayPanelHeader">
      <h3>Tile ${cell.row + 1}-${cell.col + 1}</h3>
      <button id="overlayCloseButton" class="overlayCloseButton" type="button" aria-label="Close">✕</button>
    </div>
    <div class="overlayPanelScroll tileDetailScroll">
      <div class="tileDetailSection">
        <div class="tileDetailSectionTitle">Occupants</div>
        ${players.length ? `
          <div class="tileDetailList">
            ${players.map((entry) => `
              <div class="tileDetailRow player-${entry.index}">
                <div class="tileDetailIcon">${entry.iconMarkup}</div>
                <div class="tileDetailText">
                  <strong>${sanitize(entry.name)}</strong>
                  <span>${sanitize(entry.detail)}</span>
                </div>
              </div>
            `).join("")}
          </div>
        ` : `<p class="tileDetailEmpty">No players or detached tails are on this tile.</p>`}
      </div>
      <div class="tileDetailSection">
        <div class="tileDetailSectionTitle">Effects</div>
        ${effects.length ? `
          <div class="tileDetailList">
            ${effects.map((entry) => `
              <div class="tileDetailRow">
                <div class="tileDetailGlyph">${sanitize(entry.icon)}</div>
                <div class="tileDetailText"><span>${sanitize(entry.label)}</span></div>
              </div>
            `).join("")}
          </div>
        ` : `<p class="tileDetailEmpty">No ongoing effects are applied to this tile.</p>`}
      </div>
    </div>
  `;
}


let rightPanelCloseTimer = null;

function openRightOverlayPanel(content, mode) {
  if (!ui.rightOverlayPanel) return;
  if (rightPanelCloseTimer) {
    clearTimeout(rightPanelCloseTimer);
    rightPanelCloseTimer = null;
  }
  ui.rightOverlayPanel.dataset.mode = mode || "";
  ui.rightOverlayPanel.innerHTML = content;
  ui.rightOverlayPanel.classList.remove("hidden", "closing", "playerTargetCollapsed");
  void ui.rightOverlayPanel.offsetWidth;
  ui.rightOverlayPanel.classList.add("open");
  const closeButton = ui.rightOverlayPanel.querySelector(".overlayCloseButton");
  if (closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      state.ui.rightPanelMode = null;
      if (ui.rightOverlayPanel?.dataset.mode === "skill") {
        state.ui.skillPanelOpen = false;
      }
      state.ui.selectedCharacterInspect = null;
      state.ui.selectedTileInspect = null;
      if (state.ui.itemTrayOpen && state.ui.selectedItemIndex !== null) {
        state.ui.selectedItemIndex = null;
      }
      renderExpandablePanels();
    });
  }
  if (mode === "log") {
    bindLogRoundTabs();
  }
}

function closeRightOverlayPanel() {
  if (!ui.rightOverlayPanel) return;
  if (rightPanelCloseTimer) {
    clearTimeout(rightPanelCloseTimer);
    rightPanelCloseTimer = null;
  }
  if (ui.rightOverlayPanel.classList.contains("hidden")) {
    ui.rightOverlayPanel.innerHTML = "";
    ui.rightOverlayPanel.dataset.mode = "";
    return;
  }
  ui.rightOverlayPanel.classList.remove("open");
  ui.rightOverlayPanel.classList.add("closing");
  rightPanelCloseTimer = setTimeout(() => {
    if (!ui.rightOverlayPanel) return;
    ui.rightOverlayPanel.classList.add("hidden");
    ui.rightOverlayPanel.classList.remove("closing", "playerTargetCollapsed");
    ui.rightOverlayPanel.innerHTML = "";
    ui.rightOverlayPanel.dataset.mode = "";
    rightPanelCloseTimer = null;
  }, 240);
}

function renderRightOverlayPanel() {
  if (!ui.rightOverlayPanel || !ui.logToggleButton) return;
  if (state.setupSelection.active) {
    ui.rightOverlayPanel.classList.add("hidden");
    ui.rightOverlayPanel.innerHTML = "";
    return;
  }
  if (renderRascaSnapbackPromptPanel()) return;
  if (renderPlayerTargetPromptPanel()) return;
  if (renderSkillOverlayPanel()) return;
  const player = getCurrentPlayer();
  const mode = state.ui.rightPanelMode;

  if (!player && mode !== "log" && mode !== "character" && mode !== "tile") {
    ui.logToggleButton.classList.remove("active");
    closeRightOverlayPanel();
    return;
  }

  ui.logToggleButton.classList.toggle("active", mode === "log");

  if (!mode) {
    closeRightOverlayPanel();
    return;
  }

  if (mode === "log") {
    state.ui.logTabsNeedCenter = true;
    const content = `
      <div class="overlayPanelHeader">
        <h3>Battle Log</h3>
        <button id="overlayCloseButton" class="overlayCloseButton" type="button" aria-label="Close">✕</button>
      </div>
      ${buildLogRoundTabsHtml()}
      <div class="overlayPanelScroll logOverlayScroll">${buildFilteredLogEntriesHtml()}</div>
    `;
    openRightOverlayPanel(content, "log");
    return;
  }

  if (mode === "character") {
    const inspect = state.ui.selectedCharacterInspect;
    const targetPlayer = inspect ? state.players[inspect.playerIndex] : null;
    const targetCharacter = targetPlayer ? getOriginalCharacterInfo(targetPlayer, inspect.slot) : null;
    if (!targetPlayer || !targetCharacter) {
      state.ui.rightPanelMode = null;
      state.ui.selectedCharacterInspect = null;
      closeRightOverlayPanel();
      return;
    }

    const content = buildCharacterDetailContent(targetCharacter, targetPlayer.name, "overlayCloseButton");
    openRightOverlayPanel(content, "character");
    return;
  }

  if (mode === "tile") {
    const inspect = state.ui.selectedTileInspect;
    const cell = inspect ? getCell(inspect.row, inspect.col) : null;
    if (!cell || !cell.playable) {
      state.ui.rightPanelMode = null;
      state.ui.selectedTileInspect = null;
      closeRightOverlayPanel();
      return;
    }
    openRightOverlayPanel(buildTileDetailContent(cell), "tile");
    return;
  }

  const item = player.items[state.ui.selectedItemIndex];
  if (!item || itemDefinitions[item.id]?.battleOnly) {
    state.ui.rightPanelMode = null;
    closeRightOverlayPanel();
    return;
  }
  const definition = itemDefinitions[item.id];
  const disabled = !canUseItems();
  let controls = `<div class="panelActionRow"><button class="ghostButton" id="closeItemPanelButton">Cancel</button></div>`;

  if (item.id === "abilityRestore" || item.id === "abilityExpand") {
    controls = `
      <div class="itemDetailStatButtons">
        <button class="optionButton" data-item-stat="attack" ${disabled ? "disabled" : ""}>${getStatIcon("attack")}Attack</button>
        <button class="optionButton" data-item-stat="hp" ${disabled ? "disabled" : ""}>${getStatIcon("hp")}HP</button>
        <button class="optionButton" data-item-stat="technique" ${disabled ? "disabled" : ""}>${getStatIcon("technique")}Technique</button>
      </div>
      <div class="panelActionRow"><button class="ghostButton" id="closeItemPanelButton">Cancel</button></div>
    `;
  } else {
    controls = `
      <div class="panelActionRow">
        <button class="primaryButton" id="useSimpleItemButton" ${disabled ? "disabled" : ""}>Use</button>
        <button class="ghostButton" id="closeItemPanelButton">Cancel</button>
      </div>
    `;
  }

  const content = `
    <div class="overlayPanelHeader">
      <h3>${definition.icon} ${sanitize(definition.name)}</h3>
      <button id="overlayCloseButton" class="overlayCloseButton" type="button" aria-label="Close">✕</button>
    </div>
    <div class="overlayPanelScroll">
      <p>${sanitize(definition.description)}</p>
      ${disabled ? `<p class="note">You cannot use this yet this turn.</p>` : ""}
      ${controls}
    </div>
  `;
  openRightOverlayPanel(content, "item");

  const closeButton = document.getElementById("closeItemPanelButton");
  if (closeButton) closeButton.addEventListener("click", () => {
    state.ui.rightPanelMode = null;
    state.ui.selectedItemIndex = null;
    renderExpandablePanels();
  });

  const simpleUse = document.getElementById("useSimpleItemButton");
  if (simpleUse) simpleUse.addEventListener("click", () => applySelectedItem());

  Array.from(ui.rightOverlayPanel.querySelectorAll("[data-item-stat]")).forEach((button) => {
    button.addEventListener("click", () => applySelectedItem(button.dataset.itemStat));
  });
}

function applySelectedItem(statKey = null) {
  const player = getCurrentPlayer();
  if (!player) return;
  const itemIndex = state.ui.selectedItemIndex;
  const item = player.items[itemIndex];
  if (!item || !canUseItems()) return;
  if (item.id === "abilityRestore") {
    const amount = restoreStat(player, statKey, 10);
    log(`${player.name} restored ${amount} to ${statLabel(statKey)}.`, true);
  } else if (item.id === "abilityExpand") {
    const amount = increaseStatMax(player, statKey, 10);
    log(`${player.name} increased the max value of ${statLabel(statKey)} by ${amount}.`, true);
  } else if (item.id === "potion") {
    const amount = restoreStat(player, "hp", 20);
    log(`${player.name} restored ${amount} HP with a Potion.`, true);
  }
  player.items.splice(itemIndex, 1);
  state.turnUsedItem = true;
  state.ui.itemTrayOpen = true;
  state.ui.rightPanelMode = null;
  state.ui.selectedItemIndex = null;
  renderAll();
}

function toggleCameraInputMode() {
  if (!state.moveDie) return;
  if (state.currentAction === "camera") {
    state.currentAction = state.remainingMove > 0 ? "move" : "paint";
    if (state.remainingMove === 0 && state.moveDie !== null && state.selectedPath.length > 0) {
      state.currentAction = "paint";
    }
    state.allowFreeCameraDuringInput = false;
  } else {
    state.allowFreeCameraDuringInput = true;
    state.currentAction = "camera";
  }
  renderAll();
}

function renderLog() {}

function normalizeLogEntries() {
  state.logEntries = state.logEntries.map((entry) => {
    if (typeof entry === "string") {
      return { html: entry, round: 1 };
    }
    return entry;
  });
}

function getAvailableLogRounds() {
  normalizeLogEntries();
  const highestLoggedRound = state.logEntries.reduce((max, entry) => Math.max(max, Number(entry.round) || 0), 0);
  const highestRound = Math.max(1, Number(state.round) || 0, highestLoggedRound);
  return Array.from({ length: highestRound }, (_, index) => index + 1);
}

function centerLogRoundButton(scroller, button, smooth = false) {
  if (!scroller || !button) return;
  const buttonCenter = button.offsetLeft + (button.offsetWidth / 2);
  const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  const target = Math.min(maxScrollLeft, Math.max(0, buttonCenter - (scroller.clientWidth / 2)));
  if (smooth && typeof scroller.scrollTo === "function") {
    scroller.scrollTo({ left: target, behavior: "smooth" });
  } else {
    scroller.scrollLeft = target;
  }
}

function buildLogRoundTabsHtml() {
  const rounds = getAvailableLogRounds();
  if (!rounds.length) return "";
  if (state.ui.logRoundFilter !== null && !rounds.includes(state.ui.logRoundFilter)) {
    state.ui.logRoundFilter = null;
  }
  const activeRound = state.ui.logRoundFilter;
  return `
    <div class="logRoundTabsShell">
      <div class="logRoundTabsScroller" id="logRoundTabsScroller">
        ${rounds.map((round) => `
          <button
            type="button"
            class="logRoundTabButton ${activeRound === round ? "active" : ""}"
            data-log-round="${round}"
            aria-pressed="${activeRound === round ? "true" : "false"}"
          >${round}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function buildFilteredLogEntriesHtml() {
  normalizeLogEntries();
  const filtered = state.ui.logRoundFilter === null
    ? state.logEntries
    : state.logEntries.filter((entry) => entry.round === state.ui.logRoundFilter);
  if (!filtered.length) return `<div class="logEntry">No log entries yet.</div>`;
  return filtered.map((entry) => `<div class="logEntry">${entry.html}</div>`).join("");
}

function refreshOpenLogOverlay() {
  if (!ui.rightOverlayPanel || ui.rightOverlayPanel.dataset.mode !== "log") return;
  const scroller = ui.rightOverlayPanel.querySelector("#logRoundTabsScroller");
  const logScroll = ui.rightOverlayPanel.querySelector(".logOverlayScroll");
  if (logScroll) {
    logScroll.innerHTML = buildFilteredLogEntriesHtml();
  }
  if (!scroller) return;
  const buttons = Array.from(scroller.querySelectorAll("[data-log-round]"));
  buttons.forEach((button) => {
    const round = Number(button.dataset.logRound);
    const isActive = state.ui.logRoundFilter === round;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function bindLogRoundTabs() {
  if (!ui.rightOverlayPanel) return;
  const scroller = ui.rightOverlayPanel.querySelector("#logRoundTabsScroller");
  if (!scroller) return;
  const buttons = Array.from(scroller.querySelectorAll("[data-log-round]"));
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const round = Number(button.dataset.logRound);
      state.ui.logRoundFilter = state.ui.logRoundFilter === round ? null : round;
      refreshOpenLogOverlay();
    });
  });
  requestAnimationFrame(() => {
    const active = scroller.querySelector(".logRoundTabButton.active") || buttons.at(-1);
    if (state.ui.logTabsNeedCenter) {
      centerLogRoundButton(scroller, active, false);
      state.ui.logTabsNeedCenter = false;
    }
  });
}

function log(message, emphasize = false) {
  const text = emphasize ? `<strong>${sanitize(message)}</strong>` : sanitize(message);
  state.logEntries.push({ html: text, round: state.round });
  if (state.logEntries.length > 240) state.logEntries.shift();
  renderExpandablePanels();
}

function showSimpleModal({ title, body, buttons, afterRender }) {
  ui.modalBackdrop.classList.remove("hidden");
  const fragment = ui.messageModalTemplate.content.cloneNode(true);
  const modal = fragment.querySelector(".modal");
  modal.querySelector(".modalTitle").textContent = title;
  modal.querySelector(".modalBody").innerHTML = body;
  const actions = modal.querySelector(".modalActions");
  buttons.forEach((button, index) => {
    const element = document.createElement("button");
    element.className = button.style === "primary"
      ? "primaryButton"
      : button.style === "secondary"
        ? "secondaryButton"
        : button.style === "option"
          ? "optionButton"
          : "ghostButton";
    element.textContent = button.label;
    element.dataset.modalButtonIndex = String(index);
    if (button.disabled) element.disabled = true;
    element.addEventListener("click", button.onClick);
    actions.appendChild(element);
  });
  ui.modalRoot.innerHTML = "";
  ui.modalRoot.appendChild(modal);
  state.activeModals = [modal];
  if (afterRender) afterRender(modal);
  syncOpenModalToRoom();
}

function closeTopModal(options = {}) {
  const keepBackdrop = !!(options && options.keepBackdrop === true);
  if (state.diceAnimation.raf !== null) {
    cancelAnimationFrame(state.diceAnimation.raf);
    state.diceAnimation.raf = null;
  }
  if (state.orderAnimation.interval !== null) {
    clearInterval(state.orderAnimation.interval);
    state.orderAnimation.interval = null;
  }
  ui.modalRoot.innerHTML = "";
  state.activeModals = [];
  ui.modalBackdrop.classList.remove("battleDoorExitBackdrop");
  if (!keepBackdrop) {
    ui.modalBackdrop.classList.add("hidden");
  }
  syncClosedModalToRoom();
}



const SEVEN_SEGMENT_MAP = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "c", "d", "g"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "g", "e", "c", "d"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"]
};

function createSevenSegmentDigitHtml(value) {
  const active = new Set(SEVEN_SEGMENT_MAP[Number(value)] || []);
  return `
    <div class="sevenSegDigit">
      <span class="segSegment seg-a ${active.has("a") ? "active" : ""}"></span>
      <span class="segSegment seg-b ${active.has("b") ? "active" : ""}"></span>
      <span class="segSegment seg-c ${active.has("c") ? "active" : ""}"></span>
      <span class="segSegment seg-d ${active.has("d") ? "active" : ""}"></span>
      <span class="segSegment seg-e ${active.has("e") ? "active" : ""}"></span>
      <span class="segSegment seg-f ${active.has("f") ? "active" : ""}"></span>
      <span class="segSegment seg-g ${active.has("g") ? "active" : ""}"></span>
    </div>
  `;
}

function createSevenSegmentCounterHtml(value, playerIndex) {
  const padded = String(value).padStart(3, "0").slice(-3);
  return `
    <div class="sevenSegCounter player-${playerIndex}" data-counter-index="${playerIndex}" style="${sanitize(buildSevenSegmentCounterStyle(playerIndex))}">
      ${padded.split("").map((digit) => createSevenSegmentDigitHtml(digit)).join("")}
    </div>
  `;
}

function updateSevenSegmentCounter(element, value, playerIndex) {
  if (!element) return;
  element.className = `sevenSegCounter player-${playerIndex}`;
  element.setAttribute('style', buildSevenSegmentCounterStyle(playerIndex));
  element.innerHTML = String(value).padStart(3, "0").slice(-3).split("").map((digit) => createSevenSegmentDigitHtml(digit)).join("");
}

function getOrderRankBadge(orderIndex) {
  if (orderIndex === 0) return `<span class="orderRankBadge gold">1</span>`;
  if (orderIndex === 1) return `<span class="orderRankBadge silver">2</span>`;
  if (orderIndex === 2) return `<span class="orderRankBadge bronze">3</span>`;
  return `<span class="orderRankBadge plain">${orderIndex + 1}</span>`;
}

function animateOrderCounterSequence(activeIndices, existingRolls) {
  return new Promise((resolve) => {
    const html = `
      <div class="modal card orderRollModal">
        <h3 class="modalTitle">Turn Order</h3>
        <div class="orderRollSubtitle">Each player's number is decided at the same time.</div>
        <div class="orderRollStage">
          ${state.players.map((player, index) => `
            <div class="orderRollLane player-${index}">
              <div class="orderLaneLabel">${sanitize(player.name)}</div>
              <div class="orderCounterWrap" data-order-counter-wrap="${index}">
                ${createSevenSegmentCounterHtml(existingRolls[index] ?? 1, index)}
              </div>
              <button class="primaryButton orderStopButton" data-order-stop="${index}" ${activeIndices.includes(index) ? "" : "disabled"}>${activeIndices.includes(index) ? "Stop" : "Confirm"}</button>
              <div class="orderRankSlot" data-order-rank="${index}"></div>
            </div>
          `).join("")}
        </div>
        <div class="modalActions inlineActions">
          <button id="confirmOrderRollButton" class="primaryButton hidden">Confirm</button>
        </div>
      </div>
    `;

    showRawModal(html, (modal) => {
      const workingValues = existingRolls.slice();
      const activeSet = new Set(activeIndices);
      const stopped = new Set();
      const confirmButton = modal.querySelector("#confirmOrderRollButton");

      const tick = () => {
        activeIndices.forEach((index) => {
          if (stopped.has(index)) return;
          workingValues[index] = randomInt(1, 100);
          const counter = modal.querySelector(`[data-counter-index="${index}"]`);
          updateSevenSegmentCounter(counter, workingValues[index], index);
        });
        syncOpenModalToRoomThrottled();
      };

      tick();
      state.orderAnimation.interval = setInterval(tick, 55);

      const orderStopButtons = Array.from(modal.querySelectorAll("[data-order-stop]"));
      orderStopButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const index = Number(button.dataset.orderStop);
          if (!activeSet.has(index) || stopped.has(index)) return;
          stopped.add(index);
          button.disabled = true;
          button.textContent = "Confirm";

          const counter = modal.querySelector(`[data-counter-index="${index}"]`);
          updateSevenSegmentCounter(counter, workingValues[index], index);

          if (stopped.size !== activeIndices.length) return;

          clearInterval(state.orderAnimation.interval);
          state.orderAnimation.interval = null;
          syncOpenModalToRoom();

          const tied = [];
          activeIndices.forEach((index) => {
            const duplicates = activeIndices.filter((other) => other !== index && workingValues[other] === workingValues[index]);
            if (duplicates.length) tied.push(index);
          });

          const uniqueTied = [...new Set(tied)];

          if (uniqueTied.length) {
            setTimeout(() => {
              closeTopModal();
              resolve({ values: workingValues, tied: uniqueTied });
            }, 550);
            return;
          }

          const finalOrder = state.players.map((_, index) => index).sort((a, b) => workingValues[b] - workingValues[a]);
          finalOrder.forEach((playerIndex, rankIndex) => {
            const rankSlot = modal.querySelector(`[data-order-rank="${playerIndex}"]`);
            if (rankSlot) rankSlot.innerHTML = getOrderRankBadge(rankIndex);
          });
          const subtitle = modal.querySelector(".orderRollSubtitle");
          if (subtitle) subtitle.textContent = "Turn order has been decided.";
          confirmButton.classList.remove("hidden");
          syncOpenModalToRoom();
        });
      });

      activeIndices.forEach((index, stopOrder) => {
        const player = state.players[index];
        if (!isComputerPlayer(player)) return;
        const button = modal.querySelector(`[data-order-stop="${index}"]`);
        if (!button) return;
        const delay = 450 + stopOrder * 220 + randomInt(120, 360);
        window.setTimeout(() => {
          if (!modal.isConnected || button.disabled) return;
          button.click();
        }, delay);
      });

      if (activeIndices.length && activeIndices.every((index) => isComputerPlayer(state.players[index]))) {
        const autoConfirm = () => {
          if (!modal.isConnected || confirmButton.classList.contains("hidden")) {
            window.setTimeout(autoConfirm, 120);
            return;
          }
          confirmButton.click();
        };
        window.setTimeout(autoConfirm, 220);
      }

      confirmButton.addEventListener("click", () => {
        closeTopModal();
        resolve({ values: workingValues, tied: [] });
      });
    });
  });
}


function showRawModal(html, afterRender) {
  ui.modalBackdrop.classList.remove("hidden");
  ui.modalRoot.innerHTML = html;
  state.activeModals = Array.from(ui.modalRoot.children);
  if (afterRender) afterRender(ui.modalRoot.firstElementChild);
  syncOpenModalToRoom();
}

function createDieCubeHtml(index, label = "", valueLabel = "") {
  const pipMap = {
    1: ["center"],
    2: ["top-left", "bottom-right"],
    3: ["top-left", "center", "bottom-right"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: ["top-left", "top-right", "mid-left", "mid-right", "bottom-left", "bottom-right"]
  };
  const face = (number) => `
    <div class="dieFace face-${number}">
      ${(pipMap[number] || []).map((pos) => `<span class="pip ${pos}"></span>`).join("")}
    </div>
  `;
  return `
    <div class="diceRollUnit">
      ${label ? `<div class="diceRollUnitLabel">${sanitize(label)}</div>` : ""}
      <div class="dieScene">
        <div class="dieCube" data-die-index="${index}">
          ${face(1)}${face(2)}${face(3)}${face(4)}${face(5)}${face(6)}
        </div>
      </div>
      <div class="diceRollResult" data-dice-result-index="${index}">${sanitize(valueLabel)}</div>
    </div>
  `;
}

function getDieFaceTransform(face) {
  const transforms = {
    1: "rotateX(0deg) rotateY(0deg)",
    2: "rotateY(-90deg)",
    3: "rotateX(-90deg)",
    4: "rotateX(90deg)",
    5: "rotateY(90deg)",
    6: "rotateX(180deg)"
  };
  return transforms[face] || transforms[1];
}

function animateDiceRollSequence({ title, subtitle = "", dice, odds = null, autoStopDelay = null }) {
  return new Promise((resolve) => {
    const showOdds = !!odds && Array.isArray(odds.move) && Array.isArray(odds.space) && odds.move.length && odds.space.length && dice.length === 2;
    const html = `
      <div class="modal card diceRollModal ${showOdds ? "diceRollModalWithOdds" : ""}">
        <h3 class="modalTitle">${sanitize(title)}</h3>
        ${subtitle ? `<div class="diceRollSubtitle">${sanitize(subtitle)}</div>` : ""}
        <div class="diceRollStageWrap ${showOdds ? "withOdds" : ""}">
          ${showOdds ? `<div class="dieOddsPanel diceRollOddsPanel diceRollOddsPanelMove">${createDieOddsPanelHtml("Move", odds.move)}</div>` : ""}
          <div class="diceRollStage">
            ${dice.map((die, index) => createDieCubeHtml(index, die.label || "", "…")).join("")}
          </div>
          ${showOdds ? `<div class="dieOddsPanel diceRollOddsPanel diceRollOddsPanelSpace">${createDieOddsPanelHtml("Space", odds.space)}</div>` : ""}
        </div>
        <div class="modalActions inlineActions">
          <button id="stopDiceRollButton" class="primaryButton">Stop</button>
        </div>
      </div>
    `;

    showRawModal(html, (modal) => {
      const cubes = Array.from(modal.querySelectorAll(".dieCube"));
      const resultFields = Array.from(modal.querySelectorAll(".diceRollResult"));
      const stopButton = modal.querySelector("#stopDiceRollButton");
      const start = performance.now();
      let rolling = true;
      let stopped = false;
      let slowStart = 0;
      const currentAngles = dice.map((_, index) => ({ x: index * 40, y: index * 65 }));

      const tick = (now) => {
        if (!rolling && !stopped) return;
        if (rolling) {
          cubes.forEach((cube, index) => {
            currentAngles[index].x += 16 + index * 1.5;
            currentAngles[index].y += 19 + index * 1.2;
            cube.style.transform = `rotateX(${currentAngles[index].x}deg) rotateY(${currentAngles[index].y}deg)`;
            resultFields[index].textContent = "…";
          });
          state.diceAnimation.raf = requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min(1, (now - slowStart) / 1000);
        const eased = 1 - Math.pow(1 - progress, 3);

        cubes.forEach((cube, index) => {
          const targetBaseX = Math.round(currentAngles[index].x / 360) * 360;
          const targetBaseY = Math.round(currentAngles[index].y / 360) * 360;
          let extraX = 0;
          let extraY = 0;
          if ((dice[index].face || 1) === 2) extraY = -90;
          if ((dice[index].face || 1) === 3) extraX = -90;
          if ((dice[index].face || 1) === 4) extraX = 90;
          if ((dice[index].face || 1) === 5) extraY = 90;
          if ((dice[index].face || 1) === 6) extraX = 180;

          const finalX = targetBaseX + extraX;
          const finalY = targetBaseY + extraY;
          const currentX = currentAngles[index].x + (finalX - currentAngles[index].x) * eased;
          const currentY = currentAngles[index].y + (finalY - currentAngles[index].y) * eased;
          cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        });

        if (progress < 1) {
          state.diceAnimation.raf = requestAnimationFrame(tick);
          return;
        }

        cubes.forEach((cube, index) => {
          const face = dice[index].face || 1;
          cube.style.transform = getDieFaceTransform(face);
          resultFields[index].textContent = dice[index].display ?? String(dice[index].result);
        });

        stopped = false;
        state.diceAnimation.raf = null;
        setTimeout(() => {
          closeTopModal();
          resolve(dice.map((die) => die.result));
        }, 450);
      };

      state.diceAnimation.raf = requestAnimationFrame(tick);

      const stopRolling = () => {
        if (!rolling) return;
        rolling = false;
        stopped = true;
        slowStart = performance.now();
        state.diceAnimation.raf = requestAnimationFrame(tick);
      };

      stopButton.addEventListener("click", stopRolling);

      if (typeof autoStopDelay === "number" && autoStopDelay >= 0) {
        window.setTimeout(stopRolling, autoStopDelay);
      }
    });
  });
}

function isCurrentPlayerViewingOwnHidden(playerIndex) {
  if (state.currentPlayerIndex !== playerIndex) return false;
  const player = state.players[playerIndex];
  return !!player?.turnFlags?.hiddenRevealThisTurn;
}

function shareCellWithAnyOtherPlayer(playerIndex) {
  const player = state.players[playerIndex];
  return state.players.some((other, index) => index !== playerIndex && other.position && player.position && other.position.row === player.position.row && other.position.col === player.position.col);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (ui.startGameButton) ui.startGameButton.addEventListener("click", startGame);

if (ui.zoomToggleButton) ui.zoomToggleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  state.ui.zoomPanelOpen = !state.ui.zoomPanelOpen;
  renderExpandablePanels();
});
if (ui.fullscreenButton) ui.fullscreenButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleFullscreen();
});
if (ui.interruptMatchButton) ui.interruptMatchButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (state.computerTurnTimer) {
    window.clearTimeout(state.computerTurnTimer);
    state.computerTurnTimer = null;
  }
  state.ui.matchAbortPromptOpen = true;
  showSimpleModal({
    title: "Abort Match",
    body: "Return to character selection? The current match progress will be lost.",
    buttons: [
      { label: "Cancel", style: "ghost", onClick: () => {
        state.ui.matchAbortPromptOpen = false;
        closeTopModal();
        const currentPlayer = getCurrentPlayer();
        if (currentPlayer && isComputerPlayer(currentPlayer) && !state.gameOver && !state.setupSelection.active) {
          scheduleComputerTurn(320);
        }
      } },
      { label: "Abort", style: "primary", onClick: () => {
        state.ui.matchAbortPromptOpen = false;
        closeTopModal();
        abortMatchToCharacterSelection();
      } }
    ]
  });
});
document.addEventListener("fullscreenchange", updateFullscreenButton);
if (ui.itemToggleButton) ui.itemToggleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  useItemFlow();
});
if (ui.swapToggleButton) ui.swapToggleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  swapCharacterFlow();
});
if (ui.logToggleButton) ui.logToggleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (state.ui.rightPanelMode === "log") {
    state.ui.rightPanelMode = null;
  } else {
    state.ui.rightPanelMode = "log";
    state.ui.logRoundFilter = state.round;
    state.ui.skillPanelOpen = false;
  }
  renderExpandablePanels();
});
if (ui.skillToggleButton) ui.skillToggleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  state.ui.skillPanelOpen = !state.ui.skillPanelOpen;
  if (state.ui.skillPanelOpen) state.ui.rightPanelMode = null;
  renderExpandablePanels();
});

function toggleDiceBubbleControl() {
  if (!ui.rollDiceButton || ui.rollDiceButton.disabled) return;
  state.ui.diceBubbleOpen = !state.ui.diceBubbleOpen;
  if (state.ui.diceBubbleOpen) state.ui.restBubbleOpen = false;
  renderExpandablePanels();
}

function toggleRestBubbleControl() {
  if (!ui.restButton || ui.restButton.disabled) return;
  state.ui.restBubbleOpen = !state.ui.restBubbleOpen;
  if (state.ui.restBubbleOpen) state.ui.diceBubbleOpen = false;
  renderExpandablePanels();
}

function isPointInsideElement(element, clientX, clientY) {
  if (!element || element.disabled || element.classList?.contains("hidden")) return false;
  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}

function handleDockPointerByCoordinates(event) {
  if (!event.isPrimary && event.pointerType !== "mouse") return;
  if (handleBoardTilePointSelection(event)) return;
  const { clientX, clientY } = event;
  const confirmRollButton = document.getElementById("confirmRollDiceButton");
  const confirmRestButton = document.getElementById("confirmRestButton");

  if (isPointInsideElement(confirmRollButton, clientX, clientY)) {
    event.preventDefault();
    event.stopPropagation();
    state.ui.lastBubblePointerConfirmAt = performance.now();
    confirmRollDiceFromBubble();
    return;
  }

  if (isPointInsideElement(confirmRestButton, clientX, clientY)) {
    event.preventDefault();
    event.stopPropagation();
    state.ui.lastBubblePointerConfirmAt = performance.now();
    confirmRestFromBubble();
    return;
  }

  if (isPointInsideElement(ui.rollDiceButton, clientX, clientY)) {
    event.preventDefault();
    event.stopPropagation();
    state.ui.lastDockPointerToggleAt = performance.now();
    toggleDiceBubbleControl();
    return;
  }

  if (isPointInsideElement(ui.restButton, clientX, clientY)) {
    event.preventDefault();
    event.stopPropagation();
    state.ui.lastDockPointerToggleAt = performance.now();
    toggleRestBubbleControl();
  }
}

if (ui.rollDiceButton) ui.rollDiceButton.addEventListener("pointerup", (event) => {
  if (event.pointerType === "mouse") return;
  event.preventDefault();
  event.stopPropagation();
  state.ui.lastDockPointerToggleAt = performance.now();
  toggleDiceBubbleControl();
});

if (ui.rollDiceButton) ui.rollDiceButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (performance.now() - (state.ui.lastDockPointerToggleAt || 0) < 350) return;
  toggleDiceBubbleControl();
});

if (ui.restButton) ui.restButton.addEventListener("pointerup", (event) => {
  if (event.pointerType === "mouse") return;
  event.preventDefault();
  event.stopPropagation();
  state.ui.lastDockPointerToggleAt = performance.now();
  toggleRestBubbleControl();
});

if (ui.restButton) ui.restButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (performance.now() - (state.ui.lastDockPointerToggleAt || 0) < 350) return;
  toggleRestBubbleControl();
});
if (ui.cameraActionButton) ui.cameraActionButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleCameraInputMode();
});

if (ui.zoomSlider) ui.zoomSlider.addEventListener("input", (event) => {
  event.stopPropagation();
  const value = Number(event.currentTarget.value);
  state.camera.zoom = Math.max(0.4, Math.min(1.6, value / 100));
  applyCameraTransform();
  renderZoomDock();
});

if (ui.zoomResetButton) ui.zoomResetButton.addEventListener("click", (event) => {
  event.stopPropagation();
  state.camera.zoom = 1;
  state.camera.panX = 0;
  state.camera.panY = 0;
  state.camera.padKnobX = 0;
  state.camera.padKnobY = 0;
  state.camera.padVelocityX = 0;
  state.camera.padVelocityY = 0;
  if (state.camera.padAnimationFrame) {
    cancelAnimationFrame(state.camera.padAnimationFrame);
    state.camera.padAnimationFrame = null;
  }
  applyCameraTransform();
  renderZoomDock();
});

function startCameraPadMotion() {
  if (state.camera.padAnimationFrame !== null) return;
  const step = () => {
    if (!state.camera.padDragging) {
      state.camera.padAnimationFrame = null;
      return;
    }
    state.camera.panX += state.camera.padVelocityX;
    state.camera.panY += state.camera.padVelocityY;
    applyCameraTransform();
    state.camera.padAnimationFrame = requestAnimationFrame(step);
  };
  state.camera.padAnimationFrame = requestAnimationFrame(step);
}

function updateCameraPadFromEvent(event) {
  if (!ui.cameraPad) return;
  const rect = ui.cameraPad.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let deltaX = event.clientX - centerX;
  let deltaY = event.clientY - centerY;
  const maxRadius = Math.min(rect.width, rect.height) * 0.22;
  const distance = Math.hypot(deltaX, deltaY);
  if (distance > maxRadius && distance > 0) {
    const ratio = maxRadius / distance;
    deltaX *= ratio;
    deltaY *= ratio;
  }
  state.camera.padKnobX = deltaX;
  state.camera.padKnobY = deltaY;
  const normalizedX = maxRadius ? deltaX / maxRadius : 0;
  const normalizedY = maxRadius ? deltaY / maxRadius : 0;
  state.camera.padVelocityX = -normalizedX * 1.25;
  state.camera.padVelocityY = -normalizedY * 1.25;
  renderZoomDock();
  startCameraPadMotion();
}

function resetCameraPadKnob() {
  state.camera.padDragging = false;
  state.camera.padPointerId = null;
  state.camera.padKnobX = 0;
  state.camera.padKnobY = 0;
  state.camera.padVelocityX = 0;
  state.camera.padVelocityY = 0;
  if (state.camera.padAnimationFrame !== null) {
    cancelAnimationFrame(state.camera.padAnimationFrame);
    state.camera.padAnimationFrame = null;
  }
  renderZoomDock();
}

if (ui.cameraPad) {
  ui.cameraPad.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    state.camera.padDragging = true;
    state.camera.padPointerId = event.pointerId;
    ui.cameraPad.setPointerCapture(event.pointerId);
    updateCameraPadFromEvent(event);
  });
  ui.cameraPad.addEventListener("pointermove", (event) => {
    if (!state.camera.padDragging || state.camera.padPointerId !== event.pointerId) return;
    updateCameraPadFromEvent(event);
  });
  const releasePad = (event) => {
    if (state.camera.padPointerId !== event.pointerId) return;
    resetCameraPadKnob();
  };
  ui.cameraPad.addEventListener("pointerup", releasePad);
  ui.cameraPad.addEventListener("pointercancel", releasePad);
}
if (ui.playerSummaryDock) {
  ui.playerSummaryDock.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });
}
if (ui.rightOverlayPanel) {
  ui.rightOverlayPanel.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });
}

if (ui.playerDrawerToggle) {
  ui.playerDrawerToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    state.ui.summaryDrawerOpen = !state.ui.summaryDrawerOpen;
    renderPlayerPanels();
  });
}

window.addEventListener('resize', () => requestAnimationFrame(updateDrawerCollapsedOffset));

if (ui.playerSummaryTabs) ui.playerSummaryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-summary-index]");
  if (!button) return;
  event.stopPropagation();
  const idx = Number(button.dataset.summaryIndex);
  if (state.selectedPlayerSummaryIndex === idx && state.ui.summaryPanelOpen) {
    state.ui.summaryPanelOpen = false;
  } else {
    state.selectedPlayerSummaryIndex = idx;
    state.ui.summaryPanelOpen = true;
  }
  renderPlayerPanels();
});

const pullToRefreshState = {
  startY: 0,
  scrollableTopAtStart: 0,
  scrollableElement: null
};

function shouldBlockPullToRefresh() {
  return false;
}

function findVerticalScrollableAncestor(target) {
  let node = target;
  while (node && node !== document.body) {
    if (node instanceof HTMLElement) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      const canScroll = (overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight + 2;
      if (canScroll) return node;
    }
    node = node.parentElement;
  }
  return null;
}

document.addEventListener("touchstart", (event) => {
  if (!shouldBlockPullToRefresh()) return;
  if (event.touches.length !== 1) return;
  pullToRefreshState.startY = event.touches[0].clientY;
  pullToRefreshState.scrollableElement = findVerticalScrollableAncestor(event.target);
  pullToRefreshState.scrollableTopAtStart = pullToRefreshState.scrollableElement ? pullToRefreshState.scrollableElement.scrollTop : 0;
}, { passive: true });

document.addEventListener("touchmove", (event) => {
  if (!shouldBlockPullToRefresh()) return;
  if (event.touches.length !== 1) return;
  const currentY = event.touches[0].clientY;
  const deltaY = currentY - pullToRefreshState.startY;
  if (deltaY <= 0) return;
  const scrollable = pullToRefreshState.scrollableElement;
  if (!scrollable) {
    event.preventDefault();
    return;
  }
  if (pullToRefreshState.scrollableTopAtStart <= 0 && scrollable.scrollTop <= 0) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener("pointerdown", (event) => {
  if (ui.modalRoot.children.length) return;
  const target = event.target;
  if (state.ui.swapBubbleOpen && ui.swapBubble && !ui.swapBubble.contains(target) && !ui.swapToggleButton.contains(target)) {
    state.ui.swapBubbleOpen = false;
  }
  if (
    state.ui.skillPanelOpen
    && ui.skillToggleButton
    && !ui.skillToggleButton.contains(target)
    && (!ui.rightOverlayPanel || !ui.rightOverlayPanel.contains(target))
  ) {
    state.ui.skillPanelOpen = false;
  }
  if (state.ui.diceBubbleOpen && ui.diceBubble && !ui.diceBubble.contains(target) && !ui.rollDiceButton.contains(target)) {
    state.ui.diceBubbleOpen = false;
  }
  if (state.ui.restBubbleOpen && ui.restBubble && !ui.restBubble.contains(target) && !ui.restButton.contains(target)) {
    state.ui.restBubbleOpen = false;
  }
  if (state.ui.itemTrayOpen && ui.itemTray && !ui.itemTray.contains(target) && !ui.itemToggleButton.contains(target) && (!ui.rightOverlayPanel || !ui.rightOverlayPanel.contains(target))) {
    state.ui.itemTrayOpen = true;
    if (state.ui.rightPanelMode === "item") {
      state.ui.rightPanelMode = null;
      state.ui.selectedItemIndex = null;
    }
  }
  if (
    state.ui.rightPanelMode &&
    ui.rightOverlayPanel &&
    !ui.rightOverlayPanel.contains(target) &&
    !ui.logToggleButton.contains(target) &&
    !(ui.itemToggleButton && ui.itemToggleButton.contains(target)) &&
    !target.closest("[data-character-slot]")
  ) {
    state.ui.rightPanelMode = null;
    state.ui.selectedCharacterInspect = null;
  }
  renderExpandablePanels();
});

ui.cameraFrame.addEventListener("pointerdown", (event) => {
  if (state.rotationLocked && !state.allowFreeCameraDuringInput && state.currentAction !== "camera") return;
  state.camera.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  ui.cameraFrame.setPointerCapture(event.pointerId);

  if (state.camera.activePointers.size >= 2) {
    beginPinchZoom();
    return;
  }

  state.camera.pinchActive = false;
  state.camera.dragging = true;
  state.camera.pointerId = event.pointerId;
  state.camera.startX = event.clientX;
  state.camera.startY = event.clientY;
  state.camera.lastX = event.clientX;
  state.camera.lastY = event.clientY;
  state.camera.moved = false;
});

ui.cameraFrame.addEventListener("pointermove", (event) => {
  if (state.camera.activePointers.has(event.pointerId)) {
    state.camera.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }

  if (state.camera.pinchActive) {
    updatePinchZoom();
    return;
  }

  if (!state.camera.dragging || state.camera.pointerId !== event.pointerId) return;
  const totalDeltaX = event.clientX - state.camera.startX;
  const totalDeltaY = event.clientY - state.camera.startY;
  const travel = Math.hypot(totalDeltaX, totalDeltaY);

  if (!state.camera.moved) {
    if (travel < 8) {
      return;
    }
    state.camera.moved = true;
    state.camera.suppressTileClickUntil = performance.now() + 220;
  }

  const deltaX = event.clientX - state.camera.lastX;
  const deltaY = event.clientY - state.camera.lastY;
  state.camera.lastX = event.clientX;
  state.camera.lastY = event.clientY;
  state.camera.yaw -= deltaX * 0.35;
  state.camera.tilt = Math.max(15, Math.min(90, state.camera.tilt - deltaY * 0.18));
  applyCameraTransform();
});

function stopCameraDrag(event) {
  state.camera.activePointers.delete(event.pointerId);

  if (state.camera.pinchActive) {
    if (state.camera.activePointers.size >= 2) {
      updatePinchZoom();
      return;
    }
    state.camera.pinchActive = false;
    state.camera.dragging = false;
    state.camera.pointerId = null;
    state.camera.suppressTileClickUntil = performance.now() + 220;
    return;
  }

  if (state.camera.pointerId !== event.pointerId) return;
  if (state.camera.moved) {
    state.camera.suppressTileClickUntil = performance.now() + 220;
  }
  state.camera.dragging = false;
  state.camera.pointerId = null;
}

ui.cameraFrame.addEventListener("pointerup", stopCameraDrag);
ui.cameraFrame.addEventListener("pointercancel", stopCameraDrag);

initSetupFlow();
document.addEventListener("pointerdown", interceptGuestRoomPointerDown, true);
document.addEventListener("pointerup", handleDockPointerByCoordinates, true);
document.addEventListener("click", interceptGuestRoomClick, true);
connectHubRoom();
