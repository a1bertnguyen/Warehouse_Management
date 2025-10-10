package com.Warehouse_managment.Warehouse_managment.Utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    @Autowired
    private final UserDetailsService userDetailsService;
    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/registration/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        // default Spring login page; redirect to your FE after login
                        .defaultSuccessUrl("http://localhost:3000/", true)
                        .permitAll()
                )
                .logout(logout -> logout.permitAll());

        return http.build();
    }
//    SecurityFilterChain securityFilterChain(HttpSecurity http)
//
//    csrf(csrf -> csrf.disable())
//    Disables CSRF protection. Fine for APIs / Postman testing or JWT setups; for classic HTML form apps you normally keep CSRF enabled.
//
//            authorizeHttpRequests(...)
//
//            .requestMatchers("/api/v*/registration/**").permitAll()
//    Anyone (even not logged in) can hit registration endpoints like /api/v1/registration/....
//
//            .anyRequest().authenticated()
//    Every other endpoint requires the user to be logged in.
//
//    formLogin(Customizer.withDefaults())
//    Enables Spring’s default login page and form-login flow. If an unauthenticated user hits a protected URL, they’ll be redirected to /login.
//
//return http.build();
//    Finalizes the filter chain Spring Security uses to protect routes.

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        return provider;
    }

    // Only if you need to inject AuthenticationManager elsewhere
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:3000"));
        cfg.setAllowedMethods(List.of("GET","POST","DELETE","PUT","PATCH","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }

}
