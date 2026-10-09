package com.arikalp.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // Automatically load environment variables from .env file before Spring Boot context initializes
        loadDotEnv();
        SpringApplication.run(DemoApplication.class, args);
    }

    /**
     * Reads .env file if present and sets matching System properties
     */
    private static void loadDotEnv() {
        String[] possiblePaths = { ".env", "server/.env", "../server/.env", "../.env" };
        for (String pathStr : possiblePaths) {
            Path path = Path.of(pathStr);
            if (Files.exists(path)) {
                try {
                    List<String> lines = Files.readAllLines(path);
                    for (String line : lines) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) continue;
                        int eqIdx = line.indexOf('=');
                        if (eqIdx > 0) {
                            String key = line.substring(0, eqIdx).trim();
                            String value = line.substring(eqIdx + 1).trim();
                            // Strip quotes if present
                            if ((value.startsWith("\"") && value.endsWith("\"")) ||
                                (value.startsWith("'") && value.endsWith("'"))) {
                                if (value.length() >= 2) {
                                    value = value.substring(1, value.length() - 1);
                                }
                            }
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                    System.out.println("Loaded environment variables from: " + path.toAbsolutePath());
                    break;
                } catch (Exception e) {
                    System.err.println("Warning: could not read .env file at " + pathStr + ": " + e.getMessage());
                }
            }
        }
    }
}
