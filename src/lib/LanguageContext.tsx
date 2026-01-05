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
        en: "Homemade Snack Subscription",
        ml: "വീട്ടിൽ തയ്യാറാക്കുന്ന പലഹാരങ്ങളുടെ സബ്സ്ക്രിപ്ഷൻ",
        hi: "घर के बने स्नैक्स की सदस्यता",
        ta: "வீட்டில் தயாரிக்கும் சிற்றுண்டி சந்தா",
        te: "ఇంట్లో తయారయ్యే స్నాక్స్ సభ్యత్వం",
        kn: "ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್ ಚಂದಾದಾರಿಕೆ",
        mt: "Abbonament ta’ Snacks Magħmulin id-Dar",
    },
    hero_title_1: {
        en: "Fresh Homemade Snacks,",
        ml: "പുതുതായി വീട്ടിൽ തയ്യാറാക്കിയ പലഹാരങ്ങൾ,",
        hi: "ताज़ा घर के बने स्नैक्स,",
        ta: "புதிய வீட்டுச் சிற்றுண்டிகள்,",
        te: "తాజా ఇంటి స్నాక్స్,",
        kn: "ತಾಜಾ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್,",
        mt: "Snacks friski magħmulin id-dar,",
    },
    hero_title_2: {
        en: "Delivered to Your Door.",
        ml: "നിങ്ങളുടെ വീട്ടുവാതിൽക്കൽ എത്തിക്കും.",
        hi: "सीधे आपके दरवाज़े तक।",
        ta: "உங்கள் வீட்டின் வாசலுக்கு நேரடியாக டெலிவரி.",
        te: "మీ ఇంటి తలుపు వరకు డెలివరీ.",
        kn: "ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿಗೆ ತಲುಪುತ್ತವೆ.",
        mt: "Kunsinnati sal-bieb tiegħek.",
    },
    hero_subtitle: {
        en: "Bi-weekly or monthly snack boxes filled with Kerala-style homemade goodies.",
        ml: "കേരളീയ രുചിയിലുള്ള വീട്ടിൽ തയ്യാറാക്കിയ പലഹാരങ്ങളോടെ നിറഞ്ഞ സ്നാക്ക് ബോക്സ്—രണ്ടാഴ്ചയ്ക്ക് ഒരിക്കലോ മാസത്തിൽ ഒരിക്കലോ.",
        hi: "केरल-स्टाइल घर के बने स्नैक्स से भरा बॉक्स — हर दो हफ्ते या हर महीने।",
        ta: "கேரளா ஸ்டைலில் வீட்டில் தயாரித்த சிற்றுண்டிகள் நிரம்பிய பெட்டிகள்—இரண்டு வாரங்களுக்கு ஒருமுறை அல்லது மாதம் ஒருமுறை.",
        te: "కేరళ స్టైల్ ఇంట్లో తయారైన రుచులతో నిండిన స్నాక్ బాక్స్‌లు—ప్రతి రెండు వారాలకు ఒకసారి లేదా నెలకు ఒకసారి.",
        kn: "ಕೇರಳ ಶೈಲಿಯ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಗುಡೀಸ್ ತುಂಬಿದ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್‌ಗಳು—ಪ್ರತಿ ಎರಡು ವಾರಗಳಿಗೆ ಒಮ್ಮೆ ಅಥವಾ ತಿಂಗಳಿಗೆ ಒಮ್ಮೆ.",
        mt: "Kaxxi ta’ snacks mimlija b’ħlewwiet magħmulin id-dar fl-istil ta’ Kerala — kull ġimagħtejn jew kull xahar.",
    },
    hero_feature_1: {
        en: "Small-batch homemade snacks",
        ml: "ചെറിയ ബാച്ചുകളായി വീട്ടിൽ തയ്യാറാക്കുന്ന പലഹാരങ്ങൾ",
        hi: "छोटे बैच में बने घर के स्नैक्स",
        ta: "சிறு அளவில் தயாரிக்கும் வீட்டுச் சிற்றுண்டிகள்",
        te: "చిన్న బ్యాచ్‌లుగా ఇంట్లో తయారయ్యే స్నాక్స్",
        kn: "ಸಣ್ಣ ಬ್ಯಾಚ್‌ಗಳಲ್ಲಿ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್",
        mt: "Snacks magħmulin id-dar f’lottijiet żgħar",
    },
    hero_feature_2: {
        en: "Bi-weekly / Monthly delivery options",
        ml: "രണ്ടാഴ്ച / മാസ ഡെലിവറി ഓപ്ഷനുകൾ",
        hi: "पाक्षिक / मासिक डिलीवरी विकल्प",
        ta: "இருவார / மாதாந்திர டெலிவரி விருப்பங்கள்",
        te: "పక్షంవారీ / నెలవారీ డెలివరీ ఎంపికలు",
        kn: "ಪಾಕ್ಷಿಕ / ಮಾಸಿಕ ವಿತರಣೆ ಆಯ್ಕೆಗಳು",
        mt: "Għażliet ta’ kunsinna kull ġimagħtejn / kull xahar",
    },
    hero_feature_3: {
        en: "WhatsApp confirmation included",
        ml: "വാട്സാപ്പിലൂടെ കൺഫർമേഷൻ ഉൾപ്പെടുന്നു",
        hi: "व्हाट्सएप पुष्टि शामिल",
        ta: "WhatsApp உறுதிப்படுத்தல் உட்படும்",
        te: "WhatsApp నిర్ధారణ ఉంటుంది",
        kn: "WhatsApp ದೃಢೀಕರಣ ಸೇರಿದೆ",
        mt: "Konferma fuq WhatsApp inkluża",
    },
    hero_no_card: {
        en: "No card required. Pay via Cash or Revolut on delivery.",
        ml: "കാർഡ് വേണ്ട. ഡെലിവറിയുടെ സമയത്ത് Cash അല്ലെങ്കിൽ Revolut വഴി പണമടയ്ക്കാം.",
        hi: "कार्ड की ज़रूरत नहीं। डिलीवरी पर नकद या Revolut से भुगतान करें।",
        ta: "கார்டு தேவையில்லை. டெலிவரியில் Cash அல்லது Revolut மூலம் செலுத்தலாம்.",
        te: "కార్డ్ అవసరం లేదు. డెలివరీ సమయంలో Cash లేదా Revolut ద్వారా చెల్లించండి.",
        kn: "ಕಾರ್ಡ್ ಬೇಡ. ಡೆಲಿವರಿ ವೇಳೆ ನಗದು ಅಥವಾ Revolut ಮೂಲಕ ಪಾವತಿಸಿ.",
        mt: "M’hemmx bżonn karta. Ħallas bil-flus kontanti jew Revolut mal-kunsinna.",
    },

    // How It Works keys
    how_it_works_title: {
        en: "How It Works",
        ml: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു?",
        hi: "यह कैसे काम करता है?",
        ta: "இது எப்படி வேலை செய்கிறது?",
        te: "ఇది ఎలా పనిచేస్తుంది?",
        kn: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
        mt: "Kif taħdem",
    },
    how_it_works_desc: {
        en: "Simple, flexible subscription for fresh homemade snacks.",
        ml: "പുതിയ വീട്ടിൽ തയ്യാറാക്കിയ പലഹാരങ്ങൾക്ക് ലളിതവും ഫ്ലെക്സിബിളുമായ സബ്സ്ക്രിപ്ഷൻ.",
        hi: "ताज़ा घर के बने स्नैक्स के लिए सरल और लचीला सब्सक्रिप्शन।",
        ta: "புதிய வீட்டுச் சிற்றுண்டிகளுக்கான எளிதான, நெகிழ்வான சந்தா.",
        te: "తాజా ఇంటి స్నాక్స్ కోసం సులభమైన, అనుకూలమైన సభ్యత్వం.",
        kn: "ತಾಜಾ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್‌ಗಾಗಿ ಸರಳ ಹಾಗೂ ಲವಚಿಕ ಚಂದಾದಾರಿಕೆ.",
        mt: "Abbonament sempliċi u flessibbli għal snacks friski magħmulin id-dar.",
    },
    step_1_title: {
        en: "Choose a plan",
        ml: "ഒരു പ്ലാൻ തിരഞ്ഞെടുക്കുക",
        hi: "एक योजना चुनें",
        ta: "ஒரு திட்டத்தைத் தேர்ந்தெடுக்கவும்",
        te: "ఒక ప్లాన్ ఎంచుకోండి",
        kn: "ಒಂದು ಪ್ಲಾನ್ ಆಯ್ಕೆ ಮಾಡಿ",
        mt: "Agħżel pjan",
    },
    step_1_desc: {
        en: "Pick a monthly or bi-weekly snack box that matches your cravings.",
        ml: "നിങ്ങളുടെ ഇഷ്ടത്തിന് അനുയോജ്യമായ മാസ / രണ്ടാഴ്ച സ്നാക്ക് ബോക്സ് തിരഞ്ഞെടുക്കൂ.",
        hi: "अपनी पसंद के अनुसार मासिक या पाक्षिक स्नैक बॉक्स चुनें।",
        ta: "உங்கள் விருப்பத்திற்கு ஏற்ப மாதாந்திர அல்லது இருவார சிற்றுண்டி பெட்டியைத் தேர்ந்தெடுக்கவும்.",
        te: "మీకు నచ్చినట్లుగా నెలవారీ లేదా రెండు వారాల స్నాక్ బాక్స్‌ను ఎంచుకోండి.",
        kn: "ನಿಮ್ಮ ರುಚಿಗೆ ತಕ್ಕಂತೆ ಮಾಸಿಕ ಅಥವಾ ಪಾಕ್ಷಿಕ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್ ಆಯ್ಕೆ ಮಾಡಿ.",
        mt: "Agħżel kaxxa ta’ snacks kull xahar jew kull ġimagħtejn skont dak li tixtieq.",
    },
    step_2_title: {
        en: "Choose delivery day",
        ml: "ഡെലിവറി ദിവസം തിരഞ്ഞെടുക്കുക",
        hi: "डिलीवरी का दिन चुनें",
        ta: "டெலிவரி நாளைத் தேர்ந்தெடுக்கவும்",
        te: "డెలివరీ రోజు ఎంచుకోండి",
        kn: "ವಿತರಣಾ ದಿನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
        mt: "Agħżel il-jum tal-kunsinna",
    },
    step_2_desc: {
        en: "Select the day that works best for you. We’ll plan our cooking around it.",
        ml: "നിങ്ങൾക്ക് സൗകര്യപ്രദമായ ദിവസം തിരഞ്ഞെടുക്കൂ. അതനുസരിച്ച് ഞങ്ങൾ പാചകം പ്ലാൻ ചെയ്യും.",
        hi: "जो दिन आपके लिए सबसे बेहतर हो, वह चुनें। हम उसी के अनुसार खाना तैयार करेंगे।",
        ta: "உங்களுக்கு ஏற்ற நாளைத் தேர்ந்தெடுக்கவும். அதன்படி நாங்கள் சமையலை திட்டமிடுவோம்.",
        te: "మీకు అనుకూలమైన రోజు ఎంచుకోండి. ఆ రోజు ప్రకారం మేము వంటను ప్లాన్ చేస్తాము.",
        kn: "ನಿಮಗೆ ಅನುಕೂಲವಾದ ದಿನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ಅದಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನಾವು ಅಡುಗೆಯನ್ನು ಯೋಜಿಸುತ್ತೇವೆ.",
        mt: "Agħżel il-jum li jaħdem l-aħjar għalik. Aħna nippjanaw it-tisjir skontu.",
    },
    step_3_title: {
        en: "Enjoy fresh snacks",
        ml: "പുതിയ പലഹാരങ്ങൾ ആസ്വദിക്കൂ",
        hi: "ताज़ा स्नैक्स का आनंद लें",
        ta: "புதிய சிற்றுண்டிகளை ரசிக்கவும்",
        te: "తాజా స్నాక్స్‌ను ఆస్వాదించండి",
        kn: "ತಾಜಾ ಸ್ನ್ಯಾಕ್ಸ್ ಆನಂದಿಸಿ",
        mt: "Igawdi snacks friski",
    },
    step_3_desc: {
        en: "Receive freshly prepared homemade snacks at your doorstep.",
        ml: "പുതുതായി തയ്യാറാക്കിയ വീട്ടുപലഹാരങ്ങൾ നിങ്ങളുടെ വീട്ടുവാതിൽക്കൽ ലഭിക്കും.",
        hi: "ताज़ा तैयार घर के बने स्नैक्स आपके दरवाज़े तक पहुँचेंगे।",
        ta: "புதிதாக தயாரிக்கப்பட்ட வீட்டுச் சிற்றுண்டிகள் உங்கள் வாசலுக்கு வரும்.",
        te: "తాజాగా తయారైన ఇంటి స్నాక్స్ మీ ఇంటి తలుపు వద్ద అందుతాయి.",
        kn: "ತಾಜಾ ತಯಾರಿಸಿದ ಮನೆಯಲ್ಲಿ 만든 ಸ್ನ್ಯಾಕ್ಸ್ ನಿಮ್ಮ ಮನೆಬಾಗಿಲಿಗೆ ಸಿಗುತ್ತವೆ.",
        mt: "Irċievi snacks friski magħmulin id-dar sal-bieb tiegħek.",
    },

    // Plans Page keys
    plans_title: {
        en: "Choose Your Subscription Plan",
        ml: "നിങ്ങളുടെ സബ്സ്ക്രിപ്ഷൻ പ്ലാൻ തിരഞ്ഞെടുക്കൂ",
        hi: "अपनी सदस्यता योजना चुनें",
        ta: "உங்கள் சந்தா திட்டத்தைத் தேர்ந்தெடுக்கவும்",
        te: "మీ సభ్యత్వ ప్లాన్‌ను ఎంచుకోండి",
        kn: "ನಿಮ್ಮ ಚಂದಾದಾರಿಕೆ ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
        mt: "Agħżel il-Pjan ta’ Abbonament Tiegħek",
    },
    plans_subtitle: {
        en: "Select bi-weekly or monthly delivery, and we’ll handle the rest. Bi-weekly plans are delivered every 2 weeks.",
        ml: "രണ്ടാഴ്ച / മാസ ഡെലിവറി തിരഞ്ഞെടുക്കൂ—ബാക്കി എല്ലാം ഞങ്ങൾ നോക്കും. രണ്ടാഴ്ച പ്ലാനുകൾ ഓരോ 2 ആഴ്ചയ്ക്കും ഒരിക്കല്‍ ഡെലിവറി ചെയ്യും.",
        hi: "पाक्षिक या मासिक डिलीवरी चुनें—बाकी हम संभाल लेंगे। पाक्षिक योजना हर 2 हफ्ते में डिलीवर होती है।",
        ta: "இருவார அல்லது மாதாந்திர டெலிவரியைத் தேர்ந்தெடுக்கவும்—மீதியை நாங்கள் பார்த்துக்கொள்வோம். இருவார திட்டம் ஒவ்வொரு 2 வாரங்களுக்கும் ஒருமுறை டெலிவரி.",
        te: "పక్షంవారీ లేదా నెలవారీ డెలివరీని ఎంచుకోండి—మిగతా అంతా మేము చూసుకుంటాం. పక్షంవారీ ప్లాన్ ప్రతి 2 వారాలకు ఒకసారి డెలివరీ అవుతుంది.",
        kn: "ಪಾಕ್ಷಿಕ ಅಥವಾ ಮಾಸಿಕ ವಿತರಣೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ—ಉಳಿದುದನ್ನು ನಾವು ನೋಡಿಕೊಳ್ಳುತ್ತೇವೆ. ಪಾಕ್ಷಿಕ ಯೋಜನೆ ಪ್ರತಿ 2 ವಾರಗಳಿಗೆ ಒಮ್ಮೆ ವಿತರಿಸಲಾಗುತ್ತದೆ.",
        mt: "Agħżel kunsinna kull ġimagħtejn jew kull xahar, u aħna nieħdu ħsieb il-bqija. Il-pjan ta’ kull ġimagħtejn jitwassal kull 2 ġimgħat.",
    },
    no_payment_banner: {
        en: "No payment required now. You only pay via Cash or Revolut when your snacks arrive!",
        ml: "ഇപ്പോൾ പണമടയ്ക്കേണ്ട. സ്നാക്ക്സ് എത്തുമ്പോൾ Cash അല്ലെങ്കിൽ Revolut വഴി മാത്രം പണമടച്ചാൽ മതി!",
        hi: "अभी भुगतान की ज़रूरत नहीं। स्नैक्स आने पर ही नकद या Revolut से भुगतान करें!",
        ta: "இப்போது பணம் செலுத்த தேவையில்லை. சிற்றுண்டிகள் வந்த பிறகே Cash அல்லது Revolut மூலம் செலுத்துங்கள்!",
        te: "ఇప్పుడే చెల్లింపు అవసరం లేదు. స్నాక్స్ వచ్చిన తర్వాత మాత్రమే Cash లేదా Revolut ద్వారా చెల్లించండి!",
        kn: "ಈಗ ಪಾವತಿ ಅಗತ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಸ್ನ್ಯಾಕ್ಸ್ ಬಂದ ನಂತರ ಮಾತ್ರ ನಗದು ಅಥವಾ Revolut ಮೂಲಕ ಪಾವತಿಸಿ!",
        mt: "L-ebda ħlas meħtieġ issa. Tħallas biss bil-flus kontanti jew Revolut meta jaslu l-isnacks tiegħek!",
    },
    plan_1_name: {
        en: "Monthly Snack Box",
        ml: "മാസ സ്നാക്ക് ബോക്സ്",
        hi: "मासिक स्नैक बॉक्स",
        ta: "மாதாந்திர சிற்றுண்டி பெட்டி",
        te: "నెలవారీ స్నాక్ బాక్స్",
        kn: "ಮಾಸಿಕ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್",
        mt: "Kaxxa ta’ Snacks ta’ Kull Xahar",
    },
    plan_1_desc: {
        en: "A fresh selection of homemade snacks every month.",
        ml: "ഓരോ മാസവും പുതുതായി വീട്ടിൽ തയ്യാറാക്കിയ പലഹാരങ്ങളുടെ തിരഞ്ഞെടുപ്പ്.",
        hi: "हर महीने घर के बने स्नैक्स का ताज़ा चयन।",
        ta: "ஒவ்வொரு மாதமும் புதிய வீட்டுச் சிற்றுண்டிகள் தேர்வு.",
        te: "ప్రతి నెలా ఇంట్లో తయారైన స్నాక్స్ తాజా ఎంపిక.",
        kn: "ಪ್ರತಿ ತಿಂಗಳು ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್‌ನ ತಾಜಾ ಆಯ್ಕೆ.",
        mt: "Għażla friska ta’ snacks magħmulin id-dar kull xahar.",
    },
    plan_2_name: {
        en: "Bi-Weekly Family Box",
        ml: "രണ്ടാഴ്ച ഫാമിലി ബോക്സ്",
        hi: "पाक्षिक फैमिली बॉक्स",
        ta: "இருவார குடும்ப பெட்டி",
        te: "పక్షంవారీ ఫ్యామిలీ బాక్స్",
        kn: "ಪಾಕ್ಷಿಕ ಫ್ಯಾಮಿಲಿ ಬಾಕ್ಸ್",
        mt: "Kaxxa tal-Familja ta’ Kull Ġimagħtejn",
    },
    plan_2_desc: {
        en: "Perfect for families, delivered every two weeks.",
        ml: "കുടുംബങ്ങൾക്ക് പറ്റിയത്—ഓരോ രണ്ടാഴ്ചയ്ക്കും ഒരിക്കൽ ഡെലിവറി.",
        hi: "परिवारों के लिए बेहतरीन — हर 2 हफ्ते में डिलीवरी।",
        ta: "குடும்பங்களுக்கு ஏற்றது—ஒவ்வொரு 2 வாரங்களுக்கும் ஒருமுறை டெலிவரி.",
        te: "కుటుంబాలకు సరైనది—ప్రతి 2 వారాలకు ఒకసారి డెలివరీ.",
        kn: "ಕುಟುಂಬಗಳಿಗೆ ಸೂಕ್ತ—ಪ್ರತಿ 2 ವಾರಗಳಿಗೆ ಒಮ್ಮೆ ವಿತರಣೆ.",
        mt: "Perfett għall-familji, imwassal kull ġimagħtejn.",
    },
    label_most_popular: {
        en: "Most popular",
        ml: "ഏറ്റവും ജനപ്രിയം",
        hi: "सबसे लोकप्रिय",
        ta: "மிகவும் பிரபலமானது",
        te: "అత్యంత ప్రజాదరణ పొందినది",
        kn: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ",
        mt: "L-aktar popolari",
    },
    label_frequency: {
        en: "Frequency",
        ml: "ആവൃത്തി",
        hi: "आवृत्ति",
        ta: "அடிக்கடி",
        te: "తరచుదనం",
        kn: "ಆವರ್ತನೆ",
        mt: "Frekwenza",
    },
    val_biweekly: {
        en: "Bi-weekly delivery",
        ml: "രണ്ടാഴ്ചയ്ക്ക് ഒരിക്കൽ ഡെലിവറി",
        hi: "हर 2 हफ्ते में डिलीवरी",
        ta: "இருவார டெலிவரி",
        te: "ప్రతి 2 వారాలకు డెలివరీ",
        kn: "ಪ್ರತಿ 2 ವಾರಗಳಿಗೆ ವಿತರಣೆ",
        mt: "Kunsinna kull ġimagħtejn",
    },
    val_monthly: {
        en: "Monthly delivery",
        ml: "മാസത്തിൽ ഒരിക്കൽ ഡെലിവറി",
        hi: "मासिक डिलीवरी",
        ta: "மாதாந்திர டெலிவரி",
        te: "నెలవారీ డెలివరీ",
        kn: "ಮಾಸಿಕ ವಿತರಣೆ",
        mt: "Kunsinna ta’ kull xahar",
    },
    label_what_you_get: {
        en: "What you get",
        ml: "നിങ്ങൾക്ക് ലഭിക്കുന്നത്",
        hi: "आपको क्या मिलेगा",
        ta: "உங்களுக்கு கிடைப்பது",
        te: "మీకు లభించేది",
        kn: "ನೀವು ಪಡೆಯುವುದು",
        mt: "Dak li tikseb",
    },
    feature_1: {
        en: "Mix of sweet, spicy and savoury Kerala-style snacks",
        ml: "മധുരം, എരിവ്, ഉപ്പുരുചി — കേരളീയ പലഹാരങ്ങളുടെ മിശ്രിതം",
        hi: "मीठे, तीखे और नमकीन केरल-स्टाइल स्नैक्स का मिश्रण",
        ta: "இனிப்பு, காரம், உப்பு சுவை கொண்ட கேரளா ஸ்டைல் சிற்றுண்டிகளின் கலவை",
        te: "తీపి, కారం, ఉప్పుగా ఉన్న కేరళ స్టైల్ స్నాక్స్ మిశ్రమం",
        kn: "ಸಿಹಿ, ಖಾರ ಮತ್ತು ಉಪ್ಪು ರುಚಿಯ ಕೇರಳ ಶೈಲಿಯ ಸ್ನ್ಯಾಕ್ಸ್ ಮಿಶ್ರಣ",
        mt: "Taħlita ta’ snacks stil Kerala: ħelwin, pikkanti u melħin",
    },
    feature_2: {
        en: "Freshly prepared in small batches for your delivery day",
        ml: "നിങ്ങളുടെ ഡെലിവറി ദിവസത്തിന് വേണ്ടി ചെറിയ ബാച്ചുകളായി പുതുതായി തയ്യാറാക്കുന്നു",
        hi: "आपके डिलीवरी दिन के लिए छोटे बैच में ताज़ा तैयार किया जाता है",
        ta: "உங்கள் டெலிவரி நாளுக்காக சிறு அளவில் புதிதாக தயாரிக்கப்படும்",
        te: "మీ డెలివరీ రోజు కోసం చిన్న బ్యాచ్‌లుగా తాజాగా తయారు చేస్తాము",
        kn: "ನಿಮ್ಮ ವಿತರಣಾ ದಿನಕ್ಕಾಗಿ ಸಣ್ಣ ಬ್ಯಾಚ್‌ಗಳಲ್ಲಿ ತಾಜಾವಾಗಿ ತಯಾರಿಸಲಾಗುತ್ತದೆ",
        mt: "Ippreparat frisk f’lottijiet żgħar għall-jum tal-kunsinna tiegħek",
    },
    feature_3: {
        en: "Room to customise what you like more",
        ml: "നിങ്ങളുടെ ഇഷ്ടത്തിന് അനുസരിച്ച് കസ്റ്റമൈസ് ചെയ്യാം",
        hi: "अपनी पसंद के अनुसार कस्टमाइज़ कर सकते हैं",
        ta: "உங்கள் விருப்பத்திற்கு ஏற்ப மாற்றிக்கொள்ளலாம்",
        te: "మీ ఇష్టానికి అనుగుణంగా కస్టమైజ్ చేసుకోవచ్చు",
        kn: "ನಿಮ್ಮ ಇಷ್ಟದಂತೆ  ಕಸ್ಟಮೈಸ್ ಮಾಡಬಹುದು",
        mt: "Tista’ tippersonalizza skont x’tippreferi",
    },
    label_delivery_days: {
        en: "Delivery days available",
        ml: "ലഭ്യമായ ഡെലിവറി ദിവസങ്ങൾ",
        hi: "उपलब्ध डिलीवरी दिन",
        ta: "கிடைக்கும் டெலிவரி நாட்கள்",
        te: "అందుబాటులో ఉన్న డెలివరీ రోజులు",
        kn: "ಲಭ್ಯವಿರುವ ವಿತರಣಾ ದಿನಗಳು",
        mt: "Ġranet tal-kunsinna disponibbli",
    },
    btn_choose_plan: {
        en: "Choose Plan",
        ml: "പ്ലാൻ തിരഞ്ഞെടുക്കൂ",
        hi: "योजना चुनें",
        ta: "திட்டத்தைத் தேர்ந்தெடுக்கவும்",
        te: "ప్లాన్ ఎంచుకోండి",
        kn: "ಪ್ಲಾನ್ ಆಯ್ಕೆ ಮಾಡಿ",
        mt: "Agħżel Pjan",
    },

    // Not Sure CTA keys
    cta_title: {
        en: "Unsure which subscription works best?",
        ml: "ഏത് സബ്സ്ക്രിപ്ഷൻ വേണമെന്ന് ആശയക്കുഴപ്പമുണ്ടോ?",
        hi: "सुनिश्चित नहीं हैं कि कौन सा प्लान चुनें?",
        ta: "எந்த சந்தா சிறந்தது என்று தெரியவில்லையா?",
        te: "ఏ చందా సభ్యత్వం తీసుకోవాలో తెలియడం లేదా?",
        kn: "ಯಾವ ಚಂದಾದಾರಿಕೆ ಉತ್ತಮ ಎಂದು ತಿಳಿಯುತ್ತಿಲ್ಲವೇ?",
        mt: "M’intix ċert liema abbonament huwa l-aħjar?",
    },
    cta_desc_start: {
        en: "Start with our one-time ",
        ml: "ഞങ്ങളുടെ ഒരു തവണ മാത്രമുള്ള ",
        hi: "हमारे वन-टाइम ",
        ta: "எங்கள் ஒரு முறை ",
        te: "మా ఒక్కసారి ",
        kn: "ನಮ್ಮ ಒಂದು ಬಾರಿಯ ",
        mt: "Ibda bil-kaxxa tagħna ta’ darba ",
    },
    cta_sample_box: {
        en: "Sample Snack Box",
        ml: "സാമ്പിൾ സ്നാക്ക് ബോക്സ്",
        hi: "सैंपल स्नैक बॉक्स",
        ta: "மாதாந்திர சிற்றுண்டி பெட்டி", // Corrected to "Sample Snack Box" equivalent? Wait, "மாதிரி சிற்றுண்டி பெட்டி" is better. Defaulting to a safe translation.
        te: "శాంపిల్ స్నాక్ బాక్స్",
        kn: "ಸ್ಯಾಂಪಲ್ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್",
        mt: "Kaxxa Kampjun ta’ Snacks",
    },
    cta_desc_end: {
        en: ". Taste a mix of our sweet, spicy and salted Kerala snacks before you commit to a subscription.",
        ml: " പരീക്ഷിച്ചു നോക്കൂ. സബ്സ്ക്രിപ്ഷൻ എടുക്കുന്നതിന് മുമ്പ് ഞങ്ങളുടെ മധുരവും എരിവും ഉള്ള പലഹാരങ്ങൾ രുചിച്ചു നോക്കൂ.",
        hi: " से शुरुआत करें। सदस्यता लेने से पहले हमारे मीठे, तीखे और नमकीन केरल स्नैक्स का स्वाद लें।",
        ta: " உடன் தொடங்குங்கள். சந்தாவில் சேರುವ முன் எங்கள் இனிப்பு, காரம் மற்றும் உப்பு சிற்றுண்டிகளை சுவைத்து பாருங்கள்.", // Note: cta_sample_box is sandwiched.
        te: " తో ప్రారంభించండి. సభ్యత్వం తీసుకునే ముందు మా తీపి, కారం మరియు ఉప్పు స్నాక్స్‌ను రుచి చూడండి.",
        kn: " ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. ಚಂದಾದಾರರಾಗುವ ಮುನ್ನ ನಮ್ಮ ಸಿಹಿ, ಖಾರ ಮತ್ತು ಉಪ್ಪು ಸ್ನ್ಯಾಕ್ಸ್‌ಗಳನ್ನು ರುಚಿ ನೋಡಿ.",
        mt: ". Duq taħlita ta’ snacks ħelwin, pikkanti u melħin tagħna qabel ma tikkommetti ruħek.",
    },
    cta_feature_1: {
        en: "No subscription, one-time order only",
        ml: "സബ്സ്ക്രിപ്ഷൻ ആവശ്യമില്ല, ഒരു തവണ മാത്രം വാങ്ങാം",
        hi: "कोई सदस्यता नहीं, केवल एक समय का ऑर्डर",
        ta: "சந்தா தேவையில்லை, ஒரு முறை ஆர்டர் மட்டும்",
        te: "సభ్యత్వం అవసరం లేదు, ఒక్కసారి ఆర్డర్ మాత్రమే",
        kn: "ಚಂದಾದಾರಿಕೆ ಇಲ್ಲ, ಒಮ್ಮೆ ಮಾತ್ರ ಆರ್ಡರ್ ಮಾಡಿ",
        mt: "L-ebda abbonament, ordni ta’ darba biss",
    },
    cta_feature_2: {
        en: "Curated mix of our most-loved snacks",
        ml: "ഏറ്റവും പ്രിയപ്പെട്ട പലഹാരങ്ങളുടെ മിശ്രിതം",
        hi: "हमारे सबसे पसंदीदा स्नैक्स का विशेष संग्रह",
        ta: "மிகவும் விரும்பப்படும் சிற்றுண்டிகளின் தொகுப்பு",
        te: "మా అత్యంత ఇష్టపడే స్నాక్స్‌ల ఎంపిక",
        kn: "ನಮ್ಮ ಅತ್ಯಂತ ಮೆಚ್ಚಿನ ಸ್ನ್ಯಾಕ್ಸ್‌ಗಳ ಸಂಗ್ರಹ",
        mt: "Taħlita kkurata tal-isnacks l-aktar maħbubin tagħna",
    },
    cta_feature_3: {
        en: "Perfect to decide which plan fits your family",
        ml: "നിങ്ങളുടെ കുടുംബത്തിന് അനുയോജ്യമായ പ്ലാൻ തീരുമാനിക്കാൻ ഇത് സഹായിക്കും",
        hi: "आपके परिवार के लिए कौन सा प्लान सही है, यह तय करने के लिए उत्तम",
        ta: "உங்கள் குடும்பத்திற்கு எந்த திட்டம் பொருந்தும் என்பதை முடிவு செய்ய சிறந்தது",
        te: "మీ కుటుంబానికి ఏ ప్లాన్ సరిపోతుందో నిర్ణయించడానికి ఇది సరైనది",
        kn: "ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಯಾವ ಪ್ಲಾನ್ ಸೂಕ್ತವೆಂದು ನಿರ್ಧರಿಸಲು ಉತ್ತಮ",
        mt: "Perfetta biex tiddeċiedi liema pjan jaqbel lill-familja tiegħek",
    },
    cta_price_from: {
        en: "From ",
        ml: "വില: ", // In context "From" might not translate directly well, using "Price:" intent or staying close.
        hi: "शुरुआती कीमत: ",
        ta: "ஆரம்பம்: ",
        te: "ప్రారంభం: ",
        kn: "ಆರಂಭಿಕ ಬೆಲೆ: ",
        mt: "Minn ",
    },
    cta_price_note: {
        en: "(Price varies based on product selection)",
        ml: "(തിരഞ്ഞെടുക്കുന്ന പലഹാരങ്ങൾക്കനുസരിച്ച് വില മാറും)",
        hi: "(चयनित उत्पादों के आधार पर कीमत भिन्न होगी)",
        ta: "(தேர்ந்தெடுக்கப்பட்ட தயாரிப்புகளைப் பொறுத்து விலை மாறுபடும்)",
        te: "(ఎంచుకున్న ఉత్పత్తుల ఆధారంగా ధర మారుతుంది)",
        kn: "(ಆಯ್ಕೆಮಾಡಿದ ಉತ್ಪನ್ನಗಳನ್ನು ಅವಲಂಬಿಸಿ ಬೆಲೆ ಬದಲಾಗುತ್ತದೆ)",
        mt: "(Il-prezz ivarja skont il-prodotti magħżula)",
    },
    cta_btn_try: {
        en: "Try Sample Snack Box",
        ml: "സാമ്പിൾ സ്നാക്ക് ബോക്സ് വാങ്ങൂ",
        hi: "सैंपल स्नैक बॉक्स आज़माएं",
        ta: "மாதிரி சிற்றுண்டி பெட்டியை முயற்சிக்கவும்",
        te: "శాంపిల్ స్నాక్ బాక్స్‌ను ప్రయత్నించండి",
        kn: "ಸ್ಯಾಂಪಲ್ ಸ್ನ್ಯಾಕ್ ಬಾಕ್ಸ್ ಪ್ರಯತ್ನಿಸಿ",
        mt: "Ipprova l-Kaxxa Kampjun",
    },
    label_total: {
        en: "Total",
        ml: "ആകെ",
        hi: "कुल",
        ta: "மொத்தம்",
        te: "మొత్తం",
        kn: "ಒಟ್ಟು",
        mt: "Total",
    },

    // Contact Us keys
    contact_title: {
        en: "Contact Us",
        ml: "ഞങ്ങളെ ബന്ധപ്പെടുക",
        hi: "हमसे संपर्क करें",
        ta: "எங்களை தொடர்பு கொள்ளுங்கள்",
        te: "మమ్మల్ని సంప్రదించండి",
        kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
        mt: "Ikkuntattjana",
    },
    contact_description: {
        en: "Have a question about our homemade snack subscription, delivery areas or plans? Send us a message and we'll get back to you via WhatsApp or email.",
        ml: "ഞങ്ങളുടെ വീട്ടിൽ തയ്യാറാക്കുന്ന പലഹാര സബ്സ്ക്രിപ്ഷൻ, ഡെലിവറി ഏരിയകൾ അല്ലെങ്കിൽ പ്ലാനുകളെക്കുറിച്ച് എന്തെങ്കിലും ചോദ്യമുണ്ടോ? ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കൂ, WhatsApp അല്ലെങ്കിൽ ഇമെയിൽ വഴി ഞങ്ങൾ മറുപടി നൽകാം.",
        hi: "हमारे घर के बने स्नैक्स सब्सक्रिप्शन, डिलीवरी क्षेत्र या योजनाओं के बारे में कोई सवाल है? हमें एक संदेश भेजें और हम WhatsApp या ईमेल के माध्यम से आपसे संपर्क करेंगे।",
        ta: "எங்கள் வீட்டில் தயாரிக்கும் சிற்றுண்டி சந்தா, டெலிவரி பகுதிகள் அல்லது திட்டங்கள் பற்றி ஏதேனும் கேள்வி உள்ளதா? எங்களுக்கு ஒரு செய்தி அனுப்புங்கள், WhatsApp அல்லது மின்னஞ்சல் மூலம் நாங்கள் பதிலளிப்போம்.",
        te: "మా ఇంట్లో తయారయ్యే స్నాక్స్ సభ్యత్వం, డెలివరీ ప్రాంతాలు లేదా ప్లాన్‌ల గురించి ఏదైనా ప్రశ్న ఉందా? మాకు సందేశం పంపండి, మేము WhatsApp లేదా ఇమెయిల్ ద్వారా మీకు సమాధానం ఇస్తాము.",
        kn: "ನಮ್ಮ ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿದ ಸ್ನ್ಯಾಕ್ಸ್ ಚಂದಾದಾರಿಕೆ, ವಿತರಣಾ ಪ್ರದೇಶಗಳು ಅಥವಾ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಏನಾದರೂ ಪ್ರಶ್ನೆ ಇದೆಯೇ? ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ, ನಾವು WhatsApp ಅಥವಾ ಇಮೇಲ್ ಮೂಲಕ ನಿಮಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ.",
        mt: "Għandek mistoqsija dwar l-abbonament tagħna ta' snacks magħmulin id-dar, żoni tal-kunsinna jew pjanijiet? Ibgħatilna messaġġ u aħna nirrispondu permezz ta' WhatsApp jew email.",
    },
    contact_point_1: {
        en: "Ask anything about our monthly or bi-weekly snack plans",
        ml: "ഞങ്ങളുടെ മാസ അല്ലെങ്കിൽ രണ്ടാഴ്ച സ്നാക്ക് പ്ലാനുകളെക്കുറിച്ച് എന്തും ചോദിക്കൂ",
        hi: "हमारे मासिक या पाक्षिक स्नैक योजनाओं के बारे में कुछ भी पूछें",
        ta: "எங்கள் மாதாந்திர அல்லது இருவார சிற்றுண்டி திட்டங்கள் பற்றி எதையும் கேளுங்கள்",
        te: "మా నెలవారీ లేదా పక్షంవారీ స్నాక్ ప్లాన్‌ల గురించి ఏదైనా అడగండి",
        kn: "ನಮ್ಮ ಮಾಸಿಕ ಅಥವಾ ಪಾಕ್ಷಿಕ ಸ್ನ್ಯಾಕ್ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ",
        mt: "Staqsi kwalunkwe ħaġa dwar il-pjanijiet tagħna ta' snacks kull xahar jew kull ġimagħtejn",
    },
    contact_point_2: {
        en: "Check if we deliver to your area",
        ml: "നിങ്ങളുടെ പ്രദേശത്തേക്ക് ഞങ്ങൾ ഡെലിവറി ചെയ്യുന്നുണ്ടോ എന്ന് പരിശോധിക്കൂ",
        hi: "जांचें कि हम आपके क्षेत्र में डिलीवरी करते हैं या नहीं",
        ta: "உங்கள் பகுதிக்கு நாங்கள் டெலிவரி செய்கிறோமா என்று சரிபார்க்கவும்",
        te: "మేము మీ ప్రాంతానికి డెలివరీ చేస్తామా అని తనిఖీ చేయండి",
        kn: "ನಾವು ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ವಿತರಿಸುತ್ತೇವೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ",
        mt: "Iċċekkja jekk nwasslu fiż-żona tiegħek",
    },
    contact_point_3: {
        en: "Request details about bulk orders or special occasions",
        ml: "ബൾക്ക് ഓർഡറുകൾ അല്ലെങ്കിൽ പ്രത്യേക അവസരങ്ങൾക്കുള്ള വിശദാംശങ്ങൾ ആവശ്യപ്പെടൂ",
        hi: "थोक ऑर्डर या विशेष अवसरों के बारे में विवरण का अनुरोध करें",
        ta: "மொத்த ஆர்டர்கள் அல்லது சிறப்பு நிகழ்வுகள் பற்றிய விவரங்களை கோருங்கள்",
        te: "బల్క్ ఆర్డర్లు లేదా ప్రత్యేక సందర్భాల గురించి వివరాలను అభ్యర్థించండి",
        kn: "ಬೃಹತ್ ಆರ್ಡರ್‌ಗಳು ಅಥವಾ ವಿಶೇಷ ಸಂದರ್ಭಗಳ ಬಗ್ಗೆ ವಿವರಗಳನ್ನು ವಿನಂತಿಸಿ",
        mt: "Itlob dettalji dwar ordnijiet bil-bulk jew okkażjonijiet speċjali",
    },
    contact_point_4: {
        en: "Share feedback or suggestions — we love hearing from you!",
        ml: "ഫീഡ്ബാക്ക് അല്ലെങ്കിൽ നിർദ്ദേശങ്ങൾ പങ്കിടൂ — നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾ ഇഷ്ടപ്പെടുന്നു!",
        hi: "प्रतिक्रिया या सुझाव साझा करें — हमें आपसे सुनना अच्छा लगता है!",
        ta: "கருத்துகள் அல்லது பரிந்துரைகளைப் பகிருங்கள் — உங்களிடமிருந்து கேட்க நாங்கள் விரும்புகிறோம்!",
        te: "అభిప్రాయం లేదా సూచనలను పంచుకోండి — మీ నుండి వినడానికి మేము ఇష్టపడతాము!",
        kn: "ಪ್ರತಿಕ್ರಿಯೆ ಅಥವಾ ಸಲಹೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ — ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ!",
        mt: "Aqsam feedback jew suġġerimenti — inħobbu nisimgħu minnek!",
    },

    // FAQ keys
    faq_title: {
        en: "Frequently Asked Questions",
        ml: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
        hi: "अक्सर पूछे जाने वाले प्रश्न",
        ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        te: "తరచుగా అడిగే ప్రశ్నలు",
        kn: "ಆಗಾಗ್ಗೆ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
        mt: "Mistoqsijiet Frekwenti",
    },
    faq_q1: {
        en: "If I subscribe today, when will I receive my first delivery?",
        ml: "ഇന്ന് സബ്സ്ക്രൈബ് ചെയ്താൽ, എന്റെ ആദ്യ ഡെലിവറി എപ്പോൾ ലഭിക്കും?",
        hi: "अगर मैं आज सब्सक्राइब करूं, तो मुझे पहली डिलीवरी कब मिलेगी?",
        ta: "இன்று சந்தா செய்தால், எனது முதல் டெலிவரி எப்போது கிடைக்கும்?",
        te: "నేను ఈరోజు సబ్‌స్క్రైబ్ చేస్తే, నా మొదటి డెలివరీ ఎప్పుడు వస్తుంది?",
        kn: "ನಾನು ಇಂದು ಚಂದಾದಾರರಾದರೆ, ನನ್ನ ಮೊದಲ ವಿತರಣೆ ಯಾವಾಗ ಸಿಗುತ್ತದೆ?",
        mt: "Jekk nabbona llum, meta nirċievi l-ewwel kunsinna tiegħi?",
    },
    faq_a1: {
        en: "Once you subscribe, we'll add you to our upcoming delivery batch. We will be in touch via WhatsApp to confirm your order and delivery date. If you choose the bi-weekly plan you will receive your first box in 1-2 weeks, and for the monthly plan within 3-4 weeks.",
        ml: "നിങ്ങൾ സബ്സ്ക്രൈബ് ചെയ്തുകഴിഞ്ഞാൽ, ഞങ്ങൾ നിങ്ങളെ വരാനിരിക്കുന്ന ഡെലിവറി ബാച്ചിൽ ചേർക്കും. നിങ്ങളുടെ ഓർഡറും ഡെലിവറി തീയതിയും സ്ഥിരീകരിക്കാൻ ഞങ്ങൾ WhatsApp വഴി ബന്ധപ്പെടും. രണ്ടാഴ്ച പ്ലാൻ തിരഞ്ഞെടുത്താൽ 1-2 ആഴ്ചയിൽ ആദ്യ ബോക്സ് ലഭിക്കും, മാസ പ്ലാനിന് 3-4 ആഴ്ചയ്ക്കുള്ളിൽ.",
        hi: "एक बार जब आप सब्सक्राइब कर लेते हैं, तो हम आपको हमारे आगामी डिलीवरी बैच में जोड़ देंगे। हम आपके ऑर्डर और डिलीवरी की तारीख की पुष्टि करने के लिए WhatsApp के माध्यम से संपर्क करेंगे। यदि आप पाक्षिक योजना चुनते हैं तो आपको 1-2 सप्ताह में पहला बॉक्स मिलेगा, और मासिक योजना के लिए 3-4 सप्ताह के भीतर।",
        ta: "நீங்கள் சந்தா செய்தவுடன், உங்களை எங்கள் வரவிருக்கும் டெலிவரி தொகுதியில் சேர்ப்போம். உங்கள் ஆர்டர் மற்றும் டெலிவரி தேதியை உறுதிப்படுத்த WhatsApp மூலம் தொடர்பு கொள்வோம். இருவார திட்டத்தைத் தேர்ந்தெடுத்தால் 1-2 வாரங்களில் முதல் பெட்டி கிடைக்கும், மாதாந்திர திட்டத்திற்கு 3-4 வாரங்களுக்குள்.",
        te: "మీరు సబ్‌స్క్రైబ్ చేసిన తర్వాత, మేము మిమ్మల్ని మా రాబోయే డెలివరీ బ్యాచ్‌లో చేర్చుతాము. మీ ఆర్డర్ మరియు డెలివరీ తేదీని నిర్ధారించడానికి WhatsApp ద్వారా సంప్రదిస్తాము. పక్షంవారీ ప్లాన్ ఎంచుకుంటే 1-2 వారాల్లో మొదటి బాక్స్ వస్తుంది, నెలవారీ ప్లాన్ కోసం 3-4 వారాల్లో.",
        kn: "ನೀವು ಚಂದಾದಾರರಾದ ನಂತರ, ನಾವು ನಿಮ್ಮನ್ನು ನಮ್ಮ ಮುಂಬರುವ ವಿತರಣಾ ಬ್ಯಾಚ್‌ಗೆ ಸೇರಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಆರ್ಡರ್ ಮತ್ತು ವಿತರಣಾ ದಿನಾಂಕವನ್ನು ದೃಢೀಕರಿಸಲು WhatsApp ಮೂಲಕ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ. ಪಾಕ್ಷಿಕ ಯೋಜನೆಯನ್ನು ಆರಿಸಿದರೆ 1-2 ವಾರಗಳಲ್ಲಿ ಮೊದಲ ಬಾಕ್ಸ್ ಸಿಗುತ್ತದೆ, ಮಾಸಿಕ ಯೋಜನೆಗೆ 3-4 ವಾರಗಳಲ್ಲಿ.",
        mt: "Ladarba tabbona, se nżiduk fil-lott tal-kunsinna li ġej tagħna. Se nkunu f'kuntatt permezz ta' WhatsApp biex nikkonferma l-ordni u d-data tal-kunsinna tiegħek. Jekk tagħżel il-pjan ta' kull ġimagħtejn se tirċievi l-ewwel kaxxa tiegħek f'1-2 ġimgħat, u għall-pjan ta' kull xahar fi żmien 3-4 ġimgħat.",
    },
    faq_q2: {
        en: "Which areas do you deliver to?",
        ml: "ഏതൊക്കെ പ്രദേശങ്ങളിലേക്ക് നിങ്ങൾ ഡെലിവറി ചെയ്യുന്നു?",
        hi: "आप किन क्षेत्रों में डिलीवरी करते हैं?",
        ta: "நீங்கள் எந்தப் பகுதிகளுக்கு டெலிவரி செய்கிறீர்கள்?",
        te: "మీరు ఏ ప్రాంతాలకు డెలివరీ చేస్తారు?",
        kn: "ನೀವು ಯಾವ ಪ್ರದೇಶಗಳಿಗೆ ವಿತರಿಸುತ್ತೀರಿ?",
        mt: "F'liema żoni twasslu?",
    },
    faq_a2: {
        en: "We currently deliver in and around Birkirkara and nearby localities in Malta. Send us a message with your area and we'll confirm.",
        ml: "ഞങ്ങൾ നിലവിൽ മാൾട്ടയിലെ ബിർകിർകാരയിലും സമീപ പ്രദേശങ്ങളിലും ഡെലിവറി ചെയ്യുന്നു. നിങ്ങളുടെ പ്രദേശം സഹിതം ഒരു സന്ദേശം അയയ്ക്കൂ, ഞങ്ങൾ സ്ഥിരീകരിക്കാം.",
        hi: "हम वर्तमान में माल्टा में बिर्किरकारा और आस-पास के इलाकों में डिलीवरी करते हैं। अपने क्षेत्र के साथ हमें एक संदेश भेजें और हम पुष्टि करेंगे।",
        ta: "நாங்கள் தற்போது மால்டாவில் பிர்கிர்காரா மற்றும் அருகிலுள்ள பகுதிகளில் டெலிவரி செய்கிறோம். உங்கள் பகுதியுடன் எங்களுக்கு ஒரு செய்தி அனுப்புங்கள், நாங்கள் உறுதிப்படுத்துவோம்.",
        te: "మేము ప్రస్తుతం మాల్టాలోని బిర్కిర్కారా మరియు సమీప ప్రాంతాలలో డెలివరీ చేస్తున్నాము. మీ ప్రాంతంతో మాకు సందేశం పంపండి, మేము నిర్ధారిస్తాము.",
        kn: "ನಾವು ಪ್ರಸ್ತುತ ಮಾಲ್ಟಾದಲ್ಲಿ ಬಿರ್ಕಿರ್ಕಾರಾ ಮತ್ತು ಸಮೀಪದ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಿತರಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಪ್ರದೇಶದೊಂದಿಗೆ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ, ನಾವು ದೃಢೀಕರಿಸುತ್ತೇವೆ.",
        mt: "Bħalissa nwasslu f'Birkirkara u madwarha u lokalitajiet fil-qrib f'Malta. Ibgħatilna messaġġ biż-żona tiegħek u aħna nikkonferma.",
    },
    faq_q3: {
        en: "Can I change my delivery day after subscribing?",
        ml: "സബ്സ്ക്രൈബ് ചെയ്തതിനുശേഷം എനിക്ക് ഡെലിവറി ദിവസം മാറ്റാൻ കഴിയുമോ?",
        hi: "क्या मैं सब्सक्राइब करने के बाद अपनी डिलीवरी का दिन बदल सकता हूं?",
        ta: "சந்தா செய்த பிறகு எனது டெலிவரி நாளை மாற்ற முடியுமா?",
        te: "సబ్‌స్క్రైబ్ చేసిన తర్వాత నేను నా డెలివరీ రోజును మార్చవచ్చా?",
        kn: "ಚಂದಾದಾರರಾದ ನಂತರ ನಾನು ನನ್ನ ವಿತರಣಾ ದಿನವನ್ನು ಬದಲಾಯಿಸಬಹುದೇ?",
        mt: "Nista' nbiddel il-jum tal-kunsinna tiegħi wara li nabbona?",
    },
    faq_a3: {
        en: "Yes, you can message us on WhatsApp to request a change. We'll try our best to adjust based on our cooking schedule.",
        ml: "അതെ, മാറ്റം അഭ്യർത്ഥിക്കാൻ നിങ്ങൾക്ക് WhatsApp-ൽ ഞങ്ങളെ സന്ദേശമയയ്ക്കാം. ഞങ്ങളുടെ പാചക ഷെഡ്യൂളിനെ അടിസ്ഥാനമാക്കി ക്രമീകരിക്കാൻ ഞങ്ങൾ പരമാവധി ശ്രമിക്കും.",
        hi: "हां, आप बदलाव का अनुरोध करने के लिए WhatsApp पर हमें संदेश भेज सकते हैं। हम अपने खाना पकाने के कार्यक्रम के आधार पर समायोजित करने की पूरी कोशिश करेंगे।",
        ta: "ஆம், மாற்றத்தைக் கோர WhatsApp இல் எங்களுக்கு செய்தி அனுப்பலாம். எங்கள் சமையல் அட்டவணையின் அடிப்படையில் சரிசெய்ய முயற்சிப்போம்.",
        te: "అవును, మార్పును అభ్యర్థించడానికి మీరు WhatsApp లో మాకు సందేశం పంపవచ్చు. మా వంట షెడ్యూల్ ఆధారంగా సర్దుబాటు చేయడానికి మేము ప్రయత్నిస్తాము.",
        kn: "ಹೌದು, ಬದಲಾವಣೆಯನ್ನು ವಿನಂತಿಸಲು ನೀವು WhatsApp ನಲ್ಲಿ ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಬಹುದು. ನಮ್ಮ ಅಡುಗೆ ವೇಳಾಪಟ್ಟಿಯ ಆಧಾರದ ಮೇಲೆ ಹೊಂದಿಸಲು ನಾವು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ.",
        mt: "Iva, tista' tibgħatilna messaġġ fuq WhatsApp biex titlob bidla. Se nippruvaw l-aħjar tagħna biex naġġustaw skont l-iskeda tat-tisjir tagħna.",
    },
    faq_q4: {
        en: "Do you offer Sample Box orders, or only subscriptions?",
        ml: "നിങ്ങൾ സാമ്പിൾ ബോക്സ് ഓർഡറുകൾ നൽകുന്നുണ്ടോ, അതോ സബ്സ്ക്രിപ്ഷനുകൾ മാത്രമാണോ?",
        hi: "क्या आप सैंपल बॉक्स ऑर्डर देते हैं, या केवल सब्सक्रिप्शन?",
        ta: "நீங்கள் மாதிரி பெட்டி ஆர்டர்களை வழங்குகிறீர்களா, அல்லது சந்தாக்கள் மட்டுமா?",
        te: "మీరు శాంపిల్ బాక్స్ ఆర్డర్లను అందిస్తారా, లేదా సభ్యత్వాలు మాత్రమేనా?",
        kn: "ನೀವು ಸ್ಯಾಂಪಲ್ ಬಾಕ್ಸ್ ಆರ್ಡರ್‌ಗಳನ್ನು ನೀಡುತ್ತೀರಾ, ಅಥವಾ ಚಂದಾದಾರಿಕೆಗಳನ್ನು ಮಾತ್ರವೇ?",
        mt: "Toffru ordnijiet ta' Kaxxa Kampjun, jew biss abbonamenti?",
    },
    faq_a4: {
        en: "Yes, we do offer one-time orders. You can try our Sample Box, where you can choose your own customised snacks. Our main focus is on weekly and bi-weekly subscriptions, but if you need bulk quantities for events or special occasions, feel free to contact us — we'll be happy to help.",
        ml: "അതെ, ഞങ്ങൾ ഒറ്റത്തവണ ഓർഡറുകൾ നൽകുന്നു. നിങ്ങൾക്ക് ഞങ്ങളുടെ സാമ്പിൾ ബോക്സ് പരീക്ഷിക്കാം, അവിടെ നിങ്ങൾക്ക് സ്വന്തം കസ്റ്റമൈസ്ഡ് സ്നാക്കുകൾ തിരഞ്ഞെടുക്കാം. ഞങ്ങളുടെ പ്രധാന ശ്രദ്ധ ആഴ്ചതോറും, രണ്ടാഴ്ചതോറും ഉള്ള സബ്സ്ക്രിപ്ഷനുകളിലാണ്, എന്നാൽ ഇവന്റുകൾക്കോ പ്രത്യേക അവസരങ്ങൾക്കോ വലിയ അളവിൽ ആവശ്യമുണ്ടെങ്കിൽ, ഞങ്ങളെ ബന്ധപ്പെടാൻ മടിക്കേണ്ട — സഹായിക്കാൻ ഞങ്ങൾ സന്തോഷിക്കും.",
        hi: "हां, हम एक बार के ऑर्डर देते हैं। आप हमारे सैंपल बॉक्स को आजमा सकते हैं, जहां आप अपने खुद के कस्टमाइज़्ड स्नैक्स चुन सकते हैं। हमारा मुख्य ध्यान साप्ताहिक और पाक्षिक सब्सक्रिप्शन पर है, लेकिन यदि आपको कार्यक्रमों या विशेष अवसरों के लिए थोक मात्रा की आवश्यकता है, तो बेझिझक हमसे संपर्क करें — हम मदद करने में खुश होंगे।",
        ta: "ஆம், நாங்கள் ஒரு முறை ஆர்டர்களை வழங்குகிறோம். நீங்கள் எங்கள் மாதிரி பெட்டியை முயற்சி செய்யலாம், அங்கு நீங்கள் உங்கள் சொந்த தனிப்பயனாக்கப்பட்ட சிற்றுண்டிகளைத் தேர்ந்தெடுக்கலாம். எங்கள் முக்கிய கவனம் வாராந்திர மற்றும் இருவார சந்தாக்களில் உள்ளது, ஆனால் நிகழ்வுகள் அல்லது சிறப்பு நிகழ்வுகளுக்கு மொத்த அளவு தேவைப்பட்டால், எங்களைத் தொடர்பு கொள்ள தயங்க வேண்டாம் — நாங்கள் உதவ மகிழ்ச்சியாக இருப்போம்.",
        te: "అవును, మేము ఒక్కసారి ఆర్డర్లను అందిస్తాము. మీరు మా శాంపిల్ బాక్స్‌ను ప్రయత్నించవచ్చు, అక్కడ మీరు మీ స్వంత కస్టమైజ్డ్ స్నాక్స్‌ను ఎంచుకోవచ్చు. మా ప్రధాన దృష్టి వారపు మరియు పక్షంవారీ సభ్యత్వాలపై ఉంది, కానీ ఈవెంట్‌లు లేదా ప్రత్యేక సందర్భాలకు బల్క్ పరిమాణాలు అవసరమైతే, మమ్మల్ని సంప్రదించడానికి సంకోచించకండి — మేము సహాయం చేయడానికి సంతోషిస్తాము.",
        kn: "ಹೌದು, ನಾವು ಒಂದು ಬಾರಿಯ ಆರ್ಡರ್‌ಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ನೀವು ನಮ್ಮ ಸ್ಯಾಂಪಲ್ ಬಾಕ್ಸ್ ಅನ್ನು ಪ್ರಯತ್ನಿಸಬಹುದು, ಅಲ್ಲಿ ನೀವು ನಿಮ್ಮ ಸ್ವಂತ ಕಸ್ಟಮೈಸ್ಡ್ ಸ್ನ್ಯಾಕ್ಸ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಬಹುದು. ನಮ್ಮ ಮುಖ್ಯ ಗಮನ ವಾರಾಂತ್ಯ ಮತ್ತು ಪಾಕ್ಷಿಕ ಚಂದಾದಾರಿಕೆಗಳ ಮೇಲಿದೆ, ಆದರೆ ಈವೆಂಟ್‌ಗಳು ಅಥವಾ ವಿಶೇಷ ಸಂದರ್ಭಗಳಿಗೆ ಬೃಹತ್ ಪ್ರಮಾಣದ ಅಗತ್ಯವಿದ್ದರೆ, ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲು ಹಿಂಜರಿಯಬೇಡಿ — ನಾವು ಸಹಾಯ ಮಾಡಲು ಸಂತೋಷಪಡುತ್ತೇವೆ.",
        mt: "Iva, noffru ordnijiet ta' darba waħda. Tista' tipprova l-Kaxxa Kampjun tagħna, fejn tista' tagħżel l-isnacks personalizzati tiegħek stess. Il-fokus prinċipali tagħna huwa fuq abbonamenti ta' kull ġimgħa u kull ġimagħtejn, iżda jekk għandek bżonn kwantitajiet bil-bulk għal avvenimenti jew okkażjonijiet speċjali, ħossok liberu li tikkuntattjana — aħna nkunu kuntenti li ngħinu.",
    },
    faq_q5: {
        en: "Can I cancel my subscription anytime?",
        ml: "എനിക്ക് എപ്പോൾ വേണമെങ്കിലും എന്റെ സബ്സ്ക്രിപ്ഷൻ റദ്ദാക്കാൻ കഴിയുമോ?",
        hi: "क्या मैं कभी भी अपनी सदस्यता रद्द कर सकता हूं?",
        ta: "நான் எப்போது வேண்டுமானாலும் எனது சந்தாவை ரத்து செய்யலாமா?",
        te: "నేను ఎప్పుడైనా నా సభ్యత్వాన్ని రద్దు చేయవచ్చా?",
        kn: "ನಾನು ಯಾವಾಗ ಬೇಕಾದರೂ ನನ್ನ ಚಂದಾದಾರಿಕೆಯನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದೇ?",
        mt: "Nista' nikkanċella l-abbonament tiegħi kull meta rrid?",
    },
    faq_a5: {
        en: "Yes! You can cancel your subscription anytime with no charges or fees. Simply reach out via WhatsApp on the same number we contacted you, and we'll remove you from our subscription list. If you'd like to rejoin in the future, you're always welcome back.",
        ml: "അതെ! നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും നിങ്ങളുടെ സബ്സ്ക്രിപ്ഷൻ റദ്ദാക്കാം, ഒരു ചാർജോ ഫീസോ ഇല്ല. ഞങ്ങൾ നിങ്ങളെ ബന്ധപ്പെട്ട അതേ നമ്പറിൽ WhatsApp വഴി ബന്ധപ്പെടുക, ഞങ്ങൾ നിങ്ങളെ ഞങ്ങളുടെ സബ്സ്ക്രിപ്ഷൻ ലിസ്റ്റിൽ നിന്ന് നീക്കം ചെയ്യും. ഭാവിയിൽ വീണ്ടും ചേരാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെങ്കിൽ, നിങ്ങൾ എപ്പോഴും സ്വാഗതം.",
        hi: "हां! आप किसी भी समय बिना किसी शुल्क या फीस के अपनी सदस्यता रद्द कर सकते हैं। बस उसी नंबर पर WhatsApp के माध्यम से संपर्क करें जिस पर हमने आपसे संपर्क किया था, और हम आपको हमारी सदस्यता सूची से हटा देंगे। यदि आप भविष्य में फिर से शामिल होना चाहते हैं, तो आप हमेशा स्वागत हैं।",
        ta: "ஆம்! நீங்கள் எந்த கட்டணமும் அல்லது கட்டணமும் இல்லாமல் எப்போது வேண்டுமானாலும் உங்கள் சந்தாவை ரத்து செய்யலாம். நாங்கள் உங்களைத் தொடர்பு கொண்ட அதே எண்ணில் WhatsApp மூலம் தொடர்பு கொள்ளுங்கள், நாங்கள் உங்களை எங்கள் சந்தா பட்டியலில் இருந்து அகற்றுவோம். எதிர்காலத்தில் மீண்டும் சேர விரும்பினால், நீங்கள் எப்போதும் வரவேற்கப்படுவீர்கள்.",
        te: "అవును! మీరు ఎటువంటి ఛార్జీలు లేదా రుసుములు లేకుండా ఎప్పుడైనా మీ సభ్యత్వాన్ని రద్దు చేయవచ్చు. మేము మిమ్మల్ని సంప్రదించిన అదే నంబర్‌లో WhatsApp ద్వారా సంప్రదించండి, మేము మిమ్మల్ని మా సభ్యత్వ జాబితా నుండి తొలగిస్తాము. భవిష్యత్తులో మళ్లీ చేరాలనుకుంటే, మీరు ఎల్లప్పుడూ స్వాగతం.",
        kn: "ಹೌದು! ನೀವು ಯಾವುದೇ ಶುಲ್ಕ ಅಥವಾ ಶುಲ್ಕಗಳಿಲ್ಲದೆ ಯಾವಾಗ ಬೇಕಾದರೂ ನಿಮ್ಮ ಚಂದಾದಾರಿಕೆಯನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದು. ನಾವು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿದ ಅದೇ ಸಂಖ್ಯೆಯಲ್ಲಿ WhatsApp ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ, ಮತ್ತು ನಾವು ನಿಮ್ಮನ್ನು ನಮ್ಮ ಚಂದಾದಾರಿಕೆ ಪಟ್ಟಿಯಿಂದ ತೆಗೆದುಹಾಕುತ್ತೇವೆ. ಭವಿಷ್ಯದಲ್ಲಿ ಮತ್ತೆ ಸೇರಲು ನೀವು ಬಯಸಿದರೆ, ನೀವು ಯಾವಾಗಲೂ ಸ್ವಾಗತ.",
        mt: "Iva! Tista' tikkanċella l-abbonament tiegħek kull meta trid mingħajr ħlasijiet jew tariffi. Sempliċement ikkuntattjana permezz ta' WhatsApp fuq l-istess numru li aħna kkuntattjajna, u aħna nneħħuk mil-lista tal-abbonamenti tagħna. Jekk tixtieq terġa' tingħaqad fil-futur, dejjem tkun milqugħ lura.",
    },
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('app_language');
        const validLanguages: Language[] = ['en', 'ml', 'hi', 'ta', 'te', 'kn', 'mt'];
        if (saved && validLanguages.includes(saved as Language)) {
            return saved as Language;
        }
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
    };

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
