import { useEffect, useState } from "react";
import { account } from "../api/appwrite";
import { ID } from "appwrite";
import router from "next/router";
import style from "../../styles/form.module.css";
import Link from "next/link";
import Head from "next/head";
export default function Register() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.create(
        ID.unique(),
        userDetails.email,
        userDetails.password
      );
      router.push("/login");
      console.log("yaya");
    } catch (error) {
      console.error(`pass ${error.message}`);
      alert(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={style.loginContainer}>
        <form className={style.form}>
          <h3 className={style.logo}>Questify</h3>
          <input
            type="email"
            name="email"
            placeholder="Please enter your email here...."
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              });
            }}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Please enter your password here...."
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              });
            }}
          ></input>
          <button className={style.button} onClick={(e) => handleLogin(e)}>
            Register
          </button>
          <Link href="/login">
            <p>Already have an account? Sign In</p>
          </Link>
          {/* <button onClick={(e) => googleAuth(e)}>Google</button> */}
        </form>
      </div>
    </>
  );
}
