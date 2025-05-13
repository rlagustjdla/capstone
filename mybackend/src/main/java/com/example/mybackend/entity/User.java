package com.example.mybackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // ✅ 기본 생성자 (JPA 필수)
    public User() {}

    // ✅ 전체 필드용 생성자 (선택 사항)
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // ✅ Getter / Setter
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
