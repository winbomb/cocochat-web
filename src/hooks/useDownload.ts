import { useEffect, useState } from "react";

type Download = { link: string; icon: string };

const useDownload = () => {
  const [download, setDownload] = useState<Download | Download[] | null>(null);
  useEffect(() => {
    const isAndroid = typeof window !== "undefined" ? navigator.userAgent.match(/Android/i) : false;
    setDownload(
      isAndroid
        ? [
            {
              link: "",
              icon: "https:///img/icon.app.google.play.png",
            },
            {
              link: "",
              icon: "https:///img/icon.app.apk.png",
            },
          ]
        : {
            link: "",
            icon: "https:///img/icon.app.ios.png",
          },
    );
  }, []);
  return download;
};
export default useDownload;
