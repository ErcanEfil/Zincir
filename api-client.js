// API Client for Football Player Database
class DatabaseAPI {
    constructor() {
        this.baseURL = 'http://localhost:3001/api';
        this.cache = {
            playersDatabase: null,
            clubsDatabase: null,
            lastFetch: null,
            cacheDuration: 5 * 60 * 1000 // 5 minutes
        };
    }

    // Check if cache is valid
    isCacheValid() {
        if (!this.cache.lastFetch || !this.cache.playersDatabase) {
            return false;
        }
        return (Date.now() - this.cache.lastFetch) < this.cache.cacheDuration;
    }

    // Fetch all players from API
    async fetchPlayers() {
        try {
            console.log('🔄 Fetching players from MongoDB...');
            const response = await fetch(`${this.baseURL}/players`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch players');
            }
            
            // Cache the data
            this.cache.playersDatabase = result.data.playersDatabase;
            this.cache.clubsDatabase = result.data.clubsDatabase;
            this.cache.lastFetch = Date.now();
            
            console.log(`✅ Loaded ${result.data.totalPlayers} players and ${result.data.totalClubs} clubs from MongoDB`);
            
            return result.data;
            
        } catch (error) {
            console.error('❌ Error fetching from MongoDB:', error);
            
            // Try to use cached data as fallback
            if (this.cache.playersDatabase) {
                console.log('⚠️ Using cached data as fallback');
                return {
                    playersDatabase: this.cache.playersDatabase,
                    clubsDatabase: this.cache.clubsDatabase
                };
            }
            
            // If no cache, use fallback local data
            console.log('⚠️ Using local fallback data');
            return this.getFallbackData();
        }
    }

    // Get players database (with caching)
    async getPlayersDatabase() {
        if (this.isCacheValid()) {
            console.log('✅ Using cached player data');
            return {
                playersDatabase: this.cache.playersDatabase,
                clubsDatabase: this.cache.clubsDatabase
            };
        }
        
        return await this.fetchPlayers();
    }

    // Add new player to database
    async addPlayer(playerData) {
        try {
            const response = await fetch(`${this.baseURL}/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerData)
            });
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Failed to add player');
            }
            
            // Invalidate cache
            this.cache.lastFetch = null;
            
            console.log(`✅ Added player: ${playerData.name}`);
            return result;
            
        } catch (error) {
            console.error('❌ Error adding player:', error);
            throw error;
        }
    }

    // Search players
    async searchPlayers(query) {
        try {
            const params = new URLSearchParams();
            if (query.name) params.append('q', query.name);
            if (query.club) params.append('club', query.club);
            if (query.nationality) params.append('nationality', query.nationality);
            if (query.position) params.append('position', query.position);
            
            const response = await fetch(`${this.baseURL}/search/players?${params}`);
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Search failed');
            }
            
            return result.data;
            
        } catch (error) {
            console.error('❌ Error searching players:', error);
            return [];
        }
    }

    // Get API health status
    async getHealthStatus() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                error: 'API not reachable'
            };
        }
    }

    // Fallback data in case API is not available
    getFallbackData() {
        return {
            playersDatabase: {
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
                "Hakan Çalhanoğlu": {
                    clubs: ["Karlsruher SC", "Hamburger SV", "Bayer Leverkusen", "AC Milan", "Inter Milan"],
                    nationality: "🇹🇷",
                    position: "Midfielder",
                    hint: "Turkish playmaker with excellent free-kick ability"
                }
            },
            clubsDatabase: {
                "FC Barcelona": ["Lionel Messi"],
                "Paris Saint-Germain": ["Lionel Messi"],
                "Inter Miami": ["Lionel Messi"],
                "Manchester United": ["Cristiano Ronaldo"],
                "Real Madrid": ["Cristiano Ronaldo"],
                "AC Milan": ["Hakan Çalhanoğlu"],
                "Inter Milan": ["Hakan Çalhanoğlu"]
            }
        };
    }

    // Clear cache
    clearCache() {
        this.cache = {
            playersDatabase: null,
            clubsDatabase: null,
            lastFetch: null,
            cacheDuration: this.cache.cacheDuration
        };
        console.log('🗑️ Cache cleared');
    }
}

// Global instance
window.databaseAPI = new DatabaseAPI();
