# ⚽ Zincir - Football Player Chain Game

MongoDB entegrasyonlu futbol oyuncuları zincir oyunu.

## 🚀 Kurulum

### 1. MongoDB Kurulumu

#### Seçenek A: MongoDB Atlas (Bulut - Önerilen)
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)'a kaydolun (ücretsiz)
2. Yeni cluster oluşturun
3. Connection string'i kopyalayın
4. `backend/.env` dosyasındaki `MONGODB_URI`'yi güncelleyin

#### Seçenek B: Yerel MongoDB
1. [MongoDB Community](https://www.mongodb.com/try/download/community) indirip kurun
2. MongoDB servisini başlatın:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### 2. Backend Kurulumu
```bash
# Backend klasörüne gidin
cd backend

# Dependencies'leri yükleyin
npm install

# Veritabanını seed edin (ilk kurulumda)
node seed.js

# Server'ı başlatın
npm start
# veya development için:
npm run dev
```

### 3. Frontend Kurulumu
```bash
# Ana klasöre dönün
cd ..

# Live Server ile çalıştırın (VS Code extension)
# veya Python ile:
python -m http.server 8000

# veya Node.js ile:
npx serve .
```

## 📡 API Endpoints

### Players
- `GET /api/players` - Tüm oyuncuları getir
- `POST /api/players` - Yeni oyuncu ekle
- `GET /api/players/:name` - Oyuncu detayları
- `PUT /api/players/:name` - Oyuncu güncelle
- `DELETE /api/players/:name` - Oyuncu sil

### Search & Clubs
- `GET /api/search/players?q=name&club=team&nationality=country` - Oyuncu ara
- `GET /api/clubs` - Tüm takımları getir
- `GET /api/health` - API durumu

### Örnek API Kullanımı

#### Yeni Oyuncu Ekleme:
```javascript
const playerData = {
    name: "Arda Güler",
    clubs: ["Fenerbahçe", "Real Madrid"],
    nationality: "🇹🇷",
    position: "Midfielder",
    hint: "Young Turkish talent who moved to Real Madrid"
};

fetch('http://localhost:3001/api/players', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData)
});
```

## 🎮 Oyun Özellikleri

### Hibrit Veritabanı Sistemi
- ✅ MongoDB'den otomatik veri yükleme
- ✅ 5 dakika cache süresi
- ✅ Offline fallback desteği
- ✅ Gerçek zamanlı güncellemeler

### Oyun Mekaniği
- 🎯 Random oyuncu ile başlama
- ⚽ Takım tahmin etme
- 👤 Oyuncu tahmin etme
- 🏆 Best score sistemi
- 💡 Hint sistemi
- ⏭️ Skip özelliği

## 🔧 Geliştirme

### Veri Ekleme
1. Backend API'yi kullanın
2. MongoDB Compass ile doğrudan ekleyin
3. `seed.js` dosyasını güncelleyip çalıştırın

### Yeni Özellikler
- Multiplayer desteği
- Zaman sınırı
- Difficulty seviyeleri
- İstatistik sayfası

## 📊 Veritabanı Yapısı

```javascript
{
  name: "Oyuncu Adı",
  clubs: ["Takım1", "Takım2"],
  nationality: "🇹🇷",
  position: "Mevki",
  hint: "İpucu metni",
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### Backend (Heroku/Railway/Vercel)
1. Environment variables ayarlayın
2. MongoDB Atlas connection string ekleyin
3. Deploy edin

### Frontend (Netlify/Vercel)
1. `api-client.js`'teki `baseURL`'yi production URL ile güncelleyin
2. Deploy edin

## 🐛 Troubleshooting

### "Database connection failed"
- MongoDB servisinin çalıştığını kontrol edin
- Connection string'in doğru olduğunu kontrol edin

### "CORS Error"
- Backend'deki CORS ayarlarını kontrol edin
- Frontend URL'ini `.env` dosyasına ekleyin

### "API not reachable"
- Backend serverinin (port 3001) çalıştığını kontrol edin
- Firewall ayarlarını kontrol edin

## 📝 TODO

- [ ] Admin paneli
- [ ] Bulk data import
- [ ] Player statistics
- [ ] Match history
- [ ] User accounts
- [ ] Leaderboard

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun
3. Commit'lerinizi yapın
4. Pull request gönderin

## 📄 License

MIT License - detaylar için `LICENSE` dosyasına bakın.
