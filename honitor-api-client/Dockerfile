FROM openjdk:11

WORKDIR /app
ADD build/libs/honitor-api-client-1.0.0.jar honitor-api-client.jar

EXPOSE 5001
ENTRYPOINT ["java","-Djava.net.preferIPv4Stack=true", "-jar","./honitor-api-client.jar"]
