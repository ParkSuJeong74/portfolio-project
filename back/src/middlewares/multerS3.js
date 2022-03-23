const dotenv = require('dotenv').config()
const AWS = require("aws-sdk")
const multer = require('multer')
const multerS3 = require("multer-s3")
const { timeUtil } = require("../common/timeUtil")

// TODO : user_id와 multer로 처리한 image정보를 setUserImage에 뿌려주기
// (get은 구현x)
// Client에서 HTTP Header에 multipart/form-data 라고 지정해야 함
// enctype="multipart/form-data"
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const s3Upload = () => {
    const limits = {
        fileSize: 5242880
    }
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_S3_BUCKET,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: "public-read",
            key: (req, file, cb) => {
                let ext = file.mimetype.split('/')[1]
                if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
                    return cb(new Error("이미지 파일만 업로드 해주세요."))
                }
                const time = timeUtil.getTime()
                let newTime = time.toISOString().split("T")[0].replace(/-/gi, "")
                cb(null, `${newTime}_${Math.floor(Math.random() * 100000000).toString()}.${ext}`)
            }
        }),
        limits
    }).single("file")

    return upload
}

const s3Delete = (imageName) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: imageName,
    }

    s3.deleteObject(params, (error, data) => {
        if (error) {
            throw new Error(error)
        } else {
            console.log("Successfully deleted ", params.Key)
        }
    })
}

module.exports = { s3Upload, s3Delete }
