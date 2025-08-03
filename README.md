# Mikro-Frontend E-Ticaret Uygulaması

Bu proje, Next.js ve Docker kullanılarak geliştirilmiş **Multi-Zone Architecture** ile çalışan bir e-ticaret uygulamasıdır.

## 🏗️ Mimari

Proje iki bağımsız mikro-frontend uygulamasından oluşur:

- **Home Uygulaması** (Port 3000): Ürün listeleme, detaylar ve sepete ekleme
- **Cart Uygulaması** (Port 3001): Sepet yönetimi ve sipariş özeti

## 🚀 Teknolojiler

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Containerization**: Docker & Docker Compose
- **Language**: TypeScript
- **Architecture**: Multi-Zone Architecture

## 📁 Proje Yapısı

```
microfrontend-ecommerce-case/
├── home/                 # Ana uygulama (Port 3000)
│   ├── src/
│   │   ├── app/         # Next.js App Router
│   │   ├── components/  # UI Bileşenleri
│   │   ├── lib/         # Yardımcı fonksiyonlar
│   │   ├── store/       # Redux Store
│   │   └── types/       # TypeScript tipleri
│   ├── Dockerfile       # Home uygulaması için Docker
│   └── package.json
├── cart/                 # Sepet uygulaması (Port 3001)
│   ├── src/
│   │   └── app/         # Next.js App Router
│   ├── Dockerfile       # Cart uygulaması için Docker
│   └── package.json
├── docker-compose.yml   # Docker Compose yapılandırması
└── README.md
```

## 🛠️ Kurulum ve Çalıştırma

### Docker ile Çalıştırma 

1. **Tüm uygulamaları Docker ile başlatın:**
   ```bash
   docker-compose up --build
   ```

2. **Arka planda çalıştırmak için:**
   ```bash
   docker-compose up -d --build
   ```

3. **Uygulamaları durdurmak için:**
   ```bash
   docker-compose down
   ```

### Geliştirme Ortamı

1. **Home uygulamasını başlatın:**
   ```bash
   cd home
   npm install
   npm run dev
   ```
   Uygulama http://localhost:3000 adresinde çalışacaktır.

2. **Cart uygulamasını başlatın:**
   ```bash
   cd cart
   npm install
   npm run dev
   ```
   Uygulama http://localhost:3001 adresinde çalışacaktır.

## 🔧 Özellikler

### Home Uygulaması
- ✅ Responsive ürün listesi
- ✅ Ürün detay sayfaları
- ✅ Sepete ekleme fonksiyonalitesi
- ✅ Görsel geri bildirim (modal)
- ✅ URL parametreleri ile veri iletişimi
- ✅ Cart uygulamasına Multi-Zone yönlendirme

### Cart Uygulaması
- ✅ Sepet içeriği görüntüleme
- ✅ Ürün miktarı güncelleme
- ✅ Sepetten ürün silme
- ✅ Toplam fiyat hesaplama
- ✅ Boş sepet durumu
- ✅ Responsive tasarım
- ✅ Home uygulamasına Multi-Zone yönlendirme

## 🔄 Multi-Zone Architecture

Bu proje **Multi-Zone Architecture** kullanmaktadır:

### URL Yapısı:
- **Ana Sayfa**: `http://localhost:3000/` (Home uygulaması)
- **Cart Sayfası**: `http://localhost:3000/cart` (Cart uygulaması)
- **Ürün Detay**: `http://localhost:3000/products/[id]` (Home uygulaması)

### Konfigürasyon:
```javascript
// home/next.config.ts
async rewrites() {
  return [
    {
      source: '/cart/:path*',
      destination: 'http://cart:3001/cart/:path*',
    },
  ]
}
```

## 🎨 Tasarım

- **Responsive Design**: Mobil ve desktop uyumlu
- **Modern UI**: Tailwind CSS ile temiz tasarım
- **Kullanıcı Dostu**: Kolay navigasyon ve geri bildirim
- **Tutarlı Renk Paleti**: Mavi tonları ve gri tonları

## 📱 Responsive Özellikler

- **Mobile First**: Mobil cihazlarda optimize edilmiş
- **Grid Layout**: Esnek grid sistemi
- **Touch Friendly**: Dokunmatik cihazlar için optimize edilmiş butonlar
- **Breakpoint Optimization**: Farklı ekran boyutları için optimize edilmiş

## 🚀 Deployment

### Docker ile Production

```bash
# Production build
docker-compose -f docker-compose.yml up --build

# Environment variables
NODE_ENV=production
```

### Vercel Deployment

Her uygulama ayrı ayrı Vercel'e deploy edilebilir:

1. Home uygulaması: `vercel --prod`
2. Cart uygulaması: `vercel --prod`

## 🔍 Test Senaryoları

1. **Ürün Ekleme**: Home sayfasından ürün sepete eklenebilmeli
2. **Sepet Görüntüleme**: Cart sayfasında eklenen ürünler görünmeli
3. **Miktar Güncelleme**: Sepette ürün miktarı artırılabilmeli/azaltılabilmeli
4. **Ürün Silme**: Sepetten ürün silinebilmeli
5. **Responsive Test**: Mobil ve desktop'ta düzgün çalışmalı
6. **Multi-Zone Test**: URL yönlendirmeleri çalışmalı

## 📝 Geliştirme Notları

- **TypeScript**: Tip güvenliği için kullanılmıştır
- **ESLint**: Kod kalitesi için yapılandırılmıştır
- **Prettier**: Kod formatı için kullanılabilir
- **Git Hooks**: Commit öncesi kontroller eklenebilir

## 👥 Geliştirici

Bu proje mikro-frontend mimarisi ve modern web teknolojileri kullanılarak geliştirilmiştir.

## 🎯 Case Gereksinimleri Karşılandı

- ✅ **Multi-Zone Architecture**: Kuruldu ve çalışıyor
- ✅ **Docker Containerization**: Her uygulama ayrı container
- ✅ **Responsive Design**: Tailwind CSS ile modern tasarım
- ✅ **Veri İletişimi**: URL parametreleri ile çalışıyor
- ✅ **Bağımsız Geliştirme**: Her uygulama ayrı ayrı geliştirilebilir
- ✅ **Ortak Bileşenler**: Paylaştırılabilir yapı
- ✅ **SSR Desteği**: Next.js App Router ile
- ✅ **State Yönetimi**: Redux Toolkit kullanılıyor # microfrontend-ecommerce_case
