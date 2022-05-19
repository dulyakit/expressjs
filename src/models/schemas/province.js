import mongoose from 'mongoose'

const provinceSchema = new mongoose.Schema(
    {
        name_th: { type: String, required: true },
        name_en: { type: String, required: true },
        geography_id: { type: Number, required: true },
        // id: { type: String, required: true },
        // updated_at: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
)
// หาก collection ไม่มี s ลงท้ายต้องเพิ่มพารามิเตอร์ตัวที่ 3 เป็นชื่อ collection ด้วย
const provinceModel = mongoose.model('province', provinceSchema)

export default provinceModel
export { provinceSchema }
