package com.ghpark.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class HonitorEurekaApplication {
    public static void main(String[] args) {
        SpringApplication.run(HonitorEurekaApplication.class, args);
    }
}
