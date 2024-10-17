FROM python:3.12.6

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the application code
COPY src/ /app/

# Set environment variables
ENV PORT 8080

# Run the Flask app using gunicorn
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app
