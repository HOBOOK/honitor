package com.ghpark.core.model;

import lombok.Data;

@Data
public class KafkaMessage {
    private String id;
    private String message;
}
