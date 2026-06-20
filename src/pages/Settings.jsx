export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ตั้งค่า</h1>
      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <p className="text-gray-500">รุ่นรถ</p>
          <input className="w-full border rounded-xl p-3 mt-2" placeholder="Honda Giorno+" />
        </div>
        <div>
          <p className="text-gray-500">อัตราสิ้นเปลือง</p>
          <input className="w-full border rounded-xl p-3 mt-2" placeholder="45 กม./ลิตร" />
        </div>
        <button className="bg-indigo-500 text-white px-5 py-3 rounded-xl hover:bg-indigo-600">บันทึก</button>
      </div>
    </div>
  );
}
