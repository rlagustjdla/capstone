package com.example.mybackend.repository;

import com.example.mybackend.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
    Optional<EmailVerification> findTopByEmailAndUsedFalseOrderByCreatedAtDesc(String email);
}