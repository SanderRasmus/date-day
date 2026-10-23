# Our Date Day ♡

En romantisk, responsiv Date Day-agenda laget med vanlig HTML, CSS og JavaScript – klar for GitHub Pages.

## Filer
- `index.html` – struktur og innhold
- `style.css` – design og mobiltilpasning
- `script.js` – agenda, popup-vinduer, redigering, kjærlighetsbrev og lagring

## Publiser på GitHub Pages
1. Opprett et nytt repository på GitHub, for eksempel `our-date-day`.
2. Pakk ut ZIP-filen og last opp `index.html`, `style.css`, `script.js` og `README.md` til rotmappen i repository-et.
3. Gå til **Settings → Pages**.
4. Under **Build and deployment**, velg **Deploy from a branch**.
5. Velg `main` og `/ (root)`, og trykk **Save**.
6. Når publiseringen er ferdig, viser GitHub adressen til nettsiden på Pages-siden.

## Funksjoner
- Egen velkomstside med «Klar for vår Date Day?» og knappen «Start vår Date Day», som åpner resten av siden.
- Klikkbare aktivitetskort med detaljer i popup-vindu.
- Rediger dagens tittel, velkomsttekst, dato, romantisk tekst og hemmelig kjærlighetsbrev.
- Rediger aktivitetenes tid, tittel, kort tekst, beskrivelse, påminnelse og bilde-URL.
- Gjennomføringsstatus og fremdriftsindikator.
- Tilpasninger lagres lokalt i nettleseren (`localStorage`).

## Merk
Data lagres bare i nettleseren på enheten som brukes; de synkroniseres ikke automatisk mellom mobil og PC. Bilder og fonter lastes fra eksterne tjenester og krever internettilgang. Nettsiden har ingen backend og krever ingen byggesteg.
