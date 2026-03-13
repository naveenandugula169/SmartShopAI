package com.smartshop.auth;

public class VerifyOtpRequest {
    public String email;
    public String code;

    public VerifyOtpRequest() {}

    public VerifyOtpRequest(String email, String code) {
        this.email = email;
        this.code = code;
    }
}
