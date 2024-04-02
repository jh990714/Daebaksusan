package com.seafood.back.utils;

import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

    public static String getId(String token, String secretKey) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
        .getBody().get("ID", String.class);
    }

    public static boolean isExpired(String token, String secretKey) {
        // Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        // Date expiration = claims.getExpiration();
        // Date now = new Date();
        
        // long tenMinutesInMillis = 10 * 60 * 1000; // 10분을 밀리초로 변환
        // Date tenMinutesLater = new Date(now.getTime() + tenMinutesInMillis);
        
        // // 토큰의 만료 시간이 현재 시간에서 10분 이전인지 확인합니다.
        // return expiration.before(tenMinutesLater);
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().getExpiration().before(new Date());
    }

    public static String createJwt(String id, String secretKey, Long expiredMs) {
        Claims claims = Jwts.claims();

        claims.put("ID", id);
        
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static String generateAccessTokenFromRefreshToken(String refreshToken, String refreshSecretKey, String accessSecretKey, Long expiredMs) {
        if (isExpired(refreshToken, refreshSecretKey)) {
            // db에서도 해줘야함
            return null;
        }
        String ID = getId(refreshToken, refreshSecretKey);
        return createJwt(ID, accessSecretKey, expiredMs);
    }

    
}
