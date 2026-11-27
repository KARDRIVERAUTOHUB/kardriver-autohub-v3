"use strict";

module.exports = {
  "P0684": {
    "n": "Glow Plug Control Module to PCM Communication Circuit Range/Performance",
    "free": {
      "m": "Kod ini menunjukkan komunikasi antara glow plug control module dengan PCM berada di luar julat atau prestasi yang dijangka. Fokus diagnosis ialah komunikasi modul, bekalan kuasa dan keserasian konfigurasi.",
      "s": "Sistem pre-glow diesel mungkin beroperasi tidak konsisten, lampu amaran enjin menyala atau kod komunikasi muncul secara berselang. Gejala bergantung pada suhu enjin dan strategi modul.",
      "p": "Punca termasuk bekalan kuasa atau ground modul tidak stabil, connector berkarat, pendawaian komunikasi terganggu, gangguan rangkaian atau ketidakpadanan konfigurasi/perisian."
    },
    "pro": {
      "diagnosis": "Sahkan P0684 dan kenal pasti jenis komunikasi glow plug module dengan PCM melalui dokumentasi OEM. Rekod freeze-frame, kod berkaitan dan status komunikasi sebelum menguji litar.",
      "tests": [
        "Periksa connector glow plug module dan PCM, keadaan terminal, kakisan serta laluan harness komunikasi berdasarkan rajah OEM.",
        "Semak bekalan kuasa dan ground modul ketika sistem diaktifkan; bandingkan bacaan serta kejatuhan voltan dengan spesifikasi pengeluar.",
        "Pantau status komunikasi dan kod rangkaian menggunakan scan tool yang menyokong modul berkenaan; periksa gangguan berselang ketika harness digerakkan secara terkawal."
      ],
      "repair": "Pulihkan bekalan kuasa, ground, connector atau pendawaian yang terbukti bermasalah. Semak keserasian modul dan konfigurasi mengikut OEM sebelum memadam kod serta mengesahkan komunikasi semula."
    },
    "elite": {
      "analysis": "P0684 ialah isu julat/prestasi komunikasi, bukan bukti automatik bahawa glow plug atau modul telah rosak. Bezakan kehilangan komunikasi, bekalan modul tidak stabil dan ketidakpadanan konfigurasi melalui data rangkaian.",
      "advanced": [
        "Bandingkan status komunikasi, voltan bekalan modul dan masa kemunculan DTC untuk menentukan sama ada gangguan berlaku ketika cold start atau semasa operasi.",
        "Periksa integriti rangkaian komunikasi mengikut topologi dan prosedur OEM; jangan mengandaikan protokol atau pinout yang sama bagi semua kenderaan.",
        "Jika komunikasi pulih selepas pembaikan, jalankan cold-start verification dan semak semula DTC serta status pre-glow."
      ],
      "caseStudy": "Sebuah diesel merekodkan P0684 secara berselang ketika cold start. Juruteknik mendapati bekalan modul stabil tetapi connector komunikasi mempunyai terminal longgar. Selepas connector dipulihkan, komunikasi dan operasi pre-glow disahkan melalui ujian cold start."
    }
  },
  "P0685": {
    "n": "ECM/PCM Power Relay Control Circuit/Open",
    "free": {
      "m": "Kod ini menunjukkan litar kawalan relay kuasa ECM/PCM terbuka atau terputus. Diagnosis perlu membezakan litar coil relay, bekalan kuasa dan laluan kawalan modul.",
      "s": "Enjin mungkin tidak boleh dihidupkan, mati secara tiba-tiba atau ECM/PCM kehilangan kuasa. Sesetengah kenderaan turut menunjukkan beberapa DTC komunikasi.",
      "p": "Punca termasuk relay gagal, fius putus, terminal relay longgar, litar kawalan terbuka, sambungan kuasa rosak atau pendawaian terputus."
    },
    "pro": {
      "diagnosis": "Kenal pasti relay kuasa ECM/PCM dan laluan kawalannya melalui rajah OEM. Sahkan sama ada masalah berada pada relay, litar coil, bekalan atau driver modul.",
      "tests": [
        "Periksa fius, relay, soket dan terminal untuk kesan panas, kakisan atau sambungan longgar mengikut susun atur OEM.",
        "Dengan bekalan diputuskan mengikut prosedur keselamatan, uji kesinambungan laluan kawalan dan coil relay berdasarkan spesifikasi pengeluar.",
        "Pantau arahan relay dan output kuasa ECM/PCM ketika sistem diaktifkan; tentukan sama ada arahan kawalan hadir tetapi relay gagal bertindak."
      ],
      "repair": "Ganti relay atau fius hanya selepas punca kegagalan dikenal pasti. Baiki litar terbuka, terminal atau sambungan kuasa dan sahkan ECM/PCM menerima bekalan stabil semasa start serta operasi."
    },
    "elite": {
      "analysis": "P0685 berkaitan litar kawalan relay. Bunyi klik relay sahaja tidak membuktikan sentuhan kuasa dan laluan kawalan berfungsi dengan betul. Asingkan pemeriksaan coil, contact dan output bekalan.",
      "advanced": [
        "Bezakan laluan coil relay daripada contact kuasa dan laluan sense menggunakan rajah OEM sebelum membuat ukuran.",
        "Periksa kesinambungan harness kawalan serta keadaan driver modul dengan prosedur yang ditetapkan pengeluar.",
        "Pantau bekalan ECM/PCM ketika cranking dan ketika beban elektrik berubah untuk mengesan kehilangan kuasa berselang."
      ],
      "caseStudy": "Kenderaan mengalami no-start dan merekodkan P0685. Pemeriksaan mendapati relay menerima arahan kawalan tetapi terminal soket mempunyai sambungan terbuka. Selepas terminal dibaiki, bekalan ECM/PCM dan proses menghidupkan enjin diuji semula."
    }
  },
  "P0686": {
    "n": "ECM/PCM Power Relay Control Circuit Low",
    "free": {
      "m": "Kod ini menunjukkan voltan rendah pada litar kawalan relay kuasa ECM/PCM berbanding keadaan yang dijangka oleh modul.",
      "s": "Enjin mungkin sukar dihidupkan, ECM/PCM reset atau operasi enjin terhenti apabila bekalan kawalan relay tidak mencapai keadaan yang diperlukan.",
      "p": "Punca berpotensi termasuk litar kawalan pintas ke ground, bekalan kawalan lemah, terminal berintangan tinggi, relay rosak atau driver kawalan bermasalah."
    },
    "pro": {
      "diagnosis": "Sahkan P0686 dan kenal pasti terminal kawalan relay berdasarkan rajah OEM. Bandingkan arahan relay dengan keadaan elektrik sebenar untuk mengasingkan punca voltan rendah.",
      "tests": [
        "Periksa terminal relay, connector dan harness untuk kakisan, kelembapan, kerosakan penebat atau sentuhan ke ground.",
        "Ukur keadaan litar kawalan dan kejatuhan voltan mengikut prosedur OEM; jangan gunakan nilai ambang universal.",
        "Bandingkan arahan driver relay dengan respons litar ketika relay diperintah aktif dan periksa sama ada voltan rendah berpunca daripada beban atau harness."
      ],
      "repair": "Baiki pintasan ke ground, sambungan berintangan tinggi atau relay yang gagal ujian. Uji semula litar kawalan dan kestabilan bekalan ECM/PCM mengikut prosedur OEM."
    },
    "elite": {
      "analysis": "P0686 menunjukkan keadaan rendah pada litar kawalan, tetapi tidak menentukan komponen yang rosak. Pemeriksaan perlu membezakan pintasan ke ground, beban berlebihan dan kegagalan driver.",
      "advanced": [
        "Analisis voltan kawalan ketika relay OFF dan ON berdasarkan strategi driver yang digunakan oleh kenderaan.",
        "Asingkan relay dan harness mengikut prosedur OEM untuk menentukan sama ada beban relay menyebabkan keadaan rendah.",
        "Jika harness dan relay disahkan baik, nilai driver modul hanya selepas bekalan kuasa, ground dan syarat pengaktifan dipastikan betul."
      ],
      "caseStudy": "P0686 muncul bersama simptom enjin terhenti. Ujian menunjukkan litar kawalan mengalami sentuhan ke ground pada bahagian harness. Selepas kerosakan penebat dibaiki, arahan relay dan bekalan ECM/PCM kembali normal."
    }
  },
  "P0687": {
    "n": "ECM/PCM Power Relay Control Circuit High",
    "free": {
      "m": "Kod ini menunjukkan voltan tinggi pada litar kawalan relay kuasa ECM/PCM berbanding keadaan yang dijangka oleh modul.",
      "s": "Enjin mungkin gagal dihidupkan, relay tidak bertindak mengikut arahan atau kod muncul selepas kerja pendawaian dan pembaikan sistem kuasa.",
      "p": "Punca termasuk litar kawalan pintas ke bekalan voltan, sambungan salah, terminal rosak atau driver kawalan gagal. Tafsiran litar terbuka bergantung pada strategi pemantauan OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0687 dan periksa jenis driver serta keadaan normal litar relay melalui dokumentasi OEM. Tentukan sama ada voltan tinggi berpunca daripada pintasan bekalan atau kegagalan kawalan.",
      "tests": [
        "Periksa sama ada harness kawalan tersentuh dengan litar bekalan voltan lain atau mempunyai sambungan silang selepas kerja pembaikan.",
        "Uji voltan pada litar kawalan ketika relay tidak diaktifkan dan ketika diarahkan aktif mengikut strategi serta spesifikasi OEM.",
        "Asingkan relay dan harness mengikut prosedur pengeluar untuk membezakan voltan luar daripada kegagalan driver modul."
      ],
      "repair": "Pulihkan sambungan salah atau pintasan ke bekalan voltan dan baiki terminal yang rosak. Sahkan operasi relay melalui ujian arahan ON/OFF sebelum mempertimbangkan penggantian modul."
    },
    "elite": {
      "analysis": "P0687 ialah keadaan tinggi pada litar kawalan relay. Jangan terus menggantikan ECM/PCM kerana voltan luar boleh datang daripada sambungan silang, kerosakan harness atau relay yang tidak sesuai.",
      "advanced": [
        "Bandingkan bacaan litar kawalan dengan keadaan arahan relay dan strategi output driver yang dinyatakan OEM.",
        "Periksa sejarah pembaikan harness dan aksesori elektrik tambahan yang mungkin menyuntik voltan ke litar kawalan.",
        "Jika voltan kekal tidak normal selepas relay dan harness diasingkan mengikut prosedur, jalankan diagnosis driver modul sebelum keputusan penggantian."
      ],
      "caseStudy": "Selepas pemasangan aksesori elektrik, P0687 muncul dan relay kuasa tidak beroperasi dengan betul. Pemeriksaan mendapati sambungan aksesori memasukkan voltan ke laluan kawalan. Pendawaian dipisahkan dan fungsi relay disahkan semula."
    }
  },
  "P0688": {
    "n": "ECM/PCM Power Relay Sense Circuit/Open",
    "free": {
      "m": "Kod ini menunjukkan litar sense atau maklum balas relay kuasa ECM/PCM terbuka. Modul tidak menerima isyarat pengesahan bekalan seperti yang dijangka.",
      "s": "Enjin mungkin tidak hidup, modul kehilangan kuasa atau P0688 muncul walaupun relay menghasilkan bunyi klik.",
      "p": "Punca termasuk wayar sense terputus, terminal longgar, fius berkaitan gagal, connector rosak atau laluan maklum balas relay terbuka."
    },
    "pro": {
      "diagnosis": "Bezakan laluan sense daripada laluan coil dan contact kuasa relay melalui wiring diagram OEM. Sahkan sama ada bekalan relay wujud tetapi isyarat maklum balas tidak sampai ke ECM/PCM.",
      "tests": [
        "Periksa terminal sense pada relay, connector dan ECM/PCM untuk pin tertolak, kakisan atau sambungan terbuka.",
        "Uji kesinambungan laluan sense dari titik relay ke modul selepas bekalan diputuskan mengikut prosedur OEM.",
        "Bandingkan keadaan output relay dengan PID atau status pengesanan bekalan ECM/PCM jika data tersebut disokong scan tool."
      ],
      "repair": "Baiki litar sense terbuka, terminal atau fius yang disahkan rosak. Sahkan laluan maklum balas dan bekalan ECM/PCM berfungsi sebelum memadam kod."
    },
    "elite": {
      "analysis": "P0688 merujuk kepada laluan pengesanan relay, yang mungkin berasingan daripada laluan coil dan contact. Relay berbunyi klik tidak membuktikan isyarat sense sampai ke modul.",
      "advanced": [
        "Petakan laluan contact kuasa dan laluan sense secara berasingan menggunakan rajah OEM.",
        "Bandingkan voltan pada titik output relay dengan input sense modul untuk mengenal pasti lokasi kehilangan isyarat.",
        "Selepas pembaikan, sahkan status sense ketika relay diaktifkan dan periksa sama ada DTC kembali dalam keadaan operasi asal."
      ],
      "caseStudy": "Relay kuasa berbunyi klik tetapi enjin tidak dapat dihidupkan dan P0688 direkodkan. Ujian menunjukkan contact relay berfungsi tetapi wayar sense terputus. Selepas laluan sense dibaiki, ECM/PCM mengesan bekalan seperti yang dijangka."
    }
  },
  "P0689": {
    "n": "ECM/PCM Power Relay Sense Circuit Low",
    "free": {
      "m": "Kod ini menunjukkan voltan rendah pada litar sense relay kuasa ECM/PCM. Isyarat maklum balas bekalan yang diterima modul berada di bawah julat yang dijangka.",
      "s": "Enjin mungkin sukar dihidupkan, ECM/PCM reset atau bekalan modul menjadi tidak stabil terutama ketika beban elektrik meningkat.",
      "p": "Punca termasuk output relay jatuh, rintangan tinggi pada terminal, fius atau sambungan rosak, serta litar sense pintas ke ground."
    },
    "pro": {
      "diagnosis": "Sahkan P0689 dan ukur laluan sense serta output relay berdasarkan rajah OEM. Tentukan sama ada voltan rendah berlaku pada output kuasa atau hanya pada laluan maklum balas.",
      "tests": [
        "Periksa fius, terminal relay dan sambungan kuasa untuk kakisan atau rintangan sentuhan yang tinggi.",
        "Bandingkan voltan output relay dengan voltan pada titik sense ECM/PCM ketika relay aktif mengikut prosedur OEM.",
        "Ukur kejatuhan voltan pada laluan berkaitan dan periksa kemungkinan pintasan ke ground tanpa melebihi had ujian pengeluar."
      ],
      "repair": "Baiki sambungan berintangan tinggi, fius, relay atau litar sense yang terbukti gagal. Sahkan kestabilan bekalan ECM/PCM ketika cranking dan ketika beban elektrik digunakan."
    },
    "elite": {
      "analysis": "P0689 ialah bacaan rendah pada litar sense. Perbezaan antara voltan output relay dan input sense membantu membezakan masalah contact kuasa daripada kerosakan harness maklum balas.",
      "advanced": [
        "Bandingkan bacaan pada output relay dan pin sense modul ketika keadaan beban yang menghasilkan DTC.",
        "Periksa sama ada kejatuhan voltan berlaku pada contact relay, sambungan fius atau cabang harness sense.",
        "Nilai kestabilan bekalan dan ground ECM/PCM sebelum menyimpulkan bahawa input sense atau modul rosak."
      ],
      "caseStudy": "P0689 muncul ketika enjin dihidupkan. Output relay didapati lebih tinggi daripada bacaan pada input sense kerana sambungan terminal sense berintangan tinggi. Terminal dipulihkan dan bacaan dibandingkan semula mengikut spesifikasi OEM."
    }
  },
  "P0690": {
    "n": "ECM/PCM Power Relay Sense Circuit High",
    "free": {
      "m": "Kod ini menunjukkan voltan tinggi pada litar sense relay kuasa ECM/PCM berbanding julat yang dijangka oleh sistem.",
      "s": "Kod mungkin muncul selepas kerja pendawaian, relay tidak sepadan dipasang atau litar pemantauan menerima isyarat bekalan yang tidak sepatutnya.",
      "p": "Punca termasuk pintasan litar sense ke bekalan voltan, sambungan sense salah, relay tidak sesuai atau kerosakan pada litar pemantauan."
    },
    "pro": {
      "diagnosis": "Kenal pasti pin sense dan julat operasi melalui dokumentasi OEM. Periksa sama ada voltan tinggi berpunca daripada sambungan silang, relay yang salah atau kegagalan input pemantauan.",
      "tests": [
        "Periksa nombor komponen relay dan susunan terminal berbanding spesifikasi OEM sebelum membuat ukuran.",
        "Periksa harness sense untuk sentuhan dengan bekalan voltan lain, terminal tersalah kedudukan atau pembaikan terdahulu yang tidak tepat.",
        "Bandingkan voltan pada titik sense dan output relay ketika OFF serta ON mengikut prosedur pengeluar."
      ],
      "repair": "Betulkan relay atau susunan terminal yang tidak sepadan dan baiki pintasan ke bekalan voltan. Sahkan bacaan sense kembali dalam julat OEM sebelum pengesahan akhir."
    },
    "elite": {
      "analysis": "P0690 berkaitan voltan tinggi pada input sense, bukan semestinya output kuasa berlebihan. Pengasingan titik pengukuran diperlukan untuk mengelakkan penggantian relay atau PCM tanpa bukti.",
      "advanced": [
        "Bandingkan identiti relay, konfigurasi terminal dan strategi pemantauan sense dengan dokumentasi khusus kenderaan.",
        "Asingkan litar sense daripada cabang bekalan mengikut prosedur OEM untuk mencari sumber voltan luar.",
        "Jika bacaan input modul masih tinggi selepas harness dan relay disahkan betul, jalankan ujian input pemantauan mengikut prosedur pengeluar."
      ],
      "caseStudy": "Selepas relay gantian dipasang, P0690 muncul. Pemeriksaan nombor alat ganti dan susunan terminal mendapati relay tidak sepadan dengan konfigurasi kenderaan. Relay yang betul dipasang dan bacaan sense disahkan semula."
    }
  },
  "P0695": {
    "n": "Fan 3 Control Circuit Low",
    "free": {
      "m": "Kod ini menunjukkan voltan rendah pada litar kawalan kipas penyejuk nombor 3. Ketersediaan kipas ketiga dan reka bentuk kawalannya bergantung pada model kenderaan.",
      "s": "Jika sistem mempunyai Fan 3, kipas tersebut mungkin tidak beroperasi seperti diarahkan. Suhu enjin boleh meningkat atau sistem penyejukan menggunakan strategi perlindungan.",
      "p": "Punca termasuk litar kawalan pintas ke ground, relay atau driver kipas rosak, beban motor berlebihan atau pendawaian kawalan bermasalah."
    },
    "pro": {
      "diagnosis": "Sahkan kenderaan benar-benar dilengkapi Fan 3 dan kenal pasti sama ada kawalan menggunakan relay, modul kipas atau driver elektronik. Periksa arahan kipas dan status suhu melalui scan tool.",
      "tests": [
        "Periksa konfigurasi kipas, fius, relay, connector dan harness Fan 3 menggunakan rajah khusus kenderaan.",
        "Pantau arahan Fan 3 dan status maklum balas jika tersedia; bandingkan dengan operasi sebenar tanpa menyentuh kipas yang boleh bermula secara automatik.",
        "Periksa litar kawalan untuk pintasan ke ground, beban motor berlebihan atau kegagalan driver mengikut prosedur dan spesifikasi OEM."
      ],
      "repair": "Baiki harness, connector, relay, modul atau motor hanya selepas ujian mengesahkan komponen gagal. Sahkan Fan 3 bertindak mengikut arahan dan suhu enjin kekal terkawal."
    },
    "elite": {
      "analysis": "P0695 merujuk kepada keadaan rendah litar kawalan Fan 3. Jangan menganggap semua kenderaan mempunyai tiga kipas atau menggunakan litar relay yang sama. Utamakan keselamatan kerana kipas boleh hidup tanpa amaran.",
      "advanced": [
        "Kenal pasti strategi kawalan Fan 3 termasuk relay berasingan, modul kipas atau kawalan PWM jika digunakan oleh kenderaan.",
        "Bandingkan arahan output, maklum balas dan keadaan litar untuk membezakan kerosakan motor daripada kerosakan kawalan.",
        "Selepas pembaikan, jalankan ujian pengaktifan kipas menggunakan fungsi scan tool OEM dan pantau suhu penyejuk."
      ],
      "caseStudy": "Sebuah kenderaan yang dilengkapi Fan 3 merekodkan P0695 ketika suhu meningkat. Ujian menunjukkan litar kawalan mempunyai pintasan ke ground pada harness berhampiran connector. Harness dibaiki dan operasi kipas disahkan menggunakan ujian pengaktifan."
    }
  },
  "P0696": {
    "n": "Fan 3 Control Circuit High",
    "free": {
      "m": "Kod ini menunjukkan voltan tinggi pada litar kawalan kipas penyejuk nombor 3. Tafsiran perlu mengambil kira sama ada kenderaan mempunyai Fan 3 dan jenis driver yang digunakan.",
      "s": "Kipas berkaitan mungkin sentiasa hidup, tidak mengikut arahan atau beroperasi dalam mod perlindungan. Gejala bergantung pada strategi kawalan penyejukan.",
      "p": "Punca termasuk pintasan ke bekalan voltan, driver kawalan rosak, relay melekat atau litar kawalan terbuka mengikut reka bentuk sistem."
    },
    "pro": {
      "diagnosis": "Sahkan konfigurasi Fan 3 dan jenis kawalan melalui rajah OEM. Bandingkan arahan kipas dengan keadaan output untuk mengenal pasti sama ada voltan tinggi datang daripada harness, relay atau driver.",
      "tests": [
        "Periksa harness Fan 3 untuk kerosakan penebat atau sentuhan dengan bekalan voltan yang tidak sepatutnya.",
        "Bandingkan status arahan Fan 3 dengan keadaan kipas dan bacaan litar kawalan menggunakan kaedah OEM.",
        "Periksa relay yang melekat atau driver elektronik yang gagal mengawal output; elakkan memintas litar tanpa prosedur pengeluar."
      ],
      "repair": "Baiki pintasan voltan atau sambungan yang salah dan ganti relay atau driver hanya jika disahkan gagal. Sahkan kipas berhenti dan beroperasi mengikut arahan selepas pembaikan."
    },
    "elite": {
      "analysis": "P0696 menunjukkan keadaan tinggi pada litar kawalan Fan 3. Kipas yang sentiasa berputar boleh berpunca daripada relay melekat atau strategi fail-safe; bezakan keadaan arahan daripada output sebenar.",
      "advanced": [
        "Periksa sama ada output kekal aktif ketika arahan Fan 3 OFF dan bandingkan dengan strategi fail-safe OEM.",
        "Asingkan relay, harness dan driver mengikut prosedur untuk menentukan sumber voltan tinggi tanpa merosakkan modul.",
        "Jalankan ujian OFF/ON berperingkat dan pantau suhu penyejuk bagi memastikan kawalan kipas pulih sepenuhnya."
      ],
      "caseStudy": "Kipas ketiga kekal hidup dan P0696 direkodkan. Ujian arahan menunjukkan kipas sepatutnya OFF tetapi relay kawalan melekat. Relay diganti selepas pengesahan dan kitaran kawalan kipas diuji semula."
    }
  },
  "P0697": {
    "n": "Sensor Reference Voltage C Circuit/Open",
    "free": {
      "m": "Kod ini menunjukkan litar reference voltage C terbuka atau terputus. Satu atau beberapa sensor yang berkongsi bekalan rujukan C mungkin kehilangan voltan rujukan.",
      "s": "Beberapa sensor berkaitan boleh memberikan bacaan tidak munasabah, data live tidak stabil atau menghasilkan DTC tambahan pada sistem yang berkongsi reference C.",
      "p": "Punca termasuk wayar reference C putus, terminal longgar, connector terpisah atau sambungan cabang sensor terputus."
    },
    "pro": {
      "diagnosis": "Kenal pasti sensor dan cabang yang berkongsi reference voltage C melalui wiring diagram OEM. Periksa sama ada gangguan melibatkan satu cabang atau keseluruhan laluan rujukan.",
      "tests": [
        "Senaraikan sensor yang berkongsi reference C mengikut dokumentasi kenderaan dan periksa connector serta harness pada setiap cabang.",
        "Ukur kesinambungan laluan reference C dengan bekalan diputuskan mengikut prosedur OEM; jangan mengandaikan semua sensor berkongsi litar yang sama.",
        "Asingkan cabang sensor satu demi satu mengikut prosedur pengeluar untuk mengenal pasti lokasi litar terbuka atau sambungan terputus."
      ],
      "repair": "Pulihkan wayar reference C, terminal atau connector yang terbukti terbuka. Sahkan bekalan rujukan dan bacaan semua sensor berkaitan kembali normal mengikut spesifikasi OEM."
    },
    "elite": {
      "analysis": "P0697 boleh menjejaskan lebih daripada satu sensor jika mereka berkongsi reference C. DTC tambahan mungkin kesan daripada satu laluan rujukan yang terputus, bukan kerosakan serentak semua sensor.",
      "advanced": [
        "Gunakan rajah OEM untuk memetakan cabang reference C dan kenal pasti sensor yang berkongsi bekalan rujukan.",
        "Gabungkan DTC berkaitan dan live data sensor untuk menentukan sama ada gangguan berlaku pada cabang tertentu atau laluan utama.",
        "Selepas pembaikan, sahkan reference C serta kewajaran bacaan setiap sensor yang berkaitan dan lakukan drive cycle yang ditetapkan."
      ],
      "caseStudy": "Beberapa sensor merekodkan bacaan tidak munasabah bersama P0697. Pemeriksaan rajah OEM menunjukkan sensor tersebut berkongsi reference C. Satu connector cabang terpisah ditemui, disambungkan semula dan bacaan sensor disahkan pulih."
    }
  },
  "P0698": {
    "n": "Sensor Reference Voltage C Circuit Low",
    "free": {
      "m": "P0698 menunjukkan voltan rendah pada litar reference voltage C. Satu atau beberapa sensor yang berkongsi talian rujukan mungkin menerima voltan di bawah julat operasi.",
      "s": "Sensor berkaitan mungkin menunjukkan bacaan rendah atau tidak stabil. Beberapa DTC sensor boleh muncul serentak jika talian rujukan dikongsi.",
      "p": "Pintasan ke ground, sensor yang membebankan talian, kabel terhimpit, connector rosak atau output reference modul bermasalah."
    },
    "pro": {
      "diagnosis": "Kenal pasti semua sensor yang menggunakan reference C melalui rajah OEM. Bandingkan DTC dan live data untuk menentukan sama ada masalah melibatkan satu cabang atau keseluruhan talian.",
      "tests": [
        "Periksa harness reference C, connector dan cabang sensor untuk kerosakan penebat, kelembapan atau sentuhan ke ground.",
        "Ukur reference voltage pada titik pemeriksaan OEM dan bandingkan bacaan di modul dengan cabang sensor untuk mengesan lokasi kejatuhan voltan.",
        "Asingkan sensor yang berkongsi talian satu demi satu mengikut prosedur OEM untuk mengenal pasti sensor atau cabang yang membebankan litar."
      ],
      "repair": "Baiki pintasan ke ground, connector atau harness yang rosak. Ganti sensor hanya jika ujian pengasingan mengesahkan sensor tersebut membebankan talian. Sahkan semua bacaan sensor selepas pembaikan."
    },
    "elite": {
      "analysis": "P0698 boleh berpunca daripada satu sensor yang menarik turun talian reference bersama. Jangan menggantikan semua sensor yang menghasilkan DTC tambahan sebelum mengasingkan cabang litar.",
      "advanced": [
        "Petakan rangkaian reference C dan kenal pasti titik cabang serta sensor yang berkongsi bekalan berdasarkan wiring diagram OEM.",
        "Bandingkan bacaan pada output modul dan setiap cabang untuk mengesan lokasi kejatuhan voltan atau beban berlebihan.",
        "Selepas pengasingan dan pembaikan, sahkan kestabilan reference C serta kewajaran live data semua sensor berkaitan."
      ],
      "caseStudy": "Beberapa sensor merekodkan bacaan rendah bersama P0698. Ujian cabang mengikut rajah OEM mengenal pasti satu sensor yang membebankan reference C. Selepas sensor disahkan gagal dan diganti, bacaan sensor lain kembali normal."
    }
  },
  "P0699": {
    "n": "Sensor Reference Voltage C Circuit High",
    "free": {
      "m": "P0699 menunjukkan voltan tinggi pada litar reference voltage C berbanding julat yang dijangka oleh modul kawalan.",
      "s": "Satu atau beberapa sensor mungkin menunjukkan bacaan maksimum, tidak munasabah atau berada di luar julat. DTC tambahan boleh muncul pada sensor yang berkongsi reference C.",
      "p": "Pintasan ke bekalan voltan, ground sensor terbuka, sambungan salah atau gangguan pada litar pemantauan reference."
    },
    "pro": {
      "diagnosis": "Kenal pasti laluan reference C dan sensor berkaitan. Tentukan sama ada voltan tinggi hadir pada keseluruhan talian atau hanya pada cabang tertentu sebelum mengesyaki modul.",
      "tests": [
        "Periksa harness reference C untuk sentuhan dengan talian bekalan voltan lain, kerosakan penebat atau sambungan pembaikan yang salah.",
        "Bandingkan bacaan reference C pada modul dan connector sensor menggunakan kaedah pengukuran OEM.",
        "Periksa ground sensor serta asingkan cabang berkaitan mengikut prosedur pengeluar untuk mengenal pasti sumber voltan tinggi."
      ],
      "repair": "Baiki pintasan ke bekalan, ground terbuka atau sambungan salah yang telah disahkan. Sahkan reference C dan bacaan sensor kembali dalam julat spesifikasi OEM."
    },
    "elite": {
      "analysis": "P0699 menunjukkan keadaan tinggi pada talian reference C. Ground sensor yang terbuka atau voltan luar yang memasuki talian boleh mengubah bacaan beberapa sensor serentak.",
      "advanced": [
        "Gunakan topologi wiring OEM untuk membezakan talian reference, signal dan ground bagi setiap sensor yang berkongsi rangkaian.",
        "Bandingkan bacaan pada titik modul dan cabang sensor ketika keadaan sistem yang berkaitan untuk mengesan sumber voltan tinggi.",
        "Jika harness, ground dan sensor disahkan baik, nilai litar pemantauan reference modul mengikut prosedur OEM sebelum keputusan penggantian."
      ],
      "caseStudy": "P0699 muncul bersama beberapa bacaan sensor maksimum. Pemeriksaan menemui kerosakan penebat yang menyebabkan talian reference C bersentuhan dengan bekalan voltan. Selepas harness dibaiki, bacaan reference dan sensor disahkan semula."
    }
  },
  "P0703": {
    "n": "Brake Switch B Circuit",
    "free": {
      "m": "P0703 menunjukkan masalah pada litar Brake Switch B yang dipantau oleh sistem kawalan kenderaan. Status litar ini boleh digunakan oleh lebih daripada satu modul.",
      "s": "Lampu brek mungkin tidak berfungsi dengan betul, cruise control boleh dinyahaktifkan atau PCM/TCM menerima status pedal brek yang tidak sepadan.",
      "p": "Brake switch B rosak, pelarasan suis salah, connector longgar, pendawaian terbuka atau pintas."
    },
    "pro": {
      "diagnosis": "Bandingkan pergerakan pedal brek, operasi lampu brek dan status Brake Switch B pada scan tool. Kenal pasti logik A/B khusus kenderaan melalui dokumentasi OEM.",
      "tests": [
        "Periksa operasi lampu brek dan bandingkan status Brake Switch A dan B jika kedua-duanya tersedia pada live data.",
        "Pantau perubahan status Brake Switch B ketika pedal ditekan dan dilepaskan; bandingkan dengan logik suis OEM.",
        "Periksa pelarasan suis, connector, bekalan, ground dan kesinambungan litar B mengikut wiring diagram."
      ],
      "repair": "Laraskan atau ganti brake switch yang gagal ujian dan baiki connector atau harness. Sahkan operasi lampu brek, status suis dan fungsi sistem berkaitan sebelum kenderaan digunakan."
    },
    "elite": {
      "analysis": "Brake Switch A dan B boleh menggunakan logik isyarat berbeza. Status kedua-duanya tidak semestinya sama pada setiap kedudukan pedal. Diagnosis perlu mengikuti strategi OEM.",
      "advanced": [
        "Bandingkan kedua-dua status suis sepanjang keseluruhan gerakan pedal dan kenal pasti titik perubahan yang tidak mengikut logik OEM.",
        "Periksa sama ada status brek diterima dengan betul oleh PCM, TCM atau modul lain melalui live data yang tersedia.",
        "Selepas pembaikan, sahkan lampu brek dan fungsi interlock serta cruise control mengikut prosedur keselamatan pengeluar."
      ],
      "caseStudy": "Lampu brek berfungsi tetapi scan tool menunjukkan Brake Switch B tidak berubah ketika pedal ditekan. Pemeriksaan mendapati pelarasan suis tidak tepat. Selepas pelarasan, perubahan status suis dan fungsi sistem berkaitan disahkan."
    }
  },
  "P0704": {
    "n": "Clutch Switch Input Circuit Malfunction",
    "free": {
      "m": "P0704 menunjukkan kerosakan pada litar input clutch switch yang mengesan kedudukan pedal klac. Isyarat ini boleh digunakan untuk kebenaran menghidupkan enjin dan fungsi kawalan lain.",
      "s": "Enjin mungkin sukar dihidupkan, cruise control tidak berfungsi atau sistem tidak mengesan pedal klac ketika ditekan atau dilepaskan.",
      "p": "Clutch switch rosak atau tidak dilaras, connector longgar, pendawaian terbuka, pintas atau mekanisme pedal tidak mengaktifkan suis dengan betul."
    },
    "pro": {
      "diagnosis": "Kenal pasti jenis dan kedudukan clutch switch melalui dokumentasi OEM. Bandingkan gerakan pedal dengan status input clutch pada scan tool dan periksa sama ada perubahan berlaku pada titik yang ditetapkan.",
      "tests": [
        "Periksa pemasangan suis, stopper pedal dan gerakan mekanikal untuk memastikan pedal mengaktifkan suis sepenuhnya.",
        "Pantau status clutch switch ketika pedal ditekan dan dilepaskan serta bandingkan dengan logik operasi OEM.",
        "Uji bekalan, ground, kesinambungan dan perubahan signal pada connector suis mengikut wiring diagram serta prosedur pengeluar."
      ],
      "repair": "Laraskan atau ganti clutch switch yang disahkan gagal dan baiki connector atau harness. Sahkan fungsi pengesanan pedal, kebenaran start dan interlock berkaitan."
    },
    "elite": {
      "analysis": "P0704 tidak semestinya bermaksud suis rosak secara dalaman. Pelarasan, stopper pedal atau kegagalan mekanikal mengaktifkan suis boleh menghasilkan input yang salah.",
      "advanced": [
        "Kenal pasti sama ada sistem menggunakan satu atau lebih suis klac dan tentukan fungsi setiap input berdasarkan rajah OEM.",
        "Bandingkan status input clutch dengan kedudukan fizikal pedal serta syarat pengaktifan starter dan cruise control.",
        "Selepas pembaikan, lakukan ujian start dan pengesahan interlock mengikut prosedur keselamatan pengeluar."
      ],
      "caseStudy": "Kenderaan manual sukar dihidupkan dan merekodkan P0704. Live data tidak menunjukkan perubahan clutch switch walaupun pedal ditekan. Pemeriksaan mendapati stopper pedal tidak mengaktifkan suis pada kedudukan betul. Selepas pembaikan, input dan fungsi start diuji semula."
    }
  },
  "P0705": {
    "n": "Transmission Range Sensor Circuit Malfunction (PRNDL Input)",
    "free": {
      "m": "P0705 menunjukkan masalah pada litar transmission range sensor atau input PRNDL yang melaporkan kedudukan pemilih gear kepada modul kawalan.",
      "s": "Paparan gear mungkin salah atau tidak stabil, enjin mungkin tidak boleh dihidupkan pada kedudukan yang sepatutnya atau transmisi memasuki mod perlindungan.",
      "p": "Transmission range sensor rosak, pelarasan tidak tepat, linkage tidak sejajar, connector atau harness rosak atau litar input bermasalah."
    },
    "pro": {
      "diagnosis": "Bandingkan kedudukan fizikal pemilih gear dengan PRNDL PID pada scan tool bagi setiap posisi. Kenal pasti jenis sensor dan prosedur pelarasan khusus transmisi.",
      "tests": [
        "Bandingkan kedudukan P, R, N dan D pada pemilih gear dengan status PRNDL yang dipaparkan oleh scan tool.",
        "Periksa linkage, pemasangan dan pelarasan transmission range sensor mengikut prosedur transmisi OEM.",
        "Uji bekalan, ground, signal dan kesinambungan litar berdasarkan jenis sensor serta wiring diagram pengeluar."
      ],
      "repair": "Laraskan atau ganti transmission range sensor hanya selepas ujian mengesahkan kegagalan. Baiki linkage, connector atau harness dan sahkan pengesanan semua posisi gear serta fungsi keselamatan start."
    },
    "elite": {
      "analysis": "P0705 boleh berpunca daripada ketidakpadanan kedudukan mekanikal dan input elektronik. Jangan menganggap sensor rosak sebelum pelarasan linkage serta status PRNDL diperiksa.",
      "advanced": [
        "Analisis hubungan antara kedudukan pemilih, signal sensor dan PRNDL PID untuk setiap posisi transmisi.",
        "Periksa sama ada ketidakpadanan berlaku pada semua posisi atau hanya pada julat tertentu bagi membezakan pelarasan daripada kegagalan litar.",
        "Selepas pembaikan, sahkan pengesanan gear, fungsi starter interlock dan operasi transmisi mengikut prosedur OEM."
      ],
      "caseStudy": "Paparan gear tidak sepadan dengan kedudukan pemilih dan P0705 direkodkan. Pemeriksaan menunjukkan linkage tidak sejajar selepas kerja servis. Pelarasan dibuat mengikut spesifikasi transmisi dan semua posisi PRNDL disahkan."
    }
  },
  "P0706": {
    "n": "Transmission Range Sensor Circuit Range/Performance",
    "free": {
      "m": "P0706 menunjukkan bacaan atau prestasi transmission range sensor tidak sepadan dengan julat atau logik kedudukan gear yang dijangka oleh modul.",
      "s": "Paparan gear boleh berubah-ubah, kedudukan gear tidak dikenal pasti dengan tepat atau transmisi memasuki mod perlindungan.",
      "p": "Sensor tidak sejajar, linkage haus, signal tidak konsisten, connector berkarat atau kerosakan dalaman sensor."
    },
    "pro": {
      "diagnosis": "Rekod PRNDL PID dan bandingkan signal sensor dengan kedudukan mekanikal pemilih gear. Periksa corak perubahan signal bagi setiap posisi berdasarkan spesifikasi OEM.",
      "tests": [
        "Periksa pelarasan sensor dan linkage untuk memastikan setiap detent gear sepadan dengan kedudukan yang dilaporkan.",
        "Pantau signal range sensor sepanjang pergerakan pemilih dan cari bacaan bertindih, terputus atau tidak mengikut urutan OEM.",
        "Periksa connector, terminal dan harness untuk kakisan, rintangan tinggi atau gangguan signal ketika harness digerakkan secara terkawal."
      ],
      "repair": "Betulkan pelarasan sensor atau linkage dan baiki connector atau harness yang bermasalah. Ganti sensor hanya jika signal kekal di luar spesifikasi selepas pemeriksaan mekanikal dan elektrik."
    },
    "elite": {
      "analysis": "P0706 ialah isu julat atau prestasi signal. Sensor boleh menghasilkan signal yang masih wujud tetapi tidak konsisten dengan kedudukan gear sebenar. Pelarasan mekanikal perlu dinilai sebelum penggantian.",
      "advanced": [
        "Bandingkan corak signal bagi semua posisi gear dengan jadual truth table atau spesifikasi sensor OEM.",
        "Analisis sama ada ketidakpadanan berpunca daripada pelarasan, kehausan linkage atau gangguan elektrik berdasarkan perubahan signal.",
        "Selepas pembaikan, lakukan pemeriksaan PRNDL pada semua posisi dan sahkan DTC tidak kembali dalam keadaan operasi berkaitan."
      ],
      "caseStudy": "P0706 muncul secara berkala dan paparan gear berubah apabila pemilih digerakkan. Ujian menunjukkan pelarasan range sensor tidak tepat selepas servis transmisi. Selepas pelarasan OEM, semua posisi gear dikenal pasti secara konsisten."
    }
  },
  "P0707": {
    "n": "Transmission Range Sensor Circuit Low",
    "free": {
      "m": "P0707 menunjukkan signal litar transmission range sensor berada pada tahap rendah berbanding julat yang dijangka oleh modul kawalan.",
      "s": "Paparan kedudukan gear mungkin tidak tepat, enjin mungkin sukar dihidupkan atau transmisi memasuki mod perlindungan.",
      "p": "Litar pintas ke ground, pendawaian atau connector rosak, bekalan sensor bermasalah atau sensor gagal."
    },
    "pro": {
      "diagnosis": "Sahkan P0707 dan kenal pasti jenis sensor serta litar signal yang dipantau. Bandingkan bacaan signal dengan kedudukan pemilih dan spesifikasi OEM.",
      "tests": [
        "Periksa connector range sensor dan harness untuk kerosakan penebat, terminal tertekan atau sentuhan tidak dikehendaki ke ground.",
        "Ukur bekalan dan ground sensor serta signal output mengikut pinout OEM; jangan gunakan nilai voltan universal.",
        "Bandingkan signal pada sensor dan input modul untuk menentukan sama ada keadaan rendah berpunca daripada sensor atau harness."
      ],
      "repair": "Baiki pintasan ke ground, bekalan atau connector yang rosak. Ganti sensor hanya selepas signal rendah disahkan berpunca daripada sensor dan lakukan pengesahan PRNDL selepas pembaikan."
    },
    "elite": {
      "analysis": "P0707 menunjukkan keadaan signal rendah, tetapi tidak mengenal pasti lokasi kerosakan. Perbandingan pada sensor dan input modul membantu membezakan sensor gagal daripada harness pintas ke ground.",
      "advanced": [
        "Gunakan pinout OEM untuk mengasingkan litar bekalan, ground dan signal sebelum menjalankan ujian.",
        "Bandingkan bacaan signal pada kedua-dua hujung harness ketika keadaan gear yang ditetapkan untuk mengenal pasti kehilangan atau pintasan.",
        "Selepas pembaikan, sahkan signal bagi semua posisi gear dan periksa fungsi starter interlock serta status transmisi."
      ],
      "caseStudy": "P0707 muncul bersama paparan gear yang tidak tepat. Pengukuran mengikut pinout OEM menunjukkan signal menjadi rendah akibat kerosakan penebat harness yang menyentuh ground. Harness dibaiki dan status PRNDL disahkan."
    }
  },
  "P0708": {
    "n": "Transmission Range Sensor Circuit High",
    "free": {
      "m": "P0708 menunjukkan signal litar transmission range sensor berada pada tahap tinggi berbanding julat yang dijangka oleh modul kawalan.",
      "s": "Paparan kedudukan gear mungkin tidak tepat, enjin mungkin gagal dihidupkan atau operasi transmisi terganggu.",
      "p": "Litar pintas ke bekalan voltan, litar terbuka, sambungan rosak atau sensor gagal."
    },
    "pro": {
      "diagnosis": "Sahkan P0708 dan kenal pasti litar signal yang dipantau melalui wiring diagram OEM. Tentukan sama ada voltan tinggi berpunca daripada harness, connector atau sensor.",
      "tests": [
        "Periksa harness signal untuk sentuhan dengan bekalan voltan lain, connector longgar atau terminal yang tersalah kedudukan.",
        "Bandingkan signal sensor dengan kedudukan gear dan spesifikasi pengeluar menggunakan kaedah pengukuran OEM.",
        "Periksa kesinambungan harness dan asingkan sensor daripada litar mengikut prosedur pengeluar untuk mengenal pasti sumber keadaan tinggi."
      ],
      "repair": "Baiki pintasan ke bekalan, litar terbuka atau sambungan yang salah. Ganti sensor hanya jika ujian mengesahkan kegagalan dalaman dan sahkan semula semua posisi PRNDL."
    },
    "elite": {
      "analysis": "P0708 menunjukkan keadaan signal tinggi. Litar terbuka boleh menghasilkan bacaan tinggi pada sesetengah reka bentuk input, jadi tafsiran mesti mengikuti strategi litar OEM.",
      "advanced": [
        "Kenal pasti sama ada input modul menggunakan pull-up atau strategi pemantauan lain sebelum mentafsir bacaan tinggi.",
        "Bandingkan signal pada connector sensor dan input modul untuk menentukan sama ada gangguan berada pada sensor atau harness.",
        "Selepas pembaikan, sahkan signal berubah mengikut posisi gear dan tiada keadaan voltan tinggi berulang."
      ],
      "caseStudy": "P0708 muncul selepas kerja pendawaian dan transmisi gagal mengenal pasti kedudukan gear. Pemeriksaan mendapati wayar signal bersentuhan dengan bekalan voltan pada bahagian harness. Selepas pembaikan, bacaan PRNDL disahkan semula."
    }
  },
  "P0709": {
    "n": "Transmission Range Sensor Circuit Intermittent",
    "free": {
      "m": "P0709 menunjukkan signal transmission range sensor terputus-putus atau tidak konsisten ketika modul memantau kedudukan gear.",
      "s": "Paparan gear mungkin berubah secara berselang, enjin sukar dihidupkan atau amaran transmisi muncul dan hilang.",
      "p": "Terminal longgar, kakisan, pendawaian retak, sambungan tidak stabil atau sensor gagal."
    },
    "pro": {
      "diagnosis": "Rekod status PRNDL dan keadaan kemunculan P0709. Cari gangguan yang berlaku ketika pemilih bergerak, getaran atau perubahan suhu dan periksa kestabilan signal.",
      "tests": [
        "Periksa connector range sensor, terminal dan harness untuk tanda kakisan, kelembapan, retak atau sambungan yang longgar.",
        "Pantau signal range sensor ketika pemilih digerakkan melalui semua posisi dan bandingkan dengan PRNDL PID.",
        "Lakukan pemeriksaan harness secara terkawal ketika memantau signal untuk mengesan gangguan berselang mengikut prosedur OEM."
      ],
      "repair": "Pulihkan terminal longgar, kakisan atau pendawaian retak dan laraskan sensor jika perlu. Ganti sensor hanya jika gangguan dalaman disahkan dan sahkan kestabilan signal selepas pembaikan."
    },
    "elite": {
      "analysis": "P0709 ialah gangguan berselang yang mungkin tidak muncul ketika pemeriksaan statik. Rekod freeze-frame dan pemantauan signal semasa pergerakan pemilih membantu mengesan keadaan pencetus.",
      "advanced": [
        "Korelasikan masa DTC dengan perubahan PRNDL, getaran, suhu dan pergerakan harness untuk mencari keadaan pencetus.",
        "Periksa kestabilan signal dan terminal di bawah keadaan operasi terkawal tanpa menarik atau merosakkan harness.",
        "Selepas pembaikan, lakukan ujian pergerakan gear berulang dan sahkan status PRNDL kekal stabil."
      ],
      "caseStudy": "P0709 muncul hanya ketika kenderaan melalui jalan tidak rata. Pemeriksaan mendapati terminal connector range sensor longgar dan signal terputus seketika akibat getaran. Terminal dipulihkan dan kestabilan PRNDL diuji semula."
    }
  },
  "P0714": {
    "n": "Transmission Fluid Temperature Sensor A Circuit Intermittent",
    "free": {
      "m": "P0714 menunjukkan isyarat Transmission Fluid Temperature Sensor A terputus-putus atau tidak konsisten.",
      "s": "Bacaan suhu ATF boleh berubah mendadak, pertukaran gear menjadi tidak normal atau amaran transmisi muncul secara berselang.",
      "p": "Punca termasuk terminal longgar, kakisan connector, sensor suhu gagal atau harness terjejas haba dan getaran."
    },
    "pro": {
      "diagnosis": "Sahkan P0714 dan pantau ATF Temperature PID ketika transmisi sejuk serta panas. Perhatikan perubahan bacaan yang tidak munasabah.",
      "tests": [
        "Periksa connector sensor suhu ATF dan harness berhampiran transmisi untuk kesan haba, minyak, kakisan atau terminal longgar.",
        "Bandingkan bacaan sensor dengan suhu transmisi sebenar dan spesifikasi OEM ketika perubahan suhu berlaku.",
        "Pantau signal semasa harness diperiksa secara terkawal untuk mengenal pasti gangguan berselang."
      ],
      "repair": "Baiki sambungan atau harness dan ganti sensor hanya jika ujian mengesahkan kegagalan. Sahkan bacaan suhu stabil selepas kitaran operasi."
    },
    "elite": {
      "analysis": "P0714 ialah gangguan berselang. Pemeriksaan statik mungkin tidak menunjukkan kerosakan jika sambungan hanya terputus ketika panas atau bergetar.",
      "advanced": [
        "Analisis hubungan suhu ATF, masa kemunculan DTC dan keadaan pertukaran gear.",
        "Periksa laluan harness berhampiran sumber haba dan titik pergerakan transmisi.",
        "Sahkan kestabilan PID ketika cold start, pemanasan dan operasi transmisi mengikut prosedur OEM."
      ],
      "caseStudy": "Kenderaan merekodkan P0714 selepas perjalanan jauh. Bacaan suhu ATF terputus seketika apabila harness panas. Connector dan pendawaian dibaiki, kemudian bacaan dipantau semula."
    }
  },
  "P0725": {
    "n": "Engine Speed Input Circuit",
    "free": {
      "m": "P0725 menunjukkan modul transmisi tidak menerima input kelajuan enjin yang diperlukan untuk strategi kawalan.",
      "s": "Pertukaran gear boleh terganggu, transmisi memasuki mod kecemasan atau prestasi berubah akibat kehilangan data RPM.",
      "p": "Punca termasuk sumber RPM tiada, komunikasi antara modul terganggu atau pendawaian dan connector rosak."
    },
    "pro": {
      "diagnosis": "Sahkan P0725 dan kenal pasti sumber RPM yang digunakan TCM melalui rajah rangkaian OEM. Bandingkan RPM enjin pada ECM dengan data yang diterima TCM.",
      "tests": [
        "Periksa DTC berkaitan crankshaft sensor, ECM, TCM dan rangkaian komunikasi sebelum mengasingkan punca.",
        "Bandingkan Engine RPM PID pada ECM dan TCM ketika cranking serta enjin hidup jika data tersedia.",
        "Periksa bekalan, ground, connector dan rangkaian komunikasi mengikut topologi serta prosedur OEM."
      ],
      "repair": "Pulihkan sumber RPM atau komunikasi yang terbukti gagal. Sahkan TCM menerima data kelajuan enjin secara konsisten selepas pembaikan."
    },
    "elite": {
      "analysis": "P0725 berkaitan input kelajuan enjin kepada sistem transmisi. Jangan terus menggantikan TCM sebelum memastikan ECM menghasilkan dan menghantar data RPM yang betul.",
      "advanced": [
        "Analisis perbezaan RPM antara ECM dan TCM serta masa kehilangan data.",
        "Periksa sumber asal RPM dan laluan penghantaran data berdasarkan seni bina rangkaian kenderaan.",
        "Selepas pembaikan, sahkan data RPM ketika cranking, idle dan perubahan kelajuan enjin."
      ],
      "caseStudy": "Transmisi memasuki mod perlindungan dengan P0725. ECM menunjukkan RPM normal tetapi TCM tidak menerima data tersebut. Pemeriksaan rangkaian mengenal pasti sambungan komunikasi bermasalah."
    }
  },
  "P0726": {
    "n": "Engine Speed Input Circuit Range/Performance",
    "free": {
      "m": "P0726 menunjukkan isyarat kelajuan enjin yang diterima modul transmisi berada di luar julat atau prestasi yang dijangka.",
      "s": "RPM yang diterima mungkin tidak sepadan dengan keadaan enjin, pertukaran gear tidak konsisten atau transmisi memasuki mod kecemasan.",
      "p": "Punca termasuk data RPM tidak tepat, gangguan sumber sensor, masalah komunikasi atau ketidakpadanan isyarat antara modul."
    },
    "pro": {
      "diagnosis": "Sahkan P0726 dan bandingkan Engine RPM PID antara ECM dengan TCM. Gunakan freeze-frame untuk mengenal pasti keadaan ketika ketidakpadanan berlaku.",
      "tests": [
        "Periksa DTC crankshaft atau camshaft sensor dan bandingkan bacaan RPM dengan keadaan operasi enjin.",
        "Pantau perubahan RPM pada kedua-dua modul ketika idle, pecutan dan nyahpecutan mengikut prosedur OEM.",
        "Periksa integriti komunikasi dan connector bagi sumber RPM serta TCM jika data kedua-dua modul tidak sepadan."
      ],
      "repair": "Baiki sumber isyarat atau komunikasi yang dikenal pasti. Sahkan keselarasan data RPM dan operasi pertukaran gear selepas pembaikan."
    },
    "elite": {
      "analysis": "P0726 menunjukkan masalah julat atau prestasi input RPM, bukan semestinya kehilangan signal sepenuhnya. Bezakan data salah daripada gangguan komunikasi.",
      "advanced": [
        "Analisis perbezaan RPM mengikut keadaan operasi dan korelasikan dengan DTC sensor enjin.",
        "Periksa sama ada ketidakpadanan berlaku secara berterusan atau hanya pada julat RPM tertentu.",
        "Sahkan data RPM pada ECM dan TCM sepanjang ujian jalan terkawal yang dibenarkan OEM."
      ],
      "caseStudy": "P0726 muncul ketika pecutan. Data RPM ECM berubah normal tetapi bacaan TCM tidak mengikutinya. Pemeriksaan komunikasi mengenal pasti gangguan penghantaran data."
    }
  },
  "P0727": {
    "n": "Engine Speed Input Circuit No Signal",
    "free": {
      "m": "P0727 menunjukkan tiada isyarat kelajuan enjin diterima melalui litar input yang dipantau oleh modul transmisi.",
      "s": "Transmisi mungkin gagal menukar gear dengan betul atau memasuki mod perlindungan akibat kehilangan input RPM.",
      "p": "Punca termasuk litar terbuka, kehilangan sumber RPM, connector terputus atau gangguan komunikasi antara modul."
    },
    "pro": {
      "diagnosis": "Sahkan P0727 dan tentukan sama ada RPM tiada pada ECM, TCM atau kedua-duanya. Periksa sumber serta laluan data mengikut rajah OEM.",
      "tests": [
        "Semak sama ada ECM memaparkan RPM ketika cranking dan enjin hidup; periksa DTC berkaitan sensor kelajuan enjin.",
        "Jika RPM wujud pada ECM tetapi tiada pada TCM, periksa rangkaian komunikasi serta connector antara modul.",
        "Jika RPM tiada pada ECM, periksa sumber sensor, bekalan, ground dan kesinambungan litar mengikut prosedur OEM."
      ],
      "repair": "Pulihkan litar sumber RPM atau komunikasi yang gagal. Sahkan data diterima oleh TCM sebelum menguji pertukaran gear."
    },
    "elite": {
      "analysis": "P0727 memerlukan pengesanan titik kehilangan signal. Perbezaan antara RPM yang tiada pada ECM dan RPM yang tidak sampai kepada TCM menentukan arah diagnosis.",
      "advanced": [
        "Asingkan sumber RPM daripada laluan penghantaran data berdasarkan seni bina kenderaan.",
        "Analisis data cranking, status sensor dan komunikasi modul untuk mengenal pasti lokasi kehilangan input.",
        "Sahkan pemulihan data RPM dan operasi transmisi selepas pembaikan."
      ],
      "caseStudy": "Kenderaan mengalami kegagalan pertukaran gear dan P0727. ECM turut kehilangan bacaan RPM ketika cranking. Pemeriksaan sumber sensor dan litar berkaitan diperlukan sebelum keputusan pembaikan."
    }
  },
  "P0728": {
    "n": "Engine Speed Input Circuit Intermittent",
    "free": {
      "m": "P0728 menunjukkan input kelajuan enjin kepada modul transmisi terputus-putus atau tidak konsisten.",
      "s": "Pertukaran gear boleh berubah-ubah dan kod mungkin muncul hanya ketika getaran, suhu atau keadaan operasi tertentu.",
      "p": "Punca termasuk harness longgar, connector rosak, gangguan sumber RPM atau komunikasi berselang."
    },
    "pro": {
      "diagnosis": "Sahkan P0728 dan rekod freeze-frame. Bandingkan data RPM ECM dan TCM ketika keadaan yang mencetuskan kod.",
      "tests": [
        "Periksa connector, terminal dan harness sumber RPM serta laluan komunikasi antara modul.",
        "Pantau RPM kedua-dua modul ketika enjin beroperasi dan perhatikan kehilangan data secara tiba-tiba.",
        "Periksa gangguan berselang melalui ujian harness terkawal serta prosedur rangkaian OEM."
      ],
      "repair": "Baiki sambungan atau litar yang terbukti terganggu. Sahkan data RPM kekal stabil sepanjang keadaan operasi berkaitan."
    },
    "elite": {
      "analysis": "P0728 mungkin tidak muncul semasa ujian statik. Korelasi masa DTC dengan getaran, suhu dan perubahan RPM membantu mengenal pasti punca.",
      "advanced": [
        "Analisis freeze-frame dan rekod kehilangan RPM untuk membezakan gangguan sensor daripada komunikasi.",
        "Periksa terminal yang mengalami perubahan sentuhan akibat getaran atau pengembangan haba.",
        "Jalankan pengesahan ketika keadaan operasi pencetus dapat dihasilkan secara selamat."
      ],
      "caseStudy": "P0728 muncul secara berselang ketika melalui jalan tidak rata. Pemeriksaan mendapati connector komunikasi longgar. Sambungan dipulihkan dan data RPM dipantau semula."
    }
  },
  "P0729": {
    "n": "Gear 6 Incorrect Ratio",
    "free": {
      "m": "P0729 menunjukkan nisbah gear keenam yang dikesan tidak sepadan dengan nisbah yang dijangka oleh modul transmisi.",
      "s": "RPM enjin mungkin meningkat tanpa pertambahan kelajuan sepadan, gear keenam mungkin gagal berfungsi atau transmisi menunjukkan simptom gelinciran.",
      "p": "Punca termasuk tekanan hidraulik tidak mencukupi, clutch atau elemen geseran gelincir, kebocoran dalaman atau komponen transmisi haus."
    },
    "pro": {
      "diagnosis": "Sahkan P0729 dan rekod freeze-frame. Pastikan transmisi benar-benar mempunyai gear keenam dan bandingkan input/output speed serta gear commanded dengan actual.",
      "tests": [
        "Periksa keadaan ATF, paras dan spesifikasi bendalir mengikut prosedur OEM serta cari kebocoran.",
        "Bandingkan kelajuan input dan output, gear yang diperintah serta nisbah sebenar ketika keadaan gear keenam berlaku.",
        "Periksa DTC berkaitan tekanan, solenoid dan kawalan transmisi sebelum mempertimbangkan kerosakan dalaman."
      ],
      "repair": "Baiki punca hidraulik atau mekanikal yang disahkan. Elakkan membuka transmisi atau mengganti clutch tanpa bukti ujian dan prosedur OEM."
    },
    "elite": {
      "analysis": "P0729 ialah kesalahan nisbah gear keenam. Sensor kelajuan, tekanan hidraulik dan elemen geseran perlu dinilai sebelum menentukan kerosakan dalaman.",
      "advanced": [
        "Analisis input speed, output speed dan keadaan gear commanded untuk membezakan gelinciran daripada kesilapan data kelajuan.",
        "Korelasikan DTC dengan ATF, tekanan hidraulik dan DTC solenoid atau kawalan yang berkaitan.",
        "Sahkan nisbah gear keenam melalui ujian terkawal mengikut syarat OEM selepas pembaikan."
      ],
      "caseStudy": "Transmisi merekodkan P0729 ketika gear keenam diperintah. Data menunjukkan nisbah sebenar menyimpang daripada sasaran. Pemeriksaan ATF, tekanan dan elemen clutch dilakukan sebelum keputusan pembaikan."
    }
  },
  "P0737": {
    "n": "TCM Engine Speed Output Circuit",
    "free": {
      "m": "P0737 menunjukkan masalah pada litar output kelajuan enjin daripada TCM.",
      "s": "Data RPM yang dihantar TCM mungkin tidak tersedia atau tidak konsisten, lalu mengganggu komunikasi dan fungsi sistem yang menggunakan output tersebut.",
      "p": "Punca termasuk litar output terbuka, connector rosak, pendawaian terganggu atau kegagalan driver output."
    },
    "pro": {
      "diagnosis": "Sahkan P0737 dan kenal pasti sama ada output RPM menggunakan rangkaian komunikasi atau litar fizikal khusus melalui dokumentasi OEM.",
      "tests": [
        "Periksa connector, harness dan terminal pada laluan output kelajuan enjin TCM.",
        "Bandingkan RPM sumber dengan data output TCM menggunakan PID atau alat pemeriksaan yang disokong.",
        "Uji kesinambungan atau integriti komunikasi mengikut jenis output dan prosedur OEM."
      ],
      "repair": "Baiki laluan output atau sambungan yang disahkan rosak. Nilai TCM hanya selepas bekalan, ground dan litar luaran diperiksa."
    },
    "elite": {
      "analysis": "P0737 merujuk kepada output kelajuan enjin TCM. Diagnosis perlu mengenal pasti jenis output sebenar dan tidak menganggap semua kenderaan menggunakan pin signal yang sama.",
      "advanced": [
        "Petakan laluan output RPM daripada TCM kepada modul penerima berdasarkan rajah OEM.",
        "Bandingkan data sumber dan output untuk menentukan sama ada masalah berlaku sebelum atau selepas pemprosesan TCM.",
        "Sahkan penghantaran data RPM kepada sistem penerima selepas pembaikan."
      ],
      "caseStudy": "Modul penerima tidak mendapat data RPM dan P0737 direkodkan. Pemeriksaan mengenal pasti sambungan output TCM terputus. Sambungan dipulihkan dan data disahkan semula."
    }
  },
  "P0738": {
    "n": "TCM Engine Speed Output Circuit Low",
    "free": {
      "m": "P0738 menunjukkan isyarat output kelajuan enjin daripada TCM berada pada tahap rendah.",
      "s": "Data RPM output mungkin terlalu rendah atau tidak tepat dan boleh mengganggu operasi transmisi atau sistem yang menerima data tersebut.",
      "p": "Punca termasuk litar output pintas ke ground, beban berlebihan, connector rosak atau driver output lemah."
    },
    "pro": {
      "diagnosis": "Sahkan P0738 dan kenal pasti jenis output RPM TCM melalui wiring diagram OEM. Bandingkan nilai sumber dengan output yang dihantar.",
      "tests": [
        "Periksa harness output dan connector untuk pintasan ke ground, kakisan atau beban luar yang tidak sepatutnya.",
        "Ukur signal output mengikut jenis litar dan spesifikasi OEM ketika TCM mengeluarkan arahan.",
        "Asingkan beban penerima mengikut prosedur pengeluar untuk menentukan sama ada keadaan rendah datang daripada harness atau driver."
      ],
      "repair": "Baiki pintasan, beban atau connector yang disahkan. Ganti TCM hanya jika kegagalan output dalaman dibuktikan selepas ujian luaran."
    },
    "elite": {
      "analysis": "P0738 menunjukkan keadaan rendah pada output TCM. Pemeriksaan perlu membezakan litar pintas, beban berlebihan dan kegagalan driver tanpa menggunakan nilai voltan universal.",
      "advanced": [
        "Analisis bentuk atau status output mengikut jenis litar yang digunakan oleh kenderaan.",
        "Periksa sama ada output kembali normal apabila cabang penerima diasingkan mengikut prosedur OEM.",
        "Sahkan data output RPM dan komunikasi modul penerima selepas pembaikan."
      ],
      "caseStudy": "P0738 muncul bersama data RPM output rendah. Ujian harness mengenal pasti pintasan ke ground pada laluan output. Harness dibaiki dan signal disahkan mengikut spesifikasi pengeluar."
    }
  },
  "P0739": {
    "n": "TCM Engine Speed Output Circuit High",
    "free": {
      "m": "P0739 menunjukkan isyarat output kelajuan enjin daripada TCM berada pada tahap tinggi berbanding keadaan yang dijangka.",
      "s": "Data RPM mungkin tidak munasabah atau komunikasi data transmisi kepada modul lain terganggu.",
      "p": "Punca termasuk litar output pintas ke bekalan voltan, litar terbuka mengikut strategi pemantauan, connector rosak atau driver output gagal."
    },
    "pro": {
      "diagnosis": "Sahkan P0739 dan kenal pasti reka bentuk output TCM. Bandingkan keadaan output dengan RPM sumber dan strategi pemantauan OEM.",
      "tests": [
        "Periksa harness dan connector output untuk pintasan ke bekalan, terminal tersalah sambung atau kerosakan penebat.",
        "Bandingkan signal pada output TCM dengan input modul penerima mengikut prosedur pengukuran OEM.",
        "Asingkan cabang penerima dan periksa driver output hanya selepas harness serta bekalan dan ground disahkan baik."
      ],
      "repair": "Baiki pintasan atau sambungan yang salah. Sahkan output RPM kembali sepadan dengan sumber dan tiada DTC berulang."
    },
    "elite": {
      "analysis": "P0739 menunjukkan keadaan tinggi pada output RPM TCM. Tafsiran litar terbuka atau tinggi bergantung pada reka bentuk output dan strategi pemantauan OEM.",
      "advanced": [
        "Bandingkan output TCM dan input modul penerima untuk menentukan lokasi perbezaan signal.",
        "Periksa sejarah pembaikan harness atau sambungan tambahan yang mungkin memasukkan voltan luar.",
        "Sahkan output dalam keadaan operasi berbeza selepas pembaikan mengikut prosedur OEM."
      ],
      "caseStudy": "P0739 muncul selepas kerja pendawaian. Pemeriksaan menemui sambungan output yang tersentuh bekalan voltan. Selepas harness dibaiki, data RPM output disahkan kembali normal."
    }
  },
  "P0750": {
    "n": "Shift Solenoid A Malfunction",
    "free": {
      "m": "Sistem mengesan kerosakan operasi pada Shift Solenoid A.",
      "s": "Pertukaran gear tidak lancar, kelewatan masuk gear atau transmisi memasuki mod kecemasan.",
      "p": "Solenoid A gagal, litar kawalan terganggu atau laluan hidraulik berkaitan tersekat."
    },
    "pro": {
      "diagnosis": "Sahkan P0750 dan kenal pasti fungsi Shift Solenoid A dalam jadual aplikasi transmisi OEM. Bandingkan arahan solenoid dengan perubahan gear sebenar.",
      "tests": [
        "Periksa connector, harness dan keadaan fizikal litar Shift Solenoid A berdasarkan wiring diagram OEM.",
        "Uji rintangan dan kesinambungan litar solenoid A mengikut spesifikasi transmisi; jangan gunakan nilai universal.",
        "Bandingkan arahan solenoid, data gear dan tindak balas hidraulik menggunakan fungsi diagnostik OEM jika tersedia."
      ],
      "repair": "Baiki litar atau connector yang gagal ujian. Ganti solenoid A atau baiki laluan hidraulik hanya selepas punca disahkan, kemudian sahkan pertukaran gear."
    },
    "elite": {
      "analysis": "P0750: Sistem mengesan kerosakan operasi pada Shift Solenoid A. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0750: Nilai arahan TCM bagi Shift Solenoid A ketika keadaan kerosakan operasi umum. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan kerosakan operasi pada Shift Solenoid A. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan arahan TCM dan keadaan operasi solenoid A melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0750: Transmisi menunjukkan gejala yang sepadan dengan sistem mengesan kerosakan operasi pada shift solenoid a. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid A dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0751": {
    "n": "Shift Solenoid A Performance/Stuck Off",
    "free": {
      "m": "Prestasi Shift Solenoid A tidak mencapai tindak balas yang dijangka atau solenoid dikesan tersekat OFF.",
      "s": "Pertukaran gear lambat, gear tertentu tidak masuk atau nisbah transmisi tidak sepadan dengan arahan.",
      "p": "Solenoid A tersekat, saluran minyak tersumbat, tekanan hidraulik tidak mencukupi atau spool valve melekat."
    },
    "pro": {
      "diagnosis": "Sahkan P0751 dan bandingkan arahan solenoid A dengan nisbah gear serta tindak balas transmisi. Tentukan sama ada kegagalan elektrik atau hidraulik.",
      "tests": [
        "Periksa sama ada litar solenoid A menerima arahan dan berfungsi mengikut prosedur OEM.",
        "Pantau input speed, output speed dan gear commanded untuk mengenal pasti kegagalan tindak balas.",
        "Periksa keadaan ATF, penapis dan laluan hidraulik mengikut prosedur servis transmisi OEM."
      ],
      "repair": "Pulihkan litar elektrik atau laluan hidraulik yang terbukti bermasalah. Ganti solenoid hanya selepas ujian mengesahkan ia tersekat atau gagal berfungsi."
    },
    "elite": {
      "analysis": "P0751: Prestasi Shift Solenoid A tidak mencapai tindak balas yang dijangka atau solenoid dikesan tersekat OFF. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0751: Nilai arahan TCM bagi Shift Solenoid A ketika keadaan prestasi rendah atau stuck off. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan prestasi rendah atau tersekat terbuka pada Shift Solenoid A. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan keupayaan solenoid A membuka laluan hidraulik melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0751: Transmisi menunjukkan gejala yang sepadan dengan prestasi shift solenoid a tidak mencapai tindak balas yang dijangka atau solenoid dikesan tersekat off. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid A dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0752": {
    "n": "Shift Solenoid A Stuck On",
    "free": {
      "m": "Shift Solenoid A dikesan kekal dalam keadaan ON apabila keadaan operasi memerlukan tindak balas berbeza.",
      "s": "Gear tidak sepadan dengan arahan TCM, pertukaran gear menjadi kasar atau transmisi memasuki mod perlindungan.",
      "p": "Solenoid A melekat, spool valve tersekat atau pemacu elektrik mengekalkan arahan ON."
    },
    "pro": {
      "diagnosis": "Sahkan P0752 dan bandingkan arahan ON/OFF TCM dengan status gear serta tindak balas hidraulik sebenar.",
      "tests": [
        "Pantau arahan solenoid A melalui scan tool ketika keadaan gear berubah.",
        "Periksa sama ada driver solenoid A kekal aktif apabila TCM mengarahkan keadaan tidak aktif. Sahkan signal kawalan dan litar mengikut prosedur OEM.",
        "Periksa kemungkinan solenoid atau injap hidraulik melekat menggunakan prosedur pemeriksaan transmisi."
      ],
      "repair": "Baiki driver, pendawaian atau komponen hidraulik yang disahkan gagal. Sahkan solenoid A boleh bertindak balas terhadap arahan kawalan."
    },
    "elite": {
      "analysis": "P0752: Shift Solenoid A dikesan kekal dalam keadaan ON apabila keadaan operasi memerlukan tindak balas berbeza. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0752: Nilai arahan TCM bagi Shift Solenoid A ketika keadaan stuck on atau kekal aktif. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan tersekat aktif pada Shift Solenoid A. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan keadaan solenoid A kekal aktif berbanding arahan TCM melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0752: Transmisi menunjukkan gejala yang sepadan dengan shift solenoid a dikesan kekal dalam keadaan on apabila keadaan operasi memerlukan tindak balas berbeza. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid A dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0753": {
    "n": "Shift Solenoid A Electrical",
    "free": {
      "m": "Litar elektrik Shift Solenoid A mengalami kerosakan yang dikesan oleh modul kawalan transmisi.",
      "s": "Lampu amaran transmisi menyala, gear tidak berubah seperti diarahkan atau transmisi memasuki mod kecemasan.",
      "p": "Litar terbuka, pintas ke ground atau bekalan, connector rosak atau coil solenoid gagal."
    },
    "pro": {
      "diagnosis": "Sahkan P0753 dan gunakan wiring diagram OEM untuk mengenal pasti litar coil, bekalan serta driver Shift Solenoid A.",
      "tests": [
        "Periksa connector dan harness solenoid A untuk terminal longgar, kakisan atau kerosakan penebat.",
        "Ukur rintangan coil dan kesinambungan litar mengikut spesifikasi OEM selepas mengikuti prosedur keselamatan.",
        "Uji litar driver dan bekalan solenoid menggunakan kaedah pengeluar untuk membezakan kerosakan harness daripada coil."
      ],
      "repair": "Baiki pintasan, litar terbuka atau terminal rosak. Ganti solenoid A jika coil disahkan gagal dan sahkan litar selepas pembaikan."
    },
    "elite": {
      "analysis": "P0753: Litar elektrik Shift Solenoid A mengalami kerosakan yang dikesan oleh modul kawalan transmisi. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0753: Nilai arahan TCM bagi Shift Solenoid A ketika keadaan kerosakan elektrik pada litar solenoid. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan gangguan elektrik pada Shift Solenoid A. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan kesinambungan coil dan litar pemacu solenoid A melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0753: Transmisi menunjukkan gejala yang sepadan dengan litar elektrik shift solenoid a mengalami kerosakan yang dikesan oleh modul kawalan transmisi. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid A dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0754": {
    "n": "Shift Solenoid A Intermittent",
    "free": {
      "m": "Litar atau operasi Shift Solenoid A mengalami gangguan berselang ketika transmisi beroperasi.",
      "s": "Pertukaran gear tidak menentu dan DTC mungkin muncul hanya ketika suhu, getaran atau beban tertentu.",
      "p": "Terminal longgar, harness terjejas haba, sambungan dalaman tidak stabil atau solenoid mengalami kegagalan berselang."
    },
    "pro": {
      "diagnosis": "Sahkan P0754 dan rekod freeze-frame. Korelasikan masa kod muncul dengan suhu ATF, beban dan arahan solenoid A.",
      "tests": [
        "Periksa connector dan harness solenoid A untuk kerosakan akibat haba, getaran atau minyak transmisi.",
        "Pantau arahan solenoid dan tindak balas gear ketika keadaan operasi yang berkaitan dapat dihasilkan dengan selamat.",
        "Periksa kesinambungan dan kestabilan sambungan menggunakan prosedur OEM ketika harness diperiksa secara terkawal."
      ],
      "repair": "Pulihkan sambungan berselang atau ganti solenoid jika kegagalan dalaman disahkan. Sahkan operasi ketika transmisi sejuk dan panas."
    },
    "elite": {
      "analysis": "P0754: Litar atau operasi Shift Solenoid A mengalami gangguan berselang ketika transmisi beroperasi. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0754: Nilai arahan TCM bagi Shift Solenoid A ketika keadaan gangguan signal berselang. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan gangguan berselang pada Shift Solenoid A. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan kestabilan signal dan sambungan solenoid A melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0754: Transmisi menunjukkan gejala yang sepadan dengan litar atau operasi shift solenoid a mengalami gangguan berselang ketika transmisi beroperasi. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid A dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0755": {
    "n": "Shift Solenoid B Malfunction",
    "free": {
      "m": "Sistem mengesan kerosakan operasi pada Shift Solenoid B.",
      "s": "Pertukaran gear kasar, gear tertentu tidak tersedia atau transmisi memasuki mod kecemasan.",
      "p": "Solenoid B gagal, litar elektrik terganggu atau laluan hidraulik berkaitan tersekat."
    },
    "pro": {
      "diagnosis": "Sahkan P0755 dan kenal pasti fungsi Shift Solenoid B dalam aplikasi transmisi OEM. Bandingkan arahan kawalan dengan gear sebenar.",
      "tests": [
        "Periksa connector, harness dan litar Shift Solenoid B mengikut rajah pendawaian khusus transmisi.",
        "Uji coil solenoid B dan kesinambungan litar mengikut spesifikasi OEM.",
        "Bandingkan arahan solenoid B, nisbah gear dan tindak balas hidraulik menggunakan data diagnostik yang tersedia."
      ],
      "repair": "Baiki litar atau laluan hidraulik yang terbukti bermasalah. Ganti solenoid B hanya selepas ujian mengesahkan kegagalan."
    },
    "elite": {
      "analysis": "P0755: Sistem mengesan kerosakan operasi pada Shift Solenoid B. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0755: Nilai arahan TCM bagi Shift Solenoid B ketika keadaan kerosakan operasi umum. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan kerosakan operasi pada Shift Solenoid B. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan arahan TCM dan keadaan operasi solenoid B melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0755: Transmisi menunjukkan gejala yang sepadan dengan sistem mengesan kerosakan operasi pada shift solenoid b. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid B dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0756": {
    "n": "Shift Solenoid B Performance/Stuck Off",
    "free": {
      "m": "Prestasi Shift Solenoid B tidak mencapai sasaran atau solenoid dikesan tersekat OFF.",
      "s": "Gear lambat masuk, gear tertentu hilang atau nisbah transmisi tidak sepadan dengan arahan.",
      "p": "Solenoid B tersekat, laluan minyak tersumbat, tekanan hidraulik rendah atau spool valve melekat."
    },
    "pro": {
      "diagnosis": "Sahkan P0756 dan analisis arahan solenoid B berbanding nisbah gear sebenar untuk membezakan masalah kawalan dan hidraulik.",
      "tests": [
        "Sahkan arahan elektrik kepada solenoid B dan periksa connector serta litar kawalannya.",
        "Bandingkan input speed, output speed dan gear commanded ketika gejala berlaku.",
        "Periksa ATF dan laluan hidraulik solenoid B mengikut prosedur transmisi OEM."
      ],
      "repair": "Baiki punca elektrik atau hidraulik yang disahkan. Sahkan tindak balas gear selepas pembaikan dan elakkan penggantian solenoid berdasarkan kod sahaja."
    },
    "elite": {
      "analysis": "P0756: Prestasi Shift Solenoid B tidak mencapai sasaran atau solenoid dikesan tersekat OFF. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0756: Nilai arahan TCM bagi Shift Solenoid B ketika keadaan prestasi rendah atau stuck off. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan prestasi rendah atau tersekat terbuka pada Shift Solenoid B. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan keupayaan solenoid B membuka laluan hidraulik melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0756: Transmisi menunjukkan gejala yang sepadan dengan prestasi shift solenoid b tidak mencapai sasaran atau solenoid dikesan tersekat off. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid B dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0757": {
    "n": "Shift Solenoid B Stuck On",
    "free": {
      "m": "Shift Solenoid B dikesan tersekat dalam keadaan ON dan tidak bertindak seperti yang diarahkan.",
      "s": "Gear tidak mengikut arahan TCM, pertukaran gear tidak normal atau transmisi memasuki mod perlindungan.",
      "p": "Solenoid B melekat, pemacu elektrik kekal aktif atau injap hidraulik tersekat."
    },
    "pro": {
      "diagnosis": "Bandingkan arahan ON/OFF solenoid B dengan data gear sebenar dan tentukan sama ada keadaan ON berpunca daripada litar atau injap.",
      "tests": [
        "Pantau arahan solenoid B dan perubahan gear menggunakan scan tool yang menyokong fungsi tersebut.",
        "Periksa driver, connector dan litar kawalan untuk arahan aktif yang tidak sepadan dengan strategi OEM.",
        "Periksa solenoid dan spool valve bagi tanda tersekat mengikut prosedur pembongkaran atau ujian OEM."
      ],
      "repair": "Baiki litar driver atau komponen hidraulik yang terbukti menyebabkan keadaan ON. Sahkan kawalan solenoid B selepas pembaikan."
    },
    "elite": {
      "analysis": "P0757: Shift Solenoid B dikesan tersekat dalam keadaan ON dan tidak bertindak seperti yang diarahkan. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0757: Nilai arahan TCM bagi Shift Solenoid B ketika keadaan stuck on atau kekal aktif. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan tersekat aktif pada Shift Solenoid B. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan keadaan solenoid B kekal aktif berbanding arahan TCM melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0757: Transmisi menunjukkan gejala yang sepadan dengan shift solenoid b dikesan tersekat dalam keadaan on dan tidak bertindak seperti yang diarahkan. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid B dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0758": {
    "n": "Shift Solenoid B Electrical",
    "free": {
      "m": "Litar elektrik Shift Solenoid B mengalami kerosakan yang dipantau oleh modul transmisi.",
      "s": "Pertukaran gear tidak betul, lampu amaran transmisi muncul atau transmisi memasuki mod kecemasan.",
      "p": "Litar terbuka, pintas, connector rosak, coil solenoid B gagal atau driver bermasalah."
    },
    "pro": {
      "diagnosis": "Sahkan P0758 dan kenal pasti laluan coil serta driver solenoid B melalui wiring diagram OEM.",
      "tests": [
        "Periksa connector dan harness B untuk kakisan, terminal tertolak atau kerosakan penebat.",
        "Uji rintangan coil dan kesinambungan litar B mengikut nilai serta prosedur khusus pengeluar.",
        "Periksa output driver dan bekalan litar bagi membezakan kegagalan coil, harness atau modul."
      ],
      "repair": "Baiki pendawaian dan connector atau ganti coil solenoid B jika disahkan gagal. Sahkan operasi litar sebelum ujian transmisi."
    },
    "elite": {
      "analysis": "P0758: Litar elektrik Shift Solenoid B mengalami kerosakan yang dipantau oleh modul transmisi. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0758: Nilai arahan TCM bagi Shift Solenoid B ketika keadaan kerosakan elektrik pada litar solenoid. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan gangguan elektrik pada Shift Solenoid B. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan kesinambungan coil dan litar pemacu solenoid B melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0758: Transmisi menunjukkan gejala yang sepadan dengan litar elektrik shift solenoid b mengalami kerosakan yang dipantau oleh modul transmisi. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid B dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0759": {
    "n": "Shift Solenoid B Intermittent",
    "free": {
      "m": "Operasi atau litar Shift Solenoid B mengalami gangguan berselang.",
      "s": "Pertukaran gear berubah-ubah dan kerosakan mungkin hanya muncul dalam keadaan operasi tertentu.",
      "p": "Sambungan longgar, wayar retak, terminal terjejas haba atau solenoid B tidak stabil."
    },
    "pro": {
      "diagnosis": "Sahkan P0759 dan gunakan freeze-frame serta data arahan solenoid B untuk mencari keadaan pencetus gangguan.",
      "tests": [
        "Periksa terminal dan harness B berhampiran transmisi untuk kesan getaran, haba dan pencemaran ATF.",
        "Pantau arahan solenoid B serta tindak balas gear ketika keadaan yang menghasilkan gejala.",
        "Uji kestabilan coil dan connector mengikut prosedur OEM tanpa membuat pintasan atau sambungan ujian yang tidak dibenarkan."
      ],
      "repair": "Pulihkan sambungan atau harness dan ganti solenoid hanya jika kegagalan berselang disahkan. Uji semula dalam keadaan pencetus asal."
    },
    "elite": {
      "analysis": "P0759: Operasi atau litar Shift Solenoid B mengalami gangguan berselang. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0759: Nilai arahan TCM bagi Shift Solenoid B ketika keadaan gangguan signal berselang. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan gangguan berselang pada Shift Solenoid B. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan kestabilan signal dan sambungan solenoid B melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0759: Transmisi menunjukkan gejala yang sepadan dengan operasi atau litar shift solenoid b mengalami gangguan berselang. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid B dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0760": {
    "n": "Shift Solenoid C Malfunction",
    "free": {
      "m": "Sistem mengesan kerosakan operasi pada Shift Solenoid C.",
      "s": "Pertukaran gear tertentu terganggu, nisbah gear tidak normal atau gear tertentu hilang.",
      "p": "Solenoid C gagal, litar elektrik terganggu atau laluan hidraulik berkaitan tersekat."
    },
    "pro": {
      "diagnosis": "Sahkan P0760 dan kenal pasti fungsi Shift Solenoid C dalam konfigurasi transmisi OEM. Bandingkan arahan solenoid dengan tindak balas gear.",
      "tests": [
        "Periksa connector, harness dan litar kawalan solenoid C menggunakan wiring diagram OEM.",
        "Uji coil solenoid C dan kesinambungan litar berdasarkan spesifikasi transmisi.",
        "Bandingkan arahan solenoid, input/output speed dan nisbah gear sebenar untuk mengesan kegagalan tindak balas."
      ],
      "repair": "Baiki litar atau laluan hidraulik yang disahkan bermasalah. Ganti solenoid C hanya selepas ujian mengesahkan kegagalan dan sahkan pertukaran gear."
    },
    "elite": {
      "analysis": "P0760: Sistem mengesan kerosakan operasi pada Shift Solenoid C. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0760: Nilai arahan TCM bagi Shift Solenoid C ketika keadaan kerosakan operasi umum. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan kerosakan operasi pada Shift Solenoid C. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan arahan TCM dan keadaan operasi solenoid C melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0760: Transmisi menunjukkan gejala yang sepadan dengan sistem mengesan kerosakan operasi pada shift solenoid c. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid C dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0761": {
    "n": "Shift Solenoid C Performance/Stuck Off",
    "free": {
      "m": "Prestasi Shift Solenoid C tidak mencapai sasaran atau solenoid dikesan tersekat OFF.",
      "s": "Gear lambat masuk, nisbah gear salah atau pertukaran gear gagal apabila solenoid C diperlukan.",
      "p": "Solenoid C tersekat, saluran minyak tersumbat, tekanan hidraulik rendah atau spool valve melekat."
    },
    "pro": {
      "diagnosis": "Sahkan P0761 dan bandingkan arahan solenoid C dengan nisbah gear serta data kelajuan transmisi.",
      "tests": [
        "Sahkan arahan elektrik solenoid C dan periksa connector serta litar kawalannya.",
        "Analisis input speed, output speed dan gear commanded ketika kegagalan berlaku.",
        "Periksa ATF, laluan minyak dan komponen hidraulik berkaitan C mengikut prosedur OEM."
      ],
      "repair": "Pulihkan litar atau laluan hidraulik yang disahkan gagal. Sahkan respons solenoid C dan nisbah gear selepas pembaikan."
    },
    "elite": {
      "analysis": "P0761: Prestasi Shift Solenoid C tidak mencapai sasaran atau solenoid dikesan tersekat OFF. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0761: Nilai arahan TCM bagi Shift Solenoid C ketika keadaan prestasi rendah atau stuck off. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan prestasi rendah atau tersekat terbuka pada Shift Solenoid C. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan keupayaan solenoid C membuka laluan hidraulik melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0761: Transmisi menunjukkan gejala yang sepadan dengan prestasi shift solenoid c tidak mencapai sasaran atau solenoid dikesan tersekat off. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid C dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0762": {
    "n": "Shift Solenoid C Stuck On",
    "free": {
      "m": "Shift Solenoid C dikesan tersekat dalam keadaan ON dan tidak mengikut arahan kawalan.",
      "s": "Gear tidak sepadan dengan arahan TCM atau pertukaran gear menjadi kasar.",
      "p": "Solenoid atau injap hidraulik tersekat, atau litar pemacu mengekalkan output aktif."
    },
    "pro": {
      "diagnosis": "Bandingkan arahan ON/OFF solenoid C dengan keadaan gear dan signal kawalan untuk mengenal pasti punca elektrik atau mekanikal.",
      "tests": [
        "Pantau arahan solenoid C dan data gear sebenar ketika perubahan gear yang berkaitan.",
        "Periksa sama ada driver solenoid C kekal aktif apabila TCM mengarahkan keadaan tidak aktif. Sahkan signal kawalan dan litar mengikut prosedur OEM.",
        "Periksa solenoid dan spool valve C mengikut prosedur servis transmisi bagi mengenal pasti keadaan melekat."
      ],
      "repair": "Baiki litar kawalan atau komponen hidraulik yang disahkan menyebabkan solenoid kekal ON. Sahkan kawalan gear selepas pembaikan."
    },
    "elite": {
      "analysis": "P0762: Shift Solenoid C dikesan tersekat dalam keadaan ON dan tidak mengikut arahan kawalan. Diagnosis perlu membezakan keadaan elektrik, arahan TCM dan tindak balas hidraulik mengikut konfigurasi transmisi OEM.",
      "advanced": [
        "P0762: Nilai arahan TCM bagi Shift Solenoid C ketika keadaan stuck on atau kekal aktif. Tentukan sama ada status commanded, signal elektrik dan perubahan gear sebenar menunjukkan corak kerosakan yang sepadan.",
        "Uji keadaan tersekat aktif pada Shift Solenoid C. Bezakan kegagalan coil, driver elektrik dan tindak balas hidraulik menggunakan prosedur OEM.",
        "Sahkan keadaan solenoid C kekal aktif berbanding arahan TCM melalui ujian fungsi transmisi. Rekod perubahan gear, data kelajuan aci dan DTC selepas pembaikan."
      ],
      "caseStudy": "Kajian kes P0762: Transmisi menunjukkan gejala yang sepadan dengan shift solenoid c dikesan tersekat dalam keadaan on dan tidak mengikut arahan kawalan. Juruteknik merekodkan freeze-frame, membandingkan arahan solenoid C dengan data gear dan menguji litar serta laluan hidraulik mengikut OEM. Punca disahkan sebelum pembaikan dan fungsi transmisi diuji semula."
    }
  },
  "P0800": {
    "n": "Transfer Case Control System (MIL Request)",
    "free": {
      "m": "Permintaan MIL daripada sistem transfer case. Transfer Case Control System (MIL Request) ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "MIL menyala, operasi 4WD atau transfer case terganggu. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Sensor, aktuator, bekalan kuasa, komunikasi atau modul transfer case. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0800 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah status komunikasi, sensor dan aktuator transfer case.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi status komunikasi, sensor dan aktuator transfer case. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0800 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus status MIL request transfer case, komunikasi modul dan tindak balas aktuator. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen status komunikasi, sensor dan aktuator transfer case hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0800: Permintaan MIL daripada sistem transfer case. Diagnosis lanjutan perlu membezakan punca pada status komunikasi, sensor dan aktuator transfer case daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0800 menggunakan freeze-frame, status DTC dan live data status komunikasi, sensor dan aktuator transfer case. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi status komunikasi, sensor dan aktuator transfer case. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi status MIL request transfer case, komunikasi modul dan tindak balas aktuator. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0800: Kenderaan menunjukkan keadaan berikut: mil menyala, operasi 4wd atau transfer case terganggu. Juruteknik merekod freeze-frame, memeriksa status komunikasi, sensor dan aktuator transfer case, kemudian mengasingkan kemungkinan punca: sensor, aktuator, bekalan kuasa, komunikasi atau modul transfer case. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0801": {
    "n": "Reverse Inhibit Control Circuit",
    "free": {
      "m": "Kawalan penghalang pemilihan gear undur. Reverse Inhibit Control Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Gear undur sukar dipilih atau interlock gagal. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Suis, solenoid inhibit, wiring atau modul kawalan. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0801 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah input suis reverse inhibit dan arahan solenoid penghalang.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi input suis reverse inhibit dan arahan solenoid penghalang. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0801 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input reverse inhibit, arahan solenoid penghalang dan status interlock. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen input suis reverse inhibit dan arahan solenoid penghalang hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0801: Kawalan penghalang pemilihan gear undur. Diagnosis lanjutan perlu membezakan punca pada input suis reverse inhibit dan arahan solenoid penghalang daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0801 menggunakan freeze-frame, status DTC dan live data input suis reverse inhibit dan arahan solenoid penghalang. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi input suis reverse inhibit dan arahan solenoid penghalang. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input reverse inhibit, arahan solenoid penghalang dan status interlock. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0801: Kenderaan menunjukkan keadaan berikut: gear undur sukar dipilih atau interlock gagal. Juruteknik merekod freeze-frame, memeriksa input suis reverse inhibit dan arahan solenoid penghalang, kemudian mengasingkan kemungkinan punca: suis, solenoid inhibit, wiring atau modul kawalan. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0802": {
    "n": "Transmission Control Module MIL Request Circuit/Open",
    "free": {
      "m": "Litar permintaan MIL daripada TCM. Transmission Control Module MIL Request Circuit/Open ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Lampu MIL tidak menyala walaupun TCM meminta amaran. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Litar terbuka, connector, wiring atau output modul. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0802 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah output permintaan mil tcm dan kesinambungan litar ke ecm.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi output permintaan mil tcm dan kesinambungan litar ke ecm. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0802 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus output MIL request TCM, kesinambungan litar dan penerimaan isyarat ECM. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen output permintaan mil tcm dan kesinambungan litar ke ecm hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0802: Litar permintaan MIL daripada TCM. Diagnosis lanjutan perlu membezakan punca pada output permintaan mil tcm dan kesinambungan litar ke ecm daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0802 menggunakan freeze-frame, status DTC dan live data output permintaan mil tcm dan kesinambungan litar ke ecm. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi output permintaan mil tcm dan kesinambungan litar ke ecm. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi output MIL request TCM, kesinambungan litar dan penerimaan isyarat ECM. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0802: Kenderaan menunjukkan keadaan berikut: lampu mil tidak menyala walaupun tcm meminta amaran. Juruteknik merekod freeze-frame, memeriksa output permintaan mil tcm dan kesinambungan litar ke ecm, kemudian mengasingkan kemungkinan punca: litar terbuka, connector, wiring atau output modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0803": {
    "n": "1-4 Upshift (Skip Shift) Solenoid Control Circuit/Open",
    "free": {
      "m": "Litar kawalan solenoid skip-shift 1-4. 1-4 Upshift (Skip Shift) Solenoid Control Circuit/Open ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Fungsi skip-shift tidak aktif atau pertukaran gear terhad. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Solenoid, wiring, connector atau driver modul. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0803 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah arahan skip-shift, litar coil dan driver modul.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi arahan skip-shift, litar coil dan driver modul. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0803 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus arahan skip-shift 1-4, litar solenoid dan keadaan driver. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen arahan skip-shift, litar coil dan driver modul hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0803: Litar kawalan solenoid skip-shift 1-4. Diagnosis lanjutan perlu membezakan punca pada arahan skip-shift, litar coil dan driver modul daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0803 menggunakan freeze-frame, status DTC dan live data arahan skip-shift, litar coil dan driver modul. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi arahan skip-shift, litar coil dan driver modul. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi arahan skip-shift 1-4, litar solenoid dan keadaan driver. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0803: Kenderaan menunjukkan keadaan berikut: fungsi skip-shift tidak aktif atau pertukaran gear terhad. Juruteknik merekod freeze-frame, memeriksa arahan skip-shift, litar coil dan driver modul, kemudian mengasingkan kemungkinan punca: solenoid, wiring, connector atau driver modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0804": {
    "n": "1-4 Upshift (Skip Shift) Lamp Control Circuit",
    "free": {
      "m": "Litar lampu penunjuk skip-shift 1-4. 1-4 Upshift (Skip Shift) Lamp Control Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Lampu skip-shift gagal menyala atau tidak konsisten. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "LED, mentol, wiring, connector atau output modul. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0804 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah bekalan, bumi dan output lampu skip-shift.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi bekalan, bumi dan output lampu skip-shift. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0804 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus output lampu skip-shift, bekalan LED atau mentol dan status arahan. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen bekalan, bumi dan output lampu skip-shift hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0804: Litar lampu penunjuk skip-shift 1-4. Diagnosis lanjutan perlu membezakan punca pada bekalan, bumi dan output lampu skip-shift daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0804 menggunakan freeze-frame, status DTC dan live data bekalan, bumi dan output lampu skip-shift. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi bekalan, bumi dan output lampu skip-shift. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi output lampu skip-shift, bekalan LED atau mentol dan status arahan. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0804: Kenderaan menunjukkan keadaan berikut: lampu skip-shift gagal menyala atau tidak konsisten. Juruteknik merekod freeze-frame, memeriksa bekalan, bumi dan output lampu skip-shift, kemudian mengasingkan kemungkinan punca: led, mentol, wiring, connector atau output modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0805": {
    "n": "Clutch Position Sensor A Circuit",
    "free": {
      "m": "Litar sensor kedudukan klac A. Clutch Position Sensor A Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Starter interlock atau kawalan klac mungkin terganggu. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Sensor, wiring, connector atau bekalan rujukan. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0805 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah bekalan rujukan, ground dan isyarat sensor klac a.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi bekalan rujukan, ground dan isyarat sensor klac a. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0805 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus signal asas sensor kedudukan klac A serta bekalan rujukannya. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen bekalan rujukan, ground dan isyarat sensor klac a hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0805: Litar sensor kedudukan klac A. Diagnosis lanjutan perlu membezakan punca pada bekalan rujukan, ground dan isyarat sensor klac a daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0805 menggunakan freeze-frame, status DTC dan live data bekalan rujukan, ground dan isyarat sensor klac a. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi bekalan rujukan, ground dan isyarat sensor klac a. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi signal asas sensor kedudukan klac A serta bekalan rujukannya. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0805: Kenderaan menunjukkan keadaan berikut: starter interlock atau kawalan klac mungkin terganggu. Juruteknik merekod freeze-frame, memeriksa bekalan rujukan, ground dan isyarat sensor klac a, kemudian mengasingkan kemungkinan punca: sensor, wiring, connector atau bekalan rujukan. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0806": {
    "n": "Clutch Position Sensor A Circuit Range/Performance",
    "free": {
      "m": "Julat dan prestasi isyarat sensor klac A. Clutch Position Sensor A Circuit Range/Performance ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Bacaan kedudukan klac tidak sepadan dengan pergerakan sebenar. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Sensor tidak tepat, pelarasan atau masalah mekanikal. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0806 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah perubahan isyarat sensor sepanjang pergerakan pedal klac.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi perubahan isyarat sensor sepanjang pergerakan pedal klac. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0806 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus julat perubahan signal sensor klac A sepanjang pergerakan pedal. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen perubahan isyarat sensor sepanjang pergerakan pedal klac hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0806: Julat dan prestasi isyarat sensor klac A. Diagnosis lanjutan perlu membezakan punca pada perubahan isyarat sensor sepanjang pergerakan pedal klac daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0806 menggunakan freeze-frame, status DTC dan live data perubahan isyarat sensor sepanjang pergerakan pedal klac. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi perubahan isyarat sensor sepanjang pergerakan pedal klac. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi julat perubahan signal sensor klac A sepanjang pergerakan pedal. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0806: Kenderaan menunjukkan keadaan berikut: bacaan kedudukan klac tidak sepadan dengan pergerakan sebenar. Juruteknik merekod freeze-frame, memeriksa perubahan isyarat sensor sepanjang pergerakan pedal klac, kemudian mengasingkan kemungkinan punca: sensor tidak tepat, pelarasan atau masalah mekanikal. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0807": {
    "n": "Clutch Position Sensor A Circuit Low",
    "free": {
      "m": "Isyarat rendah sensor kedudukan klac A. Clutch Position Sensor A Circuit Low ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Modul gagal mengenal pasti kedudukan klac. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Pintas ke bumi, sensor atau wiring bermasalah. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0807 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah voltan signal, short-to-ground dan bekalan rujukan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi voltan signal, short-to-ground dan bekalan rujukan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0807 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus signal rendah sensor klac A dan kemungkinan pintas ke ground. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen voltan signal, short-to-ground dan bekalan rujukan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0807: Isyarat rendah sensor kedudukan klac A. Diagnosis lanjutan perlu membezakan punca pada voltan signal, short-to-ground dan bekalan rujukan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0807 menggunakan freeze-frame, status DTC dan live data voltan signal, short-to-ground dan bekalan rujukan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi voltan signal, short-to-ground dan bekalan rujukan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi signal rendah sensor klac A dan kemungkinan pintas ke ground. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0807: Kenderaan menunjukkan keadaan berikut: modul gagal mengenal pasti kedudukan klac. Juruteknik merekod freeze-frame, memeriksa voltan signal, short-to-ground dan bekalan rujukan, kemudian mengasingkan kemungkinan punca: pintas ke bumi, sensor atau wiring bermasalah. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0808": {
    "n": "Clutch Position Sensor A Circuit High",
    "free": {
      "m": "Isyarat tinggi sensor kedudukan klac A. Clutch Position Sensor A Circuit High ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Interlock atau pengesanan kedudukan klac terganggu. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Pintas ke bekalan, litar terbuka atau sensor rosak. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0808 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah voltan signal, open circuit dan short-to-voltage.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi voltan signal, open circuit dan short-to-voltage. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0808 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus signal tinggi sensor klac A dan kemungkinan pintas ke bekalan. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen voltan signal, open circuit dan short-to-voltage hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0808: Isyarat tinggi sensor kedudukan klac A. Diagnosis lanjutan perlu membezakan punca pada voltan signal, open circuit dan short-to-voltage daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0808 menggunakan freeze-frame, status DTC dan live data voltan signal, open circuit dan short-to-voltage. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi voltan signal, open circuit dan short-to-voltage. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi signal tinggi sensor klac A dan kemungkinan pintas ke bekalan. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0808: Kenderaan menunjukkan keadaan berikut: interlock atau pengesanan kedudukan klac terganggu. Juruteknik merekod freeze-frame, memeriksa voltan signal, open circuit dan short-to-voltage, kemudian mengasingkan kemungkinan punca: pintas ke bekalan, litar terbuka atau sensor rosak. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0809": {
    "n": "Clutch Position Sensor A Circuit Intermittent",
    "free": {
      "m": "Isyarat berselang sensor kedudukan klac A. Clutch Position Sensor A Circuit Intermittent ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Kebenaran starter atau status klac berubah-ubah. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Terminal longgar, kakisan, wayar retak atau sensor tidak stabil. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0809 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah perubahan signal ketika harness dan pedal digerakkan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi perubahan signal ketika harness dan pedal digerakkan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0809 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus kestabilan signal sensor klac A ketika pedal dan harness diperiksa. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen perubahan signal ketika harness dan pedal digerakkan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0809: Isyarat berselang sensor kedudukan klac A. Diagnosis lanjutan perlu membezakan punca pada perubahan signal ketika harness dan pedal digerakkan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0809 menggunakan freeze-frame, status DTC dan live data perubahan signal ketika harness dan pedal digerakkan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi perubahan signal ketika harness dan pedal digerakkan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi kestabilan signal sensor klac A ketika pedal dan harness diperiksa. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0809: Kenderaan menunjukkan keadaan berikut: kebenaran starter atau status klac berubah-ubah. Juruteknik merekod freeze-frame, memeriksa perubahan signal ketika harness dan pedal digerakkan, kemudian mengasingkan kemungkinan punca: terminal longgar, kakisan, wayar retak atau sensor tidak stabil. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0810": {
    "n": "Clutch Position Control Error",
    "free": {
      "m": "Kawalan kedudukan klac. Clutch Position Control Error ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Klac gagal mencapai kedudukan sasaran atau gear gagal ditukar. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Aktuator, sensor maklum balas, pelarasan atau mekanisme klac. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0810 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah perbandingan kedudukan sasaran dengan maklum balas aktuator.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi perbandingan kedudukan sasaran dengan maklum balas aktuator. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0810 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus kedudukan klac sasaran berbanding maklum balas aktuator. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen perbandingan kedudukan sasaran dengan maklum balas aktuator hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0810: Kawalan kedudukan klac. Diagnosis lanjutan perlu membezakan punca pada perbandingan kedudukan sasaran dengan maklum balas aktuator daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0810 menggunakan freeze-frame, status DTC dan live data perbandingan kedudukan sasaran dengan maklum balas aktuator. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi perbandingan kedudukan sasaran dengan maklum balas aktuator. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi kedudukan klac sasaran berbanding maklum balas aktuator. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0810: Kenderaan menunjukkan keadaan berikut: klac gagal mencapai kedudukan sasaran atau gear gagal ditukar. Juruteknik merekod freeze-frame, memeriksa perbandingan kedudukan sasaran dengan maklum balas aktuator, kemudian mengasingkan kemungkinan punca: aktuator, sensor maklum balas, pelarasan atau mekanisme klac. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0811": {
    "n": "Excessive Clutch Slippage",
    "free": {
      "m": "Gelinciran klac melebihi had sistem. Excessive Clutch Slippage ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "RPM meningkat tanpa pertambahan kelajuan sepadan atau bau hangit. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Plat klac haus, tekanan pengapit rendah atau pencemaran. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0811 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah korelasi rpm enjin, input shaft dan output shaft.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi korelasi rpm enjin, input shaft dan output shaft. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0811 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus perbezaan RPM enjin, input shaft dan output shaft ketika klac menerima beban. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen korelasi rpm enjin, input shaft dan output shaft hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0811: Gelinciran klac melebihi had sistem. Diagnosis lanjutan perlu membezakan punca pada korelasi rpm enjin, input shaft dan output shaft daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0811 menggunakan freeze-frame, status DTC dan live data korelasi rpm enjin, input shaft dan output shaft. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi korelasi rpm enjin, input shaft dan output shaft. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi perbezaan RPM enjin, input shaft dan output shaft ketika klac menerima beban. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0811: Kenderaan menunjukkan keadaan berikut: rpm meningkat tanpa pertambahan kelajuan sepadan atau bau hangit. Juruteknik merekod freeze-frame, memeriksa korelasi rpm enjin, input shaft dan output shaft, kemudian mengasingkan kemungkinan punca: plat klac haus, tekanan pengapit rendah atau pencemaran. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0812": {
    "n": "Reverse Input Circuit",
    "free": {
      "m": "Input pengesanan gear undur. Reverse Input Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Lampu undur atau pengesanan gear undur tidak tepat. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Suis reverse, sensor julat atau wiring. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0812 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah status suis reverse dan perubahan data gear undur.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi status suis reverse dan perubahan data gear undur. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0812 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input suis reverse dan status gear undur yang dilaporkan modul. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen status suis reverse dan perubahan data gear undur hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0812: Input pengesanan gear undur. Diagnosis lanjutan perlu membezakan punca pada status suis reverse dan perubahan data gear undur daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0812 menggunakan freeze-frame, status DTC dan live data status suis reverse dan perubahan data gear undur. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi status suis reverse dan perubahan data gear undur. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input suis reverse dan status gear undur yang dilaporkan modul. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0812: Kenderaan menunjukkan keadaan berikut: lampu undur atau pengesanan gear undur tidak tepat. Juruteknik merekod freeze-frame, memeriksa status suis reverse dan perubahan data gear undur, kemudian mengasingkan kemungkinan punca: suis reverse, sensor julat atau wiring. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0813": {
    "n": "Reverse Output Circuit",
    "free": {
      "m": "Output kawalan atau pengesanan gear undur. Reverse Output Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Lampu undur atau fungsi output reverse gagal. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Relay, output modul, wiring atau beban litar. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0813 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah output modul, relay dan beban litar reverse.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi output modul, relay dan beban litar reverse. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0813 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus output reverse, relay, beban lampu undur dan arahan modul. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen output modul, relay dan beban litar reverse hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0813: Output kawalan atau pengesanan gear undur. Diagnosis lanjutan perlu membezakan punca pada output modul, relay dan beban litar reverse daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0813 menggunakan freeze-frame, status DTC dan live data output modul, relay dan beban litar reverse. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi output modul, relay dan beban litar reverse. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi output reverse, relay, beban lampu undur dan arahan modul. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0813: Kenderaan menunjukkan keadaan berikut: lampu undur atau fungsi output reverse gagal. Juruteknik merekod freeze-frame, memeriksa output modul, relay dan beban litar reverse, kemudian mengasingkan kemungkinan punca: relay, output modul, wiring atau beban litar. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0814": {
    "n": "Transmission Range Display Circuit",
    "free": {
      "m": "Litar paparan julat transmisi. Transmission Range Display Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Paparan gear hilang atau tidak sepadan. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Panel paparan, komunikasi modul atau input range. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0814 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah perbandingan gear sebenar, input range dan paparan prndl.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi perbandingan gear sebenar, input range dan paparan prndl. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0814 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus padanan gear sebenar, input transmission range dan paparan PRNDL. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen perbandingan gear sebenar, input range dan paparan prndl hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0814: Litar paparan julat transmisi. Diagnosis lanjutan perlu membezakan punca pada perbandingan gear sebenar, input range dan paparan prndl daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0814 menggunakan freeze-frame, status DTC dan live data perbandingan gear sebenar, input range dan paparan prndl. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi perbandingan gear sebenar, input range dan paparan prndl. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi padanan gear sebenar, input transmission range dan paparan PRNDL. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0814: Kenderaan menunjukkan keadaan berikut: paparan gear hilang atau tidak sepadan. Juruteknik merekod freeze-frame, memeriksa perbandingan gear sebenar, input range dan paparan prndl, kemudian mengasingkan kemungkinan punca: panel paparan, komunikasi modul atau input range. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0815": {
    "n": "Upshift Switch Circuit",
    "free": {
      "m": "Litar suis arahan naik gear. Upshift Switch Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Arahan menaikkan gear tidak diterima. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Punca termasuk suis upshift haus atau rosak, terminal input longgar, litar terbuka, pintas elektrik atau kegagalan input modul."
    },
    "pro": {
      "diagnosis": "Sahkan P0815 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah perubahan input suis upshift dan status live data.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi perubahan input suis upshift dan status live data. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0815 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input suis upshift dan perubahan status arahan gear naik. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen perubahan input suis upshift dan status live data hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0815: Litar suis arahan naik gear. Diagnosis lanjutan perlu membezakan punca pada perubahan input suis upshift dan status live data daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0815 menggunakan freeze-frame, status DTC dan live data perubahan input suis upshift dan status live data. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi perubahan input suis upshift dan status live data. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input suis upshift dan perubahan status arahan gear naik. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0815: Kenderaan menunjukkan keadaan berikut: arahan menaikkan gear tidak diterima. Juruteknik merekod freeze-frame, memeriksa perubahan input suis upshift dan status live data, kemudian mengasingkan kemungkinan punca: suis, connector, wiring atau input modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0816": {
    "n": "Downshift Switch Circuit",
    "free": {
      "m": "Litar suis arahan turun gear. Downshift Switch Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Arahan menurunkan gear tidak diterima. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Punca termasuk suis downshift gagal, sentuhan elektrik tidak stabil, harness terputus, litar pintas atau masalah input modul."
    },
    "pro": {
      "diagnosis": "Sahkan P0816 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah perubahan input suis downshift dan status live data.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi perubahan input suis downshift dan status live data. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0816 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input suis downshift dan perubahan status arahan gear turun. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen perubahan input suis downshift dan status live data hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0816: Litar suis arahan turun gear. Diagnosis lanjutan perlu membezakan punca pada perubahan input suis downshift dan status live data daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0816 menggunakan freeze-frame, status DTC dan live data perubahan input suis downshift dan status live data. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi perubahan input suis downshift dan status live data. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input suis downshift dan perubahan status arahan gear turun. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0816: Kenderaan menunjukkan keadaan berikut: arahan menurunkan gear tidak diterima. Juruteknik merekod freeze-frame, memeriksa perubahan input suis downshift dan status live data, kemudian mengasingkan kemungkinan punca: suis, connector, wiring atau input modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0817": {
    "n": "Starter Disable Circuit",
    "free": {
      "m": "Litar nyahaktif starter. Starter Disable Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Enjin gagal dihidupkan atau starter tidak dikawal dengan betul. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Relay, suis interlock, wiring atau modul. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0817 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah status starter inhibit, relay dan interlock keselamatan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi status starter inhibit, relay dan interlock keselamatan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0817 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus status starter disable, relay starter dan interlock keselamatan. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen status starter inhibit, relay dan interlock keselamatan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0817: Litar nyahaktif starter. Diagnosis lanjutan perlu membezakan punca pada status starter inhibit, relay dan interlock keselamatan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0817 menggunakan freeze-frame, status DTC dan live data status starter inhibit, relay dan interlock keselamatan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi status starter inhibit, relay dan interlock keselamatan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi status starter disable, relay starter dan interlock keselamatan. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0817: Kenderaan menunjukkan keadaan berikut: enjin gagal dihidupkan atau starter tidak dikawal dengan betul. Juruteknik merekod freeze-frame, memeriksa status starter inhibit, relay dan interlock keselamatan, kemudian mengasingkan kemungkinan punca: relay, suis interlock, wiring atau modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0818": {
    "n": "Drivetrain Disconnect Switch Input Circuit",
    "free": {
      "m": "Input suis pemutus rangkaian pemacu. Drivetrain Disconnect Switch Input Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Status sistem pemacu tidak dikesan dengan betul. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Punca termasuk suis drivetrain disconnect tidak berfungsi, connector berkarat, pendawaian input terputus atau gangguan bekalan dan ground."
    },
    "pro": {
      "diagnosis": "Sahkan P0818 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah status suis disconnect dan perubahan input modul.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi status suis disconnect dan perubahan input modul. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0818 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input suis drivetrain disconnect dan perubahan status sistem pemacu. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen status suis disconnect dan perubahan input modul hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0818: Input suis pemutus rangkaian pemacu. Diagnosis lanjutan perlu membezakan punca pada status suis disconnect dan perubahan input modul daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0818 menggunakan freeze-frame, status DTC dan live data status suis disconnect dan perubahan input modul. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi status suis disconnect dan perubahan input modul. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input suis drivetrain disconnect dan perubahan status sistem pemacu. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0818: Kenderaan menunjukkan keadaan berikut: status sistem pemacu tidak dikesan dengan betul. Juruteknik merekod freeze-frame, memeriksa status suis disconnect dan perubahan input modul, kemudian mengasingkan kemungkinan punca: suis, connector, wiring atau input modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0819": {
    "n": "Up and Down Shift Switch to Transmission Range Correlation",
    "free": {
      "m": "Korelasi suis upshift/downshift dengan julat transmisi. Up and Down Shift Switch to Transmission Range Correlation ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Arahan manual ditolak atau tidak konsisten. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Suis gear, sensor range, wiring atau ketidakpadanan input. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0819 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah bandingkan input suis manual dengan kedudukan gear yang dilaporkan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi bandingkan input suis manual dengan kedudukan gear yang dilaporkan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0819 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus korelasi input suis upshift/downshift dengan signal transmission range. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen bandingkan input suis manual dengan kedudukan gear yang dilaporkan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0819: Korelasi suis upshift/downshift dengan julat transmisi. Diagnosis lanjutan perlu membezakan punca pada bandingkan input suis manual dengan kedudukan gear yang dilaporkan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0819 menggunakan freeze-frame, status DTC dan live data bandingkan input suis manual dengan kedudukan gear yang dilaporkan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi bandingkan input suis manual dengan kedudukan gear yang dilaporkan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi korelasi input suis upshift/downshift dengan signal transmission range. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0819: Kenderaan menunjukkan keadaan berikut: arahan manual ditolak atau tidak konsisten. Juruteknik merekod freeze-frame, memeriksa bandingkan input suis manual dengan kedudukan gear yang dilaporkan, kemudian mengasingkan kemungkinan punca: suis gear, sensor range, wiring atau ketidakpadanan input. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0820": {
    "n": "Gear Lever X-Y Position Sensor Circuit",
    "free": {
      "m": "Litar sensor kedudukan tuil gear paksi X-Y. Gear Lever X-Y Position Sensor Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Paparan atau pengesanan kedudukan tuil tidak tepat. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Sensor X-Y, rujukan voltan, ground atau wiring. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0820 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah korelasi signal paksi x dan y sepanjang pergerakan tuil.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi korelasi signal paksi x dan y sepanjang pergerakan tuil. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0820 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus korelasi signal kedudukan paksi X dan Y pada tuil gear. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen korelasi signal paksi x dan y sepanjang pergerakan tuil hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0820: Litar sensor kedudukan tuil gear paksi X-Y. Diagnosis lanjutan perlu membezakan punca pada korelasi signal paksi x dan y sepanjang pergerakan tuil daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0820 menggunakan freeze-frame, status DTC dan live data korelasi signal paksi x dan y sepanjang pergerakan tuil. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi korelasi signal paksi x dan y sepanjang pergerakan tuil. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi korelasi signal kedudukan paksi X dan Y pada tuil gear. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0820: Kenderaan menunjukkan keadaan berikut: paparan atau pengesanan kedudukan tuil tidak tepat. Juruteknik merekod freeze-frame, memeriksa korelasi signal paksi x dan y sepanjang pergerakan tuil, kemudian mengasingkan kemungkinan punca: sensor x-y, rujukan voltan, ground atau wiring. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0821": {
    "n": "Gear Lever X Position Circuit",
    "free": {
      "m": "Litar sensor kedudukan tuil gear paksi X. Gear Lever X Position Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Pengesanan paksi X salah atau tidak stabil. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Sensor X, connector, wiring atau bekalan rujukan. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0821 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah signal paksi x dan perubahan kedudukan tuil.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi signal paksi x dan perubahan kedudukan tuil. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0821 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus perubahan signal paksi X mengikut kedudukan fizikal tuil gear. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen signal paksi x dan perubahan kedudukan tuil hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0821: Litar sensor kedudukan tuil gear paksi X. Diagnosis lanjutan perlu membezakan punca pada signal paksi x dan perubahan kedudukan tuil daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0821 menggunakan freeze-frame, status DTC dan live data signal paksi x dan perubahan kedudukan tuil. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi signal paksi x dan perubahan kedudukan tuil. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi perubahan signal paksi X mengikut kedudukan fizikal tuil gear. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0821: Kenderaan menunjukkan keadaan berikut: pengesanan paksi x salah atau tidak stabil. Juruteknik merekod freeze-frame, memeriksa signal paksi x dan perubahan kedudukan tuil, kemudian mengasingkan kemungkinan punca: sensor x, connector, wiring atau bekalan rujukan. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0822": {
    "n": "Gear Lever Y Position Circuit",
    "free": {
      "m": "Litar sensor kedudukan tuil gear paksi Y. Gear Lever Y Position Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Pengesanan paksi Y tidak tepat. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Sensor Y, connector, wiring atau bekalan rujukan. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0822 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah signal paksi y dan perubahan kedudukan tuil.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi signal paksi y dan perubahan kedudukan tuil. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0822 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus perubahan signal paksi Y mengikut kedudukan fizikal tuil gear. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen signal paksi y dan perubahan kedudukan tuil hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0822: Litar sensor kedudukan tuil gear paksi Y. Diagnosis lanjutan perlu membezakan punca pada signal paksi y dan perubahan kedudukan tuil daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0822 menggunakan freeze-frame, status DTC dan live data signal paksi y dan perubahan kedudukan tuil. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi signal paksi y dan perubahan kedudukan tuil. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi perubahan signal paksi Y mengikut kedudukan fizikal tuil gear. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0822: Kenderaan menunjukkan keadaan berikut: pengesanan paksi y tidak tepat. Juruteknik merekod freeze-frame, memeriksa signal paksi y dan perubahan kedudukan tuil, kemudian mengasingkan kemungkinan punca: sensor y, connector, wiring atau bekalan rujukan. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0823": {
    "n": "Gear Lever X Position Circuit Intermittent",
    "free": {
      "m": "Isyarat berselang sensor kedudukan tuil paksi X. Gear Lever X Position Circuit Intermittent ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Pengesanan kedudukan gear berubah-ubah. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Terminal longgar, harness retak atau sensor X tidak stabil. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0823 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah kestabilan signal paksi x ketika tuil digerakkan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi kestabilan signal paksi x ketika tuil digerakkan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0823 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus kestabilan signal paksi X ketika tuil gear digerakkan. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen kestabilan signal paksi x ketika tuil digerakkan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0823: Isyarat berselang sensor kedudukan tuil paksi X. Diagnosis lanjutan perlu membezakan punca pada kestabilan signal paksi x ketika tuil digerakkan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0823 menggunakan freeze-frame, status DTC dan live data kestabilan signal paksi x ketika tuil digerakkan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi kestabilan signal paksi x ketika tuil digerakkan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi kestabilan signal paksi X ketika tuil gear digerakkan. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0823: Kenderaan menunjukkan keadaan berikut: pengesanan kedudukan gear berubah-ubah. Juruteknik merekod freeze-frame, memeriksa kestabilan signal paksi x ketika tuil digerakkan, kemudian mengasingkan kemungkinan punca: terminal longgar, harness retak atau sensor x tidak stabil. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0824": {
    "n": "Gear Lever Y Position Circuit Intermittent",
    "free": {
      "m": "Isyarat berselang sensor kedudukan tuil paksi Y. Gear Lever Y Position Circuit Intermittent ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Pengesanan kedudukan gear tidak stabil. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Connector longgar, wayar retak atau sensor Y tidak stabil. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0824 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah kestabilan signal paksi y ketika tuil digerakkan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi kestabilan signal paksi y ketika tuil digerakkan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0824 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus kestabilan signal paksi Y ketika tuil gear digerakkan. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen kestabilan signal paksi y ketika tuil digerakkan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0824: Isyarat berselang sensor kedudukan tuil paksi Y. Diagnosis lanjutan perlu membezakan punca pada kestabilan signal paksi y ketika tuil digerakkan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0824 menggunakan freeze-frame, status DTC dan live data kestabilan signal paksi y ketika tuil digerakkan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi kestabilan signal paksi y ketika tuil digerakkan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi kestabilan signal paksi Y ketika tuil gear digerakkan. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0824: Kenderaan menunjukkan keadaan berikut: pengesanan kedudukan gear tidak stabil. Juruteknik merekod freeze-frame, memeriksa kestabilan signal paksi y ketika tuil digerakkan, kemudian mengasingkan kemungkinan punca: connector longgar, wayar retak atau sensor y tidak stabil. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0825": {
    "n": "Gear Lever Push-Pull Switch (Shift Anticipate)",
    "free": {
      "m": "Input suis tolak-tarik tuil gear. Gear Lever Push-Pull Switch (Shift Anticipate) ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Arahan pertukaran gear melalui suis tidak berfungsi. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Suis, connector, wiring atau litar pintas. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0825 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah status input suis push-pull dan respons modul.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi status input suis push-pull dan respons modul. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0825 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input suis push-pull dan respons modul terhadap arahan tuil gear. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen status input suis push-pull dan respons modul hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0825: Input suis tolak-tarik tuil gear. Diagnosis lanjutan perlu membezakan punca pada status input suis push-pull dan respons modul daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0825 menggunakan freeze-frame, status DTC dan live data status input suis push-pull dan respons modul. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi status input suis push-pull dan respons modul. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input suis push-pull dan respons modul terhadap arahan tuil gear. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0825: Kenderaan menunjukkan keadaan berikut: arahan pertukaran gear melalui suis tidak berfungsi. Juruteknik merekod freeze-frame, memeriksa status input suis push-pull dan respons modul, kemudian mengasingkan kemungkinan punca: suis, connector, wiring atau litar pintas. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0826": {
    "n": "Up and Down Shift Switch Circuit",
    "free": {
      "m": "Litar suis arahan naik dan turun gear. Up and Down Shift Switch Circuit ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Mod manual atau tiptronic tidak bertindak balas. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Suis up/down, wiring atau input modul. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0826 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah input kedua-dua arah suis dan perubahan live data.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi input kedua-dua arah suis dan perubahan live data. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0826 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus input berasingan suis upshift dan downshift serta respons modul. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen input kedua-dua arah suis dan perubahan live data hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0826: Litar suis arahan naik dan turun gear. Diagnosis lanjutan perlu membezakan punca pada input kedua-dua arah suis dan perubahan live data daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0826 menggunakan freeze-frame, status DTC dan live data input kedua-dua arah suis dan perubahan live data. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi input kedua-dua arah suis dan perubahan live data. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi input berasingan suis upshift dan downshift serta respons modul. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0826: Kenderaan menunjukkan keadaan berikut: mod manual atau tiptronic tidak bertindak balas. Juruteknik merekod freeze-frame, memeriksa input kedua-dua arah suis dan perubahan live data, kemudian mengasingkan kemungkinan punca: suis up/down, wiring atau input modul. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0827": {
    "n": "Up and Down Shift Switch Circuit Low",
    "free": {
      "m": "Isyarat rendah litar suis naik dan turun gear. Up and Down Shift Switch Circuit Low ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Arahan pertukaran gear manual mungkin tidak dikenal pasti. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Pintas ke bumi, suis rosak atau bekalan rujukan terganggu. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0827 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah signal suis, short-to-ground dan bekalan rujukan.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi signal suis, short-to-ground dan bekalan rujukan. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0827 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus signal rendah suis up/down dan kemungkinan pintas ke ground. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen signal suis, short-to-ground dan bekalan rujukan hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0827: Isyarat rendah litar suis naik dan turun gear. Diagnosis lanjutan perlu membezakan punca pada signal suis, short-to-ground dan bekalan rujukan daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0827 menggunakan freeze-frame, status DTC dan live data signal suis, short-to-ground dan bekalan rujukan. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi signal suis, short-to-ground dan bekalan rujukan. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi signal rendah suis up/down dan kemungkinan pintas ke ground. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0827: Kenderaan menunjukkan keadaan berikut: arahan pertukaran gear manual mungkin tidak dikenal pasti. Juruteknik merekod freeze-frame, memeriksa signal suis, short-to-ground dan bekalan rujukan, kemudian mengasingkan kemungkinan punca: pintas ke bumi, suis rosak atau bekalan rujukan terganggu. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  },
  "P0828": {
    "n": "Up and Down Shift Switch Circuit High",
    "free": {
      "m": "Isyarat tinggi litar suis naik dan turun gear. Up and Down Shift Switch Circuit High ialah kod diagnostik OBD-II yang menunjukkan gangguan pada sistem atau litar berkaitan. Tafsiran tepat bergantung pada konfigurasi kenderaan.",
      "s": "Arahan gear gagal dikenal pasti atau kekal aktif. Gejala bergantung pada sistem terlibat. Periksa lampu amaran, perubahan prestasi, simptom berkaitan dan freeze-frame sebelum membuat diagnosis.",
      "p": "Pintas ke bekalan, sambungan terbuka atau suis rosak. Nilai dan kaedah pengesahan perlu mengikut spesifikasi OEM."
    },
    "pro": {
      "diagnosis": "Sahkan P0828 dan rekod status current/pending, freeze-frame serta kod berkaitan. Fokus diagnosis ialah signal suis, short-to-voltage dan kesinambungan litar.",
      "tests": [
        "Periksa connector, terminal, ground dan harness bagi signal suis, short-to-voltage dan kesinambungan litar. Gunakan wiring diagram serta prosedur OEM untuk mengenal pasti pin dan laluan litar.",
        "Pantau live data P0828 ketika sistem diaktifkan. Bandingkan input, output dan perubahan signal dengan keadaan fizikal komponen serta spesifikasi pengeluar.",
        "Uji secara khusus signal tinggi suis up/down dan kemungkinan pintas ke bekalan. Gerakkan kawalan atau aktifkan fungsi berkaitan dalam keadaan selamat, pantau live data dan bandingkan hasil dengan spesifikasi OEM."
      ],
      "repair": "Baiki atau ganti komponen signal suis, short-to-voltage dan kesinambungan litar hanya selepas ujian mengesahkan punca. Pulihkan wiring atau connector jika terbukti rosak, padam DTC dan sahkan operasi melalui ujian fungsi OEM."
    },
    "elite": {
      "analysis": "P0828: Isyarat tinggi litar suis naik dan turun gear. Diagnosis lanjutan perlu membezakan punca pada signal suis, short-to-voltage dan kesinambungan litar daripada gangguan bekalan, ground, komunikasi atau modul. Gejala sahaja tidak membuktikan komponen perlu diganti.",
      "advanced": [
        "Bina korelasi diagnostik P0828 menggunakan freeze-frame, status DTC dan live data signal suis, short-to-voltage dan kesinambungan litar. Tentukan keadaan tepat ketika ralat direkodkan.",
        "Bezakan kegagalan elektrik, input sensor, arahan modul dan tindak balas mekanikal bagi signal suis, short-to-voltage dan kesinambungan litar. Jangan membuat kesimpulan daripada satu bacaan sahaja.",
        "Laksanakan pengesahan lanjutan bagi signal tinggi suis up/down dan kemungkinan pintas ke bekalan. Rekod signal sebelum dan selepas tindakan diagnostik, kemudian sahkan operasi sistem serta ketiadaan DTC berulang mengikut prosedur OEM."
      ],
      "caseStudy": "Kajian kes P0828: Kenderaan menunjukkan keadaan berikut: arahan gear gagal dikenal pasti atau kekal aktif. Juruteknik merekod freeze-frame, memeriksa signal suis, short-to-voltage dan kesinambungan litar, kemudian mengasingkan kemungkinan punca: pintas ke bekalan, sambungan terbuka atau suis rosak. Selepas punca disahkan melalui ujian OEM dan pembaikan dilakukan, sistem diuji semula menggunakan live data serta ujian fungsi."
    }
  }
};
