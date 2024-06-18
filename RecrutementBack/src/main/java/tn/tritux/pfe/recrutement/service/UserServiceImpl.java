package tn.tritux.pfe.recrutement.service;

import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.tritux.pfe.recrutement.config.JwtService;
import tn.tritux.pfe.recrutement.dto.request.LoginRequest;
import tn.tritux.pfe.recrutement.dto.request.SignUPRequest;
import tn.tritux.pfe.recrutement.dto.response.LoginResponse;
import tn.tritux.pfe.recrutement.dto.response.SignUPResponse;
import tn.tritux.pfe.recrutement.dto.response.UserResponse;
import tn.tritux.pfe.recrutement.entity.Role;
import tn.tritux.pfe.recrutement.entity.User;
import tn.tritux.pfe.recrutement.repository.UserRepository;

import javax.security.auth.login.AccountNotFoundException;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public SignUPResponse signUp(SignUPRequest signUPRequest) {
        if(repository.findByEmail(signUPRequest.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        User user=null;
        user=User.builder()
                .prenom(signUPRequest.getPrenom())
                .nom(signUPRequest.getNom())
                .email(signUPRequest.getEmail())
                .image_profile(signUPRequest.getImage_profile())
                .motDePasse(passwordEncoder.encode(signUPRequest.getMotDePasse()))
                .role(Role.CANDIDAT)
                .build();
        repository.save(user);
        var accessToken=jwtService.generateToken(user);
        return SignUPResponse.builder()
                .accessToken(accessToken)
                .refreshToken(null)
                .id(user.getId())
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user=repository.findByEmail(loginRequest.getEmail()).orElseThrow(
                ()->new RuntimeException("User not found")
        );
        if(!user.isEnabled()){
            throw new RuntimeException("User account is not enabled");
        }
        try{
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getMotDePasse()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch (BadCredentialsException e){
            throw new RuntimeException("invalid credentials");
        }
        var accessToken=jwtService.generateToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(null)
                .id(user.getId())
                .build();
    }

    @Override
    public boolean validateToken(String token) {
        return false;
    }
    @Override
    public UserResponse getUserById(Long id){
        User user=repository.findById(id).orElse(null);
        return UserResponse.builder()
                .nom(user.getNom())
                .prenom(user.getPrenom()).
                image_profile(user.getImage_profile()).
                email(user.getEmail()).build();
    }
}