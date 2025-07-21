// Game state management
class FootballChainGame {
    constructor() {
        this.score = 0;
        this.bestScore = this.loadBestScore();
        this.chain = [];
        this.currentPlayer = null;
        this.gamePhase = 'club'; // 'club' or 'player'
        this.currentClub = null;
        this.hintsUsed = 0;
        this.skipsUsed = 0;
        this.maxHints = 3;
        this.maxSkips = 2;
        this.isSubmitting = false;
        this.isLoading = false;
        
        this.initializeGame();
        this.setupEventListeners();
    }

    loadBestScore() {
        const saved = localStorage.getItem('footballChainBestScore');
        return saved ? parseInt(saved) : 0;
    }

    saveBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('footballChainBestScore', this.bestScore.toString());
            return true; // New best score
        }
        return false;
    }

    async initializeGame() {
        await this.loadPlayerDatabase();
        this.startNewGame();
    }

    async loadPlayerDatabase() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showFeedback('🔄 Oyuncu veritabanı yükleniyor...', 'info');
        
        try {
            // Try to load from MongoDB via API
            const data = await window.databaseAPI.getPlayersDatabase();
            
            // Update global variables for compatibility
            window.playersDatabase = data.playersDatabase;
            window.clubsDatabase = data.clubsDatabase;
            
            console.log('✅ Database loaded successfully');
            this.clearFeedback();
            
        } catch (error) {
            console.error('Error loading database:', error);
            
            // Fallback to local data if available
            if (window.playersDatabase) {
                console.log('⚠️ Using local fallback database');
                this.showFeedback('⚠️ Yerel veritabanı kullanılıyor', 'info');
            } else {
                this.showFeedback('❌ Veritabanı yüklenemedi!', 'error');
            }
        } finally {
            this.isLoading = false;
            setTimeout(() => this.clearFeedback(), 2000);
        }
    }

    setupEventListeners() {
        const input = document.getElementById('user-input');
        const submitBtn = document.getElementById('submit-btn');
        const suggestionsDiv = document.getElementById('suggestions');
        
        // Submit on Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const activeSuggestion = document.querySelector('.suggestion-item.active');
                if (activeSuggestion) {
                    // Select the active suggestion
                    this.selectSuggestion(activeSuggestion.textContent);
                } else {
                    // Submit the answer
                    this.submitAnswer();
                }
                this.hideSuggestions();
            }
        });

        // Handle arrow keys and escape for suggestions
        input.addEventListener('keydown', (e) => {
            const suggestions = document.querySelectorAll('.suggestion-item');
            const activeSuggestion = document.querySelector('.suggestion-item.active');
            
            if (suggestions.length === 0) return;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!activeSuggestion) {
                    suggestions[0]?.classList.add('active');
                } else {
                    activeSuggestion.classList.remove('active');
                    const next = activeSuggestion.nextElementSibling;
                    if (next) {
                        next.classList.add('active');
                    } else {
                        suggestions[0]?.classList.add('active');
                    }
                }
                this.scrollToActiveSuggestion();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!activeSuggestion) {
                    suggestions[suggestions.length - 1]?.classList.add('active');
                } else {
                    activeSuggestion.classList.remove('active');
                    const prev = activeSuggestion.previousElementSibling;
                    if (prev) {
                        prev.classList.add('active');
                    } else {
                        suggestions[suggestions.length - 1]?.classList.add('active');
                    }
                }
                this.scrollToActiveSuggestion();
            } else if (e.key === 'Tab' && activeSuggestion) {
                e.preventDefault();
                input.value = activeSuggestion.textContent;
                this.hideSuggestions();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.hideSuggestions();
            }
        });

        // Show suggestions on input
        input.addEventListener('input', (e) => {
            this.showSuggestions(e.target.value);
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                this.hideSuggestions();
            }
        });

        // Submit on button click
        submitBtn.addEventListener('click', () => {
            this.submitAnswer();
        });

        // Auto-focus input
        input.focus();
    }

    startNewGame() {
        this.score = 0;
        this.chain = [];
        this.hintsUsed = 0;
        this.skipsUsed = 0;
        this.gamePhase = 'club';
        this.currentClub = null;
        this.isSubmitting = false;
        
        // Pick a random player
        const players = Object.keys(window.playersDatabase);
        this.currentPlayer = players[Math.floor(Math.random() * players.length)];
        
        this.updateDisplay();
        this.clearFeedback();
        this.clearInput();
        
        // Add starting player to chain
        this.addToChain(this.currentPlayer, 'player');
        
        document.getElementById('user-input').focus();
    }

    submitAnswer() {
        // Prevent multiple submissions
        if (this.isSubmitting) {
            return;
        }
        
        const input = document.getElementById('user-input');
        const answer = input.value.trim();
        
        if (!answer) {
            this.showFeedback('Lütfen bir cevap yazın!', 'error');
            this.shakeInput();
            return;
        }

        this.isSubmitting = true;

        if (this.gamePhase === 'club') {
            this.handleClubGuess(answer);
        } else {
            this.handlePlayerGuess(answer);
        }
        
        // Reset submission flag after a short delay
        setTimeout(() => {
            this.isSubmitting = false;
        }, 100);
    }

    handleClubGuess(clubGuess) {
        const playerData = window.playersDatabase[this.currentPlayer];
        const normalizedGuess = this.normalizeText(clubGuess);
        
        // Find matching club
        let correctClub = null;
        for (const club of playerData.clubs) {
            if (this.normalizeText(club) === normalizedGuess) {
                correctClub = club;
                break;
            }
        }

        if (correctClub) {
            this.currentClub = correctClub;
            this.score += 10;
            this.addToChain(correctClub, 'club');
            this.gamePhase = 'player';
            
            this.showFeedback(`✅ Doğru cevap! ${this.currentPlayer} ${correctClub}'de oynadı. Şimdi ${correctClub}'de oynayan başka bir oyuncu ismi yazın.`, 'success');
            this.updateDisplay();
            this.clearInput();
        } else {
            this.showFeedback(`❌ ${this.currentPlayer} bu takımda hiç oynamadı. Oyun bitti!`, 'error');
            this.gameOver();
        }
    }

    handlePlayerGuess(playerGuess) {
        // Normalize player name
        const normalizedGuess = this.normalizeText(playerGuess);
        let foundPlayer = null;

        // Find matching player
        for (const player of Object.keys(window.playersDatabase)) {
            if (this.normalizeText(player) === normalizedGuess) {
                foundPlayer = player;
                break;
            }
        }

        if (!foundPlayer) {
            this.showFeedback(`❌ "${playerGuess}" oyuncusu veritabanında bulunamadı. Oyun bitti!`, 'error');
            this.gameOver();
            return;
        }

        // Check if already used in chain
        if (this.chain.some(item => item.value === foundPlayer && item.type === 'player')) {
            this.showFeedback(`❌ ${foundPlayer} bu zincirde zaten kullanıldı. Oyun bitti!`, 'error');
            this.gameOver();
            return;
        }

        // Check if player played for current club
        const playerData = window.playersDatabase[foundPlayer];
        const currentClubNormalized = this.normalizeText(this.currentClub);
        const playedForClub = playerData.clubs.some(club => 
            this.normalizeText(club) === currentClubNormalized
        );

        if (!playedForClub) {
            this.showFeedback(`❌ ${foundPlayer} hiç ${this.currentClub}'de oynamadı. Oyun bitti!`, 'error');
            this.gameOver();
            return;
        }

        // Correct answer
        this.score += 15;
        this.addToChain(foundPlayer, 'player');
        
        // Show success message before changing club
        this.showFeedback(`✅ Doğru cevap! ${foundPlayer} gerçekten ${this.currentClub}'de oynadı. Şimdi ${foundPlayer}'ın oynadığı bir takım tahmin edin.`, 'success');
        
        // Update game state
        this.currentPlayer = foundPlayer;
        this.gamePhase = 'club';
        this.currentClub = null;

        this.updateDisplay();
        this.clearInput();
    }

    normalizePlayerName(name) {
        return name.toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' ')    // Replace multiple spaces with single
            .trim();
    }

    normalizeText(text) {
        return text.toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^\w\s]/g, '') // Remove special characters
            .replace(/\s+/g, ' ')    // Replace multiple spaces with single
            .trim();
    }

    calculateMatchScore(text, normalizedInput, originalInput) {
        const normalizedText = this.normalizeText(text);
        const originalText = text.toLowerCase();
        
        // Perfect match
        if (normalizedText === normalizedInput) return 100;
        if (originalText === originalInput.toLowerCase()) return 95;
        
        // Starts with match
        if (normalizedText.startsWith(normalizedInput)) return 90;
        if (originalText.startsWith(originalInput.toLowerCase())) return 85;
        
        // Contains match
        if (normalizedText.includes(normalizedInput)) return 70;
        if (originalText.includes(originalInput.toLowerCase())) return 65;
        
        // Word-based matching
        const inputWords = normalizedInput.split(' ');
        const textWords = normalizedText.split(' ');
        const originalInputWords = originalInput.toLowerCase().split(' ');
        const originalTextWords = originalText.split(' ');
        
        let wordMatches = 0;
        let totalInputWords = inputWords.length;
        
        // Check normalized word matches
        for (const inputWord of inputWords) {
            if (inputWord.length < 2) continue;
            for (const textWord of textWords) {
                if (textWord.startsWith(inputWord) || textWord.includes(inputWord)) {
                    wordMatches++;
                    break;
                }
            }
        }
        
        // Check original word matches
        for (const inputWord of originalInputWords) {
            if (inputWord.length < 2) continue;
            for (const textWord of originalTextWords) {
                if (textWord.startsWith(inputWord) || textWord.includes(inputWord)) {
                    wordMatches += 0.5;
                    break;
                }
            }
        }
        
        if (wordMatches > 0) {
            return Math.min(60, (wordMatches / totalInputWords) * 60);
        }
        
        // Character similarity for very fuzzy matching
        const similarity = this.calculateStringSimilarity(normalizedInput, normalizedText);
        if (similarity > 0.3) {
            return Math.min(40, similarity * 40);
        }
        
        // If input is very short (1-2 chars), be more lenient
        if (normalizedInput.length <= 2) {
            if (normalizedText.includes(normalizedInput)) return 30;
            if (originalText.includes(originalInput.toLowerCase())) return 25;
        }
        
        return 0;
    }

    calculateStringSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.calculateEditDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    calculateEditDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    addToChain(value, type) {
        this.chain.push({ value, type });
        this.updateChainDisplay();
    }

    updateChainDisplay() {
        const chainElement = document.getElementById('player-chain');
        chainElement.innerHTML = '<div class="chain-item start">🎯 Start</div>';
        
        this.chain.forEach((item, index) => {
            const chainItem = document.createElement('div');
            chainItem.className = `chain-item ${item.type}`;
            chainItem.textContent = item.value;
            chainElement.appendChild(chainItem);
        });

        document.getElementById('chain-length').textContent = this.chain.filter(item => item.type === 'player').length;
    }

    updateDisplay() {
        // Update current player
        document.getElementById('current-player').textContent = this.currentPlayer;
        const playerData = window.playersDatabase[this.currentPlayer];
        document.getElementById('player-info').textContent = `${playerData.nationality} ${playerData.position}`;
        
        // Update club info
        const clubInfo = document.getElementById('club-info');
        if (this.gamePhase === 'player' && this.currentClub) {
            clubInfo.textContent = `⚽ ${this.currentClub}`;
            clubInfo.style.display = 'block';
        } else {
            clubInfo.style.display = 'none';
        }
        
        // Update score
        document.getElementById('score').textContent = this.score;
        
        // Update phase text
        const phaseText = document.getElementById('phase-text');
        const input = document.getElementById('user-input');
        
        if (this.gamePhase === 'club') {
            phaseText.textContent = `${this.currentPlayer}'ın oynadığı bir takımı tahmin edin:`;
            input.placeholder = 'Takım adı yazın...';
        } else {
            phaseText.textContent = `${this.currentClub}'de oynayan başka bir oyuncu yazın:`;
            input.placeholder = 'Oyuncu adı yazın...';
        }

        // Update hint section visibility
        document.getElementById('hint-section').style.display = 'block';
        document.getElementById('hint').textContent = '';
        
        // Update best score display
        document.getElementById('best-score').textContent = this.bestScore;
    }

    gameOver() {
        // Save best score if this is a new record
        const isNewBest = this.saveBestScore();
        
        let message = `🔚 Oyun Bitti! Final skorunuz: ${this.score}`;
        if (isNewBest) {
            message += `\n🎉 Yeni rekor! Tebrikler!`;
        }
        
        this.showFeedback(message, 'info');
        
        // Reset game after 3 seconds
        setTimeout(() => {
            this.startNewGame();
        }, 3000);
    }

    showHint() {
        if (this.hintsUsed >= this.maxHints) {
            this.showFeedback('🚫 No more hints available!', 'error');
            return;
        }

        const hintElement = document.getElementById('hint');
        const playerData = window.playersDatabase[this.currentPlayer];

        if (this.gamePhase === 'club') {
            const randomClub = playerData.clubs[Math.floor(Math.random() * playerData.clubs.length)];
            hintElement.textContent = `💡 Hint: One of the clubs is "${randomClub}"`;
        } else {
            const playersInClub = window.clubsDatabase[this.currentClub];
            const availablePlayers = playersInClub.filter(player => 
                !this.chain.some(item => item.value === player && item.type === 'player')
            );
            if (availablePlayers.length > 0) {
                const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
                hintElement.textContent = `💡 Hint: One possible player is "${randomPlayer}"`;
            } else {
                hintElement.textContent = `💡 Hint: Try thinking of famous players from ${this.currentClub}`;
            }
        }

        this.hintsUsed++;
        this.score = Math.max(0, this.score - 5);
        document.getElementById('score').textContent = this.score;
    }

    skipPlayer() {
        if (this.skipsUsed >= this.maxSkips) {
            this.showFeedback('🚫 No more skips available!', 'error');
            return;
        }

        this.skipsUsed++;
        this.score = Math.max(0, this.score - 10);
        
        // Pick new random player
        const players = Object.keys(window.playersDatabase);
        let newPlayer;
        do {
            newPlayer = players[Math.floor(Math.random() * players.length)];
        } while (newPlayer === this.currentPlayer || 
                 this.chain.some(item => item.value === newPlayer && item.type === 'player'));

        this.currentPlayer = newPlayer;
        this.gamePhase = 'club';
        this.currentClub = null;
        
        this.addToChain('⏭️ SKIP', 'skip');
        this.addToChain(newPlayer, 'player');
        
        this.showFeedback(`⏭️ Skipped! New player: ${newPlayer}`, 'info');
        this.updateDisplay();
        this.clearInput();
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        // Auto-clear after 5 seconds
        setTimeout(() => {
            if (feedback.textContent === message) {
                this.clearFeedback();
            }
        }, 5000);
    }

    clearFeedback() {
        const feedback = document.getElementById('feedback');
        feedback.textContent = '';
        feedback.className = 'feedback';
    }

    showSuggestions(inputValue) {
        const suggestionsDiv = document.getElementById('suggestions');
        const trimmedInput = inputValue.trim();
        
        if (trimmedInput.length < 1) { // Reduced from 2 to 1 for more suggestions
            this.hideSuggestions();
            return;
        }

        // Check if databases are loaded
        if (!window.playersDatabase || !window.clubsDatabase) {
            this.hideSuggestions();
            return;
        }

        let suggestions = [];
        const normalizedInput = this.normalizeText(trimmedInput);
        
        if (this.gamePhase === 'club') {
            // Show club suggestions - search in all clubs from playersDatabase
            const allClubs = new Set();
            Object.values(window.playersDatabase).forEach(player => {
                player.clubs.forEach(club => allClubs.add(club));
            });
            
            suggestions = Array.from(allClubs)
                .map(club => ({
                    text: club,
                    score: this.calculateMatchScore(club, normalizedInput, trimmedInput)
                }))
                .filter(item => item.score > 0) // Show any match, even partial
                .sort((a, b) => {
                    // Sort by match score (higher is better)
                    if (a.score !== b.score) return b.score - a.score;
                    return a.text.localeCompare(b.text, 'tr', { sensitivity: 'base' });
                })
                .slice(0, 8)
                .map(item => item.text);
                
        } else {
            // Show player suggestions from current club
            if (!this.currentClub || !window.clubsDatabase[this.currentClub]) {
                this.hideSuggestions();
                return;
            }
            
            const playersInClub = window.clubsDatabase[this.currentClub] || [];
            const availablePlayers = playersInClub.filter(player => {
                const isAlreadyUsed = this.chain.some(item => 
                    item.value === player && item.type === 'player'
                );
                return !isAlreadyUsed;
            });
            
            suggestions = availablePlayers
                .map(player => ({
                    text: player,
                    score: this.calculateMatchScore(player, normalizedInput, trimmedInput)
                }))
                .filter(item => item.score > 0) // Show any match, even partial
                .sort((a, b) => {
                    // Sort by match score (higher is better)
                    if (a.score !== b.score) return b.score - a.score;
                    return a.text.localeCompare(b.text, 'tr', { sensitivity: 'base' });
                })
                .slice(0, 8)
                .map(item => item.text);
        }

        if (suggestions.length === 0) {
            // Even if no matches, show some random suggestions to help user
            if (this.gamePhase === 'club') {
                const allClubs = new Set();
                Object.values(window.playersDatabase).forEach(player => {
                    player.clubs.forEach(club => allClubs.add(club));
                });
                const randomClubs = Array.from(allClubs)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);
                if (randomClubs.length > 0) {
                    suggestions = randomClubs;
                }
            } else if (this.currentClub && window.clubsDatabase[this.currentClub]) {
                const playersInClub = window.clubsDatabase[this.currentClub] || [];
                const availablePlayers = playersInClub.filter(player => 
                    !this.chain.some(item => item.value === player && item.type === 'player')
                );
                const randomPlayers = availablePlayers
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);
                if (randomPlayers.length > 0) {
                    suggestions = randomPlayers;
                }
            }
        }

        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        // Create suggestions with proper HTML escaping and improved onclick handling
        suggestionsDiv.innerHTML = suggestions.map(suggestion => {
            const escapedSuggestion = this.escapeHtml(suggestion);
            return `<div class="suggestion-item" data-suggestion="${escapedSuggestion}">${escapedSuggestion}</div>`;
        }).join('');
        
        // Add click listeners to suggestion items
        const suggestionItems = suggestionsDiv.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                this.selectSuggestion(item.dataset.suggestion);
            });
        });
        
        suggestionsDiv.style.display = 'block';
    }

    hideSuggestions() {
        const suggestionsDiv = document.getElementById('suggestions');
        suggestionsDiv.style.display = 'none';
        suggestionsDiv.innerHTML = '';
    }

    selectSuggestion(suggestion) {
        const input = document.getElementById('user-input');
        input.value = suggestion;
        this.hideSuggestions();
        input.focus();
    }

    scrollToActiveSuggestion() {
        const activeSuggestion = document.querySelector('.suggestion-item.active');
        if (activeSuggestion) {
            activeSuggestion.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }

    clearInput() {
        const input = document.getElementById('user-input');
        input.value = '';
        this.hideSuggestions();
        input.focus();
    }

    shakeInput() {
        const input = document.getElementById('user-input');
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
}

// Global functions for HTML onclick events
function submitAnswer() {
    game.submitAnswer();
}

function newGame() {
    game.startNewGame();
}

function skipPlayer() {
    game.skipPlayer();
}

function showHint() {
    game.showHint();
}

function showRules() {
    document.getElementById('rules-modal').style.display = 'flex';
}

function hideRules() {
    document.getElementById('rules-modal').style.display = 'none';
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new FootballChainGame();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('rules-modal');
    if (e.target === modal) {
        hideRules();
    }
});
