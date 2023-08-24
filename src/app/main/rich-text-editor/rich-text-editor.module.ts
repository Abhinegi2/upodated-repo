import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RichTextEditorComponent } from "./rich-text-editor.component";
import { QuillModule } from "ngx-quill";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  declarations: [RichTextEditorComponent],
  exports: [RichTextEditorComponent]
})
export class RichTextEditorModule {}
