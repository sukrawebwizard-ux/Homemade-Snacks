import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ml' | 'hi' | 'ta' | 'te' | 'kn' | 'mt';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
    // HeroSection keys
    hero_tagline: {
        en: 'Homemade Snack Subscription',
        ml: 'വീടുകളിൽ ഉണ്ടാക്കിയ പലഹാരങ്ങൾ',
        hi: 'घर का बना नाश्ता सब्सक्रिप्शन',
        ta: 'வீட்டில் தயாரித்த சிற்றுண்டி சந்தா',
        te: 'ఇంట్లో తయారైన స్నాక్స్ సభ్యత్వం',
        kn: 'ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್ ಚಂದಾದಾರಿಕೆ',
        mt: 'Abbonament ta’ Snacks Magħmulin id-Dar',
    },
    hero_title_1: {
        en: 'Fresh Homemade Snacks,',
        ml: 'നല്ല നാടൻ പലഹാരങ്ങൾ,',
        hi: 'ताज़ा घर का बना नाश्ता,',
        ta: 'புதிய வீட்டுச் சிற்றுண்டிகள்,',
        te: 'తాజా ఇంటి స్నాక్స్,',
        kn: 'ತಾಜಾ ಮನೆಯಲ್ಲಿ ಮಾಡಿದ ಸ್ನ್ಯಾಕ್ಸ್,',
        mt: 'Snacks friski magħmulin id-dar,',
    },
    hero_title_2: {
        en: 'Delivered to Your Door.',
        ml: 'നിങ്ങളുടെ പടിവാതിൽക്കൽ എത്തുന്നു.',
        hi: 'सीधे आपके घर।',
        ta: 'உங்கள் வீட்டுத் திண்ணை வரை டெலிவரி.',
        te: 'మీ ఇంటి తలుపు వరకు డెలివరీ.',
        kn: 'ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿಗೆ ತಲುಪುತ್ತವೆ.',
        mt: 'Kunsinnati sal-bieb tiegħek.',
    },
    hero_subtitle: {
        en: 'Bi-weekly or monthly snack boxes filled with Kerala-style homemade goodies.',
        ml: 'കേരളീയ രുചിയിലുള്ള വീട്ടിലുണ്ടാക്കിയ പലഹാരങ്ങൾ രണ്ടാഴ്ചയിലൊരിക്കലോ മാസത്തിലോ വീട്ടിലെത്തിക്കുന്നു.',
        hi: 'केरल शैली के घर के बने स्नैक्स से भरे बॉक्स, हर दो हफ्ते या महीने में।',
        ta: 'கேரளா ஸ்டைல் வீட்டில் தயாரித்த நன்றிகள் நிரம்பிய சிற்றுண்டி பெட்டிகள்—இருவாரத்திற்கு ஒருமுறை அல்லது மாதம் ஒருமுறை.',
        te: 'కేరళ శైలిలో ఇంట్లో తయారైన రుచులు ఉన్న స్నాక్ బాక్స్‌లు—రెండు వారాలకు ఒకసారి లేదా నెలకు ఒకసారి.',
        kn: 'ಕೇರಳ ಶೈಲಿಯ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಗುಡೀಸ್ ತುಂಬಿದ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್‌ಗಳು—ಪ್ರತಿ ಎರಡು ವಾರಗಳು ಅಥವಾ ತಿಂಗಳಲ್ಲಿ ಒಮ್ಮೆ.',
        mt: 'Kaxxi ta’ snacks mimlija b’ġidliet magħmulin id-dar fl-istil ta’ Kerala—kull ġimagħtejn jew kull xahar.',
    },
    hero_feature_1: {
        en: 'Small-batch homemade snacks',
        ml: 'വീട്ടിലുണ്ടാക്കിയ ശുദ്ധമായ പലഹാരങ്ങൾ',
        hi: 'घर के बने शुद्ध स्नैक्स',
        ta: 'சிறு அளவில் வீட்டில் தயாரித்த சிற்றுண்டிகள்',
        te: 'చిన్న బ్యాచ్‌లుగా ఇంట్లో తయారైన స్నాక్స్',
        kn: 'ಸಣ್ಣ ಬ್ಯಾಚ್‌ನಲ್ಲಿ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್',
        mt: 'Snacks magħmulin id-dar f’lottijiet żgħar',
    },
    hero_feature_2: {
        en: 'Bi-weekly / Monthly delivery options',
        ml: 'രണ്ടാഴ്ചയിലൊരിക്കലോ മാസത്തിലോ ഡെലിവറി',
        hi: 'पाक्षिक / मासिक डिलीवरी विकल्प',
        ta: 'இருவார / மாதாந்திர டெலிவரி விருப்பங்கள்',
        te: 'రెండు వారాల / నెలవారీ డెలివరీ ఎంపికలు',
        kn: 'ಪ್ರತಿ ಎರಡು ವಾರ / ತಿಂಗಳ ಡೆಲಿವರಿ ಆಯ್ಕೆಗಳು',
        mt: 'Għażliet ta’ kunsinna kull ġimagħtejn / kull xahar',
    },
    hero_feature_3: {
        en: 'WhatsApp confirmation included',
        ml: 'വാട്സാപ്പ് വഴി കൺഫർമേഷൻ',
        hi: 'व्हाट्सएप पुष्टिकरण शामिल',
        ta: 'WhatsApp உறுதிப்படுத்தல் உட்பட',
        te: 'WhatsApp నిర్ధారణ కలదు',
        kn: 'WhatsApp ದೃಢೀಕರಣ ಸೇರಿದೆ',
        mt: 'Konferma fuq WhatsApp inkluża',
    },
    hero_no_card: {
        en: 'No card required. Pay via Cash or Revolut on delivery.',
        ml: 'ഓൺലൈൻ പേയ്‌മെന്റ് നിർബന്ധമില്ല. ഡെലിവറി സമയത്ത് പണമടച്ചാൽ മതി.',
        hi: 'कार्ड की आवश्यकता नहीं। डिलीवरी पर नकद या रिवोलुट से भुगतान करें।',
        ta: 'கார்டு தேவையில்லை. டெலிவரியில் Cash அல்லது Revolut மூலம் செலுத்தலாம்.',
        te: 'కార్డ్ అవసరం లేదు. డెలివరీ సమయంలో Cash లేదా Revolut ద్వారా చెల్లించండి.',
        kn: 'ಕಾರ್ಡ್ ಬೇಡ. ಡೆಲಿವರಿ ವೇಳೆ ನಗದು ಅಥವಾ Revolut ಮೂಲಕ ಪಾವತಿಸಿ.',
        mt: 'M’hemmx bżonn karta. Ħallas bil-flus kontanti jew Revolut mal-kunsinna.',
    },

    // How It Works keys
    how_it_works_title: {
        en: 'How It Works',
        ml: 'ഇതെങ്ങനെയാണ്?',
        hi: 'यह कैसे काम करता है?',
        ta: 'இது எப்படி வேலை செய்கிறது?',
        te: 'ఇది ఎలా పనిచేస్తుంది?',
        kn: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?',
        mt: 'Kif taħdem',
    },
    how_it_works_desc: {
        en: 'Simple, flexible subscription for fresh homemade snacks.',
        ml: 'വീട്ടിലുണ്ടാക്കിയ പലഹാരങ്ങൾക്കുള്ള ലളിതമായ സബ്സ്ക്രിപ്ഷൻ',
        hi: 'ताजा घर के बने नाश्ते के लिए सरल, लचीला सब्सक्रिप्शन।',
        ta: 'புதிய வீட்டுச் சிற்றுண்டிகளுக்கான எளிதான, நெகிழ்வான சந்தா.',
        te: 'తాజా ఇంటి స్నాక్స్ కోసం సులభమైన, లچీలైన సభ్యత్వం.',
        kn: 'ತಾಜಾ ಮನೆಯಲ್ಲಿ ಮಾಡಿದ ಸ್ನ್ಯಾಕ್ಸ್‌ಗಾಗಿ ಸರಳ, ಲವಚಿಕ ಚಂದಾದಾರಿಕೆ.',
        mt: 'Abbonament sempliċi u flessibbli għal snacks friski magħmulin id-dar.',
    },
    step_1_title: {
        en: 'Choose a plan',
        ml: 'ഒരു പ്ലാൻ തിരഞ്ഞെടുക്കുക',
        hi: 'एक योजना चुनें',
        ta: 'ஒரு திட்டத்தைத் தேர்ந்தெடுக்கவும்',
        te: 'ఒక ప్లాన్ ఎంచుకోండి',
        kn: 'ಒಂದು ಪ್ಲಾನ್ ಆಯ್ಕೆ ಮಾಡಿ',
        mt: 'Agħżel pjan',
    },
    step_1_desc: {
        en: 'Pick a monthly or bi-weekly snack box that matches your cravings.',
        ml: 'മാസത്തിലോ രണ്ടാഴ്ച്ചയിലൊരിക്കലോ ഉള്ള ബോക്സ് തിരഞ്ഞെടുക്കാം.',
        hi: 'एक मासिक या पाक्षिक स्नैक बॉक्स चुनें जो आपकी पसंद का हो।',
        ta: 'உங்கள் விருப்பத்திற்கு ஏற்ப மாதாந்திர அல்லது இருவார சிற்றுண்டி பெட்டியைத் தேர்ந்தெடுக்கவும்.',
        te: 'మీ కోరికలకు సరిపోయే నెలవారీ లేదా రెండు వారాల స్నాక్ బాక్స్‌ను ఎంచుకోండి.',
        kn: 'ನಿಮ್ಮ ಆಸೆಗೆ ತಕ್ಕಂತೆ ತಿಂಗಳ ಅಥವಾ ಎರಡು ವಾರಗಳ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್ ಆಯ್ಕೆ ಮಾಡಿ.',
        mt: 'Agħżel kaxxa ta’ snacks ta’ kull xahar jew kull ġimagħtejn li taqbel mat-togħma tiegħek.',
    },
    step_2_title: {
        en: 'Choose delivery day',
        ml: 'ഡെലിവറി ദിവസം',
        hi: 'डिलीवरी का दिन चुनें',
        ta: 'டெலிவரி நாளைத் தேர்ந்தெடுக்கவும்',
        te: 'డెలివరీ రోజు ఎంచుకోండి',
        kn: 'ಡೆಲಿವರಿ ದಿನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
        mt: 'Agħżel il-jum tal-kunsinna',
    },
    step_2_desc: {
        en: 'Select the day that works best for you. We’ll plan our cooking around it.',
        ml: 'നിങ്ങൾക്ക് സൗകര്യപ്രദമായ ദിവസം തിരഞ്ഞെടുക്കുക.',
        hi: 'वह दिन चुनें जो आपके लिए सबसे अच्छा हो। हम उसी के अनुसार खाना बनाएंगे।',
        ta: 'உங்களுக்கு ஏற்ற நாளைத் தேர்ந்தெடுக்கவும். அதன்படி சமைப்பதை திட்டமிடுவோம்.',
        te: 'మీకు అనుకూలమైన రోజు ఎంచుకోండి. ఆ రోజు ప్రకారం మేము వంట ప్లాన్ చేస్తాము.',
        kn: 'ನಿಮಗೆ ಅನುಕೂಲವಾದ ದಿನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ಅದಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನಾವು ಅಡುಗೆ ಯೋಜಿಸುತ್ತೇವೆ.',
        mt: 'Agħżel il-jum li jaħdem l-aħjar għalik. Aħna nippjanaw it-tisjir skontu.',
    },
    step_3_title: {
        en: 'Enjoy fresh snacks',
        ml: 'പലഹാരങ്ങൾ ആസ്വദിക്കൂ',
        hi: 'ताज़ा नाश्ते का आनंद लें',
        ta: 'புதிய சிற்றுண்டிகளை ரசிக்கவும்',
        te: 'తాజా స్నాక్స్‌ను ఆస్వాదించండి',
        kn: 'ತಾಜಾ ಸ್ನ್ಯಾಕ್ಸ್ ಆನಂದಿಸಿ',
        mt: 'Igawdi snacks friski',
    },
    step_3_desc: {
        en: 'Receive freshly prepared homemade snacks at your doorstep.',
        ml: 'വീട്ടിലുണ്ടാക്കിയ രുചികരമായ പലഹാരങ്ങൾ നിങ്ങളുടെ പടിവാതിൽക്കൽ.',
        hi: 'अपने दरवाजे पर ताज़ा तैयार घर का बना नाश्ता प्राप्त करें।',
        ta: 'புதிதாக தயாரிக்கப்பட்ட வீட்டுச் சிற்றுண்டிகள் உங்கள் வீட்டுக் கதவு வரை வரும்.',
        te: 'తాజాగా తయారైన ఇంటి స్నాక్స్ మీ ఇంటి తలుపు వద్ద అందుకుంటారు.',
        kn: 'ತಾಜಾ ತಯಾರಿಸಿದ ಮನೆಯಲ್ಲಿ 만든 ಸ್ನ್ಯಾಕ್ಸ್ ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿಗೆ ಸಿಗುತ್ತವೆ.',
        mt: 'Irċievi snacks friski magħmulin id-dar sal-bieb tiegħek.',
    },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        if (!translations[key]) return key;
        return translations[key][language] || translations[key]['en'];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
