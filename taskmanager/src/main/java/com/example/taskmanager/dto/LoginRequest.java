package com.example.taskmanager.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Enter Email , it is required")
    @Email(message = "Email adress should be valid")
    private String email;

    @NotBlank(message = "Enter Password , it is required")
    private String password;
}