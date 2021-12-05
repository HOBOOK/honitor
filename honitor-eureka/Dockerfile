FROM openjdk:11

WORKDIR /app
ADD build/libs/honitor-eureka-1.0.0.jar honitor-eureka.jar

EXPOSE 5000
ENTRYPOINT ["java","-Dspring.profiles.active=deploy","-Djava.net.preferIPv4Stack=true", "-jar","./honitor-eureka.jar"]
