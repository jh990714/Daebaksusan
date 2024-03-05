package com.seafood.boardback.common;

public class ResponseMessage {
    // 200 
    public static final String SUCCESS = "Success";


    // 400
    public static final String VALIDATION_FAILED = "Validation failed";

    // 401
    public static final String SIGN_IN_FAILED = "Login information mismatch";
    public static final String AUTHORIZATION_FAILED = "Authorizaton Failed";

    // 403
    public static final String NO_PERMISSION = "Do not have permission";

    // 500
    public static final String DATABASE_ERROR = "Database error";
}
