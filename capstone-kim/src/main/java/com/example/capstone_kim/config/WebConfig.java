package com.example.capstone_kim.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")               // 모든 API 경로에 대해
                .allowedOrigins("*")             // 모든 origin 허용 (개발용. 배포 시에는 정확한 origin만 허용 권장)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용 메소드
                .allowedHeaders("*")             // 모든 헤더 허용
                .allowCredentials(false);        // 쿠키 등 인증정보 X (필요시 true)
    }
}