# League of Legends Champions Hub

League of Legends temalı, React ve Vite ile geliştirilmiş çok sayfalı bir web uygulamasıdır.  
Proje; klasik HTML/CSS yapısından React tabanlı bileşen mimarisine taşınmış ve uygulama içinde farklı modüller tek bir istemci taraflı routing yapısı altında birleştirilmiştir.

## Proje Kapsamı

Uygulama şu ana sayfalardan oluşur:

- Home
- Champions
- Lore
- Updates
- Quiz
- Auth
- Profile
- Draft Builder
- Counter Analyzer
- About Us

## Kullanılan Teknolojiler

- React
- Vite
- React Router
- CSS
- ESLint

## Temel Özellikler

- Çok sayfalı React uygulama yapısı
- İstemci taraflı routing
- Riot Data Dragon üzerinden champion verisi çekme
- Champion listeleme, arama ve filtreleme
- Login / register arayüzü
- LocalStorage tabanlı oturum ve profil saklama
- Quiz sistemi
- Draft Builder ile takım kompozisyonu oluşturma ve analiz
- Counter Analyzer ile rakip takım tehdit analizi
- Responsive tasarım

## Sayfa Rotaları

- `/`
- `/champions`
- `/lore`
- `/updates`
- `/quiz`
- `/auth`
- `/profile`
- `/draft-builder`
- `/counter-analyzer`
- `/about-us`

## Proje Yapısı

```text
react-transport/
  public/
  src/
    assets/
    components/
    data/
    pages/
    styles/
    utils/
    App.jsx
    main.jsx
```

## API Kullanımı

Projede ağırlıklı olarak Riot Data Dragon verileri kullanılmaktadır.

Örnek endpoint:

```text
https://ddragon.leagueoflegends.com/cdn/16.8.1/data/en_US/championFull.json
```

Bu veri şu alanlarda kullanılmaktadır:

- Champions sayfası
- Profile sayfasındaki favori kompozisyon alanı
- Draft Builder analiz akışı
- Counter Analyzer analiz akışı

## Kurulum

```bash
npm install
```

## Geliştirme Ortamında Çalıştırma

```bash
npm run dev
```

Varsayılan geliştirme adresi:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Notlar

- `node_modules` ve `dist` klasörleri Git deposuna dahil edilmemelidir.
- Kullanıcı oturumu ve profil bilgileri şu anda `localStorage` üzerinden tutulmaktadır.
- Bu proje eğitim / ders projesi odaklıdır.

## Bilinen Sınırlamalar

- PDF export akışı tarayıcıya ve cihaza göre farklı davranabilir.
- Kimlik doğrulama sistemi gerçek bir backend tabanlı auth sistemi değildir.
- Bazı büyük görsel dosyalar optimize edilerek proje boyutu daha da küçültülebilir.

## Gelecekte Yapılabilecek İyileştirmeler

- Backend ve veritabanı entegrasyonu
- Gerçek kullanıcı doğrulama sistemi
- Otomatik test ekleme
- Daha güçlü form doğrulama
- Deploy alma
- Performans ve görsel optimizasyon
