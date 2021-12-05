package com.ghpark.honitor.controller;

import com.ghpark.core.model.KafkaMessage;
import com.ghpark.honitor.servcie.KafkaProduceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@AllArgsConstructor
@RestController
public class KafkaProduceController {
    private KafkaProduceService kafkaProduceService;

    @PostMapping("/send")
    public void sendMessage(@RequestBody KafkaMessage message) {
        message.setId(UUID.randomUUID().toString());
        kafkaProduceService.sendMessage(message);
    }
}
