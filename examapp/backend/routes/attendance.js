const router = require("express").Router();
const {
  RekognitionClient,
  SearchFacesByImageCommand,
} = require("@aws-sdk/client-rekognition");
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { updateAttendance } = require("../controllers/attendance-controllers");

require("dotenv").config();

const queryDynamoDB = async (RecognitionId) => {
  const client = new DynamoDBClient({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });
  const params = {
    TableName: "facerecognition",

    KeyConditionExpression: "RekognitionId = :value",
    ExpressionAttributeValues: {
      ":value": { S: RecognitionId },
    },
  };

  try {
    const data = await client.send(new QueryCommand(params));

    let rollno = data.Items[0].RollNo.S;
    updateAttendance(rollno);
  } catch (err) {
    console.error("Error querying items:", err);
  }
};

router.post("/sendphoto", async (req, res) => {
  let image = req.body.url;
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const key = `webcams/${Date.now()}.jpg`;
  const training_params = {
    Bucket: "schools-management-system-bucket",
    Key: key,
    Body: buffer,
    ContentType: "image/jpeg",
    Metadata: { rollno: "121078897" },
  };

  const testing_params = {
    Bucket: "school-management-system-bucket-testing",
    Key: key,
    Body: buffer,
    ContentType: "image/jpeg",
    Metadata: { rollno: "121078897" },
  };

  try {
    // Upload file to S3 (testing bucket)
    await s3Client.send(new PutObjectCommand(testing_params));

    const rekogClient = new RekognitionClient({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });

    // Use correct command
    const faceMatches = new SearchFacesByImageCommand({
      CollectionId: "smsusers",
      Image: {
        S3Object: {
          Bucket: "school-management-system-bucket-testing",
          Name: "webcams/1727593595373.jpg",
        },
      },
      MaxFaces: 5,

      FaceMatchThreshold: 95,
    });

    const response = await rekogClient.send(faceMatches);
    console.log(response.FaceMatches[0].Face.FaceId);

    if (!response.FaceMatches || response.FaceMatches.length === 0) {
      return res.status(404).send("No face matches found in model");
    } else {
      const matchedFaceId = response.FaceMatches[0].Face.FaceId; // Get RekognitionId (FaceId)
      await queryDynamoDB(matchedFaceId);
      await s3Client.send(new PutObjectCommand(training_params));
      return res
        .status(200)
        .send("Face match found and data retrieved successfully");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error processing the request");
  }
});

module.exports = router;
