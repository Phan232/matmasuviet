# Mật Mã Sử Việt

Ứng dụng React + Vite mô phỏng nền tảng học lịch sử qua quiz, thu thập từ khóa và giải mã thông điệp.

## Chạy dự án

```powershell
cd D:\HocTap\Ky8\VNR\weblichsu
npm install
npm run dev
```

Mở URL Vite in ra, thường là:

```text
http://localhost:5173
```

## Build chạy bằng HTML

```powershell
npm run build
```

Sau đó mở:

```text
D:\HocTap\Ky8\VNR\weblichsu\dist\index.html
```

## Tài khoản và phân quyền

- `admin`: dùng tài khoản cấu hình trong `src/data/mockData.js` tại `ADMIN_ACCOUNT`.
- `user`: đăng ký trực tiếp trên giao diện, sau đó có thể chơi quiz, lưu tiến trình, bình luận và lên bảng xếp hạng.

Chỉ role `admin` mới thấy và vào được trang quản trị.

## Dữ liệu

Ứng dụng hiện lưu dữ liệu bằng `localStorage`, gồm:

- phiên đăng nhập;
- tài khoản user đã đăng ký;
- quiz admin tạo mới;
- leaderboard;
- bình luận;
- huy hiệu và thống kê admin.

Nếu muốn reset dữ liệu demo, xóa localStorage của trang trong trình duyệt.

## Lệnh hữu ích

```powershell
npm run lint
npm run build
npm run preview
```
