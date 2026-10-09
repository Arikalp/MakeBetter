package com.arikalp.server.controller;

import com.arikalp.server.service.HelloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller layer — handles HTTP requests and delegates to the service layer.
 * Controllers should NEVER contain business logic directly.
 */
@RestController
public class HelloController {

    private final HelloService helloService;

    // Constructor injection (preferred over @Autowired field injection)
    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    @GetMapping("/")
    public String sayHello() {
        return helloService.getGreeting();
    }

    @GetMapping("/bio")
    public String getBio() {
        return helloService.getBio();
    }
}
