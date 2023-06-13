import { useEffect, useState } from "react";
import { account, storage, databases } from "../api/appwrite";
import style from "../../styles/list.module.css";
import Head from "next/head";
export default function List() {
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
    alert("🙌 Item saved");
  };

  const handleItemDelete = (index) => {
    const newItems = [...item];
    newItems.splice(index, 1);
    setItem(newItems);
  };
  const handleSubmit = (index, title, date) => {
    const promise = databases.createDocument(
      "6486a86005e7f3fa1048",
      "6486a873409e1e5825b7",
      "64816aac3a70d57ce3c2",
      {
        id: index,
        title: title,
        date: date,
      }
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        alert("Successfully added");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <>
      <Head>
        <title>Create List</title>
      </Head>
      <div className={style.container}>
        <div className={style.upperPart}>
          <div className={style.logoContainer}>
            <h3 className={style.logo}>Questify</h3>
            <div className={style.listBox}>
              <div className={style.createList}>
                <h1 className={style.createHead}>Start listing your Quests</h1>
                <button
                  className={style.button}
                  onClick={handleItem}
                  disabled={true}
                  style={{ cursor: "not-allowed" }}
                >
                  Add an Item
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.listItems}>
          {item.map((input, index) => {
            return (
              <div key={index} className={style.inputContainer}>
                <input
                  className={style.title}
                  type="text"
                  placeholder="Write your quest here....."
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={input.title}
                />

                <input
                  className={style.date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  defaultValue={input.date}
                />
                <button
                  className={style.save}
                  // onClick={() => handleItemSave(index, title, date)}
                  onClick={() => handleSubmit(index, title, date)}
                >
                  Save
                </button>
                <button
                  className={style.delete}
                  onClick={() => handleItemDelete(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          {/* <button className={style.button}>Submit</button> */}
        </div>
      </div>
    </>
  );
}
