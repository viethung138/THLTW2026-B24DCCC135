// services/fieldService.js

import { getData, setData } from '../utils/storage';

const KEY = "fields";

export const getFields = () => getData(KEY);

export const addField = (field) => {
    const list = getFields();

    list.push({
        id: Date.now(),
        ...field // name, type
    });

    setData(KEY, list);
};