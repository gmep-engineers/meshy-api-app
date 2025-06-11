# code setup

Create the config file in `etc/config.js`

```
const config = {
API_KEY: "the-meshy-api-key",
BASE_URL: "http://(server address):3000",
AWS_S3_BUCKET: "gmep-meshy-api-images-2025-06-10",
AWS_ACCESS_KEY_ID: "(aws access key id)",
AWS_SECRET_ACCESS_KEY: "(aws secret access key)",
};

module.exports = config;
```

Ensure that `uploads/` and `tasks.txt` have sufficient permissions

```
mkdir uploads
chmod 644 uploads
touch tasks.txt
chmod 644 tasks.txt
```

run the app

```
node app.js
```

### Notes

- The `uploads` directory will not clear on it's own
- Entries in `tasks.txt` do not clear on their own
- Items uploaded to S3 do no clear on their own
