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
    { number: 2, title: "", available: false, topics: [] },
    { number: 3, title: "", available: false, topics: [] },
    { number: 4, title: "", available: false, topics: [] },
    { number: 5, title: "", available: false, topics: [] },
    { number: 6, title: "", available: false, topics: [] },
    { number: 7, title: "", available: false, topics: [] },
    { number: 8, title: "", available: false, topics: [] },
    { number: 9, title: "", available: false, topics: [] },
    { number: 10, title: "", available: false, topics: [] },
    { number: 11, title: "", available: false, topics: [] },
    { number: 12, title: "", available: false, topics: [] },
    { number: 13, title: "", available: false, topics: [] },
    { number: 14, title: "", available: false, topics: [] }
  ]
};
