package com.seafood.back.handler;

import java.io.IOException;

import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.seafood.back.entity.CustomOAuth2User;
import com.seafood.back.utils.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
    
    // private final JwtUtil jwtUtil;

    @Value("${jwt.secret}")
    private String accessSecretKey;

    @Value("${frontend.url}")
    private String frontendUrl;

    private Long accessTokenExpiredMs = (long) (1000 * 60 * 30); // 액세스 토큰 만료 시간 (30분)


    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Authentication authentication
    ) throws IOException, ServletException {
        
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        
        String memberId = oAuth2User.getName();
        String token = JwtUtil.createJwt(memberId, accessSecretKey, accessTokenExpiredMs);

        response.sendRedirect(frontendUrl + "/auth/oauth-response/" + token);
    }
}
