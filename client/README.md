Phase 1: Planung und Setup
~~
•	 Projektstruktur festlegen
o	MERN-Stack verwenden (MongoDB, Express, React, Node.js).
o	Discord.js für Bot-Integration einplanen.
•	 Tools vorbereiten
o	GitHub-Repository erstellen.
o	MongoDB Atlas einrichten.
o	Discord-Bot mit Grundbefehlen starten (discord.js).
•	 Grundlegende Anforderungen definieren
o	Welche Features braucht der Marktplatz?
o	Spieler- und DM-Funktionen aufschreiben.
~~
________________________________________
Phase 2: Backend-Entwicklung
•	 Datenbankstruktur erstellen (MongoDB):
o	Collection für Gegenstände (items).
o	Collection für Spieler (users) mit Goldbestand und Inventar.
•	 Express-API aufsetzen:
o	 GET /items: Gegenstände abrufen.
o	 POST /buyItem: Kauf eines Gegenstands.
o	 GET /inventory: Inventar eines Spielers abrufen.
o	 (Optional) POST /addItem: Gegenstand hinzufügen (Admin).
•	 Integration mit Discord-Bot:
o	Bot sendet API-Anfragen (z. B. GET /items).
________________________________________
Phase 3: Frontend-Entwicklung
•	 React-Frontend aufsetzen:
o	Projekt mit create-react-app oder Vite erstellen.
•	 Marktplatz-Seite bauen:
o	 Gegenstände aus der API laden und anzeigen.
o	 Filter- und Sortieroptionen einbauen.
•	 Inventar-Seite bauen:
o	 Liste der gekauften Gegenstände anzeigen.
o	 Goldbestand anzeigen.
________________________________________
Phase 4: Discord-Bot-Integration
•	 Grundbefehle entwickeln:
o	 !marktplatz: Gegenstände aus der API anzeigen.
o	 !kaufen [Item-Name]: Gegenstand kaufen.
o	 !inventar: Spielerinventar anzeigen.
•	 Erweiterte Features:
o	 Notifikationen bei neuen Gegenständen (Webhook).
o	 Admin-Befehl zum Hinzufügen von Gegenständen.
________________________________________
Phase 5: Erweiterungen und Feinschliff
•	 Admin-Panel (Frontend):
o	Gegenstände hinzufügen/löschen.
•	 Händler-Logik:
o	 Begrenzter Vorrat für Gegenstände.
o	 Tägliche Angebotserneuerung.
•	 Styling:
o	Marktplatz und Inventarseite mit Tailwind CSS oder Material-UI stylen.
•	 Deployment:
o	 Frontend (z. B. Vercel).
o	 Backend (z. B. Render).
o	 Discord-Bot (z. B. Railway).
