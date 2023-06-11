import { useEffect, useState } from "react";
import { account } from "../config/appwrite";
import router from "next/router";
import style from "../../styles/form.module.css";
import Link from "next/link";
import Head from "next/head";
export default function Register() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const googleAuth = (e) => {
    e.preventDefault();
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/home/",
      "http://localhost:3000/"
    );
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(userDetails.email, userDetails.password);
      router.push("/home");
      console.log("yaya");
    } catch (error) {
      console.error(`pass ${error.message}`);
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
            type="text"
            name="name"
            placeholder="Please enter your name here...."
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              });
            }}
          ></input>
          <input
            type="text"
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
