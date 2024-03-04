package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.testService;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
public class testController {
    
    private final testService Service;

    @GetMapping("/test")
    public Map<String, Object> firstController() {
        return Service.getTestData();
      }
    
}
