import { localize }     from 'App/i18n';
import {
    compressImg,
    convertToBase64,
    isImageType,
    getFormatFromMIME } from '_common/image_utility';

export const compressImageFiles = (files) => {
    const promises = [];
    files.forEach((f) => {
        const promise = new Promise((resolve) => {
            if (isImageType(f.type)) {
                convertToBase64(f).then((img) => {
                    compressImg(img).then((compressed_img) => {
                        const file_arr = f;
                        file_arr.file = compressed_img;
                        resolve(file_arr);
                    });
                });
            } else {
                resolve(f);
            }
        });
        promises.push(promise);
    });

    return Promise.all(promises);
};

export const readFiles = (files) => {
    const promises = [];
    files.forEach((f) => {
        const fr      = new FileReader();
        const promise = new Promise((resolve) => {
            fr.onload = () => {
                const file_obj    = {
                    filename      : isImageType(f.type) ? f.file.name : f.name,
                    buffer        : fr.result,
                    documentType  : 'proofaddress',
                    documentFormat: getFormatFromMIME(f),
                    file_size     : isImageType(f.type) ? f.file.size : f.size,
                };
                resolve(file_obj);
            };

            fr.onerror = () => {
                resolve({
                    message: localize('Unable to read file [_1]', isImageType(f.type) ? f.file.name : f.name),
                });
            };

            if (isImageType(f.type)) {
                fr.readAsArrayBuffer(f.file);
            } else {
                fr.readAsArrayBuffer(f);
            }

        });

        promises.push(promise);
    });

    return Promise.all(promises);
};

export const max_document_size = 8388608;

export const supported_filetypes = 'image/png, image/jpeg, image/jpg, image/gif, application/pdf';

export const getSupportedFiles = (filename) => /^.*\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF|pdf|PDF)$/.test(filename);
