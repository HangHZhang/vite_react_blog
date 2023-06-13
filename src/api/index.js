import ajax from './ajax';

const BASE = 'http://127.0.0.1:4523/m1/2258972-0-default';

export const reqLogin = (phone, password) => ajax(BASE+'/login', {phone,password}, 'POST');

export const reqCategoryList = () => ajax(BASE+'/category/list');

// export const reqAddOrCategory = category => ajax(BASE+'/category/create', category, 'POST');
export const reqAddOrEditCategory = category => ajax(BASE+'/category/' + (category._id ? 'update' : 'create'), category, 'POST');

export const reqDeleteCategory = _id => ajax(BASE+'/category/list/delete',{_id}, 'POST');

export const reqArticleList = () => ajax(BASE+'/article/list');

export const reqDeleteArticle = _id => ajax(BASE+'/article/delete', {_id}, 'POST');

export const reqCreateArticle = (article) => ajax(BASE+'/article/create', article, 'POST');

export const reqPerson = () => ajax(BASE+'/person');

export const reqUpdatePerson = (person) => ajax(BASE+'/person/update', person, 'POST');

export const reqUpdatePassword = (userPhone, oldPassword, newPassword) => ajax(BASE+'/person/password', {userPhone, oldPassword, newPassword}, 'POST');

export const reqUpdatePersonAvater = (avaterUrl) => ajax(BASE+'/person/update/avater', {avaterUrl}, 'POST');

export const reqUploadFileChunk = (formData) => ajax(BASE+'/upload_file_chunk',formData, 'POST');

export const reqUploadEnd = (_id,filename,extname) => ajax(BASE+'/upload_end',{_id,filename,extname}, 'POST');

export const reqVerifyUpload = (_id,filename,fileHash) => ajax(BASE+'/verify_upload',{_id, filename,fileHash,}, 'POST');

export const reqDownloadArticle = (_id) => ajax(BASE+'/article/list/download',{_id}, 'POST');