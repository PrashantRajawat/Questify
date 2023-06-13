import { useEffect, useState, useContext } from "react";
import { account, storage } from "../api/appwrite";
import style from "../../styles/home.module.css";
import Link from "next/link";
import Head from "next/head";
import { AppContext } from "../Context";

export default function Home() {
  const [user, setUser] = useState();
  const [item, setItem] = useState([]);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [disable, setDisable] = useState(false);
  const token = useContext(AppContext);
  useEffect(() => {
    const promise = account.get();
    promise.then(
      function (response) {
        setUser(response);
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={style.container}>
        <div className={style.upperPart}>
          <div className={style.logoContainer}>
            <h3 className={style.logo}>Questify</h3>
            <div className={style.listBox}>
              <div className={style.createList}>
                <h1 className={style.createHead}>
                  Seems like you haven&apos;t created list yet
                </h1>
                <Link href="/list">
                  <button
                    className={style.button}
                    disabled={true}
                    style={{ cursor: "not-allowed" }}
                  >
                    Create List
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!token ? (
          <div className={style.login}>
            <h1 className={style.loginMsg}>
              Seems like you haven&apos;t login yet!
            </h1>
            <Link href="/login">
              <button
                className={style.loginButton}
                disabled={true}
                style={{ cursor: "not-allowed" }}
              >
                Login
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
        <div className={style.login}>
          <h1 className={style.loginMsg}>
            Site currently is under process will be backed soon
          </h1>
        </div>
      </div>
    </>
  );
}
