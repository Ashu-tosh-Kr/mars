import { useTranslation } from "react-i18next";
import { IconButton, useBoolean } from "@chakra-ui/react";
import { MdGTranslate } from "react-icons/md";

function Translator() {
  /**hooks */
  const { i18n } = useTranslation();
  const [flag, setFlag] = useBoolean();

  const lngs = {
    en: { nativeName: "English" },
    ja: { nativeName: "Japanese" },
  };

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <IconButton
          pos="absolute"
          bottom={10}
          right={10}
          key={lng}
          type="submit"
          onClick={() => {
            setFlag.toggle();
            i18n.changeLanguage(flag ? "en" : "ja");
          }}
          size="sm"
          icon={<MdGTranslate />}
        />
      ))}
    </>
  );
}

export default Translator;
