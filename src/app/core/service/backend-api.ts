import { environment } from '../../../environments/environment';

// baseURL API product
const baseURL = environment.baseUrl;

// const baseURL= 'http://localhost:8888';

// export const activateEmailApi = `${baseURL}/auth/verify-email/:id`;
export const activateEmailApi = `${baseURL}/auth/active-acount`;
export const profileGetPreSignedUrl = `${baseURL}/profile/get-presigned-url`;

// export const uploadImageApi = 'http://localhost:8888/profile/upload_profile_image'; // For back-end uploading

export const myProfileApi = `${baseURL}/profile`;
// Change password
export const changePasswordApi = `${baseURL}/profile/change-password`;

export const getOrderByIdApi = `${baseURL}/orders/order/:id`;
// Create Order
export const createOrderApi = `${baseURL}/orders`;

export const resetPasswordApi = `${baseURL}/auth/reset-password`;

// resent mail active
export const resentEmailApi = `${baseURL}/auth/resent-email`;

// decrypt Token
export const decryptToken = `${baseURL}/auth/token`;


// Forgot Password
export const forgotPasswordApi = `${baseURL}/forgotPassword`;

export const verifyForgotPasswordTokenApi = `${baseURL}/resetPassword/:userId/:token1/:token2`;

export const checkEmailExistingApi = `${baseURL}/admins/checkEmail`;

//Employee Management
export const addEmployeeApi = `${baseURL}/codix`;
export const getTotalEmployeeApi = `${baseURL}/codix/count`;
export const getEmployeeHistoryApi = `${baseURL}/codix`;
export const getEmployeeDetailApi = `${baseURL}/codix/:id`;
