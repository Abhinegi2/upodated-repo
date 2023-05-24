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
    public InvalidSchoolSectorJob: string = "The selected School is not mapped with any <b>Sector</b> and <b>JobRole</b>.<br><br> Please visit the <a href='/schoolsectorjobs'><b>School Sector JobRole</b></a> page and assign a Sector & Jobrole to the required School.";
    public InvalidVTACS: string = "The selected School Sector JobRole is not mapped with any <b>Academic Class Section</b>.<br><br> Please visit the <a href='/vtacademicclasssections'><b>VT Academic Class Sections</b></a> page."
}
