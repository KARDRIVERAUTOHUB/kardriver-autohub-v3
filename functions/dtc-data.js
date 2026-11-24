"use strict";

// KARDRIVER AUTOHUB V3 - DTC DATABASE V1
// Kandungan ini untuk panduan diagnostik umum.
// Spesifikasi ujian sebenar mesti merujuk manual pengeluar.

module.exports = [
  {
    c: "P0101",
    n: "Mass Air Flow Sensor Range / Performance",
    free: {
      m: "Julat atau prestasi bacaan sensor aliran udara tidak normal.",
      s: "Enjin kurang kuasa, idle tidak stabil atau penggunaan petrol meningkat.",
      p: "Sensor MAF kotor/rosak, kebocoran udara atau masalah wiring."
    },
    pro: {
      diagnosis: "Periksa saluran intake selepas MAF, penapis udara, connector, wiring dan bacaan live data. Bandingkan nilai MAF ketika idle dan RPM dinaikkan.",
      tests: ["Pemeriksaan kebocoran intake", "Pemeriksaan bekalan voltan dan ground", "Analisis bacaan MAF dan fuel trim"],
      repair: "Bersihkan sensor menggunakan pencuci khusus MAF jika sesuai. Baiki kebocoran atau wiring. Ganti sensor hanya selepas ujian mengesahkan kerosakan."
    },
    elite: {
      analysis: "Analisis hubungan bacaan MAF, RPM, throttle position, fuel trim dan load enjin. Perubahan bacaan perlu dinilai mengikut kapasiti enjin dan spesifikasi OEM.",
      advanced: ["Bandingkan MAF dengan volumetric efficiency yang dijangka", "Periksa gangguan aliran udara akibat intake modification", "Gunakan oscilloscope jika isyarat sensor tidak stabil"],
      caseStudy: "Jika P0101 muncul bersama P0171, periksa kebocoran udara dan bacaan MAF sebelum membuat keputusan menggantikan sensor."
    }
  },
  {
    c: "P0113",
    n: "Intake Air Temperature Sensor 1 Circuit High",
    free: {
      m: "Isyarat litar sensor suhu udara masuk terlalu tinggi.",
      s: "Lampu check engine dan bacaan suhu udara tidak munasabah.",
      p: "Sensor IAT, connector tercabut atau litar terbuka."
    },
    pro: {
      diagnosis: "Semak connector dan wiring IAT. Bandingkan bacaan suhu udara masuk dengan suhu persekitaran ketika enjin sejuk.",
      tests: ["Periksa litar terbuka atau sambungan longgar", "Semak bekalan rujukan dan ground mengikut diagram", "Uji perubahan rintangan sensor jika jenis thermistor"],
      repair: "Baiki connector atau wiring. Ganti sensor jika ujian menunjukkan bacaan di luar spesifikasi."
    },
    elite: {
      analysis: "Kebanyakan sensor IAT jenis thermistor mempunyai perubahan rintangan mengikut suhu. Tafsir bacaan voltan dan suhu berdasarkan reka bentuk litar OEM.",
      advanced: ["Uji kesinambungan litar", "Bandingkan suhu IAT dan ECT ketika cold soak", "Periksa short-to-voltage dan open circuit"],
      caseStudy: "Bacaan IAT yang sangat rendah ketika enjin sejuk boleh menunjukkan litar terbuka atau connector tercabut, tetapi perlu disahkan melalui pemeriksaan litar."
    }
  },
  {
    c: "P0128",
    n: "Coolant Thermostat Below Regulating Temperature",
    free: {
      m: "Suhu coolant tidak mencapai suhu operasi yang dijangka.",
      s: "Enjin lambat panas atau pemanas kabin kurang panas.",
      p: "Thermostat terbuka, coolant rendah atau sensor suhu bermasalah."
    },
    pro: {
      diagnosis: "Semak paras coolant ketika enjin sejuk. Pantau ECT dari cold start dan perhatikan kadar kenaikan suhu.",
      tests: ["Periksa kebocoran coolant", "Bandingkan ECT dengan suhu sebenar", "Periksa operasi thermostat mengikut prosedur servis"],
      repair: "Baiki kebocoran atau ganti thermostat/sensor selepas diagnosis. Jangan buka sistem penyejukan ketika panas."
    },
    elite: {
      analysis: "Nilai tempoh warm-up, suhu persekitaran, beban enjin dan corak ECT. P0128 tidak semestinya bermaksud thermostat rosak.",
      advanced: ["Bandingkan ECT dan IAT sebelum cold start", "Pantau perubahan suhu radiator inlet dan outlet", "Sahkan suhu pembukaan thermostat mengikut spesifikasi OEM"],
      caseStudy: "Jika ECT meningkat terlalu perlahan dan pemanas kabin kurang panas, thermostat yang terbuka awal ialah satu kemungkinan. Sahkan paras coolant dan sensor dahulu."
    }
  },
  {
    c: "P0171",
    n: "System Too Lean Bank 1",
    free: {
      m: "Campuran udara dan bahan api terlalu kurus pada Bank 1.",
      s: "Idle kasar, enjin tersengguk atau kuasa berkurang.",
      p: "Vacuum leak, MAF kotor, tekanan bahan api rendah."
    },
    pro: {
      diagnosis: "Periksa kebocoran intake dan vacuum. Analisis STFT serta LTFT ketika idle dan RPM dinaikkan.",
      tests: ["Smoke test sistem intake", "Ujian tekanan bahan api", "Pemeriksaan MAF dan fuel trim"],
      repair: "Baiki kebocoran atau sistem bahan api berdasarkan hasil ujian. Jangan terus mengganti oxygen sensor."
    },
    elite: {
      analysis: "Fuel trim positif menunjukkan ECU menambah bahan api untuk mengimbangi keadaan lean. Bandingkan fuel trim idle dan beban tinggi untuk membantu membezakan vacuum leak daripada masalah bekalan bahan api.",
      advanced: ["Analisis STFT dan LTFT kedua-dua keadaan operasi", "Periksa exhaust leak sebelum sensor O2", "Nilai fuel pressure dan injector balance"],
      caseStudy: "Jika fuel trim tinggi ketika idle tetapi berkurang pada RPM lebih tinggi, vacuum leak ialah salah satu kemungkinan yang perlu diuji."
    }
  },
  {
    c: "P0172",
    n: "System Too Rich Bank 1",
    free: {
      m: "Campuran udara dan bahan api terlalu kaya.",
      s: "Penggunaan petrol tinggi, bau petrol atau asap hitam.",
      p: "Injector bocor, tekanan bahan api tinggi atau sensor MAF/ECT."
    },
    pro: {
      diagnosis: "Semak fuel trim, bacaan MAF/ECT, tekanan bahan api dan keadaan injector.",
      tests: ["Ujian tekanan bahan api", "Pemeriksaan kebocoran injector", "Semak bacaan sensor ketika cold start dan warm engine"],
      repair: "Baiki punca campuran kaya selepas ujian. Periksa juga penapis udara dan sistem purge EVAP jika berkaitan."
    },
    elite: {
      analysis: "Fuel trim negatif menunjukkan ECU mengurangkan bahan api. Tentukan sama ada punca berkaitan input sensor, tekanan bahan api atau kebocoran injector.",
      advanced: ["Analisis fuel trim ketika idle dan load", "Uji injector leakage dan balance", "Semak purge valve serta sensor ECT"],
      caseStudy: "Jika P0172 disertai bau petrol selepas enjin dimatikan, periksa kemungkinan injector bocor dan tekanan bahan api yang tidak turun mengikut spesifikasi."
    }
  },
  {
    c: "P0300",
    n: "Random / Multiple Cylinder Misfire",
    free: {
      m: "Misfire berlaku secara rawak atau melibatkan beberapa silinder.",
      s: "Enjin bergegar, kuasa lemah dan check engine berkelip.",
      p: "Spark plug, ignition coil, injector, compression atau kebocoran udara."
    },
    pro: {
      diagnosis: "Semak misfire counter, freeze frame, ignition, fuel delivery dan compression.",
      tests: ["Pemeriksaan spark plug dan coil", "Ujian injector dan tekanan bahan api", "Ujian compression atau leak-down jika perlu"],
      repair: "Baiki komponen yang gagal ujian. Jika lampu check engine berkelip, hentikan pemanduan jika selamat kerana catalytic converter boleh rosak."
    },
    elite: {
      analysis: "Kenal pasti sama ada misfire berlaku ketika idle, acceleration, cold start atau beban tinggi. Gunakan misfire counter dan korelasi crankshaft jika peralatan menyokong.",
      advanced: ["Analisis ignition waveform", "Ujian relative compression", "Bandingkan fuel trim dengan misfire counter"],
      caseStudy: "Misfire pada beberapa silinder boleh berpunca daripada masalah bersama seperti tekanan bahan api atau kebocoran intake, bukan semestinya semua coil rosak."
    }
  },
  {
    c: "P0301",
    n: "Cylinder 1 Misfire Detected",
    free: {
      m: "ECU mengesan misfire pada silinder nombor 1.",
      s: "Enjin bergegar, idle tidak stabil dan kuasa kurang.",
      p: "Spark plug, coil, injector atau compression silinder 1."
    },
    pro: {
      diagnosis: "Periksa plug dan coil silinder 1. Jika reka bentuk membenarkan, lakukan pertukaran silang coil untuk melihat sama ada misfire berpindah.",
      tests: ["Pemeriksaan spark plug", "Ujian coil dan injector", "Ujian compression silinder 1"],
      repair: "Baiki punca yang disahkan. Jangan terus menukar semua komponen."
    },
    elite: {
      analysis: "Gunakan misfire counter, ignition waveform dan ujian mekanikal untuk membezakan kegagalan ignition, fuel dan compression.",
      advanced: ["Coil swap test jika sesuai", "Injector balance test", "Compression dan leak-down test"],
      caseStudy: "Jika P0301 kekal pada silinder 1 selepas coil ditukar silang, periksa plug, injector, wiring dan compression sebelum membuat keputusan."
    }
  },
  {
    c: "P0325",
    n: "Knock Sensor 1 Circuit",
    free: {
      m: "Masalah pada litar sensor ketukan nombor 1.",
      s: "Check engine dan kemungkinan prestasi enjin menurun.",
      p: "Sensor, connector atau wiring bermasalah."
    },
    pro: {
      diagnosis: "Periksa lokasi sensor, connector, wiring dan ground berdasarkan manual model.",
      tests: ["Pemeriksaan fizikal harness", "Ujian continuity mengikut diagram", "Semakan signal sensor dengan alat sesuai"],
      repair: "Baiki litar atau ganti sensor jika ujian mengesahkan kerosakan."
    },
    elite: {
      analysis: "Sistem knock control menggunakan signal sensor untuk mengesan getaran tertentu. Kaedah ujian bergantung pada sensor resonant atau broadband.",
      advanced: ["Semak waveform dan gangguan elektrik", "Periksa torque pemasangan sensor mengikut OEM", "Semak routing harness dan shielding"],
      caseStudy: "Kod litar knock sensor boleh berpunca daripada harness atau pemasangan yang tidak betul. Jangan mengetuk blok enjin secara rawak untuk menguji sensor."
    }
  },
  {
    c: "P0328",
    n: "Knock Sensor 1 Circuit High Input",
    free: {
      m: "Isyarat voltan litar sensor ketukan terlalu tinggi.",
      s: "Check engine, kuasa berkurang atau penggunaan petrol meningkat.",
      p: "Sensor rosak, litar terbuka, short to voltage atau connector bermasalah."
    },
    pro: {
      diagnosis: "Periksa connector, wiring, ground dan signal mengikut spesifikasi pengeluar.",
      tests: ["Periksa litar terbuka dan short-to-voltage", "Uji bekalan dan ground jika berkenaan", "Bandingkan signal dengan spesifikasi OEM"],
      repair: "Baiki litar atau ganti sensor selepas diagnosis. Nilai voltan berbeza mengikut kenderaan."
    },
    elite: {
      analysis: "Tentukan jenis litar sensor dan strategi ECU sebelum mentafsir bacaan voltan. Jangan gunakan nilai universal untuk semua model.",
      advanced: ["Ukur signal menggunakan oscilloscope jika diperlukan", "Periksa shielding dan connector corrosion", "Sahkan torque pemasangan dan routing harness"],
      caseStudy: "Jika kod muncul selepas kerja pembaikan enjin, periksa connector dan routing harness yang mungkin tertarik atau terhimpit."
    }
  },
  {
    c: "P0335",
    n: "Crankshaft Position Sensor A Circuit",
    free: {
      m: "Masalah pada litar sensor kedudukan crankshaft A.",
      s: "Enjin sukar hidup, mati tiba-tiba atau tidak boleh start.",
      p: "Sensor CKP, wiring, connector atau reluctor."
    },
    pro: {
      diagnosis: "Semak bacaan RPM ketika cranking. Periksa connector, wiring dan keadaan sensor.",
      tests: ["Semak RPM live data", "Uji bekalan, ground dan signal", "Periksa reluctor dan jarak sensor jika boleh diakses"],
      repair: "Baiki litar atau ganti sensor jika ujian mengesahkan. Semak prosedur relearn jika diperlukan."
    },
    elite: {
      analysis: "Kegagalan signal CKP boleh menyebabkan ECU kehilangan rujukan kedudukan crankshaft. Bezakan masalah sensor, reluctor dan pendawaian.",
      advanced: ["Analisis waveform CKP", "Bandingkan signal CKP/CMP", "Periksa dropout signal ketika enjin panas"],
      caseStudy: "Jika enjin mati selepas panas dan hidup semula selepas sejuk, uji signal CKP ketika keadaan kegagalan berlaku."
    }
  },
  {
    c: "P0340",
    n: "Camshaft Position Sensor A Circuit",
    free: {
      m: "Masalah pada litar sensor kedudukan camshaft A.",
      s: "Sukar start, enjin tidak lancar atau kuasa berkurang.",
      p: "Sensor CMP, wiring, connector atau timing enjin."
    },
    pro: {
      diagnosis: "Semak signal sensor, connector, wiring dan timing menggunakan prosedur servis.",
      tests: ["Uji bekalan dan ground", "Periksa signal CMP", "Semak korelasi CKP/CMP jika alat menyokong"],
      repair: "Baiki wiring, sensor atau timing berdasarkan diagnosis."
    },
    elite: {
      analysis: "Nilai korelasi crankshaft dan camshaft serta kemungkinan masalah timing mekanikal atau sistem variable valve timing.",
      advanced: ["Analisis waveform CKP dan CMP", "Semak camshaft actuator dan oil control jika berkaitan", "Periksa timing chain/belt mengikut prosedur OEM"],
      caseStudy: "Jika P0340 disertai bunyi timing atau masalah start, periksa korelasi CKP/CMP dan timing mekanikal sebelum mengganti sensor."
    }
  },
  {
    c: "P0401",
    n: "Exhaust Gas Recirculation Flow Insufficient",
    free: {
      m: "Aliran sistem EGR tidak mencukupi.",
      s: "Check engine, prestasi menurun atau knocking dalam keadaan tertentu.",
      p: "Saluran EGR tersumbat, valve atau sensor berkaitan."
    },
    pro: {
      diagnosis: "Periksa laluan EGR, valve dan arahan/feedback scanner. Pastikan sistem menggunakan EGR sebelum menjalankan ujian.",
      tests: ["Pemeriksaan saluran karbon", "Ujian command dan feedback EGR", "Periksa sensor differential pressure jika dilengkapi"],
      repair: "Bersihkan atau baiki sistem EGR jika disahkan. Gunakan prosedur pengeluar."
    },
    elite: {
      analysis: "Bandingkan commanded EGR dengan actual response. Reka bentuk EGR berbeza mengikut enjin dan tidak semua kenderaan menggunakan sistem yang sama.",
      advanced: ["Semak sensor feedback dan differential pressure", "Uji actuator EGR dengan scan tool", "Periksa laluan intake dan exhaust"],
      caseStudy: "Jika valve bergerak tetapi aliran tidak mencukupi, periksa kemungkinan saluran EGR tersumbat."
    }
  },
  {
    c: "P0420",
    n: "Catalyst System Efficiency Below Threshold",
    free: {
      m: "Kecekapan catalytic converter di bawah ambang yang ditetapkan.",
      s: "Check engine dan mungkin penggunaan petrol meningkat.",
      p: "Catalytic converter, exhaust leak atau sensor oksigen."
    },
    pro: {
      diagnosis: "Periksa kebocoran ekzos dan analisis data sensor O2 sebelum serta selepas catalytic converter.",
      tests: ["Pemeriksaan exhaust leak", "Analisis waveform sensor O2", "Semak misfire dan fuel trim yang boleh merosakkan catalytic converter"],
      repair: "Sahkan sensor serta keadaan catalytic converter sebelum mengganti."
    },
    elite: {
      analysis: "Nilai keupayaan catalytic converter menyimpan oksigen berdasarkan corak sensor upstream dan downstream. Strategi monitor berbeza mengikut OEM.",
      advanced: ["Analisis O2 sensor waveform", "Semak suhu dan keadaan catalytic converter", "Periksa sejarah misfire serta campuran bahan api"],
      caseStudy: "Jika P0420 muncul bersama misfire terdahulu, selesaikan punca misfire dahulu dan jalankan semula monitor sebelum menghukum catalytic converter."
    }
  },
  {
    c: "P0442",
    n: "EVAP System Small Leak Detected",
    free: {
      m: "Sistem EVAP mengesan kebocoran kecil.",
      s: "Biasanya check engine tanpa perubahan prestasi ketara.",
      p: "Penutup tangki, hos EVAP atau sambungan bocor."
    },
    pro: {
      diagnosis: "Periksa penutup tangki, hos, sambungan dan komponen EVAP. Gunakan smoke test jika perlu.",
      tests: ["Pemeriksaan fuel cap dan seal", "Smoke test tekanan rendah mengikut spesifikasi", "Ujian purge dan vent valve"],
      repair: "Baiki kebocoran yang ditemui dan jalankan semula ujian EVAP."
    },
    elite: {
      analysis: "Sistem EVAP mengawal wap bahan api. Prosedur ujian mesti menggunakan tekanan yang dibenarkan oleh pengeluar.",
      advanced: ["Asingkan laluan purge dan vent", "Periksa fuel tank pressure sensor", "Gunakan smoke machine yang sesuai untuk EVAP"],
      caseStudy: "Kebocoran kecil boleh berlaku pada seal fuel cap atau sambungan hos. Asingkan bahagian sistem secara berperingkat."
    }
  },
  {
    c: "P0455",
    n: "EVAP System Large Leak Detected",
    free: {
      m: "Sistem EVAP mengesan kebocoran besar.",
      s: "Check engine dan kemungkinan bau petrol.",
      p: "Penutup tangki longgar, hos tercabut atau kebocoran EVAP."
    },
    pro: {
      diagnosis: "Periksa fuel cap, hos EVAP, sambungan dan valve. Jalankan smoke test mengikut prosedur.",
      tests: ["Pemeriksaan hos tercabut atau pecah", "Ujian purge dan vent valve", "Smoke test tekanan rendah"],
      repair: "Baiki kebocoran dan uji semula sistem. Jangan gunakan tekanan udara berlebihan."
    },
    elite: {
      analysis: "Bezakan kebocoran fizikal daripada kegagalan valve atau sensor tekanan tangki melalui ujian pengasingan sistem.",
      advanced: ["Semak fuel tank pressure sensor", "Uji sealing purge dan vent valve", "Periksa sambungan filler neck dan canister"],
      caseStudy: "Jika smoke keluar dari sambungan hos, baiki titik kebocoran dahulu sebelum mengganti komponen EVAP lain."
    }
  },
  {
    c: "P0500",
    n: "Vehicle Speed Sensor Malfunction",
    free: {
      m: "Isyarat sensor kelajuan kenderaan tidak normal.",
      s: "Speedometer tidak berfungsi atau pertukaran gear terganggu.",
      p: "Sensor kelajuan, wiring atau sistem ABS/ECU bergantung model."
    },
    pro: {
      diagnosis: "Semak live data kelajuan kenderaan dan tentukan sumber signal berdasarkan diagram model. Sesetengah kenderaan menggunakan signal ABS.",
      tests: ["Bandingkan speedometer dengan live data", "Periksa sensor dan wiring", "Semak wheel speed data jika berkaitan"],
      repair: "Baiki sensor atau wiring selepas punca dikenal pasti."
    },
    elite: {
      analysis: "Kenal pasti sama ada vehicle speed diperoleh daripada transmission output speed sensor, ABS module atau modul lain.",
      advanced: ["Bandingkan semua wheel speed", "Analisis waveform sensor jika jenis aktif/pasif", "Periksa rangkaian komunikasi modul jika signal dikongsi"],
      caseStudy: "Jika speedometer dan sistem transmisi terganggu serentak, semak sumber signal kelajuan dan komunikasi modul sebelum mengganti sensor."
    }
  }
];
