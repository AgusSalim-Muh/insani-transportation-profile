// Fungsi utama untuk memuat komponen HTML (Header/Footer)
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (response.ok) {
      const content = await response.text();
      document.getElementById(id).innerHTML = content;

      // PENTING: Inisialisasi fitur setalah komponen selesai dimuat
      if (id === "header-placeholder") {
        initMobileMenu(); // Jalankan fungsi menu mobile
        initScrollSpy(); // Jalankan fungsi active link scroll
      }
    } else {
      console.error(`Gagal memuat ${file}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

// 1. Fungsi Toggle Menu Mobile
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    // Tutup menu saat link diklik (untuk UX yang lebih baik)
    const mobileLinks = document.querySelectorAll(".mobile-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
      });
    });
  }
}

// 2. Fungsi Scroll Spy (Agar Link menjadi Active saat discroll)
function initScrollSpy() {
  const sections = document.querySelectorAll("section"); // Mengambil semua section di index.html
  const navLinks = document.querySelectorAll(".nav-link"); // Mengambil link di header.html

  // Fungsi kalkulasi posisi
  function makeLinkActive() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Logika: Jika scroll user berada di area section ini (-150px untuk offset header)
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active"); // Hapus class active dari semua link

      // Jika href link mengandung ID section yang sedang aktif
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active"); // Tambahkan class active
      }
    });
  }

  // Jalankan saat discroll
  window.addEventListener("scroll", makeLinkActive);
  // Jalankan sekali saat halaman pertama kali dimuat (jika di-refresh di tengah halaman)
  makeLinkActive();
}

// Eksekusi Pemuatan Komponen saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
});

// ... (Kode sebelumnya tetap ada) ...

// FUNGSI KIRIM PESAN KE WHATSAPP
function kirimKeWhatsApp(event) {
  event.preventDefault(); // Mencegah form refresh halaman

  // 1. Ambil nilai dari form
  const nama = document.getElementById("nama").value;
  const kontak = document.getElementById("kontak").value;
  const pesan = document.getElementById("pesan").value;

  // 2. Nomor HP Tujuan (Sesuai PDF: 081 325 892 930)
  // Ubah 081 menjadi 6281 untuk format internasional
  const nomorTujuan = "6282314726046";

  // 3. Buat format pesan teks
  // %0A adalah kode untuk baris baru (Enter)
  const teksPesan = `Halo CV. INSANI, saya ingin bertanya.%0A%0A` + `*Nama:* ${nama}%0A` + `*Kontak:* ${kontak}%0A%0A` + `*Pesan:*%0A${pesan}`;

  // 4. Buka link WhatsApp
  // Gunakan encodeURIComponent agar simbol & atau ? tidak merusak link
  const linkWA = `https://wa.me/${nomorTujuan}?text=${teksPesan}`;

  // Buka di tab baru
  window.open(linkWA, "_blank");
}
