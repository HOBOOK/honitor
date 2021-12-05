FROM openjdk:11

WORKDIR /app
ADD build/libs/honitor-gateway-1.0.0.jar honitor-gateway.jar

EXPOSE 5000
ENTRYPOINT ["java","-Dspring.profiles.active=deploy","-Djava.net.preferIPv4Stack=true", "-jar","./honitor-gateway.jar"]
