import axiosInstance from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

const register = async (
  id,
  firstName,
  lastName,
  gender,
  doB,
  userName,
  email,
  password,
  phoneNumber,
  discriminator
) => {
  try {
    const response = await axiosInstance.post(
      `Account/register?usertype=${discriminator}`,
      {
        id,
        firstName,
        lastName,
        gender,
        doB,
        userName,
        email,
        password,
        phoneNumber,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const login = async (userName, password) => {
  const response = await axiosInstance.post("Account/Login", {
    userName,
    password,
  });
  if (response.data) {
    const { userId, jwtAccessToken, jwtRefreshToken } = response.data;
    await SecureStore.setItemAsync("accessToken", jwtAccessToken);
    await SecureStore.setItemAsync("refreshToken", jwtRefreshToken);
    await SecureStore.setItemAsync("userId", userId);
  }
  return response.data;
};

const logout = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");

    if (!accessToken) {
      throw new Error("No access token found for logout.");
    }

    const response = await axiosInstance.delete("Account/Logout", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("userId");

    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

const getCurrentUser = async () => {
  const user = JSON.parse(await SecureStore.getItemAsync("user"));

  if (user && user.userId) {
    const response = await axiosInstance.get(
      `User/GetUserDetails?userid=${user.userId}`
    );
    return response.data;
  }
  return null;
};

const updateUserInfo = async (userData) => {
  const response = await axiosInstance.patch("User/UpdateUserInfo", userData);
  return response.data;
};

const sendLinkResetPassword = async (email, clientUri) => {
  try {
    const response = await axiosInstance.post(
      "Account/SendEmailResetPassword",
      {
        email,
        clientUri,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error sending reset password email:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const resetPassword = async (password, confirmPassword, token, email) => {
  try {
    const response = await axiosInstance.post("Account/ResetPassword", {
      password,
      confirmPassword,
      token,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserInfo,
  sendLinkResetPassword,
  resetPassword,
};

export default AuthService;
