FROM openjdk:11

WORKDIR /app
ADD build/libs/honitor-api-1.0.0.jar honitor-api.jar

EXPOSE 5000
ENTRYPOINT ["java","-Djava.net.preferIPv4Stack=true", "-jar","./honitor-api.jar"]
