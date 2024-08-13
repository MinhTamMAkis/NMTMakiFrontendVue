# Sử dụng một base image phù hợp, ví dụ: node:14 hoặc node:16
FROM node:14

# Set working directory
WORKDIR /app

# Copy tất cả file từ thư mục hiện tại vào container
COPY . .

# Cài đặt các dependencies (nếu có package.json)
RUN npm install

# Xây dựng ứng dụng Vue.js nếu cần thiết (nếu bạn sử dụng Vue CLI)
# RUN npm run build

# Lệnh khởi chạy server tĩnh để phục vụ các file HTML/JS
CMD ["npx", "http-server", "-p", "8080"]
