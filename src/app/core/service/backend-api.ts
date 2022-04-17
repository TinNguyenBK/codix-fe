import { environment } from '../../../environments/environment';

// baseURL API product
const baseURL = environment.baseUrl;

// const baseURL= 'http://localhost:8888';

// Sign up
export const registerApi = `${baseURL}/auth/signup/`;
// Send Mail
export const verifyEmailApi = `${baseURL}/auth/verify-email/`;

export const checkExistApi = `${baseURL}/auth/check-exists`;
//OTP
export const otpApi = `${baseURL}/auth/send-otp?phone=:phoneNumber`;

export const verifyOtpApi = `${baseURL}/auth/verify-otp?uuid=:UUID&otp=:OTP`;

export const activePhoneApi = `${baseURL}/auth/active-phone`;

export const changeEditEmailApi = `${baseURL}/auth/verify-otp/check-edit-email`;

// export const activateEmailApi = `${baseURL}/auth/verify-email/:id`;
export const activateEmailApi = `${baseURL}/auth/active-acount`;

// Get Advisor
export const getAdvisorApi = `${baseURL}/auth/signup`;
//Update Advisor
export const updateAdvisorApi = `${baseURL}/auth/become-an-advisor/:id`;

export const cartApi = `${baseURL}/cart/`;
export const addCartApi = `${baseURL}/cart-item/`;
export const createCartApi = `${baseURL}/cart/create`;
export const checkCartHasInActiveProductApi = `${baseURL}/cart/check-has-inactive-product`;
export const updateDeliveryAddressApi = `${baseURL}/address/update`;
export const updateCustomerInformationApi = `${baseURL}/customer-information/:id`;
export const updateCustomerInformationÁnomynoudApi = `${baseURL}/customer-information/anomynous/:id`;
export const updateShippingApi = `${baseURL}/shipping/:id`;

export const profileGetPreSignedUrl = `${baseURL}/profile/get-presigned-url`;

// export const uploadImageApi = 'http://localhost:8888/profile/upload_profile_image'; // For back-end uploading

// Get and update profile
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

//Languages
export const changeLanguages = `${baseURL}/auth/change-language`;

export const getAreaApi = `${baseURL}/area`;

export const registerUserrApi = `${baseURL}/users/register`;

export const registerColaboratorApi = `${baseURL}/collaborators/register`;

// Sign in Supplier
export const loginUserApi = `${baseURL}/users/login/basic`;

export const loginColaboratorApi = `${baseURL}/collaborators/login/basic`;

export const supplierProfileApi = `${baseURL}/suppliers/profile`;

export const userProfileApi = `${baseURL}/users/profile`;

export const colaboratorProfileApi = `${baseURL}/collaborators/profile`;

export const changePasswordColApi = `${baseURL}/collaborators/changePassword`;

export const changePasswordSupApi = `${baseURL}/suppliers/changePassword`;

export const profileGetPreSignedUrlSup = `${baseURL}/suppliers/avatarPresignedUrl`;

export const profileGetPreSignedUrlCol = `${baseURL}/collaborators/avatarPresignedUrl`;

export const certificateGetPreSignedUrlSup = `${baseURL}/suppliers/certificatePresignedUrl`;

// Forgot Password
export const forgotPasswordApi = `${baseURL}/forgotPassword`;

export const verifyForgotPasswordTokenApi = `${baseURL}/resetPassword/:userId/:token1/:token2`;

export const checkEmailExistingApi = `${baseURL}/admins/checkEmail`;

//Khách hàng mua

export const createContactApi = `${baseURL}/collaborators/:collaboratorId/customers`;

export const getCustomerListApi = `${baseURL}/collaborators/:collaboratorId/customers?filter=:query`;

export const getSearchCustomerListApi = `${baseURL}/collaborators/:collaboratorId/customers?filter=:query`;

export const getCustomerDetailApi = `${baseURL}/collaborators/:collaboratorId/customers/:id`;

export const updateContactApi = `${baseURL}/collaborators/:collaboratorId/customers/:id`;

export const checkUpdateContactApi = `${baseURL}/collaborators/:collaboratorId/customer/:id/pendingUpdate`;

export const searchCustomerByTelApi = `${baseURL}/collaborators/:collaboratorId/customers-find-by-tel/:telNumber`;

export const createContactHaveTelApi = `${baseURL}/collaborators/:collaboratorId/customers-add-by-tel/:telNumber`;

export const customerGetPreSignedUrl = `${baseURL}/customers/avatarPresignedUrl`;

export const deleteContactHaveTelApi = `${baseURL}/collaborators/:collaboratorId/customers-delete-by-tel/:telNumber`;

//Supplier

export const getIndustryGroupApi = `${baseURL}/suppliers/:supplierId/industry-groups`;

export const productCategoryApi = `${baseURL}/suppliers/:supplierId/products`;

export const productGetPreSignedUrl = `${baseURL}/product-categories/avatarPresignedUrl`;

export const getProductCategoriesApi = `${baseURL}/suppliers/:supplierId/products?filter=:query`;

export const getCategoryDetailApi = `${baseURL}/suppliers/:supplierId/products/:id`;

export const deleteCategoryDetailApi = `${baseURL}/suppliers/:supplierId/products/:id`;

export const productInventoryApi = `${baseURL}/suppliers/:supplierId/product-inventories`;

export const getProductInventoriesApi = `${baseURL}/suppliers/:supplierId/product-inventories?filter=:query`;

export const getInventoryDetailApi = `${baseURL}/suppliers/:supplierId/product-inventories/:id`;

export const setShipingFeeApi = `${baseURL}/suppliers/:supplierId/ship-fees`;

export const getShipingFeeApi = `${baseURL}/suppliers/:supplierId/ship-fees`;

export const updateShipFeeByOrderIdApi = `${baseURL}/suppliers/:supplierId/orders/:id/ship-fee`;

//Collaborator

export const getIndustryGroupColApi = `${baseURL}/collaborators/:collaboratorId/industry-groups`;

export const getProductCategoryColApi = `${baseURL}/collaborators/:collabId/product-categories?filter=:query`;

export const getProductInventoriesColApi = `${baseURL}/collaborators/:collabId/product-inventories?filter=:query`;

export const getCategoryDetailColApi = `${baseURL}/collaborators/:collabId/product-categories/:id`;

export const getInventoryDetailColApi = `${baseURL}/collaborators/:collabId/product-inventories/:id`;

//Order

export const getOrderDetailApi = `${baseURL}/suppliers/:supplierId/orders/:id`;

export const getTotalOrderApi = `${baseURL}/suppliers/:supplierId/orders/count?where=:query`;

export const getOrderHistoryApi = `${baseURL}/suppliers/:supplierId/orders?filter=:query`;

// notification
export const supplierGetTotalNotificationApi = `${baseURL}​/suppliers/:id/noti-unread-count?where=:query`;
export const supplierGetNotificationsApi = `${baseURL}/suppliers/:id/noti?filter=:query`;
export const supplierMarkNotificationAsReadApi = `${baseURL}/suppliers/:userId/noti/:notiId/noti-mark-as-read`;
export const supplierMarkAllNotificationAsReadApi = `${baseURL}/suppliers/:userId/noti-mark-all-as-read`;
export const supplierDeleteNotificationByIdApi = `${baseURL}/suppliers/:userId/noti/:notiId`;
export const supplierDeleteAllNotificationsApi = `${baseURL}/suppliers/:userId/noti`;

// dept
export const supplierGetTotalSupplierDeptsApt = `${baseURL}/suppliers/:supplierId/supplier-depts/count?where=:query`;
export const supplierGetSupplierDeptByIdApt = `${baseURL}/suppliers/:supplierId/supplier-depts/:id`;
export const supplierGetSupplierDeptsApt = `${baseURL}/suppliers/:supplierId/supplier-depts?filter=:query`;
export const supplierFinishSupplierDeptByIdApt = `${baseURL}/suppliers/:supplierId/supplier-depts/:id?filter=:query`;

//Employee Management
export const addEmployeeApi = `${baseURL}/codix`;
export const getTotalEmployeeApi = `${baseURL}/codix/count`;
export const getEmployeeHistoryApi = `${baseURL}/codix`;
export const getEmployeeDetailApi = `${baseURL}/codix/:id`;
