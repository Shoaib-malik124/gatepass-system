import QRCode from 'qrcode'

export const generateQr=async(enrollment)=>{
   try {
    const data=enrollment
    const qr=QRCode.toDataURL(data)
    return qr
   } catch (error) {
    console.log(error.message)
    return ""
   }
}