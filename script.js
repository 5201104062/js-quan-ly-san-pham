// ===========================================================
// Bài 3.3 – Ứng dụng Quản lý sản phẩm (mảng + hàm)
// ===========================================================

// Bước 2: mảng chứa danh sách tên sản phẩm
let danhSachSanPham = [
  "Sony Xperia",
  "Samsung Galaxy",
  "Nokia 6",
  "Xiaomi Redmi Note 4",
  "Apple iPhone 6S",
  "Xiaomi Mi 5s Plus",
  "Apple iPhone 8 Plus",
  "Fujitsu F-04E",
  "Oppo A71"
];

// Vị trí sản phẩm đang được sửa (-1 = không sửa sản phẩm nào)
let viTriDangSua = -1;

// Đổi các ký tự đặc biệt để tên sản phẩm không bị hiểu thành mã HTML
function maHoaHTML(chuoi) {
  return chuoi
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Hiện thông báo; loai = "thanh-cong" hoặc "loi"
function hienThongBao(noiDung, loai) {
  const thongBao = document.getElementById("thong-bao");
  thongBao.textContent = noiDung;
  thongBao.className = loai;
}

// Bước 4: hiển thị danh sách sản phẩm lên bảng bằng vòng lặp
function hienThiDanhSach() {
  let html = "";

  for (let i = 0; i < danhSachSanPham.length; i++) {
    const lopDong = (i === viTriDangSua) ? " class='dang-sua'" : "";
    html += "<tr" + lopDong + ">" +
              "<td>" + (i + 1) + "</td>" +
              "<td class='ten' onclick='chonSua(" + i + ")' title='Bấm để sửa tên'>" +
                maHoaHTML(danhSachSanPham[i]) +
              "</td>" +
              "<td><button type='button' onclick='chonSua(" + i + ")'>Edit</button></td>" +
              "<td><button type='button' onclick='xoaSanPham(" + i + ")'>Delete</button></td>" +
            "</tr>";
  }

  if (danhSachSanPham.length === 0) {
    html = "<tr><td colspan='4' class='trong'>Chưa có sản phẩm nào.</td></tr>";
  }

  document.getElementById("danh-sach").innerHTML = html;

  const soLuong = danhSachSanPham.length;
  document.getElementById("dem-san-pham").textContent =
    soLuong + (soLuong === 1 ? " product" : " products");
}

// Kiểm tra tên: không rỗng, không trùng tên sản phẩm khác
// boQuaViTri: vị trí đang sửa (không so với chính nó), -1 khi thêm mới
function kiemTraTen(ten, boQuaViTri) {
  if (ten === "") {
    hienThongBao("Tên sản phẩm không được để trống.", "loi");
    return false;
  }
  for (let i = 0; i < danhSachSanPham.length; i++) {
    if (i !== boQuaViTri && danhSachSanPham[i].toLowerCase() === ten.toLowerCase()) {
      hienThongBao("Sản phẩm \"" + ten + "\" đã có trong danh sách.", "loi");
      return false;
    }
  }
  return true;
}

// Bước 5: thêm một sản phẩm vào danh sách
function themSanPham() {
  const oTenMoi = document.getElementById("ten-moi");
  const ten = oTenMoi.value.trim();
  if (!kiemTraTen(ten, -1)) return;

  danhSachSanPham.push(ten);   // thêm vào cuối mảng
  oTenMoi.value = "";
  hienThiDanhSach();
  hienThongBao("Đã thêm sản phẩm \"" + ten + "\".", "thanh-cong");
}

// Bước 6: bấm vào tên (hoặc nút Edit) thì đưa tên đó lên ô sửa
function chonSua(viTri) {
  viTriDangSua = viTri;
  const oTenSua = document.getElementById("ten-sua");
  oTenSua.value = danhSachSanPham[viTri];
  document.getElementById("khung-sua").hidden = false;
  oTenSua.focus();
  hienThongBao("", "");
  hienThiDanhSach();   // tô sáng dòng đang sửa
}

// Bước 6 (tiếp): nhấn nút Update thì cập nhật tên trong mảng
function capNhatSanPham() {
  if (viTriDangSua === -1) return;
  const ten = document.getElementById("ten-sua").value.trim();
  if (!kiemTraTen(ten, viTriDangSua)) return;

  const tenCu = danhSachSanPham[viTriDangSua];
  danhSachSanPham[viTriDangSua] = ten;
  dongFormSua();
  hienThiDanhSach();
  hienThongBao("Đã sửa \"" + tenCu + "\" thành \"" + ten + "\".", "thanh-cong");
}

function dongFormSua() {
  viTriDangSua = -1;
  document.getElementById("khung-sua").hidden = true;
}

// Bước 7: xóa sản phẩm tại vị trí được bấm, rồi hiển thị lại bảng
function xoaSanPham(viTri) {
  const ten = danhSachSanPham[viTri];
  if (!confirm("Xóa sản phẩm \"" + ten + "\"?")) return;

  danhSachSanPham.splice(viTri, 1);   // xóa 1 phần tử tại vị trí viTri

  if (viTriDangSua === viTri) {
    dongFormSua();
  } else if (viTriDangSua > viTri) {
    viTriDangSua--;   // sản phẩm đang sửa bị dời lên 1 vị trí
  }

  hienThiDanhSach();
  hienThongBao("Đã xóa sản phẩm \"" + ten + "\".", "thanh-cong");
}

// Gắn sự kiện cho các form và nút
document.getElementById("form-them").addEventListener("submit", function (event) {
  event.preventDefault();
  themSanPham();
});

document.getElementById("form-sua").addEventListener("submit", function (event) {
  event.preventDefault();
  capNhatSanPham();
});

document.getElementById("nut-huy").addEventListener("click", function () {
  dongFormSua();
  hienThiDanhSach();
  hienThongBao("", "");
});

// Bước 4: hiển thị danh sách khi mở trang
hienThiDanhSach();
