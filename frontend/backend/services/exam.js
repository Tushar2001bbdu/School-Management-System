const { s3Client } = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
class exam{
    static async sendFrame(url,rollno) {
        const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const key = `webcams/${Date.now()}.jpg`;
        const frames_bucket = {
          Bucket: "examframesbucket",
          Key: key,
          Body: buffer,
          ContentType: "image/jpeg",
          Metadata: { rollno: rollno },
        };
    
        
    
        try {
          await s3Client.send(new PutObjectCommand(frames_bucket));
    
        } catch (error) {
          console.error(error);
        }
      }
    
}
module.exports=exam