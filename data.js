/**
 * data.js
 * -------
 * Sumber data seluruh perkuliahan. Untuk menambah materi minggu baru,
 * cukup ubah objek minggu terkait di bawah ini — tidak perlu menyentuh
 * HTML atau logika aplikasi di app.js.
 *
 * Struktur satu minggu:
 * {
 *   number:    urutan minggu (1-14)
 *   title:     judul singkat minggu itu (kosongkan "" jika belum ada materi)
 *   available: true jika materi sudah siap ditampilkan
 *   topics:    daftar submenu materi. Setiap topik butuh id unik dan label.
 *              "render" adalah nama fungsi (di app.js / converter.js) yang
 *              akan dipanggil untuk menggambar konten topik tsb.
 * }
 */

const COURSE = {
  courseTitle: "Sistem Digital",
  courseTag: "Media Ajar Interaktif",
  weeks: [
    {
      number: 1,
      title: "Sistem Bilangan & Konversi",
      available: true,
      topics: [
        { id: "w1-intro", label: "Kenapa Biner Jadi Pusat?", render: "renderWeek1Intro" },
        { id: "w1-converter", label: "Konverter Interaktif", render: "renderWeek1Converter" },
        { id: "w1-quiz", label: "Latihan & Kuis", render: "renderWeek1Quiz" }
      ]
    },
    {
      number: 2,
      title: "Bilangan Negatif & Operasi Biner",
      available: true,
      topics: [
        { id: "w2-intro",       label: "Identitas & CPMK",              render: "renderWeek2Intro"          },
        { id: "w2-negative",    label: "Representasi Bilangan Negatif",  render: "renderWeek2Negative"       },
        { id: "w2-ops",         label: "Operasi Biner & Overflow",       render: "renderWeek2Ops"            },
        { id: "w2-hex",         label: "Hex, Oktal & Konversi",          render: "renderWeek2Hex"            },
        { id: "w2-quiz",        label: "Latihan & Soal",                 render: "renderWeek2Quiz"           },
        { id: "w2-interactive", label: "Kuis Interaktif",                render: "renderWeek2InteractiveQuiz"}
      ]
    },
    {
      number: 3,
      title: "Aljabar Boolean",
      available: true,
      topics: [
        { id: "w3-intro",          label: "Pendahuluan Aljabar Boolean",      render: "renderWeek3Intro"          },
        { id: "w3-gates",          label: "Gerbang Logika",                   render: "renderWeek3Gates"          },
        { id: "w3-laws",           label: "Hukum & Teorema Boolean",          render: "renderWeek3Laws"           },
        { id: "w3-standard-forms", label: "Bentuk Standar (SOP & POS)",       render: "renderWeek3StandardForms"  },
        { id: "w3-truth-table",    label: "Tabel Kebenaran",                  render: "renderWeek3TruthTable"     },
        { id: "w3-conversion",     label: "Konversi SOP ↔ POS",              render: "renderWeek3Conversion"     },
        { id: "w3-simplification", label: "Penyederhanaan Fungsi",            render: "renderWeek3Simplification" },
        { id: "w3-xor",           label: "Gerbang XOR & Bentuk SOP",         render: "renderWeek3XOR"            },
        { id: "w3-exercises",      label: "Latihan & Evaluasi",               render: "renderWeek3Exercises"      },
        { id: "w3-summary",        label: "Ringkasan & Evaluasi Akhir",       render: "renderWeek3Summary"        }
      ]
    },
    {
      number: 4,
      title: "Karnaugh Map (K-Map)",
      available: true,
      topics: [
        { id: "w4-intro",       label: "Pendahuluan K-Map",              render: "renderWeek4Intro"       },
        { id: "w4-concepts",    label: "Konsep Dasar & Kode Gray",       render: "renderWeek4Concepts"    },
        { id: "w4-grouping",    label: "Aturan Pengelompokan",           render: "renderWeek4Grouping"    },
        { id: "w4-kmap2",       label: "K-Map 2 Variabel",               render: "renderWeek4KMap2"       },
        { id: "w4-kmap3",       label: "K-Map 3 Variabel",               render: "renderWeek4KMap3"       },
        { id: "w4-kmap4",       label: "K-Map 4 Variabel",               render: "renderWeek4KMap4"       },
        { id: "w4-case-study",  label: "Studi Kasus: Sistem Alarm",      render: "renderWeek4CaseStudy"   },
        { id: "w4-dont-care",   label: "Kondisi Don't Care (X)",         render: "renderWeek4DontCare"    },
        { id: "w4-exercises",   label: "Latihan & Evaluasi",             render: "renderWeek4Exercises"   },
        { id: "w4-summary",     label: "Ringkasan & Kuis Akhir",         render: "renderWeek4Summary"     }
      ]
    },
    {
      number: 5,
      title: "Adder & Subtractor",
      available: true,
      topics: [
        { id: "w5-intro",             label: "Pengantar & Representasi Biner", render: "renderWeek5Intro"            },
        { id: "w5-arithmetic",        label: "Penjumlahan & Pengurangan",      render: "renderWeek5BinaryArithmetic" },
        { id: "w5-half-adder",        label: "Half Adder",                     render: "renderWeek5HalfAdder"        },
        { id: "w5-full-adder",        label: "Full Adder",                     render: "renderWeek5FullAdder"        },
        { id: "w5-rca",               label: "Ripple Carry Adder (RCA)",       render: "renderWeek5RCA"              },
        { id: "w5-cla",               label: "Carry Lookahead Adder (CLA)",    render: "renderWeek5CLA"              },
        { id: "w5-subtractors",       label: "Half & Full Subtractor",         render: "renderWeek5Subtractors"      },
        { id: "w5-adder-subtractor",  label: "Adder-Subtractor Terintegrasi",  render: "renderWeek5AdderSubtractor"  },
        { id: "w5-simulator",         label: "Simulator Aritmatika Digital",   render: "renderWeek5Simulator"        },
        { id: "w5-exercises",         label: "Latihan & Evaluasi",             render: "renderWeek5Exercises"        },
        { id: "w5-summary",           label: "Ringkasan & Kuis Akhir",         render: "renderWeek5Summary"          }
      ]
    },
    {
      number: 6,
      title: "Multilevel & Multiplexer",
      available: true,
      topics: [
        { id: "w6-intro",            label: "Pendahuluan & CPMK",             render: "renderWeek6Intro"            },
        { id: "w6-universal-gates",  label: "Review Gerbang Universal",       render: "renderWeek6UniversalGates"   },
        { id: "w6-multilevel-nand",  label: "Multilevel NAND (SOP)",          render: "renderWeek6MultilevelNAND"   },
        { id: "w6-multilevel-nor",   label: "Multilevel NOR (POS)",           render: "renderWeek6MultilevelNOR"    },
        { id: "w6-comparison",       label: "Komparasi NAND vs NOR",          render: "renderWeek6Comparison"       },
        { id: "w6-mux-basics",       label: "Dasar MUX & Simulator 2:1",      render: "renderWeek6MuxBasics"        },
        { id: "w6-mux-advanced",     label: "MUX 4:1 & 8:1 Interaktif",       render: "renderWeek6MuxAdvanced"      },
        { id: "w6-mux-logic",        label: "Sintesis Logika dengan MUX",     render: "renderWeek6MuxLogic"         },
        { id: "w6-exercises",        label: "Latihan Mandiri & Analisis",     render: "renderWeek6Exercises"        },
        { id: "w6-summary",          label: "Ringkasan & Kuis Mandiri",       render: "renderWeek6Summary"          }
      ]
    },
    {
      number: 7,
      title: "Decoder, Encoder & 7-Segment",
      available: true,
      topics: [
        { id: "w7-intro",            label: "Pendahuluan & Logika Kombinasi", render: "renderWeek7Intro"            },
        { id: "w7-decoder-basics",   label: "Prinsip Decoder, 1:2 & 2:4",     render: "renderWeek7DecoderBasics"   },
        { id: "w7-decoder-3to8",     label: "Decoder 3:8 & Simulator",        render: "renderWeek7Decoder3to8"     },
        { id: "w7-decoder-apps",     label: "Aplikasi Decoder & IC 74LS138",  render: "renderWeek7DecoderApps"     },
        { id: "w7-encoder-basics",   label: "Prinsip Encoder & Encoder 4:2",  render: "renderWeek7EncoderBasics"   },
        { id: "w7-encoder-priority", label: "Priority Encoder & Komparasi",   render: "renderWeek7EncoderPriority" },
        { id: "w7-seven-segment",    label: "Seven-Segment Display & BCD",    render: "renderWeek7SevenSegment"    },
        { id: "w7-simulator-bcd",    label: "Simulator BCD to 7-Segment",     render: "renderWeek7SimulatorBCD"    },
        { id: "w7-exercises",        label: "Latihan Mandiri & Evaluasi",     render: "renderWeek7Exercises"       }
      ]
    },
    { number: 8, title: "", available: false, topics: [] },
    { number: 9, title: "", available: false, topics: [] },
    { number: 10, title: "", available: false, topics: [] },
    { number: 11, title: "", available: false, topics: [] },
    { number: 12, title: "", available: false, topics: [] },
    { number: 13, title: "", available: false, topics: [] },
    { number: 14, title: "", available: false, topics: [] }
  ]
};
