import { FunctionComponent} from "react";
import { useNavigate } from "react-router-dom";

import "./Signup.css";
import { useAppDispatch, useAppSelector } from "../../../store";
import { signup } from "../../../slices/auth.slice";
import Loader from "../../sharedComponents/Loader";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm, SubmitHandler } from "react-hook-form";
interface IFormValues {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const Signup: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useAppSelector((state) => state.auth);
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IFormValues>({ mode: "all" });
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const { username, email, password } = data;
    dispatch(signup({ username, password, email }))
      .unwrap()
      .then((msg) => {
        enqueueSnackbar(msg, {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        navigate("/login");
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      });
  };

  return (
    <div>
      {isLoading ? (
        <Loader loaderState={isLoading} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="kanun-form glass signup-form"
        >
          <h2>Sign up</h2>
          <label htmlFor="username">Username</label>
          <input
            className={errors.username ? "error" : ""}
            type="text"
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
              minLength: {
                value: 4,
                message: "Username has to be minimum 4 characters",
              },
              maxLength: {
                value: 16,
                message: "Username can be maximum 16 characters",
              },
            })}
          />
          <span className="error-label">{errors?.username?.message}</span>
          <label htmlFor="email">Email Id</label>
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Please enter a valid Email id",
              },
            })}
            className={errors.email ? "error" : ""}
          />
          <span className="error-label">{errors.email?.message}</span>
          <label htmlFor="email">Password</label>
          <input
            className={errors.password ? "error" : ""}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 4,
                message: "Password has to be minimum 4 characters",
              },
              maxLength: {
                value: 16,
                message: "Password can be maximum 16 characters",
              },
            })}
          />
          <span className="error-label">
            {errors?.password?.type === "required" && "Password is required"}
            {errors?.password?.type === "minLength" &&
              "Password has to be minimum 6 characters"}
          </span>
          <label htmlFor="email">Confirm Password</label>
          <input
            className={errors.confirmPassword ? "error" : ""}
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: { value: true, message: "Password is required" },
              maxLength: {
                value: 16,
                message: "Password can be maximum 16 characters",
              },
              validate: {
                value: (x) =>
                  x === getValues().password ||
                  "Password & Confirm Password does not match",
              },
            })}
          />
          <span className="error-label">{errors.confirmPassword?.message}</span>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      )}
    </div>
  );
};

export default Signup;
