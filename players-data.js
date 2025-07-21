// Football players database with their clubs
const playersDatabase = {
    "Lionel Messi": {
        clubs: ["FC Barcelona", "Paris Saint-Germain", "Inter Miami"],
        nationality: "🇦🇷",
        position: "Forward",
        hint: "Argentine superstar who won 8 Ballon d'Or awards"
    },
    "Cristiano Ronaldo": {
        clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
        nationality: "🇵🇹",
        position: "Forward",
        hint: "Portuguese legend known for his incredible goal-scoring record"
    },
    "Neymar Jr": {
        clubs: ["Santos", "FC Barcelona", "Paris Saint-Germain", "Al Hilal"],
        nationality: "🇧🇷",
        position: "Forward",
        hint: "Brazilian playmaker famous for his skills and tricks"
    },
    "Kylian Mbappé": {
        clubs: ["AS Monaco", "Paris Saint-Germain", "Real Madrid"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French speedster and World Cup winner"
    },
    "Erling Haaland": {
        clubs: ["Molde FK", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"],
        nationality: "🇳🇴",
        position: "Forward",
        hint: "Norwegian goal machine with incredible pace and power"
    },
    "Kevin De Bruyne": {
        clubs: ["Genk", "Chelsea", "VfL Wolfsburg", "Manchester City"],
        nationality: "🇧🇪",
        position: "Midfielder",
        hint: "Belgian maestro known for his passing and assists"
    },
    "Virgil van Dijk": {
        clubs: ["Willem II", "FC Groningen", "Celtic", "Southampton", "Liverpool"],
        nationality: "🇳🇱",
        position: "Defender",
        hint: "Dutch colossus who transformed Liverpool's defense"
    },
    "Mohamed Salah": {
        clubs: ["El Mokawloon", "FC Basel", "Chelsea", "ACF Fiorentina", "AS Roma", "Liverpool"],
        nationality: "🇪🇬",
        position: "Forward",
        hint: "Egyptian King who became a Liverpool legend"
    },
    "Luka Modrić": {
        clubs: ["Dinamo Zagreb", "Tottenham Hotspur", "Real Madrid"],
        nationality: "🇭🇷",
        position: "Midfielder",
        hint: "Croatian magician and Ballon d'Or winner"
    },
    "Robert Lewandowski": {
        clubs: ["Znicz Pruszków", "Lech Poznań", "Borussia Dortmund", "Bayern Munich", "FC Barcelona"],
        nationality: "🇵🇱",
        position: "Forward",
        hint: "Polish striker with incredible finishing ability"
    },
    "Sadio Mané": {
        clubs: ["Metz", "Red Bull Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr"],
        nationality: "🇸🇳",
        position: "Forward",
        hint: "Senegalese winger known for his pace and work rate"
    },
    "Harry Kane": {
        clubs: ["Tottenham Hotspur", "Bayern Munich"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Forward",
        hint: "English striker and captain with clinical finishing"
    },
    "Karim Benzema": {
        clubs: ["Olympique Lyonnais", "Real Madrid", "Al Ittihad"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French striker who won Ballon d'Or with Real Madrid"
    },
    "N'Golo Kanté": {
        clubs: ["Boulogne", "Caen", "Leicester City", "Chelsea", "Al Ittihad"],
        nationality: "🇫🇷",
        position: "Midfielder",
        hint: "French midfielder who won Premier League with Leicester"
    },
    "Paul Pogba": {
        clubs: ["Le Havre", "Manchester United", "Juventus"],
        nationality: "🇫🇷",
        position: "Midfielder",
        hint: "French midfielder known for his physical presence and passing"
    },
    "Sergio Ramos": {
        clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain"],
        nationality: "🇪🇸",
        position: "Defender",
        hint: "Spanish defender famous for scoring crucial goals"
    },
    "Toni Kroos": {
        clubs: ["Hansa Rostock", "Bayern Munich", "Real Madrid"],
        nationality: "🇩🇪",
        position: "Midfielder",
        hint: "German midfielder with incredible passing accuracy"
    },
    "Antoine Griezmann": {
        clubs: ["Real Sociedad", "Atlético Madrid", "FC Barcelona"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French forward known for his versatility and celebrations"
    },
    "Jadon Sancho": {
        clubs: ["Watford", "Manchester City", "Borussia Dortmund", "Manchester United"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Forward",
        hint: "English winger who made his name in Germany"
    },
    "Mason Mount": {
        clubs: ["Chelsea", "Manchester United"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Midfielder",
        hint: "English midfielder who came through Chelsea's academy"
    },
    "Pedri": {
        clubs: ["Las Palmas", "FC Barcelona"],
        nationality: "🇪🇸",
        position: "Midfielder",
        hint: "Spanish young talent who won Golden Boy award"
    },
    "Gavi": {
        clubs: ["FC Barcelona"],
        nationality: "🇪🇸",
        position: "Midfielder",
        hint: "Spanish teenager who became Barcelona's youngest ever player in El Clásico"
    },
    "Phil Foden": {
        clubs: ["Manchester City"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Midfielder",
        hint: "English midfielder known as the 'Stockport Iniesta'"
    },
    "Jack Grealish": {
        clubs: ["Aston Villa", "Manchester City"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Forward",
        hint: "English winger famous for his dribbling and low socks"
    },
    "Bukayo Saka": {
        clubs: ["Arsenal"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Forward",
        hint: "English winger who came through Arsenal's Hale End academy"
    },
    "Marcus Rashford": {
        clubs: ["Manchester United"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Forward",
        hint: "English forward known for his pace and social activism"
    },
    "Son Heung-min": {
        clubs: ["Hamburger SV", "Bayer Leverkusen", "Tottenham Hotspur"],
        nationality: "🇰🇷",
        position: "Forward",
        hint: "South Korean forward and Tottenham legend"
    },
    "Manuel Neuer": {
        clubs: ["Schalke 04", "Bayern Munich"],
        nationality: "🇩🇪",
        position: "Goalkeeper",
        hint: "German goalkeeper who revolutionized the sweeper-keeper role"
    },
    "Alisson Becker": {
        clubs: ["Internacional", "AS Roma", "Liverpool"],
        nationality: "🇧🇷",
        position: "Goalkeeper",
        hint: "Brazilian goalkeeper who won Champions League with Liverpool"
    },
    "Jan Oblak": {
        clubs: ["Olimpija Ljubljana", "Benfica", "Atlético Madrid"],
        nationality: "🇸🇮",
        position: "Goalkeeper",
        hint: "Slovenian goalkeeper known for his incredible save percentage"
    },
    
    // Additional Turkish Players
    "Hakan Çalhanoğlu": {
        clubs: ["Karlsruher SC", "Hamburger SV", "Bayer Leverkusen", "AC Milan", "Inter Milan"],
        nationality: "🇹🇷",
        position: "Midfielder",
        hint: "Turkish playmaker with excellent free-kick ability"
    },
    "Burak Yılmaz": {
        clubs: ["Antalyaspor", "Eskişehirspor", "Trabzonspor", "Galatasaray", "Beijing Guoan", "Lille", "Fortuna Sittard"],
        nationality: "🇹🇷",
        position: "Forward",
        hint: "Turkish striker and national team legend"
    },
    "Cenk Tosun": {
        clubs: ["Gaziantepspor", "Everton", "Crystal Palace", "Beşiktaş"],
        nationality: "🇹🇷",
        position: "Forward",
        hint: "Turkish striker who played in Premier League"
    },
    "Çağlar Söyüncü": {
        clubs: ["Altınordu", "Freiburg", "Leicester City", "Atlético Madrid"],
        nationality: "🇹🇷",
        position: "Defender",
        hint: "Turkish center-back who won Premier League with Leicester"
    },
    "Merih Demiral": {
        clubs: ["Alanyaspor", "Sassuolo", "Juventus", "Atalanta", "Al Ahli"],
        nationality: "🇹🇷",
        position: "Defender",
        hint: "Turkish defender who played for Juventus"
    },
    
    // Additional Premier League Stars
    "Bruno Fernandes": {
        clubs: ["Sporting CP", "Manchester United"],
        nationality: "🇵🇹",
        position: "Midfielder",
        hint: "Portuguese midfielder known for penalties and assists"
    },
    "Rúben Dias": {
        clubs: ["Benfica", "Manchester City"],
        nationality: "🇵🇹",
        position: "Defender",
        hint: "Portuguese defender who won Premier League with City"
    },
    "Rodri": {
        clubs: ["Villarreal", "Atlético Madrid", "Manchester City"],
        nationality: "🇪🇸",
        position: "Midfielder",
        hint: "Spanish defensive midfielder and Ballon d'Or winner"
    },
    "Declan Rice": {
        clubs: ["West Ham United", "Arsenal"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Midfielder",
        hint: "English midfielder who captained West Ham"
    },
    "Raheem Sterling": {
        clubs: ["Liverpool", "Manchester City", "Chelsea"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Forward",
        hint: "English winger who won multiple titles with City"
    },
    "Thiago Silva": {
        clubs: ["Fluminense", "AC Milan", "Paris Saint-Germain", "Chelsea"],
        nationality: "🇧🇷",
        position: "Defender",
        hint: "Brazilian defender who played for top European clubs"
    },
    
    // La Liga Legends
    "Vinicius Jr": {
        clubs: ["Flamengo", "Real Madrid"],
        nationality: "🇧🇷",
        position: "Forward",
        hint: "Brazilian winger who won Champions League with Real Madrid"
    },
    "Jude Bellingham": {
        clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Midfielder",
        hint: "English midfielder who moved to Real Madrid"
    },
    "Ousmane Dembélé": {
        clubs: ["Rennes", "Borussia Dortmund", "FC Barcelona", "Paris Saint-Germain"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French winger known for his pace and dribbling"
    },
    "João Félix": {
        clubs: ["Benfica", "Atlético Madrid", "Chelsea", "FC Barcelona"],
        nationality: "🇵🇹",
        position: "Forward",
        hint: "Portuguese forward who moved from Benfica for big money"
    },
    "Pedri": {
        clubs: ["Las Palmas", "FC Barcelona"],
        nationality: "🇪🇸",
        position: "Midfielder",
        hint: "Spanish young talent who won Golden Boy award"
    },
    "Gavi": {
        clubs: ["FC Barcelona"],
        nationality: "🇪🇸",
        position: "Midfielder",
        hint: "Spanish teenager who became Barcelona's youngest ever player in El Clásico"
    },
    
    // Serie A Stars
    "Lautaro Martínez": {
        clubs: ["Racing Club", "Inter Milan"],
        nationality: "🇦🇷",
        position: "Forward",
        hint: "Argentine striker who won Serie A with Inter"
    },
    "Federico Chiesa": {
        clubs: ["Fiorentina", "Juventus"],
        nationality: "🇮🇹",
        position: "Forward",
        hint: "Italian winger known for his pace and direct style"
    },
    "Nicolo Barella": {
        clubs: ["Cagliari", "Inter Milan"],
        nationality: "🇮🇹",
        position: "Midfielder",
        hint: "Italian midfielder who won Euro 2020"
    },
    "Rafael Leão": {
        clubs: ["Sporting CP", "Lille", "AC Milan"],
        nationality: "🇵🇹",
        position: "Forward",
        hint: "Portuguese winger who won Serie A with Milan"
    },
    "Victor Osimhen": {
        clubs: ["VfL Wolfsburg", "Charleroi", "Lille", "Napoli", "Galatasaray"],
        nationality: "🇳🇬",
        position: "Forward",
        hint: "Nigerian striker who won Serie A with Napoli"
    },
    "Khvicha Kvaratskhelia": {
        clubs: ["Dinamo Batumi", "Rubin Kazan", "Napoli"],
        nationality: "🇬🇪",
        position: "Forward",
        hint: "Georgian winger who helped Napoli win Serie A"
    },
    
    // Bundesliga Talents
    "Jamal Musiala": {
        clubs: ["Chelsea", "Bayern Munich"],
        nationality: "🇩🇪",
        position: "Forward",
        hint: "German attacking midfielder who came through Chelsea academy"
    },
    "Florian Wirtz": {
        clubs: ["Bayer Leverkusen"],
        nationality: "🇩🇪",
        position: "Midfielder",
        hint: "German attacking midfielder, one of the most promising talents"
    },
    "Jude Leão": {
        clubs: ["Sporting CP", "Lille", "AC Milan"],
        nationality: "🇵🇹",
        position: "Forward",
        hint: "Portuguese winger who won Serie A with Milan"
    },
    "Christopher Nkunku": {
        clubs: ["Paris Saint-Germain", "RB Leipzig", "Chelsea"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French versatile attacker who moved to Chelsea"
    },
    "Dayot Upamecano": {
        clubs: ["Red Bull Salzburg", "RB Leipzig", "Bayern Munich"],
        nationality: "🇫🇷",
        position: "Defender",
        hint: "French center-back who won Champions League with Bayern"
    },
    
    // Ligue 1 Stars
    "Achraf Hakimi": {
        clubs: ["Real Madrid", "Borussia Dortmund", "Inter Milan", "Paris Saint-Germain"],
        nationality: "🇲🇦",
        position: "Defender",
        hint: "Moroccan fullback known for his pace and attacking"
    },
    "Randal Kolo Muani": {
        clubs: ["FC Nantes", "Eintracht Frankfurt", "Paris Saint-Germain"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French striker who starred at 2022 World Cup"
    },
    "Vitinha": {
        clubs: ["FC Porto", "Paris Saint-Germain"],
        nationality: "🇵🇹",
        position: "Midfielder",
        hint: "Portuguese midfielder who moved to PSG from Porto"
    },
    
    // Additional Liverpool Players
    "Darwin Núñez": {
        clubs: ["Peñarol", "Almería", "Benfica", "Liverpool"],
        nationality: "🇺🇾",
        position: "Forward",
        hint: "Uruguayan striker who moved to Liverpool for big money"
    },
    "Luis Díaz": {
        clubs: ["Atlético Junior", "FC Porto", "Liverpool"],
        nationality: "🇨🇴",
        position: "Forward",
        hint: "Colombian winger who joined Liverpool from Porto"
    },
    "Cody Gakpo": {
        clubs: ["PSV Eindhoven", "Liverpool"],
        nationality: "🇳🇱",
        position: "Forward",
        hint: "Dutch forward who starred at 2022 World Cup"
    },
    
    // Additional Arsenal Players
    "Gabriel Jesus": {
        clubs: ["Palmeiras", "Manchester City", "Arsenal"],
        nationality: "🇧🇷",
        position: "Forward",
        hint: "Brazilian striker who moved from City to Arsenal"
    },
    "Martin Ødegaard": {
        clubs: ["Strømsgodset", "Real Madrid", "Arsenal"],
        nationality: "🇳🇴",
        position: "Midfielder",
        hint: "Norwegian playmaker and Arsenal captain"
    },
    "William Saliba": {
        clubs: ["Saint-Étienne", "Arsenal"],
        nationality: "🇫🇷",
        position: "Defender",
        hint: "French center-back who developed into Arsenal's key defender"
    },
    
    // Additional Manchester United Players
    "Casemiro": {
        clubs: ["São Paulo", "Real Madrid", "Manchester United"],
        nationality: "🇧🇷",
        position: "Midfielder",
        hint: "Brazilian defensive midfielder who won Champions League with Real"
    },
    "Raphaël Varane": {
        clubs: ["RC Lens", "Real Madrid", "Manchester United"],
        nationality: "🇫🇷",
        position: "Defender",
        hint: "French defender who won World Cup and Champions League"
    },
    "Antony": {
        clubs: ["São Paulo", "Ajax", "Manchester United"],
        nationality: "🇧🇷",
        position: "Forward",
        hint: "Brazilian winger who reunited with Ten Hag at United"
    },
    
    // Chelsea Players
    "Enzo Fernández": {
        clubs: ["River Plate", "Benfica", "Chelsea"],
        nationality: "🇦🇷",
        position: "Midfielder",
        hint: "Argentine midfielder who won World Cup 2022"
    },
    "Mykhailo Mudryk": {
        clubs: ["Shakhtar Donetsk", "Chelsea"],
        nationality: "🇺🇦",
        position: "Forward",
        hint: "Ukrainian winger who joined Chelsea for big money"
    },
    "Reece James": {
        clubs: ["Chelsea"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Defender",
        hint: "English fullback who came through Chelsea academy"
    },
    
    // Tottenham Players
    "James Maddison": {
        clubs: ["Norwich City", "Leicester City", "Tottenham Hotspur"],
        nationality: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Midfielder",
        hint: "English playmaker who moved from Leicester to Spurs"
    },
    "Pedro Porro": {
        clubs: ["Girona", "Real Madrid", "Sporting CP", "Tottenham Hotspur"],
        nationality: "🇪🇸",
        position: "Defender",
        hint: "Spanish fullback who joined Spurs from Sporting"
    },
    
    // Newcastle United
    "Alexander Isak": {
        clubs: ["AIK", "Borussia Dortmund", "Real Sociedad", "Newcastle United"],
        nationality: "🇸🇪",
        position: "Forward",
        hint: "Swedish striker who joined Newcastle for club record fee"
    },
    "Bruno Guimarães": {
        clubs: ["Audax", "Athletico Paranaense", "Olympique Lyonnais", "Newcastle United"],
        nationality: "🇧🇷",
        position: "Midfielder",
        hint: "Brazilian midfielder who transformed Newcastle"
    },
    
    // West Ham
    "Lucas Paquetá": {
        clubs: ["Flamengo", "AC Milan", "Olympique Lyonnais", "West Ham United"],
        nationality: "🇧🇷",
        position: "Midfielder",
        hint: "Brazilian playmaker who joined West Ham from Lyon"
    },
    
    // Brighton
    "Kaoru Mitoma": {
        clubs: ["Kawasaki Frontale", "Brighton & Hove Albion"],
        nationality: "🇯🇵",
        position: "Forward",
        hint: "Japanese winger who became Brighton's key player"
    },
    
    // AC Milan
    "Mike Maignan": {
        clubs: ["Paris Saint-Germain", "Lille", "AC Milan"],
        nationality: "🇫🇷",
        position: "Goalkeeper",
        hint: "French goalkeeper who replaced Donnarumma at Milan"
    },
    "Theo Hernández": {
        clubs: ["Atlético Madrid", "Deportivo Alavés", "Real Madrid", "Real Sociedad", "AC Milan"],
        nationality: "🇫🇷",
        position: "Defender",
        hint: "French fullback who became Milan's attacking weapon"
    },
    
    // Real Madrid Additional
    "Eduardo Camavinga": {
        clubs: ["Rennes", "Real Madrid"],
        nationality: "🇫🇷",
        position: "Midfielder",
        hint: "French midfielder who joined Real Madrid very young"
    },
    "Aurélien Tchouaméni": {
        clubs: ["Bordeaux", "AS Monaco", "Real Madrid"],
        nationality: "🇫🇷",
        position: "Midfielder",
        hint: "French defensive midfielder who joined Real from Monaco"
    }
};

// Create reverse lookup for clubs to players
const clubsDatabase = {};

// Populate clubs database
Object.keys(playersDatabase).forEach(player => {
    playersDatabase[player].clubs.forEach(club => {
        if (!clubsDatabase[club]) {
            clubsDatabase[club] = [];
        }
        clubsDatabase[club].push(player);
    });
});

// Normalize club names for better matching
function normalizeClubName(clubName) {
    return clubName.toLowerCase()
        .replace(/fc |cf |ac |sc |afc |bfc |cfc |dfc |efc |ffc |gfc |hfc |ifc |jfc |kfc |lfc |mfc |nfc |ofc |pfc |qfc |rfc |sfc |tfc |ufc |vfc |wfc |xfc |yfc |zfc /g, '')
        .replace(/ fc| cf| ac| sc| afc| bfc| cfc| dfc| efc| ffc| gfc| hfc| ifc| jfc| kfc| lfc| mfc| nfc| ofc| pfc| qfc| rfc| sfc| tfc| ufc| vfc| wfc| xfc| yfc| zfc/g, '')
        .replace(/\./g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Function to find club matches
function findClubMatches(userInput) {
    const normalizedInput = normalizeClubName(userInput);
    const matches = [];
    
    Object.keys(clubsDatabase).forEach(club => {
        const normalizedClub = normalizeClubName(club);
        if (normalizedClub.includes(normalizedInput) || normalizedInput.includes(normalizedClub)) {
            matches.push(club);
        }
    });
    
    return matches;
}

// Export for use in game.js
window.playersDatabase = playersDatabase;
window.clubsDatabase = clubsDatabase;
window.normalizeClubName = normalizeClubName;
window.findClubMatches = findClubMatches;
