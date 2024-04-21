package com.seafood.back.service.imple;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.seafood.back.entity.CustomOAuth2User;
import com.seafood.back.entity.MemberEntity;
import com.seafood.back.respository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService{
    
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException{

        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName();


        // try{
        //     System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        // }catch(Exception exception){
        //     exception.printStackTrace();
        // }

        MemberEntity memberEntity = null;
        String id = "";
        String name = "";
        String phone = "";
        String email = "email@email.com";

        if(oauthClientName.equals("kakao")){
            id = "kakao_" + oAuth2User.getAttributes().get("id");
            Map<String, String> reponseMap = (Map<String, String>) oAuth2User.getAttributes().get("kakao_account");
            name = reponseMap.get("name");
            phone = reponseMap.get("phone_number");
            email = reponseMap.get("email");
        

            memberEntity = new MemberEntity(id, "pass", name, phone, email, "kakao");
        }
        if(oauthClientName.equals("naver")){
            Map<String, String> reponseMap = (Map<String, String>) oAuth2User.getAttributes().get("response");
            id = "naver_" + reponseMap.get("id").substring(0, 14);
            name = reponseMap.get("name");
            phone = reponseMap.get("mobile");
            email = reponseMap.get("email");
            memberEntity = new MemberEntity(id, "pass", name, phone, email, "naver");
        }

        if (memberRepository.findById(id) == null) {
            memberRepository.save(memberEntity);
        }
        


        return new CustomOAuth2User(id);
    }
}
