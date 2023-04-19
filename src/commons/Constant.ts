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
  letterPage: '/letterPage',
  congrats: '/chuc-phuc-chi-tiet',
  login: '/login',
  register: '/dang-ky',
  pwdRecovery: '/khoi-phuc-mat-khau',
  mypage: '/trang-cua-toi',
  services: '/dich-vu',
  createPage: '/tao-thiep-cuoi',
  verifyOtp: '/xac-thuc-otp',
  customerCare: '/cham-soc-khach-hang'
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
}

export const NAME_INPUT_GROOM = {
  firstName: "firstName",
  middleName: "middleName",
  name: "name",
  isOldBrotherGroom: "isOldBrotherGroom",
  codingRegion: "codingRegion",
  phoneNumberOfGroom: "phoneNumberOfGroom",
  firstFatherNameOfGroom: "firstFatherNameOfGroom",
  middleFatherNameOfGroom: "middleFatherNameOfGroom",
  fatherNameOfGroom: 'fatherNameOfGroom',
  phoneNumberOfFatherGroom: 'phoneNumberOfFatherGroom',
  isGoneFather: 'isGoneFather',
  firstMotherNameOfGroom: "firstMotherNameOfGroom",
  middleMotherNameOfGroom: "middleMotherNameOfGroom",
  motherNameOfGroom: "motherNameOfGroom",
  phoneNumberOfMotherGroom: "phoneNumberOfMotherGroom",
  isGoneMother: "isGoneMother",
  nameBankOfGroom: "nameBankOfGroom",
  ownerBankOfGroom: "ownerBankOfGroom",
  bankOfNumberGroom: "bankOfNumberGroom",
  qrCodeGroomLink: "qrCodeGroomLink",
  nameBankOfFatherGroom: "nameBankOfFatherGroom",
  ownerBankOfFatherGroom: "ownerBankOfFatherGroom",
  bankOfNumberFatherGroom: "bankOfNumberFatherGroom",
  qrCodeFatherGroomLink: "qrCodeFatherGroomLink",
  nameBankOfMotherGroom: "nameBankOfMotherGroom",
  ownerBankOfMotherGroom: "ownerBankOfMotherGroom",
  bankOfNumberMotherGroom: "bankOfNumberMotherGroom",
  qrCodeMotherGroomLink: "qrCodeMotherGroomLink"
};

export const NAME_INPUT_BRIDE = {
  firstName: "firstName",
  middleName: "middleName",
  name: "name",
  isOldBrotherBride: "isOldBrotherBride",
  codingRegion: "codingRegion",
  phoneNumberOfBride: "phoneNumberOfBride",
  firstFatherNameOfBride: "firstFatherNameOfBride",
  middleFatherNameOfBride: "middleFatherNameOfBride",
  fatherNameOfBride: "fatherNameOfBride",
  phoneNumberOfFatherBride: "phoneNumberOfFatherBride",
  isGoneFatherBride: "isGoneFatherBride",
  firstMotherNameOfBride: "firstMotherNameOfBride",
  middleMotherNameOfBride: "middleMotherNameOfBride",
  motherNameOfBride: "motherNameOfBride",
  phoneNumberOfMotherBride: "phoneNumberOfMotherBride",
  isGoneMotherOfBride: "isGoneMotherOfBride",
  nameBankOfBride: "nameBankOfBride",
  ownerBankOfBride: "ownerBankOfBride",
  bankOfNumberBride: "bankOfNumberBride",
  qrCodeBrideLink: "qrCodeBrideLink",
  nameBankOfFatherBride: "nameBankOfFatherBride",
  ownerBankOfFatherBride: "ownerBankOfFatherBride",
  bankOfNumberFatherBride: "bankOfNumberFatherBride",
  qrCodeFatherBrideLink: "qrCodeFatherBrideLink",
  nameBankOfMotherBride: "nameBankOfMotherBride",
  ownerBankOfMotherBride: "ownerBankOfMotherBride",
  bankOfNumberMotherBride: "bankOfNumberMotherBride",
  qrCodeMotherBrideLink: "qrCodeMotherBrideLink"
};

export const TIME_AND_LOCATION = {
  dateOfEventWedding: "dateOfEventWedding",
  timeOfEventWedding: "timeOfEventWedding",
  locationOfWedding: "locationOfWedding",
  mapDirectLink: "mapDirectLink",
  isDisplayCountDown: "isDisplayCountDown",
  contentOfCountDown: "contentOfCountDown"
};

export const Egagement = {
  dateOfEventEgagement: "dateOfEventEgagement",
  timeOfEventEgagement: "timeOfEventEgagement",
  locationOfEgagement: "locationOfEgagement"
}

export const Interrogation = {
  dateOfEventInterrogation: "dateOfEventInterrogation",
  timeOfEventInterrogation: "timeOfEventInterrogation",
  locationOfInterrogation: "locationOfInterrogation"
}

export const EventOfProgram = {
  timeToWellcome: "timeToWellcome",
  timeToCelebrate: "timeToCelebrate",
  timeToDinner: "timeToDinner",
  timeToMusic: "timeToMusic"
}

export const INPUT_FIELDS = {
  videoLink: "videoLink",
  isUseConfirm: 'isUseConfirm',
  isUseGuestBook: 'isUseGuestBook',
  password: 'password',
  isEffectOfOpenning: 'isEffectOfOpenning'
}

export const APi = {
  BaseUrl: 'http://172.173.169.122:3000/api',
  uploadImage: '/upload-images'
}