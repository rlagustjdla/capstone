package com.example.mybackend.controller;

import com.example.mybackend.Service.EmailService;
import com.example.mybackend.entity.User;
import com.example.mybackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return ResponseEntity.ok(Map.of(
                        "username", user.getUsername(),
                        "message", "로그인 성공"
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "아이디 또는 비밀번호가 올바르지 않습니다."));
    }

    private final EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        try {
            emailService.sendVerificationCode(email);
            return ResponseEntity.ok(Map.of("message","인증 메일이 전송되었습니다."));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String code = body.get("code");
        try {
            emailService.verifyCode(email, code);
            return ResponseEntity.ok(Map.of("message","인증 성공"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", ex.getMessage()));
        }
    }
}