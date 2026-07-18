import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, totalAmount } = body;

    // 📬 1. CẤU HÌNH EMAIL CỦA CẬU Ở ĐÂY:
    const SHOP_EMAIL = "phamvuanhhang@gmail.com"; // Điền Gmail của cậu (Vừa dùng để gửi, vừa dùng để nhận đơn)
    const GMAIL_APP_PASSWORD = "jduf yteb yekq okrq"; // Mật khẩu ứng dụng Gmail 16 ký tự (Xem hướng dẫn lấy ở dưới)

    // 2. Tự động gom danh sách sản phẩm thành định dạng danh sách HTML
    let productListHtml = "";
    items.forEach((item: any, index: number) => {
      productListHtml += `
        <li style="margin-bottom: 8px; color: #4b5563;">
          <strong style="color: #1f2937;">${item.name}</strong> (x${item.quantity}) - 
          <span style="color: #ec4899; font-weight: bold;">${item.price}</span>
        </li>`;
    });

    // 3. Khởi tạo cấu hình gửi mail qua Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SHOP_EMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    // 4. Thiết kế giao diện Email gửi về cho thật đẹp mắt, dễ nhìn
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #f3f4f6; border-radius: 24px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #ec4899; text-align: center; margin-bottom: 5px; font-size: 24px;">🔔 ĐƠN HÀNG MỚI TỪ BBB'S SHOP!</h2>
        <p style="text-align: center; color: #9ca3af; font-size: 14px; margin-top: 0;">Hệ thống vừa ghi nhận một đơn hàng mới tự động</p>
        
        <hr style="border: none; border-top: 1px dashed #e5e7eb; margin: 20px 0;">
        
        <h3 style="color: #1f2937; margin-bottom: 12px;">👤 Thông tin khách hàng</h3>
        <p style="margin: 6px 0; color: #4b5563;"><strong>Họ và tên:</strong> ${customer.name}</p>
        <p style="margin: 6px 0; color: #4b5563;"><strong>Số điện thoại:</strong> ${customer.phone}</p>
        <p style="margin: 6px 0; color: #4b5563;"><strong>Địa chỉ giao hàng:</strong> ${customer.address}</p>
        <p style="margin: 6px 0; color: #4b5563;"><strong>Hình thức:</strong> ${customer.paymentMethod === "BANK" ? "Chuyển khoản QR 🏧" : "Tiền mặt COD 💵"}</p>
        <p style="margin: 6px 0; color: #4b5563;"><strong>Ghi chú từ khách:</strong> ${customer.note || "Không có"}</p>
        
        <hr style="border: none; border-top: 1px dashed #e5e7eb; margin: 20px 0;">
        
        <h3 style="color: #1f2937; margin-bottom: 12px;">🛒 Danh sách sản phẩm đặt mua</h3>
        <ul style="padding-left: 20px; margin: 0;">
          ${productListHtml}
        </ul>
        
        <hr style="border: none; border-top: 1px dashed #e5e7eb; margin: 20px 0;">
        
        <div style="background-color: #fdf2f8; padding: 15px; border-radius: 16px; text-align: right;">
          <span style="font-size: 16px; color: #4b5563; font-weight: bold;">Tổng tiền thanh toán:</span>
          <span style="font-size: 22px; color: #ec4899; font-weight: bold; margin-left: 10px;">${totalAmount}</span>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px;">💖 Chúc chủ shop BBB's Shop ngày mới bùng nổ doanh số mỏi tay!</p>
      </div>
    `;

    // 5. Tiến hành bắn Email
    await transporter.sendMail({
      from: `"BBB's Shop" <${SHOP_EMAIL}>`,
      to: SHOP_EMAIL, // Đơn hàng tự gửi về chính hòm thư này của cậu luôn để cậu check
      subject: `🚨 ĐƠN HÀNG MỚI từ khách hàng ${customer.name} (${totalAmount})`,
      html: emailTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi gửi Email:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}