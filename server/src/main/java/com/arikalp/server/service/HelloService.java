package com.arikalp.server.service;

import org.springframework.stereotype.Service;

@Service
public class HelloService {

    public String getGreeting() {
        return "Hello, This is Sankalp";
    }

    public String getBio() {
        return "I am Sankalp and I am a student from Lucknow";
    }
}
