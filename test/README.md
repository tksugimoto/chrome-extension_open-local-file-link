## Test
1. Start http server
    ```sh
    docker-compose up -d
    ```
1. Open page
    - http://127.0.0.1:80/index.html
        - If you want to change `127.0.0.1:80`, set the `HTTPD_SERVER_BIND_IP_PORT` environment variable.
            - Reference: [.env.example](.env.example)
