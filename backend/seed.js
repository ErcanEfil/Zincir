const mongoose = require('mongoose');
require('dotenv').config();

// Player Schema
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    clubs: [{ type: String, required: true }],
    nationality: { type: String, required: true },
    position: { type: String, required: true },
    hint: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

// Sample data from your current database
const playersData = [
    {
        name: "Lionel Messi",
        clubs: ["FC Barcelona", "Paris Saint-Germain", "Inter Miami"],
        nationality: "🇦🇷",
        position: "Forward",
        hint: "Argentine superstar who won 8 Ballon d'Or awards"
    },
    {
        name: "Cristiano Ronaldo",
        clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
        nationality: "🇵🇹",
        position: "Forward",
        hint: "Portuguese legend known for his incredible goal-scoring record"
    },
    {
        name: "Neymar Jr",
        clubs: ["Santos", "FC Barcelona", "Paris Saint-Germain", "Al Hilal"],
        nationality: "🇧🇷",
        position: "Forward",
        hint: "Brazilian playmaker famous for his skills and tricks"
    },
    {
        name: "Kylian Mbappé",
        clubs: ["AS Monaco", "Paris Saint-Germain", "Real Madrid"],
        nationality: "🇫🇷",
        position: "Forward",
        hint: "French speedster and World Cup winner"
    },
    {
        name: "Hakan Çalhanoğlu",
        clubs: ["Karlsruher SC", "Hamburger SV", "Bayer Leverkusen", "AC Milan", "Inter Milan"],
        nationality: "🇹🇷",
        position: "Midfielder",
        hint: "Turkish playmaker with excellent free-kick ability"
    },
    {
        name: "Burak Yılmaz",
        clubs: ["Antalyaspor", "Eskişehirspor", "Trabzonspor", "Galatasaray", "Beijing Guoan", "Lille", "Fortuna Sittard"],
        nationality: "🇹🇷",
        position: "Forward",
        hint: "Turkish striker and national team legend"
    },
    {
        name: "Erling Haaland",
        clubs: ["Molde FK", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"],
        nationality: "🇳🇴",
        position: "Forward",
        hint: "Norwegian goal machine with incredible pace and power"
    },
    {
        name: "Kevin De Bruyne",
        clubs: ["Genk", "Chelsea", "VfL Wolfsburg", "Manchester City"],
        nationality: "🇧🇪",
        position: "Midfielder",
        hint: "Belgian maestro known for his passing and assists"
    },
    {
        name: "Bruno Fernandes",
        clubs: ["Sporting CP", "Manchester United"],
        nationality: "🇵🇹",
        position: "Midfielder",
        hint: "Portuguese midfielder known for penalties and assists"
    },
    {
        name: "Mohamed Salah",
        clubs: ["El Mokawloon", "FC Basel", "Chelsea", "ACF Fiorentina", "AS Roma", "Liverpool"],
        nationality: "🇪🇬",
        position: "Forward",
        hint: "Egyptian King who became a Liverpool legend"
    }
    // Add more players here from your existing database
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zincir-game', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Player.deleteMany({});
        console.log('🗑️ Cleared existing players');

        // Insert sample data
        await Player.insertMany(playersData);
        console.log(`✅ Inserted ${playersData.length} players`);

        // Create indexes
        await Player.createIndexes();
        console.log('✅ Created indexes');

        // Show some stats
        const totalPlayers = await Player.countDocuments();
        const allPlayers = await Player.find({});
        const allClubs = new Set();
        
        allPlayers.forEach(player => {
            player.clubs.forEach(club => allClubs.add(club));
        });

        console.log('\n📊 Database Stats:');
        console.log(`   Total Players: ${totalPlayers}`);
        console.log(`   Total Clubs: ${allClubs.size}`);
        console.log(`   Sample Players: ${Array.from(allPlayers.slice(0, 3)).map(p => p.name).join(', ')}`);
        
        console.log('\n✅ Database seeded successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Connection closed');
    }
}

// Run the seed function
seedDatabase();
