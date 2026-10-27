
/*
 * SEND MAIL - GỬI THƯ ẨN DANH
 * Email gửi đi: Gmail đã kết nối trong EmailJS.
 */

const EMAILJS_PUBLIC_KEY = "bHX0iRKpfY8oiEPaX";
const EMAILJS_SERVICE_ID = "service_423ug79";
const EMAILJS_TEMPLATE_ID = "template_6vduhue";

// Lấy các phần tử trên giao diện
const form = document.getElementById("mailForm");
const sendButton = document.getElementById("sendButton");
const buttonText = document.getElementById("buttonText");
const statusMessage = document.getElementById("statusMessage");

// Hiển thị thông báo
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.hidden = false;
}

// Khởi tạo EmailJS
const isConfigured =
    EMAILJS_PUBLIC_KEY &&
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID;

if (isConfigured && window.emailjs) {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
}

// Xử lý gửi thư
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!isConfigured || !window.emailjs) {
        showStatus(
            "Không thể kết nối EmailJS. Vui lòng kiểm tra cấu hình.",
            "error"
        );
        return;
    }

    // Lấy dữ liệu người nhận và nội dung thư
    const recipientName = document
        .getElementById("recipientName")
        .value.trim();

    const recipientEmail = document
        .getElementById("recipientEmail")
        .value.trim();

    const subject = document
        .getElementById("subject")
        .value.trim();

    const message = document
        .getElementById("message")
        .value.trim();

    // Kiểm tra dữ liệu bắt buộc
    if (!recipientName || !recipientEmail || !subject || !message) {
        showStatus(
            "Vui lòng nhập đầy đủ thông tin người nhận và nội dung thư.",
            "error"
        );
        return;
    }

    // Chỉ gửi thông tin cần thiết.
    // Không gửi tên hoặc email cá nhân của người dùng.
    const templateParams = {
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        subject: subject,
        message: message
    };

    sendButton.disabled = true;
    buttonText.textContent = "Đang gửi thư...";
    statusMessage.hidden = true;

    try {
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        showStatus(
            `Đã gửi email thành công đến ${recipientEmail}!`,
            "success"
        );

        form.reset();

    } catch (error) {
        console.error("EmailJS error:", error);

        showStatus(
            "Gửi email thất bại. Hãy kiểm tra Email Template, " +
            "Email Service và kết nối mạng rồi thử lại.",
            "error"
        );

    } finally {
        sendButton.disabled = false;
        buttonText.textContent = "Gửi thư ẩn danh";
    }
});
