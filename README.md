# Vehicle Console - Araç Orta Konsol Arayüzü

Araç içi dokunmatik ekran yazılımı prototipi. React frontend ve .NET Core backend ile geliştirilmiş, far kontrolü, sis farı ayarları ve navigasyon özelliklerini içeren full-stack web uygulaması.

## 🚀 Özellikler

### Ayarlar Sayfası (Settings)
- **Headlights Kontrolü**: Off, Parking, On, Auto modları
- **Fog Lights Yönetimi**: Ön ve arka sis farı kontrolü
- **Beam Angle Ayarı**: 0-100° arası far açısı ayarlama
- **Akıllı Kontroller**: Far kapalıyken sis farı ve açı kontrolü otomatik devre dışı
- **Otomatik Kaydetme**: Tüm değişiklikler anında veritabanına kaydedilir

### Harita Sayfası (Navigation)
- **OpenStreetMap Entegrasyonu**: Leaflet ile dark theme harita
- **Rota Gösterimi**: 10 noktalı Ankara şehir içi rota


## 🛠️ Teknolojiler

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS v4
- React Router DOM v6
- Leaflet & React-Leaflet
- Axios

### Backend
- .NET 10 Web API
- Entity Framework Core 10
- PostgreSQL
- ASP.NET Core

### Database
- PostgreSQL 17
- Docker & Docker Compose

## 📁 Proje Yapısı
```
vehicle-console-app/
├── backend/
│   └── VehicleConsole.API/
│       ├── Controllers/          # API endpoint'leri
│       │   ├── HealthController.cs
│       │   ├── RoutesController.cs
│       │   └── SettingsController.cs
│       ├── Data/                 # Database context
│       │   └── ApplicationDbContext.cs
│       ├── Models/               # Veritabanı modelleri
│       │   ├── VehicleSetting.cs
│       │   ├── VehicleRoute.cs
│       │   └── RoutePoint.cs
│       ├── Migrations/           # EF Core migrations
│       ├── Program.cs            # Uygulama giriş noktası
│       └── appsettings.json      # Yapılandırma
│
├── frontend/
│   └── vehicle-console-ui/
│       ├── src/
│       │   ├── components/       # Yeniden kullanılabilir UI bileşenleri
│       │   │   ├── BottomNav.jsx
│       │   │   ├── LightsControl.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   └── StatusBar.jsx
│       │   ├── pages/            # Ana sayfalar
│       │   │   ├── MapPage.jsx
│       │   │   └── SettingsPage.jsx
│       │   ├── services/         # API çağrıları
│       │   │   └── api.js
│       │   ├── App.jsx           # Ana uygulama
│       │   ├── main.jsx          # React giriş noktası
│       │   └── index.css         # Global stiller
│       ├── package.json
│       ├── vite.config.js
│       └── tailwind.config.js
│
├── docker-compose.yml            # PostgreSQL container yapılandırması
└── README.md
```

## 🔧 Gereksinimler

### Yazılım
- **Node.js** v18+ ve npm
- **.NET SDK** 10.0+
- **Docker Desktop** (PostgreSQL için)
- **Git**


## 📥 Kurulum ve Çalıştırma

### Port'lar
- Backend: `5004`
- Frontend: `5173`
- PostgreSQL: `5432`

### 1. Projeyi İndirin
```bash
git clone <repository-url>
cd vehicle-console-app
```

### 2. PostgreSQL'i Başlatın
```bash
# Docker ile PostgreSQL'i çalıştırma
docker-compose up -d

# Kontrol etme (vehicle-console-db çalışıyor olmalı)
docker ps
```

#### pgAdmin ile Veritabanına Bağlanma
```
Host: localhost
Port: 5432
Database: vehicle_console
Username: postgres
Password: postgres
```

### 3. Backend Kurulumu
```bash
dotnet ef database update
```
Bu komut tabloları oluşturur ve seed data'yı otomatik yükler.

#### Manuel Kurulum (Opsiyonel)
Eğer hazır veritabanı yedeğini kullanmak isterseniz:
```bash
# PostgreSQL container'ı çalıştırın
docker-compose up -d

# Backup'ı import edin
docker exec -i vehicle-console-db psql -U postgres -d vehicle_console < vehicle_console_backup.sql

# API'yi başlatma
dotnet run
```

✅ Backend çalışıyor: `http://localhost:5004`

**Test etme:**
```bash
curl http://localhost:5004/api/health
curl http://localhost:5004/api/settings
```

### 4. Frontend Kurulumu
```bash
# Yeni terminal penceresi açın
cd frontend/vehicle-console-ui

# Bağımlılıkları yükleme
npm install

# Geliştirme sunucusunu başlatma
npm run dev
```

✅ Frontend çalışıyor: `http://localhost:5173`

### 5. Uygulamayı Kullanın
Tarayıcınızda `http://localhost:5173` adresini açın.

## 🎮 Kullanım

1. **Settings Sayfası** (varsayılan açılış):
   - Headlights, Fog Lights ve Angle kontrollerini kullanın
   - Değişiklikler otomatik kaydedilir

2. **Navigation Sayfası**:
   - Alt menüden "NAVIGATION" butonuna tıklayın

## 🗄️ Veritabanı Yapısı

### VehicleSettings
| Kolon | Tip | Açıklama |
|-------|-----|----------|
| Id | int | Primary key |
| Headlights | string | Far durumu (Off/Parking/On/Auto) |
| FogLights | string | Sis farı (Front Fog/Back Fog) |
| Angle | int | Far açısı (0-100) |
| CreatedAt | datetime | Oluşturulma tarihi (nullable) |
| UpdatedAt | datetime | Güncellenme tarihi (nullable) |

### VehicleRoutes
| Kolon | Tip | Açıklama |
|-------|-----|----------|
| Id | int | Primary key |
| Name | string | Rota adı |
| IsActive | bool | Aktif rota işareti |
| CreatedAt | datetime | Oluşturulma tarihi (nullable) |

### RoutePoints
| Kolon | Tip | Açıklama |
|-------|-----|----------|
| Id | int | Primary key |
| RouteId | int | Foreign key → VehicleRoutes |
| Latitude | double | Enlem koordinatı |
| Longitude | double | Boylam koordinatı |
| Order | int | Sıra numarası (1-10) |

### İlişkiler
- `VehicleRoutes` → `RoutePoints` (1-to-Many)
- Cascade delete: Rota silinirse noktalar da silinir

### Seed Data
Uygulama ilk çalıştırıldığında otomatik olarak şu veriler oluşturulur:
- 1 adet varsayılan ayar (Headlights: Auto, FogLights: Front Fog, Angle: 11)
- 1 adet aktif rota (Ankara City Route)
- 10 adet rota noktası (Ankara merkez koordinatları: Kızılay, Sıhhiye, Ulus vb.)

**Not:** `dotnet ef database update` komutu çalıştırıldığında tablolar otomatik oluşturulur ve seed data yüklenir. Ayrıca manuel SQL çalıştırmanıza gerek yoktur.

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
API durumunu kontrol eder.

### Settings
```
GET  /api/settings        # Tüm ayarları getir
GET  /api/settings/{id}   # ID'ye göre ayar getir
PUT  /api/settings/{id}   # Ayarı güncelle
```

**Örnek PUT Request Body:**
```json
{
  "id": 1,
  "headlights": "On",
  "fogLights": "Back Fog",
  "angle": 75
}
```

### Routes
```
GET  /api/routes          # Tüm rotaları getir
GET  /api/routes/active   # Aktif rotayı getir (harita için)
GET  /api/routes/{id}     # ID'ye göre rota getir
```

**Örnek Response (active route):**
```json
{
  "id": 1,
  "name": "Ankara City Route",
  "isActive": true,
  "points": [
    {
      "id": 1,
      "latitude": 39.9334,
      "longitude": 32.8597,
      "order": 1
    },
    ...
  ]
}
```