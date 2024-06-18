import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//initializing
i18next.use(initReactI18next).init({
  lng: "en",
  debug: true,
  returnObjects: true,
  resources: {
    en: {
      translation: {
        home: "HOME",
        search_category: "Search category",
        sort_by: "Sort by:",
        languages: "Language",
        english: "English",
        russian: "Russian",
        switch_mode: "Switch Mode",
        edit: "Edit",
        close: "Close",
        add_comment: "Add Comment",
        send: "Send",
        cancel: "Cancel",
      },
    },
    ru: {
      translation: {
        home: "ГЛАВНАЯ",
        search_category: "Поиск категории",
        sort_by: "Сортировать по:",
        languages: "Язык",
        english: "Английский",
        russian: "Русский",
        switch_mode: "Смена режима",
        edit: "Редактировать",
        close: "Закрыть",
        add_comment: "Комментировать",
        send: "Отправить",
        cancel: "Отмена",
      },
    },
  },
});

export default i18next;
