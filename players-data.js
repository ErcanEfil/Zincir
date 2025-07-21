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
