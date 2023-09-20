
import { Injectable } from "@angular/core";

@Injectable()
export class RegexPatternConstants {
    public OnlyChars: string = "[A-Z][a-z]*$";
    public AlphaNumeric: string = "^[a-zA-Z0-9]*$";
    public AlphaNumericWithDashDotMinusSpace: string = "^[a-zA-Z0-9_.-\\s]*$";
    public CharsWithSpace: string = "^[a-zA-Z ]*$";
    public Number: string = "^[0-9]*$";
    public Email: string = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.][a-z]+$';
    public QPCode: string = "^([A-Z]{3})([\s/])?([A-Z]{1})([0-9]{4})$";
    public FirstCharsCapital = "^([A-Z][a-z]*)$";  //"^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$";
    public CharsWithTitleCase = "([A-Z][a-z]*\\s*)+$";
    public AlphaNumericWithTitleCase = "([A-Z][a-z]*\\s*)+[0-9]$";
    public UDISE: string = "^(24[0-9]{9})$";
    public CharWithTitleCaseSpaceAndSpecialChars: string = "([A-Z][a-z.&+@`'-]*\\s*)+$";
    public AlphaNumericWithTitleCaseSpaceAndSpecialChars: string = "([A-Z][a-z0-9.&+@-`]*\\s*)+$";    
    public Password: string = "^.*(?=.*[A-Z])(?=.*[@#$%^&+=]).*$";
    public MobileNumber: string = "^((?![0-5])[0-9]{10})$";
    public OnlyCapitalChars: string = "[A-Z]*$";
    public NoSpaceInNameFields:  string ="([A-Z][a-z.&+@`'-]*\\S*)+$";
    public PasswordTooltrip: string = "1) Your password must be between 8 and 50 characters.&#13; 2) Your password must contain at least one uppercase, or capital, letter (ex: A, B, etc.)&#13; 3) Your password must contain at least one lowercase letter.&#13; 4) Your password must contain at least one number digit (ex: 0, 1, 2, 3, etc.)&#13; 5) Your password must contain at least one special character -for example: @ # $ % ^ & + =";
}
