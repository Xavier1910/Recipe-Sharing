package com.frostandfeast.api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS requests from http://localhost:3000
        registry.addMapping("/**") // Apply to all end points
                .allowedOrigins("http://localhost:3000") // Allow requests from //localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (cookies, authorization headers, etc.)
        registry.addMapping("/recipes/**")
        .allowedOrigins("http://localhost:3000")
        .allowedMethods("POST")
        .allowedHeaders("*")
        .allowCredentials(true);
        
        
    }
}
