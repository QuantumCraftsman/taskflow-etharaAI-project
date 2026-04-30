import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Loading, Textbox } from "../components";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      setIsLoading(true);

      await axios.post("http://localhost:5000/api/user/register", data);

      toast.success("User registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-[#f3f4f6] dark:bg-slate-900'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='w-[400px] flex flex-col gap-y-6 bg-white dark:bg-slate-900 px-10 pt-10 pb-10 rounded-lg shadow-md'
      >
        <div>
          <p className='text-blue-600 text-3xl font-bold text-center'>
            Create Account
          </p>
          <p className='text-center text-gray-500'>
            Sign up to get started
          </p>
        </div>

        <Textbox
          placeholder='Your Name'
          type='text'
          name='name'
          label='Full Name'
          register={register("name", {
            required: "Name is required!",
          })}
          error={errors.name?.message}
        />

        <Textbox
          placeholder='you@example.com'
          type='email'
          name='email'
          label='Email Address'
          register={register("email", {
            required: "Email is required!",
          })}
          error={errors.email?.message}
        />

        <Textbox
          placeholder='password'
          type='password'
          name='password'
          label='Password'
          register={register("password", {
            required: "Password is required!",
          })}
          error={errors.password?.message}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <Button
            type='submit'
            label='Register'
            className='w-full h-10 bg-blue-700 text-white rounded-full'
          />
        )}

        <p
          onClick={() => navigate("/login")}
          className='text-center text-sm text-blue-600 cursor-pointer hover:underline'
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;