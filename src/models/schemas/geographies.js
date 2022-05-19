import mongoose from 'mongoose'

const geographiesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
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
const geographiesModel = mongoose.model('geographies', geographiesSchema)

export default geographiesModel
export { geographiesSchema }
