package com.smartshop.auth;

import com.smartshop.user.model.User;
import com.smartshop.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
public class OtpService {

    private static final Logger log = LoggerFactory.getLogger(OtpService.class);

    private final OtpTokenRepository otpTokenRepository;
    private JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Value("${app.otp.expiration-minutes:10}")
    private long otpExpirationMinutes;

    public OtpService(OtpTokenRepository otpTokenRepository,
                      ObjectProvider<JavaMailSender> mailSenderProvider,
                      UserRepository userRepository) {
        this.otpTokenRepository = otpTokenRepository;
        this.mailSender = mailSenderProvider.getIfAvailable();
        this.userRepository = userRepository;
    }

    public OtpToken generateAndSendOtp(User user) {
        String code = generateNumericOtp(6);

        OtpToken token = new OtpToken();
        token.setUser(user);
        token.setCode(code);
        token.setExpiresAt(Instant.now().plus(otpExpirationMinutes, ChronoUnit.MINUTES));
        token.setUsed(false);

        otpTokenRepository.save(token);

        try {
            // send email
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(user.getEmail());
            msg.setSubject("Your verification code");
            msg.setText("Your verification code is: " + code + "\nIt expires in " + otpExpirationMinutes + " minutes.");
            mailSender.send(msg);
            log.info("Sent OTP email to {}", user.getEmail());
        } catch (Exception ex) {
            // If mail sending fails (no SMTP configured), log the code so dev can copy it from logs
            log.warn("Failed to send OTP email to {}: {}. OTP was: {}", user.getEmail(), ex.getMessage(), code);
        }

        // Also log that we would send the OTP via SMS to the user's phone number.
        // In production, replace this with a real SMS integration (e.g. Twilio).
        if (user.getPhoneNumber() != null && !user.getPhoneNumber().isBlank()) {
            log.info("[SMS OTP] Would send code {} to phone number {}", code, user.getPhoneNumber());
        }

        return token;
    }

    public boolean verifyOtp(String email, String code) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return false;

        return otpTokenRepository.findByUserIdAndCode(user.getId(), code)
                .filter(t -> !t.isUsed())
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                .map(t -> {
                    t.setUsed(true);
                    otpTokenRepository.save(t);
                    user.setEnabled(true);
                    userRepository.save(user);
                    return true;
                }).orElse(false);
    }

    private String generateNumericOtp(int length) {
        Random rand = new Random();
        int min = (int) Math.pow(10, length - 1);
        int max = (int) Math.pow(10, length) - 1;
        int val = rand.nextInt((max - min) + 1) + min;
        return Integer.toString(val);
    }
}
