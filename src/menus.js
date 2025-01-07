const menus = []
const addMenu = menu => {
  menus.push(menu)
}

const addSubMenu = (label, subMenu, menu = menus) => {
  for (const item of menu) {
    if (item.label === label) {
      item.subMenus.push(subMenu)
      return
    }
    if (item.subMenus) {
      addSubMenu(label, subMenu, item.subMenus)
    }
  }
}

export const settingsMenu = [
  {
    route: '#',
    label: 'Pengaturan',
    subMenus: [
      {
        route: '/settings/appearance',
        label: 'Pengaturan Tampilan',
      },
      {
        route: '/settings/role',
        label: 'Pengaturan Role',
      },
      {
        route: '/settings/user',
        label: 'Pengaturan User',
      },
    ],
  },
]

export default menus
addMenu({
  route: '#',
  label: 'Program',
  subMenus: [],
})

addSubMenu('Program', {
  route: '/activity',
  label: 'Aktivitas',
})

addMenu({
  route: '#',
  label: 'Laporan Keuangan',
  subMenus: [],
})

addSubMenu('Laporan Keuangan', {
  route: '/income',
  label: 'Pemasukan',
})

addSubMenu('Laporan Keuangan', {
  route: '/expense',
  label: 'Pengeluaran',
})

addSubMenu('Laporan Keuangan', {
  route: '#',
  label: 'Jurnal Keuangan',
  subMenus: [],
})

addSubMenu('Jurnal Keuangan', {
  route: '#',
  label: 'PSAK45',
  subMenus: [],
})

addSubMenu('PSAK45', {
  route: '/laporan-arus-kas',
  label: 'Laporan Arus Kas',
})

addSubMenu('PSAK45', {
  route: '/financial-position',
  label: 'Posisi Finansial',
})

addSubMenu('PSAK45', {
  route: '/activity-report',
  label: 'Laporan Aktivitas',
})

addMenu({
  route: '#',
  label: 'Info Organisasi',
  subMenus: [],
})

addSubMenu('Info Organisasi', {
  route: '/aboutus',
  label: 'Tentang Kami',
})

addSubMenu('Info Organisasi', {
  route: '/contacts',
  label: 'Kontak',
})

addSubMenu('Info Organisasi', {
  route: '/bankaccount',
  label: 'Rekening Donasi',
})
