# React - Laravel - Docker Started Pack

<p align="center">
  <!---->
  <!-- <img width="50%" src="./client/src/assets/nfclogo.png" /> -->
</p>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18.2.0-blue.svg?style=flat-square" alt="react" title="React" /></a><!--
  --><a href="https://ant.design/"><img src="https://img.shields.io/badge/Ant%20Design-5.5.2-blue.svg?style=flat-square" alt="Antd" title="antd" /></a><!--
  --><a href="https://laravel.com/"><img src="https://img.shields.io/badge/Laravel-10.x-orange.svg?style=flat-square" alt="laravel" title="Laravel" /></a>
</p>

## What is the purpose of this repository?

This is a quick starter repository for creating a project with React and Laravel (Dockerized), which includes:

<p>
  <!-- <img src="https://firebasestorage.googleapis.com/v0/b/gr1-project-bebf6.appspot.com/o/app_preview%2FScreenshot%202023-07-17%20213028.png?alt=media&token=c8a0cda6-82ad-4d39-bb13-89ccc5e6a8d8" /> -->
</p>

## Table of Contents

- [System requirements](#system-requirements)
- [Production && Domains](#production-and-domains)
- [Setup and Configuration](#setup-and-configuration)
- [Possible encounter errors](#possible-encounter-errors)
- [License](#license)

## System requirements

- Docker >= 20.10
- Docker compose plugin

## Production && Domains

- Client: `http://localhost:3000`
- Server: `http://localhost:3000/api/`
- Phpmyadmin: `http://phpmyadmin.localhost:3000`
- Traefik: `http://traefik.localhost:3000`

## Setup and Configuration

Sau khi clone project về chạy câu lệnh:

```sh
make devup
```

Câu lệnh sẽ tạo file `.env` ở thư mục root bao gồm các biến môi trường về domain và database có thể custom chúng bằng cách chỉnh sửa file này

Cài đặt các dependencies:

```sh
make devinstall
```

Command to update both client and server-side dependencies:
<br/>
Câu lệnh để update dependencies:

```sh
make devupdate
```

Câu lệnh để migrate database:

```sh
make devmigrate
```

Câu lệnh để seed fake data:

```sh
make devfresh
```

Câu lệnh để vào shell docker (APP_NAME là biến trong .env ở server):

```sh
docker exec -it {APP_NAME}-server-1 sh
docker exec -it {APP_NAME}-client-1 sh
```

Câu lệnh để cấp quyền chỉnh sửa file trong server nếu bị VS Code hỏi

```sh
sudo chown -R username /path/to/working/directory
```

`server` sẽ được khởi chạy ở chế độ `--detached` có thể truy cập theo đường dẫn `http://localhost:3000/api/`
<br>
<br>

Khởi chạy dự án:

```sh
make devrun
```

Có thể truy cập giao diện người dùng `client` theo đường dẫn `http://localhost:3000`
<br>
<br>
Có thể truy cập `phpmyadmin` để xem dữ liệu trong database theo đường dẫn: `http://phpmyadmin.localhost:3000` với credential mặc định của DB là:

```
DB_USERNAME=root
DB_PASSWORD=admin
```

Tắt ứng dụng:

```sh
make devdown
```

Xóa tất cả docker images, container:

```sh
make devclean
```

## Possible encounter errors

Lỗi: `Docker is not running.` hoặc `Cannot connect to the Docker daemon at unix:///home/<you>/.docker/desktop/docker.sock.` chạy câu lệnh sau đây ở thư mục gốc:

```sh
export DOCKER_HOST=unix:///var/run/docker.sock
```

Lỗi: `The stream or file "/storage/logs/laravel.log" could not be opened` chạy câu lệnh sau đây ở thư mục `server`:

```sh
sudo chmod -R ugo+rw storage
```

## License

This project is licensed under the [MIT License](LICENSE).
