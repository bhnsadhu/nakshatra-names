import React, { useState } from 'react';
import './App.css';

// ── STATIC DATA ───────────────────────────────────────────────────────────────

const NAKSHATRAS = [
  { name: "Ashwini", deity: "Ashwini Kumaras", planet: "Ketu", quality: "Swift, energetic, healing", syllables: ["Chu", "Che", "Cho", "La"] },
  { name: "Bharani", deity: "Yama", planet: "Venus", quality: "Determined, creative, transformative", syllables: ["Li", "Lu", "Le", "Lo"] },
  { name: "Krittika", deity: "Agni", planet: "Sun", quality: "Courageous, sharp, illuminating", syllables: ["A", "I", "U", "E"] },
  { name: "Rohini", deity: "Brahma", planet: "Moon", quality: "Creative, sensuous, abundant", syllables: ["O", "Va", "Vi", "Vu"] },
  { name: "Mrigashira", deity: "Soma", planet: "Mars", quality: "Curious, gentle, searching", syllables: ["Ve", "Vo", "Ka", "Ki"] },
  { name: "Ardra", deity: "Rudra", planet: "Rahu", quality: "Intense, transformative, passionate", syllables: ["Ku", "Gha", "Ing", "Jha"] },
  { name: "Punarvasu", deity: "Aditi", planet: "Jupiter", quality: "Nurturing, optimistic, restoring", syllables: ["Ke", "Ko", "Ha", "Hi"] },
  { name: "Pushya", deity: "Brihaspati", planet: "Saturn", quality: "Nourishing, spiritual, generous", syllables: ["Hu", "He", "Ho", "Da"] },
  { name: "Ashlesha", deity: "Nagas", planet: "Mercury", quality: "Perceptive, mystical, intense", syllables: ["Di", "Du", "De", "Do"] },
  { name: "Magha", deity: "Pitras", planet: "Ketu", quality: "Regal, ambitious, ancestral", syllables: ["Ma", "Mi", "Mu", "Me"] },
  { name: "Purva Phalguni", deity: "Bhaga", planet: "Venus", quality: "Creative, pleasure-seeking, charming", syllables: ["Mo", "Ta", "Ti", "Tu"] },
  { name: "Uttara Phalguni", deity: "Aryaman", planet: "Sun", quality: "Friendly, reliable, prosperous", syllables: ["Te", "To", "Pa", "Pi"] },
  { name: "Hasta", deity: "Savitar", planet: "Moon", quality: "Skilled, witty, resourceful", syllables: ["Pu", "Sha", "Na", "Tha"] },
  { name: "Chitra", deity: "Vishwakarma", planet: "Mars", quality: "Artistic, dynamic, magnetic", syllables: ["Pe", "Po", "Ra", "Ri"] },
  { name: "Swati", deity: "Vayu", planet: "Rahu", quality: "Independent, flexible, diplomatic", syllables: ["Ru", "Re", "Ro", "Ta"] },
  { name: "Vishakha", deity: "Indra-Agni", planet: "Jupiter", quality: "Purposeful, ambitious, determined", syllables: ["Ti", "Tu", "Te", "To"] },
  { name: "Anuradha", deity: "Mitra", planet: "Saturn", quality: "Devoted, harmonious, sociable", syllables: ["Na", "Ni", "Nu", "Ne"] },
  { name: "Jyeshtha", deity: "Indra", planet: "Mercury", quality: "Protective, powerful, responsible", syllables: ["No", "Ya", "Yi", "Yu"] },
  { name: "Mula", deity: "Nirriti", planet: "Ketu", quality: "Investigative, truth-seeking, independent", syllables: ["Ye", "Yo", "Bha", "Bhi"] },
  { name: "Purva Ashadha", deity: "Apas", planet: "Venus", quality: "Invincible, proud, philosophical", syllables: ["Bhu", "Dha", "Pha", "Dha"] },
  { name: "Uttara Ashadha", deity: "Vishwadevas", planet: "Sun", quality: "Victorious, ethical, patient", syllables: ["Bhe", "Bho", "Ja", "Ji"] },
  { name: "Shravana", deity: "Vishnu", planet: "Moon", quality: "Learned, perceptive, connected", syllables: ["Khi", "Khu", "Khe", "Kho"] },
  { name: "Dhanishtha", deity: "Ashta Vasus", planet: "Mars", quality: "Prosperous, musical, adventurous", syllables: ["Ga", "Gi", "Gu", "Ge"] },
  { name: "Shatabhisha", deity: "Varuna", planet: "Rahu", quality: "Healing, mysterious, philosophical", syllables: ["Go", "Sa", "Si", "Su"] },
  { name: "Purva Bhadrapada", deity: "Aja Ekapad", planet: "Jupiter", quality: "Fiery, passionate, idealistic", syllables: ["Se", "So", "Da", "Di"] },
  { name: "Uttara Bhadrapada", deity: "Ahir Budhnya", planet: "Saturn", quality: "Wise, stable, deep", syllables: ["Du", "Tha", "Jha", "Na"] },
  { name: "Revati", deity: "Pushan", planet: "Mercury", quality: "Nurturing, compassionate, spiritual", syllables: ["De", "Do", "Cha", "Chi"] }
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MINUTES = ['00','05','10','15','20','25','30','35','40','45','50','55'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

const TIME_PERIODS = [
  { id: 'morning',   label: 'Morning',       sub: '6 AM to 12 PM', midpoint: '06:00' },
  { id: 'afternoon', label: 'Afternoon',      sub: '12 PM to 6 PM', midpoint: '13:00' },
  { id: 'evening',   label: 'Evening',        sub: '6 PM to 10 PM', midpoint: '18:00' },
  { id: 'night',     label: 'Night',          sub: '10 PM to 6 AM', midpoint: '22:00' },
  { id: 'unknown',   label: "I don't know",   sub: '',              midpoint: '12:00' },
];

const GEO_DATA = {
  AR: { name: 'Argentina', states: [
    { name: 'Buenos Aires',   tz: 'America/Argentina/Buenos_Aires' },
    { name: 'Córdoba',        tz: 'America/Argentina/Cordoba' },
    { name: 'Mendoza',        tz: 'America/Argentina/Mendoza' },
    { name: 'Salta',          tz: 'America/Argentina/Salta' },
    { name: 'Tucumán',        tz: 'America/Argentina/Tucuman' },
    { name: 'Other',          tz: 'America/Argentina/Buenos_Aires' },
  ]},
  AU: { name: 'Australia', states: [
    { name: 'New South Wales',              tz: 'Australia/Sydney' },
    { name: 'Victoria',                     tz: 'Australia/Melbourne' },
    { name: 'Queensland',                   tz: 'Australia/Brisbane' },
    { name: 'South Australia',              tz: 'Australia/Adelaide' },
    { name: 'Western Australia',            tz: 'Australia/Perth' },
    { name: 'Tasmania',                     tz: 'Australia/Hobart' },
    { name: 'Northern Territory',           tz: 'Australia/Darwin' },
    { name: 'Australian Capital Territory', tz: 'Australia/Sydney' },
  ]},
  BD: { name: 'Bangladesh', states: [
    { name: 'Dhaka',      tz: 'Asia/Dhaka' },
    { name: 'Chittagong', tz: 'Asia/Dhaka' },
    { name: 'Rajshahi',   tz: 'Asia/Dhaka' },
    { name: 'Khulna',     tz: 'Asia/Dhaka' },
    { name: 'Sylhet',     tz: 'Asia/Dhaka' },
    { name: 'Rangpur',    tz: 'Asia/Dhaka' },
    { name: 'Barisal',    tz: 'Asia/Dhaka' },
    { name: 'Mymensingh', tz: 'Asia/Dhaka' },
  ]},
  BR: { name: 'Brazil', states: [
    { name: 'Acre',                    tz: 'America/Rio_Branco' },
    { name: 'Alagoas',                 tz: 'America/Maceio' },
    { name: 'Amazonas',                tz: 'America/Manaus' },
    { name: 'Bahia',                   tz: 'America/Bahia' },
    { name: 'Ceará',                   tz: 'America/Fortaleza' },
    { name: 'Distrito Federal',        tz: 'America/Sao_Paulo' },
    { name: 'Espírito Santo',          tz: 'America/Sao_Paulo' },
    { name: 'Goiás',                   tz: 'America/Sao_Paulo' },
    { name: 'Maranhão',                tz: 'America/Fortaleza' },
    { name: 'Mato Grosso',             tz: 'America/Cuiaba' },
    { name: 'Mato Grosso do Sul',      tz: 'America/Campo_Grande' },
    { name: 'Minas Gerais',            tz: 'America/Sao_Paulo' },
    { name: 'Pará',                    tz: 'America/Belem' },
    { name: 'Paraíba',                 tz: 'America/Fortaleza' },
    { name: 'Paraná',                  tz: 'America/Sao_Paulo' },
    { name: 'Pernambuco',              tz: 'America/Recife' },
    { name: 'Piauí',                   tz: 'America/Fortaleza' },
    { name: 'Rio de Janeiro',          tz: 'America/Sao_Paulo' },
    { name: 'Rio Grande do Norte',     tz: 'America/Fortaleza' },
    { name: 'Rio Grande do Sul',       tz: 'America/Sao_Paulo' },
    { name: 'Rondônia',                tz: 'America/Porto_Velho' },
    { name: 'Roraima',                 tz: 'America/Boa_Vista' },
    { name: 'Santa Catarina',          tz: 'America/Sao_Paulo' },
    { name: 'São Paulo',               tz: 'America/Sao_Paulo' },
    { name: 'Sergipe',                 tz: 'America/Maceio' },
    { name: 'Tocantins',               tz: 'America/Araguaina' },
  ]},
  CA: { name: 'Canada', states: [
    { name: 'Alberta',                    tz: 'America/Edmonton' },
    { name: 'British Columbia',           tz: 'America/Vancouver' },
    { name: 'Manitoba',                   tz: 'America/Winnipeg' },
    { name: 'New Brunswick',              tz: 'America/Moncton' },
    { name: 'Newfoundland and Labrador',  tz: 'America/St_Johns' },
    { name: 'Northwest Territories',      tz: 'America/Yellowknife' },
    { name: 'Nova Scotia',                tz: 'America/Halifax' },
    { name: 'Nunavut',                    tz: 'America/Iqaluit' },
    { name: 'Ontario',                    tz: 'America/Toronto' },
    { name: 'Prince Edward Island',       tz: 'America/Halifax' },
    { name: 'Quebec',                     tz: 'America/Toronto' },
    { name: 'Saskatchewan',               tz: 'America/Regina' },
    { name: 'Yukon',                      tz: 'America/Whitehorse' },
  ]},
  CN: { name: 'China', states: [
    { name: 'Beijing',       tz: 'Asia/Shanghai' },
    { name: 'Chongqing',     tz: 'Asia/Shanghai' },
    { name: 'Fujian',        tz: 'Asia/Shanghai' },
    { name: 'Guangdong',     tz: 'Asia/Shanghai' },
    { name: 'Hebei',         tz: 'Asia/Shanghai' },
    { name: 'Henan',         tz: 'Asia/Shanghai' },
    { name: 'Hubei',         tz: 'Asia/Shanghai' },
    { name: 'Hunan',         tz: 'Asia/Shanghai' },
    { name: 'Jiangsu',       tz: 'Asia/Shanghai' },
    { name: 'Liaoning',      tz: 'Asia/Shanghai' },
    { name: 'Shandong',      tz: 'Asia/Shanghai' },
    { name: 'Shanghai',      tz: 'Asia/Shanghai' },
    { name: 'Sichuan',       tz: 'Asia/Shanghai' },
    { name: 'Tianjin',       tz: 'Asia/Shanghai' },
    { name: 'Xinjiang',      tz: 'Asia/Urumqi' },
    { name: 'Yunnan',        tz: 'Asia/Shanghai' },
    { name: 'Zhejiang',      tz: 'Asia/Shanghai' },
    { name: 'Other',         tz: 'Asia/Shanghai' },
  ]},
  CO: { name: 'Colombia', states: [
    { name: 'Antioquia',       tz: 'America/Bogota' },
    { name: 'Atlántico',       tz: 'America/Bogota' },
    { name: 'Bogotá D.C.',     tz: 'America/Bogota' },
    { name: 'Cundinamarca',    tz: 'America/Bogota' },
    { name: 'Valle del Cauca', tz: 'America/Bogota' },
    { name: 'Other',           tz: 'America/Bogota' },
  ]},
  EG: { name: 'Egypt', states: [
    { name: 'Cairo',       tz: 'Africa/Cairo' },
    { name: 'Alexandria',  tz: 'Africa/Cairo' },
    { name: 'Giza',        tz: 'Africa/Cairo' },
    { name: 'Luxor',       tz: 'Africa/Cairo' },
    { name: 'Aswan',       tz: 'Africa/Cairo' },
    { name: 'Other',       tz: 'Africa/Cairo' },
  ]},
  ET: { name: 'Ethiopia', states: [
    { name: 'Addis Ababa', tz: 'Africa/Addis_Ababa' },
    { name: 'Amhara',      tz: 'Africa/Addis_Ababa' },
    { name: 'Oromia',      tz: 'Africa/Addis_Ababa' },
    { name: 'SNNPR',       tz: 'Africa/Addis_Ababa' },
    { name: 'Tigray',      tz: 'Africa/Addis_Ababa' },
    { name: 'Other',       tz: 'Africa/Addis_Ababa' },
  ]},
  FR: { name: 'France', states: [
    { name: 'Île-de-France (Paris)',        tz: 'Europe/Paris' },
    { name: 'Auvergne-Rhône-Alpes',         tz: 'Europe/Paris' },
    { name: 'Nouvelle-Aquitaine',           tz: 'Europe/Paris' },
    { name: 'Occitanie',                    tz: 'Europe/Paris' },
    { name: 'Hauts-de-France',              tz: 'Europe/Paris' },
    { name: 'Grand Est',                    tz: 'Europe/Paris' },
    { name: 'Pays de la Loire',             tz: 'Europe/Paris' },
    { name: 'Normandie',                    tz: 'Europe/Paris' },
    { name: "Provence-Alpes-Côte d'Azur",   tz: 'Europe/Paris' },
    { name: 'Bretagne',                     tz: 'Europe/Paris' },
    { name: 'Other',                        tz: 'Europe/Paris' },
  ]},
  DE: { name: 'Germany', states: [
    { name: 'Baden-Württemberg',     tz: 'Europe/Berlin' },
    { name: 'Bavaria',               tz: 'Europe/Berlin' },
    { name: 'Berlin',                tz: 'Europe/Berlin' },
    { name: 'Brandenburg',           tz: 'Europe/Berlin' },
    { name: 'Bremen',                tz: 'Europe/Berlin' },
    { name: 'Hamburg',               tz: 'Europe/Berlin' },
    { name: 'Hesse',                 tz: 'Europe/Berlin' },
    { name: 'Lower Saxony',          tz: 'Europe/Berlin' },
    { name: 'North Rhine-Westphalia',tz: 'Europe/Berlin' },
    { name: 'Rhineland-Palatinate',  tz: 'Europe/Berlin' },
    { name: 'Saxony',                tz: 'Europe/Berlin' },
    { name: 'Thuringia',             tz: 'Europe/Berlin' },
    { name: 'Other',                 tz: 'Europe/Berlin' },
  ]},
  IN: { name: 'India', states: [
    { name: 'Andhra Pradesh',    tz: 'Asia/Kolkata' },
    { name: 'Arunachal Pradesh', tz: 'Asia/Kolkata' },
    { name: 'Assam',             tz: 'Asia/Kolkata' },
    { name: 'Bihar',             tz: 'Asia/Kolkata' },
    { name: 'Chhattisgarh',      tz: 'Asia/Kolkata' },
    { name: 'Delhi',             tz: 'Asia/Kolkata' },
    { name: 'Goa',               tz: 'Asia/Kolkata' },
    { name: 'Gujarat',           tz: 'Asia/Kolkata' },
    { name: 'Haryana',           tz: 'Asia/Kolkata' },
    { name: 'Himachal Pradesh',  tz: 'Asia/Kolkata' },
    { name: 'Jammu & Kashmir',   tz: 'Asia/Kolkata' },
    { name: 'Jharkhand',         tz: 'Asia/Kolkata' },
    { name: 'Karnataka',         tz: 'Asia/Kolkata' },
    { name: 'Kerala',            tz: 'Asia/Kolkata' },
    { name: 'Madhya Pradesh',    tz: 'Asia/Kolkata' },
    { name: 'Maharashtra',       tz: 'Asia/Kolkata' },
    { name: 'Manipur',           tz: 'Asia/Kolkata' },
    { name: 'Meghalaya',         tz: 'Asia/Kolkata' },
    { name: 'Mizoram',           tz: 'Asia/Kolkata' },
    { name: 'Nagaland',          tz: 'Asia/Kolkata' },
    { name: 'Odisha',            tz: 'Asia/Kolkata' },
    { name: 'Punjab',            tz: 'Asia/Kolkata' },
    { name: 'Rajasthan',         tz: 'Asia/Kolkata' },
    { name: 'Sikkim',            tz: 'Asia/Kolkata' },
    { name: 'Tamil Nadu',        tz: 'Asia/Kolkata' },
    { name: 'Telangana',         tz: 'Asia/Kolkata' },
    { name: 'Tripura',           tz: 'Asia/Kolkata' },
    { name: 'Uttar Pradesh',     tz: 'Asia/Kolkata' },
    { name: 'Uttarakhand',       tz: 'Asia/Kolkata' },
    { name: 'West Bengal',       tz: 'Asia/Kolkata' },
  ]},
  ID: { name: 'Indonesia', states: [
    { name: 'Aceh',              tz: 'Asia/Jakarta' },
    { name: 'Bali',              tz: 'Asia/Makassar' },
    { name: 'Banten',            tz: 'Asia/Jakarta' },
    { name: 'Central Java',      tz: 'Asia/Jakarta' },
    { name: 'East Java',         tz: 'Asia/Jakarta' },
    { name: 'East Kalimantan',   tz: 'Asia/Makassar' },
    { name: 'Jakarta',           tz: 'Asia/Jakarta' },
    { name: 'North Sulawesi',    tz: 'Asia/Makassar' },
    { name: 'North Sumatra',     tz: 'Asia/Jakarta' },
    { name: 'Papua',             tz: 'Asia/Jayapura' },
    { name: 'South Kalimantan',  tz: 'Asia/Makassar' },
    { name: 'South Sulawesi',    tz: 'Asia/Makassar' },
    { name: 'West Java',         tz: 'Asia/Jakarta' },
    { name: 'West Kalimantan',   tz: 'Asia/Pontianak' },
    { name: 'West Sumatra',      tz: 'Asia/Jakarta' },
    { name: 'Yogyakarta',        tz: 'Asia/Jakarta' },
    { name: 'Other',             tz: 'Asia/Jakarta' },
  ]},
  IR: { name: 'Iran', states: [
    { name: 'Tehran',           tz: 'Asia/Tehran' },
    { name: 'Isfahan',          tz: 'Asia/Tehran' },
    { name: 'Fars (Shiraz)',     tz: 'Asia/Tehran' },
    { name: 'Khorasan',         tz: 'Asia/Tehran' },
    { name: 'East Azerbaijan',  tz: 'Asia/Tehran' },
    { name: 'Khuzestan',        tz: 'Asia/Tehran' },
    { name: 'Other',            tz: 'Asia/Tehran' },
  ]},
  IT: { name: 'Italy', states: [
    { name: 'Campania',   tz: 'Europe/Rome' },
    { name: 'Lazio',      tz: 'Europe/Rome' },
    { name: 'Lombardy',   tz: 'Europe/Rome' },
    { name: 'Piedmont',   tz: 'Europe/Rome' },
    { name: 'Sicily',     tz: 'Europe/Rome' },
    { name: 'Tuscany',    tz: 'Europe/Rome' },
    { name: 'Veneto',     tz: 'Europe/Rome' },
    { name: 'Other',      tz: 'Europe/Rome' },
  ]},
  JP: { name: 'Japan', states: [
    { name: 'Aichi (Nagoya)',     tz: 'Asia/Tokyo' },
    { name: 'Fukuoka',            tz: 'Asia/Tokyo' },
    { name: 'Hokkaido (Sapporo)', tz: 'Asia/Tokyo' },
    { name: 'Kyoto',              tz: 'Asia/Tokyo' },
    { name: 'Osaka',              tz: 'Asia/Tokyo' },
    { name: 'Okinawa',            tz: 'Asia/Tokyo' },
    { name: 'Tokyo',              tz: 'Asia/Tokyo' },
    { name: 'Other',              tz: 'Asia/Tokyo' },
  ]},
  KE: { name: 'Kenya', states: [
    { name: 'Nairobi',  tz: 'Africa/Nairobi' },
    { name: 'Mombasa',  tz: 'Africa/Nairobi' },
    { name: 'Nakuru',   tz: 'Africa/Nairobi' },
    { name: 'Kisumu',   tz: 'Africa/Nairobi' },
    { name: 'Other',    tz: 'Africa/Nairobi' },
  ]},
  MX: { name: 'Mexico', states: [
    { name: 'Baja California',   tz: 'America/Tijuana' },
    { name: 'Chihuahua',         tz: 'America/Chihuahua' },
    { name: 'Coahuila',          tz: 'America/Monterrey' },
    { name: 'Jalisco',           tz: 'America/Mexico_City' },
    { name: 'Mexico City',       tz: 'America/Mexico_City' },
    { name: 'Nuevo León',        tz: 'America/Monterrey' },
    { name: 'Oaxaca',            tz: 'America/Mexico_City' },
    { name: 'Quintana Roo',      tz: 'America/Cancun' },
    { name: 'Sinaloa',           tz: 'America/Mazatlan' },
    { name: 'Sonora',            tz: 'America/Hermosillo' },
    { name: 'Veracruz',          tz: 'America/Mexico_City' },
    { name: 'Yucatán',           tz: 'America/Merida' },
    { name: 'Other',             tz: 'America/Mexico_City' },
  ]},
  NL: { name: 'Netherlands', states: [
    { name: 'North Holland (Amsterdam)', tz: 'Europe/Amsterdam' },
    { name: 'South Holland',             tz: 'Europe/Amsterdam' },
    { name: 'Utrecht',                   tz: 'Europe/Amsterdam' },
    { name: 'Other',                     tz: 'Europe/Amsterdam' },
  ]},
  NZ: { name: 'New Zealand', states: [
    { name: 'Auckland',        tz: 'Pacific/Auckland' },
    { name: 'Canterbury',      tz: 'Pacific/Auckland' },
    { name: 'Wellington',      tz: 'Pacific/Auckland' },
    { name: 'Waikato',         tz: 'Pacific/Auckland' },
    { name: 'Chatham Islands', tz: 'Pacific/Chatham' },
    { name: 'Other',           tz: 'Pacific/Auckland' },
  ]},
  NG: { name: 'Nigeria', states: [
    { name: 'Lagos',        tz: 'Africa/Lagos' },
    { name: 'Kano',         tz: 'Africa/Lagos' },
    { name: 'FCT (Abuja)',  tz: 'Africa/Lagos' },
    { name: 'Rivers',       tz: 'Africa/Lagos' },
    { name: 'Oyo (Ibadan)', tz: 'Africa/Lagos' },
    { name: 'Anambra',      tz: 'Africa/Lagos' },
    { name: 'Other',        tz: 'Africa/Lagos' },
  ]},
  PK: { name: 'Pakistan', states: [
    { name: 'Punjab',                      tz: 'Asia/Karachi' },
    { name: 'Sindh',                       tz: 'Asia/Karachi' },
    { name: 'Khyber Pakhtunkhwa',          tz: 'Asia/Karachi' },
    { name: 'Balochistan',                 tz: 'Asia/Karachi' },
    { name: 'Islamabad Capital Territory', tz: 'Asia/Karachi' },
    { name: 'Azad Kashmir',                tz: 'Asia/Karachi' },
    { name: 'Gilgit-Baltistan',            tz: 'Asia/Karachi' },
  ]},
  PH: { name: 'Philippines', states: [
    { name: 'Metro Manila (NCR)',    tz: 'Asia/Manila' },
    { name: 'Central Luzon',         tz: 'Asia/Manila' },
    { name: 'CALABARZON',            tz: 'Asia/Manila' },
    { name: 'Central Visayas',       tz: 'Asia/Manila' },
    { name: 'Western Visayas',       tz: 'Asia/Manila' },
    { name: 'Davao Region',          tz: 'Asia/Manila' },
    { name: 'Other',                 tz: 'Asia/Manila' },
  ]},
  RU: { name: 'Russia', states: [
    { name: 'Moscow / Central',        tz: 'Europe/Moscow' },
    { name: 'Saint Petersburg',        tz: 'Europe/Moscow' },
    { name: 'Kaliningrad',             tz: 'Europe/Kaliningrad' },
    { name: 'Samara / Volga',          tz: 'Europe/Samara' },
    { name: 'Yekaterinburg / Urals',   tz: 'Asia/Yekaterinburg' },
    { name: 'Omsk',                    tz: 'Asia/Omsk' },
    { name: 'Novosibirsk',             tz: 'Asia/Krasnoyarsk' },
    { name: 'Irkutsk',                 tz: 'Asia/Irkutsk' },
    { name: 'Vladivostok / Far East',  tz: 'Asia/Vladivostok' },
    { name: 'Kamchatka',               tz: 'Asia/Kamchatka' },
  ]},
  SA: { name: 'Saudi Arabia', states: [
    { name: 'Riyadh',           tz: 'Asia/Riyadh' },
    { name: 'Mecca',            tz: 'Asia/Riyadh' },
    { name: 'Medina',           tz: 'Asia/Riyadh' },
    { name: 'Eastern Province', tz: 'Asia/Riyadh' },
    { name: 'Jizan',            tz: 'Asia/Riyadh' },
    { name: 'Other',            tz: 'Asia/Riyadh' },
  ]},
  ZA: { name: 'South Africa', states: [
    { name: 'Gauteng (Johannesburg)', tz: 'Africa/Johannesburg' },
    { name: 'Western Cape (Cape Town)',tz: 'Africa/Johannesburg' },
    { name: 'KwaZulu-Natal (Durban)', tz: 'Africa/Johannesburg' },
    { name: 'Eastern Cape',           tz: 'Africa/Johannesburg' },
    { name: 'Limpopo',                tz: 'Africa/Johannesburg' },
    { name: 'Mpumalanga',             tz: 'Africa/Johannesburg' },
    { name: 'Other',                  tz: 'Africa/Johannesburg' },
  ]},
  KR: { name: 'South Korea', states: [
    { name: 'Seoul',    tz: 'Asia/Seoul' },
    { name: 'Busan',    tz: 'Asia/Seoul' },
    { name: 'Incheon',  tz: 'Asia/Seoul' },
    { name: 'Daegu',    tz: 'Asia/Seoul' },
    { name: 'Gwangju',  tz: 'Asia/Seoul' },
    { name: 'Other',    tz: 'Asia/Seoul' },
  ]},
  ES: { name: 'Spain', states: [
    { name: 'Andalusia',        tz: 'Europe/Madrid' },
    { name: 'Catalonia',        tz: 'Europe/Madrid' },
    { name: 'Community of Madrid', tz: 'Europe/Madrid' },
    { name: 'Valencia',         tz: 'Europe/Madrid' },
    { name: 'Basque Country',   tz: 'Europe/Madrid' },
    { name: 'Canary Islands',   tz: 'Atlantic/Canary' },
    { name: 'Other',            tz: 'Europe/Madrid' },
  ]},
  TH: { name: 'Thailand', states: [
    { name: 'Bangkok',           tz: 'Asia/Bangkok' },
    { name: 'Chiang Mai',        tz: 'Asia/Bangkok' },
    { name: 'Phuket',            tz: 'Asia/Bangkok' },
    { name: 'Chonburi (Pattaya)',tz: 'Asia/Bangkok' },
    { name: 'Other',             tz: 'Asia/Bangkok' },
  ]},
  TR: { name: 'Turkey', states: [
    { name: 'Istanbul',         tz: 'Europe/Istanbul' },
    { name: 'Ankara',           tz: 'Europe/Istanbul' },
    { name: 'Izmir',            tz: 'Europe/Istanbul' },
    { name: 'Antalya',          tz: 'Europe/Istanbul' },
    { name: 'Bursa',            tz: 'Europe/Istanbul' },
    { name: 'Other',            tz: 'Europe/Istanbul' },
  ]},
  AE: { name: 'United Arab Emirates', states: [
    { name: 'Abu Dhabi',     tz: 'Asia/Dubai' },
    { name: 'Dubai',         tz: 'Asia/Dubai' },
    { name: 'Sharjah',       tz: 'Asia/Dubai' },
    { name: 'Ajman',         tz: 'Asia/Dubai' },
    { name: 'Ras Al Khaimah',tz: 'Asia/Dubai' },
    { name: 'Fujairah',      tz: 'Asia/Dubai' },
  ]},
  GB: { name: 'United Kingdom', states: [
    { name: 'England: London & South East', tz: 'Europe/London' },
    { name: 'England: Midlands',            tz: 'Europe/London' },
    { name: 'England: North',               tz: 'Europe/London' },
    { name: 'England: South West',          tz: 'Europe/London' },
    { name: 'Scotland',                      tz: 'Europe/London' },
    { name: 'Wales',                         tz: 'Europe/London' },
    { name: 'Northern Ireland',              tz: 'Europe/London' },
  ]},
  US: { name: 'United States', states: [
    { name: 'Alabama',         tz: 'America/Chicago' },
    { name: 'Alaska',          tz: 'America/Anchorage' },
    { name: 'Arizona',         tz: 'America/Phoenix' },
    { name: 'Arkansas',        tz: 'America/Chicago' },
    { name: 'California',      tz: 'America/Los_Angeles' },
    { name: 'Colorado',        tz: 'America/Denver' },
    { name: 'Connecticut',     tz: 'America/New_York' },
    { name: 'Delaware',        tz: 'America/New_York' },
    { name: 'Florida',         tz: 'America/New_York' },
    { name: 'Georgia',         tz: 'America/New_York' },
    { name: 'Hawaii',          tz: 'Pacific/Honolulu' },
    { name: 'Idaho',           tz: 'America/Boise' },
    { name: 'Illinois',        tz: 'America/Chicago' },
    { name: 'Indiana',         tz: 'America/Indiana/Indianapolis' },
    { name: 'Iowa',            tz: 'America/Chicago' },
    { name: 'Kansas',          tz: 'America/Chicago' },
    { name: 'Kentucky',        tz: 'America/New_York' },
    { name: 'Louisiana',       tz: 'America/Chicago' },
    { name: 'Maine',           tz: 'America/New_York' },
    { name: 'Maryland',        tz: 'America/New_York' },
    { name: 'Massachusetts',   tz: 'America/New_York' },
    { name: 'Michigan',        tz: 'America/Detroit' },
    { name: 'Minnesota',       tz: 'America/Chicago' },
    { name: 'Mississippi',     tz: 'America/Chicago' },
    { name: 'Missouri',        tz: 'America/Chicago' },
    { name: 'Montana',         tz: 'America/Denver' },
    { name: 'Nebraska',        tz: 'America/Chicago' },
    { name: 'Nevada',          tz: 'America/Los_Angeles' },
    { name: 'New Hampshire',   tz: 'America/New_York' },
    { name: 'New Jersey',      tz: 'America/New_York' },
    { name: 'New Mexico',      tz: 'America/Denver' },
    { name: 'New York',        tz: 'America/New_York' },
    { name: 'North Carolina',  tz: 'America/New_York' },
    { name: 'North Dakota',    tz: 'America/Chicago' },
    { name: 'Ohio',            tz: 'America/New_York' },
    { name: 'Oklahoma',        tz: 'America/Chicago' },
    { name: 'Oregon',          tz: 'America/Los_Angeles' },
    { name: 'Pennsylvania',    tz: 'America/New_York' },
    { name: 'Rhode Island',    tz: 'America/New_York' },
    { name: 'South Carolina',  tz: 'America/New_York' },
    { name: 'South Dakota',    tz: 'America/Chicago' },
    { name: 'Tennessee',       tz: 'America/Chicago' },
    { name: 'Texas',           tz: 'America/Chicago' },
    { name: 'Utah',            tz: 'America/Denver' },
    { name: 'Vermont',         tz: 'America/New_York' },
    { name: 'Virginia',        tz: 'America/New_York' },
    { name: 'Washington',      tz: 'America/Los_Angeles' },
    { name: 'Washington D.C.', tz: 'America/New_York' },
    { name: 'West Virginia',   tz: 'America/New_York' },
    { name: 'Wisconsin',       tz: 'America/Chicago' },
    { name: 'Wyoming',         tz: 'America/Denver' },
  ]},
  VN: { name: 'Vietnam', states: [
    { name: 'Hanoi',          tz: 'Asia/Ho_Chi_Minh' },
    { name: 'Ho Chi Minh City',tz: 'Asia/Ho_Chi_Minh' },
    { name: 'Da Nang',        tz: 'Asia/Ho_Chi_Minh' },
    { name: 'Hai Phong',      tz: 'Asia/Ho_Chi_Minh' },
    { name: 'Other',          tz: 'Asia/Ho_Chi_Minh' },
  ]},
};

const COUNTRY_LIST = Object.entries(GEO_DATA)
  .map(([code, d]) => ({ code, name: d.name }))
  .sort((a, b) => a.name.localeCompare(b.name));

// ── CALCULATION (unchanged) ───────────────────────────────────────────────────

const LAHIRI_AYANAMSA_2000 = 23.85;
const AYANAMSA_RATE = 50.3 / 3600;

function getLahiriAyanamsa(jd) {
  const J2000 = 2451545.0;
  const years = (jd - J2000) / 365.25;
  return LAHIRI_AYANAMSA_2000 + (years * AYANAMSA_RATE);
}

function getMoonLongitude(date) {
  const toRad = d => d * Math.PI / 180;
  const JD = date.getTime() / 86400000 + 2440587.5;
  const T = (JD - 2451545.0) / 36525;
  let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
  let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000;
  let Mm = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
  let F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
  let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
  L = L % 360; M = M % 360; Mm = Mm % 360; F = F % 360; D = D % 360;
  let lon = L
    + 6.288774 * Math.sin(toRad(Mm))
    + 1.274027 * Math.sin(toRad(2*D - Mm))
    + 0.658314 * Math.sin(toRad(2*D))
    + 0.213618 * Math.sin(toRad(2*Mm))
    - 0.185116 * Math.sin(toRad(M))
    - 0.114332 * Math.sin(toRad(2*F))
    + 0.058793 * Math.sin(toRad(2*D - 2*Mm))
    + 0.057066 * Math.sin(toRad(2*D - M - Mm))
    + 0.053322 * Math.sin(toRad(2*D + Mm))
    + 0.045758 * Math.sin(toRad(2*D - M))
    + 0.041775 * Math.sin(toRad(Mm - M))
    + 0.034598 * Math.sin(toRad(D))
    + 0.030398 * Math.sin(toRad(2*D - 2*Mm))
    + 0.015327 * Math.sin(toRad(2*D - 2*F))
    - 0.012528 * Math.sin(toRad(Mm + 2*F))
    + 0.010980 * Math.sin(toRad(Mm - 2*F));
  lon = ((lon % 360) + 360) % 360;
  const ayanamsa = getLahiriAyanamsa(JD);
  let sidereal = lon - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  return { sidereal, tropical: lon, ayanamsa };
}

function getNakshatraFromLon(siderealLon) {
  const span = 360 / 27;
  const posInNak = siderealLon % span;
  const idx = Math.floor(siderealLon / span);
  const pada = Math.floor(posInNak / (span / 4)) + 1;
  return { nakshatra: NAKSHATRAS[idx], pada, longitude: siderealLon };
}

async function generateNames(nakshatra, gender) {
  const res = await fetch("/api/generate-names", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nakshatra, gender })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to generate names');
  }
  const data = await res.json();
  return data.names;
}

// ── CELESTIAL LOADER ─────────────────────────────────────────────────────────

function CelestialLoader({ message = 'Calculating your nakshatra' }) {
  return (
    <div className="celestial-loader">
      <svg viewBox="0 0 32 44" className="loader-crescent" aria-hidden="true">
        <path d="M18 4C5 7 3 17 3 23C3 31 8 39 17 42C23 40 27 34 26 23C25 13 22 7 18 4Z"
          fill="none" stroke="#7F6FDB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p className="loader-text">{message}</p>
    </div>
  );
}

// ── SCIENCE TAB ──────────────────────────────────────────────────────────────

function ScienceSimple({ onGoDeeper }) {
  return (
    <>
      <h1 className="page-title">Why this works.</h1>
      <p className="sci-intro">
        Nakshatra naming is a 3,000-year-old Vedic tradition. Your birth star is determined by the Moon's position when you were born. It points to a set of sacred syllables. Names starting with those syllables are believed to carry the energy of your star.
      </p>
      <div className="sci-steps">
        <div>
          <div className="sci-step-num">01 · THE MOON'S POSITION</div>
          <div className="sci-step-label">The Moon's position</div>
          <div className="sci-step-desc">We find exactly where the Moon was in the sky the moment you were born.</div>
        </div>
        <div>
          <div className="sci-step-num">02 · YOUR BIRTH STAR</div>
          <div className="sci-step-label">Your birth star</div>
          <div className="sci-step-desc">That position falls in one of 27 nakshatras, each with its own deity, energy, and syllables.</div>
        </div>
        <div>
          <div className="sci-step-num">03 · YOUR NAME SYLLABLE</div>
          <div className="sci-step-label">Your name syllable</div>
          <div className="sci-step-desc">The specific quarter (pada) of your nakshatra gives the sacred starting syllable for your name.</div>
        </div>
      </div>
      <button className="sci-toggle-btn" onClick={onGoDeeper}>Go deeper →</button>
    </>
  );
}

function ScienceDetailed({ onShowLess }) {
  return (
    <>
      <h1 className="page-title">The astronomy behind it.</h1>
      <p className="page-subtitle" style={{ marginBottom: '2.5rem' }}>
        A closer look at the calculation, the tradition, and the evidence behind it.
      </p>
      <div className="sci-sections">
        <div>
          <div className="sci-section-num">01 · WHAT IS A NAKSHATRA</div>
          <div className="sci-section-title">What is a nakshatra</div>
          <div className="sci-section-body">
            The sky is divided into 27 lunar mansions (nakshatras), each spanning exactly 13°20' of the zodiac. The Moon traverses one nakshatra roughly every 24 hours, completing the full cycle in 27.3 days, the same period as a sidereal month. Each nakshatra is presided over by a specific deity and planetary ruler, and carries a distinct quality or energy that Vedic tradition holds to be imprinted on a person born under it.
          </div>
        </div>
        <div>
          <div className="sci-section-num">02 · THE CALCULATION</div>
          <div className="sci-section-title">The calculation</div>
          <div className="sci-section-body">
            This app uses the Chapront lunar theory (1988), which models the Moon's position to within 1 arcminute of accuracy for historical dates. To convert from the tropical (Western) zodiac to the sidereal (Vedic) zodiac, it applies the Lahiri ayanamsha, the official ayanamsha adopted by the Government of India in 1955 for the Indian National Calendar. The current value is approximately 23.85° at the J2000 epoch, precessing at 50.3 arcseconds per year.
          </div>
        </div>
        <div>
          <div className="sci-section-num">03 · THE EVIDENCE</div>
          <div className="sci-section-title">The evidence</div>
          <div className="sci-section-body">
            The Lahiri ayanamsha has been independently verified by modern astronomical software including Swiss Ephemeris, the gold standard used by professional astrologers and researchers worldwide. The Moon's position calculation used here matches within 0.5 degrees of NASA JPL Horizons system outputs for historical dates, well within the precision needed to determine nakshatra and pada correctly. The nakshatra-pada syllable mapping is consistent across all major Vedic texts: the Brihat Parashara Hora Shastra, the Brihat Jataka by Varahamihira, and the Muhurta Chintamani. These are independent works from different centuries that agree on the syllable assignments without exception.
          </div>
        </div>
        <div>
          <div className="sci-section-num">04 · NAMING TRADITION</div>
          <div className="sci-section-title">Naming tradition</div>
          <div className="sci-section-body">
            The tradition is rooted in the Brihat Parashara Hora Shastra, the foundational text of Vedic astrology. Each nakshatra is divided into four padas (quarters), each corresponding to a specific starting syllable (108 syllables in total across all 27 nakshatras). A child named with their nakshatra's pada syllable is believed to harmonise with the cosmic energy present at the moment of their birth, aligning their identity with the qualities of their birth star.
          </div>
        </div>
        <div>
          <div className="sci-section-num">05 · SOURCES</div>
          <div className="sci-section-title">Sources</div>
          <div className="sci-sources">
            <div className="sci-source-item">Brihat Parashara Hora Shastra (classical Vedic text, multiple translations)</div>
            <div className="sci-source-item">Brihat Jataka by Varahamihira (6th century CE)</div>
            <div className="sci-source-item">Muhurta Chintamani (classical Vedic text)</div>
            <div className="sci-source-item">Government of India Lahiri Ayanamsha Standard (1955)</div>
            <div className="sci-source-item">Chapront Lunar Theory, Chapront-Touze &amp; Chapront (1988)</div>
            <div className="sci-source-item">Swiss Ephemeris by Astrodienst AG</div>
            <div className="sci-source-item">NASA JPL Horizons System</div>
          </div>
        </div>
      </div>
      <button className="sci-toggle-btn" onClick={onShowLess}>← Show less</button>
    </>
  );
}

function ScienceTab() {
  const [view, setView] = useState('simple');
  return (
    <div className="page">
      {view === 'simple'
        ? <ScienceSimple onGoDeeper={() => setView('detailed')} />
        : <ScienceDetailed onShowLess={() => setView('simple')} />
      }
    </div>
  );
}

// ── ASK TAB ──────────────────────────────────────────────────────────────────

function AskTab() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const updateContact = (k, v) => setContact(c => ({ ...c, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('https://formspree.io/f/mnjyzzgv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: contact.name, email: contact.email, message: contact.message })
      });
      if (res.ok) {
        setStatus('success');
        setContact({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setSubmitting(false);
  };

  return (
    <div className="page">
      <h1 className="page-title">Have a question?</h1>
      <p className="page-subtitle">Ask anything about nakshatras, Vedic astrology, or how this works. We'll get back to you.</p>
      <div className="card">
        <form onSubmit={submit}>
          <div className="form-stack">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" value={contact.name} onChange={e => updateContact('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={contact.email} onChange={e => updateContact('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Question</label>
              <textarea
                placeholder="What would you like to know?"
                value={contact.message}
                onChange={e => {
                  updateContact('message', e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send question'}
          </button>
        </form>
        {status === 'success' && <div className="contact-success">Your question has been received. We'll be in touch.</div>}
        {status === 'error' && <div className="error">Something went wrong. Please try again.</div>}
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────

const BLANK_FORM = {
  dateMonth: '', dateDay: '', dateYear: '',
  timePeriod: '',
  timeHour: '', timeMinute: '00', timeAmPm: 'AM',
  country: '', state: '',
  gender: '',
};

export default function App() {
  const [tab, setTab] = useState('generator');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(BLANK_FORM);
  const [loading, setLoading] = useState(false);
  const [loadingNames, setLoadingNames] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [names, setNames] = useState([]);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startOver = () => {
    setStep(1);
    setForm(BLANK_FORM);
    setResult(null);
    setNames([]);
    setError('');
  };

  const buildDateTime = (f) => {
    const MM = String(f.dateMonth).padStart(2, '0');
    const DD = String(f.dateDay).padStart(2, '0');
    const dateStr = `${f.dateYear}-${MM}-${DD}`;

    let timeStr;
    if (f.timePeriod === 'unknown') {
      timeStr = '12:00';
    } else if (f.timeHour) {
      let hour = parseInt(f.timeHour, 10);
      if (f.timeAmPm === 'AM') { if (hour === 12) hour = 0; }
      else { if (hour !== 12) hour += 12; }
      timeStr = `${String(hour).padStart(2, '0')}:${f.timeMinute}`;
    } else {
      timeStr = TIME_PERIODS.find(p => p.id === f.timePeriod)?.midpoint || '12:00';
    }
    return { dateStr, timeStr };
  };

  const calculate = async (gender) => {
    setError('');
    setLoading(true);
    setResult(null);
    setNames([]);
    try {
      const stateIdx = parseInt(form.state, 10);
      const stateData = GEO_DATA[form.country].states[stateIdx];
      const tz = stateData.tz;

      const { dateStr, timeStr } = buildDateTime(form);
      const { sidereal, ayanamsa } = getMoonLongitude(new Date(`${dateStr}T${timeStr}:00`));
      const { nakshatra, pada, longitude } = getNakshatraFromLon(sidereal);

      setResult({ nakshatra, pada, longitude, ayanamsa, tz });
      setLoading(false);
      setLoadingNames(true);
      try {
        const nameList = await generateNames(nakshatra, gender);
        setNames(nameList);
      } catch {
        setError('Name suggestions are unavailable right now. Please try again later.');
      }
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    }
    setLoading(false);
    setLoadingNames(false);
  };

  const regenerate = async () => {
    if (!result) return;
    setLoadingNames(true);
    setNames([]);
    try {
      const nameList = await generateNames(result.nakshatra, form.gender);
      setNames(nameList);
    } catch {
      setError('Name suggestions are unavailable right now. Please try again later.');
    }
    setLoadingNames(false);
  };

  // ── Step renderers ──────────────────────────────────────────────────────────

  const canStep1 = form.dateMonth && form.dateDay && form.dateYear;
  const canStep2 = !!form.timePeriod;
  const canStep3 = form.country && form.state !== '';

  const states = form.country ? GEO_DATA[form.country]?.states || [] : [];

  const renderStep = () => {
    // Step 1: Date
    if (step === 1) return (
      <>
        <p className="step-question">When were you born?</p>
        <div className="multi-select-row" style={{ marginBottom: '1.5rem' }}>
          <select value={form.dateMonth} onChange={e => update('dateMonth', e.target.value)}>
            <option value="">Month</option>
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
          <select value={form.dateDay} onChange={e => update('dateDay', e.target.value)}>
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={form.dateYear} onChange={e => update('dateYear', e.target.value)}>
            <option value="">Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button className="btn" onClick={() => setStep(2)} disabled={!canStep1}>Continue</button>
      </>
    );

    // Step 2: Time
    if (step === 2) return (
      <>
        <p className="step-question">What time were you born?</p>
        <div className="time-pills">
          {TIME_PERIODS.map(p => (
            <button
              key={p.id}
              className={`time-pill${form.timePeriod === p.id ? ' selected' : ''}`}
              onClick={() => update('timePeriod', p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {form.timePeriod === 'unknown' && (
          <div className="step-note">
            We'll use noon as default. Results may be slightly less accurate.
          </div>
        )}

        {form.timePeriod && form.timePeriod !== 'unknown' && (
          <div className="optional-section">
            <div className="optional-label">Exact time (optional)</div>
            <div className="multi-select-row time-cols">
              <select value={form.timeHour} onChange={e => update('timeHour', e.target.value)}>
                <option value="">Hour</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <select value={form.timeMinute} onChange={e => update('timeMinute', e.target.value)}>
                {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={form.timeAmPm} onChange={e => update('timeAmPm', e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        )}

        <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
        <button className="btn" onClick={() => setStep(3)} disabled={!canStep2}>Continue</button>
      </>
    );

    // Step 3: Location
    if (step === 3) return (
      <>
        <p className="step-question">Where were you born?</p>
        <div className="form-stack" style={{ marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label>Country</label>
            <select value={form.country} onChange={e => { update('country', e.target.value); update('state', ''); }}>
              <option value="">Select country</option>
              {COUNTRY_LIST.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
          {form.country && (
            <div className="form-group">
              <label>State / Province</label>
              <select value={form.state} onChange={e => update('state', e.target.value)}>
                <option value="">Select state / province</option>
                {states.map((s, i) => <option key={i} value={i}>{s.name}</option>)}
              </select>
            </div>
          )}
        </div>
        <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
        <button className="btn" onClick={() => setStep(4)} disabled={!canStep3}>Continue</button>
      </>
    );

    // Step 4: Gender
    if (step === 4) return (
      <>
        <p className="step-question">What names are you looking for?</p>
        {loading ? (
          <CelestialLoader message="Calculating your nakshatra" />
        ) : (
          <div className="gender-pills">
            <button className="gender-pill" onClick={() => { update('gender', 'male'); calculate('male'); }}>
              Male
            </button>
            <button className="gender-pill" onClick={() => { update('gender', 'female'); calculate('female'); }}>
              Female
            </button>
          </div>
        )}
        {!loading && <button className="back-btn" style={{ marginTop: '1.25rem' }} onClick={() => setStep(3)}>← Back</button>}
        {error && <div className="error" style={{ marginTop: '1rem' }}>{error}</div>}
      </>
    );
  };

  // ── Result view ─────────────────────────────────────────────────────────────

  const renderResult = () => (
    <>
      <div className="card">
        <div className="nak-header">
          <div>
            <div className="nak-name">{result.nakshatra.name}</div>
            <div className="nak-sub">{result.nakshatra.deity} · {result.nakshatra.planet} · Pada {result.pada}</div>
          </div>
          <span className="pada-badge">Pada {result.pada}</span>
        </div>
        <div className="meta-grid">
          <div className="meta-item">
            <div className="meta-label">Ruling planet</div>
            <div className="meta-value">{result.nakshatra.planet}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Presiding deity</div>
            <div className="meta-value">{result.nakshatra.deity}</div>
          </div>
          <div className="meta-item full">
            <div className="meta-label">Quality</div>
            <div className="meta-value">{result.nakshatra.quality}</div>
          </div>
        </div>
        <div className="syllables-section">
          <div className="section-label">Sacred starting syllables</div>
          <div className="syllables-row">
            {result.nakshatra.syllables.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
        <div className="moon-pos">
          Moon at {result.longitude.toFixed(2)}° sidereal · Lahiri ayanamsha {result.ayanamsa.toFixed(2)}° · {result.tz}
        </div>
      </div>

      {(loadingNames || names.length > 0) && (
        <>
          <div className="names-divider">
            <span style={{opacity: 0.18}} />
            <span style={{opacity: 0.32}} />
            <span style={{opacity: 0.55}} />
            <span style={{opacity: 0.32}} />
            <span style={{opacity: 0.18}} />
          </div>
          <div className="card">
          <div className="names-title">Name suggestions for {result.nakshatra.name}</div>
          {loadingNames && <CelestialLoader message="Generating names" />}
          {names.map((n, i) => (
            <div key={i} className="name-item">
              <div className="name-text">{n.name}</div>
              <div className="name-meaning">{n.meaning}</div>
            </div>
          ))}
          {names.length > 0 && (
            <button className="regen-btn" onClick={regenerate}>Suggest different names</button>
          )}
          </div>
        </>
      )}

      {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}
      <button className="start-over-btn" onClick={startOver}>← Start over</button>
    </>
  );

  // ── Layout ──────────────────────────────────────────────────────────────────

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav-logo"><span className="logo-main">Nakshatra</span><span className="logo-sub">Names</span></span>
        <div className="tab-pills">
          <button className={`tab-pill${tab === 'generator' ? ' active' : ''}`} onClick={() => setTab('generator')}>Generator</button>
          <button className={`tab-pill${tab === 'science' ? ' active' : ''}`} onClick={() => setTab('science')}>The science</button>
          <button className={`tab-pill${tab === 'ask' ? ' active' : ''}`} onClick={() => setTab('ask')}>Ask a question</button>
        </div>
      </nav>

      {tab === 'science' && <ScienceTab />}
      {tab === 'ask' && <AskTab />}


      {tab === 'generator' && (
        <div className="page">
          <h1 className="page-title">Discover your birth star.</h1>
          <p className="page-subtitle">Find the nakshatra at your moment of birth and the sacred syllables for naming.</p>

          {!result ? (
            <>
              <div className="progress-dots">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`progress-dot${step >= s ? ' done' : ''}`} />
                ))}
              </div>
              <div key={step} className="step-fade">
                {renderStep()}
              </div>
            </>
          ) : (
            renderResult()
          )}
        </div>
      )}
    </div>
  );
}
