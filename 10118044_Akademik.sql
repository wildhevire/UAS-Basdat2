-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Agu 2020 pada 16.25
-- Versi server: 10.3.16-MariaDB
-- Versi PHP: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_lms`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(21, 'admin', 'admin'),
(22, 'root', 'root');

-- --------------------------------------------------------

--
-- Struktur dari tabel `dosen`
--

CREATE TABLE `dosen` (
  `nip` varchar(10) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tempat_lahir` varchar(30) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `admin_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `dosen`
--

INSERT INTO `dosen` (`nip`, `nama`, `password`, `email`, `tanggal_lahir`, `tempat_lahir`, `alamat`, `admin_id`) VALUES
('101', 'Wildan Muhammad Fikri', '123456', 'wildhevire404@gmail.com', '2020-08-11', 'Subang', 'Subang Jabar ASDF', 21),
('102', 'Dadang', '666', 'dadang@mail.com', '2000-01-26', 'Bandung', 'Jalan A', 21);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nim` varchar(8) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tempat_lahir` varchar(30) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `admin_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`nim`, `nama`, `password`, `email`, `tanggal_lahir`, `tempat_lahir`, `alamat`, `admin_id`) VALUES
('10118043', 'Dian RP', '666666', 'dian@mail.com', '2020-08-12', '', 'Bandung', 21),
('10118044', 'Wildan Muhammad Fikri', '123456', 'wildhevire404@gmail.com', '2000-01-14', 'Subang', 'Subang', 21);

-- --------------------------------------------------------

--
-- Struktur dari tabel `matkul`
--

CREATE TABLE `matkul` (
  `kode_matkul` varchar(10) NOT NULL,
  `nama_matkul` varchar(100) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `matkul`
--

INSERT INTO `matkul` (`kode_matkul`, `nama_matkul`, `admin_id`) VALUES
('MK001', 'Basis Data 1', 21),
('MK002', 'Provis', 21),
('MK003', 'Basis Data 2', 21);

-- --------------------------------------------------------

--
-- Struktur dari tabel `nilai`
--

CREATE TABLE `nilai` (
  `kode_nilai` int(11) NOT NULL,
  `absensi` int(11) NOT NULL DEFAULT 0,
  `tugas` int(11) NOT NULL DEFAULT 0,
  `uts` int(11) NOT NULL DEFAULT 0,
  `uas` int(11) NOT NULL DEFAULT 0,
  `akhir` int(11) NOT NULL DEFAULT 0,
  `indeks` int(11) NOT NULL DEFAULT 0,
  `nim` varchar(8) NOT NULL,
  `perkuliahan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `perkuliahan`
--

CREATE TABLE `perkuliahan` (
  `perkuliahan_id` int(11) NOT NULL,
  `kode_matkul` varchar(10) NOT NULL,
  `nip` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `perkuliahan`
--

INSERT INTO `perkuliahan` (`perkuliahan_id`, `kode_matkul`, `nip`) VALUES
(3, 'MK001', '101');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`nip`),
  ADD KEY `fk_admin` (`admin_id`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nim`),
  ADD KEY `fk_admin` (`admin_id`);

--
-- Indeks untuk tabel `matkul`
--
ALTER TABLE `matkul`
  ADD PRIMARY KEY (`kode_matkul`),
  ADD KEY `fk_admin` (`admin_id`);

--
-- Indeks untuk tabel `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`kode_nilai`),
  ADD KEY `fk_nilai_mahasiswa` (`nim`),
  ADD KEY `fk_perkuliahan_nilai` (`perkuliahan_id`);

--
-- Indeks untuk tabel `perkuliahan`
--
ALTER TABLE `perkuliahan`
  ADD PRIMARY KEY (`perkuliahan_id`),
  ADD KEY `fk_perkuliahan_matkul` (`kode_matkul`),
  ADD KEY `fk_perkuliahan_dosen` (`nip`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `nilai`
--
ALTER TABLE `nilai`
  MODIFY `kode_nilai` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `perkuliahan`
--
ALTER TABLE `perkuliahan`
  MODIFY `perkuliahan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `dosen`
--
ALTER TABLE `dosen`
  ADD CONSTRAINT `admin_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `fk_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `matkul`
--
ALTER TABLE `matkul`
  ADD CONSTRAINT `admin_fk1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `fk_nilai_mahasiswa` FOREIGN KEY (`nim`) REFERENCES `mahasiswa` (`nim`),
  ADD CONSTRAINT `fk_perkuliahan_nilai` FOREIGN KEY (`perkuliahan_id`) REFERENCES `perkuliahan` (`perkuliahan_id`);

--
-- Ketidakleluasaan untuk tabel `perkuliahan`
--
ALTER TABLE `perkuliahan`
  ADD CONSTRAINT `fk_perkuliahan_dosen` FOREIGN KEY (`nip`) REFERENCES `dosen` (`nip`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_perkuliahan_matkul` FOREIGN KEY (`kode_matkul`) REFERENCES `matkul` (`kode_matkul`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
