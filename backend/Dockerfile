# Wähle ein Basis-Image
FROM python:3.10-slim

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Abhängigkeiten kopieren
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Anwendungscode kopieren
COPY src/ ./src/

# Umgebungsvariable setzen
ENV FLASK_APP=src/app.py

# Port freigeben
EXPOSE 5000

# Startbefehl für die Anwendung
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
