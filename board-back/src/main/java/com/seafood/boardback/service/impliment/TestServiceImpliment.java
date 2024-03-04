package com.seafood.boardback.service.impliment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.seafood.boardback.service.TestService;

@Service
public class TestServiceImpliment implements TestService{
    
    @Override
    public Map<String, Object> getTestData() {
        // TODO Auto-generated method stub
        Map<String, Object> firstData = new HashMap<>();

        firstData.put("label", "check1");
        firstData.put("label", "check2");
        firstData.put("label", "check3");

        return firstData;
    }
}
