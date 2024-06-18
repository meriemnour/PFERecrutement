package tn.tritux.pfe.recrutement.service;

import tn.tritux.pfe.recrutement.dto.request.LoginRequest;
import tn.tritux.pfe.recrutement.dto.request.SignUPRequest;
import tn.tritux.pfe.recrutement.dto.response.LoginResponse;
import tn.tritux.pfe.recrutement.dto.response.SignUPResponse;
import tn.tritux.pfe.recrutement.dto.response.UserResponse;

public interface UserService {
    SignUPResponse signUp(SignUPRequest signUPRequest);
    LoginResponse login(LoginRequest loginRequest);
    boolean validateToken(String token);
    UserResponse getUserById(Long id);

}
