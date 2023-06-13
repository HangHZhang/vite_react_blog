import ajax from './ajax';

export const reqLogin = (phone, password) => ajax('/login', {phone,password}, 'POST');

export const reqCategoryList = () => ajax('/category/list');

// export const reqAddOrCategory = category => ajax('/category/create', category, 'POST');
export const reqAddOrEditCategory = category => ajax('/category/' + (category._id ? 'update' : 'create'), category, 'POST');

export const reqDeleteCategory = _id => ajax('/category/list/delete',{_id}, 'POST');

export const reqArticleList = () => ajax('/article/list');

export const reqDeleteArticle = _id => ajax('/article/delete', {_id}, 'POST');

export const reqCreateArticle = (article) => ajax('/article/create', article, 'POST');

export const reqPerson = () => ajax('/person');

export const reqUpdatePerson = (person) => ajax('/person/update', person, 'POST');

export const reqUpdatePassword = (userPhone, oldPassword, newPassword) => ajax(BASE+'/person/password', {userPhone, oldPassword, newPassword}, 'POST');

export const reqUpdatePersonAvater = (avaterUrl) => ajax('/person/update/avater', {avaterUrl}, 'POST');

export const reqUploadFileChunk = (formData) => ajax('/upload_file_chunk',formData, 'POST');

export const reqUploadEnd = (_id,filename,extname) => ajax('/upload_end',{_id,filename,extname}, 'POST');

export const reqVerifyUpload = (_id,filename,fileHash) => ajax('/verify_upload',{_id, filename,fileHash,}, 'POST');

export const reqDownloadArticle = (_id) => ajax('/article/list/download',{_id}, 'POST');