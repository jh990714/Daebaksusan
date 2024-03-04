package com.example.demo.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.example.demo.service.testService;

@Service
public class testServiceImpl implements testService {

    @Override
    public Map<String, Object> getTestData() {
        // TODO Auto-generated method stub
        Map<String, Object> firstData = new HashMap<>();

        firstData.put("label1", "check1");
        firstData.put("label2", "check2");
        firstData.put("label3", "check3");

        return firstData;
    }

}