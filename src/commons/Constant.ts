import {
  getItemFromLocalStorage,
  getLocalAccessToken,
} from '@/utils/localStorage'
import axios from 'axios'

export enum Events {
  TOAST = 'TOAST',
  LOGOUT = 'LOGOUT',
  SWITCH_KEYBOARD = 'SWITCH_KEYBOARD',
}

export enum ToastTypes {
  ERR = 0, //  red background
  MSG = 1, // dark blue background
  SUCCESS = 2, // green background
}

export enum CheckParams {
  AFFTER = 1,
  INVITE_TEMPLATES = 2,
  TITLE_TIME_TEMPLATES = 3,
  WARNNING_TEMPLATES = 4,
  TITLE_SAVE_PEN_TEMPLATES = 5,
  SUCCESS_CREATE = 6,
  CONFIRM_INFO = 7,
  EDITOR = 8,
  NOTOKEN = 9,
  PAYMENT = 10,
  PAYMENTSUCCESS = 11
  
}

export enum Status {
  ACTIVE = 1, // ĐÃ KÍCH HOẠT THIỆP
  INACTIVE = 2, // CHƯA KÍCH HOẠT
  DRAFT = 3, // BẢN NHÁP
  REQUEST_PAYMENT = 4, //YÊU CẦU TRẢ PHÍ
  EXPIRE = 5 //HẾT HẠN SỬ DỤNG
}

export enum ErrorCodes {
  SUCCESS = 0,
  IMAGE_LIMIT_SIZE = 1,
}

export enum HistoryCodes {
  SUCCESS = 1,
  FAILS = 2,
}
export enum Convert {
  SUCCESS = 1,
  FAILS = 2,
  W_400 = 400,
  W_800 = 800,
}

export const Alias = {
  homePage: '/',
  letterPage: '/letterPage',
  congrats: 'chuc-phuc-chi-tiet',
  login: '/login',
  register: '/dang-ky',
  pwdRecovery: '/khoi-phuc-mat-khau',
  mypage: '/trang-cua-toi',
  services: '/dich-vu',
  createPage: '/tao-thiep-cuoi',
  verifyOtp: '/xac-thuc-otp',
  emailOtp: '/xac-thuc-email',
  customerCare: '/cham-soc-khach-hang',
  editor: '/chinh-sua-thiep',
}

export enum BUTTON_STYLES {
  PINK = 'PINK',
  WHITE = 'WHITE',
  ORRANGE = 'ORRANGE',
  ORANGE = 'ORANGE',
  LIGHT_BLUE = 'LIGHT_BLUE',
  BORDER_LIGHT_BLUE = 'BORDER_LIGHT_BLUE',
  BORDER_PINK = 'BORDER_PINK',
  DARKMODE = 'DARKMODE',
  BLUE = 'BLUE',
  GRAY = 'GRAY',
}

export enum BACKGROUND_STYLES {
  PINK = 'PINK',
  WHITE = 'WHITE',
  YELLOWS = 'YELLOWS',
  GREEN = 'GREEN',
  DRAK = 'DRAK',
  TRANPARENTGREEN = 'TRANPARENTGREEN',
}

export const NAME_INPUT_GROOM = {
  firstName: 'firstName',
  middleName: 'middleName',
  name: 'name',
  isOldBrotherGroom: 'isOldBrotherGroom',
  codingRegion: 'codingRegion',
  phoneNumberOfGroom: 'phoneNumberOfGroom',
  firstFatherNameOfGroom: 'firstFatherNameOfGroom',
  middleFatherNameOfGroom: 'middleFatherNameOfGroom',
  fatherNameOfGroom: 'fatherNameOfGroom',
  phoneNumberOfFatherGroom: 'phoneNumberOfFatherGroom',
  isGoneFather: 'isGoneFather',
  firstMotherNameOfGroom: 'firstMotherNameOfGroom',
  middleMotherNameOfGroom: 'middleMotherNameOfGroom',
  motherNameOfGroom: 'motherNameOfGroom',
  phoneNumberOfMotherGroom: 'phoneNumberOfMotherGroom',
  isGoneMother: 'isGoneMother',
  nameBankOfGroom: 'nameBankOfGroom',
  ownerBankOfGroom: 'ownerBankOfGroom',
  bankOfNumberGroom: 'bankOfNumberGroom',
  qrCodeGroomLink: 'qrCodeGroomLink',
  nameBankOfFatherGroom: 'nameBankOfFatherGroom',
  ownerBankOfFatherGroom: 'ownerBankOfFatherGroom',
  bankOfNumberFatherGroom: 'bankOfNumberFatherGroom',
  qrCodeFatherGroomLink: 'qrCodeFatherGroomLink',
  nameBankOfMotherGroom: 'nameBankOfMotherGroom',
  ownerBankOfMotherGroom: 'ownerBankOfMotherGroom',
  bankOfNumberMotherGroom: 'bankOfNumberMotherGroom',
  qrCodeMotherGroomLink: 'qrCodeMotherGroomLink',
}

export const NAME_INPUT_BRIDE = {
  firstName: 'firstName',
  middleName: 'middleName',
  name: 'name',
  isOldBrotherBride: 'isOldBrotherBride',
  codingRegion: 'codingRegion',
  phoneNumberOfBride: 'phoneNumberOfBride',
  firstFatherNameOfBride: 'firstFatherNameOfBride',
  middleFatherNameOfBride: 'middleFatherNameOfBride',
  fatherNameOfBride: 'fatherNameOfBride',
  phoneNumberOfFatherBride: 'phoneNumberOfFatherBride',
  isGoneFatherBride: 'isGoneFatherBride',
  firstMotherNameOfBride: 'firstMotherNameOfBride',
  middleMotherNameOfBride: 'middleMotherNameOfBride',
  motherNameOfBride: 'motherNameOfBride',
  phoneNumberOfMotherBride: 'phoneNumberOfMotherBride',
  isGoneMotherOfBride: 'isGoneMotherOfBride',
  nameBankOfBride: 'nameBankOfBride',
  ownerBankOfBride: 'ownerBankOfBride',
  bankOfNumberBride: 'bankOfNumberBride',
  qrCodeBrideLink: 'qrCodeBrideLink',
  nameBankOfFatherBride: 'nameBankOfFatherBride',
  ownerBankOfFatherBride: 'ownerBankOfFatherBride',
  bankOfNumberFatherBride: 'bankOfNumberFatherBride',
  qrCodeFatherBrideLink: 'qrCodeFatherBrideLink',
  nameBankOfMotherBride: 'nameBankOfMotherBride',
  ownerBankOfMotherBride: 'ownerBankOfMotherBride',
  bankOfNumberMotherBride: 'bankOfNumberMotherBride',
  qrCodeMotherBrideLink: 'qrCodeMotherBrideLink',
}

export const TIME_AND_LOCATION = {
  dateOfEventWedding: 'dateOfEventWedding',
  timeOfEventWedding: 'timeOfEventWedding',
  locationOfWedding: 'locationOfWedding',
  mapDirectLink: 'mapDirectLink',
  isDisplayCountDown: 'isDisplayCountDown',
  contentOfCountDown: 'contentOfCountDown',
}

export const Egagement = {
  dateOfEventEgagement: 'dateOfEventEgagement',
  timeOfEventEgagement: 'timeOfEventEgagement',
  locationOfEgagement: 'locationOfEgagement',
}

export const Interrogation = {
  dateOfEventInterrogation: 'dateOfEventInterrogation',
  timeOfEventInterrogation: 'timeOfEventInterrogation',
  locationOfInterrogation: 'locationOfInterrogation',
}

export const EventOfProgram = {
  timeToWellcome: 'timeToWellcome',
  timeToCelebrate: 'timeToCelebrate',
  timeToDinner: 'timeToDinner',
  timeToMusic: 'timeToMusic',
}

export const INPUT_FIELDS = {
  videoLink: 'videoLink',
  isUseConfirm: 'isUseConfirm',
  isUseGuestBook: 'isUseGuestBook',
  password: 'password',
  isEffectOfOpenning: 'isEffectOfOpenning',
  referralCode: 'referralCode',
  confirmName: 'confirmName',
  confirmPhone: 'confirmPhone',
  confirmEmail: 'confirmEmail',
  confirmAdd: 'confirmAdd',
  confirmNote: 'confirmNote',
}

export const APi = {
  BaseUrl: 'http://14.225.205.60:3000/api',
  uploadImage: '/upload-images',
  createInvitation: '/create-invitation',
  listProduct: '/list-product',
  anotherProduct: '/list-other-product',
  updateInvitation: '/update-invitation',
  listInvitation: '/list-invitation',
  deleteInvitation: '/delete-invitation',
  excelClient: '/export-excel/recurrent-info',
  exportWish: '/export-excel/wish',
  invitationDetail: '/invitation-detail'
}

export const BankData = 'https://api.vietqr.io/v2/banks'

export const config = {
  headers: { Authorization: 'Bearer ' + getLocalAccessToken() },
}

export const itemLocal = getItemFromLocalStorage('createLeter')
