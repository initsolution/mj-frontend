# 0.0.1 (Update 03/01/2023)
- Build skeleton UI/UX : Page Absensi dan Payslip
- Modul Absensi : 
    - Show all absensi karyawan produksi
    - Perhitungan absensi produksi
    - Upload absensi produksi via excel
    - Approve and Update lembur
- Modul Payslip
    - Membuat payslip produksi periode 1 minggu
    - Cetak payslip pdf
# 0.0.1 (Update 05/01/2023)
- Modul Loan :
    - tambah loan (untuk menambah hutang dan membayar)
    - view loan
- Modul payslip
    - menambahkan tampilan sisa bon dan bon
# 0.0.1 (Update 06/01/2023)
- Modul payslip
    - menambahkan dialog untuk bon, dan update payslip    
- Modul departemen
    - menambahkan modul departemen lihat dan update departemen
# 0.0.1 (Update 13/01/2023)
- Modul Absensi 
    - menambahkan modul tambah 1 absensi
    - menambahkan hapus absensi
    - validasi untuk absensi
- Modul Departemen
    - masih on progress    
- Modul Area
    - masih on progress
- Modul Shift
    - masih on progress
# 0.0.1 (Update 13/01/2023)
- Modul Shift
    - Tambah Edit Modul Shift -> kurang insert/edit ke database
- Modul Attendance
    - validasi tambah attendance
# 0.0.1 (Update 19/01/2023)
- Modul PayslipProduksi
    - Sort tampilan payslip dan download bedasarkan nama
    - View Payslip Produksi container di ganti jadi class pa-8 fluid
# 0.0.1 (Update 24/01/2023)
- Modul ViewPayslip
    - Nama file menjadi periodeawal-periodeakhir.pdf
- Modul Kehadiran
    - Ignore Scanout jika terdapat arrive_home
- Modul Shift dan Detail_Shift
    - Edit Shift byId
    - Edit Detail_Shift byId
- Modul Area
    - Add Edit View Area
- Modul Position
    - Add Edit View Position

# 0.0.1 (Update 26/01/2023)
- Modul Kehadiran
    - Add cancel overtime
- Modul Departemen
    - Update Add, Edit, View Departemen
- Modul Bagian
    - Update Add, Edit, View Bagian
- Modul Position
    - Update Add, Edit, View Position
- Modul Kehadiran
    - ganti api name    

# 0.0.1 (Update 31/01/2023)
- Modul Payslip
    - Pembulatan angka
- Modul Kehadiran
    - membuat submodul produksi dan bulanan
    - searching by date dan nama
- Modul Position
    - validasi jika areaId = null
    
# 0.0.1 (Update 01/02/2023)
- Modul Shift
    - solve bug add dan edit shift

#0.0.1 (Update 02/02/2023)
- Modul Employee
    - Show all employee
    - Import employee from spreadsheet
    - Add new an employee
    - Update employee
    - Sort Employee by Name ASC
- Modul Attendance Mingguan
    - filter by created at
- Modul Payslip Produksi
    - print payslip tambah area dan jabatan
- Modul Pinjaman
    - ganti vuex actiongetallemployee

# 0.0.1 (Update 06/02/2023)
- Modul Attendance Mingguan (feedback MJ)
    - Format tgl kehadiran nya tg-bln-th
    - urutan tampilan masuk-mulai istirahat - selesai istirahat -pulang
    - validasi jam lembur nya ijo& merah nya jangan yg cetar, warna kalem
- Modul Attendance Bulanan
    - On going

# 0.0.1 (Update 06/02/2023)
- Modul Attendance Mingguan (feedback MJ)
    - Notifikasi Duplikasi data
    - Add component overlay loading

# 0.0.1 (Update 07/02/2023)
- Modul Attendance Mingguan (feedback MJ)
    - Filter Attendance
    - Tambah, Hapus, dan Edit kehadiran by filter
- Modul Pinjaman (feedback MJ)
    - Mengganti get data employee    

# 0.0.1 (Update 10/02/2023)
- Modul Attendance Helper 
    - Tambah / Hapus berdasarkan tipe attendance
    - Form Ijin
    - Form Ganti Shift
- Modul Attendance Mingguan 
    - Tambah / Hapus berdasarkan tipe attendance
    - Tambah, Hapus, dan Edit kehadiran by filter
- Modul Attendance Bulanan 
    - Tambah / Hapus berdasarkan tipe attendance
    - Tambah, Hapus, dan Edit kehadiran by filter 
- Modul Shift
    - solving bug switchable selalu true
- Etc 
    - remove debug print in each modul
- Modul Absensi
    - Menampilkan data karyawan yg tidak masuk
- Modul Payslip Helper
    - Menampilkan dan kalkulasi payslip helper
    - cetak payslip helper
- Modul Pinjaman
    - ganti cara mendapatkan employee bedasarkan filters    

# 0.0.1 (Update 15/02/2023)
- Modul Pinjaman
    - Menambahkan total pinjaman setiap departemen
- Modul Attendance Produksi
    - menghapus v-chip ijin
- Modul Attendance Helper
    - membedakan ijin dan telat
    - menghapus v-chip ijin
- Modul Absensi Produksi   
    - menambahkan filter tanggal
- Etc
    - mengganti kehadiran mingguan menjadi mingguan produksi         

# 0.0.1 (Update 16/02/2023)
- Modul Kehadiran Mingguan
    - margin bottom
- Modul Kehadiran Bulanan
    - ongoing kehadiran bulanan
- Modul Kehadiran Helper
    - margin bottom
- Modul Tambah Kehadiran
    - tambah status masuk / tidak masuk karyawan

# 0.0.1 (Update 16/02/2023)
- Modul Payslip
    - tambah dialog konfirmasi untuk cetak payslip
    

# 0.0.1 (Update 22/02/2023)
- Modul Payslip Produksi
    - Solve Payslip update bon auto refresh
    - Menambahkan Vue-currency untuk bon
- Modul Payslip Helper
    - Solve Payslip update bon auto refresh
    - Menambahkan Vue-currency untuk bon
- Modul Attendance Bulanan 
    - Menyiapkan modul

# 0.0.1 (Update 24/02/2023)    
- Modul Pengeluaran
	- Menambahkan filter by department, bulan dan thun
	- Menambahkan Detail pengeluaran
- Modul Pinjaman
	- Menambahkan filter by department dan nama
- Modul Absensi
	- memperbaiki UI

# 0.0.1 (Update 28/02/2023)
- Modul Payslip helper
    - menambahkan fitur currency di potongan bon

# 0.0.1 (Update 03/03/2023)
- Modul Detail Pinjaman
    - ubah textfield menjadi currency
- Modul Kehadiran
    - text merah saat istirahat sebelum start_for_break
    - jika ada ijin menjadi warna kuning
    - tambah work hour di tabel
# 0.0.1 (Update 02/03/2023)
- Modul Payslip Helper & Produksi
    - Menambahkan potongan lain
    - jika tidak punya bon, maka potongan bon tidak tampil button    
# 0.0.1 (Update 06/03/2023)
- Modul KehadiranCs
    - Tambah Jam Kerja dan Jam Istirahat
- Modul Shift
    - Ubah Tampilan saat jam kerja tetap & jam kerja bebas
- Modul TambahEditShift
    - Ubah Tampilan Jam kerja bebas (istirahat berdasarkan durasi)    
# 0.0.1 (Update 13/03/2023)
- Modul KehadiranCs, Produksi, dan Bulanan
    - Muncul data dengan NIK jika ada duplikasi data
- Modul Payslip
    - Notifikasi tidak bisa generate payslip jika kehadiran kosong
- Modul Shift
    - Remove second(detik) pada detailShift
# 0.0.1 (Update 13/03/2023)
- Modul Kehadiran Bulanan
    - menampilkan custom data bulanan di v-tabel 

# 0.0.1 (Update 28/03/2023)
- Modul Kehadiran Bulanan
    - solving bug di ijin (00:00:00)
    - concat ijin dan istirahat

# 0.0.1 (Update 31/03/2023)
- Modul Kehadiran Bulanan
    - konfirmasi lembur oleh admin
    - tambah pindah shift

# 0.0.1 (Update 01/04/2023)
- Modul Payslip
    - Support Payslip Bulanan dan Office

# 0.0.1 (Update 04/04/2023)
- Modul Payslip
    - Enable Payslip Bulanan dan Office    

# 0.0.1 (Update 05/04/2023)
- Modul Payslip Bulanan dan Office
    - format Payslip dan PDF

# 0.0.1 (Update 06/04/2023)
- Modul Payslip Bulanan dan Office
    - menambahkan pendapatan lain
    - optimize payslip bulanan    

# 0.0.1 (Update 02/05/2023)
- Modul Payslip dan Payslip Owner
    - add loading
    - generate payslip owner

# 0.0.1 (Update 09/05/2023)
- Modul Absensi
    - add search
- Modul Owner
    - Pinjaman
        - Tambah Pinjaman
        
# 0.0.1 (Update 09/05/2023)
- Modul Pinjaman
    - membedakan antara owner dan biasa

# 0.0.1 (Update 09/05/2023)
- Modul ViewPayslipOwner
    - add fungsi untuk ubah hari masuk karyawan untuk sisi owner

# 0.0.1 (Update 19/05/2023)
- Modul Kehadiran Bulanan, Office, Produksi
    - fix issue tambah absensi manual dan hapus absensi

# 0.0.1 (Update 22/05/2023)
- Modul Pengeluaran
    - pengeluaran untuk toko bulanan & office    

# 0.0.1 (Update 22/05/2023)
- Modul Kehadiran Bulanan, Office, Produksi
    - fix issue trim data dari excel

# 0.0.1 (Update 26/05/2023)
- Modul Pengeluaran
    - solve pengeluaran untuk toko bulanan & office        

# 0.0.1 (Update 08/06/2023)
- Modul Kehadiran Mingguan, Bulanan dan Office
    - custom pagination data table        
    
# 0.0.1 (Update 09/06/2023)
- Modul User
    - user management

# 0.0.1 (Update 14/06/2023)
- Modul User
    - change password and detail for non owner    

# 0.0.1 (Update 30/06/2023)
- Modul Payslip Owner
    - tambah detail pengeluaran dan batal bon        

# 0.0.1 (Update 04/07/2023)
- Modul All Payslip
    - Change fontsize  

# 0.0.1 (Update 04/07/2023)
- Modul All Payslip - tb_karyawan fontsize
    - Change fontsize from 8 to 9
    - Change label Nik to NIK