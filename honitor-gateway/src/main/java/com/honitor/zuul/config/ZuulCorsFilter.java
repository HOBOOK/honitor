//package com.vazil.zuul.config;
//
//import io.netty.handler.codec.http.cors.CorsConfigBuilder;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsConfigurationSource;
//import org.springframework.web.cors.reactive.CorsWebFilter;
//import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//import java.util.Arrays;
//
///**
// * 크로스 도메인 설정 필터
// * @author pkh879
// */
//
//
//public class ZuulCorsFilter implements WebFluxConfigurer  {
//
//    public ZuulCorsFilter() {
//        super(configurationSource());
//    }
//
//    private static CorsConfigurationSource configurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("*");
//        config.addAllowedHeader("*");
//        config.setMaxAge(36000L);
//        config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/app/**", config);
//        return source;
//    }
//}