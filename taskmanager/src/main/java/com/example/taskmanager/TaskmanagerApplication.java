package com.example.taskmanager;

import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TaskmanagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskmanagerApplication.class, args);
    }
    // Créer un utilisateur pour le test au démarrage
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmail("test@example.com")) {
                User user = new User();
                user.setEmail("test@example.com");
                user.setPassword(passwordEncoder.encode("password123"));
                user.setName("Test User");
                userRepository.save(user);
                System.out.println(" user created: test@example.com / password123");
            }
        };
    }

}
