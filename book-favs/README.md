📚 Mina Favoritböcker

Ett litet React + TypeScript-projekt där du kan lägga till böcker, markera favoriter och se dem i en favoritkorg.
Data sparas i localStorage så att böcker och favoriter finns kvar även efter att sidan laddas om.

⸻

🚀 Funktioner
	•	Lägg till nya böcker med titel, författare och bild-URL.
	•	Se alla böcker i en lista.
	•	Markera/avmarkera böcker som favoriter (⭐).
	•	Öppna/stäng en favoritkorg för att se bara dina favoriter.
	•	Ta bort böcker helt.
	•	All data sparas i webbläsarens localStorage.

⸻

🛠️ Tekniker
	•	React + TypeScript
	•	Vite som bundler/dev server
	•	Vitest + React Testing Library för tester
	•	localStorage för enkel persistens

⸻

✅ Tester

Projektet har både enhetstester och integrationstester:

Enhetstester
	•	AddBookForm → validerar inmatning, nollställer formuläret och skickar upp nya böcker.
	•	BooksList → visar böcker, markerar favoriter och kan ta bort böcker.
	•	FavoriteCart → visar/döljer favoritkorgen och listar favoriter.
	•	Header → visar antal favoriter och kan toggla favoritkorgen.

Integrationstester
	•	Testar hela flödet i App:
	1.	Lägga till en bok i listan.
	2.	Markera en bok som favorit (badge uppdateras).
	3.	Öppna favoritkorgen.
	4.	Verifiera att favoritboken visas i korgen.




▶️ Köra projektet

Installera beroenden:

#npm install

Starta dev-server:

#npm run dev


🧪 Kom igång med Vitest

1. Installera Vitest och Testing Library
#npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom

2. Konfigurera Vitest (vite.config.ts)

#/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",   // nödvändigt för att testa React-komponenter
    globals: true,          // gör att describe/it/expect fungerar utan import
    setupFiles: "./src/setupTests.ts", // laddas innan tester körs
  },
});

3. Setup-fil för jest-dom (src/setupTests.ts)

#import "@testing-library/jest-dom";

4. Skapa en testfil


🧪 Köra tester

#npm run test

Se mer detaljerad output (alla testnamn):

#npx vitest --reporter=verbose


