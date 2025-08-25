import apiClient from "../lib/apiClient";

const medicineVerify = async ({
  medicineId,
  location,
  userType,
}: {
  medicineId: string;
  location: string;
  userType: string;
}) => {
    console.log(medicineId, location, userType);
  const response = await apiClient.post("/verifyScan", {
    medicineId,
    location,
    userType,
  });
  return response.data;
};

export default medicineVerify;
