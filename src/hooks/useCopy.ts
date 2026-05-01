import { useEffect, useState } from "react";
import toast from "react-hot-toast";

async function copyImageToClipboard(imageUrl: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  // Convert to PNG if needed (clipboard API requires PNG)
  const pngBlob = blob.type === "image/png"
    ? blob
    : await new Promise<Blob>((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob((b) => resolve(b!), "image/png");
        };
        img.src = URL.createObjectURL(blob);
      });
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": pngBlob }),
  ]);
}

const useCopy = (config: { enableToast: boolean } | void) => {
  const { enableToast = true } = config || {};

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied && enableToast) {
      toast.success("Copied!");
    }
  }, [copied]);

  const copyToClipboard = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str);
      return true;
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selection = document.getSelection();
      if (!selection) return false;
      const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
      el.select();
      const success = document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        selection.removeAllRanges();
        selection.addRange(selected);
      }
      return success;
    }
  };

  const copy = (text: string, isImage = false) => {
    let inter = 0;
    if (!copied) {
      if (!isImage) {
        copyToClipboard(text).then((success) => {
          setCopied(success);
          inter = window.setTimeout(() => {
            setCopied(false);
          }, 500);
        });
      } else {
        copyImageToClipboard(text).then(() => {
          setCopied(true);
          inter = window.setTimeout(() => {
            setCopied(false);
          }, 500);
        });
      }
    }
    return () => {
      clearTimeout(inter);
    };
  };

  return { copied, copy };
};

export default useCopy;