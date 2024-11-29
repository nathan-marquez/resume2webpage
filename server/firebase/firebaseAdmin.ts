import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: "resume2webpage",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXtmbW2R8bEDSe\nISDSthFLJv8jktGTOMZ/02mkkxWmlcmYga3KU2tsPBM1wPMII9wem4RuYbM8q5qO\nhjQcz873i28tjLIlDY4A75ihi9WfbieEWgn5Eap1dNZQardIqSY2X1O65Nx5lNiZ\nXu2H1wBINwhbGlhrDATRMJ0iq/WX0Lnzwe1v7EEFThU8J8+mWciVVhqU1v7/P9rg\nbWDVy77mXbU45oa3a9GZNzhJA7l50jJh1XUfIBRUuSrb6taO68gn2BnTgRELg1B/\n0Z4pAzAy6ayXuQOYRNLJucvDEtxy7zdFMMaoUFlsyyJ5PcNnSyj3nB5ecUTs0m6g\nHlUNiZ2DAgMBAAECggEAMC4oOMEZZNHfs/xXXTOfCFvpGRYOYo/cUkoEudRQQug8\n7qb4V1HowqXNf/u38vTYegvvodJ7RqBE5FBwilngo7LvaurMxIGqgFeXBG7RN+GW\nwSyLEENw+/5P9Zf+fx/g19GsWKVH84C2zPZdvw8jsstvZudV/yEBAqJKtPEhfMW6\nhom2sYUOsw45cI0+OWQ/P7nUlPvqESdPsg7YiW10Hq0oc5Ok9LCImdk0hrQpkGux\nI2z9k3kSMaK28yHfAG4YHnjKQ0sTjqKlIIldNNdvdOGKr1lS8op/78RBDOF1cB+8\nLeaW+d85z4NiFQamLWSIglBfChoo+cOo7PdNca0BOQKBgQDOy6xyCL4OtNY4Yczf\n8AWpLSR4YawfJeFBRQzg5EIWQd5dEYMgBfdUWHxXHLF/o3odQBa6yttS4hzG1UdF\nSSS+6qjx54y6LlWSDL1GZEAVfL/aG1XWbMw7y93MvmdNHO2xgE05HNoaTVqF9Drn\ncU3XaXrabPdSTV41vwdxkHNpJwKBgQC7z4I2E81B6/DzPeDi3PtSMa3lkbxxwDxo\naihw+7wLjr9jjymJDid2i24o65DEpeD/06aVOgZTLogQXPmRRNRGxNq4PJOpwdue\npts/17I8xDKcGLuPhbXvtVLqNHlY7QX1iAspEpl9cBaw6G93PFMTTocw8jyLj+L8\nz4WumU9KRQKBgQCarLbYOHfH0jTkySoPWZ0yU8SSkiPGzHN2eWpPkAtqUGw82otk\nWXIMUX73PUv6N1FwLW6S2oY/sUZq5j2/shzc+/HPtiyJWXzBl+u+id9w8vUg8w86\nKfh8xVip+sSTZg7XlCqujEkKIU+TIAEq+ZGKjKfKVnSKx7muo6qyo6PfQwKBgCo4\nexBHIVSZgwBbv8ugXAtdSbebLJ7x1WKvwsmrfdmnTJVIINFD0lFPBQPD+TaMB+nb\nHc7cTYGzqzjqfdxPed0y8eyLCbMW9pVS82UFy3bnsGzxDnE0YPMzcyFdjI4WMsnA\nvKmOGd1eLmu0xSIr+I0VkUTKoBvLy/6DdI0MwAt1AoGAOWf+lgA37jTHdu2MX+d0\n1zzUAng0Jbvyb0Smu9qXw/+8Y5TobRx9ZH/Svvg70/jptS9zB3fObxYkiA+vyW0Q\nSn54dJ/YUjSKO3KQUoHZCZNDAka9wK8af2tOFj8Ip6bBnEll64z8jMc+wVMm4wD1\nIesVX1CjmLpx5zfSDjiHL+4=\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n"
        ), // Replace escaped newlines
      clientEmail:
        "firebase-adminsdk-cwawh@resume2webpage.iam.gserviceaccount.com",
    }),
  });
} else {
  app = getApps()[0];
}

// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
