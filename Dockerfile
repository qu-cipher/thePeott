# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim
LABEL authors="QuantumCicher"

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/peott-app.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]