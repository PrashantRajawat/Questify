import { useEffect, useState, useContext } from "react";
import { account, databases } from "../api/appwrite";
import { Query } from "appwrite";
import style from "../../styles/home.module.css";
import Link from "next/link";
import Head from "next/head";
import { AppContext } from "../Context";

export default function Home() {
  const [user, setUser] = useState();
  const [dash, setDash] = useState([]);
  const [disable, setDisable] = useState(false);
  const token = useContext(AppContext);
  const userData = () => {
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
  };
  const dashboard = () => {
    let dashboard = databases.listDocuments(
      "6486a86005e7f3fa1048",
      "6486a873409e1e5825b7",
      [Query.equal("userId", [user?.$id])]
    );

    dashboard.then(
      function (response) {
        console.log("dashboard", response);
        setDash(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    userData();
  }, []);
  useEffect(() => {
    dashboard();
  }, [user]);
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
                    disabled={token ? false : true}
                    style={{ cursor: token ? "pointer" : "not-allowed" }}
                  >
                    Create
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
                // disabled={true}
                style={{ cursor: "pointer" }}
              >
                Login
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
        <div className={style.dashboard}>
          <div className={style.dashHead}>Your Quests</div>

          {dash.map((item, index) => {
            return (
              <div className={style.quests} key={index}>
                <p className={style.title}>{item.title} </p>
                <p className={style.date}>{item.date}</p>
                <button className={style.buttonAchieved}>Achieved</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
