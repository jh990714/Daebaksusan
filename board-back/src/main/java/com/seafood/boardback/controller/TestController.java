package com.seafood.boardback.controller;

import org.springframework.web.bind.annotation.RestController;

import com.seafood.boardback.service.TestService;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final TestService Service;

    @GetMapping("/test")
    public Map<String, Object> firstController() {
        return Service.getTestData();
      }
}
