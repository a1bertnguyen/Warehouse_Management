package com.Warehouse_managment.Warehouse_managment.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Files; 
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false) // Giữ nguyên false
                .maxAge(3600);
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 1. Get the current working directory (where the backend is running)
        Path currentPath = Paths.get(System.getProperty("user.dir"));

        // 2. If we are inside 'Warehouse_managment', move up to the root folder
        // so we can see the sibling 'warehouse-app' folder
        if (!Files.exists(currentPath.resolve("warehouse-app"))) {
            currentPath = currentPath.getParent();
        }

        // 3. Resolve the full path to the frontend images folder
        Path assetsPath = currentPath.resolve("warehouse-app")
                .resolve("src")
                .resolve("assets")
                .resolve("products");

        // 4. Convert to a valid URL string (e.g., file:///D:/Projects/.../products/)
        // .toUri() handles all the slashes correctly for Windows/Mac/Linux
        String resourcePath = assetsPath.toUri().toString();

        // 5. Register the handler
        registry.addResourceHandler("/assets/products/**")
                .addResourceLocations(resourcePath);
    }
}
