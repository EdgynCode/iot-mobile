export const formatFieldName = (key) => {
  const fieldMap = {
    userName: "Tên đăng nhập",
    fullName: "Họ tên",
    doB: "Ngày sinh",
    gender: "Giới tính",
    email: "Email",
    phoneNumber: "Số điện thoại",
    emailConfirmed: "Xác thực Email",
    phoneNumberConfirmed: "Xác thực SĐT",
    twoFactorEnabled: "Xác thực 2 yếu tố",
  };
  return fieldMap[key] || key;
};
