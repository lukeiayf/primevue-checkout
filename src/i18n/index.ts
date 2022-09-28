import {
    createI18n,
    I18n,
    I18nOptions,
    IntlDateTimeFormats,
    IntlNumberFormats,
    LocaleMessages,
    VueMessageType,
} from "vue-i18n";

export function setupI18n(
    options: I18nOptions
): I18n<
    LocaleMessages<VueMessageType> | undefined,
    IntlDateTimeFormats | undefined,
    IntlNumberFormats | undefined,
    boolean
> {
    const i18n:any = createI18n(options);
    loadLocaleMessages(i18n, options);
    setI18nLanguage(i18n, options);
    return i18n;
}

function setI18nLanguage(
    i18n: I18n<
        LocaleMessages<VueMessageType> | undefined,
        IntlDateTimeFormats | undefined,
        IntlNumberFormats | undefined,
        boolean
    >,
    options: I18nOptions
) {
    i18n.global.locale = options.locale as string;
    document
        .querySelector("html")
        ?.setAttribute("lang", options.locale as string);
}
async function loadLocaleMessages(
    i18n: I18n<
        LocaleMessages<VueMessageType> | undefined,
        IntlDateTimeFormats | undefined,
        IntlNumberFormats | undefined,
        boolean
    >,
    options: I18nOptions
) {
    if (!i18n.global.availableLocales.includes(options.locale as string)) {
        let messages;
        try {
            messages = await import("./pt.json");
        } catch (error) {
            messages = await import("./pt.json");
        }
        i18n.global.setLocaleMessage(options.locale as string, messages.default);
    }
}
