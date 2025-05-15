# 📚 Liberia – Slutprojekt

**Liberia** är en modern bokapplikation byggd i **React** med **TypeScript** som använder **Open Library API** för att hämta bokdata. Du kan enkelt söka efter böcker, bläddra bland författare, kategorier och språk – och klicka dig in för att läsa mer om varje bok på en egen detaljsida.

Projektet är responsivt, stilrent designat med SCSS och har ett naturligt färgtema.

## ✨ Funktioner

- 🔍 Sök böcker direkt på hemsidan
- 📖 Visa boklistor med titel och omslag
- 👤 Sök på författare A–Ö
- 🏷 Filtrera på kategorier och språk
- 📘 Klicka på en bok för att se mer information
- 📝 Läs beskrivning, ämnesord, platser och tidsperioder på detaljsidan
- 📱 Mobilanpassad layout

### 🔜 Kommande funktioner (To-Do)

- ⭐ Lägg till böcker som **favoriter**
- ✅ Markera böcker som **lästa**
- 💬 Möjlighet att lämna **recensioner** eller betyg

## 🧰 Teknologier

- **React** (med hooks)
- **TypeScript**
- **React Router**
- **SCSS** (med färgtema och variabler)
- **Open Library API**
- **Context API + Reducer** (för kommande funktioner)

## 🚀 Kom igång

1. Klona projektet:

```bash
git clone https://github.com/BinelaSkenderi/slutprojekt-react-F24.git
cd slutprojekt-react-F24
```

2. Installera beroenden:

```bash
npm install
```

3. Starta utvecklingsservern:

```bash
npm run dev
```

Öppna `http://localhost:5173` i webbläsaren.

## 🗂 Projektstruktur

```
src/
├── components/         # Återanvändbara UI-komponenter
├── context/            # State management (för favoriter/lästa)
├── pages/              # Sidor: Home, AuthorPage, BookDetail, osv.
├── styles/             # SCSS-filer och variabler
├── types/              # TypeScript-typer
├── App.tsx             # Routing
├── main.tsx            # Entrypoint
```

## 🌐 API-källor

- Böcker: `https://openlibrary.org/search.json?q=...`
- Författare: `https://openlibrary.org/search/authors.json?q=...`
- Verk: `https://openlibrary.org/authors/{AUTHOR_KEY}/works.json`

📚 Bokdata tillhandahålls av [Open Library](https://openlibrary.org), ett projekt från Internet Archive.

## 👩‍💻 Utvecklat av

**Binela Skenderi**  
🔗 [GitHub](https://github.com/BinelaSkenderi)

---

Tack för att du tittade på mitt slutprojekt – **Liberia**!
