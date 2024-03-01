import React, { useState } from 'react'

const Exponentials = () => {
    const [require_num,setRequire_num] = useState([])
    const [alpha,setAlpha] = useState(0)
    const [Array_real_data, setArrayRealData] = useState([]);
    const [data , setData] = useState([])
    
    const handleCapacityOfrequire = (e) =>{
      let array_num = []
      for (let i = 1 ; i <= e.target.value ; i++){
        array_num.push(i)
      }
      return setRequire_num(array_num)
    }
  
    const handleCalculate = () =>{
      let array = []
      let result_per_round = Array_real_data[0]
      array.push(0)
      array.push(Array_real_data[0])
      // Assume
      //                     ----1
      // 100                 ----2
      // 100 + 0.1 (130-100) ----3
      // 103 + 0.1 (160-103) ----4
      // 108.7 + 0.1 (160-108.7) ----5
      // round up in float
      for(let i = 0; i <= Array_real_data.length - 2 ; i++){
        result_per_round = result_per_round + (alpha * (Array_real_data[i+1] - result_per_round))
        array.push(Math.ceil(result_per_round *100)/100)
      }
      return setData(array)
    }

    return (
        <div className='flex justify-center items-center md:py-4 md:px-4'>
            <section
                className='
                    border-2 p-4 rounded-md w-[350px]  md:w-full 
                    flex md:flex-row flex-col gap-4 shadow-lg
                '  
            >   
                <div className='flex-auto w-[100%] md:w-[30%]'>
                    <h1 className='md:text-4xl text-xl text-center py-2'>EXPONENTIAL SMOOTHING</h1>
                    <div className='flex flex-col'>
                        <label>จำนวน ปริมาณความต้องการ(จากการบันทึก)</label>
                        <input
                            type='number'
                            required
                            className='border-2 p-[2px] px-2'
                            onChange={(e)=> handleCapacityOfrequire(e)}
                        />
                    </div>
                    {
                        require_num.map((data)=>(
                            <div className='flex flex-col' key={data}>
                                <label >ปริมาณความต้องการ(จากการบันทึก) : { data }</label>
                                <input
                                    type='number'
                                    required
                                    className='border-2 p-[2px] px-2'
                                    onChange={(e)=> {
                                        const newArray = [...Array_real_data];
                                        newArray[data - 1] = parseInt(e.target.value, 10);
                                        setArrayRealData(newArray);
                                    }}
                                />
                            </div>
                        ))
                    }
                    <div className='flex flex-col'>
                        <label>𝛼 (alpha)</label>
                        <input
                            type='number'
                            required
                            className='border-2 p-[2px] px-2'
                            onChange={(e)=>setAlpha(e.target.value)}
                        />
                    </div>
                    <button 
                        className='bg-[#51829B] w-full mt-2 rounded-md 
                        text-white text-lg p-2 text-bold hover:bg-[#9BB0C1] duration-150'
                        onClick={handleCalculate}
                    >Calculator</button>
                    <p className='bg-red-500 p-2 rounded-md mt-2 text-white text-[15px] text-center'>⚠️ คำเตือน : หากเปลี่ยนตัวแปรข้างบนแล้ว ให้กด calculator อีกรอบเพื่อทำการคำนวณใหม่ ⚠️</p>
                </div>
                <div className='md:border-l-2 md:pl-4 flex-auto md:w-[60%] w-[100%]'>
                    <>
                        {
                            data.length !== 0 ? (
                                <>
                                    <table className="min-w-full text-center text-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 font-medium text-gray-600 uppercase tracking-wider">ช่วงเวลา</th>
                                                <th className="px-4 py-2 font-medium text-gray-600 uppercase tracking-wider">ปริมาณความต้องการ(จากการบันทึก)</th>
                                                <th className="px-4 py-2 font-medium text-gray-600 uppercase tracking-wider">ค่าพยากรณ์ด้วยวิธีเอ็กซ์โปเนนเชียล</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                data.map((d,index)=>(
                                                    <tr className='odd:bg-white even:bg-slate-50'>
                                                        <td>{index+1}</td>
                                                        <td>{Array_real_data[index]}</td>
                                                        <td className='text-left'>{
                                                            `${d} ${index === 0 || index === 1  ? `` : `= ${data[index-1]} + ${alpha} (${Array_real_data[index-1]}-${data[index-1]})` } `
                                                        }</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="flex flex-col bg-gray-100 md:p-6 p-4 rounded-lg shadow-md mt-4  w-full ">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Exponential Smoothing Formula</h2>
                                        <p className="text-2xl text-gray-700 mb-2">F<sub>t</sub> = F<sub>t-1</sub> + α(X<sub>t-1</sub> - F<sub>t-1</sub>)</p>
                                        <p className="text-base text-gray-700 mb-2">Where:</p>
                                        <ul className="list-disc ml-6">
                                            <li>F(t) = ค่าพยากรณ์ความต้องการใหม่</li>
                                            <li>Y(t) = ค่าพยากรณ์ ช่วงเวลาที่ผ่านมา</li>
                                            <li>F(t-1) = ความต้องการที่่แท้จริงที่ผ่านมา</li>
                                            <li>α = คือน้ำหนักหรือค่าคงที่ปรับเรียบ</li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className=' border-2 p-2 mt-2 w-fit rounded-md'>
                                    <h1 className='bg-red-400 text-lg rounded-md p-2 text-white'>✨ หมายเหตุ (อ่านก่อนใช้) ✨</h1> 
                                    <ul className='mt-2'>
                                        <li>🔥จำนวน ปริมาณความต้องการ(จากการบันทึก) คือ จำนวณปริมาณความต้องการตามบันทึกที่ต้องการจะใส่</li>
                                        <li>🔥หากใส่จำนวณไปแล้ว,สมมุติใส่เป็น 3 ก็จะมีช่องให้ใส่ข้อมูลปริมาณความต้องการตามบันทึกเด้งขึ้นมา 3 ช่อง หลังจากนั้นให้ทำการใส่ข้อมูลตามต้องการลงไป</li>
                                        <li>🔥ใส่ 𝛼 (alpha) ตามที่ต้องการและกดปุ่ม calculator</li>
                                    </ul>
                                </div>
                            )
                        }
                    </>
                </div>
            </section>
        </div>
    )
}

export default Exponentials