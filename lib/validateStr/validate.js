export const Validate = (str) => {
    return str.normalize('NFD') // chuẩn hóa theo NFD
        .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
        .replace(/đ/g, 'd').replace(/Đ/g, 'D'); // TH Đặc biệt
}