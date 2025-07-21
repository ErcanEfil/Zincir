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

    initializeGame() {
        this.startNewGame();
    }

    setupEventListeners() {
        const input = document.getElementById('user-input');
        const submitBtn = document.getElementById('submit-btn');
        const suggestionsDiv = document.getElementById('suggestions');
        
        // Submit on Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
                this.hideSuggestions();
            }
        });

        // Handle arrow keys and escape for suggestions
        input.addEventListener('keydown', (e) => {
            const suggestions = document.querySelectorAll('.suggestion-item');
            const activeSuggestion = document.querySelector('.suggestion-item.active');
            
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
            } else if (e.key === 'Tab' && activeSuggestion) {
                e.preventDefault();
                input.value = activeSuggestion.textContent;
                this.hideSuggestions();
            } else if (e.key === 'Escape') {
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
        const clubMatches = window.findClubMatches(clubGuess);
        
        // Check if any of the matches are in the player's clubs
        let correctClub = null;
        for (const match of clubMatches) {
            if (playerData.clubs.some(club => 
                window.normalizeClubName(club) === window.normalizeClubName(match)
            )) {
                correctClub = match;
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
        const normalizedGuess = this.normalizePlayerName(playerGuess);
        let foundPlayer = null;

        // Find matching player
        for (const player of Object.keys(window.playersDatabase)) {
            if (this.normalizePlayerName(player) === normalizedGuess) {
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
        if (!playerData.clubs.some(club => 
            window.normalizeClubName(club) === window.normalizeClubName(this.currentClub)
        )) {
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
        const trimmedInput = inputValue.trim().toLowerCase();
        
        if (trimmedInput.length < 2) {
            this.hideSuggestions();
            return;
        }

        let suggestions = [];
        
        if (this.gamePhase === 'club') {
            // Show club suggestions
            suggestions = Object.keys(window.clubsDatabase).filter(club =>
                club.toLowerCase().includes(trimmedInput)
            ).slice(0, 8); // Limit to 8 suggestions
        } else {
            // Show player suggestions from current club
            const playersInClub = window.clubsDatabase[this.currentClub] || [];
            const availablePlayers = playersInClub.filter(player => 
                !this.chain.some(item => item.value === player && item.type === 'player') &&
                player.toLowerCase().includes(trimmedInput)
            );
            suggestions = availablePlayers.slice(0, 8);
        }

        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        suggestionsDiv.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="game.selectSuggestion('${suggestion}')">${suggestion}</div>`
        ).join('');
        
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
