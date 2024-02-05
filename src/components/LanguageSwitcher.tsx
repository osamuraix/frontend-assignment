import i18n from "@/i18n";
import { setLanguage } from "@/store/reducers/languageSlice";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";

const LanguageSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.languageSlice.currentLanguage
  );
  const [selectLang, setSelectLang] = React.useState("");

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    setSelectLang(currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (lng: string) => {
    dispatch(setLanguage(lng));
    setSelectLang(lng);
  };

  return (
    <div style={{ textAlign: "right" }}>
      {/* <Select defaultValue={selectLang} value={selectLang} onChange={value => changeLanguage(value)}>
        <Option value={'en'}>EN</Option>
        <Option value={'th'}>TH</Option>
      </Select> */}
    </div>
  );
};

export default LanguageSwitcher;
