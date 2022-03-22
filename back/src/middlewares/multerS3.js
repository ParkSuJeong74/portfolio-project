const AWS = require("aws-sdk")
const dotenv = require('dotenv').config()
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

const storage = multerS3({
    s3: s3,
    bucket: "21c-devs-bucket",
    acl: "public-read",
    key: (req, file, cb) => {
        let ext = file.mimetype.split('/')[1]
        if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
            return cb(new Error("이미지 파일만 업로드 해주세요."))
        }
        const time = timeUtil.getTime()
        let newTime = time.toISOString().split("T")[0].replace(/-/gi, "")
        cb(null, `${newTime}_${file.fieldname}.${ext}`)
    }
})

const limits = {
    fileSize: 5242880
}

const s3Upload = multer({
    storage,
    limits
}).single("file")

const s3Delete = s3.deleteObject((imageName) => {
    const key = imageName.split("amazonaws.com/")[1]

    const option = {
        bucket: "21c-devs-bucket",
        key: `/${key}`
    }
    return option
}, (err, data) => {
    if (err) {
        throw new Error(err)
    }
    console.log("s3 deleteObject ", data)
})

module.exports = { s3Upload, s3Delete }
