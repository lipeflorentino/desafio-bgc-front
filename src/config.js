export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "desafio-bgc-front"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_ir4927QRL",
    APP_CLIENT_ID: "hnslm9gpd9kpcea0v2aablmr7",
    IDENTITY_POOL_ID: "us-east-1:bf045704-bee2-437e-bf2d-c7fde97195d0"
  }
};

//arn:aws:cognito-idp:us-east-1:880994143713:userpool/us-east-1_ir4927QRL
//user: admin@example.com  pass: Passw0rd!