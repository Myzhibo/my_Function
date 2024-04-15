// @ts-ignore
import uuid from './uuid';
import axios from 'axios';

let cb;
const form = document.createElement('form');
const input = document.createElement('input');

document.getElementsByTagName('body')[0].appendChild(form);

form.appendChild(input);
form.style.position = 'fixed';
form.style.left = '-10000px';

input.type = 'file';
input.addEventListener('change', change);

function change(event) {
  if (!input.files || !input.files.length) {
    return;
  }
  const files = [...input.files];
  form.reset();
  if (input.disabled) {
    return;
  }
  cb && cb(files, event);
}

export function selectFile(options, callback) {
  input.accept = '';
  input.disabled = false;
  input.multiple = false;
  cb = callback;
  if (options.disabled) {
    return;
  }
  Object.keys(options).forEach(key => {
    input[key] = options[key];
  });
  input.click();
}

export async function uploadFileToOss({ file, auth, uid, ext = 'jpg' }, options) {
  uid = uid || uuid();
  const filename = `${uid}.${ext}`;
  const url = await uploadToOss({ file, auth, filename }, options);
  return { uid, url };
}

export async function uploadToOss({ file, auth, filename }, options) {
  const key = `${auth.key}${filename}`;
  const form = new FormData();
  form.append('key', key);
  form.append('policy', auth.policy);
  form.append('OSSAccessKeyId', auth.accessId);
  form.append('success_action_status', '200');
  form.append('signature', auth.signature);
  form.append('file', file);
  await axios.post(auth.host, form, options);
  const url = `${auth.host}${key}`;
  return url;
}

export function base64ToFile(base64, filename) {
  const arr = base64.split(',');
  const match = arr[0].match(/:(.*?);/);
  const mime = match ? match[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
