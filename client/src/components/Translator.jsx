import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

function Translator() {
  // ↓ looks like a custom hook
  const { t, i18n } = useTranslation();

  const lngs = {
    en: { nativeName: 'English' },
    ja: { nativeName: 'Japanese' },
  };

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
      <p>{t('now_in_english')}</p>
    </>
  );
}

export default Translator;
