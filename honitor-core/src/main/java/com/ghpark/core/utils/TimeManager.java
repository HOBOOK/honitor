package com.ghpark.core.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * @author 경호
 * 시간 관리 클래스
 */
public class TimeManager {
    public static LocalDateTime now() {
        ZonedDateTime nowUTC = ZonedDateTime.now(ZoneId.of("UTC"));
        return nowUTC.withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }
}
