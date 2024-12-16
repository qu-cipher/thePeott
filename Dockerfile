FROM openjdk:17-jdk-slim
LABEL authors="QuantumCicher"
WORKDIR /app
COPY target/peott-app.jar app.jar
EXPOSE 80
ENTRYPOINT ["java", "-jar", "/app/app.jar"]