package com.arikalp.server.config;

import org.springframework.context.annotation.Configuration;

/**
 * Configuration layer — holds Spring @Configuration classes and @Bean definitions.
 * Use this for:
 *   - Security config (Spring Security)
 *   - CORS configuration
 *   - Bean definitions (e.g., ModelMapper, RestTemplate, etc.)
 *   - Custom filter chains
 *
 * Example CORS config (uncomment to enable):
 *
 * @Bean
 * public WebMvcConfigurer corsConfigurer() {
 *     return new WebMvcConfigurer() {
 *         @Override
 *         public void addCorsMappings(CorsRegistry registry) {
 *             registry.addMapping("/**").allowedOrigins("http://localhost:3000");
 *         }
 *     };
 * }
 */
@Configuration
public class AppConfig {
    // Add your @Bean definitions here
}
