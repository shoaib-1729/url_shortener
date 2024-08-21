/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { signUp } from "@/db/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  // states for error
  const [errors, setErrors] = useState([]);
  // states for setting form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // use navigate for navigating the user to dashboard after successful authentication
  const navigate = useNavigate();
  // get the long link from  createNew param using useSearchParam hook
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  // handle validation on login button click
  async function handleSignup() {
    // set error to empty array
    setErrors([]);
    // validation using yup, error aa sakta hai isiliye try catch block pr karo
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required."),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required."),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters long")
          .required("Password is Required."),
        profile_pic: Yup.mixed().required("Profile pic is required."),
      });
      // validate the form data, refer yup docs for info
      await schema.validate(formData, { abortEarly: false });
      // api call (database se verify hoga)
      await fnSignup();
    } catch (e) {
      // handling errors during validation
      const newError = {};
      // e is provided by yup only, take each error and insert it into error array for display
      e?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      // set the error to new error;
      setErrors(newError);
    }
  }
  //   use fetch to fetch the data, yeh login ko call kar dega form data ke saath, phir supabase verify karega, abhi call nahi hua hai fnLogin, bss return kar diya hai
  const { data, error, loading, fn: fnSignup } = useFetch(signUp, formData);

  // get the use data from UrlState
  const { fetchUser } = UrlState();

  useEffect(() => {
    console.log(data);
    // agar error nahi hai aur user data hai to use ko dashboard par navigate kara do
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}'` : ""}`);
      // fetch the user data after login successfully
      fetchUser();
    }
  }, [data, error]);

  //  handle input change
  function handleInputChange(e) {
    // fetch name and value from target input element
    const { name, value } = e.target;
    // set the state
    setFormData((prevState) => {
      // spread the previous fields and set the new field, and return the updated  object
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SIgnup</CardTitle>
          <CardDescription>
            to your account if you already have one.
          </CardDescription>
          {/* if error exists then set the error dynamically */}
          {/* agar login credentials ka data database mei nahi hai, tab woh error yaha show hoga, yeh error supabase provide karega */}
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          {/* input elements for name, email,  passwords and profile pic */}
          <div>
            <Input
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Enter name"
              aria-label="name"
            />
            {errors.name && <Error message={errors.name} />}
            <Input
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Enter email"
              aria-label="email"
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div>
            <Input
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Enter password"
              aria-label="password"
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div>
            <Input
              onChange={handleInputChange}
              name="profile_pic"
              type="file"
              accept="image/*"
              aria-label="profile_pic"
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          {/* login button */}
          {loading ? (
            <Button>
              <BeatLoader size={10} color="#36d7b7" />
            </Button>
          ) : (
            <Button onClick={handleSignup}>Create Account</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
