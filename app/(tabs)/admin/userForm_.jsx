import { useLocalSearchParams } from "expo-router";
import { object, string } from "yup";
import PageWrapper from "../../../components/page/PageWrapper";
import UserForm from "../../../features/users/UserForm";

const UserForm_ = () => {
  // const { usersNewFormData, usersValidationSchema } = useUsers();
  // console.log(`UserForm_ usersNewFormData`, usersNewFormData);
  // console.log(`UserForm_ usersValidationSchema`, usersValidationSchema);

  const { id, userData } = useLocalSearchParams();

  const parsedUserData = JSON.parse(userData);
  const parsedId = JSON.parse(id);
  console.log(
    `UserForm_ parsedUserData`,
    JSON.stringify(parsedUserData, null, 2)
  );
  console.log(`id`, id);

  const userValidationSchema = object().shape({
    email: string().required("Required"),
    surname: string().required("Required"),
    name: string().required("Required"),
    phoneNumber: string().required("Required"),
  });

  return (
    <PageWrapper>
      <UserForm
        formData={parsedUserData}
        id={parsedId}
        validationSchema={userValidationSchema}
      />
    </PageWrapper>
  );
};

export default UserForm_;
