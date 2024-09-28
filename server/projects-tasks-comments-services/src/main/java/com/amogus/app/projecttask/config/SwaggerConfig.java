package com.amogus.app.projecttask.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Project and Task Management API",
                version = "1.0.0",
                description = "API для управления проектами и задачами в трекере задач",
                contact = @Contact(
                        name = "Amogus Dev Team",
                        email = "support@amogus.com",
                        url = "https://amogus.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0"
                ),
                termsOfService = "https://amogus.com/terms"
        ),
        servers = {
                @Server(
                        url = "http://localhost:8080",
                        description = "Local Dev Server"
                ),
                @Server(
                        url = "https://api.amogus.com",
                        description = "Production Server"
                )
        }
)
public class SwaggerConfig {
}
