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


🧪 Köra tester

#npm run test

Se mer detaljerad output (alla testnamn):

#npx vitest --reporter=verbose