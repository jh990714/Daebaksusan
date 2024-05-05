package com.seafood.back.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seafood.back.handler.OAuth2SuccessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 됨.
@RequiredArgsConstructor
public class AuthenticationConfig {

    // private final MemberService memberService;

    @Value("${jwt.secret}")
    private String secretKey;
    private final DefaultOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .httpBasic(basic ->basic.disable())
            
            // stateless한 rest api를 개발할 것이므로 csrf 공격에 대한 옵션은 꺼둔다.
 	        .csrf(AbstractHttpConfigurer::disable)

	        // 특정 URL에 대한 권한 설정.
            .authorizeHttpRequests((authorizeRequests) -> {
                authorizeRequests.requestMatchers("/check", "/info/**", "/cart/**", "/points/**", "/members/withdraw", "/qna/ask").authenticated();
                authorizeRequests.requestMatchers("/manager/**")
                
            // ROLE_은 붙이면 안 된다. hasAnyRole()을 사용할 때 자동으로 ROLE_이 붙기 때문이다.
                .hasAnyRole("ADMIN", "MANAGER");

                authorizeRequests.requestMatchers("/admin/**")
                // ROLE_은 붙이면 안 된다. hasRole()을 사용할 때 자동으로 ROLE_이 붙기 때문이다.
                .hasRole("ADMIN");
                            
                authorizeRequests.requestMatchers("/members/**", "/product/**", "/refreshToken", "/categories", "/oauth2/**", "/payment/**", "/reviews/**", "/guest/**", "/qna/**").permitAll();
            })
            
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(endpoint -> endpoint.baseUri("/api/v1/auth/oauth2"))
                .redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
                .userInfoEndpoint(endpoint -> endpoint.userService(oAuth2UserService))
                .successHandler(oAuth2SuccessHandler)
            )
            // .formLogin((formLogin) -> {
            // /* 권한이 필요한 요청은 해당 url로 리다이렉트 */
		    //     formLogin.loginPage("/login");
            // })
            .addFilterBefore(new JwtFilter(secretKey), UsernamePasswordAuthenticationFilter.class)
            .build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

}