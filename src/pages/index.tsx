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

  const [countDownTimer, setCountDownTimer] = useState(null);
  const [timers, setTimers] = useState(5000);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  // const [items, setItems] = useState<IItems>({});
  const [items, setItems] = useState([]);

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

    setItems((prevItems) => [...prevItems, item]);

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

  const handleHoverRemoveItem = () => {
    const allList = items;
    if (allList.length <= 0) return;

    const timer = setTimeout(() => {
      const item = allList[0];
      if (item.type === "Fruit") {
        setFruits((prevFruits) => prevFruits.filter((t) => t !== item));
      } else if (item.type === "Vegetable") {
        setVegetables((prevVegetables) =>
          prevVegetables.filter((t) => t !== item)
        );
      }

      setItems((prevItems) => prevItems.filter((t) => t !== item));

      setTodos([...todos, { type: item.type, ...item }]);

      setTimers(500);
    }, timers);

    setCountDownTimer(timer);
  };

  useEffect(() => {
    if (UserData) {
      setUsers(UserData);
    }
  }, [UserData]);

  useEffect(() => {
    if (countDownTimer) {
      return () => clearTimeout(countDownTimer);
    }
  }, [countDownTimer]);

  useEffect(() => {
    const allList = items;
    if (allList.length > 0) {
      handleHoverRemoveItem();
    }
  }, [items]);

  return (
    <>
      <div className={"pageHeader"}>
        <h1>{t("Auto Delete Todo List")}</h1>
      </div>

      <div className={"form"}>
        <div className={"sub-box"}>
          <ul>
            {todos.map((item, index) => (
              <li key={index} onClick={() => handleClickAddItem(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* {Object.entries(items).map(([type, items]) => (
          <div key={type} className={"sub-box"}>
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

        <div className={"sub-box"}>
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

        <div className={"sub-box"}>
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
