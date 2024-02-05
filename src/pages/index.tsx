import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchUserData } from "@/store/reducers/userSlice";

// interface Item {
//   type: string;
//   name: string;
// }

// interface IItems {
//   [key: string]: Item[];
// }

const Index: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const UserData = useAppSelector((state) => state.userSlice);

  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState({});

  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  // const [items, setItems] = useState<IItems>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/todos.json");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // const multipleItems = Array.from(new Set(todos.map((item) => item.type)));
    // const initialTypeItems = Object.fromEntries(
    //   multipleItems.map((type) => [type, []])
    // );

    // setItems(initialTypeItems);

    dispatch(fetchUserData());
  }, []);

  const handleClickAddItem = (item) => {
    if (item.type === "Fruit") {
      setFruits((prevFruits) => [...prevFruits, item]);
    } else if (item.type === "Vegetable") {
      setVegetables((prevVegetables) => [...prevVegetables, item]);
    }

    // const { type, ...etc } = item;
    // setItems((prevItem) => ({
    //   ...prevItem,
    //   [type]: [...(prevItem[type] || []), etc],
    // }));

    setTodos(todos.filter((todo) => todo !== item));
  };

  const handleClickRemoveItem = (type, item) => {
    if (item.type === "Fruit") {
      setFruits((prevFruits) => prevFruits.filter((t) => t !== item));
    } else if (item.type === "Vegetable") {
      setVegetables((prevVegetables) =>
        prevVegetables.filter((t) => t !== item)
      );
    }

    // setItems((prevItem) => ({
    //   ...prevItem,
    //   [type]: prevItem[type].filter((t) => t !== item),
    // }));

    setTodos([...todos, { type, ...item }]);
  };

  useEffect(() => {
    if (UserData) {
      setUsers(UserData);
    }
  }, [UserData]);

  return (
    <>
      <div className={"pageHeader"}>
        <h1>{t("Auto Delete Todo List")}</h1>
      </div>

      <div className={"form"}>
        <div>
          <h2>Items</h2>
          <ul>
            {todos.map((item, index) => (
              <li key={index} onClick={() => handleClickAddItem(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* {Object.entries(items).map(([type, items]) => (
          <div key={type}>
            <h2>{type}</h2>
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleClickRemoveItem(type, item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))} */}

        <div>
          <h2>Fruit</h2>
          <ul>
            {fruits.map((item, index) => (
              <li
                key={index}
                onClick={() => handleClickRemoveItem(item.type, item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Vegetables</h2>
          <ul>
            {vegetables.map((item, index) => (
              <li
                key={index}
                onClick={() => handleClickRemoveItem(item.type, item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={"pageFooter"}>
        <h1>{t("Create data from API")}</h1>
      </div>

      <div className={"form"}>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </>
  );
};

export default Index;
