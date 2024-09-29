package com.amogus.app.projecttask.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleEnum {
    ADMIN("ADMIN"),
    DEVELOPER("DEVELOPER");
    private final String role;
}
