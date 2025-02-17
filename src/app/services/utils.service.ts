import { Injectable } from '@angular/core';
import { UploadingFile } from '../models/uploading-file.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  selectUploadingFile(event: Event, name: string, uploadingFile: UploadingFile) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length === 0) return;

    const file: File = input.files![0];
    const formData: FormData = new FormData();

    const now = Date.now();
    const [fileName, fileExtension] = file.name.split('.');
    const uniqueFileName = `${fileName}_${now}.${fileExtension}`

    formData.append(name, file, uniqueFileName);

    uploadingFile.formData = formData;
    uploadingFile.file = file;
    uploadingFile.fileIsUploaded = false;
  }

}
