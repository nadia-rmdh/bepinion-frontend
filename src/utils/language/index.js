import EN from './en.json'
import ID from './id.json'
import {
    setLanguage as rslSetLanguage,
    getLanguage as rslGetLanguage,
    setDefaultTranslations,
    setDefaultLanguage,
} from 'react-switch-lang';

export default {
    languageChangedListeners: [],

    init() {
        setDefaultTranslations({ EN, ID });
        setDefaultLanguage('ID');
        const currentLang = localStorage.getItem('language') || 'ID';
        if (currentLang) {
            this.setLanguage(currentLang)
        }
    },

    setLanguage (lang) {
        rslSetLanguage(lang);
        localStorage.setItem('language', lang);
        this.languageChangedListeners.forEach(listener => {
            listener.call(this, this.getLanguage());
        })
    },

    getLanguage () {
        return rslGetLanguage()
    },

    onLanguageChanged (listener) {
        this.languageChangedListeners.push(listener);
    }
}
