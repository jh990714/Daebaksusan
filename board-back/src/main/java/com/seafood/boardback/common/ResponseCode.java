package com.seafood.boardback.common;

public interface ResponseCode {
    
    // 200 
    public static final String SUCCESS = "SU";


    // 400
    public static final String VALIDATION_FAILED = "VF";

    // 401
    public static final String SIGN_IN_FAILED = "SF";
    public static final String AUTHORIZATION_FAILED = "AF";

    // 403
    public static final String NO_PERMISSION = "NP";

    // 500
    public static final String DATABASE_ERROR = "DBE";

}
