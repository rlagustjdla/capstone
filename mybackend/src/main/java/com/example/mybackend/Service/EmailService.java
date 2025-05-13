package com.example.mybackend.Service;

import com.example.mybackend.entity.EmailVerification;
import com.example.mybackend.repository.EmailVerificationRepository;
import com.example.mybackend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final EmailVerificationRepository codeRepo;
    private final UserRepository userRepo;

    public void sendVerificationCode(String email) {
        if (userRepo.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        String code = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime now = LocalDateTime.now();

        EmailVerification ev = EmailVerification.builder()
                .email(email)
                .code(code)
                .createdAt(now)
                .expiresAt(now.plusMinutes(5))
                .used(false)
                .build();
        codeRepo.save(ev);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setTo(email);
            helper.setSubject("[MyApp] 이메일 인증 코드");
            helper.setText("인증 코드: " + code + "\n5분 이내에 입력해주세요.");
            helper.setFrom("gustj3027@gmail.com"); // 반드시 spring.mail.username과 같아야 함

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new IllegalArgumentException("이메일 전송에 실패했습니다: " + e.getMessage());
        }
    }


    public void verifyCode(String email, String code) {
        EmailVerification ev = codeRepo.findTopByEmailAndUsedFalseOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new IllegalArgumentException("인증번호를 먼저 요청해주세요."));

        if (ev.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("인증번호가 만료되었습니다.");
        }
        if (!ev.getCode().equals(code)) {
            throw new IllegalArgumentException("인증번호가 일치하지 않습니다.");
        }

        ev.setUsed(true);
        codeRepo.save(ev);
    }
}
