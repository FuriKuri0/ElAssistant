import CryptoJS from 'crypto-js';
import { useCallback,useRef,useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {changeLabelAction,changeKeyAction, setNotesAction,changeStatusAction,changeDetailAction } from '../store/modules/notes';
import {getAllNotes as getAllNotesApi,query as queryApi,addNote as addNoteApi, updateDetail as updateDetailApi,deleteNote as deleteNoteApi} from '../request/api';
var API_SECRET = "MDIyYTY3N2NiOTBkNjg5YmM2ZmZmMDIx";
var API_KEY = "6ec94ede6d3d4f4599f67c465bd219c2";
const clockPattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//hook 
//notes相关
export const useNotes =  () => {
  const notes = useSelector(state=>state.notes)
  const dispath = useDispatch()
  const {label,allNotes,showDetail,notesDetail,key} = notes
  const getAllNotes =async ()=>{
    const data = await getAllNotesApi() 
    setNotes(data)
  }
  const setNotes = (data) => {
    dispath(setNotesAction(data))
  }
  const changeStatus = (state) => {
    dispath(changeStatusAction(state))
  }
  const changeDetail = (key) => {
    const detail = allNotes.find(v=>v.key===key)
    dispath(changeDetailAction(detail.content))
    dispath(changeKeyAction(key)) 
  }
  const updateDetail = (key,newDetail) => {
    dispath(changeDetailAction(newDetail))
    updateDetailApi(key,newDetail)
  }
  const changeLabel = (label) => {
    dispath(changeLabelAction(label))
  }
  const deleteNote = (key) => {
    deleteNoteApi(key)
    const newNotes = allNotes.filter((v)=>v.key!==key)
    setNotes(newNotes)
  }
  const addNewNote = (key,title,label)=>{
    const newNotes = [{key,title,label},...allNotes]
    setNotes(newNotes)
    addNoteApi(key,title,label)
  }
  const queryNotes =async(keyword)=>{
    changeStatus(false)
    const result = await queryApi(keyword)
    setNotes(result)
  }
  return {
    getAllNotes, queryNotes,addNewNote, deleteNote,label,key,updateDetail,allNotes,showDetail,setNotes,changeStatus,changeDetail,notesDetail
  }
}
//处理label
export const handleLabel = (label) => {
  if(label.includes('js')||label.includes('jsx')||label.includes('javascript')){
    return 'javascript'
  }
  if(label.includes('css')){
    return 'css'
  }
  if(label.includes('scss')){
    return 'scss'
  }
}
// 验证时钟格式的函数
export function isValidClockFormat(str) {
  return clockPattern.test(str);
}

//
export function getWebSocketUrl() {
  // 请求地址根据语种不同变化
  var url = "wss://iat-api.xfyun.cn/v2/iat";
  var host = "iat-api.xfyun.cn";
  var apiKey = API_KEY;
  var apiSecret = API_SECRET;
  var date = new Date().toGMTString();
  var algorithm = "hmac-sha256";
  var headers = "host date request-line";
  var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
  var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  var signature = CryptoJS.enc.Base64.stringify(signatureSha);
  var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  var authorization = btoa(authorizationOrigin);
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
  return url;
}
export function toBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
