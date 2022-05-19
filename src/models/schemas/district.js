import mongoose from 'mongoose'

const districtSchema = new mongoose.Schema(
    {
        name_th: { type: String, required: true },
        name_en: { type: String, required: true },
        province_id: { type: Number, required: true },
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
const districtModel = mongoose.model('district', districtSchema)

export default districtModel
export { districtSchema }
