import { FC, useState, useEffect } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
export interface PreviewImageData {
  originUrl: string;
  thumbnail?: string;
  downloadLink?: string;
  name?: string;
  type?: string;
}

interface Props {
  download?: boolean;
  data?: PreviewImageData;
  closeModal: () => void;
}

const ImagePreviewModal: FC<Props> = ({ download = true, data, closeModal }) => {
  if (!data) return null;
  const { originUrl, downloadLink, name } = data;
  return (
    <Lightbox
      open
      close={closeModal}
      carousel={{ finite: true }}
      styles={{
        navigationNext: {
          display: "none",
        },
        navigationPrev: {
          display: "none",
        },
      }}
      slides={[
        {
          src: originUrl,
          alt: name,
          title: name,
          description: name,
        },
      ]}
      plugins={[Captions, Zoom]}
      captions={{ descriptionTextAlign: "center" }}
    />
  );
};

export default ImagePreviewModal;