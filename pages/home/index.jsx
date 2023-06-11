import { useEffect, useState } from "react";
import { account, storage } from "../config/appwrite";
import style from "../../styles/home.module.css";
import Link from "next/link";
import Head from "next/head";
export default function Home() {
  const [user, setUser] = useState();
  const [item, setItem] = useState([]);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [disable, setDisable] = useState(false);
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
  const handleUpload = () => {
    const promise = storage.createFile(
      "6482bd0bd3ec1d326899",
      user.$id,
      document.getElementById("uploader").files[0]
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const handleItem = () => {
    setItem([...item, { id: "", title: "", desc: "", date: "" }]);
    console.log(item);
    setDisable(true);
  };
  const handleItemSave = (i, title, date) => {
    const values = [...item];
    values[i] = {
      id: i,
      title: title,
      date: date,
    };
    setItem(values);
    setDisable(false);
  };

  const handleItemDelete = (index) => {
    const newItems = [...item];
    newItems.splice(index, 1);
    setItem(newItems);
  };
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
                  Seems like you haven't created list yet
                </h1>
                <Link href="/list">
                  <button className={style.button}>Create List</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={style.login}>
          <h1 className={style.loginMsg}>Seems like you haven't Login yet!</h1>
          <Link href="/login">
            <button className={style.button}>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}
