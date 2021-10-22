import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
import { LocalNotifications } from '@capacitor/local-notifications';

import type { CsvGeneratorProps } from '../types/index';

export const csvGenerator = async (totalData, headerKey, headerToShow, fileName): Promise<CsvGeneratorProps> => {
  let data = totalData || null;
  if (data == null || !data.length) {
    return null;
  }
  let columnDelimiter = ",";
  let lineDelimiter = "\n";
  let keys = headerToShow;
  let result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;
  data.forEach(function (item) {
    let ctr = 0;
    headerKey.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter;
      if (Array.isArray(item[key])) {
        let arrayItem =
          item[key] && item[key].length > 0
            ? '"' + item[key].join(",") + '"'
            : "-";
        result += arrayItem;
      } else if (typeof item[key] == "string") {
        let strItem = item[key] ? '"' + item[key] + '"' : "-";
        result += strItem ? strItem.replace(/\s{2,}/g, " ") : strItem;
      } else {
        let strItem = item[key] + "";
        result += strItem ? strItem.replace(/,/g, "") : strItem;
      }

      ctr++;
    });
    result += lineDelimiter;
  });

  if (result == null) return;

  const csvData = `data:text/csv;charset=utf-8,${encodeURI(result)}`;
  const info = await Device.getInfo();

  if (info.platform === 'web') {
    let hiddenElement = window.document.createElement("a");
    hiddenElement.href = csvData;
    hiddenElement.target = "_blank";
    hiddenElement.download = fileName;
    hiddenElement.click();
  } else {
    await Filesystem.appendFile({
      path: `Download/${fileName}.csv`,
      data: csvData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    })
    LocalNotifications.schedule({
      notifications: [
        {
          title: "IOTA Addresses",
          body: "IOTA addrresses have been downloaded",
          id: 1,
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  }
};