package com.ghpark.honitor.servcie;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class KafkaProduceService {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(Object message) {
        log.info("메시지 보냄 :: " + message);
        this.kafkaTemplate.send("ho-1", message.toString());
    }
}
