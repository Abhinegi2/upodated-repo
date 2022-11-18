import { Injectable } from "@angular/core";

@Injectable()
export class MessageConstants {
    public RecordSavedMessage: string = "Record saved successfully";    
    public DeleteConfirmationMessage: string = "Are you sure to delete this record?";
    public RecordDeletedMessage: string = "Record deleted successfully";
    public NoDataFoundMessage: string = "No data found...!!";
    public PasswordChangeMessage: string = "Password Change successfully";
    public ChangeLoginIdMessage: string = "Change user LoginId successfully";
    public EmailSentForgotPasswordMessage: string = "Check your inbox and click on the link to reset your password.";
    public ResetPasswordSuccessMessage: string = "Your password has been successfully changed.";
    public ResetPasswordFailureMessage: string = "Sorry, looks like the reset code has already been used or has expired.";
    public DefaultImageText: string = "Is default Image?";
}
