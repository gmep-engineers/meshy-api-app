const { imageSizeFromFile } = require("image-size/fromFile");
const config = require("../etc/config");
const axios = require("axios");
const fs = require("fs");

const { readFile } = require("node:fs/promises");
const {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} = require("@aws-sdk/client-s3");

const image = {
  post: async function (req, res) {
    const files = req.files;
    const s3Images = [];
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    });
    for (let i = 0; i < files.length; i++) {
      try {
        const dimensions = await imageSizeFromFile(
          "./uploads/" + files[i].filename
        );
        if (dimensions.width > 60000 || dimensions.height > 60000) {
          return res.status(400).send({ error: "image dimensions too large" });
        } else {
          const command = new PutObjectCommand({
            Bucket: config.AWS_S3_BUCKET,
            Key: files[i].originalname,
            Body: await readFile("./uploads/" + files[i].filename),
          });
          try {
            const response = await client.send(command);
            console.log(response);
            s3Images.push(
              `https://gmep-meshy-api-images-2025-06-10.s3.us-east-1.amazonaws.com/${files[i].originalname}`
            );
          } catch (err) {
            if (
              err instanceof S3ServiceException &&
              err.name === "EntityTooLarge"
            ) {
              console.error("object too large (> 5GB)");
            } else {
              console.error(err);
            }
          }
        }
      } catch (err) {
        console.error(err);
        return res.status(400).send({ error: "invalid image type" });
      }
    }

    const taskIds = [];
    for (let i = 0; i < s3Images.length; i++) {
      const headers = { Authorization: `Bearer ${config.API_KEY}` };
      const payload = {
        image_url: s3Images[i],
        enable_pbr: true,
        should_remesh: true,
        should_texture: true,
      };

      try {
        const response = await axios.post(
          "https://api.meshy.ai/openapi/v1/image-to-3d",
          payload,
          { headers }
        );
        console.log(response.data);
        taskIds.push(response.data.result);
      } catch (error) {
        console.error(error);
      }
    }

    const date = new Date();
    for (let i = 0; i < taskIds.length; i++) {
      fs.appendFile(
        "tasks.txt",
        "\n" + date.toISOString() + " " + taskIds[i],
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    return res.redirect(`${config.BASE_URL}/meshy/tasks`);
  },
};

module.exports = image;
