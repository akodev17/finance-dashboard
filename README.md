Host Link: https://finance-dashboard-akodev.netlify.app/

```markdown:README.md
# Finance Dashboard

Shaxsiy moliyaviy boshqaruv uchun React dasturi.

## Asosiy Funksionalliklar

- 💰 Daromad va xarajatlarni kuzatish
- 📊 Statistika va grafiklar
- 💱 Real vaqt valyuta konvertori
- 🌓 Light/Dark tema
- 📱 Responsive dizayn

## O'rnatish

1. Loyihani clone qilish:
```bash
git clone https://github.com/akodev17/finance-dashboard.git
cd finance-dashboard
```

2. Kerakli paketlarni o'rnatish:
```bash
npm install
```

3. Environment o'zgaruvchilarini sozlash:
   - `.env.example` faylidan `.env` fayl yarating
   - API kalitlarini kiriting:
```env
REACT_APP_EXCHANGE_RATE_API_KEY=your_api_key_here
REACT_APP_API_BASE_URL=https://v6.exchangerate-api.com/v6
```

4. Dasturni ishga tushirish:
```bash
npm start
```

## Texnologiyalar

- React.js
- React Bootstrap
- Chart.js
- Context API
- Local Storage
- ExchangeRate-API

## Loyiha Strukturasi

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── Charts/
│   │   │   ├── BalanceChart.js
│   │   │   ├── ExpenseChart.js
│   │   │   └── IncomeChart.js
│   │   ├── CurrencyConverter/
│   │   ├── Layout/
│   │   ├── ThemeToggle/
│   │   └── Transactions/
│   ├── context/
│   │   ├── AppContext.js
│   │   └── ThemeContext.js
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
```

## Asosiy Komponentlar

### 1. Transactions
- Yangi tranzaksiya qo'shish
- Tranzaksiyalarni tahrirlash/o'chirish
- Kategoriyalar bo'yicha filtrlash
- Vaqt oralig'i bo'yicha filtrlash

### 2. Charts
- Xarajatlar diagrammasi (Doughnut)
- Daromadlar diagrammasi (Bar)
- Balans diagrammasi (Line)

### 3. Currency Converter
- Real vaqt valyuta kurslari
- Valyutalarni konvertatsiya
- Avtomatik yangilanish (har 5 daqiqada)

### 4. Theme Toggle
- Light/Dark tema rejimi
- Tema sozlamalarini saqlash
- Smooth o'tishlar

## Ma'lumotlar Saqlash

- Tranzaksiyalar Local Storage'da saqlanadi
- Tema sozlamalari Local Storage'da saqlanadi
- Valyuta kurslari API dan olinadi

## API Integratsiya

ExchangeRate-API bilan ishlash uchun:
1. https://www.exchangerate-api.com saytidan ro'yxatdan o'ting
2. API key oling
3. `.env` fayliga API key ni qo'shing

## Development

### Kod Formatlash
```bash
npm run format
```

### Testing
```bash
npm test
```

### Build
```bash
npm run build
```

## Xavfsizlik

- API kalitlarini .env faylida saqlash
- Environment o'zgaruvchilarini git'dan yashirish
- Input validatsiya
- Error handling

## Kelajakdagi Rejalar

- [ ] Multi-user support
- [ ] Backend integratsiya
- [ ] PWA qo'llab-quvvatlash
- [ ] Export/Import funksiyalari
- [ ] Budjet rejalashtirish

## Hissa Qo'shish

1. Fork qiling
2. Branch yarating (`git checkout -b feature/NewFeature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add NewFeature'`)
4. Branch'ni push qiling (`git push origin feature/NewFeature`)
5. Pull Request yarating

## Litsenziya

MIT

## Muallif

Rahimjonov Akromjon

## Bog'lanish

- Email: frontenddev17@gmail.com
- GitHub: [@username](https://github.com/akodev17?tab=repositories)
```

Bu README fayli:
1. Loyiha haqida umumiy ma'lumot
2. O'rnatish qadamlari
3. Asosiy funksionalliklar
4. Loyiha strukturasi
5. Komponentlar tafsiloti
6. Development ko'rsatmalar
7. Hissa qo'shish yo'riqnomasi
8. Litsenziya va kontakt ma'lumotlarini o'z ichiga oladi
