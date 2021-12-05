package com.honitor.zuul.swagger;

import com.google.common.base.Predicates;
import io.swagger.annotations.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@SwaggerDefinition(
        info = @Info(description = "MSA-COE",
                version = "1.0.0",
                title = "MSA-COE",
                termsOfService = "Term of Service",
                contact = @Contact(
                        name = "VazilCompany",
                        url = "http://www.vazilcompany.com/",
                        email = "programming@vazilcompany.com"),
                license = @License(name = "Apache License Version 2.0",
                        url = "https://www.apache.org/licenses/LICENSE-2.0")
        )
)
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .build();

    }
}
