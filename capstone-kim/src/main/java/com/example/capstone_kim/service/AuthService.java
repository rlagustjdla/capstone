package com.example.capstone_kim.service;

import com.example.capstone_kim.dto.LoginRequest;
import com.example.capstone_kim.dto.LoginResponse;
import com.example.capstone_kim.dto.SignupRequest;
import com.example.capstone_kim.entity.User;
import com.example.capstone_kim.repository.UserRepository;
import com.example.capstone_kim.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(SignupRequest request) {
        // 1. 학교 이메일인지 검증 (예: @school.ac.kr로 끝나는지)
        if (!request.getEmail().endsWith("@pukyong.ac.kr")) {
            throw new IllegalArgumentException("학교 이메일 주소만 가입할 수 있습니다.");
        }

        // 2. 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 3. 비밀번호 암호화 후 저장
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .build();

        userRepository.save(user);
    }
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return new LoginResponse(token, user.getId());
    }
}