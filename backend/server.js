const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zincir-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

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

// Create indexes for better performance
playerSchema.index({ name: 1 });
playerSchema.index({ clubs: 1 });
playerSchema.index({ nationality: 1 });

const Player = mongoose.model('Player', playerSchema);

// Routes

// Get all players
app.get('/api/players', async (req, res) => {
    try {
        const players = await Player.find({});
        
        // Convert to the format expected by frontend
        const playersDatabase = {};
        const clubsDatabase = {};
        
        players.forEach(player => {
            playersDatabase[player.name] = {
                clubs: player.clubs,
                nationality: player.nationality,
                position: player.position,
                hint: player.hint
            };
            
            // Build clubs database
            player.clubs.forEach(club => {
                if (!clubsDatabase[club]) {
                    clubsDatabase[club] = [];
                }
                clubsDatabase[club].push(player.name);
            });
        });
        
        res.json({
            success: true,
            data: {
                playersDatabase,
                clubsDatabase,
                totalPlayers: players.length,
                totalClubs: Object.keys(clubsDatabase).length
            }
        });
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch players from database'
        });
    }
});

// Get player by name
app.get('/api/players/:name', async (req, res) => {
    try {
        const player = await Player.findOne({ name: req.params.name });
        if (!player) {
            return res.status(404).json({
                success: false,
                error: 'Player not found'
            });
        }
        res.json({
            success: true,
            data: player
        });
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch player'
        });
    }
});

// Add new player
app.post('/api/players', async (req, res) => {
    try {
        const { name, clubs, nationality, position, hint } = req.body;
        
        if (!name || !clubs || !nationality || !position) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, clubs, nationality, position'
            });
        }
        
        const player = new Player({
            name,
            clubs: Array.isArray(clubs) ? clubs : [clubs],
            nationality,
            position,
            hint: hint || `${nationality} ${position.toLowerCase()}`
        });
        
        await player.save();
        
        res.status(201).json({
            success: true,
            data: player,
            message: 'Player added successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Player already exists'
            });
        }
        console.error('Error adding player:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add player'
        });
    }
});

// Update player
app.put('/api/players/:name', async (req, res) => {
    try {
        const { clubs, nationality, position, hint } = req.body;
        
        const player = await Player.findOneAndUpdate(
            { name: req.params.name },
            { 
                ...(clubs && { clubs: Array.isArray(clubs) ? clubs : [clubs] }),
                ...(nationality && { nationality }),
                ...(position && { position }),
                ...(hint && { hint }),
                updatedAt: Date.now()
            },
            { new: true }
        );
        
        if (!player) {
            return res.status(404).json({
                success: false,
                error: 'Player not found'
            });
        }
        
        res.json({
            success: true,
            data: player,
            message: 'Player updated successfully'
        });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update player'
        });
    }
});

// Delete player
app.delete('/api/players/:name', async (req, res) => {
    try {
        const player = await Player.findOneAndDelete({ name: req.params.name });
        
        if (!player) {
            return res.status(404).json({
                success: false,
                error: 'Player not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Player deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete player'
        });
    }
});

// Search players
app.get('/api/search/players', async (req, res) => {
    try {
        const { q, club, nationality, position } = req.query;
        
        let query = {};
        
        if (q) {
            query.name = { $regex: q, $options: 'i' };
        }
        if (club) {
            query.clubs = { $in: [new RegExp(club, 'i')] };
        }
        if (nationality) {
            query.nationality = nationality;
        }
        if (position) {
            query.position = { $regex: position, $options: 'i' };
        }
        
        const players = await Player.find(query).limit(20);
        
        res.json({
            success: true,
            data: players,
            count: players.length
        });
    } catch (error) {
        console.error('Error searching players:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search players'
        });
    }
});

// Get all clubs
app.get('/api/clubs', async (req, res) => {
    try {
        const clubs = await Player.aggregate([
            { $unwind: '$clubs' },
            { $group: { _id: '$clubs', playerCount: { $sum: 1 } } },
            { $sort: { playerCount: -1 } }
        ]);
        
        res.json({
            success: true,
            data: clubs.map(club => ({
                name: club._id,
                playerCount: club.playerCount
            })),
            totalClubs: clubs.length
        });
    } catch (error) {
        console.error('Error fetching clubs:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch clubs'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Zincir Game API is running!',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
    console.log(`👥 Players API: http://localhost:${PORT}/api/players`);
});

module.exports = app;
